"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = require("./_base.js");
class NoIndexComponentInvocation extends _base {
  visitor() {
    const log = (invocation, replacement, node) => {
      return this.log({
        message: `Replace \`${invocation} ...\` to \`${replacement} ...\``,
        node
      });
    };
    function lintIndexUsage(node) {
      if (node.type === 'GlimmerElementNode') {
        if (node.tag.endsWith('::Index')) {
          let invocation = `<${node.tag}`;
          let replacement = `<${node.tag.replace('::Index', '')}`;
          log(invocation, replacement, node);
        }
        return;
      }
      if (['GlimmerMustacheStatement', 'GlimmerBlockStatement'].includes(node.type)) {
        if (node.path.type === 'GlimmerPathExpression' && node.path.original.endsWith('/index')) {
          let invocationPrefix = node.type === 'GlimmerBlockStatement' ? '{{#' : '{{';
          let invocation = `${invocationPrefix}${node.path.original}`;
          let replacement = `${invocationPrefix}${node.path.original.replace('/index', '')}`;
          log(invocation, replacement, node.path);
          return;
        }
      }
      if (['GlimmerMustacheStatement', 'GlimmerBlockStatement', 'GlimmerSubExpression'].includes(node.type)) {
        const prefix = node.type === 'GlimmerMustacheStatement' ? '{{' : node.type === 'GlimmerBlockStatement' ? '{{#' : '(';
        if (node.path.type === 'GlimmerPathExpression' && node.path.original === 'component' && node.params.length && node.params[0].type === 'GlimmerStringLiteral') {
          const componentName = node.params[0].original;
          if (componentName.endsWith('/index')) {
            let invocation = `${prefix}component "${componentName}"`;
            let replacement = `${prefix}component "${componentName.replace('/index', '')}"`;
            return log(invocation, replacement, node.params[0]);
          }
        }
      }
    }
    return {
      GlimmerElementNode: lintIndexUsage,
      GlimmerMustacheStatement: lintIndexUsage,
      GlimmerBlockStatement: lintIndexUsage,
      GlimmerSubExpression: lintIndexUsage
    };
  }
}
exports.default = NoIndexComponentInvocation;
module.exports = exports.default;