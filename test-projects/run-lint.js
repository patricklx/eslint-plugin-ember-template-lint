const ESLint = require('eslint');
const fs = require('fs');

const lint = new ESLint.ESLint()

async function run() {
  const r = await lint.lintText(fs.readFileSync('./gjs/src/placeholer.gjs').toString(), {
    filePath: '/home/patrick/projects/eslint-plugin-ember-template-lint/test-projects/gjs/src/placeholer.gjs',
  });

  console.log(r[0].messages);
}

run();

