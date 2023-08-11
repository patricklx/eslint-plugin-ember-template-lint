"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = require("./_base.js");
const ERROR_MESSAGE = '{{yield}}-only templates are not allowed';
class NoYieldOnly extends _base {
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
module.exports = exports.default;