const { preprocess, traverse, normalize, Source, ASTv1 } = require('@glimmer/syntax');
const gts =  require('ember-template-imports');
const typescriptParser =  require('@typescript-eslint/parser');
const typescriptEstree = require("@typescript-eslint/typescript-estree");

function visitorKeysForAst(source, ast) {
  const tokens = [];
  const types = new Set();
  traverse(ast, {
    All(node, path) {
      types.add(`__TEMPLATE__${node.type}`);
      const span = source.spanFor(node.loc);
      node.range = [span.getStart().offset, span.getEnd().offset];
      tokens.push(node);
    }
  });
  ast.tokens = tokens;
  const visitorKeys = {};
  types.forEach((t) => {
    // visitorKeys[t] = ['body', 'name', 'path', 'params', 'attributes', 'hash', 'modifiers', 'comments', 'value', 'program', 'inverse', 'children']
    visitorKeys[t] = []
  });
  tokens.forEach((node) => {
    node.type = `__TEMPLATE__${node.type}`;
  })
  return visitorKeys;
}

function replaceRange(s, start, end, substitute) {
  return s.substring(0, start) + substitute + s.substring(end);
}


module.exports = {
  parseForESLint(code, options) {
    let jsCode = code;
    const templateInfos = gts.parseTemplates(code, options.filePath);
    templateInfos.forEach((tpl) => {
      const range = [tpl.start.index, tpl.end.index + tpl.end[0].length];
      tpl.range = range;
      const template = jsCode.slice(...range);
      const lines = template.split('\n');
      lines.forEach((line, i) => {
        lines[i] = ' '.repeat(line.length);
      });
      const emptyText = '`' + lines.join('\n').slice(2) + '`';
      jsCode = replaceRange(jsCode, ...range, emptyText);
      const ast = preprocess(tpl.contents, { mode: 'codemod' })
      ast.contents = tpl.contents;
      tpl.ast = ast;
    })
    const result = typescriptParser.parseForESLint(jsCode, options);
    const visitorKeys = {...result.visitorKeys};
    result.ast.tokens.forEach((token, i) => {
      if (token.type === 'Template') {
        const template = templateInfos.find(t => t.range[0] >= token.range[0] && t.range[1] <= token.range[1]);
        const ast = template.ast;
        const source = new Source(code);
        Object.assign(visitorKeys, visitorKeysForAst(source, ast))
        Object.assign(token, ast);
      }
    });
    typescriptEstree.simpleTraverse(result.ast, {
      enter(node, parent) {
        if (node.type === 'TemplateLiteral') {
          const template = templateInfos.find(t => t.range[0] >= node.range[0] && t.range[1] <= node.range[1]);
          const ast = template.ast
          Object.assign(node, ast);
        }
      }
    })

    return { ...result, visitorKeys }
  }
}
