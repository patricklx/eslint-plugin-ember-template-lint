"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _astNodeInfo = _interopRequireDefault(require("../helpers/ast-node-info.js"));
var _nodeMatcher = require("../helpers/node-matcher.js");
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const IGNORE_IDS = new Set(['{{unique-id}}', '{{(unique-id)}}']); // Built-in helper, with and without parens

class ConditionalScope {
  constructor() {
    this.seenIdStack = [new Set()];
    this.conditionals = [];
  }
  enterConditional() {
    this.conditionals.push(new Set());
  }
  exitConditional() {
    let idsWithinConditional = this.conditionals.pop();
    if (this.conditionals.length > 0) {
      let parentConditional = this.conditionals[this.conditionals.length - 1];
      for (const id of idsWithinConditional) {
        parentConditional.add(id);
      }
    } else {
      this.seenIdStack.push(idsWithinConditional);
    }
  }
  enterConditionalBranch() {
    this.seenIdStack.push(new Set());
  }
  exitConditionalBranch() {
    this.seenIdStack.pop();
  }
  isIgnoredId(id) {
    return IGNORE_IDS.has(id);
  }
  isDuplicateId(id) {
    for (let seenIds of this.seenIdStack) {
      if (seenIds.has(id)) {
        return true;
      }
    }
  }
  addId(id) {
    this.seenIdStack[this.seenIdStack.length - 1].add(id);
    if (this.conditionals.length > 0) {
      let currentConditional = this.conditionals[this.conditionals.length - 1];
      currentConditional.add(id);
    }
  }
}
const ERROR_MESSAGE = 'ID attribute values must be unique';
class NoDuplicateId extends _base.default {
  // Handles the primary logic for the rule:
  // - if `id` is unique / not in the existing `ConditionalScope`; add it and carry on
  // - if it is a duplicate value; log the error
  logIfDuplicate(node, id) {
    if (this.conditionalScope.isIgnoredId(id)) {
      return;
    }
    if (this.conditionalScope.isDuplicateId(id)) {
      this.log({
        message: ERROR_MESSAGE,
        node
      });
    } else {
      this.conditionalScope.addId(id);
    }
  }

