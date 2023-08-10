"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isRouteTemplate = _interopRequireDefault(require("../helpers/is-route-template.js"));
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const message = 'Unexpected {{outlet}} usage. Only use {{outlet}} within a route template.';
class NoOutletOutsideRoutes extends _base.default {
  _checkForOutlet(node) {
    if (this.__isRouteTemplate === true) {
      return;
    }
    if (node.path.original === 'outlet') {
      this.log({
        message,
        node
      });
    }
  }
  visitor() {
    this.__isRouteTemplate = (0, _isRouteTemplate.default)(this._filePath);
    return {
      GlimmerMustacheStatement: this._checkForOutlet,
      GlimmerBlockStatement: this._checkForOutlet
    };
  }
}
exports.default = NoOutletOutsideRoutes;