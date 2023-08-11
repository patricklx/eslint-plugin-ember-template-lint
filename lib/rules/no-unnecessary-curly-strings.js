"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = require("./_base.js");
var _emberTemplateRecast = require("ember-template-recast");
var _replaceNode = require("../helpers/replace-node.js");
class NoUnnecessaryCurlyStrings extends _base {
  visitor() {
    return {
      GlimmerMustacheStatement(node, {
        parentNode,
        parentKey
      }) {
        if (node.path.type === 'GlimmerStringLiteral') {
          if (this.mode === 'fix') {
            if (parentNode.type === 'GlimmerAttrNode') {
              parentNode.quoteType = node.path.quoteType;
            }
            const newNode = _emberTemplateRecast.builders.text(node.path.original);
            _replaceNode(node, parentNode, parentKey, newNode);
          } else {
            this.log({
              node,
              message: 'Unnecessary curly braces around string',
              isFixable: true
            });
          }
        }
      }
    };
  }
}
exports.default = NoUnnecessaryCurlyStrings;
module.exports = exports.default;