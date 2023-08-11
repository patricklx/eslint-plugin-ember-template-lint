"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERROR_MESSAGE_ARIA_UNSUPPORTED_PROPERTY = ERROR_MESSAGE_ARIA_UNSUPPORTED_PROPERTY;
exports.default = void 0;
var _astNodeInfo = require("../helpers/ast-node-info.js");
var _base = require("./_base.js");
function ERROR_MESSAGE_ARIA_UNSUPPORTED_PROPERTY(tag, name) {
  return `The <${tag}> element does not support the use of ARIA roles, states, and properties such as "${name}"`;
}
const NON_ARIA_ELEMENTS = new Set(['html', 'meta', 'script', 'style']);
class NoAriaUnsupportedElements extends _base {
  visitor() {
    return {
      GlimmerElementNode(node) {
        const isReserved = NON_ARIA_ELEMENTS.has(node.tag);
        if (isReserved) {
          // Detect `role` attribute
          const hasRoleAttr = _astNodeInfo.findAttribute(node, 'role');
          if (hasRoleAttr) {
            this.log({
              message: ERROR_MESSAGE_ARIA_UNSUPPORTED_PROPERTY(node.tag, 'role'),
              node
            });
          }

          // Detect `aria-*` attributes
          for (const attribute of node.attributes) {
            if (attribute.name.startsWith('aria-')) {
              this.log({
                message: ERROR_MESSAGE_ARIA_UNSUPPORTED_PROPERTY(node.tag, attribute.name),
                node
              });
            }
          }
        }
      }
    };
  }
}
exports.default = NoAriaUnsupportedElements;