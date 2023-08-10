"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _astNodeInfo = _interopRequireDefault(require("../helpers/ast-node-info.js"));
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ERROR_MESSAGE = '{{#each}} helper requires a valid key value to avoid performance issues';
const SPECIAL_KEY_VALUES = new Set(['@index', '@identity']);
class RequireEachKey extends _base.default {
  visitor() {
    return {
      GlimmerBlockStatement(node) {
        const isEach = _astNodeInfo.default.isEach(node);
        const keyPair = node.hash.pairs.find(p => p.key === 'key');
        const keyValue = keyPair && keyPair.value && keyPair.value.value;
        const isSpecialKey = keyValue && keyValue.startsWith('@');
        const isValidKey = isSpecialKey ? SPECIAL_KEY_VALUES.has(keyValue) : keyValue;
        const noKey = isEach && !keyPair;
        const invalidKey = isEach && !isValidKey;
        if (noKey || invalidKey) {
          this.log({
            message: ERROR_MESSAGE,
            node
          });
        }
      }
    };
  }
}
exports.default = RequireEachKey;