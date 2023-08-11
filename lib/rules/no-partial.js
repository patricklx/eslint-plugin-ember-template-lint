"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = require("./_base.js");
const message = 'Unexpected {{partial}} usage.';
class NoPartial extends _base {
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
module.exports = exports.default;