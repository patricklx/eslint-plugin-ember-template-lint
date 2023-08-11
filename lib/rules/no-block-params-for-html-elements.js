"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isAngleBracketComponent = require("../helpers/is-angle-bracket-component.js");
var _base = require("./_base.js");
class NoBlockParamsForHtmlElements extends _base {
  visitor() {
    return {
      GlimmerElementNode(node) {
        if (node.blockParams.length !== 0 && !_isAngleBracketComponent(this.scope, node) && !node.tag.startsWith(':')) {
          this.log({
            message: NoBlockParamsForHtmlElements.generateErrorMessage(node.tag),
            node
          });
        }
      }
    };
  }
  static generateErrorMessage(tagName) {
    return `GlimmerBlock parameters on <${tagName}> elements are disallowed`;
  }
}
exports.default = NoBlockParamsForHtmlElements;
module.exports = exports.default;