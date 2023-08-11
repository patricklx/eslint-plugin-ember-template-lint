"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "no-positive-tabindex",
  config: true,
  good: ['<button tabindex="0"></button>', '<button tabindex="-1"></button>', "<button tabindex={{-1}}>baz</button>", '<button tabindex={{"-1"}}>baz</button>', '<button tabindex="{{-1}}">baz</button>', '<button tabindex="{{"-1"}}">baz</button>', '<button tabindex="{{if this.show -1}}">baz</button>', '<button tabindex="{{if this.show "-1" "0"}}">baz</button>', '<button tabindex="{{if (not this.show) "-1" "0"}}">baz</button>', "<button tabindex={{if this.show -1}}>baz</button>", '<button tabindex={{if this.show "-1" "0"}}>baz</button>', '<button tabindex={{if (not this.show) "-1" "0"}}>baz</button>'],
  bad: [{
    template: "<button tabindex={{someProperty}}></button>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 44,
              "endLine": 1,
              "line": 1,
              "message": "Tabindex values must be negative numeric.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-positive-tabindex",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<button tabindex="1"></button>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 31,
              "endLine": 1,
              "line": 1,
              "message": "Avoid positive integer values for tabindex.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-positive-tabindex",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<button tabindex="text"></button>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 34,
              "endLine": 1,
              "line": 1,
              "message": "Tabindex values must be negative numeric.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-positive-tabindex",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<button tabindex={{true}}></button>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 36,
              "endLine": 1,
              "line": 1,
              "message": "Tabindex values must be negative numeric.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-positive-tabindex",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<button tabindex="{{false}}"></button>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 39,
              "endLine": 1,
              "line": 1,
              "message": "Tabindex values must be negative numeric.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-positive-tabindex",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<button tabindex="{{5}}"></button>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 35,
              "endLine": 1,
              "line": 1,
              "message": "Avoid positive integer values for tabindex.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-positive-tabindex",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<button tabindex="{{if a 1 -1}}"></button>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 43,
              "endLine": 1,
              "line": 1,
              "message": "Avoid positive integer values for tabindex.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-positive-tabindex",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<button tabindex="{{if a -1 1}}"></button>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 43,
              "endLine": 1,
              "line": 1,
              "message": "Avoid positive integer values for tabindex.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-positive-tabindex",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<button tabindex="{{if a 1}}"></button>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 40,
              "endLine": 1,
              "line": 1,
              "message": "Avoid positive integer values for tabindex.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-positive-tabindex",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<button tabindex="{{if (not a) 1}}"></button>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 46,
              "endLine": 1,
              "line": 1,
              "message": "Avoid positive integer values for tabindex.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-positive-tabindex",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<button tabindex="{{unless a 1}}"></button>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 44,
              "endLine": 1,
              "line": 1,
              "message": "Avoid positive integer values for tabindex.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-positive-tabindex",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<button tabindex="{{unless a -1 1}}"></button>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 47,
              "endLine": 1,
              "line": 1,
              "message": "Avoid positive integer values for tabindex.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-positive-tabindex",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});