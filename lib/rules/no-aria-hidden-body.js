"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _astNodeInfo = _interopRequireDefault(require("../helpers/ast-node-info.js"));
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ERROR_MESSAGE = 'The aria-hidden attribute should never be present on the <body> element, as it hides the entire document from assistive technology';
class NoAriaHiddenBody extends _base.default {
  visitor() {
    return {
      GlimmerElementNode(node) {
        let hasAriaHiddenBody = node.tag === 'body' && _astNodeInfo.default.hasAttribute(node, 'aria-hidden');
        if (hasAriaHiddenBody) {
          if (this.mode === 'fix') {
            node.attributes = node.attributes.filter(a => a.name !== 'aria-hidden');
          } else {
            this.log({
              message: ERROR_MESSAGE,
              node,
              isFixable: true
            });
          }
        }
      }
    };
  }
}
exports.default = NoAriaHiddenBody;