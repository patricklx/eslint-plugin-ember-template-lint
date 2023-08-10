"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MESSAGES = void 0;
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const WHY = `This modifier was intended to ease migration to Octane and not for long-term side-effects.`;
const ACTION = `Instead, refactor to use a custom modifier. See https://github.com/ember-modifier/ember-modifier`;
const MESSAGES = {
  'did-insert': `Do not use the \`did-insert\` modifier. ${WHY} ${ACTION}`,
  'did-update': `Do not use the \`did-update\` modifier. ${WHY} ${ACTION}`,
  'will-destroy': `Do not use the \`will-destroy\` modifier. ${WHY} ${ACTION}`
};
exports.MESSAGES = MESSAGES;
const MODIFIERS = new Set([`did-insert`, `did-update`, `will-destroy`]);
class NoAtEmberRenderModifiers extends _base.default {
  visitor() {
    return {
      GlimmerElementModifierStatement(node) {
        let modifierName = node.path.original;
        if (!MODIFIERS.has(modifierName)) {
          return;
        }
        this.log({
          message: MESSAGES[modifierName],
          node,
          source: this.sourceForNode(node)
        });
      }
    };
  }
}
exports.default = NoAtEmberRenderModifiers;