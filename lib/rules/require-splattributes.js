"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class RequireSplattributes extends _base.default {
  visitor() {
    let foundSplattributes = false;
    return {
      GlimmerAttrNode(node) {
        if (node.name === '...attributes') {
          foundSplattributes = true;
        }
      },
      GlimmerTemplate: {
        exit(node) {
          if (!foundSplattributes) {
            let {
              body
            } = node;
            let elementNodes = body.filter(it => it.type === 'GlimmerElementNode');
            let nonEmptyTextNodes = body.filter(it => it.type === 'GlimmerTextNode' && it.chars.trim());
            if (elementNodes.length === 1 && nonEmptyTextNodes.length === 0) {
              this.report({
                message: 'The root element in this template should use `...attributes`',
                node: elementNodes[0]
              });
            } else {
              this.report({
                message: 'At least one element in this template should use `...attributes`',
                node
              });
            }
          }
        }
      }
    };
  }
  report({
    message,
    node
  }) {
    this.log({
      message,
      node
    });
  }
}
exports.default = RequireSplattributes;