# eslint-plugin-hbs-template

Provide linting for hbs templates files

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-ember-template`:

```
$ npm install eslint-plugin-ember-template --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-ember-template` globally.

## Usage

Add `hbs` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

### 2. Modify your `.eslintrc.js`

```js
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:ember-template/recommended'
  ]
};
```




