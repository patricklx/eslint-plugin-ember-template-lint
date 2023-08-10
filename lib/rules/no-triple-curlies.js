"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class NoTripleCurlies extends _base.default {
  visitor() {
    return {
      GlimmerMustacheStatement(node) {
        if (!node.escaped) {
          this.log({
            message: 'Usage of triple curly brackets is unsafe',
            node,
            source: `{{{${node.path.original}}}}`
          });
        }
      }
    };
  }
}
exports.default = NoTripleCurlies;