import { ERROR_MESSAGE_RESERVED } from "../../../lib/rules/no-capital-arguments.js";
import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "no-capital-arguments",

  config: true,

  good: ['<Foo @name="bar" />', "@foo"],

  bad: [
    {
      template: '<Foo @Name="bar" />',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 17,
              "endLine": 1,
              "line": 1,
              "message": "Capital argument names is not supported",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-capital-arguments",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<Foo @_ame="bar" />',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 17,
              "endLine": 1,
              "line": 1,
              "message": "Capital argument names is not supported",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-capital-arguments",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "{{@Name}}",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 4,
              "endColumn": 8,
              "endLine": 1,
              "line": 1,
              "message": "Capital argument names is not supported",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-capital-arguments",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "{{@_Name}}",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 4,
              "endColumn": 9,
              "endLine": 1,
              "line": 1,
              "message": "Capital argument names is not supported",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-capital-arguments",
              "severity": 2,
            },
          ]
        `);
      },
    },

    ...["@arguments", "@args", "@block", "@else"].map((el) => {
      return {
        template: `{{${el}}}`,
        result: {
          message: ERROR_MESSAGE_RESERVED(el),
          line: 1,
          column: 3,
          endColumn: el.length + 2,
          endLine: 1,
          source: el.slice(1),
        },
      };
    }),

    ...["@arguments", "@args", "@block", "@else"].map((el) => {
      return {
        template: `<MyComponent ${el}={{42}} />`,
        result: {
          message: ERROR_MESSAGE_RESERVED(el),
          line: 1,
          column: 13,
          endColumn: el.length + 20,
          endLine: 1,
          source: el.slice(1),
        },
      };
    }),
  ],
});
