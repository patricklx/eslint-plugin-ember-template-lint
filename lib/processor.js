const plugin = require('eslint-plugin-ember')

const TEXT_CACHE = {};

module.exports = {
  TEXT_CACHE,
  preprocess: (text, filename) => {
    return [{text: text, filename}];
  },
  postprocess: (messages, filename) => {
    return messages.flat();
  },
  supportsAutofix: true
}
