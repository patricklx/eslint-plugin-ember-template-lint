"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _emberTemplateRecast = require("ember-template-recast");
var _astNodeInfo = _interopRequireDefault(require("../helpers/ast-node-info.js"));
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class NoHtmlComments extends _base.default {
  visitor() {
    return {
      GlimmerCommentStatement(node) {
        if (_astNodeInfo.default.isNonConfigurationHtmlComment(node)) {
          if (this.mode === 'fix') {
            return _emberTemplateRecast.builders.mustacheComment(node.value);
          } else {
            this.log({
              message: 'HTML comment detected',
              node,
              source: `<!--${node.value}-->`,
              fix: {
                text: `{{!${node.value}}}`
              },
              isFixable: true
            });
          }
        }
      }
    };
  }
}
exports.default = NoHtmlComments;