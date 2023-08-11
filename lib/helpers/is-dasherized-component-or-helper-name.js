"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _dasherizeComponentName = require("./dasherize-component-name.js");
function _default(name) {
  return typeof name === 'string' && name.length > 0 && _dasherizeComponentName(name) === name;
}
module.exports = exports.default;