  // Helper for getting `id` attribute node values from parent AST Node types
  // that store their attributes as an Array of HashPairs -- in this case,
  // MustacheStatements and BlockStatements
  getHashArgIdValue(node, idAttrName) {
    let id;
    let refPair = {
      key: idAttrName,
      value: {
        type: 'GlimmerStringLiteral'
      }
    };
    let idHashArg = node.hash.pairs.find(testPair => (0, _nodeMatcher.match)(testPair, refPair));
    if (idHashArg) {
      id = idHashArg.value.value;
    }
    return id;
  }
  visitor() {
    // Visiting function node filter for AttrNodes: attribute name, node type
    function isValidIdAttrNode(node) {
      // consider removing `@id` eventually (or make it a toggle available via config)
      let isValidAttrNodeIdTag = ['id', '@id', '@elementId'].includes(node.name);
      let isValidAttrNodeIdValueType = ['GlimmerTextNode', 'GlimmerMustacheStatement', 'GlimmerConcatStatement'].includes(node.value.type);
      return node && isValidAttrNodeIdTag && isValidAttrNodeIdValueType;
    }

    // Resolve GlimmerMustacheStatement value to GlimmerStringLiteral where possible
    function getMustacheValue(part, scope, walkerPath) {
      let isMustacheWithStringLiteral = {
        type: 'GlimmerMustacheStatement',
        path: {
          type: 'GlimmerStringLiteral'
        }
      };
      if ((0, _nodeMatcher.match)(part, isMustacheWithStringLiteral)) {
        return part.path.value;
      }
      let isMustacheWithPathExpression = {
        type: 'GlimmerMustacheStatement',
        path: {
          type: 'GlimmerPathExpression'
        }
      };
      if ((0, _nodeMatcher.match)(part, isMustacheWithPathExpression)) {
        const sourceForNode = scope.sourceForNode(part);

        // If we cannot traverse up to find the possible yield block parent, return
        if (!walkerPath) {
          return sourceForNode;
        }
        const possibleBlockParamName = part.path && part.path.parts && part.path.parts[0];
        let ancestorComponent = walkerPath.parent;
        let foundComponentYieldBlock = false;
        while (ancestorComponent) {
          const blockParams = ancestorComponent.node.blockParams || [];
          if (blockParams.includes(possibleBlockParamName)) {
            foundComponentYieldBlock = true;
            break;
          } else {
            // find the next one
            ancestorComponent = ancestorComponent.parent;
          }
        }
        // if we find the component yield block we want to create a unique id for it so it doesn't clash with
        // other component blocks that uses the same naming
        return foundComponentYieldBlock ? sourceForNode + ancestorComponent.node.tag + ancestorComponent.node.loc.start.line + ancestorComponent.node.loc.start.column : sourceForNode;
      }
      let isMustacheWithSubExpression = {
        type: 'GlimmerMustacheStatement',
        path: {
          type: 'GlimmerSubExpression'
        }
      };
      if ((0, _nodeMatcher.match)(part, isMustacheWithSubExpression)) {
        const sourceForNode = scope.sourceForNode(part);

        // If we cannot traverse up to find the possible yield block parent, return
        if (!walkerPath) {
          return sourceForNode;
        }
        const possibleBlockParamName = part.path.path && part.path.path.parts && part.path.path.parts[0];
        let ancestorComponent = walkerPath.parent;
        let foundComponentYieldBlock = false;
        while (ancestorComponent) {
          const blockParams = ancestorComponent.node.blockParams || [];
          if (blockParams.includes(possibleBlockParamName)) {
            foundComponentYieldBlock = true;
            break;
          } else {
            // find the next one
            ancestorComponent = ancestorComponent.parent;
          }
        }
        // if we find the component yield block we want to create a unique id for it so it doesn't clash with
        // other component blocks that uses the same naming
        return foundComponentYieldBlock ? sourceForNode + ancestorComponent.node.tag + ancestorComponent.node.loc.start.line + ancestorComponent.node.loc.start.column : sourceForNode;
      }
    }
    function getPartValue(part, scope) {
      if (part.type === 'GlimmerTextNode') {
        return part.chars;
      } else {
        return getMustacheValue(part, scope);
      }
    }

    // Resolve GlimmerConcatStatement parts values to GlimmerStringLiteral where possible
    function getJoinedConcatParts(node, scope) {
      return node.value.parts.map(part => getPartValue(part, scope)).join('');
    }
    function handleCurlyNode(node) {
      let id = this.getHashArgIdValue(node, 'elementId');
      if (id) {
        this.logIfDuplicate(node, id);
        return;
      }
      id = this.getHashArgIdValue(node, 'id');
      if (id) {
        this.logIfDuplicate(node, id);
      }
    }

    // Store the id values collected; reference to look for duplicates

    this.conditionalScope = new ConditionalScope();
    return {
      GlimmerAttrNode(node, walkerPath) {
        // Only check relevant nodes
        if (!isValidIdAttrNode(node)) {
          return;
        }
        let id;
        switch (node.value.type) {
          // GlimmerConcatStatement: try to resolve parts to GlimmerStringLiteral where possible
          // ex. id="id-{{"value"}}" becomes "id-value"
          // ex. id="id-{{value}}-{{"number"}}" becomes "id-{{value}}-number"
          case 'GlimmerConcatStatement':
            {
              id = getJoinedConcatParts(node, this);
              break;
            }

          // GlimmerTextNode: unwrap
          // ex. id="id-value" becomes "id-value"
          case 'GlimmerTextNode':
            {
              id = node.value.chars;
              break;
            }

          // GlimmerMustacheStatement: try to resolve
          // ex. id={{"id-value"}} becomes "id-value"
          // ex. id={{idValue}} becomes "{{idValue}}"
          case 'GlimmerMustacheStatement':
            {
              id = getMustacheValue(node.value, this, walkerPath);
              break;
            }
          default:
            {
              // If id is not assigned by this point, use the raw source
              id = this.sourceForNode(node.value);
            }
        }
        this.logIfDuplicate(node, id);
      },
      GlimmerBlockStatement: {
        enter(node) {
          if (_astNodeInfo.default.isControlFlowHelper(node)) {
            this.conditionalScope.enterConditional();
          } else {
            handleCurlyNode.call(this, node);
          }
        },
        exit(node) {
          if (_astNodeInfo.default.isControlFlowHelper(node)) {
            this.conditionalScope.exitConditional();
          }
        }
      },
      GlimmerBlock: {
        enter(_node, path) {
          let parent = path.parent;
          if (_astNodeInfo.default.isControlFlowHelper(parent.node)) {
            this.conditionalScope.enterConditionalBranch();
          }
        },
        exit(_node, path) {
          let parent = path.parent;
          if (_astNodeInfo.default.isControlFlowHelper(parent.node)) {
            this.conditionalScope.exitConditionalBranch();
          }
        }
      },
      GlimmerMustacheStatement: handleCurlyNode
    };
  }
}
exports.default = NoDuplicateId;