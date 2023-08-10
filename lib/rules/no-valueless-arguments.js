"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ERROR_MESSAGE = 'Named arguments should have an explicitly assigned value.';
class NoValuelessArguments extends _base.default {
  visitor() {
    return {
      GlimmerAttrNode(node) {
        let {
          name,
          isValueless
        } = node;
        if (isNamedArgument(name) && isValueless) {
          this.log({
            message: ERROR_MESSAGE,
            node
          });
        }
      }
    };
  }
}
exports.default = NoValuelessArguments;
function isNamedArgument(attrName) {
  return attrName.startsWith('@');
}