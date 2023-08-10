"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class NoClassBindings extends _base.default {
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