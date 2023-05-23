const { preprocess, traverse, normalize, Source, ASTv1 } = require('@glimmer/syntax');

class Scope {
  type = 'global';
  variables = [];
  through= [];
  set = new Map();
  upper = null;
  childScopes = [];
  references = [];
  block = null;
}

class ScopeManager {
  globalScope = new Scope();
  scopes = [this.globalScope];

  acquire(node, inner) {
    return
  }

  getDeclaredVariables(node) {
    return [];
  }
}

module.exports = {
  parseForESLint(code, options) {
    const source = new Source(code);
    const ast = preprocess(source, { mode: 'codemod' })
    const tokens = [];
    const comments = [];
    const types = new Set();
    types.add('Program');
    traverse(ast, {
      All(node, path) {
        types.add(`__TEMPLATE__${node.type}`);
        const span = source.spanFor(node.loc);
        node.range = [span.getStart().offset, span.getEnd().offset];
        if (node.type.toLowerCase().includes('comment')) {
          comments.push(node);
          return
        }
        tokens.push(node);
      }
    });
    ast.tokens = tokens;
    ast.comments = comments;
    const visitorKeys = {};
    types.forEach((t) => {
      visitorKeys[t] = []
    })
    ast.type = 'Program';
    ast.isHbs = true;
    ast.contents = code;
    tokens.slice(1).forEach((node) => {
      node.type = `__TEMPLATE__${node.type}`;
    })
    const scope = new ScopeManager();
    scope.globalScope.block = ast;
    return { ast, scopeManager: scope, visitorKeys }
  }
}
