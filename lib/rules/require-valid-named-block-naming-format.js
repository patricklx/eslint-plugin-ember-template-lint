"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FORMAT = void 0;
var _camelize = require("../helpers/camelize.js");
var _createErrorMessage = require("../helpers/create-error-message.js");
var _dasherizeComponentName = require("../helpers/dasherize-component-name.js");
var _nodeMatcher = require("../helpers/node-matcher.js");
var _base = require("./_base.js");
const FORMAT = {
  CAMEL_CASE: 'camelCase',
  KEBAB_CASE: 'kebab-case'
};
exports.FORMAT = FORMAT;
const FORMAT_METHOD = {
  [FORMAT.CAMEL_CASE]: _camelize,
  [FORMAT.KEBAB_CASE]: _dasherizeComponentName
};
const FORMATS = Object.values(FORMAT);
const DEFAULT_FORMAT = FORMAT.CAMEL_CASE;
class RequireValidNamedBlockNamingFormat extends _base {
  parseConfig(config) {
    let configType = typeof config;
    switch (configType) {
      case 'boolean':
        {
          return config ? DEFAULT_FORMAT : false;
        }
      case 'string':
        {
          if (FORMATS.includes(config)) {
            return config;
          }
          break;
        }
      case 'undefined':
        {
          return false;
        }
    }
    let errorMessage = _createErrorMessage(this.ruleName, FORMATS.map(format => `  * "${format}" - Requires the use of the "${format}" naming format.`), config);
    throw new Error(errorMessage);
  }
  visitor() {
    return {
      GlimmerMustacheStatement(node) {
        if (isHasBlockNode(node)) {
          this._checkHasBlockNode(node);
        } else if (isYieldNode(node)) {
          this._checkYieldNode(node);
        }
      },
      GlimmerSubExpression(node) {
        if (isHasBlockNode(node)) {
          this._checkHasBlockNode(node);
        }
      }
    };
  }
  _checkHasBlockNode(node) {
    let nameArgument = node.params[0];
    if (nameArgument && nameArgument.type === 'GlimmerStringLiteral') {
      this._checkNamedBlockName(nameArgument.original, nameArgument);
    }
  }
  _checkYieldNode(node) {
    let toArgument = node.hash.pairs.find(pair => pair.key === 'to');
    if (toArgument && toArgument.value.type === 'GlimmerStringLiteral') {
      this._checkNamedBlockName(toArgument.value.original, toArgument);
    }
  }
  _checkNamedBlockName(name, node) {
    let formatMethod = FORMAT_METHOD[this.config];
    let requiredName = formatMethod(name);
    if (name !== requiredName) {
      if (this.mode === 'fix') {
        if (node.type === 'GlimmerStringLiteral') {
          node.value = requiredName;
        } else {
          node.value.value = requiredName;
        }
      } else {
        this.log({
          message: createErrorMessage(this.config, name, requiredName),
          node,
          isFixable: true
        });
      }
    }
  }
}
exports.default = RequireValidNamedBlockNamingFormat;
function isHasBlockNode(node) {
  return (0, _nodeMatcher.match)(node.path, {
    original: 'has-block',
    type: 'GlimmerPathExpression'
  }) || (0, _nodeMatcher.match)(node.path, {
    original: 'has-block-params',
    type: 'GlimmerPathExpression'
  });
}
function isYieldNode(node) {
  return (0, _nodeMatcher.match)(node.path, {
    original: 'yield',
    type: 'GlimmerPathExpression'
  });
}
function createErrorMessage(format, from, to) {
  return `Named blocks are required to use the "${format}" naming format. Please change "${from}" to "${to}".`;
}