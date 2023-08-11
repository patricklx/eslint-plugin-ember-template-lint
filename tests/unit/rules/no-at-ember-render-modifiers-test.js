"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "no-at-ember-render-modifiers",
  config: true,
  good: ["<div {{this.someModifier}}></div>", "<div {{someModifier}}></div>", "<div {{did-foo}}></div>",
  // helper -- a different rule should prevent this
  // https://github.com/buschtoens/ember-render-helpers (depending on usage)
  "{{did-insert}}", "{{did-update}}", "{{will-destroy}}"],
  bad: [{
    template: "<div {{did-insert}}></div>",
    verifyResults(results) {
      expect({
        results
      }).toMatchInlineSnapshot(`
          {
            "results": [
              {
                "column": 6,
                "endColumn": 20,
                "endLine": 1,
                "line": 1,
                "message": "Do not use the \`did-insert\` modifier. This modifier was intended to ease migration to Octane and not for long-term side-effects. Instead, refactor to use a custom modifier. See https://github.com/ember-modifier/ember-modifier",
                "nodeType": null,
                "ruleId": "ember-template-lint/no-at-ember-render-modifiers",
                "severity": 2,
              },
            ],
          }
        `);
    }
  }, {
    template: "<div {{did-update}}></div>",
    verifyResults(results) {
      expect({
        results
      }).toMatchInlineSnapshot(`
          {
            "results": [
              {
                "column": 6,
                "endColumn": 20,
                "endLine": 1,
                "line": 1,
                "message": "Do not use the \`did-update\` modifier. This modifier was intended to ease migration to Octane and not for long-term side-effects. Instead, refactor to use a custom modifier. See https://github.com/ember-modifier/ember-modifier",
                "nodeType": null,
                "ruleId": "ember-template-lint/no-at-ember-render-modifiers",
                "severity": 2,
              },
            ],
          }
        `);
    }
  }, {
    template: "<div {{will-destroy}}></div>",
    verifyResults(results) {
      expect({
        results
      }).toMatchInlineSnapshot(`
          {
            "results": [
              {
                "column": 6,
                "endColumn": 22,
                "endLine": 1,
                "line": 1,
                "message": "Do not use the \`will-destroy\` modifier. This modifier was intended to ease migration to Octane and not for long-term side-effects. Instead, refactor to use a custom modifier. See https://github.com/ember-modifier/ember-modifier",
                "nodeType": null,
                "ruleId": "ember-template-lint/no-at-ember-render-modifiers",
                "severity": 2,
              },
            ],
          }
        `);
    }
  }]
});