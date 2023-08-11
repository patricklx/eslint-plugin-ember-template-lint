"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = require("./_base.js");
const ERROR_MESSAGE = 'Excess whitespace detected.';
class NoWhitespaceForLayout extends _base {
  visitor() {
    return {
      GlimmerTextNode(node) {
        let source = this.sourceForNode(node);
        let lines = source.split('\n');
        for (let line of lines) {
          // ignore whitespace at the start and end of the line
          let trimmed = line.trim();

          // check for two ` ` or `&nbsp;` in a row
          let matches = trimmed.match(/(( )|(&nbsp;))(( )|(&nbsp;))/g);
          if (matches !== null) {
            this.log({
              message: ERROR_MESSAGE,
              node
            });
            return;
          }
        }
      }
    };
  }
}
exports.default = NoWhitespaceForLayout;
module.exports = exports.default;