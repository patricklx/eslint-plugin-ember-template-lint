import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "style-concatenation",

  config: true,

  good: [
    "<img>",
    "<img style={{myStyle}}>",
    "<img style={{background-image url}}>",
    '<img style="background-image: url(/foo.png)"}}>',
    '<img style={{html-safe (concat "background-image: url(" url ")")}}>',
    '<img style={{html-safe (concat knownSafeStyle1 ";" knownSafeStyle2)}}>',
  ],

  bad: [
    {
      template: '<img style="{{myStyle}}">',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 25,
              "endLine": 1,
              "line": 1,
              "message": "Concatenated styles must be marked as \`htmlSafe\`.",
              "nodeType": null,
              "ruleId": "ember-template-lint/style-concatenation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<img style="background-image: {{url}}">',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 39,
              "endLine": 1,
              "line": 1,
              "message": "Concatenated styles must be marked as \`htmlSafe\`.",
              "nodeType": null,
              "ruleId": "ember-template-lint/style-concatenation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<img style="{{background-image url}}">',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 38,
              "endLine": 1,
              "line": 1,
              "message": "Concatenated styles must be marked as \`htmlSafe\`.",
              "nodeType": null,
              "ruleId": "ember-template-lint/style-concatenation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<img style={{concat knownSafeStyle1 ";" knownSafeStyle2}}>',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 58,
              "endLine": 1,
              "line": 1,
              "message": "Concatenated styles must be marked as \`htmlSafe\`.",
              "nodeType": null,
              "ruleId": "ember-template-lint/style-concatenation",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
