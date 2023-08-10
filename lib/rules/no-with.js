"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const DEPRECATION_URL = 'https://deprecations.emberjs.com/v3.x/#toc_ember-glimmer-with-syntax';
const ERROR_MESSAGE = `The use of \`{{with}}\` has been deprecated. Please see the deprecation guide at ${DEPRECATION_URL}.`;
class NoWith extends _base.default {
  visitor() {
    return {
      GlimmerBlockStatement(node) {
        if (node.path.original === 'with') {
          this.log({
            message: ERROR_MESSAGE,
            node
          });
        }
      }
    };
  }
}
exports.default = NoWith;