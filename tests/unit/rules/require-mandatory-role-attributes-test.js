"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "require-mandatory-role-attributes",
  config: true,
  good: ["<div />", '<div aria-disabled="true" />', '<div role="complementary" />', '<div role="combobox" aria-expanded="false" aria-controls="ctrlId" />', '<div role="option" aria-selected={{false}} />', "<FakeComponent />", '<FakeComponent role="fakerole" />', '<CustomComponent role="checkbox" aria-checked="false" />', '<SomeComponent role={{this.role}} aria-notreal="bar" />', "<OtherComponent @role={{@role}} aria-required={{this.required}} />", '<FakeElement aria-disabled="true" />', "{{some-component}}", '{{some-component foo="true"}}', '{{some-component role="heading" aria-level="2"}}', '{{foo-component role="button"}}', '{{foo-component role="unknown"}}', "{{foo-component role=role}}"],
  bad: [{
    template: '<div role="combobox" aria-controls="someId" />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 47,
              "endLine": 1,
              "line": 1,
              "message": "The attributes aria-controls, aria-expanded are required by the role combobox",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-mandatory-role-attributes",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<div role="option"  />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 23,
              "endLine": 1,
              "line": 1,
              "message": "The attribute aria-selected is required by the role option",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-mandatory-role-attributes",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<CustomComponent role="checkbox" aria-required="true" />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 57,
              "endLine": 1,
              "line": 1,
              "message": "The attribute aria-checked is required by the role checkbox",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-mandatory-role-attributes",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<SomeComponent role="scrollbar" @aria-now={{this.valuenow}} aria-controls={{some-id}} />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 89,
              "endLine": 1,
              "line": 1,
              "message": "The attributes aria-controls, aria-valuenow are required by the role scrollbar",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-mandatory-role-attributes",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{some-component role="heading"}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 34,
              "endLine": 1,
              "line": 1,
              "message": "The attribute aria-level is required by the role heading",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-mandatory-role-attributes",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});