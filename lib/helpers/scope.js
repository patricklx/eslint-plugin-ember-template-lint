"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function getLocalName(node) {
  switch (node.type) {
    case 'GlimmerElementNode':
      {
        // unfortunately the GlimmerElementNode stores `tag` as a string
        // if that changes in glimmer-vm this will need to be updated
        return node.tag.split('.')[0];
      }
    case 'GlimmerSubExpression':
    case 'GlimmerMustacheStatement':
    case 'GlimmerBlockStatement':
    case 'GlimmerElementModifierStatement':
      {
        return getLocalName(node.path);
      }
    case 'GlimmerUndefinedLiteral':
    case 'GlimmerNullLiteral':
    case 'GlimmerBooleanLiteral':
    case 'GlimmerStringLiteral':
    case 'GlimmerNumberLiteral':
    case 'GlimmerTextNode':
    case 'GlimmerTemplate':
    case 'GlimmerBlock':
    case 'GlimmerMustacheCommentStatement':
      {
        return undefined;
      }
    // case 'GlimmerPathExpression':
    default:
      {
        return node.parts.length ? node.parts[0] : undefined;
      }
  }
}
function getLocals(node) {
  switch (node.type) {
    case 'GlimmerElementNode':
    case 'GlimmerProgram':
    case 'GlimmerBlock':
    case 'GlimmerTemplate':
      {
        return node.blockParams;
      }
    case 'GlimmerBlockStatement':
      {
        return node.program.blockParams;
      }
    default:
      {
        throw new Error(`Unknown frame type: ${node.type}`);
      }
  }
}
class Frame {
  constructor(node) {
    let locals = getLocals(node);
    this.node = node;
    this.locals = locals;
    this.hasPartial = false;
    this.usedLocals = {};
    for (const local of locals) {
      this.usedLocals[local] = false;
    }
  }
  useLocal(name) {
    if (name in this.usedLocals) {
      this.usedLocals[name] = true;
      return true;
    } else {
      return false;
    }
  }
  usePartial() {
    this.hasPartial = true;
  }
  unusedLocals() {
    if (!this.hasPartial && this.locals.length > 0) {
      if (!this.usedLocals[this.locals[this.locals.length - 1]]) {
        return this.locals[this.locals.length - 1];
      }
    } else {
      return false;
    }
  }
  isLocal(name) {
    return this.locals.includes(name);
  }
}
class Scope {
  constructor() {
    this.frames = [];
  }
  pushFrame(node) {
    this.frames.push(new Frame(node));
  }
  popFrame() {
    this.frames.pop();
  }
  frameHasUnusedBlockParams() {
    return this.frames[this.frames.length - 1].unusedLocals();
  }
  useLocal(node) {
    let name = getLocalName(node);
    for (let i = this.frames.length - 1; i >= 0; i--) {
      if (this.frames[i].useLocal(name)) {
        break;
      }
    }
  }
  usePartial() {
    for (let i = this.frames.length - 1; i >= 0; i--) {
      this.frames[i].usePartial();
    }
  }
  isLocal(node) {
    let name = getLocalName(node);
    if (typeof name !== 'string') {
      return false;
    }
    for (let i = this.frames.length - 1; i >= 0; i--) {
      if (this.frames[i].isLocal(name)) {
        return true;
      }
    }
    return false;
  }
  get currentNode() {
    let currentFrame = this.frames[this.frames.length - 1];
    return currentFrame && currentFrame.node;
  }
}
exports.default = Scope;