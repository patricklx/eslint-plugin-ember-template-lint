"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = require("./_base.js");
class NoClassBindings extends _base {
  visitor() {
    function check(node) {
      let isAttrNode = node.type === 'GlimmerAttrNode';
      let specifiedKey = isAttrNode ? node.name : node.key;
      let argumentName = isAttrNode ? node.name : `@${node.key}`;
      if (argumentName === '@classBinding' || argumentName === '@classNameBindings') {
        this.log({
          message: `Passing the \`${specifiedKey}\` property as an argument within templates is not allowed.`,
          node
        });
      }
    }
    return {
      GlimmerAttrNode: check,
      GlimmerHashPair: check
    };
  }
}
exports.default = NoClassBindings;
module.exports = exports.default;