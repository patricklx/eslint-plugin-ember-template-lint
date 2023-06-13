const { runAsWorker } = require('synckit');
const { generateDifferences } = require('prettier-linter-helpers');
const Document = require('../utils/document');

async function _applyFixes(options, results, columnOffset) {
  const { transform } = await import('ember-template-recast');
  let currentSource = options.source;
  let fixableIssues = results.filter((r) => r.isFixable);

  // nothing to do, bail out
  if (fixableIssues.length === 0) {
    return currentSource;
  }

  let fileConfig = this._moduleStatusCache.getConfigForFile(options);

  let ruleNames = new Set(fixableIssues.map((r) => r.rule));
  const spaces = ' '.repeat(columnOffset);

  let template = currentSource;
  if (columnOffset) {
    template = spaces + template.replace(/\n([^\n])/g, '\n' + spaces + '$1');
  }
  const origDoc = new Document(template);
  fixableIssues.forEach((r) => {
    r.range = [
      origDoc.positionToOffset({line: r.line - 1, character: r.column}),
      origDoc.positionToOffset({line: r.endLine - 1, character: r.endColumn}),
    ];
  });

  for (let ruleName of ruleNames) {
    let templateInfos = [{
      template: currentSource,
      columnOffset: 0,
      isStrictMode: false
    }];

    const diffContained = (d, range) => d.range[0] >= range[0] && d.range[1] <= range[1];
    const diffIntersect = (d, range) =>
      (d.range[1] >= range[0] && d.range[1] <= range[1])
      ||
      (d.range[0] >= range[0] && d.range[0] <= range[1]);

    for (let templateInfo of templateInfos) {

      let rule = this._buildRule(ruleName, {
        shouldFix: true,
        filePath: options.filePath,
        columnOffset: templateInfo.columnOffset,
        rawSource: templateInfo.template,
        isStrictMode: templateInfo.isStrictMode,
        fileConfig,
      });

      let visitor = await rule.getVisitor();
      let { code } = transform(templateInfo.template, () => visitor);

      if (code !== templateInfo.template) {

        if (columnOffset) {
          code = spaces + code.split('\n').join('\n' + spaces);
        }
        const diffs = generateDifferences(template, code);
        diffs.forEach((d) => {
          d.range = [d.offset - columnOffset, d.offset + (d.deleteText?.length || 0) - columnOffset];
        });
        fixableIssues.filter(r => r.rule === ruleName).forEach((r) => {
          const range = r.range;
          r.fix = diffs.filter(d => diffContained(d, range) || diffIntersect(d, range));
        });
      }
    }
  }

  return currentSource;
}

runAsWorker(async (filename, text, options, columnOffset=0) => {
  const Lint = await import('ember-template-lint');
  const lint = new Lint.default(options);
  process.env.emberTemplateLintFileName = filename;
  process.env.emberTemplateLintFixMode = false;

  const messages = await lint.verify({
    source: text,
    filePath: filename.replace('.gts', '.hbs')
  });
  process.env.emberTemplateLintFixMode = true;
  await _applyFixes.call(lint,{
    source: text,
    filePath: filename.replace('.gts', '.hbs'),
  }, messages, columnOffset);
  return {
    messages,
  };
});
