"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "no-invalid-aria-attributes",
  config: true,
  good: ['<h1 aria-hidden="true">Valid Heading</h1>', "<h1 aria-hidden={{true}}>Second valid Heading</h1>", '<input type="email" aria-required="true" />', '<input type="text" aria-labelledby="label1 label2" />', '<div role="checkbox" aria-checked="true" onclick="handleCheckbox()" tabindex="0"></div>', '<button aria-haspopup="true"></button>', '<button aria-haspopup="dialog"></button>', '<div role="slider" aria-valuenow="50" aria-valuemax="100" aria-valuemin="0" />', '<div role="heading" aria-level={{2}}></div>', '<input type="text" id="name" aria-invalid="grammar" />', '<div role="region" aria-live="polite" aria-relevant="additions text">Valid live region</div>', '<div aria-label="{{@foo.bar}} baz"></div>', '<CustomComponent @ariaRequired={{this.ariaRequired}} aria-errormessage="errorId" />', '<button type="submit" aria-disabled={{this.isDisabled}}>Submit</button>', '<div role="textbox" aria-sort={{if this.hasCustomSort "other" "ascending"}}></div>', '<div role="combobox" aria-expanded="undefined"></div>', '<button aria-label={{if @isNew (t "actions.add") (t "actions.edit")}}></button>'],
  bad: [{
    template: '<input aria-text="inaccessible text" />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 40,
              "endLine": 1,
              "line": 1,
              "message": "aria-text is an unrecognized ARIA attribute.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-aria-attributes",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<div role="slider" aria-valuenow={{this.foo}} aria-valuemax={{this.bar}} aria-value-min={{this.baz}} />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 104,
              "endLine": 1,
              "line": 1,
              "message": "aria-value-min is an unrecognized ARIA attribute.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-aria-attributes",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<h1 aria--hidden="true">Broken heading</h1>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 44,
              "endLine": 1,
              "line": 1,
              "message": "aria--hidden is an unrecognized ARIA attribute.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-aria-attributes",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<CustomComponent role="region" aria-alert="polite" />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 54,
              "endLine": 1,
              "line": 1,
              "message": "aria-alert is an unrecognized ARIA attribute.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-aria-attributes",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<span role="checkbox" aria-checked="bad-value" tabindex="0" aria-label="Forget me"></span>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 91,
              "endLine": 1,
              "line": 1,
              "message": "The value for aria-checked must be a boolean or the string "mixed".",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-aria-attributes",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<button type="submit" disabled="true" aria-disabled="123">Submit</button>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 74,
              "endLine": 1,
              "line": 1,
              "message": "The value for aria-disabled must be a boolean.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-aria-attributes",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<input type="text" disabled="true" aria-errormessage="false" />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 64,
              "endLine": 1,
              "line": 1,
              "message": "The value for aria-errormessage must be a string that represents a DOM element ID",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-aria-attributes",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<button type="submit" aria-describedby="blah false">Continue at your own risk</button>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 87,
              "endLine": 1,
              "line": 1,
              "message": "The value for aria-describedby must be a list of strings that represent DOM element IDs (idlist)",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-aria-attributes",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<div role="heading" aria-level="bogus">Inaccessible heading</div>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 66,
              "endLine": 1,
              "line": 1,
              "message": "The value for aria-level must be an integer.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-aria-attributes",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<div role="heading" aria-level="true">Another inaccessible heading</div>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 73,
              "endLine": 1,
              "line": 1,
              "message": "The value for aria-level must be an integer.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-aria-attributes",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<div role="slider" aria-valuenow=(2*2)  aria-valuemax="100" aria-valuemin="30">Broken slider</div>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 99,
              "endLine": 1,
              "line": 1,
              "message": "The value for aria-valuenow must be a number.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-aria-attributes",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<div role="region" aria-live="no-such-value">Inaccessible live region</div>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 76,
              "endLine": 1,
              "line": 1,
              "message": "The value for aria-live must be a single token from the following: assertive, off, polite.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-aria-attributes",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<div role="region" aria-live="polite" aria-relevant="additions errors">Inaccessible live region</div>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 102,
              "endLine": 1,
              "line": 1,
              "message": "The value for aria-relevant must be a list of one or more tokens from the following: additions, all, removals, text.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-aria-attributes",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<input type="text" aria-required="undefined" />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 48,
              "endLine": 1,
              "line": 1,
              "message": "The value for aria-required must be a boolean.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-aria-attributes",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});