"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _astNodeInfo = _interopRequireDefault(require("../helpers/ast-node-info.js"));
var _createErrorMessage = _interopRequireDefault(require("../helpers/create-error-message.js"));
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 Disallow usage of elements with inline styles

 Good:

 ```
 <div class="class-with-inline-block-rule"></div>
 ```

 Bad:

 ```
 <div style="display:inline-block"></div>
 ```
 */

const DEFAULT_CONFIG = {
  allowDynamicStyles: true
};
class NoInlineStyles extends _base.default {
  parseConfig(config) {
    let configType = typeof config;
    switch (configType) {
      case 'boolean':
        {
          return config ? DEFAULT_CONFIG : false;
        }
      case 'object':
        {
          return {
            allowDynamicStyles: config.allowDynamicStyles
          };
        }
      case 'undefined':
        {
          return false;
        }
    }
    let errorMessage = (0, _createErrorMessage.default)(this.ruleName, ['  * boolean - `true` to enable / `false` to disable', '  * object -- An object with the following keys:', '    * `allowDynamicStyles` -- Whether dynamically-generated inline styles should be allowed (defaults to `true`)'], config);
    throw new Error(errorMessage);
  }
  visitor() {
    return {
      GlimmerElementNode(node) {
        const style = _astNodeInfo.default.findAttribute(node, 'style');
        if (!style) {
          return;
        }
        const hasDynamicStyle = style.value.type === 'GlimmerMustacheStatement';
        if (this.config.allowDynamicStyles && hasDynamicStyle) {
          return;
        }
        this.log({
          message: 'elements cannot have inline styles',
          node: style
        });
      }
    };
  }
}
exports.default = NoInlineStyles;