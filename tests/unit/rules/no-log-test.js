"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "no-log",
  config: true,
  good: ["{{foo}}", "{{button}}", "{{#each this.logs as |log|}}{{log}}{{/each}}", "{{#let this.log as |log|}}{{log}}{{/let}}", '{{#let (component "my-log-component") as |log|}}{{#log}}message{{/log}}{{/let}}', "<Logs @logs={{this.logs}} as |log|>{{log}}</Logs>", "<Logs @logs={{this.logs}} as |log|><Log>{{log}}</Log></Logs>"],
  bad: [{
    template: "{{log}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 8,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected {{log}} usage.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-log",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{log "Logs are best for debugging!"}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 39,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected {{log}} usage.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-log",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{#log}}Arrgh!{{/log}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 23,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected {{log}} usage.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-log",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{#log "Foo"}}{{/log}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 23,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected {{log}} usage.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-log",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{#each this.messages as |message|}}{{log message}}{{/each}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 37,
              "endColumn": 52,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected {{log}} usage.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-log",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{#let this.message as |message|}}{{log message}}{{/let}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 35,
              "endColumn": 50,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected {{log}} usage.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-log",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<Messages @messages={{this.messages}} as |message|>{{#log}}{{message}}{{/log}}</Messages>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 52,
              "endColumn": 79,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected {{log}} usage.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-log",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});