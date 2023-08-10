"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function makeErrorMessage(usageContext) {
  return `Do not use \`action\` as ${usageContext}. Instead, use the \`on\` modifier and \`fn\` helper.`;
}
class NoAction extends _base.default {
  visitor() {
    const isLocal = this.isLocal.bind(this);
    const log = this.log.bind(this);
    let closestTag = null;
    function detectAction(node, usageContext) {
      if (isLocal(node.path)) {
        return;
      }
      let maybeAction = node.path.original;
      if (node.path.type === 'GlimmerStringLiteral') {
        return;
      }
      if (maybeAction !== 'action') {
        return;
      }
      if (node.path.data === true || node.path.this === true) {
        return;
      }
      log({
        message: makeErrorMessage(usageContext),
        node
      });
    }
    return {
      GlimmerSubExpression: node => {
        detectAction(node, '(action ...)');
      },
      GlimmerMustacheStatement: node => {
        detectAction(node, '{{action ...}}');
      },
      GlimmerElementNode: node => {
        closestTag = node.tag;
      },
      GlimmerElementModifierStatement: node => {
        detectAction(node, `<${closestTag} {{action ...}} />`);
      }
    };
  }
}
exports.default = NoAction;