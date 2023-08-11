"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isAngleBracketComponent = require("../helpers/is-angle-bracket-component.js");
var _base = require("./_base.js");
function makeError(attrName, tagName) {
  return `Arguments (${attrName}) should not be used on HTML elements (<${tagName}>).`;
}
class NoArgumentsForHTMLElements extends _base {
  visitor() {
    function looksLikeHTMLElement(scope, node) {
      const isComponent = _isAngleBracketComponent(scope, node);
      const isSlot = node.tag.startsWith(':');
      const isPath = node.tag.includes('.');
      return !isComponent && !isSlot && !isPath;
    }
    return {
      GlimmerElementNode(node) {
        if (looksLikeHTMLElement(this.scope, node)) {
          for (const attr of node.attributes) {
            const {
              name
            } = attr;
            if (name.startsWith('@')) {
              this.log({
                message: makeError(name, node.tag),
                node: attr
              });
            }
          }
        }
      }
    };
  }
}
exports.default = NoArgumentsForHTMLElements;
module.exports = exports.default;