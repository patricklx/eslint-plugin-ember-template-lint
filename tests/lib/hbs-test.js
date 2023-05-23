'use strict';

/**
 * Because this test needs the preprocessor, we can't use the normal
 * RuleTester api doesn't support preprocessors.
 *
 * @typedef {import('eslint/lib/cli-engine/cli-engine').CLIEngineOptions} CLIEngineOptions
 */

const { ESLint } = require('eslint');
require('../../lib/ember-teplate-lint/config').registerPlugin('ember-template-lint-plugin-prettier');
const plugin = require('../../lib');

/**
 * Helper function which creates ESLint instance with enabled/disabled autofix feature.
 *
 * @param {CLIEngineOptions} [options={}] Whether to enable autofix feature.
 * @returns {ESLint} ESLint instance to execute in tests.
 */
function initESLint(options) {
  // tests must be run with ESLint 7+
  return new ESLint({
    ignore: false,
    useEslintrc: false,
    plugins: { 'ember-template': plugin },
    overrideConfig: {
      root: true,
      env: {
        browser: true,
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      plugins: ['ember-template'],
      extends: ['plugin:ember-template/recommended'],
      rules: {
      },
    },
    ...options,
  });
}


describe('runs template-lint', () => {
  it('correctly reports errors', async () => {
    const eslint = initESLint();
    const code = `
      <div class='x' class='b'></div>
    `;
    const results = await eslint.lintText(code, { filePath: 'my-component.hbs' });
    const resultErrors = results.flatMap((result) => result.messages);
    expect(resultErrors).toHaveLength(1);
    expect(resultErrors[0].message).toBe('Duplicate attribute \'class\' found in the Element.');
    expect(resultErrors[0].line).toBe(2);
    expect(resultErrors[0].ruleId).toBe('ember-template/no-duplicate-attributes');
  });
});
