import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "attribute-indentation",

  config: true,

  good: [
    {
      config: {
        "mustache-open-end": "new-line",
        "element-open-end": "new-line",
        "as-indentation": "attribute",
      },
      template: `
      {{#foo
        attribute=this.mine
        as |let|
      }}
      {{/foo}}`,
    },
    {
      config: {
        "mustache-open-end": "new-line",
        "element-open-end": "new-line",
        "as-indentation": "closing-brace",
      },
      template: `
      {{#foo
        attribute=this.mine
      as |let|
      }}
      {{/foo}}`,
    },
    {
      config: {
        "mustache-open-end": "new-line",
        "element-open-end": "new-line",
      },
      template:
        "<div" +
        "\n" +
        "  foo={{action" +
        "\n" +
        "    (if" +
        "\n" +
        "      abc" +
        "\n" +
        "      def" +
        "\n" +
        "      ghi)" +
        "\n" +
        "    stuff" +
        "\n" +
        "  }}" +
        "\n" +
        "  baz=qux" +
        "\n" +
        "/>",
    },
    {
      config: {
        "mustache-open-end": "new-line",
        "element-open-end": "new-line",
      },
      template:
        "<div" +
        "\n" +
        "  foo={{action" +
        "\n" +
        "    some" +
        "\n" +
        "    stuff" +
        "\n" +
        "  }}" +
        "\n" +
        "  baz=qux" +
        "\n" +
        "/>",
    },
    {
      config: {
        "mustache-open-end": "new-line",
        "element-open-end": "last-attribute",
      },
      template:
        "<div" +
        "\n" +
        "  foo={{action" +
        "\n" +
        "    some" +
        "\n" +
        "    stuff" +
        "\n" +
        "  }}" +
        "\n" +
        "  baz=qux/>",
    },
    {
      config: {
        "mustache-open-end": "last-attribute",
        "element-open-end": "last-attribute",
      },
      template:
        "<div" +
        "\n" +
        "  foo={{action" +
        "\n" +
        "    some" +
        "\n" +
        "    stuff}}" +
        "\n" +
        "  baz=qux/>",
    },
    {
      config: {
        "mustache-open-end": "last-attribute",
        "element-open-end": "new-line",
      },
      template:
        "<div" +
        "\n" +
        "  foo={{action" +
        "\n" +
        "    some" +
        "\n" +
        "    stuff}}" +
        "\n" +
        "  baz=qux" +
        "\n" +
        "/>",
    },
    {
      config: {
        "element-open-end": "new-line",
      },
      template:
        "<div" +
        "\n" +
        "  foo={{action" +
        "\n" +
        "    some" +
        "\n" +
        "    stuff" +
        "\n" +
        "  }}" +
        "\n" +
        "  baz=qux" +
        "\n" +
        "/>",
    },
    {
      config: {
        "element-open-end": "new-line",
      },
      template:
        "<div" +
        "\n" +
        "  foo={{action some stuff}}" +
        "\n" +
        "  baz=qux" +
        "\n" +
        "/>",
    },
    {
      config: {
        "element-open-end": "new-line",
      },
      template: "<div" + "\n" + "  foo=bar" + "\n" + "  baz=qux" + "\n" + "/>",
    },
    {
      config: {
        "element-open-end": "last-attribute",
      },
      template: "<div" + "\n" + "  foo=bar" + "\n" + "  baz=qux/>",
    },
    {
      config: {
        "element-open-end": "new-line",
      },
      template: "<input" + "\n" + "  foo=bar" + "\n" + "  baz=qux" + "\n" + ">",
    },
    {
      config: {
        "element-open-end": "last-attribute",
      },
      template: "<input" + "\n" + "  foo=bar" + "\n" + "  baz=qux>",
    },
    {
      config: {
        "mustache-open-end": "new-line",
      },
      template:
        "{{my-component" +
        "\n" +
        "  foo=bar" +
        "\n" +
        "  baz=qux" +
        "\n" +
        '  my-attr=(component "my-other-component" data=(hash' +
        "\n" +
        "    foo=bar" +
        "\n" +
        "    foo=bar" +
        "\n" +
        "    baz=qux))" +
        "\n" +
        "}}",
    },
    {
      config: {
        "mustache-open-end": "last-attribute",
      },
      template:
        "{{my-component" +
        "\n" +
        "  foo=bar" +
        "\n" +
        "  baz=qux" +
        "\n" +
        '  my-attr=(component "my-other-component" data=(hash' +
        "\n" +
        "    foo=bar" +
        "\n" +
        "    foo=bar" +
        "\n" +
        "    baz=qux))}}",
    },
    // Angle Bracket Invocation
    {
      config: {
        "process-elements": true,
      },
      template:
        "<SiteHeader" +
        "\n" +
        "  @selected={{this.user.country}} as |Option|" +
        "\n" +
        ">{{#each this.availableCountries as |country|}}" +
        "\n" +
        "<Option @value={{country}}>{{country.name}}</Option>" +
        "\n" +
        "{{/each}}" +
        "\n" +
        "</SiteHeader>",
    },
    // Non Block form one line
    "<input disabled>",

    // Non Block with wrong indentation, configuration explicitly off
    {
      config: {
        "process-elements": false,
      },
      template: "<input" + "\n" + "disabled" + "\n" + ">",
    },
    // Block form multi line
    {
      config: {
        "process-elements": true,
      },
      template: "<a" + "\n" + "  disabled" + "\n" + ">abc" + "\n" + "</a>",
    },
    {
      config: {
        "process-elements": true,
        "element-open-end": "last-attribute",
      },
      template: "<a" + "\n" + "  disabled>" + "\n" + "abc" + "\n" + "</a>",
    },
    {
      config: {
        "process-elements": true,
      },
      template:
        "<a" +
        "\n" +
        "  disabled" +
        "\n" +
        ">" +
        "\n" +
        "<span" +
        "\n" +
        '  class="abc"' +
        "\n" +
        ">spam me" +
        "\n" +
        "</span>" +
        "\n" +
        "</a>",
    },
    {
      config: {
        "process-elements": true,
      },
      template:
        "<a" +
        "\n" +
        "  disabled" +
        "\n" +
        ">" +
        "\n" +
        "{{#each" +
        "\n" +
        '  class="abc"' +
        "\n" +
        "}}spam me" +
        "\n" +
        "{{/each}}" +
        "\n" +
        "</a>",
    },
    {
      config: {
        "process-elements": true,
      },
      template:
        "<a" +
        "\n" +
        "  disabled" +
        "\n" +
        ">{{contact-details firstName lastName}}" +
        "\n" +
        "</a>",
    },
    {
      config: {
        "process-elements": true,
      },
      template:
        "<a" +
        "\n" +
        "  disabled={{if" +
        "\n" +
        "    true" +
        "\n" +
        '    (action "mostPowerfulAction" value=target.value)' +
        "\n" +
        '    (action "lessPowerfulAction" value=target.value)' +
        "\n" +
        "  }}" +
        "\n" +
        ">{{contact-details" +
        "\n" +
        "   firstName" +
        "\n" +
        "   lastName" +
        "\n" +
        " }}" +
        "\n" +
        "</a>",
    },
    {
      config: {
        "process-elements": true,
      },
      template:
        "<a" +
        "\n" +
        "  disabled={{if" +
        "\n" +
        "    true" +
        "\n" +
        '    (action "mostPowerfulAction" value=target.value)' +
        "\n" +
        '    (action "lessPowerfulAction" value=target.value)' +
        "\n" +
        "  }}" +
        "\n" +
        ">{{#contact-details" +
        "\n" +
        "   firstName" +
        "\n" +
        "   lastName" +
        "\n" +
        " }}{{foo}}{{/contact-details}}" +
        "\n" +
        "</a>",
    },
    {
      config: {
        "process-elements": true,
        "element-open-end": "last-attribute",
        "mustache-open-end": "last-attribute",
      },
      template:
        "<a" +
        "\n" +
        "  disabled={{if" +
        "\n" +
        "    true" +
        "\n" +
        '    (action "mostPowerfulAction" value=target.value)' +
        "\n" +
        '    (action "lessPowerfulAction" value=target.value)}}>' +
        "\n" +
        "{{#contact-details" +
        "\n" +
        "  firstName" +
        "\n" +
        "  lastName}}" +
        "\n" +
        " {{foo}}{{/contact-details}}" +
        "\n" +
        "</a>",
    },
    {
      config: {
        "process-elements": true,
        "element-open-end": "new-line",
        "mustache-open-end": "last-attribute",
      },
      template:
        "<a" +
        "\n" +
        "  disabled={{if" +
        "\n" +
        "    true" +
        "\n" +
        '    (action "mostPowerfulAction" value=target.value)' +
        "\n" +
        '    (action "lessPowerfulAction" value=target.value)}}' +
        "\n" +
        ">\n" +
        "  {{#contact-details" +
        "\n" +
        "    firstName" +
        "\n" +
        "    lastName}}" +
        "\n" +
        "  {{foo}}\n" +
        "  {{/contact-details}}" +
        "\n" +
        "</a>",
    },
    {
      config: {
        "process-elements": true,
        "element-open-end": "last-attribute",
        "mustache-open-end": "new-line",
      },
      template:
        "<a" +
        "\n" +
        "  disabled={{if" +
        "\n" +
        "    true" +
        "\n" +
        '    (action "mostPowerfulAction" value=target.value)' +
        "\n" +
        '    (action "lessPowerfulAction" value=target.value)' +
        "\n" +
        "  }}>\n" +
        "  {{#contact-details" +
        "\n" +
        "    firstName" +
        "\n" +
        "    lastName" +
        "\n" +
        "  }}" +
        "\n" +
        "   {{foo}}{{/contact-details}}" +
        "\n" +
        "</a>",
    },
    // Self closing single line
    {
      config: {
        "process-elements": true,
      },
      template: "<div disabled />",
    },
    // Self closing multi line
    {
      config: {
        "process-elements": true,
      },
      template: "<div" + "\n" + "  disabled" + "\n" + "/>",
    },
    // Non Block form multi line
    {
      config: {
        "process-elements": true,
      },
      template: "<input" + "\n" + "  disabled" + "\n" + ">",
    },
    {
      config: {
        "process-elements": true,
      },
      template: "<input disabled>",
    },
    // Non Block form multi line
    {
      config: {
        "process-elements": true,
      },
      template:
        "<input" +
        "\n" +
        '  disabled={{action "mostPowerfulAction" value=target.value}}' +
        "\n" +
        ">",
    },
    {
      config: {
        "process-elements": true,
      },
      template:
        "<input" +
        "\n" +
        "  disabled={{if" +
        "\n" +
        "    true" +
        "\n" +
        '    (action "mostPowerfulAction" value=target.value)' +
        "\n" +
        '    (action "lessPowerfulAction" value=target.value)' +
        "\n" +
        "  }}" +
        "\n" +
        ">",
    },
    // Non Block form with no params
    "{{contact-details}}",
    // Default config with open-invocation(< 80 chars)
    // positional params
    "{{contact-details firstName lastName}}",
    // named params
    "{{contact-details firstName=firstName lastName=lastName}}",
    // Non Block form more than the default config characters (> 80 chars)
    {
      config: {
        "open-invocation-max-len": 120,
      },
      template:
        "{{contact-details firstName=firstName lastName=lastName avatarUrl=avatarUrl age=age address=address phoneNo=phoneNo}}",
    },
    // Open-invocation with multiple lines.
    "{{contact-details" +
      "\n" +
      "  firstName=firstName" +
      "\n" +
      "  lastName=lastName" +
      "\n" +
      "}}",
    // positional params
    "{{contact-details" +
      "\n" +
      "  firstName" +
      "\n" +
      "  lastName" +
      "\n" +
      "}}",
    // helper
    "{{if" +
      "\n" +
      "  (or logout.isRunning (not session.isAuthenticated))" +
      "\n" +
      '  "Logging Out..."' +
      "\n" +
      '  "Log Out"' +
      "\n" +
      "}}",
    // helper unfolded
    "{{if" +
      "\n" +
      "  (or " +
      "\n" +
      "    logout.isRunning" +
      "\n" +
      "    (not session.isAuthenticated)" +
      "\n" +
      "  )" +
      "\n" +
      '  "Logging Out..."' +
      "\n" +
      '  "Log Out"' +
      "\n" +
      "}}",
    // positional null
    "{{contact-null" + "\n" + "  null" + "\n" + "}}",
    // component
    "{{component" +
      "\n" +
      "  field" +
      "\n" +
      "  action=(action reaction)" +
      "\n" +
      "}}",

    // Multiple open-invocations with multiple lines.
    "{{contact-details" +
      "\n" +
      "  firstName=firstName" +
      "\n" +
      "  lastName=lastName" +
      "\n" +
      "}}" +
      "\n" +
      "{{contact-details" +
      "\n" +
      "  firstName=firstName" +
      "\n" +
      "  lastName=lastName" +
      "\n" +
      "}}",
    // with component from hash
    "{{t.body" + "\n" + "  canExpand=true" + "\n" + "}}",
    // with helper
    "{{print-debug" +
      "\n" +
      "  foo=(or" +
      "\n" +
      "    foo" +
      "\n" +
      "    bar" +
      "\n" +
      "  )" +
      "\n" +
      "  baz=baz" +
      "\n" +
      "}}",
    // with positional helper
    "{{print-debug" +
      "\n" +
      "  (hash" +
      "\n" +
      '    foo="bar"' +
      "\n" +
      "  )" +
      "\n" +
      '  title="baz"' +
      "\n" +
      "}}",
    "{{yield" +
      "\n" +
      "  (hash" +
      "\n" +
      '    header=(component "x-very-long-name-header")' +
      "\n" +
      '    body=(component "x-very-long-name-body")' +
      "\n" +
      "  )" +
      "\n" +
      "}}",

    // Block form within 80 characters
    // with positional params
    "{{#contact-details firstName lastName}}" +
      "\n" +
      " {{contactImage}}" +
      "\n" +
      "{{/contact-details}}",
    // with named params
    "{{#contact-details firstName=firstName lastName=lastName}}" +
      "\n" +
      " {{contactImage}}" +
      "\n" +
      "{{/contact-details}}",
    // component from hash
    "{{#t.body" +
      "\n" +
      "  canExpand=true" +
      "\n" +
      "  multiRowExpansion=false" +
      "\n" +
      "}}" +
      "\n" +
      "  {{foo}}" +
      "\n" +
      "{{/t.body}}",
    // with block params
    "{{#contact-details firstName=firstName lastName=lastName as |contact|}}" +
      "\n" +
      " {{contact.fullName}}" +
      "\n" +
      "{{/contact-details}}",
    // component from positional
    "{{#t.body" +
      "\n" +
      "  canExpand=(helper help)" +
      "\n" +
      "  multiRowExpansion=false" +
      "\n" +
      "as |body|" +
      "\n" +
      "}}" +
      "\n" +
      "  {{foo}}" +
      "\n" +
      "{{/t.body}}",
    // with indented block params
    "  {{#t.body" +
      "\n" +
      "    canExpand=(helper help)" +
      "\n" +
      "    multiRowExpansion=false" +
      "\n" +
      "  as |body|" +
      "\n" +
      "  }}" +
      "\n" +
      "    {{foo}}" +
      "\n" +
      "  {{/t.body}}",

    // Block form with open-invocation more than 80 characters
    {
      config: {
        "mustache-open-end": "last-attribute",
        "open-invocation-max-len": 120,
      },
      template:
        "{{#contact-details firstName=firstName lastName=lastName age=age avatarUrl=avatarUrl as |contact|}}" +
        "\n" +
        " {{contact.fullName}}" +
        "\n" +
        "{{/contact-details}}",
    },
    // Block form with multiple line invocation
    "{{#contact-details" +
      "\n" +
      "  firstName=firstName" +
      "\n" +
      "  lastName=lastName" +
      "\n" +
      "as |fullName|" +
      "\n" +
      "}}" +
      "\n" +
      "  {{fullName}}" +
      "\n" +
      "{{/contact-details}}",
    // Block form with no params
    "{{#contact-details" +
      "\n" +
      "as |contact|" +
      "\n" +
      "}}" +
      "\n" +
      "  {{contact.fullName}}" +
      "\n" +
      "{{/contact-details}}",
    "<div>\n  <p></p>\n</div>",
    {
      config: {
        "mustache-open-end": "last-attribute",
      },
      template:
        "{{#contact-details" +
        "\n" +
        "  param0" +
        "\n" +
        "  param1=abc" +
        "\n" +
        "  param2=abc" +
        "\n" +
        "as |ab cd ef  cd ef |}}" +
        "\n" +
        "  {{contact.fullName}}" +
        "\n" +
        "{{/contact-details}}",
    },
    {
      config: {
        "mustache-open-end": "new-line",
      },
      template:
        "{{#contact-details" +
        "\n" +
        "  param0" +
        "\n" +
        "  param1=abc" +
        "\n" +
        "  param2=abc" +
        "\n" +
        "as |ab cd ef  cd ef |" +
        "\n" +
        "}}" +
        "\n" +
        "  {{contact.fullName}}" +
        "\n" +
        "{{/contact-details}}",
    },
    {
      config: {
        "mustache-open-end": "new-line",
        "element-open-end": "new-line",
      },
      template:
        "<div" +
        "\n" +
        '  class="classy"' +
        "\n" +
        ">" +
        "\n" +
        "{{#contact-details" +
        "\n" +
        "  param0" +
        "\n" +
        "  param1=abc" +
        "\n" +
        "  param2=abc" +
        "\n" +
        "as |ab cd ef  cd ef |" +
        "\n" +
        "}}" +
        "\n" +
        "  {{contact.fullName}}" +
        "\n" +
        "{{/contact-details}}" +
        "\n" +
        "</div>",
    },
    {
      config: {
        "mustache-open-end": "last-attribute",
        "element-open-end": "last-attribute",
      },
      template:
        "<div" +
        "\n" +
        '  class="classy">' +
        "\n" +
        "{{#contact-details" +
        "\n" +
        "  param0" +
        "\n" +
        "  param1=abc" +
        "\n" +
        "  param2=abc" +
        "\n" +
        "as |ab cd ef  cd ef |}}" +
        "\n" +
        "  {{contact.fullName}}" +
        "\n" +
        "{{/contact-details}}" +
        "\n" +
        "</div>",
    },
    {
      config: {
        "mustache-open-end": "last-attribute",
        "element-open-end": "new-line",
      },
      template:
        "<div" +
        "\n" +
        '  class="classy"' +
        "\n" +
        ">" +
        "\n" +
        "{{#contact-details" +
        "\n" +
        "  param0" +
        "\n" +
        "  param1=abc" +
        "\n" +
        "  param2=abc" +
        "\n" +
        "as |ab cd ef  cd ef |}}" +
        "\n" +
        "  {{contact.fullName}}" +
        "\n" +
        "{{/contact-details}}" +
        "\n" +
        "</div>",
    },
    {
      config: {
        "mustache-open-end": "new-line",
        "element-open-end": "last-attribute",
      },
      template:
        "<div" +
        "\n" +
        '  class="classy">' +
        "\n" +
        "{{#contact-details" +
        "\n" +
        "  param0" +
        "\n" +
        "  param1=abc" +
        "\n" +
        "  param2=abc" +
        "\n" +
        "as |ab cd ef  cd ef |" +
        "\n" +
        "}}" +
        "\n" +
        "  {{contact.fullName}}" +
        "\n" +
        "{{/contact-details}}" +
        "\n" +
        "</div>",
    },
    {
      config: {
        "mustache-open-end": "last-attribute",
      },
      template: `
        <SomeThing
          @long-arg={{hash
            foo="bar"}}
        />`,
    },
    {
      config: {
        "mustache-open-end": "new-line",
      },
      template: `
        <SomeThing
          @long-arg={{hash
            foo="bar"
          }}
        />`,
    },
    {
      template: `
        <SomeThing
          @long-arg={{hash
            foo="bar"
          }}
          data-after-long-arg={{true}}
        />`,
    },
    {
      template: `
        <form
          class='form-signin'
          {{action 'authenticate' email password}}
        >
        </form>`,
    },
    {
      template: `
        <div>
          {{{i18n
            param=true
            otherParam=false
          }}}
        </div>`,
    },
  ],

  bad: [
    {
      config: {
        "mustache-open-end": "new-line",
        "element-open-end": "new-line",
      },
      template:
        "<div" +
        "\n" +
        "  foo={{action" +
        "\n" +
        "    some" +
        "\n" +
        "    stuff}}" +
        "\n" +
        "  baz=qux/>",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 10,
              "endColumn": 12,
              "endLine": 4,
              "line": 4,
              "message": "Incorrect indentation of close curly braces '}}' for the component '{{action}}' beginning at L4:C9. Expected '{{action}}' to be at L5:C2.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 10,
              "endColumn": 12,
              "endLine": 5,
              "line": 5,
              "message": "Incorrect indentation of close bracket '>' for the element '<div>' beginning at L5:C9. Expected '<div>' to be at L6:C0.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: {
        "mustache-open-end": "last-attribute",
        "element-open-end": "last-attribute",
      },
      template:
        "<div" +
        "\n" +
        "  foo={{action" +
        "\n" +
        "    some" +
        "\n" +
        "    stuff" +
        "\n" +
        "  }}" +
        "\n" +
        "  baz=qux" +
        "\n" +
        "/>",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 3,
              "endColumn": 5,
              "endLine": 5,
              "line": 5,
              "message": "Incorrect indentation of close curly braces '}}' for the component '{{action}}' beginning at L5:C2. Expected '{{action}}' to be at L4:C9.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 1,
              "endColumn": 3,
              "endLine": 7,
              "line": 7,
              "message": "Incorrect indentation of close bracket '>' for the element '<div>' beginning at L7:C0. Expected '<div>' to be at L6:C9.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: {
        "mustache-open-end": "last-attribute",
      },
      template:
        "{{my-component" +
        "\n" +
        "  foo=bar" +
        "\n" +
        "  baz=qux" +
        "\n" +
        '  my-attr=(component "my-other-component" data=(hash' +
        "\n" +
        "    foo=bar" +
        "\n" +
        "    foo=bar" +
        "\n" +
        "    baz=qux))" +
        "\n" +
        "}}",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 3,
              "endLine": 8,
              "line": 8,
              "message": "Incorrect indentation of close curly braces '}}' for the component '{{my-component}}' beginning at L8:C0. Expected '{{my-component}}' to be at L7:C13.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: {
        "mustache-open-end": "new-line",
      },
      template:
        "{{my-component" +
        "\n" +
        "  foo=bar" +
        "\n" +
        "  baz=qux" +
        "\n" +
        '  my-attr=(component "my-other-component" data=(hash' +
        "\n" +
        "    foo=bar" +
        "\n" +
        "    foo=bar" +
        "\n" +
        "    baz=qux))}}",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 14,
              "endColumn": 16,
              "endLine": 7,
              "line": 7,
              "message": "Incorrect indentation of close curly braces '}}' for the component '{{my-component}}' beginning at L7:C13. Expected '{{my-component}}' to be at L8:C0.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: {
        "element-open-end": "last-attribute",
      },
      template: "<input" + "\n" + "  foo=bar" + "\n" + "  baz=bar" + "\n" + ">",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 2,
              "endLine": 4,
              "line": 4,
              "message": "Incorrect indentation of close bracket '>' for the element '<input>' beginning at L4:C0. Expected '<input>' to be at L3:C9.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: {
        "element-open-end": "new-line",
      },
      template: "<input" + "\n" + "  foo=bar" + "\n" + "  baz=qux>",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 10,
              "endColumn": 11,
              "endLine": 3,
              "line": 3,
              "message": "Incorrect indentation of close bracket '>' for the element '<input>' beginning at L3:C9. Expected '<input>' to be at L4:C0.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      // Non Block HTML element
      config: {
        "process-elements": true,
      },
      template: "<input disabled" + "\n" + ">",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 8,
              "endColumn": 2,
              "endLine": 2,
              "line": 1,
              "message": "Incorrect indentation of htmlAttribute 'disabled' beginning at L1:C7. Expected 'disabled' to be at L2:C2.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 1,
              "endColumn": 2,
              "endLine": 2,
              "line": 2,
              "message": "Incorrect indentation of close bracket '>' for the element '<input>' beginning at L2:C0. Expected '<input>' to be at L3:C0.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      // Self closing element
      config: {
        "process-elements": true,
      },
      template: "<div disabled" + "\n" + "/>",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 3,
              "endLine": 2,
              "line": 1,
              "message": "Incorrect indentation of htmlAttribute 'disabled' beginning at L1:C5. Expected 'disabled' to be at L2:C2.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 1,
              "endColumn": 3,
              "endLine": 2,
              "line": 2,
              "message": "Incorrect indentation of close bracket '>' for the element '<div>' beginning at L2:C0. Expected '<div>' to be at L3:C0.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      // Too long for 80 characters line
      config: {
        "process-elements": true,
      },
      template:
        '<input disabled type="text" value="abc" class="classy classic classist" id="input-now">',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 8,
              "endColumn": 88,
              "endLine": 1,
              "line": 1,
              "message": "Incorrect indentation of htmlAttribute 'disabled' beginning at L1:C7. Expected 'disabled' to be at L2:C2.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 17,
              "endColumn": 88,
              "endLine": 1,
              "line": 1,
              "message": "Incorrect indentation of htmlAttribute 'type' beginning at L1:C16. Expected 'type' to be at L3:C2.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 29,
              "endColumn": 88,
              "endLine": 1,
              "line": 1,
              "message": "Incorrect indentation of htmlAttribute 'value' beginning at L1:C28. Expected 'value' to be at L4:C2.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 41,
              "endColumn": 88,
              "endLine": 1,
              "line": 1,
              "message": "Incorrect indentation of htmlAttribute 'class' beginning at L1:C40. Expected 'class' to be at L5:C2.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 73,
              "endColumn": 88,
              "endLine": 1,
              "line": 1,
              "message": "Incorrect indentation of htmlAttribute 'id' beginning at L1:C72. Expected 'id' to be at L6:C2.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 87,
              "endColumn": 88,
              "endLine": 1,
              "line": 1,
              "message": "Incorrect indentation of close bracket '>' for the element '<input>' beginning at L1:C86. Expected '<input>' to be at L7:C0.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: {
        "process-elements": true,
      },
      template:
        "<a" +
        "\n" +
        "  disabled={{if" +
        "\n" +
        "    true" +
        "\n" +
        '    (action "mostPowerfulAction" value=target.value)' +
        "\n" +
        '    (action "lessPowerfulAction" value=target.value)' +
        "\n" +
        "  }}" +
        "\n" +
        ">{{contact-details" +
        "\n" +
        "   firstName" +
        "\n" +
        "   lastName" +
        "\n" +
        " }}</a>",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 4,
              "endColumn": 8,
              "endLine": 10,
              "line": 10,
              "message": "Incorrect indentation of close tag '</a>' for element '<a>' beginning at L10:C3. Expected '</a>' to be at L10:C0.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: {
        "process-elements": true,
      },
      template:
        '<a href="https://www.emberjs.com" class="emberjs-home link" rel="noopener" target="_blank">Ember JS</a>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 4,
              "endColumn": 104,
              "endLine": 1,
              "line": 1,
              "message": "Incorrect indentation of htmlAttribute 'href' beginning at L1:C3. Expected 'href' to be at L2:C2.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 35,
              "endColumn": 104,
              "endLine": 1,
              "line": 1,
              "message": "Incorrect indentation of htmlAttribute 'class' beginning at L1:C34. Expected 'class' to be at L3:C2.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 61,
              "endColumn": 104,
              "endLine": 1,
              "line": 1,
              "message": "Incorrect indentation of htmlAttribute 'rel' beginning at L1:C60. Expected 'rel' to be at L4:C2.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 76,
              "endColumn": 104,
              "endLine": 1,
              "line": 1,
              "message": "Incorrect indentation of htmlAttribute 'target' beginning at L1:C75. Expected 'target' to be at L5:C2.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 91,
              "endColumn": 104,
              "endLine": 1,
              "line": 1,
              "message": "Incorrect indentation of close bracket '>' for the element '<a>' beginning at L1:C90. Expected '<a>' to be at L6:C0.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 100,
              "endColumn": 104,
              "endLine": 1,
              "line": 1,
              "message": "Incorrect indentation of close tag '</a>' for element '<a>' beginning at L1:C99. Expected '</a>' to be at L1:C0.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      // Non-Block form more than 30 characters
      config: {
        "open-invocation-max-len": 30,
      },
      template: "{{contact-details firstName=firstName lastName=lastName}}",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 19,
              "endColumn": 58,
              "endLine": 1,
              "line": 1,
              "message": "Incorrect indentation of attribute 'firstName' beginning at L1:C18. Expected 'firstName' to be at L2:C2.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 39,
              "endColumn": 58,
              "endLine": 1,
              "line": 1,
              "message": "Incorrect indentation of attribute 'lastName' beginning at L1:C38. Expected 'lastName' to be at L3:C2.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 56,
              "endColumn": 58,
              "endLine": 1,
              "line": 1,
              "message": "Incorrect indentation of close curly braces '}}' for the component '{{contact-details}}' beginning at L1:C55. Expected '{{contact-details}}' to be at L4:C0.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: {
        "process-elements": true,
      },
      template:
        "<a" +
        "\n" +
        "  disabled" +
        "\n" +
        ">" +
        "\n" +
        "{{#each" +
        "\n" +
        '  class="abc"' +
        "\n" +
        "}}spam me" +
        "\n" +
        "{{/each}}</a>",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 10,
              "endColumn": 14,
              "endLine": 7,
              "line": 7,
              "message": "Incorrect indentation of close tag '</a>' for element '<a>' beginning at L7:C9. Expected '</a>' to be at L8:C0.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      // Block form with multiple lines
      template:
        "{{#contact-details" +
        "\n" +
        " firstName=firstName lastName=lastName as |contact|}}" +
        "\n" +
        " {{contact.fullName}}" +
        "\n" +
        "{{/contact-details}}",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 2,
              "endColumn": 21,
              "endLine": 4,
              "line": 2,
              "message": "Incorrect indentation of attribute 'firstName' beginning at L2:C1. Expected 'firstName' to be at L2:C2.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 22,
              "endColumn": 21,
              "endLine": 4,
              "line": 2,
              "message": "Incorrect indentation of attribute 'lastName' beginning at L2:C21. Expected 'lastName' to be at L3:C2.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 39,
              "endColumn": 21,
              "endLine": 4,
              "line": 2,
              "message": "Incorrect indentation of block params 'as |contact|}}' beginning at L2:C38. Expecting the block params to be at L3:C0.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 52,
              "endColumn": 21,
              "endLine": 4,
              "line": 2,
              "message": "Incorrect indentation of close curly braces '}}' for the component '{{contact-details}}' beginning at L2:C51. Expected '{{contact-details}}' to be at L4:C0.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template:
        "{{#contact-details" +
        "\n" +
        "  firstName=firstName" +
        "\n" +
        "  lastName=lastName" +
        "\n" +
        "as |fullName|}}" +
        "\n" +
        "  {{fullName}}" +
        "\n" +
        "{{/contact-details}}",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 14,
              "endColumn": 21,
              "endLine": 6,
              "line": 4,
              "message": "Incorrect indentation of close curly braces '}}' for the component '{{contact-details}}' beginning at L4:C13. Expected '{{contact-details}}' to be at L5:C0.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      // Block form (> 80 chars)
      template:
        "{{#contact-details firstName=firstName lastName=lastName age=age avatar=avatar as |contact|}}" +
        "\n" +
        "  {{fullName}}" +
        "\n" +
        "{{/contact-details}}",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 20,
              "endColumn": 21,
              "endLine": 3,
              "line": 1,
              "message": "Incorrect indentation of attribute 'firstName' beginning at L1:C19. Expected 'firstName' to be at L2:C2.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 40,
              "endColumn": 21,
              "endLine": 3,
              "line": 1,
              "message": "Incorrect indentation of attribute 'lastName' beginning at L1:C39. Expected 'lastName' to be at L3:C2.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 58,
              "endColumn": 21,
              "endLine": 3,
              "line": 1,
              "message": "Incorrect indentation of attribute 'age' beginning at L1:C57. Expected 'age' to be at L4:C2.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 66,
              "endColumn": 21,
              "endLine": 3,
              "line": 1,
              "message": "Incorrect indentation of attribute 'avatar' beginning at L1:C65. Expected 'avatar' to be at L5:C2.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 79,
              "endColumn": 21,
              "endLine": 3,
              "line": 1,
              "message": "Incorrect indentation of block params 'as |contact|}}' beginning at L1:C78. Expecting the block params to be at L2:C0.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 92,
              "endColumn": 21,
              "endLine": 3,
              "line": 1,
              "message": "Incorrect indentation of close curly braces '}}' for the component '{{contact-details}}' beginning at L1:C91. Expected '{{contact-details}}' to be at L3:C0.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      // Block form with no params with multiple lines.
      template:
        "{{#contact-details" +
        "\n" +
        "\n" +
        "\n" +
        "as |contact|}}" +
        "\n" +
        "  {{contact.fullName}}" +
        "\n" +
        "{{/contact-details}}",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 21,
              "endLine": 6,
              "line": 4,
              "message": "Incorrect indentation of block params 'as |contact|}}' beginning at L4:C0. Expecting the block params to be at L2:C0.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 13,
              "endColumn": 21,
              "endLine": 6,
              "line": 4,
              "message": "Incorrect indentation of close curly braces '}}' for the component '{{contact-details}}' beginning at L4:C12. Expected '{{contact-details}}' to be at L3:C0.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      // with helper, non-block, > 80 chars
      config: {
        "open-invocation-max-len": 80,
      },
      template:
        '{{if (or logout.isRunning (not session.isAuthenticated)) "Logging Out..." "Log Out"}}',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 86,
              "endLine": 1,
              "line": 1,
              "message": "Incorrect indentation of positional param 'or' beginning at L1:C5. Expected 'or' to be at L2:C2.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 58,
              "endColumn": 86,
              "endLine": 1,
              "line": 1,
              "message": "Incorrect indentation of positional param 'Logging Out...' beginning at L1:C57. Expected 'Logging Out...' to be at L3:C2.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 75,
              "endColumn": 86,
              "endLine": 1,
              "line": 1,
              "message": "Incorrect indentation of positional param 'Log Out' beginning at L1:C74. Expected 'Log Out' to be at L4:C2.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 84,
              "endColumn": 86,
              "endLine": 1,
              "line": 1,
              "message": "Incorrect indentation of close curly braces '}}' for the component '{{if}}' beginning at L1:C83. Expected '{{if}}' to be at L5:C0.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: ["{{foo-bar", "baz=true", "}}"].join("\n"),

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 3,
              "endLine": 3,
              "line": 2,
              "message": "Incorrect indentation of attribute 'baz' beginning at L2:C0. Expected 'baz' to be at L2:C2.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: ["{{#foo-bar", "baz=true", "}}", "{{/foo-bar}}"].join("\n"),

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 13,
              "endLine": 4,
              "line": 2,
              "message": "Incorrect indentation of attribute 'baz' beginning at L2:C0. Expected 'baz' to be at L2:C2.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: {
        "mustache-open-end": "new-line",
        "element-open-end": "new-line",
      },
      template:
        "<div" +
        "\n" +
        '  class="classy">' +
        "\n" +
        "{{#contact-details" +
        "\n" +
        "  param0" +
        "\n" +
        "  param1=abc" +
        "\n" +
        "  param2=abc" +
        "\n" +
        "as |ab cd ef  cd ef |}}" +
        "\n" +
        "  {{contact.fullName}}" +
        "\n" +
        "{{/contact-details}}" +
        "\n" +
        "</div>",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 17,
              "endColumn": 7,
              "endLine": 10,
              "line": 2,
              "message": "Incorrect indentation of close bracket '>' for the element '<div>' beginning at L2:C16. Expected '<div>' to be at L3:C0.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 22,
              "endColumn": 21,
              "endLine": 9,
              "line": 7,
              "message": "Incorrect indentation of close curly braces '}}' for the component '{{contact-details}}' beginning at L7:C21. Expected '{{contact-details}}' to be at L8:C0.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: {
        "mustache-open-end": "last-attribute",
        "element-open-end": "last-attribute",
      },
      template:
        "<div" +
        "\n" +
        '  class="classy"' +
        "\n" +
        ">" +
        "\n" +
        "{{#contact-details" +
        "\n" +
        "  param0" +
        "\n" +
        "  param1=abc" +
        "\n" +
        "  param2=abc" +
        "\n" +
        "as |ab cd ef  cd ef |" +
        "\n" +
        "}}" +
        "\n" +
        "  {{contact.fullName}}" +
        "\n" +
        "{{/contact-details}}" +
        "\n" +
        "</div>",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 7,
              "endLine": 12,
              "line": 3,
              "message": "Incorrect indentation of close bracket '>' for the element '<div>' beginning at L3:C0. Expected '<div>' to be at L2:C16.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 1,
              "endColumn": 21,
              "endLine": 11,
              "line": 9,
              "message": "Incorrect indentation of close curly braces '}}' for the component '{{contact-details}}' beginning at L9:C0. Expected '{{contact-details}}' to be at L8:C0.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: {
        "mustache-open-end": "last-attribute",
        "element-open-end": "new-line",
      },
      template:
        "<div" +
        "\n" +
        '  class="classy">' +
        "\n" +
        "{{#contact-details" +
        "\n" +
        "  param0" +
        "\n" +
        "  param1=abc" +
        "\n" +
        "  param2=abc" +
        "\n" +
        "as |ab cd ef  cd ef |" +
        "\n" +
        "}}" +
        "\n" +
        "  {{contact.fullName}}" +
        "\n" +
        "{{/contact-details}}" +
        "\n" +
        "</div>",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 17,
              "endColumn": 7,
              "endLine": 11,
              "line": 2,
              "message": "Incorrect indentation of close bracket '>' for the element '<div>' beginning at L2:C16. Expected '<div>' to be at L3:C0.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 1,
              "endColumn": 21,
              "endLine": 10,
              "line": 8,
              "message": "Incorrect indentation of close curly braces '}}' for the component '{{contact-details}}' beginning at L8:C0. Expected '{{contact-details}}' to be at L7:C0.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      config: {
        "mustache-open-end": "new-line",
        "element-open-end": "last-attribute",
      },
      template:
        "<div" +
        "\n" +
        '  class="classy"' +
        "\n" +
        ">" +
        "\n" +
        "{{#contact-details" +
        "\n" +
        "  param0" +
        "\n" +
        "  param1=abc" +
        "\n" +
        "  param2=abc" +
        "\n" +
        "as |ab cd ef  cd ef |}}" +
        "\n" +
        "  {{contact.fullName}}" +
        "\n" +
        "{{/contact-details}}" +
        "\n" +
        "</div>",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 7,
              "endLine": 11,
              "line": 3,
              "message": "Incorrect indentation of close bracket '>' for the element '<div>' beginning at L3:C0. Expected '<div>' to be at L2:C16.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 22,
              "endColumn": 21,
              "endLine": 10,
              "line": 8,
              "message": "Incorrect indentation of close curly braces '}}' for the component '{{contact-details}}' beginning at L8:C21. Expected '{{contact-details}}' to be at L9:C0.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: `
      <form
        {{action 'authenticate' email password}}
        class='form-signin'
      >
      </form>`,
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 9,
              "endColumn": 14,
              "endLine": 6,
              "line": 3,
              "message": "Incorrect indentation of element modifier 'action' beginning at L3:C8. Expected 'action' to be at L4:C8.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
            {
              "column": 9,
              "endColumn": 14,
              "endLine": 6,
              "line": 4,
              "message": "Incorrect indentation of htmlAttribute 'class' beginning at L4:C8. Expected 'class' to be at L3:C8.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: `{{#foo bar as |foo|}}
    {{foo.bar
      baz}}{{/foo}}`,
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 10,
              "endColumn": 12,
              "endLine": 3,
              "line": 3,
              "message": "Incorrect indentation of close curly braces '}}' for the component '{{foo.bar}}' beginning at L3:C9. Expected '{{foo.bar}}' to be at L4:C4.",
              "nodeType": null,
              "ruleId": "ember-template-lint/attribute-indentation",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
