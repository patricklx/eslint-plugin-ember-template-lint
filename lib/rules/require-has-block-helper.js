"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _emberTemplateRecast = require("ember-template-recast");
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const TRANSFORMATIONS = {
  hasBlock: 'has-block',
  hasBlockParams: 'has-block-params'
};
function getErrorMessage(name) {
  return `\`${name}\` is deprecated. Use the \`${TRANSFORMATIONS[name]}\` helper instead.`;
}
class RequireHasBlockHelper extends _base.default {
  visitor() {
    return {
      GlimmerPathExpression(node, path) {
        if (this.mode === 'fix') {
          if (TRANSFORMATIONS[node.original]) {
            let parent = path.parent;
            let isBlockStatement = parent.node.type === 'GlimmerBlockStatement';
            let isImplicitInvocation = ['GlimmerMustacheStatement', 'GlimmerSubExpression'].includes(parent.node.type) && parent.node.path.original !== node.original;
            if (isBlockStatement || isImplicitInvocation) {
              const paramIndex = parent.node.params.findIndex(param => {
                return param.original === node.original;
              });
              parent.node.params[paramIndex] = _emberTemplateRecast.builders.sexpr(TRANSFORMATIONS[node.original], []);
            } else {
              node.original = TRANSFORMATIONS[node.original];
            }
          }
        } else {
          if (TRANSFORMATIONS[node.original]) {
            this.log({
              message: getErrorMessage(node.original),
              node,
              isFixable: true
            });
          }
        }
      }
    };
  }
}
exports.default = RequireHasBlockHelper;