"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = printResults;
var _loadFormatter = require("../formatters/load-formatter.js");
var _writeOutputFile = require("./write-output-file.js");
// The following disable should be safe. This particular rule does not need to identify
// cycles that are broken when using dynamic imports. See https://github.com/import-js/eslint-plugin-import/issues/2265
// eslint-disable-next-line import/no-cycle

async function printResults(results, {
  options,
  todoInfo,
  config
}) {
  let hasErrors = results.errorCount > 0;
  let hasWarnings = results.warningCount > 0;
  let hasTodos = options.includeTodo && results.todoCount;
  let hasUpdatedTodos = options.updateTodo;
  let formatter = (0, _loadFormatter.loadFormatter)({
    ...options,
    config,
    hasResultData: hasErrors || hasWarnings || hasTodos || hasUpdatedTodos
  });
  if (typeof formatter.format === 'function') {
    let output = await formatter.format(results, todoInfo);
    if ('outputFile' in options && options.outputFile !== undefined) {
      let outputPath = _writeOutputFile(output, formatter.defaultFileExtension || 'txt', options);
      // eslint-disable-next-line no-console
      console.log(`Report written to ${outputPath}`);
    } else {
      // eslint-disable-next-line no-console
      console.log(output);
    }
  } else {
    // support legacy formatters
    formatter.print(results, todoInfo);
  }
}
module.exports = exports.default;