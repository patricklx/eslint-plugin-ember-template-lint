"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = require("./_base.js");
class NoTripleCurlies extends _base {
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
module.exports = exports.default;