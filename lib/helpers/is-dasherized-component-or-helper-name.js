"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _dasherizeComponentName = _interopRequireDefault(require("./dasherize-component-name.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default(name) {
  return typeof name === 'string' && name.length > 0 && (0, _dasherizeComponentName.default)(name) === name;
}