"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _astNodeInfo = _interopRequireDefault(require("../helpers/ast-node-info.js"));
var _isInteractiveElement = _interopRequireWildcard(require("../helpers/is-interactive-element.js"));
var _parseInteractiveElementConfig = _interopRequireDefault(require("../helpers/parse-interactive-element-config.js"));
var _base = _interopRequireDefault(require("./_base.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 Disallows nested of interactive elements

 ```
 {{!-- good  --}}
 <button>Click here</button> <a href="/">and a link</a>

 {{!-- bad --}}
 <button>Click here <a href="/">and a link</a></button>
 ```

 The following values are valid configuration:

   * boolean -- `true` for enabled / `false` for disabled
 */

class NoNestedInteractive extends _base.default {
  parseConfig(config) {
    return (0, _parseInteractiveElementConfig.default)(this.ruleName, config);
  }
  visitor() {
    this._parentInteractiveNode = null;
    let visitor = {
      enter(node) {
        let isInteractive = (0, _isInteractiveElement.default)(node);
        if (this.isCustomInteractiveElement(node)) {
          isInteractive = true;
        }
        if (!isInteractive) {
          return;
        }
        if (this.isInteractiveExcluded(node)) {
          return;
        }
        if (this.hasLabelParentNode()) {
          if (this._seenInteractiveChild) {
            this.log({
              message: 'Do not use multiple interactive elements inside a single `<label>`',
              node,
              source: this.sourceForNode(this._parentInteractiveNode)
            });
          } else {
            this._seenInteractiveChild = true;
          }
        } else if (this.hasParentNode()) {
          if (this.hasMenuItemParentNode() && this.isMenuItemNode(node)) {
            // nested menuitem nodes are valid to create a menu/sub-menu pattern
          } else {
            this.log({
              message: this.getLogMessage(node, this._parentInteractiveNode),
              node
            });
          }
        } else if (this.isInteractiveFromTabindex(node)) {
          // do not consider a thing a "parent interactive node" for
          // tabindex alone
        } else {
          this._parentInteractiveNode = node;
        }
      },
      exit(node) {
        if (this._parentInteractiveNode === node) {
          this._parentInteractiveNode = null;
          this._seenInteractiveChild = false;
        }
      }
    };
    return {
      GlimmerElementNode: visitor,
      ComponentNode: visitor
    };
  }
  hasLabelParentNode() {
    return this._parentInteractiveNode && this._parentInteractiveNode.tag === 'label';
  }
  hasMenuItemParentNode() {
    return this._parentInteractiveNode && this.isMenuItemNode(this._parentInteractiveNode);
  }
  hasParentNode() {
    return this._parentInteractiveNode;
  }
  isCustomInteractiveElement(node) {
    let additionalInteractiveTags = this.config.additionalInteractiveTags || [];
    if (additionalInteractiveTags.includes(node.tag)) {
      return true;
    } else {
      return false;
    }
  }
  isInteractiveFromTabindex(node) {
    let actualReason = (0, _isInteractiveElement.reason)(node);
    if (actualReason && actualReason.includes('tabindex')) {
      return true;
    } else {
      return false;
    }
  }
  isInteractiveExcluded(node) {
    let actualReason = (0, _isInteractiveElement.reason)(node);
    let ignoredTags = this.config.ignoredTags || [];
    let ignoreTabindex = this.config.ignoreTabindex;
    let ignoreUsemapAttribute = this.config.ignoreUsemapAttribute;
    if (ignoredTags.includes(node.tag)) {
      return true;
    }
    if (ignoreTabindex && actualReason.includes('tabindex')) {
      return true;
    }
    if (ignoreUsemapAttribute && actualReason.includes('usemap')) {
      return true;
    }
  }
  isMenuItemNode(node) {
    let role = _astNodeInfo.default.findAttribute(node, 'role');
    return role && role.value && role.value.chars === 'menuitem';
  }
  getLogMessage(node, parentNode) {
    let parentReason = (0, _isInteractiveElement.reason)(parentNode);
    let childReason = (0, _isInteractiveElement.reason)(node);

    // `reason` for `additionalInteractiveTags` would be `null`
    // so we need to handle that and update the reason correctly
    if (this.isCustomInteractiveElement(parentNode)) {
      parentReason = `<${parentNode.tag}>`;
    }
    if (this.isCustomInteractiveElement(node)) {
      childReason = `<${node.tag}>`;
    }
    return `Do not use ${childReason} inside ${parentReason}`;
  }
}
exports.default = NoNestedInteractive;