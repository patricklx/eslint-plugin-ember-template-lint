"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "no-yield-to-default",
  config: true,
  good: ["{{yield}}", '{{yield to="title"}}', "{{has-block}}", '{{has-block "title"}}', "{{has-block-params}}", '{{has-block-params "title"}}', "{{hasBlock}}", '{{hasBlock "title"}}', "{{hasBlockParams}}", '{{hasBlockParams "title"}}'],
  bad: [{
    template: '{{yield to="default"}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 9,
              "endColumn": 21,
              "endLine": 1,
              "line": 1,
              "message": "A block named "default" is not valid",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-yield-to-default",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{has-block "default"}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 13,
              "endColumn": 22,
              "endLine": 1,
              "line": 1,
              "message": "A block named "default" is not valid",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-yield-to-default",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{has-block-params "default"}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 20,
              "endColumn": 29,
              "endLine": 1,
              "line": 1,
              "message": "A block named "default" is not valid",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-yield-to-default",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{hasBlock "default"}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 12,
              "endColumn": 21,
              "endLine": 1,
              "line": 1,
              "message": "A block named "default" is not valid",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-yield-to-default",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{hasBlockParams "default"}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 18,
              "endColumn": 27,
              "endLine": 1,
              "line": 1,
              "message": "A block named "default" is not valid",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-yield-to-default",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{if (has-block "default")}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 17,
              "endColumn": 26,
              "endLine": 1,
              "line": 1,
              "message": "A block named "default" is not valid",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-yield-to-default",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{#if (has-block "default")}}{{/if}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 18,
              "endColumn": 27,
              "endLine": 1,
              "line": 1,
              "message": "A block named "default" is not valid",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-yield-to-default",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{if (has-block-params "default")}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 24,
              "endColumn": 33,
              "endLine": 1,
              "line": 1,
              "message": "A block named "default" is not valid",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-yield-to-default",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{#if (has-block-params "default")}}{{/if}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 25,
              "endColumn": 34,
              "endLine": 1,
              "line": 1,
              "message": "A block named "default" is not valid",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-yield-to-default",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{if (hasBlock "default")}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 16,
              "endColumn": 25,
              "endLine": 1,
              "line": 1,
              "message": "A block named "default" is not valid",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-yield-to-default",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{#if (hasBlock "default")}}{{/if}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 17,
              "endColumn": 26,
              "endLine": 1,
              "line": 1,
              "message": "A block named "default" is not valid",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-yield-to-default",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{if (hasBlockParams "default")}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 22,
              "endColumn": 31,
              "endLine": 1,
              "line": 1,
              "message": "A block named "default" is not valid",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-yield-to-default",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{#if (hasBlockParams "default")}}{{/if}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 23,
              "endColumn": 32,
              "endLine": 1,
              "line": 1,
              "message": "A block named "default" is not valid",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-yield-to-default",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});