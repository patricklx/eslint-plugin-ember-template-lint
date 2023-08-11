"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = require("./_base.js");
const message = 'Unexpected {{unbound}} usage.';
class NoUnbound extends _base {
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
module.exports = exports.default;