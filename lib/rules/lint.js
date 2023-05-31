'use strict';
const synckit = require('synckit');
const DocumentLines = require('../utils/document');
const { templateLintConfig } = require('../ember-teplate-lint/config');

function runTemplateLint(node, context) {
  const sourceCode = context.getSourceCode();
  const { scopeManager, text: sourceCodeText } = sourceCode;
  const scopes = scopeManager.scopes.filter(x => x.block.range[0] < node.range[0] && x.block.range[1] > node.range[1]);
  const scopeVars = scopes.map(s => s.variables.map(x => x.name)).flat();
  const filename = context.getPhysicalFilename();
  let text = node.contents;
  const initialLine = sourceCodeText.split('\n')[node.loc.start.line-1];
  const columnOffset = initialLine.match(/^\s+/)?.[0].length || 0;
  const offset = (node.range[0] || 0);
  const spaces = ' '.repeat(columnOffset);
  const originalDocument = new DocumentLines(spaces + text);
  if (columnOffset) {
    text = text.split('\n').map(l => l.replace(new RegExp(`^\\s{1,${columnOffset}}`), '')).join('\n');
    text = text.trim();
  }

  try {
    const syncFn = synckit.createSyncFn(require.resolve('./hbs-worker'));
    const response = syncFn(filename, text, { config: templateLintConfig }, columnOffset);
    const lintMessages = response.messages;
    lintMessages.forEach((m) => {
      if (m.fix) {
        m.fix.forEach((fix) => {
          const d = fix;
          fix.range = [d.offset, d.offset + (d.deleteText?.length || 0)];
          const start = originalDocument.offsetToPosition(fix.range[0]);
          const end = originalDocument.offsetToPosition(fix.range[1]);
          fix.range = [
            originalDocument.positionToOffset({
              line: start.line,
              character: start.character
            }),
            originalDocument.positionToOffset({
              line: end.line,
              character: end.character
            })
          ];
          fix.range = fix.range.map(x => offset + x);
        });
      }
      m.range = [
        originalDocument.positionToOffset({
          line: m.line - 1,
          character: m.column
        }),
        originalDocument.positionToOffset({
          line: m.endLine - 1,
          character: m.endColumn
        })];
      m.range = m.range.map(x => offset + x);
    });

    lintMessages.forEach((msg) => {
      if (msg.rule === 'no-implicit-this') {
        if (scopeVars.includes(msg.source)) {
          return;
        }
      }
      const [start, end] = msg.range.map(index =>
        context.getSourceCode().getLocFromIndex(index)
      );

      context.report({
        rule: msg.rule,
        fix: (fixer) => {
          if (!msg.isFixable || !msg.fix) {
            return null;
          }
          const fixes = msg.fix;
          return fixes.map(fix => fixer.replaceTextRange(fix.range, fix.insertText || ''));
        },
        loc: { start, end },
        message: msg.message,
      });
    });
  } catch(e) {
    console.error(e);
  }
}

module.exports = {
  runTemplateLint
};
