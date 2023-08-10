import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "no-restricted-invocations",

  config: [
    "foo",
    "bar",
    "nested-scope/foo-bar",
    {
      names: ["deprecated-component"],
      message: "This component is deprecated; use component ABC instead.",
    },
  ],

  good: [
    "{{baz}}",
    "{{baz foo=bar}}",
    "{{baz foo=(baz)}}",
    "{{#baz}}{{/baz}}",
    "{{#baz foo=bar}}{{/baz}}",
    "{{#baz foo=(baz)}}{{/baz}}",

    // Component helper:
    "{{component}}",
    '{{component "baz"}}',
    '{{component "baz" foo=bar}}',
    '{{component "baz" foo=(baz)}}',
    '{{#component "baz"}}{{/component}}',
    '{{#component "baz" foo=bar}}{{/component}}',
    '{{#component "baz" foo=(baz)}}{{/component}}',
    '{{yield (component "baz")}}',
    '{{yield (component "baz" foo=bar)}}',
    '{{yield (component "baz" foo=(baz))}}',

    "{{yield (baz (baz (baz) bar))}}",
    "{{yield (baz (baz (baz) (baz)))}}",
    "{{yield (baz (baz (baz) foo=(baz)))}}",
    "{{#baz as |foo|}}{{foo}}{{/baz}}",
    '{{#with (component "blah") as |Foo|}} <Foo /> {{/with}}',
    "{{other/foo-bar}}",
    "{{nested-scope/other}}",

    // Angle bracket:
    "<Random/>",
    "<HelloWorld/>",
    "<NestedScope::Random/>",
  ],

  bad: [
    {
      template: "<div {{foo}} />",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Error while loading rule 'ember-template-lint/no-restricted-invocations': The no-restricted-invocations rule accepts one of the following values.
            One of these:
            * string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
            * object[] - with the following keys:
              * \`names\` - string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
              * \`message\` - string - custom error message to report for violations
          You specified \`true\`
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "{{foo}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Error while loading rule 'ember-template-lint/no-restricted-invocations': The no-restricted-invocations rule accepts one of the following values.
            One of these:
            * string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
            * object[] - with the following keys:
              * \`names\` - string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
              * \`message\` - string - custom error message to report for violations
          You specified \`true\`
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "<Foo />",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Error while loading rule 'ember-template-lint/no-restricted-invocations': The no-restricted-invocations rule accepts one of the following values.
            One of these:
            * string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
            * object[] - with the following keys:
              * \`names\` - string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
              * \`message\` - string - custom error message to report for violations
          You specified \`true\`
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "{{foo foo=bar}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Error while loading rule 'ember-template-lint/no-restricted-invocations': The no-restricted-invocations rule accepts one of the following values.
            One of these:
            * string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
            * object[] - with the following keys:
              * \`names\` - string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
              * \`message\` - string - custom error message to report for violations
          You specified \`true\`
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "{{foo foo=(baz)}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Error while loading rule 'ember-template-lint/no-restricted-invocations': The no-restricted-invocations rule accepts one of the following values.
            One of these:
            * string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
            * object[] - with the following keys:
              * \`names\` - string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
              * \`message\` - string - custom error message to report for violations
          You specified \`true\`
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "{{#foo}}{{/foo}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Error while loading rule 'ember-template-lint/no-restricted-invocations': The no-restricted-invocations rule accepts one of the following values.
            One of these:
            * string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
            * object[] - with the following keys:
              * \`names\` - string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
              * \`message\` - string - custom error message to report for violations
          You specified \`true\`
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "{{#foo foo=bar}}{{/foo}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Error while loading rule 'ember-template-lint/no-restricted-invocations': The no-restricted-invocations rule accepts one of the following values.
            One of these:
            * string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
            * object[] - with the following keys:
              * \`names\` - string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
              * \`message\` - string - custom error message to report for violations
          You specified \`true\`
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "{{#foo foo=(baz)}}{{/foo}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Error while loading rule 'ember-template-lint/no-restricted-invocations': The no-restricted-invocations rule accepts one of the following values.
            One of these:
            * string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
            * object[] - with the following keys:
              * \`names\` - string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
              * \`message\` - string - custom error message to report for violations
          You specified \`true\`
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '{{component "foo"}}',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Error while loading rule 'ember-template-lint/no-restricted-invocations': The no-restricted-invocations rule accepts one of the following values.
            One of these:
            * string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
            * object[] - with the following keys:
              * \`names\` - string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
              * \`message\` - string - custom error message to report for violations
          You specified \`true\`
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '{{component "foo" foo=bar}}',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Error while loading rule 'ember-template-lint/no-restricted-invocations': The no-restricted-invocations rule accepts one of the following values.
            One of these:
            * string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
            * object[] - with the following keys:
              * \`names\` - string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
              * \`message\` - string - custom error message to report for violations
          You specified \`true\`
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '{{component "foo" foo=(baz)}}',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Error while loading rule 'ember-template-lint/no-restricted-invocations': The no-restricted-invocations rule accepts one of the following values.
            One of these:
            * string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
            * object[] - with the following keys:
              * \`names\` - string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
              * \`message\` - string - custom error message to report for violations
          You specified \`true\`
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '{{#component "foo"}}{{/component}}',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Error while loading rule 'ember-template-lint/no-restricted-invocations': The no-restricted-invocations rule accepts one of the following values.
            One of these:
            * string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
            * object[] - with the following keys:
              * \`names\` - string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
              * \`message\` - string - custom error message to report for violations
          You specified \`true\`
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '{{#component "foo" foo=bar}}{{/component}}',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Error while loading rule 'ember-template-lint/no-restricted-invocations': The no-restricted-invocations rule accepts one of the following values.
            One of these:
            * string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
            * object[] - with the following keys:
              * \`names\` - string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
              * \`message\` - string - custom error message to report for violations
          You specified \`true\`
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '{{#component "foo" foo=(baz)}}{{/component}}',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Error while loading rule 'ember-template-lint/no-restricted-invocations': The no-restricted-invocations rule accepts one of the following values.
            One of these:
            * string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
            * object[] - with the following keys:
              * \`names\` - string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
              * \`message\` - string - custom error message to report for violations
          You specified \`true\`
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '{{yield (component "foo")}}',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Error while loading rule 'ember-template-lint/no-restricted-invocations': The no-restricted-invocations rule accepts one of the following values.
            One of these:
            * string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
            * object[] - with the following keys:
              * \`names\` - string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
              * \`message\` - string - custom error message to report for violations
          You specified \`true\`
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '{{yield (component "foo" foo=bar)}}',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Error while loading rule 'ember-template-lint/no-restricted-invocations': The no-restricted-invocations rule accepts one of the following values.
            One of these:
            * string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
            * object[] - with the following keys:
              * \`names\` - string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
              * \`message\` - string - custom error message to report for violations
          You specified \`true\`
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '{{yield (component "foo" foo=(baz))}}',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Error while loading rule 'ember-template-lint/no-restricted-invocations': The no-restricted-invocations rule accepts one of the following values.
            One of these:
            * string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
            * object[] - with the following keys:
              * \`names\` - string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
              * \`message\` - string - custom error message to report for violations
          You specified \`true\`
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "{{yield (baz (foo (baz) bar))}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Error while loading rule 'ember-template-lint/no-restricted-invocations': The no-restricted-invocations rule accepts one of the following values.
            One of these:
            * string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
            * object[] - with the following keys:
              * \`names\` - string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
              * \`message\` - string - custom error message to report for violations
          You specified \`true\`
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "{{yield (baz (baz (baz) (foo)))}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Error while loading rule 'ember-template-lint/no-restricted-invocations': The no-restricted-invocations rule accepts one of the following values.
            One of these:
            * string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
            * object[] - with the following keys:
              * \`names\` - string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
              * \`message\` - string - custom error message to report for violations
          You specified \`true\`
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "{{yield (baz (baz (baz) foo=(foo)))}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Error while loading rule 'ember-template-lint/no-restricted-invocations': The no-restricted-invocations rule accepts one of the following values.
            One of these:
            * string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
            * object[] - with the following keys:
              * \`names\` - string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
              * \`message\` - string - custom error message to report for violations
          You specified \`true\`
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "{{#baz as |bar|}}{{bar foo=(foo)}}{{/baz}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Error while loading rule 'ember-template-lint/no-restricted-invocations': The no-restricted-invocations rule accepts one of the following values.
            One of these:
            * string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
            * object[] - with the following keys:
              * \`names\` - string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
              * \`message\` - string - custom error message to report for violations
          You specified \`true\`
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "{{nested-scope/foo-bar}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Error while loading rule 'ember-template-lint/no-restricted-invocations': The no-restricted-invocations rule accepts one of the following values.
            One of these:
            * string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
            * object[] - with the following keys:
              * \`names\` - string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
              * \`message\` - string - custom error message to report for violations
          You specified \`true\`
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "<NestedScope::FooBar/>",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Error while loading rule 'ember-template-lint/no-restricted-invocations': The no-restricted-invocations rule accepts one of the following values.
            One of these:
            * string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
            * object[] - with the following keys:
              * \`names\` - string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
              * \`message\` - string - custom error message to report for violations
          You specified \`true\`
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "{{deprecated-component}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Error while loading rule 'ember-template-lint/no-restricted-invocations': The no-restricted-invocations rule accepts one of the following values.
            One of these:
            * string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
            * object[] - with the following keys:
              * \`names\` - string[] - helpers or components to disallow (using kebab-case names like \`nested-scope/component-name\`)
              * \`message\` - string - custom error message to report for violations
          You specified \`true\`
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],

  error: [
    {
      config: "sometimes",
      template: "test",

      result: {
        fatal: true,
        message: 'You specified `"sometimes"`',
      },
    },
    {
      config: true,
      template: "test",

      result: {
        fatal: true,
        message: "You specified `true`",
      },
    },
    {
      config: {},
      template: "test",

      result: {
        fatal: true,
        message: "You specified `{}`",
      },
    },
    {
      config: [],
      template: "test",

      result: {
        fatal: true,
        message: "You specified `[]`",
      },
    },
    {
      // Disallows non-string.
      config: [123],
      template: "test",

      result: {
        fatal: true,
        message: "You specified `[123]`",
      },
    },
    {
      // Disallows empty string.
      config: [""],
      template: "test",

      result: {
        fatal: true,
        message: 'You specified `[""]`',
      },
    },
    {
      // Disallows incorrect naming format (disallows angle bracket invocation style).
      config: ["MyComponent"],
      template: "test",

      result: {
        fatal: true,
        message: 'You specified `["MyComponent"]`',
      },
    },
    {
      // Disallows incorrect naming format.
      config: ["Scope/MyComponent"],
      template: "test",

      result: {
        fatal: true,
        message: 'You specified `["Scope/MyComponent"]`',
      },
    },
    {
      // Disallows incorrect naming format.
      config: ["scope::my-component"],
      template: "test",

      result: {
        fatal: true,
        message: 'You specified `["scope::my-component"]`',
      },
    },
    {
      // Disallows empty object.
      config: [{}],
      template: "test",

      result: {
        fatal: true,
        message: "You specified `[{}]`",
      },
    },
    {
      // Disallows object missing names array.
      config: [{ message: "Custom error message." }],
      template: "test",

      result: {
        fatal: true,
        message: 'You specified `[{"message":"Custom error message."}]`',
      },
    },
    {
      // Disallows object with empty names array.
      config: [{ names: [], message: "Custom error message." }],
      template: "test",

      result: {
        fatal: true,
        message:
          'You specified `[{"names":[],"message":"Custom error message."}]`',
      },
    },
  ],
});
