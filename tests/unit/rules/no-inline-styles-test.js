"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function mapBadStyleExampleToTestRule(inlineStyle) {
  return {
    template: `<div ${inlineStyle}></div>`,
    result: {
      message: 'elements cannot have inline styles',
      source: inlineStyle,
      line: 1,
      column: 5,
      endColumn: inlineStyle.length + 5,
      endLine: 1
    }
  };
}
function mapBadStyleExampleToTestRuleWithConfig(inlineStyle, config) {
  const testCase = mapBadStyleExampleToTestRule(inlineStyle);
  testCase.config = config;
  return testCase;
}
(0, _ruleTestHarness.default)({
  name: 'no-inline-styles',
  config: true,
  good: ['<div></div>', '<span></span>', '<ul class="dummy"></ul>', '<div style={{foo}}></div>', '<div style={{html-safe (concat "background-image: url(" url ")")}}></div>'],
  bad: [...['style="width: 100px"', 'style="{{foo}} {{bar}}"', 'style', 'style=""', 'style="color:blue;margin-left:30px;"'].map(mapBadStyleExampleToTestRule), mapBadStyleExampleToTestRuleWithConfig('style={{foo}}', {
    allowDynamicStyles: false
  })]
});