const { convertAst, glimmerVisitorKeys } = require('./utils');
const { preprocessGlimmerTemplates } = require('./utils');
const { ScopeManager, Scope } = require('eslint-scope');


module.exports = {
  parseForESLint(code) {
    const comments = [];
    const ast = {};
    ast.body = [];
    ast.tokens = [];
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
    ast.type = 'TemplateLiteral';
    ast.contents = code;
    const scope = new ScopeManager({});
    scope.globalScope = new Scope(scope, 'global', null, ast, false);
    scope.globalScope.ast = ast;
    const result = { ast, scopeManager: scope, glimmerVisitorKeys };

    const preprocessedResult = preprocessGlimmerTemplates({
      replacements: [{
        original: {
          contentRange: [0, code.length],
          range: [0, code.length],
        },
        replaced: {
          range: [0, code.length],
        }
      }]
    }, code);
    const visitorKeys = preprocessedResult.templateVisitorKeys;
    convertAst(result, preprocessedResult, visitorKeys);
    return { ...result, visitorKeys };
  }
};
