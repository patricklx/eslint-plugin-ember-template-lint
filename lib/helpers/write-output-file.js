"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = writeOutputFile;
var _dateFns = require("date-fns");
var _nodeFs = require("node:fs");
var _nodePath = require("node:path");
const today = new Date();
const DATE_FORMAT = (0, _dateFns.format)(today, 'yyyy-MM-dd-HH_mm_ss');
const DEFAULT_OUTPUT_FILENAME = `ember-template-lint-report-${DATE_FORMAT}`;
function writeOutputFile(contents, extension, options) {
  let outputPath = getOutputPath(extension, options);
  _nodeFs.writeFileSync(outputPath, contents, {
    encoding: 'utf-8'
  });
  return outputPath;
}
function getOutputPath(extension, options) {
  let outputFile = options.outputFile === true || !options.outputFile ? `${DEFAULT_OUTPUT_FILENAME}.${extension}` : options.outputFile;
  let outputPath = _nodePath.isAbsolute(outputFile) ? outputFile : _nodePath.posix.join(options.workingDirectory, outputFile);
  let dir = _nodePath.dirname(outputPath);
  if (!_nodeFs.existsSync(dir)) {
    _nodeFs.mkdirSync(dir, {
      recursive: true
    });
  }
  return outputPath;
}
module.exports = exports.default;