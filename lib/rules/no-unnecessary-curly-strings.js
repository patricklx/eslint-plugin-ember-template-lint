"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("./_base.js"));
var _emberTemplateRecast = require("ember-template-recast");
var _replaceNode = _interopRequireDefault(require("../helpers/replace-node.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class NoUnnecessaryCurlyStrings extends _base.default {
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
            (0, _replaceNode.default)(node, parentNode, parentKey, newNode);
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