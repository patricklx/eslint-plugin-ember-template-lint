

module.exports = {
  preprocess: (text, filename) => {
    return [{text: text, filename}];
  },
  postprocess: (messages) => {
    return messages.flat();
  },
  supportsAutofix: true
};
