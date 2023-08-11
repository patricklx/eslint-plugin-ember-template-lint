"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = require("./_base.js");
const ERROR_MESSAGE = 'Unexpected {{log}} usage.';
class NoLog extends _base {
  _checkForLog(node) {
    if (node.path.original === 'log' && !this.isLocal(node)) {
      this.log({
        message: ERROR_MESSAGE,
        node
      });
    }
  }
  visitor() {
    return {
      GlimmerMustacheStatement(node) {
        this._checkForLog(node);
      },
      GlimmerBlockStatement(node) {
        this._checkForLog(node);
      }
    };
  }
}
exports.default = NoLog;
module.exports = exports.default;