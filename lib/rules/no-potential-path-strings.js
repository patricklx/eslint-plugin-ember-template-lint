"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = require("./_base.js");
class NoPotentialPathStrings extends _base {
  visitor() {
    return {
      GlimmerAttrNode(node) {
        let {
          value
        } = node;
        if (value.type === 'GlimmerTextNode' && (value.chars.startsWith('@') || value.chars.startsWith('this.'))) {
          this.log({
            message: NoPotentialPathStrings.generateErrorMessage(value.chars),
            node: value
          });
        }
      }
    };
  }
  static generateErrorMessage(path) {
    return `Potential path in attribute string detected. Did you mean {{${path}}}?`;
  }
}
exports.default = NoPotentialPathStrings;
module.exports = exports.default;