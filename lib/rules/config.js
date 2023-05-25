'use strict';
const synckit = require('synckit');
const DocumentLines = require('../utils/document');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const runTemplateLint = (text, filename, context, scopeVars=[], offset=0, options) => {
  try {
    const syncFn = synckit.createSyncFn(require.resolve('./hbs-worker'));
    const response = syncFn(filename, text, options);
    const lintMessages = response.messages;
    const diffs = response.diff;
    const document = new DocumentLines(text);
    diffs.forEach((d) => {
      d.range = [d.offset, d.offset + (d.deleteText?.length || 0)];
    });
    lintMessages.forEach((m) => {
      m.range = [
        document.positionToOffset({
          line: m.line - 1,
          character: m.column - 1
        }),
        document.positionToOffset({
          line: m.endLine - 1,
          character: m.endColumn - 1
        })];
      const isInside = (d) => d.range[0] >= m.range[0] && d.range[1] <= m.range[1];
      const doesContain = (d) => d.range[0] < m.range[0] && d.range[1] > m.range[1];
      const idx = diffs.findIndex(d => isInside(d) || doesContain(d));
      if (idx !== -1) {
        const d = diffs.splice(idx, 1);
        m.fix = d[0];
        m.fix.range = m.fix.range.map(x => offset + x);
      }
      m.range = m.range.map(x => offset + x);
    });

    if (diffs.length) {
      diffs.forEach((d) => {
        const range = d.range[0];
        const [start, end] = range.map(index =>
          context.getSourceCode().getLocFromIndex(index)
        );
        context.report({
          fix: (fixer) => {
            return fixer.replaceTextRange(range, d.fix.insertText || '');
          },
          loc: { start, end },
          message: 'template error',
        });
      });
    }

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
};

module.exports = {
  runTemplateLint
};