"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ERROR_MESSAGE = 'The handlebars `mut(attr)` helper should only have one argument passed to it. To pass a value, use: `(action (mut attr) value)`.';
class NoExtraMutHelperArgument extends _base.default {
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