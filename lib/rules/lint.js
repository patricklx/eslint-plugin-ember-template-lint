'use strict';
const synckit = require('synckit');
const {CACHE} = require('../hbs-preprocessor');
const DocumentLines = require('../utils/document');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {

  meta: {
    docs: {
      description: 'lint templates',
      category: 'template linting',
      recommended: false
    },
    fixable: 'code',
    type: 'problem'
  },

  create: function(context) {
    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    const runTemplateLint = (text, filename, context, scopeVars=[], offset=0) => {
      try {
        const syncFn = synckit.createSyncFn(require.resolve('../preprocessors/hbs-worker'));
        const response = syncFn(filename, text);
        const lintMessages = response.messages;
        const diffs = response.diff;
        const document = new DocumentLines(text);
        diffs.forEach((d) => {
          d.range = [d.offset, d.offset + d.deleteText.length];
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
            fix: (fixer) => {
              if (!msg.isFixable || !msg.fix) {
                return null;
              }
              const range = msg.range;
              return fixer.replaceTextRange(range, msg.fix.insertText || '');
            },
            loc: { start, end },
            message: `${msg.rule}: ` + msg.message,
          });
        });
      } catch(e) {
        console.error(e);
      }
    };

    return {
      CallExpression(node) {
        if (node.callee.type !== 'Identifier' || node.callee.name !== '__GLIMMER_TEMPLATE') {
          return;
        }
        const sourceCode = context.getSourceCode();
        const { scopeManager } = sourceCode;
        const scopes = scopeManager.scopes.filter(x => x.block.range[0] < node.range[0] && x.block.range[1] > node.range[1]);
        const scopeVars = scopes.map(s => s.variables.map(x => x.name)).flat();
        const filename = context.getPhysicalFilename();
        const arg = node.arguments[0].quasis[0];
        runTemplateLint(arg.value.raw, filename, context, scopeVars, arg.range[0] + 2);
      },

      Program: () => {
        const filename = context.getPhysicalFilename();
        const text = CACHE[filename];
        if (!text) return;
        runTemplateLint(text, filename, context);
      }
    };
  }
};
