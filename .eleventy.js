const anchor = require("markdown-it-anchor");
const { container } = require("@mdit/plugin-container");

const PRIMARY_COLOR = "#ffbc51";
const BASE_URL = "https://cvburgess.com";

const makeAbsoluteUrl = (path) => `${BASE_URL}${path}`;
const hydrateCssVariables = (str) => {
  str.replace(/--primary/gi, PRIMARY_COLOR);
  return str;
};

module.exports = function (config) {
  // --------- PUBLIC FILES ---------- //

  config.addPassthroughCopy("src/**/*.jpg");
  config.addPassthroughCopy("src/**/*.jpeg");
  config.addPassthroughCopy("src/**/*.png");
  config.addPassthroughCopy("src/css");

  // --------- FILE PARSERS ---------- //

  config.addTemplateFormats("svg");
  config.addExtension("svg", {
    outputFileExtension: "svg",
    compile: (inputContent) => async () => hydrateCssVariables(inputContent),
  });

  // --------- MARKDOWN PARSERS ---------- //

  const anchorOptions = { level: 2, permalink: anchor.permalink.headerLink() };
  const containerOptions = {
    name: "note",
    openRender: () =>
      `<div class="callout"><p class="callout-title">HEADS UP!</p>`,
  };

  config.amendLibrary("md", (mdLib) => {
    mdLib.use(anchor, anchorOptions);
    mdLib.use(container, containerOptions);
    return mdLib;
  });

  // --------- SHORTCODES ---------- //

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

  // --------- FILTERS ---------- //

  config.addFilter("absoluteUrl", makeAbsoluteUrl);

  config.addFilter("og", (image = "default") =>
    makeAbsoluteUrl(`/img/og/og-${image}.jpg`)
  );

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

  // --------- 11TY CONFIG ---------- //

  return {
    dir: { input: "src" },
    markdownTemplateEngine: "njk",
  };
};
