"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ERROR_MESSAGE = 'Nested splattributes are not allowed';
class NoNestedSplattributes extends _base.default {
  visitor() {
    let splattributesParent = null;
    return {
      GlimmerElementNode: {
        enter(node) {
          let splattribute = node.attributes.find(it => it.name === '...attributes');
          if (splattribute) {
            if (splattributesParent) {
              this.log({
                message: ERROR_MESSAGE,
                node: splattribute
              });
            } else {
              splattributesParent = node;
            }
          }
        },
        exit(node) {
          if (splattributesParent === node) {
            splattributesParent = null;
          }
        }
      }
    };
  }
}
exports.default = NoNestedSplattributes;