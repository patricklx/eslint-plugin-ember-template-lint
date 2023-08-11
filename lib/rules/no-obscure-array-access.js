"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _emberTemplateRecast = require("ember-template-recast");
var _base = require("./_base.js");
const PATH_REGEXP = /\.\d+(\.|$)/;
const DIGIT_REGEXP = /^\d+$/;
const ERROR_MESSAGE = "Obscure expressions are prohibited. Please use Ember's get helper instead. e.g. {{get @list '0'}}";

/**
 * generate a tuple of pathExpression before digit and string of parts after digit index e.g. [this.list, '0.name']
 *
 * @param {GlimmerPathExpression} node The pathExpression node that should be wrapped in a get helper
 * @returns a tuple of path parts before digit and path parts after digit index e.g. [this.list, '0.name']
 */
function getHelperParams(node) {
  // use node.original instead of node.parts so the context isn't dropped
  const originalParts = node.original.split('.');
  const firstDigitIndex = originalParts.findIndex(part => DIGIT_REGEXP.test(part));
  return [_emberTemplateRecast.builders.path({
    head: originalParts.slice(0, firstDigitIndex).join('.')
  }, node.loc), _emberTemplateRecast.builders.literal('GlimmerStringLiteral', originalParts.slice(firstDigitIndex).join('.'), node.loc)];
}
class NoObscureArrayAccess extends _base {
  visitor() {
    return {
      GlimmerPathExpression(node, path) {
        if (node.original && PATH_REGEXP.test(node.original)) {
          if (this.mode === 'fix') {
            // for paths with a GlimmerMustacheStatement parentNode replace the pathExpression with a get helper pathExpression
            if (path.parentNode.type === 'GlimmerMustacheStatement') {
              path.parentNode[path.parentKey] = _emberTemplateRecast.builders.path('get', node.loc);
              path.parentNode.params = getHelperParams(node);
            } else {
              // replace the pathExpression with a get helper subExpression
              node = _emberTemplateRecast.builders.sexpr('get', getHelperParams(node));
            }
          } else {
            this.log({
              message: ERROR_MESSAGE,
              source: `${node.original}`,
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
exports.default = NoObscureArrayAccess;
module.exports = exports.default;