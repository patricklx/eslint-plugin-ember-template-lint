import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "no-nested-landmark",

  config: true,

  good: [
    "<div><main></main></div>",
    '<div role="application"><div role="document"><div role="application"></div></div></div>',
    "<header><nav></nav></header>", // nested landmarks of different types are okay
    '<div role="banner"><nav></nav></div>',
    '<header><div role="navigation"></div></header>',
    '<div role="banner"><div role="navigation"></div></div>',
  ],

  bad: [
    {
      template: "<main><main></main></main>",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 7,
              "endColumn": 20,
              "endLine": 1,
              "line": 1,
              "message": "Nested landmark elements on <main> detected. Landmark elements should not be nested within landmark elements of the same name.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-landmark",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "<main><div><main></main></div></main>",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 12,
              "endColumn": 25,
              "endLine": 1,
              "line": 1,
              "message": "Nested landmark elements on <main> detected. Landmark elements should not be nested within landmark elements of the same name.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-landmark",
              "severity": 2,
            },
          ]
        `);
      },
    },

    {
      template: '<div role="main"><main></main></div>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 18,
              "endColumn": 31,
              "endLine": 1,
              "line": 1,
              "message": "Nested landmark elements on <main> detected. Landmark elements should not be nested within landmark elements of the same name.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-landmark",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<div role="main"><div><main></main></div></div>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 23,
              "endColumn": 36,
              "endLine": 1,
              "line": 1,
              "message": "Nested landmark elements on <main> detected. Landmark elements should not be nested within landmark elements of the same name.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-landmark",
              "severity": 2,
            },
          ]
        `);
      },
    },

    {
      template: '<main><div role="main"></div></main>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 7,
              "endColumn": 30,
              "endLine": 1,
              "line": 1,
              "message": "Nested landmark elements on <div> detected. Landmark elements should not be nested within landmark elements of the same name.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-landmark",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<main><div><div role="main"></div></div></main>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 12,
              "endColumn": 35,
              "endLine": 1,
              "line": 1,
              "message": "Nested landmark elements on <div> detected. Landmark elements should not be nested within landmark elements of the same name.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-landmark",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "<nav><nav></nav></nav>",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 17,
              "endLine": 1,
              "line": 1,
              "message": "Nested landmark elements on <nav> detected. Landmark elements should not be nested within landmark elements of the same name.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-landmark",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "<header><header></header></header>",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 9,
              "endColumn": 26,
              "endLine": 1,
              "line": 1,
              "message": "Nested landmark elements on <header> detected. Landmark elements should not be nested within landmark elements of the same name.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-landmark",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<header><div role="banner"></div></header>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 9,
              "endColumn": 34,
              "endLine": 1,
              "line": 1,
              "message": "Nested landmark elements on <div> detected. Landmark elements should not be nested within landmark elements of the same name.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-landmark",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<div role="contentinfo"><footer></footer></div>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 25,
              "endColumn": 42,
              "endLine": 1,
              "line": 1,
              "message": "Nested landmark elements on <footer> detected. Landmark elements should not be nested within landmark elements of the same name.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-landmark",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
