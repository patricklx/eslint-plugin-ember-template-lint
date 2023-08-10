"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class NoArgsPaths extends _base.default {
  visitor() {
    const isLocal = this.isLocal.bind(this);
    const log = this.log.bind(this);
    function checkPathForArgs(node) {
      if (node.parts && node.parts[0] === 'args') {
        if (node.data) {
          return false;
        }
        if (isLocal(node)) {
          return false;
        }
        return node.parts.length !== 1;
      }
      return false;
    }
    function lintArgsUsage(node) {
      const possibleLintError = checkPathForArgs(node);
      if (possibleLintError === true) {
        log({
          message: `GlimmerComponent templates should avoid "${node.original}" usage, try "@${node.parts.slice(1).join('.')}" instead.`,
          node
        });
      }
    }
    return {
      GlimmerPathExpression(node) {
        lintArgsUsage(node);
      }
    };
  }
}
exports.default = NoArgsPaths;