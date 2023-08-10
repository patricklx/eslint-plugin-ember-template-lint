"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const message = 'Unexpected block usage. The {{input}} helper may only be used inline.';
class NoInputBlock extends _base.default {
  _checkForInput(node) {
    if (node.path.original === 'input') {
      this.log({
        message,
        node
      });
    }
  }
  visitor() {
    return {
      GlimmerBlockStatement(node) {
        this._checkForInput(node);
      }
    };
  }
}
exports.default = NoInputBlock;