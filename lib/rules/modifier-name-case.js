"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dasherizeComponentName = _interopRequireDefault(require("../helpers/dasherize-component-name.js"));
var _nodeMatcher = require("../helpers/node-matcher.js");
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function generateErrorMessage(modifierName) {
  let dasherizeModifierName = (0, _dasherizeComponentName.default)(modifierName);
  return `Use dasherized names for modifier invocation. Please replace \`${modifierName}\` with \`${dasherizeModifierName}\`.`;
}
class ModifierNameCase extends _base.default {
  visitor() {
    return {
      GlimmerElementModifierStatement(node) {
        this._validateModifierName(node.path);
      },
      GlimmerSubExpression(node) {
        if (!isModifierHelper(node)) {
          return;
        }
        let nameParam = node.params[0];
        if (nameParam && nameParam.type === 'GlimmerStringLiteral') {
          this._validateModifierName(nameParam);
        }
      }
    };
  }
  _validateModifierName(node) {
    let modifierName = node.original;
    if (typeof modifierName !== 'string' || modifierName === (0, _dasherizeComponentName.default)(modifierName)) {
      return;
    }
    if (this.mode === 'fix') {
      if (node.type === 'GlimmerStringLiteral') {
        node.value = (0, _dasherizeComponentName.default)(modifierName);
      } else {
        node.original = (0, _dasherizeComponentName.default)(modifierName);
      }
    } else {
      this.log({
        message: generateErrorMessage(modifierName),
        node,
        isFixable: true
      });
    }
  }
}
exports.default = ModifierNameCase;
function isModifierHelper(node) {
  return (0, _nodeMatcher.match)(node.path, {
    original: 'modifier',
    type: 'GlimmerPathExpression'
  });
}