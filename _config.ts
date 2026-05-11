import lume from "lume/mod.ts";
import { Page } from "lume/core/file.ts";

import pagefind from "lume/plugins/pagefind.ts";

import anchor from "npm:markdown-it-anchor";
import { container } from "npm:@mdit/plugin-container";

const BASE_URL = "https://cvburgess.com";
const PRIMARY_COLOR = "#ffbc51";

const site = lume({
  location: new URL(BASE_URL),
  src: "./src",
});

site.use(pagefind());

// --------- PREPROCESS FILES ---------- //

// Enable "edit on GitHub" links with 11ty-style polyfill
site.preprocess("*", (pages: Page[]) => {
  pages.forEach((page) => page.data.inputPath = page.src.path + page.src.ext);
});

// --------- MARKDOWN PLUGINS ---------- //

site.hooks.addMarkdownItPlugin(anchor, {
  level: 2,
  permalink: anchor.permalink.headerLink(),
});

site.hooks.addMarkdownItPlugin(container, {
  name: "note",
  openRender: () =>
    `<div class="callout"><p class="callout-title">HEADS UP!</p>`,
});

// --------- PUBLIC FILES ---------- //

site.add("css");
site.add("img");

// --------- ASSET PROCESSING ---------- //

// Replace css-style variables with their values in SVGs
// When the site color changes, the SVGs update automatically
site.process([".svg"], (pages) => {
  for (const page of pages) {
    const text = typeof page.content === "string"
      ? page.content
      : new TextDecoder().decode(page.content as Uint8Array);
    page.content = text.replace(/--primary/gi, PRIMARY_COLOR);
  }
});

// --------- FILTERS ---------- //

site.filter("log", (value) => console.log(value));

export const makeAbsoluteUrl = (path: string) => `${BASE_URL}${path}`;

site.filter("absoluteUrl", makeAbsoluteUrl);

export const makeOgImage = (image = "default") =>
  makeAbsoluteUrl(`/img/og/og-${image}.jpg`);

site.filter("og", makeOgImage);

site.filter("hostname", (url: string) => new URL(url).hostname);

site.filter("localDate", (value: string) => {
  const date = new Date(value);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
});

// Convert an array of tags to an single search term
// [Article Title, ["foo", "bar", "buzz lightyear"]] => "title!='Article Title' layout=post.vto 'foo'|'bar'|'buzz lightyear'"
// https://lume.land/plugins/search/#searching-pages
const handleSpaces = (tags: string[]) =>
  tags.map((tag) => tag.includes(" ") ? `'${tag}'` : tag);

site.filter(
  "searchTags",
  ([title, tags]: [string, string[]]) =>
    `title!='${title}' layout=post.vto ${handleSpaces(tags).join("|")}`,
);

export default site;
