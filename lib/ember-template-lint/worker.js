const { runAsWorker } = require('synckit');

runAsWorker(async (options) => {
  const Lint = await import('ember-template-lint');
  const lint = new Lint.default(options);
  await lint.loadConfig();
  return {
    configs: lint.config.loadedConfigurations,
    rules: Object.keys(lint.config.loadedRules),
    configuredRules: lint.config.rules,
  };
});
