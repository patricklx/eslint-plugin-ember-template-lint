import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "no-triple-curlies",

  config: true,

  good: [
    "{{foo}}",
    "{{! template-lint-disable no-bare-strings }}",
    "{{! template-lint-disable }}",
    "{{! template-lint-disable no-triple-curlies}}{{{lol}}}",
  ],

  bad: [
    {
      template: "\n {{{foo}}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 2,
              "endColumn": 11,
              "endLine": 2,
              "line": 2,
              "message": "Usage of triple curly brackets is unsafe",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-triple-curlies",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
