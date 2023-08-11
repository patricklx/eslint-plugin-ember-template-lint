"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(ruleName, lines, config) {
  return [`The ${ruleName} rule accepts one of the following values.`, lines, `You specified \`${JSON.stringify(config)}\``].join('\n');
}
module.exports = exports.default;