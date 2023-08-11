"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: 'no-quoteless-attributes',
  config: true,
  good: ['<div data-foo="derp"></div>', '<div data-foo="derp {{stuff}}"></div>', '<div data-foo={{someValue}}></div>', '<div data-foo={{true}}></div>', '<div data-foo={{false}}></div>', '<div data-foo={{5}}></div>', '<SomeThing ...attributes />', '<div></div>', '<input disabled>'],
  bad: [{
    template: '<div data-foo=asdf></div>',
    fixedTemplate: '<div data-foo="asdf"></div>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 5,
              "endColumn": 18,
              "endLine": 1,
              "filePath": "layout.hbs",
              "isFixable": true,
              "line": 1,
              "message": "Attribute data-foo should be either quoted or wrapped in mustaches",
              "rule": "no-quoteless-attributes",
              "severity": 2,
              "source": "data-foo=asdf",
            },
          ]
        `);
    }
  }, {
    template: '<SomeThing @blah=asdf />',
    fixedTemplate: '<SomeThing @blah="asdf" />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 11,
              "endColumn": 21,
              "endLine": 1,
              "filePath": "layout.hbs",
              "isFixable": true,
              "line": 1,
              "message": "Argument @blah should be either quoted or wrapped in mustaches",
              "rule": "no-quoteless-attributes",
              "severity": 2,
              "source": "@blah=asdf",
            },
          ]
        `);
    }
  }]
});