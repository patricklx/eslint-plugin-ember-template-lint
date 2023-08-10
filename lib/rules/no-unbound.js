"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const message = 'Unexpected {{unbound}} usage.';
class NoUnbound extends _base.default {
  _checkForUnbound(node) {
    if (node.path.original === 'unbound') {
      this.log({
        message,
        node
      });
    }
  }
  visitor() {
    return {
      GlimmerMustacheStatement(node) {
        this._checkForUnbound(node);
      },
      GlimmerBlockStatement(node) {
        this._checkForUnbound(node);
      },
      GlimmerSubExpression(node) {
        this._checkForUnbound(node);
      }
    };
  }
}
exports.default = NoUnbound;