"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERROR_MESSAGE_RESERVED = ERROR_MESSAGE_RESERVED;
exports.default = void 0;
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ERROR_MESSAGE_CAPITAL = 'Capital argument names is not supported';
function ERROR_MESSAGE_RESERVED(name) {
  return `${name} is reserved argument name, try to use another`;
}
const AllowedPrefix = /[a-z]/;
const RESERVED = new Set(['@arguments', '@args', '@block', '@else']);
class NoCapitalArguments extends _base.default {
  isReserved(name) {
    return RESERVED.has(name);
  }
  visitor() {
    return {
      GlimmerPathExpression(node) {
        if (node.data) {
          let part = node.parts[0] || '';
          let firstChar = part.charAt(0);
          let isReserved = this.isReserved(`@${part}`);
          if (!AllowedPrefix.test(firstChar) || isReserved) {
            this.log({
              message: isReserved ? ERROR_MESSAGE_RESERVED(`@${part}`) : ERROR_MESSAGE_CAPITAL,
              node,
              column: node.loc && node.loc.start.column + 1,
              source: part
            });
          }
        }
      },
      GlimmerAttrNode(node) {
        if (node.name.startsWith('@')) {
          let firstChar = node.name.charAt(1);
          let isReserved = this.isReserved(node.name);
          if (!AllowedPrefix.test(firstChar) || isReserved) {
            this.log({
              message: isReserved ? ERROR_MESSAGE_RESERVED(node.name) : ERROR_MESSAGE_CAPITAL,
              node,
              source: this.sourceForNode(node).slice(1, node.name.length)
            });
          }
        }
      }
    };
  }
}
exports.default = NoCapitalArguments;