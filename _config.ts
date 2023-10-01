import lume from "lume/mod.ts";
import { Data } from "lume/core.ts";

import anchor from "npm:markdown-it-anchor";
import { container } from "npm:@mdit/plugin-container";

const BASE_URL = "https://cvburgess.com";
const PRIMARY_COLOR = "#ffbc51";

const site = lume({ location: new URL(BASE_URL), src: "./src" });

// --------- MARKDOWN PLUGINS ---------- //

const anchorOptions = { level: 2, permalink: anchor.permalink.headerLink() };
const containerOptions = {
  name: "note",
  openRender: () =>
    `<div class="callout"><p class="callout-title">HEADS UP!</p>`,
};

site.hooks.addMarkdownItPlugin(anchor, anchorOptions);
site.hooks.addMarkdownItPlugin(container, containerOptions);

// --------- PUBLIC FILES ---------- //

site.copy([".jpg", ".jpeg", ".gif", ".png", ".ico", ".webmanifest", ".css"]);
// TODO: Consider using  site.copyRemainingFiles();  instead

// --------- CUSTOM FILE LOADERS ---------- //

async function svgLoader(path: string): Promise<Data> {
  const content = await Deno.readTextFile(path);
  content.replace(/--primary/gi, PRIMARY_COLOR);
  return { content };
}

site.loadAssets([".svg"], svgLoader);

// --------- FILTERS ---------- //

const makeAbsoluteUrl = (path: string) => `${BASE_URL}${path}`;

site.filter("absoluteUrl", makeAbsoluteUrl);

site.filter(
  "og",
  (image = "default") => makeAbsoluteUrl(`/img/og/og-${image}.jpg`),
);

site.filter("hostname", (url: string) => new URL(url).hostname);

site.filter("localDate", (value: string) => {
  const date = new Date(value);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
});

site.filter("episodeNumber", (value = 0) => {
  const leadingZeros = "0".repeat(3 - value.toString().length);
  return `${leadingZeros}${value}`;
});

site.helper("button", (text, link, classes) => {
  // const isInternal = link?.startsWith("/");
  // const arrow = isInternal ? "→" : "↗";
  const target = link?.startsWith("/")
    ? `target="_self"`
    : `target="_blank" rel="noopener"`;
  return `<div class="button ${
    classes || ""
  }"><a href="${link}" ${target}><span>${text}</span></a></div>`;
}, { type: "tag" });

export default site;
