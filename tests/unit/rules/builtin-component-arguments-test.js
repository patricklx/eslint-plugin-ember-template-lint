import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "builtin-component-arguments",

  config: true,

  good: [
    "<Input/>",
    '<input type="text" size="10" />',
    '<Input @type="text" size="10" />',
    '<Input @type="checkbox" @checked={{true}} />',
    '<Textarea @value="Tomster" />',
  ],

  bad: [
    {
      template: '<Input type="text" size="10" />',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 8,
              "endColumn": 19,
              "endLine": 1,
              "line": 1,
              "message": "Setting the \`type\` attribute on the builtin <Input> component is not allowed. Did you mean \`@type\`?",
              "nodeType": null,
              "ruleId": "ember-template-lint/builtin-component-arguments",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<Input @type="checkbox" checked />',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 25,
              "endColumn": 33,
              "endLine": 1,
              "line": 1,
              "message": "Setting the \`checked\` attribute on the builtin <Input> component is not allowed. Did you mean \`@checked\`?",
              "nodeType": null,
              "ruleId": "ember-template-lint/builtin-component-arguments",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<Textarea value="Tomster" />',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 11,
              "endColumn": 26,
              "endLine": 1,
              "line": 1,
              "message": "Setting the \`value\` attribute on the builtin <Textarea> component is not allowed. Did you mean \`@value\`?",
              "nodeType": null,
              "ruleId": "ember-template-lint/builtin-component-arguments",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
