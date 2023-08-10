"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const DEPRECATION_URL = 'https://emberjs.com/deprecations/v2.x/#toc_code-render-code-helper';
const message = `The \`{{render}}\` helper is deprecated in favor of using components. Please see the deprecation guide at ${DEPRECATION_URL}.`;
function logMessage(context, node, actual, expected) {
  return context.log({
    message,
    node,
    source: actual,
    fix: {
      text: expected
    }
  });
}
class DeprecatedRenderHelper extends _base.default {
  visitor() {
    return {
      GlimmerMustacheStatement(node) {
        if (node.path.type === 'GlimmerPathExpression' && node.path.parts[0] === 'render') {
          if (node.params.length === 1) {
            this.processWithOneArgument(node);
          } else if (node.params.length === 2) {
            this.processWithTwoArguments(node);
          }
        }
      }
    };
  }
  processWithOneArgument(node) {
    let originalValue = node.params[0].original;
    let actual = `{{render '${originalValue}'}}`;
    let expected = `{{${originalValue}}}`;
    logMessage(this, node, actual, expected);
  }
  processWithTwoArguments(node) {
    let originalValue = node.params[0].original;
    let model = node.params[1].original;
    let actual = `{{render '${originalValue}' ${model}}}`;
    let expected = `{{${originalValue} model=${model}}}`;
    logMessage(this, node, actual, expected);
  }
}
exports.default = DeprecatedRenderHelper;