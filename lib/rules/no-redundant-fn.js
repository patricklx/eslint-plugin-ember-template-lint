"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _replaceNode = require("../helpers/replace-node.js");
var _base = require("./_base.js");
const ERROR_MESSAGE = '`fn` helpers without additional arguments are not allowed';
class NoRedundantFn extends _base {
  visitor() {
    return {
      GlimmerMustacheStatement(node, path) {
        return this.process(node, path);
      },
      GlimmerSubExpression(node, path) {
        return this.process(node, path);
      }
    };
  }
  process(node, {
    parentNode,
    parentKey
  }) {
    let {
      path,
      params
    } = node;
    if (path.type !== 'GlimmerPathExpression' || path.original !== 'fn' || params.length !== 1 || params[0].type !== 'GlimmerPathExpression') {
      return;
    }
    if (this.mode === 'fix') {
      if (node.type === 'GlimmerMustacheStatement') {
        node.params = [];
        node.path = params[0];
      } else {
        _replaceNode(node, parentNode, parentKey, params[0]);
      }
    } else {
      this.log({
        message: ERROR_MESSAGE,
        node,
        isFixable: true
      });
    }
  }
}
exports.default = NoRedundantFn;
module.exports = exports.default;