"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class NoQuotelessAttributes extends _base.default {
  visitor() {
    return {
      GlimmerAttrNode(node) {
        let {
          isValueless,
          name,
          quoteType,
          value
        } = node;
        if (isValueless) {
          return;
        }
        if (value.type !== 'GlimmerTextNode') {
          return;
        }
        if (quoteType === null) {
          let type = name.startsWith('@') ? 'Argument' : 'Attribute';
          if (this.mode === 'fix') {
            node.quoteType = '"';
          } else {
            this.log({
              message: `${type} ${name} should be either quoted or wrapped in mustaches`,
              node,
              source: this.sourceForNode(node),
              isFixable: true
            });
          }
        }
      }
    };
  }
}
exports.default = NoQuotelessAttributes;