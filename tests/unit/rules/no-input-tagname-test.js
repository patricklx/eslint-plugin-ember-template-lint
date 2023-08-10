import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "no-input-tagname",

  config: true,

  good: [
    '{{input type="text"}}',
    '{{component "input" type="text"}}',
    '{{yield (component "input" type="text")}}',
  ],

  bad: [
    {
      template: '{{input tagName="foo"}}',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 24,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected \`tagName\` usage on {{input}} helper.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-input-tagname",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "{{input tagName=bar}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 22,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected \`tagName\` usage on {{input}} helper.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-input-tagname",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '{{component "input" tagName="foo"}}',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 36,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected \`tagName\` usage on {{input}} helper.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-input-tagname",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '{{component "input" tagName=bar}}',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 34,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected \`tagName\` usage on {{input}} helper.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-input-tagname",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '{{yield (component "input" tagName="foo")}}',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 9,
              "endColumn": 42,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected \`tagName\` usage on {{input}} helper.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-input-tagname",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '{{yield (component "input" tagName=bar)}}',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 9,
              "endColumn": 40,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected \`tagName\` usage on {{input}} helper.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-input-tagname",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
