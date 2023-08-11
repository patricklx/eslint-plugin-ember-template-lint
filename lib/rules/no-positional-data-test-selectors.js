"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _emberTemplateRecast = require("ember-template-recast");
var _base = require("./_base.js");
const BUILT_INS = new Set(['action', 'array', 'component', 'concat', 'debugger', 'each', 'each-in', 'fn', 'get', 'hasBlock', 'has-block', 'has-block-params', 'hash', 'if', 'input', 'let', 'link-to', 'loc', 'log', 'mount', 'mut', 'on', 'outlet', 'partial', 'query-params', 'textarea', 'unbound', 'unless', 'with', '-in-element', 'in-element']);
class NoPositionalDataTestSelectors extends _base {
  visitor() {
    return {
      GlimmerMustacheStatement(node) {
        this.process(node);
      },
      GlimmerBlockStatement(node) {
        this.process(node);
      }
    };
  }
  process(node) {
    if (BUILT_INS.has(node.path.original)) {
      return;
    }
    let testSelectorParamIndex = node.params.findIndex(n => n.type === 'GlimmerPathExpression' && n.original.startsWith('data-test-'));
    if (testSelectorParamIndex === -1) {
      return;
    }
    if (this.mode === 'fix') {
      let selectorName = node.params[testSelectorParamIndex].original;

      // remove the item from `params`
      node.params.splice(testSelectorParamIndex, 1);

      // add it as a GlimmerHashPair
      node.hash.pairs.unshift(_emberTemplateRecast.builders.pair(selectorName, _emberTemplateRecast.builders.boolean(true)));
    } else {
      this.log({
        message: 'Passing a `data-test-*` positional param to a curly invocation should be avoided.',
        node,
        isFixable: true
      });
    }
  }
}
exports.default = NoPositionalDataTestSelectors;
module.exports = exports.default;