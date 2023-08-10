"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _emberTemplateRecast = require("ember-template-recast");
var _astNodeInfo = _interopRequireDefault(require("../helpers/ast-node-info.js"));
var _createErrorMessage = _interopRequireDefault(require("../helpers/create-error-message.js"));
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 Disallow usage of `<a target="_blank">` without an `rel="noopener"` attribute.

 Good:

 ```
 <a href="/some/where" target="_blank" rel="noopener"></a>
 ```

 Bad:

 ```
 <a href="/some/where" target="_blank"></a>
 ```
 */

const CONFIG = {
  regexp: /(.*\s)?noopener\s(.*\s)?noreferrer(\s.*)?|(.*\s)?noreferrer\s(.*\s)?noopener(\s.*)?/,
  message: 'links with target="_blank" must have rel="noopener noreferrer"'
};
class LinkRelNoopener extends _base.default {
  parseConfig(config) {
    let configType = typeof config;
    switch (configType) {
      case 'boolean':
        {
          return config ? CONFIG : false;
        }
      case 'undefined':
        {
          return false;
        }
    }
    let errorMessage = (0, _createErrorMessage.default)(this.ruleName, ['  * boolean - `true` to enable / `false` to disable'], config);
    throw new Error(errorMessage);
  }
  visitor() {
    return {
      GlimmerElementNode(node) {
        let isLink = node.tag === 'a';
        if (!isLink) {
          return;
        }
        let targetBlank = hasTargetBlank(node);
        if (!targetBlank) {
          return;
        }
        let relNoopener = hasRelNoopener(node, this.config.regexp);
        if (relNoopener) {
          return;
        }
        if (this.mode === 'fix' && isFixable(node)) {
          return fix(node);
        }
        this.log({
          isFixable: isFixable(node),
          message: this.config.message,
          node
        });
      }
    };
  }
}
exports.default = LinkRelNoopener;
function isFixable(elementNode) {
  let oldRel = _astNodeInfo.default.findAttribute(elementNode, 'rel');
  return !oldRel || oldRel.value.type === 'GlimmerTextNode';
}
function fix(node) {
  let oldRel = _astNodeInfo.default.findAttribute(node, 'rel');
  let oldRelValue = oldRel && oldRel.value.type === 'GlimmerTextNode' ?
  // normalize whitespace between values
  oldRel.value.chars.trim().replace(/\s+/g, '') : '';

  // remove existing instances of noopener/noreferrer so we can add them back in
  // the order the rule suggests in the error message
  let newRelValue = oldRelValue.replace(/(noopener|noreferrer)/g, '');
  newRelValue = `${newRelValue} noopener noreferrer`;
  let oldRelIndex = oldRel ? node.attributes.indexOf(oldRel) : null;
  let newRelNode = _emberTemplateRecast.builders.attr('rel', _emberTemplateRecast.builders.text(newRelValue.trim()));
  if (oldRel) {
    node.attributes.splice(oldRelIndex, 1, newRelNode);
  } else {
    node.attributes.push(newRelNode);
  }
}
function hasTargetBlank(node) {
  let targetAttribute = _astNodeInfo.default.findAttribute(node, 'target');
  if (!targetAttribute) {
    return false;
  }
  switch (targetAttribute.value.type) {
    case 'GlimmerTextNode':
      {
        return targetAttribute.value.chars === '_blank';
      }
    default:
      {
        return false;
      }
  }
}
function hasRelNoopener(node, regexp) {
  let relAttribute = _astNodeInfo.default.findAttribute(node, 'rel');
  if (!relAttribute) {
    return false;
  }
  switch (relAttribute.value.type) {
    case 'GlimmerTextNode':
      {
        return regexp.test(relAttribute.value.chars);
      }
    default:
      {
        return false;
      }
  }
}