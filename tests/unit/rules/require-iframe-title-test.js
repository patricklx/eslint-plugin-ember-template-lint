"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "require-iframe-title",
  config: true,
  good: ['<iframe title="Welcome to the Matrix!" />', "<iframe title={{someValue}} />", '<iframe title="" aria-hidden />', '<iframe title="" hidden />', '<iframe title="foo" /><iframe title="bar" />'],
  bad: [{
    template: '<iframe title="foo" /><iframe title="foo" />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 9,
              "endColumn": 20,
              "endLine": 1,
              "line": 1,
              "message": "This title is not unique. #1",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-iframe-title",
              "severity": 2,
            },
            {
              "column": 23,
              "endColumn": 45,
              "endLine": 1,
              "line": 1,
              "message": "<iframe> elements must have a unique title property. Value title="foo" already used for different iframe. #1",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-iframe-title",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<iframe title="foo" /><iframe title="boo" /><iframe title="foo" /><iframe title="boo" />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 9,
              "endColumn": 20,
              "endLine": 1,
              "line": 1,
              "message": "This title is not unique. #1",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-iframe-title",
              "severity": 2,
            },
            {
              "column": 31,
              "endColumn": 42,
              "endLine": 1,
              "line": 1,
              "message": "This title is not unique. #2",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-iframe-title",
              "severity": 2,
            },
            {
              "column": 45,
              "endColumn": 67,
              "endLine": 1,
              "line": 1,
              "message": "<iframe> elements must have a unique title property. Value title="foo" already used for different iframe. #1",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-iframe-title",
              "severity": 2,
            },
            {
              "column": 67,
              "endColumn": 89,
              "endLine": 1,
              "line": 1,
              "message": "<iframe> elements must have a unique title property. Value title="boo" already used for different iframe. #2",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-iframe-title",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<iframe src="12" />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 20,
              "endLine": 1,
              "line": 1,
              "message": "<iframe> elements must have a unique title property.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-iframe-title",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<iframe src="12" title={{false}} />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 36,
              "endLine": 1,
              "line": 1,
              "message": "<iframe> elements must have a unique title property.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-iframe-title",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<iframe src="12" title="{{false}}" />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 38,
              "endLine": 1,
              "line": 1,
              "message": "<iframe> elements must have a unique title property.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-iframe-title",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<iframe src="12" title="" />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 29,
              "endLine": 1,
              "line": 1,
              "message": "<iframe> elements must have a unique title property.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-iframe-title",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});