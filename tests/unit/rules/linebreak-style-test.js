import os from "node:os";

import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "linebreak-style",

  config: true,

  good: [
    "testing this",
    "testing \n this",
    "testing \r\n this",
    {
      config: "system",
      template: os.EOL === "\n" ? "testing\nthis" : "testing\r\nthis",
    },
    {
      config: "windows",
      template: "testing\r\nthis",
    },
    {
      config: "unix",
      template: "testing\nthis",
    },
    {
      meta: {
        editorConfig: { end_of_line: "crlf" },
      },
      config: "unix",
      template: "testing\r\nthis",
    },
  ],

  bad: [
    {
      template: "something\ngoes\r\n",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Cannot set property config of #<BaseRule> which has only a getter
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs:1
          Rule: "ember-template-lint/linebreak-style"",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: "unix",
      template: "\r\n",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 1,
              "endLine": 2,
              "line": 1,
              "message": "Wrong linebreak used. Expected LF but found CRLF",
              "nodeType": null,
              "ruleId": "ember-template-lint/linebreak-style",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: "unix",
      template: "{{#if test}}\r\n{{/if}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 13,
              "endColumn": 1,
              "endLine": 2,
              "line": 1,
              "message": "Wrong linebreak used. Expected LF but found CRLF",
              "nodeType": null,
              "ruleId": "ember-template-lint/linebreak-style",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: "unix",
      template: "{{blah}}\r\n{{blah}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 9,
              "endColumn": 1,
              "endLine": 2,
              "line": 1,
              "message": "Wrong linebreak used. Expected LF but found CRLF",
              "nodeType": null,
              "ruleId": "ember-template-lint/linebreak-style",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: "unix",
      template: "{{blah}}\r\n",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 9,
              "endColumn": 1,
              "endLine": 2,
              "line": 1,
              "message": "Wrong linebreak used. Expected LF but found CRLF",
              "nodeType": null,
              "ruleId": "ember-template-lint/linebreak-style",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: "unix",
      template: '{{blah arg="\r\n"}}',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 13,
              "endColumn": 4,
              "endLine": 2,
              "line": 1,
              "message": "Wrong linebreak used. Expected LF but found CRLF",
              "nodeType": null,
              "ruleId": "ember-template-lint/linebreak-style",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: "unix",
      template: '<blah arg="\r\n" />',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 12,
              "endColumn": 2,
              "endLine": 2,
              "line": 1,
              "message": "Wrong linebreak used. Expected LF but found CRLF",
              "nodeType": null,
              "ruleId": "ember-template-lint/linebreak-style",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: "windows",
      template: "\n",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 1,
              "endLine": 2,
              "line": 1,
              "message": "Wrong linebreak used. Expected CRLF but found LF",
              "nodeType": null,
              "ruleId": "ember-template-lint/linebreak-style",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
