"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dasherizeComponentName = require("../helpers/dasherize-component-name.js");
var _nodeMatcher = require("../helpers/node-matcher.js");
var _base = require("./_base.js");
function generateErrorMessage(modifierName) {
  let dasherizeModifierName = _dasherizeComponentName(modifierName);
  return `Use dasherized names for modifier invocation. Please replace \`${modifierName}\` with \`${dasherizeModifierName}\`.`;
}
class ModifierNameCase extends _base {
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
    if (typeof modifierName !== 'string' || modifierName === _dasherizeComponentName(modifierName)) {
      return;
    }
    if (this.mode === 'fix') {
      if (node.type === 'GlimmerStringLiteral') {
        node.value = _dasherizeComponentName(modifierName);
      } else {
        node.original = _dasherizeComponentName(modifierName);
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
module.exports = exports.default;