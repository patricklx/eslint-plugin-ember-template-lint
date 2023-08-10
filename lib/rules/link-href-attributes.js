"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _astNodeInfo = _interopRequireDefault(require("../helpers/ast-node-info.js"));
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 Disallow usage of `<a>` without an `href` attribute.

 Good:

 ```
 <a href="http://localhost">
 ```

 Bad:

 ```
 <a>
 ```
*/
class LinkHrefAttributes extends _base.default {
  visitor() {
    return {
      GlimmerElementNode(node) {
        if (node.tag === 'a' && !_astNodeInfo.default.hasAttribute(node, 'href')) {
          this.log({
            message: 'a tags must have an href attribute',
            node
          });
        }
      }
    };
  }
}
exports.default = LinkHrefAttributes;