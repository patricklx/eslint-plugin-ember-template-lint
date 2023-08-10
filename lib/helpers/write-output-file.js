"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = writeOutputFile;
var _dateFns = require("date-fns");
var _nodeFs = _interopRequireDefault(require("node:fs"));
var _nodePath = _interopRequireDefault(require("node:path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const today = new Date();
const DATE_FORMAT = (0, _dateFns.format)(today, 'yyyy-MM-dd-HH_mm_ss');
const DEFAULT_OUTPUT_FILENAME = `ember-template-lint-report-${DATE_FORMAT}`;
function writeOutputFile(contents, extension, options) {
  let outputPath = getOutputPath(extension, options);
  _nodeFs.default.writeFileSync(outputPath, contents, {
    encoding: 'utf-8'
  });
  return outputPath;
}
function getOutputPath(extension, options) {
  let outputFile = options.outputFile === true || !options.outputFile ? `${DEFAULT_OUTPUT_FILENAME}.${extension}` : options.outputFile;
  let outputPath = _nodePath.default.isAbsolute(outputFile) ? outputFile : _nodePath.default.posix.join(options.workingDirectory, outputFile);
  let dir = _nodePath.default.dirname(outputPath);
  if (!_nodeFs.default.existsSync(dir)) {
    _nodeFs.default.mkdirSync(dir, {
      recursive: true
    });
  }
  return outputPath;
}