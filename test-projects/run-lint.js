const ESLint = require('eslint');
const fs = require('fs');
const path = require('path');



async function run(filename) {
  const lint = new ESLint.ESLint()
  const r = await lint.lintText(fs.readFileSync(filename).toString(), {
    filePath: path.resolve(filename),
  });

  console.log(filename)
  console.log(r[0].messages);
}

run('./gjs/src/placeholer.gjs');
run('./gts/src/await.gts');
run('./gjs/src/placeholer.gjs');

