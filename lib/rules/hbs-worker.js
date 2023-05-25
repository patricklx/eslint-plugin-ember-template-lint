const { runAsWorker } = require('synckit');
const { generateDifferences } = require('prettier-linter-helpers');

async function _applyFixes(options, results) {
  const { parse, transform } = await import('ember-template-recast');
  let currentSource = options.source;
  let fixableIssues = results.filter((r) => r.isFixable);

  // nothing to do, bail out
  if (fixableIssues.length === 0) {
    return currentSource;
  }

  let fileConfig = this._moduleStatusCache.getConfigForFile(options);

  let ruleNames = new Set(fixableIssues.map((r) => r.rule));

  for (let ruleName of ruleNames) {
    let templateInfos = [{
      template: currentSource,
      columnOffset: 0,
      isStrictMode: false
    }];

    for (let templateInfo of templateInfos) {
      let { templateMatch } = templateInfo;

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
        const diffs = generateDifferences(templateInfo.template, code);
        fixableIssues.filter(r => r.rule === ruleName).forEach((r, i) => {
          r.fix = diffs[i];
        });
      }
    }
  }

  return currentSource;
}

runAsWorker(async (filename, text, options) => {
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
    filePath: filename.replace('.gts', '.hbs')
  }, messages);
  return {
    messages,
  };
});
