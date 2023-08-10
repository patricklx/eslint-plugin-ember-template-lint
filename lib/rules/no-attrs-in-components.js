"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const componentTemplateRegex = new RegExp('templates/components|components/.*/template|ui/components|-components/');
class NoAttrsInComponents extends _base.default {
  isComponentTemplate() {
    return componentTemplateRegex.test(this._filePath);
  }
  visitor() {
    return {
      GlimmerPathExpression(node) {
        if (!this.isComponentTemplate()) {
          return;
        }
        if (node.parts && node.parts[0] === 'attrs') {
          this.log({
            message: 'GlimmerComponent templates should not contain `attrs`.',
            node
          });
        }
      }
    };
  }
}
exports.default = NoAttrsInComponents;