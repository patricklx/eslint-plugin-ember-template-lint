"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const message = 'Unexpected {{partial}} usage.';
class NoPartial extends _base.default {
  _checkForPartial(node) {
    if (node.path.original === 'partial') {
      this.log({
        message,
        node
      });
    }
  }
  visitor() {
    return {
      GlimmerMustacheStatement(node) {
        this._checkForPartial(node);
      }
    };
  }
}
exports.default = NoPartial;