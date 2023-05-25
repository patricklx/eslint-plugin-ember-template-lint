'use strict';
const synckit = require('synckit');
const DocumentLines = require('../utils/document');
const { templateLintConfig } = require('../ember-teplate-lint/config');

function runTemplateLint(text, filename, context, scopeVars=[], offset=0) {
  const originalDocument = new DocumentLines(text);
  try {
    let columnOffset = 0;
    let lineOffset = 0;
    if (text.startsWith('\n')) {
      text = text.slice(1);
      lineOffset += 1;
    }
    columnOffset = text.match(/\s+/)[0].length;
    text = text.split('\n').map(l => l.replace(new RegExp(`^\\s{1,${columnOffset}}`), '')).join('\n');
    text = text.trim();
    const syncFn = synckit.createSyncFn(require.resolve('./hbs-worker'));
    const response = syncFn(filename, text, { config: templateLintConfig });
    const lintMessages = response.messages;
    const document = new DocumentLines(text);
    lintMessages.forEach((m) => {
      if (m.fix) {
        const d = m.fix;
        if (d.insertText) {
          d.insertText = d.insertText.replace(/\n/g, '\n' + ' '.repeat(columnOffset));
        }
        m.fix.range = [d.offset, d.offset + (d.deleteText?.length || 0)];
        m.range = m.fix.range;
        const start = document.offsetToPosition(m.fix.range[0]);
        const end = document.offsetToPosition(m.fix.range[1]);
        m.fix.range = [
          originalDocument.positionToOffset({
            line: start.line + lineOffset,
            character: start.character + columnOffset - 1
          }),
          originalDocument.positionToOffset({
            line: end.line + lineOffset,
            character: end.character + columnOffset - 1
          })
        ];
        m.fix.range = m.fix.range.map(x => offset + x);
        m.range = m.fix.range;
        return;
      }
      m.range = [
        originalDocument.positionToOffset({
          line: m.line - 1 + lineOffset,
          character: m.column + columnOffset - 1
        }),
        originalDocument.positionToOffset({
          line: m.endLine - 1 + lineOffset,
          character: m.endColumn + columnOffset - 1
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
          const range = msg.range;
          return fixer.replaceTextRange(range, msg.fix.insertText || '');
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
