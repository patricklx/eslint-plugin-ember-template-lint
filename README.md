# eslint-plugin-hbs-template

Provide linting (via [ember-template-lint](https://github.com/ember-template-lint/ember-template-lint)) for hbs templates files, template string literals and gts,gjs (also enables eslint to run its other rules in gts/gjs)
* no extra config file needed

* no need to run extra tool for linting

* no need to run extra tool to fix lint issues

* no need to implement & maintain editor support for ember-template-lint

* it also has the advantage that it can know the scope for some template-lint rules, like no-implicit-this, and remove those messages

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-ember-template-lint`:

```
$ npm install eslint-plugin-ember-template-lint --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-ember-template-lint` globally.

## Usage

Add `ember-template-lint` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

### 2. Modify your `.eslintrc.js`

you can use the presets from here https://github.com/ember-template-lint/ember-template-lint#presets
like this:
`plugin:ember-template-lint/<preset>`

to just use the `.template-lintrc.js` config file just use
`plugin:ember-template-lint/config`

to load ember-template-lint plugins in eslinrc you need to manually register them:
```js
require('eslint-plugin-ember-template-lint/lib/ember-teplate-lint/config').registerPlugin('ember-template-lint-plugin-prettier');
```

## IMPORTANT
Do NOT set parser to anything in your .eslintrc.js as it will override the parser from here

for typescript parser you can extend its base config, then it will work correctly

```js
// .eslintrc.js
// optional:
require('eslint-plugin-ember-template-lint/lib/ember-teplate-lint/config').registerPlugin('ember-template-lint-plugin-prettier');


module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/base',
    'plugin:ember-template-lint/config',
    'plugin:ember-template-lint/recommended',
    //optional:
    'plugin:ember-template-lint/ember-template-lint-plugin-prettier:recommended'
  ]
};
```




