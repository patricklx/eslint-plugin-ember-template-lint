"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class NoDynamicSubexpressionInvocations extends _base.default {
  logDynamicInvocation(node, path) {
    if (node.path.type !== 'GlimmerPathExpression') {
      return;
    }
    let isLocal = this.scope.isLocal(node.path);
    let isPath = node.path.parts.length > 1;
    let isThisPath = node.path.original.startsWith('this.');
    let isNamedArgument = node.path.original.startsWith('@');
    let hasArguments = node.params.length > 0 || node.hash.length > 0;
    let isDynamic = isLocal || isNamedArgument || isPath || isThisPath;
    switch (node.type) {
      case 'GlimmerElementModifierStatement':
      case 'GlimmerSubExpression':
        {
          if (isDynamic) {
            this.log({
              message: `You cannot invoke a dynamic value in the ${node.type} position`,
              node
            });
          }
          break;
        }
      case 'GlimmerMustacheStatement':
        {
          let parents = [...path.parents()];
          let isAttr = parents.some(it => it.node.type === 'GlimmerAttrNode');
          if (isAttr && isDynamic && hasArguments) {
            this.log({
              message: 'You must use the `fn` helper to create a function with arguments to invoke',
              node
            });
          }
        }
    }
  }
  visitor() {
    return {
      GlimmerMustacheStatement(node, path) {
        this.logDynamicInvocation(node, path);
      },
      GlimmerSubExpression(node, path) {
        this.logDynamicInvocation(node, path);
      },
      GlimmerElementModifierStatement(node, path) {
        this.logDynamicInvocation(node, path);
      }
    };
  }
}
exports.default = NoDynamicSubexpressionInvocations;