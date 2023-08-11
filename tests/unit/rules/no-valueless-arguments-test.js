"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: 'no-valueless-arguments',
  config: true,
  good: ['<SomeComponent @emptyString="" data-test-some-component />', `<button type="submit" disabled {{on "click" this.submit}}></button>`],
  bad: [{
    template: '<SomeComponent @valueless />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 15,
              "endColumn": 25,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "Named arguments should have an explicitly assigned value.",
              "rule": "no-valueless-arguments",
              "severity": 2,
              "source": "@valueless",
            },
          ]
        `);
    }
  }, {
    template: '<SomeComponent @valuelessByAccident{{this.canBeAModifier}} />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 15,
              "endColumn": 35,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "Named arguments should have an explicitly assigned value.",
              "rule": "no-valueless-arguments",
              "severity": 2,
              "source": "@valuelessByAccident",
            },
          ]
        `);
    }
  }, {
    template: '<SomeComponent @valuelessByAccident{{@canBeAModifier}} />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 15,
              "endColumn": 35,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "Named arguments should have an explicitly assigned value.",
              "rule": "no-valueless-arguments",
              "severity": 2,
              "source": "@valuelessByAccident",
            },
          ]
        `);
    }
  }]
});