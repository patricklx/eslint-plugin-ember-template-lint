import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "no-class-bindings",

  config: true,

  good: ["<SomeThing />", "{{lol-wat}}", "{{true}}", '{{"hehe"}}'],

  bad: [
    {
      template: '{{some-thing classBinding="lol:wat"}}',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 14,
              "endColumn": 36,
              "endLine": 1,
              "line": 1,
              "message": "Passing the \`classBinding\` property as an argument within templates is not allowed.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-class-bindings",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<SomeThing @classBinding="lol:wat" />',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 12,
              "endColumn": 35,
              "endLine": 1,
              "line": 1,
              "message": "Passing the \`@classBinding\` property as an argument within templates is not allowed.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-class-bindings",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '{{some-thing classNameBindings="lol:foo:bar"}}',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 14,
              "endColumn": 45,
              "endLine": 1,
              "line": 1,
              "message": "Passing the \`classNameBindings\` property as an argument within templates is not allowed.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-class-bindings",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<SomeThing @classNameBindings="lol:foo:bar" />',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 12,
              "endColumn": 44,
              "endLine": 1,
              "line": 1,
              "message": "Passing the \`@classNameBindings\` property as an argument within templates is not allowed.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-class-bindings",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
