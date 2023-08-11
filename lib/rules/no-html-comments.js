"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _emberTemplateRecast = require("ember-template-recast");
var _astNodeInfo = require("../helpers/ast-node-info.js");
var _base = require("./_base.js");
class NoHtmlComments extends _base {
  visitor() {
    return {
      GlimmerCommentStatement(node) {
        if (_astNodeInfo.isNonConfigurationHtmlComment(node)) {
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
module.exports = exports.default;