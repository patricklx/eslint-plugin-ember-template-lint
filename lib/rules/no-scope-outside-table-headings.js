"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ariaQuery = require("aria-query");
var _astNodeInfo = _interopRequireDefault(require("../helpers/ast-node-info.js"));
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const HTML_TAGS = new Set(_ariaQuery.dom.keys());
const ERROR_MESSAGE = 'The scope attribute should only be set on <th> elements';
class NoScopeOutsideTableHeadings extends _base.default {
  visitor() {
    return {
      GlimmerElementNode(node) {
        let hasScope = _astNodeInfo.default.hasAttribute(node, 'scope');
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