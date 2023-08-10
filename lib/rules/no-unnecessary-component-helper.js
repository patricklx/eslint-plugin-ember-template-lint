"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _emberTemplateRecast = require("ember-template-recast");
var _replaceNode = _interopRequireDefault(require("../helpers/replace-node.js"));
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ERROR_MESSAGE = 'Invoke component directly instead of using `component` helper';
class NoUnnecessaryComponentHelper extends _base.default {
  visitor() {
    let inSafeNamespace = false;
    const markAsSafeNamespace = {
      enter() {
        inSafeNamespace = true;
      },
      exit() {
        inSafeNamespace = false;
      }
    };
    function isComponentHelper(node) {
      return node.path.type === 'GlimmerPathExpression' && node.path.original === 'component' && node.params.length > 0;
    }
    function checkNode(node, {
      parentNode,
      parentKey
    }) {
      if (isComponentHelper(node) && node.params[0].type === 'GlimmerStringLiteral' && !node.params[0].value.includes('@') && !inSafeNamespace) {
        if (this.mode === 'fix') {
          const newNode = node.type === 'GlimmerBlockStatement' ? _emberTemplateRecast.builders.block(_emberTemplateRecast.builders.path(node.params[0].value), node.params.slice(1), node.hash, _emberTemplateRecast.builders.blockItself([])) : _emberTemplateRecast.builders.mustache(node.params[0].value, node.params.slice(1), node.hash);
          (0, _replaceNode.default)(node, parentNode, parentKey, newNode);
        } else {
          this.log({
            message: ERROR_MESSAGE,
            node,
            isFixable: true
          });
        }
      }
    }
    return {
      GlimmerAttrNode: markAsSafeNamespace,
      GlimmerBlockStatement: checkNode,
      GlimmerMustacheStatement: checkNode
    };
  }
}
exports.default = NoUnnecessaryComponentHelper;