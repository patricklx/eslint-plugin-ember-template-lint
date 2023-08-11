"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = require("./_base.js");
const ERROR_MESSAGE = 'Only `...attributes` can be applied to elements';
class SplatAttributesOnly extends _base {
  visitor() {
    return {
      GlimmerAttrNode(node) {
        if (node.name.startsWith('...') && node.name !== '...attributes') {
          this.log({
            message: ERROR_MESSAGE,
            node
          });
        }
      }
    };
  }
}
exports.default = SplatAttributesOnly;
module.exports = exports.default;