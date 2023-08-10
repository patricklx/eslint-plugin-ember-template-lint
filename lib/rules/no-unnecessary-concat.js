"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class NoUnnecessaryConcat extends _base.default {
  visitor() {
    return {
      GlimmerConcatStatement(node) {
        if (node.parts.length === 1) {
          let mustacheStatement = node.parts[0];
          let source = this.sourceForNode(node);
          let innerSource = this.sourceForNode(mustacheStatement);
          let message = `Unnecessary string concatenation. Use ${innerSource} instead of ${source}.`;
          let isFixable = true;
          if (this.mode === 'fix') {
            return mustacheStatement;
          } else {
            this.log({
              message,
              node,
              source,
              isFixable
            });
          }
        }
      }
    };
  }
}
exports.default = NoUnnecessaryConcat;