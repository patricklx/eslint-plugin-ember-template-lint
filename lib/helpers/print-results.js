"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _loadFormatter = require("../formatters/load-formatter.js");
var _writeOutputFile = _interopRequireDefault(require("./write-output-file.js"));
function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }
  if (!value || !value.then) {
    value = Promise.resolve(value);
  }
  return then ? value.then(then) : value;
}
function _empty() {}
function _invokeIgnored(body) {
  var result = body();
  if (result && result.then) {
    return result.then(_empty);
  }
}
function _async(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }
    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// The following disable should be safe. This particular rule does not need to identify
// cycles that are broken when using dynamic imports. See https://github.com/import-js/eslint-plugin-import/issues/2265
// eslint-disable-next-line import/no-cycle
const printResults = _async(function (results, {
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
  return _invokeIgnored(function () {
    if (typeof formatter.format === 'function') {
      return _await(formatter.format(results, todoInfo), function (output) {
        if ('outputFile' in options && options.outputFile !== undefined) {
          let outputPath = (0, _writeOutputFile.default)(output, formatter.defaultFileExtension || 'txt', options);
          // eslint-disable-next-line no-console
          console.log(`Report written to ${outputPath}`);
        } else {
          // eslint-disable-next-line no-console
          console.log(output);
        }
      });
    } else {
      // support legacy formatters
      formatter.print(results, todoInfo);
    }
  });
});
var _default = printResults;
exports.default = _default;