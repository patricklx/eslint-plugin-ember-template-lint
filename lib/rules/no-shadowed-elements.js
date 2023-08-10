"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isAngleBracketComponent = _interopRequireDefault(require("../helpers/is-angle-bracket-component.js"));
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class NoShadowedElements extends _base.default {
  visitor() {
    return {
      GlimmerElementNode(node) {
        // not a local, so cannot be shadowing native element
        if (!this.isLocal(node)) {
          return;
        }

        // not an angle bracket invocation at all, can't be shadowing
        if (!(0, _isAngleBracketComponent.default)(this.scope, node)) {
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