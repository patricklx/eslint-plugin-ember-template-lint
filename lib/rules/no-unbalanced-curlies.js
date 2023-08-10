"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _emberTemplateRecast = require("ember-template-recast");
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ERROR_MESSAGE = 'Unbalanced curlies detected';
const SUSPECT_CHARS = '}}';
const reLines = /(.*?(?:\r\n?|\n|$))/gm;
class NoUnbalancedCurlies extends _base.default {
  visitor() {
    return {
      GlimmerTextNode(node) {
        let {
          chars
        } = node;
        if (!chars.includes(SUSPECT_CHARS)) {
          return;
        }
        let source = this.sourceForNode(node);
        let isMustache = false;
        try {
          let result = (0, _emberTemplateRecast.parse)(chars);
          if (result.body.length && result.body[0].type === 'GlimmerMustacheStatement') {
            isMustache = true;
          }
        } catch {
          // Not Mustache then. We'll proceed to find
          // the exact location of the error.
        }
        if (isMustache) {
          return;
        }
        let {
          loc
        } = node;
        let lineNum = loc.start.line;
        let colNum = loc.start.column;
        let lines = chars.match(reLines);
        for (const line of lines) {
          if (line.includes(SUSPECT_CHARS)) {
            this.log({
              message: ERROR_MESSAGE,
              line: lineNum,
              node,
              column: colNum + line.indexOf(SUSPECT_CHARS),
              source
            });
          }
          lineNum++;
          colNum = 1;
        }
      }
    };
  }
}
exports.default = NoUnbalancedCurlies;