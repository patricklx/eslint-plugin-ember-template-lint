"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "require-input-label",
  config: true,
  good: ["<label>LabelText<input /></label>", '<label>LabelText<input id="foo" /></label>', "<label><input />LabelText</label>", "<label>LabelText<Input /></label>", "<label><Input />LabelText</label>", "<label>Label Text<div><input /></div></label>",
  // technically okay, hopefully no one does this though
  '<input id="probablyHasLabel" />',
  // it's likely to have an associated label if it has an id attribute
  "<input aria-label={{labelText}} />", '<input aria-labelledby="someIdValue" />', "<div></div>", "<input ...attributes/>",
  // we are unable to correctly determine if this has a label or not, so we have to allow it
  "<Input ...attributes />", '<Input id="foo" />', '<label>text<Input id="foo" /></label>', '{{input id="foo"}}', '<label>text{{input id="foo"}}</label>', "<label>Text here<Input /></label>", "<label>Text here {{input}}</label>", '<input id="label-input" ...attributes>',
  // Same logic applies to textareas
  "<label>LabelText<textarea /></label>", "<label><textarea />LabelText</label>", "<label>LabelText<Textarea /></label>", "<label><Textarea />LabelText</label>", "<label>Label Text<div><textarea /></div></label>",
  // technically okay, hopefully no one does this though
  '<textarea id="probablyHasLabel" />',
  // it's likely to have an associated label if it has an id attribute
  "<textarea aria-label={{labelText}} />", '<textarea aria-labelledby="someIdValue" />', "<textarea ...attributes/>",
  // we are unable to correctly determine if this has a label or not, so we have to allow it
  "<Textarea ...attributes />", '<Textarea id="foo" />', '{{textarea id="foo"}}', "<label>Text here<Textarea /></label>", "<label>Text here {{textarea}}</label>", '<textarea id="label-input" ...attributes />',
  // Same logic applies to select menus
  "<label>LabelText<select></select></label>", "<label><select></select>LabelText</label>", "<label>Label Text<div><select></select></div></label>",
  // technically okay, hopefully no one does this though
  '<select id="probablyHasLabel" ></select>',
  // it's likely to have an associated label if it has an id attribute
  "<select aria-label={{labelText}} ></select>", '<select aria-labelledby="someIdValue" ></select>', "<select ...attributes></select>",
  // we are unable to correctly determine if this has a label or not, so we have to allow it
  '<select id="label-input" ...attributes ></select>',
  // Hidden inputs are allowed.
  '<input type="hidden"/>', '<Input type="hidden" />', '{{input type="hidden"}}', {
    config: {
      labelTags: ["CustomLabel"]
    },
    template: "<CustomLabel><input /></CustomLabel>"
  }, {
    config: {
      labelTags: [/web-label/]
    },
    template: "<web-label><input /></web-label>"
  }],
  bad: [{
    config: {
      labelTags: [/web-label/]
    },
    template: "<my-label><input /></my-label>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 11,
              "endColumn": 20,
              "endLine": 1,
              "line": 1,
              "message": "form elements require a valid associated label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<div><input /></div>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 15,
              "endLine": 1,
              "line": 1,
              "message": "form elements require a valid associated label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<input />",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 10,
              "endLine": 1,
              "line": 1,
              "message": "form elements require a valid associated label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<input title="some title value" />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 35,
              "endLine": 1,
              "line": 1,
              "message": "form elements require a valid associated label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<label><input></label>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 8,
              "endColumn": 15,
              "endLine": 1,
              "line": 1,
              "message": "form elements require a valid associated label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<div>{{input}}</div>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 15,
              "endLine": 1,
              "line": 1,
              "message": "form elements require a valid associated label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<Input/>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 9,
              "endLine": 1,
              "line": 1,
              "message": "form elements require a valid associated label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<input aria-label="first label" aria-labelledby="second label">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 64,
              "endLine": 1,
              "line": 1,
              "message": "form elements should not have multiple labels.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<input id="label-input" aria-label="second label">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 51,
              "endLine": 1,
              "line": 1,
              "message": "form elements should not have multiple labels.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<label>Input label<input aria-label="Custom label"></label>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 19,
              "endColumn": 52,
              "endLine": 1,
              "line": 1,
              "message": "form elements should not have multiple labels.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{input type="button"}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 24,
              "endLine": 1,
              "line": 1,
              "message": "form elements require a valid associated label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{input type=myType}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 22,
              "endLine": 1,
              "line": 1,
              "message": "form elements require a valid associated label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<input type="button"/>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 23,
              "endLine": 1,
              "line": 1,
              "message": "form elements require a valid associated label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<input type={{myType}}/>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 25,
              "endLine": 1,
              "line": 1,
              "message": "form elements require a valid associated label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<Input type="button"/>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 23,
              "endLine": 1,
              "line": 1,
              "message": "form elements require a valid associated label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<Input type={{myType}}/>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 25,
              "endLine": 1,
              "line": 1,
              "message": "form elements require a valid associated label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<div><textarea /></div>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 18,
              "endLine": 1,
              "line": 1,
              "message": "form elements require a valid associated label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<textarea />",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 13,
              "endLine": 1,
              "line": 1,
              "message": "form elements require a valid associated label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<textarea title="some title value" />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 38,
              "endLine": 1,
              "line": 1,
              "message": "form elements require a valid associated label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<label><textarea /></label>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 8,
              "endColumn": 20,
              "endLine": 1,
              "line": 1,
              "message": "form elements require a valid associated label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<div>{{textarea}}</div>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 18,
              "endLine": 1,
              "line": 1,
              "message": "form elements require a valid associated label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<Textarea />",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 13,
              "endLine": 1,
              "line": 1,
              "message": "form elements require a valid associated label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<textarea aria-label="first label" aria-labelledby="second label" />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 69,
              "endLine": 1,
              "line": 1,
              "message": "form elements should not have multiple labels.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<textarea id="label-input" aria-label="second label" />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 56,
              "endLine": 1,
              "line": 1,
              "message": "form elements should not have multiple labels.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<label>Textarea label<textarea aria-label="Custom label" /></label>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 22,
              "endColumn": 60,
              "endLine": 1,
              "line": 1,
              "message": "form elements should not have multiple labels.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<div><select></select></div>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 23,
              "endLine": 1,
              "line": 1,
              "message": "form elements require a valid associated label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<select></select>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 18,
              "endLine": 1,
              "line": 1,
              "message": "form elements require a valid associated label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<select title="some title value" />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 36,
              "endLine": 1,
              "line": 1,
              "message": "form elements require a valid associated label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<label><select></select></label>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 8,
              "endColumn": 25,
              "endLine": 1,
              "line": 1,
              "message": "form elements require a valid associated label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<select aria-label="first label" aria-labelledby="second label" />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 67,
              "endLine": 1,
              "line": 1,
              "message": "form elements should not have multiple labels.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<select id="label-input" aria-label="second label" />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 54,
              "endLine": 1,
              "line": 1,
              "message": "form elements should not have multiple labels.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<label>Select label<select aria-label="Custom label" /></label>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 20,
              "endColumn": 56,
              "endLine": 1,
              "line": 1,
              "message": "form elements should not have multiple labels.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-input-label",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});