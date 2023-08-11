"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _emberTemplateRecast = require("ember-template-recast");
var _isRouteTemplate = require("../helpers/is-route-template.js");
var _base = require("./_base.js");
const ERROR_MESSAGE = 'Do not use `{{@model}}` in route templates, use `{{this.model}}` instead.';
class NoModelArgumentInRouteTemplates extends _base {
  constructor(options) {
    super(options);
    this.isRouteTemplate = _isRouteTemplate(options.filePath);
  }
  visitor() {
    if (!this.isRouteTemplate) {
      // do nothing for component templates
      return {};
    }
    return {
      GlimmerPathExpression(node, path) {
        if (node.data && node.parts[0] === 'model') {
          if (this.mode === 'fix') {
            path.parentNode[path.parentKey] = _emberTemplateRecast.builders.path(['this', 'model', ...node.parts.slice(1)].join('.'), node.loc);
            return;
          }
          this.log({
            message: ERROR_MESSAGE,
            node,
            isFixable: true
          });
        }
      }
    };
  }
}
exports.default = NoModelArgumentInRouteTemplates;
module.exports = exports.default;