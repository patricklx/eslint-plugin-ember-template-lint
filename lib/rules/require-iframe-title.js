"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _astNodeInfo = _interopRequireDefault(require("../helpers/ast-node-info.js"));
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const errorMessage = '<iframe> elements must have a unique title property.';

// iframes have to have titles for "Name,  Role, Value" - https://www.w3.org/TR/UNDERSTANDING-WCAG20/ensure-compat-rsv.html
class RequireIframeTitle extends _base.default {
  logNode({
    message,
    node
  }) {
    this.log({
      message,
      node
    });
  }
  visitor() {
    this.knownTitles = [];
    return {
      GlimmerElementNode(node) {
        if (node.tag === 'iframe') {
          const ariaHidden = _astNodeInfo.default.hasAttribute(node, 'aria-hidden');
          if (ariaHidden) {
            return;
          }
          const hidden = _astNodeInfo.default.hasAttribute(node, 'hidden');
          if (hidden) {
            return;
          }
          const title = _astNodeInfo.default.findAttribute(node, 'title');
          if (!title) {
            this.logNode({
              message: errorMessage,
              node
            });
          } else if (title.value) {
            switch (title.value.type) {
              case 'GlimmerTextNode':
                {
                  let value = title.value.chars.trim();
                  let matchIndex = -1;
                  let [, existingNode] = this.knownTitles.find(([val], index) => {
                    if (val === value) {
                      if (matchIndex === -1) {
                        matchIndex = index + 1;
                      }
                      return true;
                    } else {
                      return false;
                    }
                  }) || [null, null];
                  if (value.length === 0) {
                    this.logNode({
                      message: errorMessage,
                      node
                    });
                  } else if (existingNode) {
                    this.logNode({
                      message: 'This title is not unique.' + ` #${matchIndex}`,
                      node: existingNode
                    });
                    this.logNode({
                      message: `${errorMessage} ` + `Value title="${title.value.chars}" already used for different iframe.` + ` #${matchIndex}`,
                      node
                    });
                  } else {
                    this.knownTitles.push([value, title]);
                  }
                  break;
                }
              case 'GlimmerMustacheStatement':
                {
                  if (title.value.path.type === 'GlimmerBooleanLiteral') {
                    this.logNode({
                      message: errorMessage,
                      node
                    });
                  }
                  break;
                }
              case 'GlimmerConcatStatement':
                {
                  if (title.value.parts.length === 1) {
                    if (title.value.parts[0].type === 'GlimmerMustacheStatement') {
                      if (title.value.parts[0].path.type === 'GlimmerBooleanLiteral') {
                        this.logNode({
                          message: errorMessage,
                          node
                        });
                      }
                    }
                  }
                  break;
                }
              // No default
            }
          } else {
            // ...
          }
        }
      }
    };
  }
}
exports.default = RequireIframeTitle;