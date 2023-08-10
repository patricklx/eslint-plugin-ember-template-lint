import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "no-extra-mut-helper-argument",

  config: true,

  good: [
    "{{my-component click=(action (mut isClicked))}}",
    "{{my-component click=(action (mut isClicked) true)}}",
    "{{my-component isClickedMutable=(mut isClicked)}}",
    "<button {{action (mut isClicked)}}></button>",
    "<button {{action (mut isClicked) true}}></button>",
  ],

  bad: [
    {
      template: "{{my-component click=(action (mut isClicked true))}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 30,
              "endColumn": 50,
              "endLine": 1,
              "line": 1,
              "message": "The handlebars \`mut(attr)\` helper should only have one argument passed to it. To pass a value, use: \`(action (mut attr) value)\`.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-extra-mut-helper-argument",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "{{my-component isClickedMutable=(mut isClicked true)}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 33,
              "endColumn": 53,
              "endLine": 1,
              "line": 1,
              "message": "The handlebars \`mut(attr)\` helper should only have one argument passed to it. To pass a value, use: \`(action (mut attr) value)\`.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-extra-mut-helper-argument",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "<button {{action (mut isClicked true)}}></button>",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 18,
              "endColumn": 38,
              "endLine": 1,
              "line": 1,
              "message": "The handlebars \`mut(attr)\` helper should only have one argument passed to it. To pass a value, use: \`(action (mut attr) value)\`.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-extra-mut-helper-argument",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
