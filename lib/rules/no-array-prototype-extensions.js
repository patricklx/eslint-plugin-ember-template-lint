"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _emberTemplateRecast = require("ember-template-recast");
var _base = require("./_base.js");
const FIRST_OBJECT_PROP_NAME = 'firstObject';
const LAST_OBJECT_PROP_NAME = 'lastObject';
const ERROR_MESSAGES = Object.freeze({
  LAST_OBJECT: 'Array prototype extension property lastObject usage is disallowed.',
  FIRST_OBJECT: "Array prototype extension property firstObject usage is disallowed. Please use Ember's get helper instead. e.g. {{get @list '0'}}"
});

/**
 * generate a tuple of pathExpression before `firstObject` and string of parts after `firstObject` index and replace `firstObject` with 0. e.g. [this.list, '0.name']
 *
 * @param {GlimmerPathExpression} node The pathExpression node that should be wrapped in a get helper
 * @returns a tuple of path parts before digit and path parts after digit index
 * e.g. node.original - `this.list.firstObject.name` return -`[this.list, '0.name']`
 */
function getHelperParams(node) {
  // use node.original instead of node.parts so the context isn't dropped
  const originalParts = node.original.split('.');
  // we don't handle optional chaining here as in hbs we don't need to `?.` and it's not a general practice
  const firstObjectIndex = originalParts.indexOf(FIRST_OBJECT_PROP_NAME);

  // mutate originalParts to use 0 instead of `firstObject`
  originalParts.splice(firstObjectIndex, 1, '0');
  return [_emberTemplateRecast.builders.path({
    head: originalParts.slice(0, firstObjectIndex).join('.')
  }, node.loc), _emberTemplateRecast.builders.literal('GlimmerStringLiteral', originalParts.slice(firstObjectIndex).join('.'), node.loc)];
}

/**
 * generate new literal for firstObject literal. eg: `firstObject.name` => `0.name`;
 * @param {Object} path
 * @returns {String}
 */
function getFirstObjectFixerLiteral(path) {
  return path.parentNode.params[1].original.split('.').map(part => {
    if (part === FIRST_OBJECT_PROP_NAME) {
      return 0;
    }
    return part;
  }).join('.');
}

/**
 * Check if should disallow the path origin. `firstObject`, `@lastObject`, `this.firstObject.test` are allowed.
 * @param {Object} node
 * @param {matchString} to be matched string, firstObject or lastObject
 * @returns {Boolean} indicating whether is a match
 */
function isAllowed(originalStr, matchedStr) {
  // allow `@firstObject.test`, `@lastObject`
  if (originalStr.startsWith(`@${matchedStr}`)) {
    return true;
  }
  const originalParts = originalStr.split('.');
  const matchStrIndex = originalParts.indexOf(matchedStr);

  // if not found
  if (matchStrIndex === -1) {
    return true;
  }
  // allow this.firstObject
  return !matchStrIndex || originalParts[matchStrIndex - 1] === 'this';
}

/**
 * Check if current node is a `get` helper and it's literals contains matchedStr
 * For example `{{get this 'list.firstObject'}}` or `{{get this 'list.lastObject.name'}}` will return true
 * `{{get this 'lastObject.name'}}` will return false
 * @param {Object} node
 * @param {matchString} to be matched string, firstObject or lastObject
 * @returns {Boolean} indicating whether is a match
 */
function isGetHelperWithMatchedLiteral(node, path, matchedStr) {
  if (node.original === 'get') {
    if (path.parentNode && path.parentNode.type === 'GlimmerMustacheStatement' && path.parentNode.params && path.parentNode.params[1] && path.parentNode.params[1].type === 'GlimmerStringLiteral') {
      const literal = path.parentNode.params[1].original;
      const parts = literal.split('.');
      const matchStrIndex = parts.indexOf(matchedStr);

      // matchedStr is found and not the `{{get this 'firstObject'}}` case, then return true
      return matchStrIndex !== -1 && !(matchStrIndex === 0 && path.parentNode.params[0] && path.parentNode.params[0].original === 'this');
    }
    return false;
  }
}
class NoArrayPrototypeExtensions extends _base {
  visitor() {
    return {
      GlimmerPathExpression(node, path) {
        if (!node.original) {
          return;
        }
        // handle for `lastObject`, no fixer available
        if (!isAllowed(node.original, LAST_OBJECT_PROP_NAME) || isGetHelperWithMatchedLiteral(node, path, LAST_OBJECT_PROP_NAME)) {
          this.log({
            message: ERROR_MESSAGES.LAST_OBJECT,
            node,
            isFixable: false
          });
        }

        // handle for `firstObject`, fixer available
        // check if applies to format like {{get @list `firstObject.name`}}
        const isGetWithFirstObjectInLiteral = isGetHelperWithMatchedLiteral(node, path, FIRST_OBJECT_PROP_NAME);
        if (!isAllowed(node.original, FIRST_OBJECT_PROP_NAME) || isGetWithFirstObjectInLiteral) {
          if (this.mode === 'fix') {
            // for get path with disallowed literal format
            if (isGetWithFirstObjectInLiteral) {
              const newValue = getFirstObjectFixerLiteral(path);
              path.parentNode.params[1].original = newValue;
              path.parentNode.params[1].value = newValue;
              // for paths with a GlimmerMustacheStatement parentNode replace the pathExpression with a get helper pathExpression
              // eg: `{{this.list.firstObject}}` => `{{get this.list "0"}}`
            } else if (path.parentNode.type === 'GlimmerMustacheStatement' && path.parentKey === 'path') {
              path.parentNode[path.parentKey] = _emberTemplateRecast.builders.path('get', node.loc);
              path.parentNode.params = getHelperParams(node);
            } else {
              // replace the pathExpression with a get helper subExpression
              node = _emberTemplateRecast.builders.sexpr('get', getHelperParams(node));
            }
          } else {
            this.log({
              message: ERROR_MESSAGES.FIRST_OBJECT,
              node,
              isFixable: true
            });
          }
        }
        return node;
      }
    };
  }
}
exports.default = NoArrayPrototypeExtensions;
module.exports = exports.default;