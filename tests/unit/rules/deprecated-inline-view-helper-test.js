"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "deprecated-inline-view-helper",
  config: true,
  good: ["{{great-fishsticks}}", '{{input placeholder=(t "email") value=email}}', '{{title "CrossCheck Web" prepend=true separator=" | "}}', "{{false}}", '{{"foo"}}', "{{42}}", "{{null}}", "{{undefined}}", '{{has-block "view"}}', '{{yield to="view"}}', '{{#if (has-block "view")}}{{yield to="view"}}{{/if}}', "{{this.view}}", "{{@view}}", "{{#let this.prop as |view|}} {{view}} {{/let}}"],
  bad: [{
    template: "{{view 'awful-fishsticks'}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 28,
              "endLine": 1,
              "line": 1,
              "message": "The inline form of \`view\` is deprecated. Please use the \`Ember.GlimmerComponent\` instead. See the deprecation guide at http://emberjs.com/deprecations/v1.x/#toc_ember-view",
              "nodeType": null,
              "ruleId": "ember-template-lint/deprecated-inline-view-helper",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{view.bad-fishsticks}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 24,
              "endLine": 1,
              "line": 1,
              "message": "The inline form of \`view\` is deprecated. Please use the \`Ember.GlimmerComponent\` instead. See the deprecation guide at http://emberjs.com/deprecations/v1.x/#toc_ember-view",
              "nodeType": null,
              "ruleId": "ember-template-lint/deprecated-inline-view-helper",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{view.terrible.fishsticks}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 29,
              "endLine": 1,
              "line": 1,
              "message": "The inline form of \`view\` is deprecated. Please use the \`Ember.GlimmerComponent\` instead. See the deprecation guide at http://emberjs.com/deprecations/v1.x/#toc_ember-view",
              "nodeType": null,
              "ruleId": "ember-template-lint/deprecated-inline-view-helper",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{foo-bar bab=good baz=view.qux.qaz boo=okay}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 20,
              "endColumn": 36,
              "endLine": 1,
              "line": 1,
              "message": "The inline form of \`view\` is deprecated. Please use the \`Ember.GlimmerComponent\` instead. See the deprecation guide at http://emberjs.com/deprecations/v1.x/#toc_ember-view",
              "nodeType": null,
              "ruleId": "ember-template-lint/deprecated-inline-view-helper",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<div class="whatever-class" data-foo={{view.hallo}} sure=thing></div>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 70,
              "endLine": 1,
              "line": 1,
              "message": "The inline form of \`view\` is deprecated. Please use the \`Ember.GlimmerComponent\` instead. See the deprecation guide at http://emberjs.com/deprecations/v1.x/#toc_ember-view",
              "nodeType": null,
              "ruleId": "ember-template-lint/deprecated-inline-view-helper",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{#foo-bar derp=view.whoops thing=whatever}}{{/foo-bar}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 12,
              "endColumn": 28,
              "endLine": 1,
              "line": 1,
              "message": "The inline form of \`view\` is deprecated. Please use the \`Ember.GlimmerComponent\` instead. See the deprecation guide at http://emberjs.com/deprecations/v1.x/#toc_ember-view",
              "nodeType": null,
              "ruleId": "ember-template-lint/deprecated-inline-view-helper",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});