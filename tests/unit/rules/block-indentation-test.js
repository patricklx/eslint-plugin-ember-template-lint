const Linter = require("../../../lib/linter");

describe("block indentation", () => {
  const linter = new Linter({
    config: {
      rules: {
        "block-indentation": [true],
      },
    },
  });
  it("should detect bad indents", async function () {
    const template = `
<div>
<div></div>
</div>
<div>
{{#if x}}
{{test}}
{{/if}}
</div>
   `;
    const messages = await linter.verify({
      source: template,
      filePath: "my-component.hbs",
    });
    expect(messages).toHaveLength(4);
    expect(messages).toMatchInlineSnapshot(
      "",
      `
      [
        {
          "column": 1,
          "endColumn": 1,
          "endLine": 3,
          "fix": {
            "range": [
              7,
              7,
            ],
            "text": "  ",
          },
          "line": 3,
          "message": "Expected indentation of 2 spaces but found 0.",
          "messageId": "wrongIndentation",
          "nodeType": "punctuator",
          "ruleId": "ember-template-lint/block-indentation",
          "severity": 2,
        },
        {
          "column": 1,
          "endColumn": 1,
          "endLine": 6,
          "fix": {
            "range": [
              32,
              32,
            ],
            "text": "  ",
          },
          "line": 6,
          "message": "Expected indentation of 2 spaces but found 0.",
          "messageId": "wrongIndentation",
          "nodeType": "punctuator",
          "ruleId": "ember-template-lint/block-indentation",
          "severity": 2,
        },
        {
          "column": 1,
          "endColumn": 1,
          "endLine": 7,
          "fix": {
            "range": [
              42,
              42,
            ],
            "text": "    ",
          },
          "line": 7,
          "message": "Expected indentation of 4 spaces but found 0.",
          "messageId": "wrongIndentation",
          "nodeType": "punctuator",
          "ruleId": "ember-template-lint/block-indentation",
          "severity": 2,
        },
        {
          "column": 1,
          "endColumn": 1,
          "endLine": 8,
          "fix": {
            "range": [
              51,
              51,
            ],
            "text": "  ",
          },
          "line": 8,
          "message": "Expected indentation of 2 spaces but found 0.",
          "messageId": "wrongIndentation",
          "nodeType": "punctuator",
          "ruleId": "ember-template-lint/block-indentation",
          "severity": 2,
        },
      ]
    `
    );
  });

  it('should fix bad indents in hbs', async function () {
    const template = `
<div>
<div></div>
<div>
some text
    abc
asd
</div>
</div>
<div>
<img/>
<div></div>
{{#if x}}
{{test}}
some text
  abc
  asd
{{/if}}
</div>
<pre>
  this should stay
      the same
</pre>
<pre>
    <div>
    {{test}}
    {{#if}}
    {{a}}
    {{/if}}
    sadsa
    </div>
  this should stay
      the same
</pre>
   `;
    const fixedTemplate = `
<div>
  <div></div>
  <div>
    some text
    abc
    asd
  </div>
</div>
<div>
  <img/>
  <div></div>
  {{#if x}}
    {{test}}
    some text
    abc
    asd
  {{/if}}
</div>
<pre>
  this should stay
      the same
</pre>
<pre>
    <div>
    {{test}}
    {{#if}}
    {{a}}
    {{/if}}
    sadsa
    </div>
  this should stay
      the same
</pre>
   `;
    const messages = await linter.verifyAndFix({
      source: template,
      filePath: 'my-component.hbs',
    });
    expect(messages[0].output).toEqual(fixedTemplate);
  });

  it('should fix bad indents in gts', async function () {
    const template = `
    <template>
<div>
<div></div>
<div>
some text
    abc
asd
</div>
</div>
<div>
<img/>
<div></div>
{{#if x}}
{{test}}
some text
  abc
  asd
{{/if}}
</div>
<pre>
  this should stay
      the same
</pre>
<pre>
    <div>
    {{test}}
    {{#if}}
    {{a}}
    {{/if}}
    sadsa
    </div>
  this should stay
      the same
</pre>
</template>
   `;
    const fixedTemplate = `
<template>
  <div>
    <div></div>
    <div>
      some text
      abc
      asd
    </div>
  </div>
  <div>
    <img/>
    <div></div>
    {{#if x}}
      {{test}}
      some text
      abc
      asd
    {{/if}}
  </div>
  <pre>
  this should stay
      the same
  </pre>
  <pre>
    <div>
    {{test}}
    {{#if}}
    {{a}}
    {{/if}}
    sadsa
    </div>
  this should stay
      the same
  </pre>
</template>
   `;
    const messages = await linter.verifyAndFix({
      source: template,
      filePath: 'my-component.gts',
    });
    expect(messages[0].output).toEqual(fixedTemplate);
  });
});
