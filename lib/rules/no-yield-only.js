"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ERROR_MESSAGE = '{{yield}}-only templates are not allowed';
class NoYieldOnly extends _base.default {
  visitor() {
    if (this._rawSource.trim() !== '{{yield}}') {
      return;
    }
    return {
      GlimmerMustacheStatement(node) {
        this.log({
          message: ERROR_MESSAGE,
          node
        });
      }
    };
  }
}
exports.default = NoYieldOnly;