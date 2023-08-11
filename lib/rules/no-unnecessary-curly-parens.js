"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _emberTemplateRecast = require("ember-template-recast");
var _base = require("./_base.js");
var _replaceNode = require("../helpers/replace-node.js");
class NoUnnecessaryCurlyParens extends _base {
  visitor() {
    return {
      GlimmerMustacheStatement(node, path) {
        if (node.path.type === 'GlimmerSubExpression' && (node.path.params.length || node.path.hash.pairs.length)) {
          if (this.mode === 'fix') {
            _replaceNode(node, path.parentNode, path.parentKey, _emberTemplateRecast.builders.mustache(node.path.path, node.path.params, node.path.hash));
          } else {
            this.log({
              node,
              isFixable: true,
              message: 'Unnecessary parentheses enclosing statement'
            });
          }
        }
      }
    };
  }
}
exports.default = NoUnnecessaryCurlyParens;
module.exports = exports.default;