"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _astNodeInfo = require("../helpers/ast-node-info.js");
var _base = require("./_base.js");
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
class LinkHrefAttributes extends _base {
  visitor() {
    return {
      GlimmerElementNode(node) {
        if (node.tag === 'a' && !_astNodeInfo.hasAttribute(node, 'href')) {
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
module.exports = exports.default;