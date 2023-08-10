import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "require-context-role",

  config: true,

  good: [
    '<div role="list"><div role="listitem">Item One</div><div role="listitem">Item Two</div></div>',
    '<div role="group"><div role="listitem">Item One</div><div role="listitem">Item Two</div></div>',
    '<div role="row"><div role="columnheader">Item One</div></div>',
    '<div role="gridcell">Item One</div>',
    '<div role="row">{{yield}}</div>',
    '<div role="row"><div role="gridcell">Item One</div></div>',
    '<div role="row"><br>{{#if a}}<div role="gridcell">Item One</div>{{/if}}</div>',
    '<div role="group"><div role="menuitem">Item One</div></div>',
    '<div role="menu"><div role="menuitem">Item One</div></div>',
    '<div role="menubar"><div role="menuitem">Item One</div></div>',
    '<div role="menu"><div role="menuitemcheckbox">Item One</div></div>',
    '<div role="menubar"><div role="menuitemcheckbox">Item One</div></div>',
    '<div role="group"><div role="menuitemradio">Item One</div></div>',
    '<div role="menu"><div role="menuitemradio">Item One</div></div>',
    '<div role="menubar"><div role="menuitemradio">Item One</div></div>',
    '<div role="menubar"><div role="presentation"><a role="menuitem">Item One</a></div></div>',
    '<div role="listbox"><div role="option">Item One</div></div>',
    '<div role="grid"><div role="row">Item One</div></div>',
    '<div role="rowgroup"><div role="row">Item One</div></div>',
    '<div role="treegrid"><div role="row">Item One</div></div>',
    '<div aria-hidden="true" role="tablist"><div role="treeitem">Item One</div></div>',
    '<div role="grid"><div role="rowgroup">Item One</div></div>',
    '<div role="row"><div role="rowheader">Item One</div></div>',
    '<div role="tablist"><div role="tab">Item One</div></div>',
    '<div role="group"><div role="treeitem">Item One</div></div>',
    '<div role="tree"><div role="treeitem">Item One</div></div>',
    '<div role="list">{{#each someList as |item|}}{{list-item item=item}}{{/each}}</div>',
    '<div role="list">{{#each someList as |item|}}<ListItem @item={{item}} />{{/each}}</div>',
    '<div role="list">{{#if this.show}}{{#each someList as |item|}}<ListItem @item={{item}} />{{/each}}{{/if}}</div>',
    '<div role="table"><div role="row"><div role="cell">One</div></div></div>',
  ],

  bad: [
    {
      template: '<div role="tablist"><div role="treeitem">Item One</div></div>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 26,
              "endColumn": 41,
              "endLine": 1,
              "line": 1,
              "message": "You have an element with the role of "treeitem" but it is missing the required (immediate) parent element of "[group, tree]". Reference: https://www.w3.org/TR/wai-aria-1.1/#treeitem.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-context-role",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<div><div role="columnheader">Item One</div></div>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 11,
              "endColumn": 30,
              "endLine": 1,
              "line": 1,
              "message": "You have an element with the role of "columnheader" but it is missing the required (immediate) parent element of "[row]". Reference: https://www.w3.org/TR/wai-aria-1.1/#columnheader.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-context-role",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<div><div role="gridcell">Item One</div></div>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 11,
              "endColumn": 26,
              "endLine": 1,
              "line": 1,
              "message": "You have an element with the role of "gridcell" but it is missing the required (immediate) parent element of "[row]". Reference: https://www.w3.org/TR/wai-aria-1.1/#gridcell.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-context-role",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<div><div role="listitem">Item One</div></div>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 11,
              "endColumn": 26,
              "endLine": 1,
              "line": 1,
              "message": "You have an element with the role of "listitem" but it is missing the required (immediate) parent element of "[group, list]". Reference: https://www.w3.org/TR/wai-aria-1.1/#listitem.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-context-role",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<div><div role="menuitem">Item One</div></div>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 11,
              "endColumn": 26,
              "endLine": 1,
              "line": 1,
              "message": "You have an element with the role of "menuitem" but it is missing the required (immediate) parent element of "[group, menu, menubar]". Reference: https://www.w3.org/TR/wai-aria-1.1/#menuitem.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-context-role",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<div><div role="menuitemcheckbox">Item One</div></div>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 11,
              "endColumn": 34,
              "endLine": 1,
              "line": 1,
              "message": "You have an element with the role of "menuitemcheckbox" but it is missing the required (immediate) parent element of "[menu, menubar]". Reference: https://www.w3.org/TR/wai-aria-1.1/#menuitemcheckbox.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-context-role",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<div><div role="menuitemradio">Item One</div></div>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 11,
              "endColumn": 31,
              "endLine": 1,
              "line": 1,
              "message": "You have an element with the role of "menuitemradio" but it is missing the required (immediate) parent element of "[group, menu, menubar]". Reference: https://www.w3.org/TR/wai-aria-1.1/#menuitemradio.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-context-role",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<div><div role="option">Item One</div></div>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 11,
              "endColumn": 24,
              "endLine": 1,
              "line": 1,
              "message": "You have an element with the role of "option" but it is missing the required (immediate) parent element of "[listbox]". Reference: https://www.w3.org/TR/wai-aria-1.1/#option.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-context-role",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<div><div role="row">Item One</div></div>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 11,
              "endColumn": 21,
              "endLine": 1,
              "line": 1,
              "message": "You have an element with the role of "row" but it is missing the required (immediate) parent element of "[grid, rowgroup, table, treegrid]". Reference: https://www.w3.org/TR/wai-aria-1.1/#row.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-context-role",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<div><div role="rowgroup">Item One</div></div>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 11,
              "endColumn": 26,
              "endLine": 1,
              "line": 1,
              "message": "You have an element with the role of "rowgroup" but it is missing the required (immediate) parent element of "[grid, table, treegrid]". Reference: https://www.w3.org/TR/wai-aria-1.1/#rowgroup.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-context-role",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<div><div role="rowheader">Item One</div></div>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 11,
              "endColumn": 27,
              "endLine": 1,
              "line": 1,
              "message": "You have an element with the role of "rowheader" but it is missing the required (immediate) parent element of "[grid, row]". Reference: https://www.w3.org/TR/wai-aria-1.1/#rowheader.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-context-role",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<div><div role="tab">Item One</div></div>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 11,
              "endColumn": 21,
              "endLine": 1,
              "line": 1,
              "message": "You have an element with the role of "tab" but it is missing the required (immediate) parent element of "[tablist]". Reference: https://www.w3.org/TR/wai-aria-1.1/#tab.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-context-role",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<div><div role="treeitem">Item One</div></div>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 11,
              "endColumn": 26,
              "endLine": 1,
              "line": 1,
              "message": "You have an element with the role of "treeitem" but it is missing the required (immediate) parent element of "[group, tree]". Reference: https://www.w3.org/TR/wai-aria-1.1/#treeitem.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-context-role",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template:
        '<div role="menu"><div><a role="menuitem">Item One</a></div></div>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 26,
              "endColumn": 41,
              "endLine": 1,
              "line": 1,
              "message": "You have an element with the role of "menuitem" but it is missing the required (immediate) parent element of "[group, menu, menubar]". Reference: https://www.w3.org/TR/wai-aria-1.1/#menuitem.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-context-role",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template:
        '<div role="menu"><div role="button"><a role="menuitem">Item One</a></div></div>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 40,
              "endColumn": 55,
              "endLine": 1,
              "line": 1,
              "message": "You have an element with the role of "menuitem" but it is missing the required (immediate) parent element of "[group, menu, menubar]". Reference: https://www.w3.org/TR/wai-aria-1.1/#menuitem.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-context-role",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
