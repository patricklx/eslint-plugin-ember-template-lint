"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isRouteTemplate = require("../helpers/is-route-template.js");
var _base = require("./_base.js");
const message = 'Unexpected {{outlet}} usage. Only use {{outlet}} within a route template.';
class NoOutletOutsideRoutes extends _base {
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
    this.__isRouteTemplate = _isRouteTemplate(this._filePath);
    return {
      GlimmerMustacheStatement: this._checkForOutlet,
      GlimmerBlockStatement: this._checkForOutlet
    };
  }
}
exports.default = NoOutletOutsideRoutes;
module.exports = exports.default;