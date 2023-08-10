"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("./_base.js"));
var _nodeMatcher = require("../helpers/node-matcher.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class SimpleModifiers extends _base.default {
  visitor() {
    return {
      GlimmerSubExpression(node) {
        if (!this._isModifier(node)) {
          return;
        }
        const firstModifierParam = node.params[0];
        if (firstModifierParam) {
          this._validateModifier(firstModifierParam);
        } else {
          this._logError(node);
        }
      }
    };
  }
  _validateModifier(node) {
    // First argument of the modifier must be a string
    if (node.type === 'GlimmerStringLiteral' || node.type === 'GlimmerPathExpression') {
      return;
    }
    this._logError(node);
  }
  _isModifier(node) {
    return (0, _nodeMatcher.match)(node.path, {
      original: 'modifier',
      type: 'GlimmerPathExpression'
    });
  }
  _logError(node) {
    this.log({
      message: 'The modifier helper should have a string or a variable name containing the modifier name as a first argument.',
      node
    });
  }
}
exports.default = SimpleModifiers;