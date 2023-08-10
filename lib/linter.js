const { ESLint } = require('eslint');
const plugin = require('./index');
module.exports = class Linter {

  constructor(options) {
    this.options = options;
  }

  initESLint(options) {
    // tests must be run with ESLint 7+
    return new ESLint({
      fix: options.fix,
      ignore: false,
      useEslintrc: false,
      plugins: { 'ember-template-lint': plugin },
      overrideConfig: {
        root: true,
        env: {
          browser: true,
        },
        parserOptions: {
          ecmaVersion: 2020,
          sourceType: 'module',
        },
        plugins: ['ember-template-lint'],
        extends: ['plugin:ember-template-lint/base'],
        rules: { ...options.rules },
      }
    });
  }
  /**
   * @param {{filePath: string; source: string}} options
   */
  async verify(options) {
    try {
      const eslint = this.initESLint(this.getConfig());
      const results = await eslint.lintText(options.source, { filePath: options.filePath });
      return results.flatMap((result) => result.messages);
    } catch (e) {
      console.error(e);
      return [{
        fatal: true,
        filePath: options.filePath,
        severity: 2,
        message: e.message
      }];
    }
  }
  async verifyAndFix(options) {
    try {
      const eslint = this.initESLint({ ...this.getConfig(), fix: true });
      return await eslint.lintText(options.source, { filePath: options.filePath });
    } catch (e) {
      console.error(e);
      return [{
        fatal: true,
        filePath: options.filePath,
        severity: 2,
        message: e.message
      }];
    }
  }

  getConfig() {
    const conf = this.options.config;
    Object.keys(conf.rules).forEach((key) => {
      if (key.startsWith('ember-template-lint')) return;
      const rule = conf.rules[key];
      delete conf.rules[key];
      key = `ember-template-lint/${key}`;
      conf.rules[key] = [rule?.severity ?? 2];
      if (rule?.config) {
        conf.rules[key].push(rule.config);
      }
    });
    return conf;
  }
};