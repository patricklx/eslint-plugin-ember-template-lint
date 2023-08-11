"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _astNodeInfo = require("../helpers/ast-node-info.js");
var _base = require("./_base.js");
class NoInvalidMeta extends _base {
  logNode({
    node,
    message
  }) {
    return this.log({
      message,
      node
    });
  }
  visitor() {
    return {
      GlimmerElementNode(node) {
        if (node.tag !== 'meta') {
          return;
        }
        const hasHttpEquiv = _astNodeInfo.hasAttribute(node, 'http-equiv');
        const hasContent = _astNodeInfo.hasAttribute(node, 'content');
        const hasName = _astNodeInfo.hasAttribute(node, 'name');
        const hasProperty = _astNodeInfo.hasAttribute(node, 'property');
        const hasItemprop = _astNodeInfo.hasAttribute(node, 'itemprop');
        const hasIdentifier = hasName || hasProperty || hasItemprop;
        let contentAttr, contentAttrValue;
        if (hasContent) {
          contentAttr = _astNodeInfo.findAttribute(node, 'content');
          if (contentAttr.value.type === 'GlimmerTextNode') {
            contentAttrValue = contentAttr.value.chars;
          }
        }
        if ((hasIdentifier || hasHttpEquiv) && !hasContent) {
          this.log({
            message: 'a meta content attribute must be defined if the name, property, itemprop or the http-equiv attribute is defined',
            node
          });
        } else if (hasContent && !hasIdentifier && !hasHttpEquiv) {
          this.log({
            message: 'a meta content attribute cannot be defined if the name, property, itemprop nor the http-equiv attributes are defined',
            node
          });
        }
        if (hasContent && typeof contentAttrValue === 'string') {
          if (hasHttpEquiv) {
            // if there is a semicolon, it is a REDIRECT and should not have a delay value greater than zero
            if (contentAttrValue.includes(';')) {
              if (contentAttrValue.charAt(0) !== '0') {
                this.log({
                  message: 'a meta redirect should not have a delay value greater than zero',
                  node
                });
              }
            } else {
              // eslint-disable-next-line radix
              if (Number.parseInt(contentAttrValue) <= 72_000) {
                this.log({
                  message: 'a meta refresh should have a delay greater than 72000 seconds',
                  node
                });
              }
            }
          }

          // Looks for spaces because Apple allowed spaces in their spec.
          let userScalableRegExp = /user-scalable(\s*?)=(\s*?)no/gim;
          if (userScalableRegExp.test(contentAttrValue)) {
            this.log({
              message: 'a meta viewport should not restrict user-scalable',
              node
            });
          }
          if (contentAttrValue.includes('maximum-scale')) {
            this.log({
              message: 'a meta viewport should not set a maximum scale on content',
              node
            });
          }
        }
      }
    };
  }
}
exports.default = NoInvalidMeta;
module.exports = exports.default;