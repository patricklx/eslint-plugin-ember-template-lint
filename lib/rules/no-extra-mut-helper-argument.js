"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = require("./_base.js");
const ERROR_MESSAGE = 'The handlebars `mut(attr)` helper should only have one argument passed to it. To pass a value, use: `(action (mut attr) value)`.';
class NoExtraMutHelperArgument extends _base {
  visitor() {
    return {
      GlimmerSubExpression(node) {
        if (node.path.original !== 'mut') {
          return;
        }
        if (node.params.length === 1) {
          // Correct usage.
          return;
        }
        this.log({
          message: ERROR_MESSAGE,
          node
        });
      }
    };
  }
}
exports.default = NoExtraMutHelperArgument;
module.exports = exports.default;