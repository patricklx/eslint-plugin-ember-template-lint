const { preprocess, traverse, normalize, Source, ASTv1 } = require('@glimmer/syntax');
const gts =  require('ember-template-imports');
const typescriptParser =  require('@typescript-eslint/parser');
const typescriptEstree = require("@typescript-eslint/typescript-estree");
const processor =  require('../processor');

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
    let jsCode = processor.TEXT_CACHE[options.filePath.split('\\0_')[0]];
    const templateInfos = gts.parseTemplates(jsCode, options.filePath);
    templateInfos.forEach((tpl) => {
      const range = [tpl.start.index, tpl.end.index + tpl.end[0].length];
      tpl.range = range;
      const template = jsCode.slice(...range);
      const lines = template.split('\n');
      lines.forEach((line, i) => {
        lines[i] = ' '.repeat(line.length);
      });
      const emptyText = '[`' + lines.join('\n').slice(4) + '`]';
      jsCode = replaceRange(jsCode, ...range, emptyText);
      const source = new Source(tpl.contents);
      const ast = preprocess(source, { mode: 'codemod' })
      const offset = range[0];
      ast.range = range;
      ast.contents = tpl.contents;
      tpl.ast = ast;
    })
    const result = typescriptParser.parseForESLint(jsCode, options);
    const visitorKeys = {...result.visitorKeys};
    result.ast.tokens.forEach((token, i) => {
      if (token.type === 'Template') {
        const range = [token.range[0] - 1, token.range[1] + 1];
        const template = templateInfos.find(t => t.range[0] >= range[0] && t.range[1] <= range[1]);
        if (!template) return;
        const ast = template.ast;
        const source = new Source(code);
        Object.assign(visitorKeys, visitorKeysForAst(source, ast))
        Object.assign(token, ast);
      }
    });
    typescriptEstree.simpleTraverse(result.ast, {
      enter(node, parent) {
        if (node.type === 'TemplateLiteral') {
          const range = [node.range[0] - 1, node.range[1] + 1];
          const template = templateInfos.find(t => t.range[0] >= range[0] && t.range[1] <= range[1]);
          if (!template) return;
          const ast = template.ast
          Object.assign(node, ast);
        }
      }
    })

    return { ...result, visitorKeys }
  }
}
