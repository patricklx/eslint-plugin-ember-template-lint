"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = require("./_base.js");
const message = 'Unexpected {{debugger}} usage.';
class NoDebugger extends _base {
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
module.exports = exports.default;