const CACHE = new Map();

const hbs = {
  CACHE,
  preprocess: (text, filename) => {
    CACHE[filename] = text;
    return [{
      filename,
      text: ''
    }];
  },
  postprocess: (messages) => {
    return messages.flat();
  },
  supportsAutofix: true,
};

module.exports = hbs;
