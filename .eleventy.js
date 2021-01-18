const CleanCSS = require('clean-css');

module.exports = function(config) {
  config.addPassthroughCopy("img");
  config.addPassthroughCopy("css");
  // config.addFilter('cssmin', function(code) {
  //   return new CleanCSS({}).minify(code).styles;
  // });
};