import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "no-forbidden-elements",

  config: true,

  good: [
    "<header></header>",
    "<div></div>",
    "<footer></footer>",
    "<p></p>",
    '<head><meta charset="utf-8"></head>',
    {
      template: "<script></script>",
      config: ["html", "meta", "style"],
    },
    {
      template: "<meta>",
      meta: {
        filePath: "app/templates/head.hbs",
      },
    },
  ],
  bad: [
    {
      template: "<script></script>",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 18,
              "endLine": 1,
              "line": 1,
              "message": "Use of <script> detected. Do not use forbidden elements.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-forbidden-elements",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "<html></html>",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 14,
              "endLine": 1,
              "line": 1,
              "message": "Use of <html> detected. Do not use forbidden elements.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-forbidden-elements",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "<style></style>",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 16,
              "endLine": 1,
              "line": 1,
              "message": "Use of <style> detected. Do not use forbidden elements.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-forbidden-elements",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<meta charset="utf-8">',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 23,
              "endLine": 1,
              "line": 1,
              "message": "Use of <meta> detected. Do not use forbidden elements.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-forbidden-elements",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "<div></div>",
      config: {
        forbidden: ["div"],
      },
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 12,
              "endLine": 1,
              "line": 1,
              "message": "Use of <div> detected. Do not use forbidden elements.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-forbidden-elements",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "<div></div>",
      config: ["div"],
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 12,
              "endLine": 1,
              "line": 1,
              "message": "Use of <div> detected. Do not use forbidden elements.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-forbidden-elements",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "<Foo />",
      config: ["Foo"],
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 8,
              "endLine": 1,
              "line": 1,
              "message": "Use of <Foo> detected. Do not use forbidden elements.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-forbidden-elements",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "<script></script>",
      meta: {
        filePath: "app/templates/head.hbs",
      },
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 18,
              "endLine": 1,
              "line": 1,
              "message": "Use of <script> detected. Do not use forbidden elements.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-forbidden-elements",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "<html></html>",
      meta: {
        filePath: "app/templates/head.hbs",
      },
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 14,
              "endLine": 1,
              "line": 1,
              "message": "Use of <html> detected. Do not use forbidden elements.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-forbidden-elements",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "<head><html></html></head>",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 7,
              "endColumn": 20,
              "endLine": 1,
              "line": 1,
              "message": "Use of <html> detected. Do not use forbidden elements.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-forbidden-elements",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
