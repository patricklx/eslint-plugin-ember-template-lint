"use strict";

var _ruleTestHarness = _interopRequireDefault(
  require("../../helpers/rule-test-harness.js")
);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
(0, _ruleTestHarness.default)({
  name: "quotes",
  good: [
    // string config
    {
      config: "double",
      template: '{{component "test"}}',
    },
    {
      config: "double",
      template: '{{hello x="test"}}',
    },
    {
      config: "double",
      template: '<input type="checkbox">',
    },
    {
      config: "single",
      template: "{{component 'test'}}",
    },
    {
      config: "single",
      template: "{{hello x='test'}}",
    },
    {
      config: "single",
      template: "<input type='checkbox'>",
    },
    // object config
    {
      config: {
        curlies: false,
        html: false,
      },
      template: `{{component "test"}} {{hello x='test'}} <input type='checkbox'> <input type="checkbox">`,
    },
    {
      config: {
        curlies: false,
        html: "single",
      },
      template: `{{component "test"}} {{hello x='test'}} <input type='checkbox'>`,
    },
    {
      config: {
        curlies: "double",
        html: false,
      },
      template: `{{component "test"}} <input type='checkbox'> <input type="checkbox">`,
    },
    {
      config: {
        curlies: "single",
        html: "double",
      },
      template: `<input type="checkbox"> {{hello 'test' x='test'}}`,
    },
    {
      config: {
        curlies: "double",
        html: "single",
      },
      template: `<input type='checkbox'> {{hello "test" x="test"}}`,
    },
  ],
  bad: [
    {
      config: "double",
      template: "{{component 'one {{thing}} two'}}",
      fixedTemplate: '{{component "one {{thing}} two"}}',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 13,
              "endColumn": 32,
              "endLine": 1,
              "fix": {
                "range": [
                  12,
                  31,
                ],
                "text": ""one {{thing}} two"",
              },
              "line": 1,
              "message": "you must use doublequote in templates",
              "messageId": "both",
              "nodeType": "GlimmerStringLiteral",
              "ruleId": "ember-template-lint/quotes",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: "double",
      template: "{{component 'test'}}",
      fixedTemplate: '{{component "test"}}',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 13,
              "endColumn": 19,
              "endLine": 1,
              "fix": {
                "range": [
                  12,
                  18,
                ],
                "text": ""test"",
              },
              "line": 1,
              "message": "you must use doublequote in templates",
              "messageId": "both",
              "nodeType": "GlimmerStringLiteral",
              "ruleId": "ember-template-lint/quotes",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: "double",
      template: "{{hello x='test'}}",
      fixedTemplate: '{{hello x="test"}}',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 11,
              "endColumn": 17,
              "endLine": 1,
              "fix": {
                "range": [
                  10,
                  16,
                ],
                "text": ""test"",
              },
              "line": 1,
              "message": "you must use doublequote in templates",
              "messageId": "both",
              "nodeType": "GlimmerStringLiteral",
              "ruleId": "ember-template-lint/quotes",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: "double",
      template: "<input type='checkbox'>",
      fixedTemplate: '<input type="checkbox">',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 13,
              "endColumn": 23,
              "endLine": 1,
              "fix": {
                "range": [
                  12,
                  22,
                ],
                "text": ""checkbox"",
              },
              "line": 1,
              "message": "you must use doublequote in templates",
              "messageId": "both",
              "nodeType": "GlimmerTextNode",
              "ruleId": "ember-template-lint/quotes",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: "single",
      template: '{{component "test"}}',
      fixedTemplate: "{{component 'test'}}",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 13,
              "endColumn": 19,
              "endLine": 1,
              "fix": {
                "range": [
                  12,
                  18,
                ],
                "text": "'test'",
              },
              "line": 1,
              "message": "you must use singlequote in templates",
              "messageId": "both",
              "nodeType": "GlimmerStringLiteral",
              "ruleId": "ember-template-lint/quotes",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: "single",
      template: '{{hello x="test"}}',
      fixedTemplate: "{{hello x='test'}}",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 11,
              "endColumn": 17,
              "endLine": 1,
              "fix": {
                "range": [
                  10,
                  16,
                ],
                "text": "'test'",
              },
              "line": 1,
              "message": "you must use singlequote in templates",
              "messageId": "both",
              "nodeType": "GlimmerStringLiteral",
              "ruleId": "ember-template-lint/quotes",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: "single",
      template: '<input type="checkbox">',
      fixedTemplate: "<input type='checkbox'>",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 13,
              "endColumn": 23,
              "endLine": 1,
              "fix": {
                "range": [
                  12,
                  22,
                ],
                "text": "'checkbox'",
              },
              "line": 1,
              "message": "you must use singlequote in templates",
              "messageId": "both",
              "nodeType": "GlimmerTextNode",
              "ruleId": "ember-template-lint/quotes",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: "single",
      template: `<img alt="Abdul's house">`,
      fixedTemplate: `<img alt='Abdul\\'s house'>`,
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 10,
              "endColumn": 25,
              "endLine": 1,
              "fix": {
                "range": [
                  9,
                  24,
                ],
                "text": "'Abdul\\'s house'",
              },
              "line": 1,
              "message": "you must use singlequote in templates",
              "messageId": "both",
              "nodeType": "GlimmerTextNode",
              "ruleId": "ember-template-lint/quotes",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: "double",
      template: `<img class='a "so-called" btn {{this.otherClass}}'>`,
      fixedTemplate: `<img class="a \\"so-called\\" btn {{this.otherClass}}">`,
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 12,
              "endColumn": 51,
              "endLine": 1,
              "fix": {
                "range": [
                  11,
                  50,
                ],
                "text": ""a \\"so-called\\" btn {{this.otherClass}}"",
              },
              "line": 1,
              "message": "you must use doublequote in templates",
              "messageId": "both",
              "nodeType": "GlimmerConcatStatement",
              "ruleId": "ember-template-lint/quotes",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: "single",
      template: `{{helper "Priya's house"}}`,
      fixedTemplate: `{{helper 'Priya\\'s house'}}`,
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 10,
              "endColumn": 25,
              "endLine": 1,
              "fix": {
                "range": [
                  9,
                  24,
                ],
                "text": "'Priya\\'s house'",
              },
              "line": 1,
              "message": "you must use singlequote in templates",
              "messageId": "both",
              "nodeType": "GlimmerStringLiteral",
              "ruleId": "ember-template-lint/quotes",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: {
        curlies: "double",
        html: "single",
      },
      template: `<input type="checkbox"> {{hello 'test' x='test'}}`,
      fixedTemplate: `<input type='checkbox'> {{hello "test" x="test"}}`,
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 13,
              "endColumn": 23,
              "endLine": 1,
              "fix": {
                "range": [
                  12,
                  22,
                ],
                "text": "'checkbox'",
              },
              "line": 1,
              "message": "you must use singlequote in HTML attributes",
              "messageId": "html",
              "nodeType": "GlimmerTextNode",
              "ruleId": "ember-template-lint/quotes",
              "severity": 2,
            },
            {
              "column": 33,
              "endColumn": 39,
              "endLine": 1,
              "fix": {
                "range": [
                  32,
                  38,
                ],
                "text": ""test"",
              },
              "line": 1,
              "message": "you must use doublequote in Handlebars syntax",
              "messageId": "curlies",
              "nodeType": "GlimmerStringLiteral",
              "ruleId": "ember-template-lint/quotes",
              "severity": 2,
            },
            {
              "column": 42,
              "endColumn": 48,
              "endLine": 1,
              "fix": {
                "range": [
                  41,
                  47,
                ],
                "text": ""test"",
              },
              "line": 1,
              "message": "you must use doublequote in Handlebars syntax",
              "messageId": "curlies",
              "nodeType": "GlimmerStringLiteral",
              "ruleId": "ember-template-lint/quotes",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: {
        curlies: "single",
        html: "double",
      },
      template: `<input type='checkbox'> {{hello "test" x="test"}}`,
      fixedTemplate: `<input type="checkbox"> {{hello 'test' x='test'}}`,
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 13,
              "endColumn": 23,
              "endLine": 1,
              "fix": {
                "range": [
                  12,
                  22,
                ],
                "text": ""checkbox"",
              },
              "line": 1,
              "message": "you must use doublequote in HTML attributes",
              "messageId": "html",
              "nodeType": "GlimmerTextNode",
              "ruleId": "ember-template-lint/quotes",
              "severity": 2,
            },
            {
              "column": 33,
              "endColumn": 39,
              "endLine": 1,
              "fix": {
                "range": [
                  32,
                  38,
                ],
                "text": "'test'",
              },
              "line": 1,
              "message": "you must use singlequote in Handlebars syntax",
              "messageId": "curlies",
              "nodeType": "GlimmerStringLiteral",
              "ruleId": "ember-template-lint/quotes",
              "severity": 2,
            },
            {
              "column": 42,
              "endColumn": 48,
              "endLine": 1,
              "fix": {
                "range": [
                  41,
                  47,
                ],
                "text": "'test'",
              },
              "line": 1,
              "message": "you must use singlequote in Handlebars syntax",
              "messageId": "curlies",
              "nodeType": "GlimmerStringLiteral",
              "ruleId": "ember-template-lint/quotes",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
  error: [
    {
      config: "sometimes",
      template: "test",
      result: {
        fatal: true,
        message: 'You specified `"sometimes"`',
      },
    },
    {
      config: true,
      template: "test",
      result: {
        fatal: true,
        message: "You specified `true`",
      },
    },
    {
      config: {
        curlies: "double",
        html: "sometimes",
      },
      template: "test",
      result: {
        fatal: true,
        message: 'You specified `{"curlies":"double","html":"sometimes"}`',
      },
    },
    {
      config: {
        curlies: "double",
      },
      template: "test",
      result: {
        fatal: true,
        message: 'You specified `{"curlies":"double"}`',
      },
    },
    {
      config: {
        html: "sometimes",
      },
      template: "test",
      result: {
        fatal: true,
        message: 'You specified `{"html":"sometimes"}`',
      },
    },
    {
      config: {
        curlies: "double",
        html: "single",
        other: "foobar",
      },
      template: "test",
      result: {
        fatal: true,
        message:
          'You specified `{"curlies":"double","html":"single","other":"foobar"}`',
      },
    },
  ],
});

describe("", () => {});
