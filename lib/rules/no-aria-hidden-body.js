"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _astNodeInfo = require("../helpers/ast-node-info.js");
var _base = require("./_base.js");
const ERROR_MESSAGE = 'The aria-hidden attribute should never be present on the <body> element, as it hides the entire document from assistive technology';
class NoAriaHiddenBody extends _base {
  visitor() {
    return {
      GlimmerElementNode(node) {
        let hasAriaHiddenBody = node.tag === 'body' && _astNodeInfo.hasAttribute(node, 'aria-hidden');
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
module.exports = exports.default;