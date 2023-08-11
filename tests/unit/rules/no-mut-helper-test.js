"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const setterAlternative = "`{{set}}`";
(0, _ruleTestHarness.default)({
  name: "no-mut-helper",
  config: true,
  good: ["<MyComponent @toggled={{this.showAggregatedLine}}/>", '<MyComponent @toggle={{set this "isDropdownOpen"}}/>', '<MyComponent @onFocusOut={{action "onFocusOutKeySkillsInput" value="target.value"}}/>', '<MyComponent {{on "click" (set this "isDropdownOpen" false)}}/>', '<MyComponent {{on "change" this.setContactUsSectionDescription}}/>', '<MyComponent {{on "change" (fn this.setContactUsSectionDescription true)}}/>', '<MyComponent {{on "change" (action "setContactUsSectionDescription")}}/>', '<MyComponent {{on "change" (action "setContactUsSectionDescription" true)}}/>', '<MyComponent {{action "setIsDropdownOpen" false}}/>', '<MyComponent @dismissModal={{set this "isRequestExpiredModalOpen" false}}/>', "<MyComponent onclick={{set this “expandVoluntarySelfIdHelpText” true}}/>", '<MyComponent @click={{set this "isCardCollapsed" (if this.isCardCollapsed false true)}}/>', '{{my-component click=(set this "isOpen" false)}}', '{{my-component click=(set this "isLegalTextExpanded" (not this.isLegalTextExpanded))}}', "{{my-component onVisibilityChange=(set this “isDropdownOpen”)}}", "{{my-component click=(set this “expandVoluntarySelfIdHelpText” true)}}", "{{my-component value=this.secondaryProfileHeadline}}", '<div {{mutate this.isDropdownOpen}} class="muted mut">Non-helper substrings with mut in them should not violate this rule.</div>'],
  bad: [{
    template: "<MyComponent @toggled={{mut this.showAggregatedLine}}/>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 23,
              "endColumn": 54,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected usage of mut helper. If using mut as a setter, consider using a JS action instead.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-mut-helper",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{my-component value=(mut this.secondaryProfileHeadline)}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 22,
              "endColumn": 57,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected usage of mut helper. If using mut as a setter, consider using a JS action instead.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-mut-helper",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<MyComponent {{action (mut this.isDropdownOpen) false}}/>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 23,
              "endColumn": 48,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected usage of mut helper. If using mut as a setter, consider using a JS action instead.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-mut-helper",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<MyComponent @dismissModal={{action (mut this.isRequestExpiredModalOpen) false}}/>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 37,
              "endColumn": 73,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected usage of mut helper. If using mut as a setter, consider using a JS action instead.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-mut-helper",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<MyComponent @click={{action (mut this.isCardCollapsed) (if this.isCardCollapsed false true)}}/>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 30,
              "endColumn": 56,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected usage of mut helper. If using mut as a setter, consider using a JS action instead.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-mut-helper",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<MyComponent onclick={{fn (mut this.expandVoluntarySelfIdHelpText) true}}/>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 27,
              "endColumn": 67,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected usage of mut helper. If using mut as a setter, consider using a JS action instead.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-mut-helper",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<MyComponent @onVisibilityChange={{fn (mut this.isDropdownOpen)}}/>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 39,
              "endColumn": 64,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected usage of mut helper. If using mut as a setter, consider using a JS action instead.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-mut-helper",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{my-component click=(action (mut this.isOpen) false)}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 30,
              "endColumn": 47,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected usage of mut helper. If using mut as a setter, consider using a JS action instead.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-mut-helper",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{my-component click=(action (mut this.isLegalTextExpanded) (not this.isLegalTextExpanded))}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 30,
              "endColumn": 60,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected usage of mut helper. If using mut as a setter, consider using a JS action instead.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-mut-helper",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{my-component onVisibilityChange=(action (mut this.isDropdownOpen))}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 43,
              "endColumn": 68,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected usage of mut helper. If using mut as a setter, consider using a JS action instead.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-mut-helper",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{my-component click=(fn (mut this.showManageEventsModal) true)}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 26,
              "endColumn": 58,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected usage of mut helper. If using mut as a setter, consider using a JS action instead.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-mut-helper",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: `<MyComponent
          @onVisibilityChange={{action
            (mut this.isDemographicsDropdownOpen)
          }}
        />`,
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 13,
              "endColumn": 50,
              "endLine": 3,
              "line": 3,
              "message": "Unexpected usage of mut helper. If using mut as a setter, consider using a JS action instead.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-mut-helper",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: `<MyComponent
          @dismissModal={{action
            (mut this.isNotificationsPostApprovalModalOpen)
            false
          }}
        />`,
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 13,
              "endColumn": 60,
              "endLine": 3,
              "line": 3,
              "message": "Unexpected usage of mut helper. If using mut as a setter, consider using a JS action instead.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-mut-helper",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<MyComponent onchange={{action (mut this.contactUsSection.description) value="target.value"}}/>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 32,
              "endColumn": 71,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected usage of mut helper. If using mut as a setter, consider using a JS action instead.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-mut-helper",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    config: {
      setterAlternative
    },
    template: '<MyComponent onchange={{action (mut this.contactUsSection.description) value="target.value"}}/>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 32,
              "endColumn": 71,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected usage of mut helper. If using mut as a setter, consider using a JS action or \`{{set}}\` instead.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-mut-helper",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});