import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "deprecated-render-helper",

  config: true,

  good: [
    "{{valid-compoennt}}",
    '{{input placeholder=(t "email") value=email}}',
    '{{title "CrossCheck Web" prepent=true separator=" | "}}',
    '{{hockey-player teamName="Boston Bruins"}}',
    "{{false}}",
    '{{"foo"}}',
    "{{42}}",
    "{{null}}",
    "{{undefined}}",
  ],

  bad: [
    {
      template: "{{render 'ken-griffey'}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 25,
              "endLine": 1,
              "line": 1,
              "message": "The \`{{render}}\` helper is deprecated in favor of using components. Please see the deprecation guide at https://emberjs.com/deprecations/v2.x/#toc_code-render-code-helper.",
              "nodeType": null,
              "ruleId": "ember-template-lint/deprecated-render-helper",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "{{render 'baseball-player' pitcher}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 37,
              "endLine": 1,
              "line": 1,
              "message": "The \`{{render}}\` helper is deprecated in favor of using components. Please see the deprecation guide at https://emberjs.com/deprecations/v2.x/#toc_code-render-code-helper.",
              "nodeType": null,
              "ruleId": "ember-template-lint/deprecated-render-helper",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
