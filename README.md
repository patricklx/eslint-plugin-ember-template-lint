# eslint-plugin-hbs-template

Provide linting for hbs templates files

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

Add `hbs` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

### 2. Modify your `.eslintrc.js`

```js
// .eslintrc.js
// optional:
require('eslint-plugin-ember-template-lint/lib/ember-teplate-lint/config').registerPlugin('ember-template-lint-plugin-prettier');

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:ember-template-lint/recommended',
    //optional:
    'plugin:ember-template-lint/ember-template-lint-plugin-prettier:recommended'
  ]
};
```




