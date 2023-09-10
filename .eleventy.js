const markdownIt = require("markdown-it");
const anchor = require("markdown-it-anchor");

const PRIMARY_COLOR = "#ff9f7c";

module.exports = function (config) {
  // Configure public files
  config.addPassthroughCopy("src/**/*.jpg");
  config.addPassthroughCopy("src/**/*.jpeg");
  config.addPassthroughCopy("src/**/*.png");
  config.addPassthroughCopy("src/css");

  config.addTemplateFormats("svg");

  config.addExtension("svg", {
    outputFileExtension: "svg",
    compile: async (inputContent) => {
      // Replace any instances of cloud with butt
      let output = inputContent.replace(/--primary/gi, PRIMARY_COLOR);

      return async () => {
        return output;
      };
    },
  });

  // Configure Markdown parsing
  const markdownItOptions = { html: true };
  const anchorOptions = { level: 2, permalink: anchor.permalink.headerLink() };

  const md = new markdownIt(markdownItOptions).use(anchor, anchorOptions);

  config.amendLibrary("md", (mdLib) => mdLib.use(anchor, anchorOptions));

  // Configure shortcodes
  config.addPairedShortcode(
    "section",
    (content) => `<section>${md.render(content)}</section>`
  );

  config.addShortcode("button", (text, link, classes) => {
    const isInternal = link.startsWith("/");
    // const arrow = isInternal ? "→" : "↗";
    const target = link.startsWith("/")
      ? `target="_self"`
      : `target="_blank" rel="noopener"`;
    return `<div class="button ${
      classes || ""
    }"><a href="${link}" ${target}><span>${text}</span></a></div>`;
  });

  // Configure filters
  config.addFilter("absoluteUrl", (path) => `https://cvburgess.com${path}`);

  config.addFilter("log", (value) => {
    console.log(value);
  });

  config.addFilter("localDate", (value) => {
    const date = new Date(value);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  });

  config.addFilter("episodeNumber", (value = 0) => {
    const leadingZeros = "0".repeat(3 - value.toString().length);
    return `${leadingZeros}${value}`;
  });

  return {
    dir: { input: "src" },
    markdownTemplateEngine: "njk",
  };
};
