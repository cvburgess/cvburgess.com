const CleanCSS = require("clean-css");
const markdownIt = require("markdown-it");

module.exports = function (config) {
  config.markdownTemplateEngine = "njk";

  config.addPassthroughCopy("img");
  config.addPassthroughCopy("css");

  const md = new markdownIt({ html: true });
  config.addPairedShortcode("markdown", (content) => md.render(content));
  config.addPairedShortcode("section", (content) => `<section>${md.render(content)}</section>`);
  
  config.addShortcode("button", (text, link) => `<div class="button"><a href="${link}"><span>${text}</span></a></div>`);

  // config.addFilter('cssmin', function(code) {
  //   return new CleanCSS({}).minify(code).styles;
  // });
};
