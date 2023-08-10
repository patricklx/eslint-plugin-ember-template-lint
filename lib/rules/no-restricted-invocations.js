"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _createErrorMessage = _interopRequireDefault(require("../helpers/create-error-message.js"));
var _dasherizeComponentName = _interopRequireDefault(require("../helpers/dasherize-component-name.js"));
var _isDasherizedComponentOrHelperName = _interopRequireDefault(require("../helpers/is-dasherized-component-or-helper-name.js"));
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function isValidCustomErrorMessage(str) {
  return typeof str === 'string' && str.length > 0;
}
class NoRestrictedInvocations extends _base.default {
  parseConfig(config) {
    switch (typeof config) {
      case 'boolean':
        {
          if (!config) {
            return false;
          }
          break;
        }
      case 'object':
        {
          if (Array.isArray(config) && config.length > 0 && config.every(item => typeof item === 'string' && (0, _isDasherizedComponentOrHelperName.default)(item) || typeof item === 'object' && Array.isArray(item.names) && item.names.length > 0 && item.names.every(_isDasherizedComponentOrHelperName.default) && isValidCustomErrorMessage(item.message))) {
            return config;
          }
          break;
        }
      case 'undefined':
        {
          return false;
        }
    }
    let errorMessage = (0, _createErrorMessage.default)(this.ruleName, ['  One of these:', '  * string[] - helpers or components to disallow (using kebab-case names like `nested-scope/component-name`)', '  * object[] - with the following keys:', '    * `names` - string[] - helpers or components to disallow (using kebab-case names like `nested-scope/component-name`)', '    * `message` - string - custom error message to report for violations'].join('\n'), config);
    throw new Error(errorMessage);
  }
  visitor() {
    let checkDenylist = node => {
      let denylist = this.config;
      const name = this._getComponentOrHelperName(node);
      if (!name) {
        return;
      }
      const nameToDisplay = node.type === 'GlimmerElementNode' ? `<${node.tag} />` : `{{${name}}}`;
      for (let denylistItem of denylist) {
        if (typeof denylistItem === 'object') {
          if (denylistItem.names.includes(name)) {
            this._logNode(node, nameToDisplay, denylistItem.message);
          }
        } else {
          if (denylistItem === name) {
            this._logNode(node, nameToDisplay, denylistItem.message);
          }
        }
      }
    };
    return {
      GlimmerBlockStatement: checkDenylist,
      GlimmerElementModifierStatement: checkDenylist,
      GlimmerElementNode: checkDenylist,
      GlimmerMustacheStatement: checkDenylist,
      GlimmerSubExpression: checkDenylist
    };
  }
  _getComponentOrHelperName(node) {
    if (this.isLocal(node)) {
      return undefined;
    }
    if (node.type === 'GlimmerElementNode') {
      // Convert from angle-bracket naming to kebab-case.
      return (0, _dasherizeComponentName.default)(node.tag);
    } else {
      if (node.path.original === 'component' && node.params[0]) {
        return node.params[0].original;
      } else {
        return node.path.original;
      }
    }
  }
  _logNode(node, name, message) {
    this.log({
      message: message || `Cannot use disallowed helper, component or modifier '${name}'`,
      node
    });
  }
}
exports.default = NoRestrictedInvocations;