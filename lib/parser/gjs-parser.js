const gts = require('ember-template-tag');
const babelParser = require('@babel/eslint-parser');
const typescriptParser = require('@typescript-eslint/parser');
const { preprocessGlimmerTemplates, convertAst } = require('./utils');


module.exports = {
  parseForESLint(code, options, isTypescript) {
    let jsCode = code;
    const info = gts.transformForLint({
      input: jsCode,
      templateTag: 'template',
      explicitMode: true,
      linterMode: true,
    });
    jsCode = info.output;

    let result = null;
    result = isTypescript
      ? typescriptParser.parseForESLint(jsCode, { ...options, ranges: true })
      : babelParser.parseForESLint(jsCode, { ...options, ranges: true, requireConfigFile: false });
    if (!info.replacements?.length) {
      info.replacements = [];
    }
    const preprocessedResult = preprocessGlimmerTemplates(info, code);
    const { templateVisitorKeys } = preprocessedResult;
    const visitorKeys = { ...result.visitorKeys, ...templateVisitorKeys };
    result.isTypescript = isTypescript;
    result.code = code;
    convertAst(result, preprocessedResult, visitorKeys);
    return { ...result, visitorKeys };
  },
};
