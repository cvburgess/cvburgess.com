const CleanCSS = require("clean-css");
const Image = require("@11ty/eleventy-img");
const markdownIt = require("markdown-it");

const imageShortcode = async (src, alt, sizes) => {
  let metadata = await Image(src, {
    formats: ["jpeg", "webp", "png", "svg"],
    outputDir: "./_site/img/",
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
};

module.exports = function (config) {
  config.markdownTemplateEngine = "njk";

  config.addPassthroughCopy("img");
  config.addPassthroughCopy("css");

  const md = new markdownIt({ html: true });
  config.addPairedShortcode("markdown", (content) => md.render(content));
  config.addPairedShortcode(
    "section",
    (content) => `<section>${md.render(content)}</section>`
  );

  config.addNunjucksAsyncShortcode("image", imageShortcode);
  config.addLiquidShortcode("image", imageShortcode);
  config.addJavaScriptFunction("image", imageShortcode);

  config.addShortcode("button", (text, link, classes) => {
    const isInternal = link.startsWith("/");
    // const arrow = isInternal ? "→" : "↗";
    const target = link.startsWith("/")
      ? `target="_self"`
      : `target="_blank" rel="noopener"`;
    return `<div class="button ${
      classes || ""
    }"><a href="${link}" ${target}><span>${text} →</span></a></div>`;
  });

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

  // config.addFilter('cssmin', (code) => {
  //   return new CleanCSS({}).minify(code).styles;
  // });
};
