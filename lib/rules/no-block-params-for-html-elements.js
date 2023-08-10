"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isAngleBracketComponent = _interopRequireDefault(require("../helpers/is-angle-bracket-component.js"));
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class NoBlockParamsForHtmlElements extends _base.default {
  visitor() {
    return {
      GlimmerElementNode(node) {
        if (node.blockParams.length !== 0 && !(0, _isAngleBracketComponent.default)(this.scope, node) && !node.tag.startsWith(':')) {
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