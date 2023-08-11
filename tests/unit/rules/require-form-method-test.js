"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "require-form-method",
  config: true,
  good: [{
    config: {
      allowedMethods: ["get"]
    },
    template: '<form method="GET"></form>'
  }, '<form method="POST"></form>', '<form method="post"></form>', '<form method="GET"></form>', '<form method="get"></form>', '<form method="DIALOG"></form>', '<form method="dialog"></form>',
  // dynamic values
  '<form method="{{formMethod}}"></form>', "<form method={{formMethod}}></form>", "<div/>", "<div></div>", '<div method="randomType"></div>'],
  bad: [{
    config: {
      allowedMethods: ["get"]
    },
    template: '<form method="POST"></form>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 28,
              "endLine": 1,
              "line": 1,
              "message": "All \`<form>\` elements should have \`method\` attribute with value of \`GET\`",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-form-method",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    config: {
      allowedMethods: ["POST"]
    },
    template: '<form method="GET"></form>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 27,
              "endLine": 1,
              "line": 1,
              "message": "All \`<form>\` elements should have \`method\` attribute with value of \`POST\`",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-form-method",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<form></form>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 14,
              "endLine": 1,
              "line": 1,
              "message": "All \`<form>\` elements should have \`method\` attribute with value of \`POST,GET,DIALOG\`",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-form-method",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<form method=""></form>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 24,
              "endLine": 1,
              "line": 1,
              "message": "All \`<form>\` elements should have \`method\` attribute with value of \`POST,GET,DIALOG\`",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-form-method",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<form method=42></form>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 24,
              "endLine": 1,
              "line": 1,
              "message": "All \`<form>\` elements should have \`method\` attribute with value of \`POST,GET,DIALOG\`",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-form-method",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<form method=" ge t "></form>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 30,
              "endLine": 1,
              "line": 1,
              "message": "All \`<form>\` elements should have \`method\` attribute with value of \`POST,GET,DIALOG\`",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-form-method",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<form method=" pos t "></form>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 31,
              "endLine": 1,
              "line": 1,
              "message": "All \`<form>\` elements should have \`method\` attribute with value of \`POST,GET,DIALOG\`",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-form-method",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});