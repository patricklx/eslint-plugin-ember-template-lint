"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _createErrorMessage = _interopRequireDefault(require("../helpers/create-error-message.js"));
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ERROR_MESSAGE = 'Do not use HTML element event properties like `onclick`. Instead, use the `on` modifier.';
const DEFAULT_CONFIG = {
  requireActionHelper: false
};
function isValidConfigObjectFormat(config) {
  if (config === null) {
    return false;
  }
  for (let key in config) {
    let value = config[key];
    let valueType = typeof value;
    if (key === 'requireActionHelper' && valueType !== 'boolean') {
      return false;
    } else if (!(key in DEFAULT_CONFIG)) {
      return false;
    }
  }
  return true;
}
class NoElementEventActions extends _base.default {
  parseConfig(config) {
    return parseConfig(config, this.ruleName);
  }
  visitor() {
    return {
      GlimmerElementNode(node) {
        const eventProperties = node.attributes.filter(isEventPropertyWithAction.bind(this));
        for (const eventProperty of eventProperties) {
          this.log({
            message: ERROR_MESSAGE,
            node: eventProperty
          });
        }
      }
    };
  }
}
exports.default = NoElementEventActions;
function isDomEventAttributeName(name) {
  const nameLower = name.toLowerCase();
  return nameLower.startsWith('on') && nameLower !== 'on';
}
function isEventPropertyWithAction(node) {
  return node.type === 'GlimmerAttrNode' && isDomEventAttributeName(node.name) && node.value.type === 'GlimmerMustacheStatement' && (!this.config.requireActionHelper || node.value.path.type === 'GlimmerPathExpression' && node.value.path.original === 'action');
}
function parseConfig(config, ruleName) {
  let configType = typeof config;
  switch (configType) {
    case 'boolean':
      {
        // if `true` use `DEFAULT_CONFIG`
        return config ? DEFAULT_CONFIG : false;
      }
    case 'object':
      {
        if (isValidConfigObjectFormat(config)) {
          return {
            requireActionHelper: 'requireActionHelper' in config ? config.requireActionHelper : DEFAULT_CONFIG['requireActionHelper']
          };
        }
        break;
      }
    case 'undefined':
      {
        return false;
      }
  }
  let errorMessage = (0, _createErrorMessage.default)(ruleName, ['  * boolean - `true` to enable / `false` to disable', '  * object -- An object with the following keys:', '    * `requireActionHelper` -- Only apply this rule even when the {{action}} helper is present (defaults to `false`)'], config);
  throw new Error(errorMessage);
}