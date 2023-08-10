import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "no-invalid-link-title",

  config: true,

  good: [
    '<a href="https://myurl.com">Click here to read more about this amazing adventure</a>',
    "{{#link-to}} click here to read more about our company{{/link-to}}",
    "<LinkTo>Read more about ways semantic HTML can make your code more accessible.</LinkTo>",
    "<LinkTo>{{foo}} more</LinkTo>",
    '<LinkTo @title="nice title">Something else</LinkTo>',
    '<LinkTo title="great titles!">Whatever, don\'t judge me</LinkTo>',
    '<LinkTo title="Download the video">Download</LinkTo>',
    '<a href="https://myurl.com" title="New to Ember? Read the full tutorial for the best experience">Read the Tutorial</a>',
    '<a href="./whatever" title={{foo}}>Hello!</a>',
    '{{#link-to "blah.route.here" title="awesome title"}}Some thing else here{{/link-to}}',
    `
      <LinkTo @query={{hash page=@pagination.prevPage}} local-class="prev" @rel="prev" @title="previous page" data-test-pagination-prev>
        {{svg-jar "left-pag"}}
      </LinkTo>
    `,
  ],

  bad: [
    {
      template:
        '<a href="https://myurl.com" title="read the tutorial">Read the Tutorial</a>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 76,
              "endLine": 1,
              "line": 1,
              "message": "Title attribute values should not be the same as or part of the link text.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-link-title",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<LinkTo title="quickstart">Quickstart</LinkTo>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 47,
              "endLine": 1,
              "line": 1,
              "message": "Title attribute values should not be the same as or part of the link text.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-link-title",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<LinkTo @title="foo" title="blah">derp</LinkTo>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 48,
              "endLine": 1,
              "line": 1,
              "message": "Specifying title as both an attribute and an argument to <LinkTo /> is invalid.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-link-title",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '{{#link-to title="Do the things"}}Do the things{{/link-to}}',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 60,
              "endLine": 1,
              "line": 1,
              "message": "Title attribute values should not be the same as or part of the link text.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-link-title",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template:
        '<LinkTo @route="some.route" @title="Do the things">Do the things</LinkTo>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 74,
              "endLine": 1,
              "line": 1,
              "message": "Title attribute values should not be the same as or part of the link text.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-link-title",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template:
        '<a href="https://myurl.com" title="Tutorial">Read the Tutorial</a>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 67,
              "endLine": 1,
              "line": 1,
              "message": "Title attribute values should not be the same as or part of the link text.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-link-title",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<LinkTo title="Tutorial">Read the Tutorial</LinkTo>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 52,
              "endLine": 1,
              "line": 1,
              "message": "Title attribute values should not be the same as or part of the link text.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-link-title",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '{{#link-to title="Tutorial"}}Read the Tutorial{{/link-to}}',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 59,
              "endLine": 1,
              "line": 1,
              "message": "Title attribute values should not be the same as or part of the link text.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-link-title",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
