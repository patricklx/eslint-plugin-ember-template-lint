"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _nodeMatcher = require("../helpers/node-matcher.js");
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ERROR_MESSAGE = 'A block named "default" is not valid';
const BLOCK_PARAM_KEYWORDS = ['has-block', 'has-block-params', 'hasBlock', 'hasBlockParams'];
function isYield(node) {
  return (0, _nodeMatcher.match)(node, {
    type: 'GlimmerPathExpression',
    original: 'yield'
  });
}
function isBlockParamKeyword(node) {
  return BLOCK_PARAM_KEYWORDS.some(keyword => (0, _nodeMatcher.match)(node, {
    type: 'GlimmerPathExpression',
    original: keyword
  }));
}
class NoYieldToDefault extends _base.default {
  handleBlockParamKeyword(node) {
    let [toParam] = node.params;
    if ((0, _nodeMatcher.match)(toParam, {
      type: 'GlimmerStringLiteral',
      value: 'default'
    })) {
      this.log({
        message: ERROR_MESSAGE,
        node: toParam
      });
    }
  }
  visitor() {
    return {
      GlimmerMustacheStatement(node) {
        if (isYield(node.path)) {
          let toHashPair = node.hash.pairs.find(p => p.key === 'to');
          if ((0, _nodeMatcher.match)(toHashPair, {
            value: {
              type: 'GlimmerStringLiteral',
              value: 'default'
            }
          })) {
            this.log({
              message: ERROR_MESSAGE,
              node: toHashPair
            });
          }
        } else if (isBlockParamKeyword(node.path)) {
          this.handleBlockParamKeyword(node);
        }
      },
      GlimmerSubExpression(node) {
        if (isBlockParamKeyword(node.path)) {
          this.handleBlockParamKeyword(node);
        }
      }
    };
  }
}
exports.default = NoYieldToDefault;