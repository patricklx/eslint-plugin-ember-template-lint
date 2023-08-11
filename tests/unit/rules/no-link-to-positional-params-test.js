"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "no-link-to-positional-params",
  config: true,
  good: ['{{#link-to route="about"}}About Us{{/link-to}}', '{{#link-to route="post" model=@post}}Read {{@post.title}}...{{/link-to}}', `{{#link-to route="post.comment" models=(array post comment)}}
        Comment by {{comment.author.name}} on {{comment.date}}
      {{/link-to}}`, `{{#link-to route="posts" query=(hash direction="desc" showArchived=false)}}
        Recent Posts
      {{/link-to}}`, '<LinkTo @route="about">About Us</LinkTo>', '<LinkTo @route="post" @model={{@post}}>Read {{@post.title}}...</LinkTo>', `<LinkTo @route="post.comment" @models={{array post comment}}>
        Comment by {{comment.author.name}} on {{comment.date}}
      </LinkTo>`, `<LinkTo @route="posts" @query={{hash direction="desc" showArchived=false}}>
        Recent Posts
      </LinkTo>`],
  bad: [{
    template: '{{link-to "About Us" "about"}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 31,
              "endLine": 1,
              "line": 1,
              "message": "Invoking the \`{{link-to}}\` component with positional arguments is deprecated. Instead, please use the equivalent named arguments (\`route\`). The content should be passed along as a block.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-link-to-positional-params",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{link-to "About Us" (if this.showNewAboutPage "about-us" "about")}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 69,
              "endLine": 1,
              "line": 1,
              "message": "Invoking the \`{{link-to}}\` component with positional arguments is deprecated. Instead, please use the equivalent named arguments (\`route\`). The content should be passed along as a block.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-link-to-positional-params",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{link-to (t "about") "about"}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 32,
              "endLine": 1,
              "line": 1,
              "message": "Invoking the \`{{link-to}}\` component with positional arguments is deprecated. Instead, please use the equivalent named arguments (\`route\`). The content should be passed along as a block.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-link-to-positional-params",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{link-to (t "about") this.aboutRoute}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 40,
              "endLine": 1,
              "line": 1,
              "message": "Invoking the \`{{link-to}}\` component with positional arguments is deprecated. Instead, please use the equivalent named arguments (\`route\`). The content should be passed along as a block.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-link-to-positional-params",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{link-to (t "about") this.aboutRoute "foo"}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 46,
              "endLine": 1,
              "line": 1,
              "message": "Invoking the \`{{link-to}}\` component with positional arguments is deprecated. Instead, please use the equivalent named arguments (\`route\`, \`model\`). The content should be passed along as a block.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-link-to-positional-params",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{link-to (t "about") this.aboutRoute "foo" "bar"}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 52,
              "endLine": 1,
              "line": 1,
              "message": "Invoking the \`{{link-to}}\` component with positional arguments is deprecated. Instead, please use the equivalent named arguments (\`route\`, \`models\`). The content should be passed along as a block.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-link-to-positional-params",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{link-to (t "about") this.aboutRoute "foo" "bar" (query-params foo="bar")}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 77,
              "endLine": 1,
              "line": 1,
              "message": "Invoking the \`{{link-to}}\` component with positional arguments is deprecated. Instead, please use the equivalent named arguments (\`route\`, \`models\`, \`query\` using the \`hash\` helper). The content should be passed along as a block.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-link-to-positional-params",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{#link-to (if this.showNewAboutPage "about-us" "about")}}About Us{{/link-to}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 79,
              "endLine": 1,
              "line": 1,
              "message": "Invoking the \`{{link-to}}\` component with positional arguments is deprecated. Instead, please use the equivalent named arguments (\`route\`).",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-link-to-positional-params",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{#link-to "about"}}About Us{{/link-to}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 41,
              "endLine": 1,
              "line": 1,
              "message": "Invoking the \`{{link-to}}\` component with positional arguments is deprecated. Instead, please use the equivalent named arguments (\`route\`).",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-link-to-positional-params",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{#link-to this.aboutRoute}}About Us{{/link-to}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 49,
              "endLine": 1,
              "line": 1,
              "message": "Invoking the \`{{link-to}}\` component with positional arguments is deprecated. Instead, please use the equivalent named arguments (\`route\`).",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-link-to-positional-params",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{#link-to this.aboutRoute "foo"}}About Us{{/link-to}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 55,
              "endLine": 1,
              "line": 1,
              "message": "Invoking the \`{{link-to}}\` component with positional arguments is deprecated. Instead, please use the equivalent named arguments (\`route\`, \`model\`).",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-link-to-positional-params",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{#link-to this.aboutRoute "foo" "bar"}}About Us{{/link-to}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 61,
              "endLine": 1,
              "line": 1,
              "message": "Invoking the \`{{link-to}}\` component with positional arguments is deprecated. Instead, please use the equivalent named arguments (\`route\`, \`models\`).",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-link-to-positional-params",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{#link-to this.aboutRoute "foo" "bar" (query-params foo="bar")}}About Us{{/link-to}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 86,
              "endLine": 1,
              "line": 1,
              "message": "Invoking the \`{{link-to}}\` component with positional arguments is deprecated. Instead, please use the equivalent named arguments (\`route\`, \`models\`, \`query\` using the \`hash\` helper).",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-link-to-positional-params",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{#link-to "post" @post}}Read {{@post.title}}...{{/link-to}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 61,
              "endLine": 1,
              "line": 1,
              "message": "Invoking the \`{{link-to}}\` component with positional arguments is deprecated. Instead, please use the equivalent named arguments (\`route\`, \`model\`).",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-link-to-positional-params",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: `{{#link-to "post.comment" @comment.post @comment}}
        Comment by {{@comment.author.name}} on {{@comment.date}}
      {{/link-to}}`,
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 19,
              "endLine": 3,
              "line": 1,
              "message": "Invoking the \`{{link-to}}\` component with positional arguments is deprecated. Instead, please use the equivalent named arguments (\`route\`, \`models\`).",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-link-to-positional-params",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: `{{#link-to "posts" (query-params direction="desc" showArchived=false)}}
        Recent Posts
      {{/link-to}}`,
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 19,
              "endLine": 3,
              "line": 1,
              "message": "Invoking the \`{{link-to}}\` component with positional arguments is deprecated. Instead, please use the equivalent named arguments (\`route\`, \`query\` using the \`hash\` helper).",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-link-to-positional-params",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});