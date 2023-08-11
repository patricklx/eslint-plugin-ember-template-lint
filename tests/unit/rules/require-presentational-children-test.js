"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "require-presentational-children",
  config: true,
  good: ["<button></button>", "<div></div>", '<li role="tab">Tab title</li>', '<li role="tab"><h3 role="presentation">Tab Title</h3></li>', '<div role="button"><div><span></span></div></div>', '<span role="checkbox"/>', '<div role="article"><h2>Hello</h2></div>', `
    <ul role="tablist">
      <li role="presentation">
        <a role="tab" href="#">Tab 1</a>
      </li>
    </ul>
    `, `
    <svg role="img">
      <title>Title here</title>
      <circle cx="10" cy="10" r="10"></circle>
    </svg>`, {
    config: {
      additionalNonSemanticTags: ["custom-element"]
    },
    template: `<button><div>item1</div><custom-element>item2</custom-element></button>`
  }],
  bad: [{
    template: '<div role="button"><h2>Test</h2></div>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 20,
              "endColumn": 33,
              "endLine": 1,
              "line": 1,
              "message": "<div> has a role of button, it cannot have semantic descendants like <h2>",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-presentational-children",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<div role="button"><h2 role="presentation"><img /></h2></div>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 44,
              "endColumn": 51,
              "endLine": 1,
              "line": 1,
              "message": "<div> has a role of button, it cannot have semantic descendants like <img>",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-presentational-children",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<div role="button"><h2 role="presentation"><button>Test <img/></button></h2></div>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 44,
              "endColumn": 72,
              "endLine": 1,
              "line": 1,
              "message": "<div> has a role of button, it cannot have semantic descendants like <button>",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-presentational-children",
              "severity": 2,
            },
            {
              "column": 57,
              "endColumn": 63,
              "endLine": 1,
              "line": 1,
              "message": "<div> has a role of button, it cannot have semantic descendants like <img>",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-presentational-children",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});