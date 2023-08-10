"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _astNodeInfo = _interopRequireDefault(require("../helpers/ast-node-info.js"));
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ERROR_MESSAGE = 'Concatenated styles must be marked as `htmlSafe`.';
class StyleConcatenation extends _base.default {
  visitor() {
    return {
      GlimmerElementNode(node) {
        let style = _astNodeInfo.default.findAttribute(node, 'style');
        if (style && (style.value.type === 'GlimmerConcatStatement' || style.value.type === 'GlimmerMustacheStatement' && isConcatHelper(style.value.path))) {
          this.log({
            message: ERROR_MESSAGE,
            node: style
          });
        }
      }
    };
  }
}
exports.default = StyleConcatenation;
function isConcatHelper(node) {
  return node && node.type === 'GlimmerPathExpression' && node.original === 'concat';
}