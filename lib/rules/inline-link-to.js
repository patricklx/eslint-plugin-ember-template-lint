"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _emberTemplateRecast = require("ember-template-recast");
var _replaceNode = _interopRequireDefault(require("../helpers/replace-node.js"));
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const message = 'The inline form of link-to is not allowed. Use the block form instead.';
class InlineLinkTo extends _base.default {
  visitor() {
    return {
      GlimmerMustacheStatement(node, {
        parentNode,
        parentKey
      }) {
        if (node.path.original === 'link-to') {
          let titleNode = node.params[0];
          let isFixable = titleNode.type === 'GlimmerSubExpression' || titleNode.type === 'GlimmerStringLiteral';
          if (this.mode === 'fix' && isFixable) {
            let newBody;
            if (titleNode.type === 'GlimmerSubExpression') {
              newBody = _emberTemplateRecast.builders.mustache(titleNode.path, titleNode.params, titleNode.hash);
            } else if (titleNode.type === 'GlimmerStringLiteral') {
              newBody = _emberTemplateRecast.builders.text(titleNode.value);
            }
            (0, _replaceNode.default)(node, parentNode, parentKey, _emberTemplateRecast.builders.block(node.path, node.params.slice(1), node.hash, _emberTemplateRecast.builders.blockItself([newBody])));
          } else {
            this.log({
              message,
              node,
              isFixable
            });
          }
        }
      }
    };
  }
}
exports.default = InlineLinkTo;