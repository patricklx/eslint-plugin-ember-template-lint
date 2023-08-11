"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isAngleBracketComponent = require("../helpers/is-angle-bracket-component.js");
var _base = require("./_base.js");
class NoShadowedElements extends _base {
  visitor() {
    return {
      GlimmerElementNode(node) {
        // not a local, so cannot be shadowing native element
        if (!this.isLocal(node)) {
          return;
        }

        // not an angle bracket invocation at all, can't be shadowing
        if (!_isAngleBracketComponent(this.scope, node)) {
          return;
        }
        let firstChar = node.tag.charAt(0);
        let startsWithUpperCase = firstChar === firstChar.toUpperCase() && firstChar !== firstChar.toLowerCase();
        let containsDot = node.tag.includes('.');
        if (!startsWithUpperCase && !containsDot) {
          this.log({
            message: `Ambiguous element used (\`${node.tag}\`)`,
            node
          });
        }
      }
    };
  }
}
exports.default = NoShadowedElements;
module.exports = exports.default;