const gts =  require('ember-template-imports');
const typescriptParser =  require('@typescript-eslint/parser');
const typescriptEstree = require('@typescript-eslint/typescript-estree');


function replaceRange(s, start, end, substitute) {
  return s.substring(0, start) + substitute + s.substring(end);
}

module.exports = {
  parseForESLint(code, options) {
    let jsCode = code;
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
      const ast = {
        type: '__TEMPLATE__Template',
      };
      ast.range = range;
      ast.contents = template;
      tpl.ast = ast;
    });
    const result = typescriptParser.parseForESLint(jsCode, options);
    const visitorKeys = {...result.visitorKeys, '__TEMPLATE__Template': []};
    result.ast.tokens.forEach((token) => {
      if (token.type === 'Template') {
        const range = [token.range[0] - 1, token.range[1] + 1];
        const template = templateInfos.find(t => t.range[0] >= range[0] && t.range[1] <= range[1]);
        if (!template) return;
        const ast = template.ast;
        ast.loc = token.loc;
        Object.assign(token, ast);
      }
    });
    typescriptEstree.simpleTraverse(result.ast, {
      enter(node) {
        if (node.type === 'TemplateLiteral') {
          const range = [node.range[0] - 1, node.range[1] + 1];
          const template = templateInfos.find(t => t.range[0] >= range[0] && t.range[1] <= range[1]);
          if (!template) return;
          const ast = template.ast;
          Object.assign(node, ast);
        }
      }
    });

    return { ...result, visitorKeys };
  }
};
