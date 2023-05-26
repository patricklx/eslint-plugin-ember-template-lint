
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

  acquire() {
    return;
  }

  getDeclaredVariables() {
    return [];
  }
}

module.exports = {
  parseForESLint(code) {
    const comments = [];
    const types = new Set(['Program']);
    const ast = {};
    ast.tokens = [ast];
    ast.range = [0, code.length];
    const lines = code.split('\n');
    ast.loc = {
      start: {
        line: 1,
        column: 1
      },
      end: {
        line: lines.length,
        column: lines[lines.length - 1].length
      }
    };
    ast.comments = comments;
    const visitorKeys = {};
    types.forEach((t) => {
      visitorKeys[t] = [];
    });
    ast.type = 'Program';
    ast.isHbs = true;
    ast.contents = code;
    const scope = new ScopeManager();
    scope.globalScope.block = ast;
    return { ast, scopeManager: scope, visitorKeys };
  }
};
