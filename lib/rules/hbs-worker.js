const { runAsWorker } = require('synckit');
const { generateDifferences } = require('prettier-linter-helpers');

runAsWorker(async (filename, text, options) => {
  const Lint = await import('ember-template-lint');
  const lint = new Lint.default(options);
  process.env.emberTemplateLintFileName = filename;
  process.env.emberTemplateLintFixMode = false;
  const messages = await lint.verify({
    source: text
  });
  process.env.emberTemplateLintFixMode = true;
  const fixedText = (await lint.verifyAndFix({
    source: text
  })).output;
  const diff = generateDifferences(text, fixedText);
  return {
    messages,
    diff
  }
})
