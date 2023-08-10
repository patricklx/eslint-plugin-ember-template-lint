"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _emberTemplateRecast = require("ember-template-recast");
var _base = _interopRequireDefault(require("./_base.js"));
var _replaceNode = _interopRequireDefault(require("../helpers/replace-node.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class NoUnnecessaryCurlyParens extends _base.default {
  visitor() {
    return {
      GlimmerMustacheStatement(node, path) {
        if (node.path.type === 'GlimmerSubExpression' && (node.path.params.length || node.path.hash.pairs.length)) {
          if (this.mode === 'fix') {
            (0, _replaceNode.default)(node, path.parentNode, path.parentKey, _emberTemplateRecast.builders.mustache(node.path.path, node.path.params, node.path.hash));
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