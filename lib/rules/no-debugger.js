"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const message = 'Unexpected {{debugger}} usage.';
class NoDebugger extends _base.default {
  _checkForDebugger(node) {
    if (node.path.original === 'debugger') {
      this.log({
        message,
        node
      });
    }
  }
  visitor() {
    return {
      GlimmerMustacheStatement(node) {
        this._checkForDebugger(node);
      },
      GlimmerBlockStatement(node) {
        this._checkForDebugger(node);
      }
    };
  }
}
exports.default = NoDebugger;