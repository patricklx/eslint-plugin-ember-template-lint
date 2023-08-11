"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ariaQuery = require("aria-query");
var _astNodeInfo = require("../helpers/ast-node-info.js");
var _base = require("./_base.js");
const HTML_TAGS = new Set(_ariaQuery.dom.keys());
const ERROR_MESSAGE = 'The scope attribute should only be set on <th> elements';
class NoScopeOutsideTableHeadings extends _base {
  visitor() {
    return {
      GlimmerElementNode(node) {
        let hasScope = _astNodeInfo.hasAttribute(node, 'scope');
        if (!hasScope) {
          return;
        }
        // Bypass validation of custom components, since we do not know what HTML tags they have
        if (!HTML_TAGS.has(node.tag)) {
          return;
        }
        if (hasScope && node.tag !== 'th') {
          this.log({
            message: ERROR_MESSAGE,
            node
          });
        }
      }
    };
  }
}
exports.default = NoScopeOutsideTableHeadings;
module.exports = exports.default;