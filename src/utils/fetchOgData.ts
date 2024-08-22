import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.40/deno-dom-wasm.ts";

import site, { makeAbsoluteUrl, makeOgImageUrl } from "../../_config.ts";

const CACHE_PATH = "./src/_data/ogCache.json";

export interface OGData {
  title: string;
  description: string;
  image: string;
  favicon: string;
  hostname: string;
  url: string;
}

export const makeIconUrl = (icon: string) =>
  makeAbsoluteUrl(`/img/icons/${icon}.svg`);

const fetchLocalData = (url: string): Promise<OGData> => {
  const uniformUrl = url.endsWith("/") ? url : `${url}/`;

  const page = site.pages.find((page) => page.data.url === uniformUrl);

  if (!page) throw new Error(`Preview Error (page not found): ${uniformUrl}`);

  return Promise.resolve({
    title: page!.data.title!,
    description: page!.data.description,
    image: makeOgImageUrl(page!.data.type),
    favicon: makeIconUrl(page!.data.type || "lead-with-joy"),
    hostname: "cvburgess.com",
    url: makeAbsoluteUrl(uniformUrl),
  });
};

const getCache = async (): Promise<Record<string, OGData>> => {
  const cacheData = await Deno.readTextFile(CACHE_PATH);
  return JSON.parse(cacheData);
};

const findInCache = async (url: string): Promise<OGData> => {
  const cache = await getCache();
  return cache[url];
};

// Write data to file and use `deno fmt` to make it pretty
const saveToCache = async (data: object) => {
  const cache = await getCache();

  await Deno.writeTextFile(CACHE_PATH, JSON.stringify({ ...cache, ...data }));

  const command = new Deno.Command("deno", {
    args: ["fmt", "src/_data/ogCache.json"],
  });
  await command.output();
};

const fetchRemoteData = async (url: string): Promise<OGData> => {
  const cacheHit = await findInCache(url);

  if (cacheHit) return cacheHit;

  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status}: ${r.url}`);

  const html = await r.text();
  const doc = new DOMParser().parseFromString(html, "text/html")!;

  const selectors = {
    title: "meta[property='og:title']",
    description: "meta[property='og:description']",
    image: "meta[property='og:image']",
  };

  const getData = (prop: string) => {
    const node = doc.querySelector(prop);
    return node?.getAttribute("content") ?? "";
  };

  const data = {
    title: getData(selectors.title),
    description: getData(selectors.description),
    image: getData(selectors.image),
    favicon:
      `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=256`,
    hostname: new URL(url).hostname,
    url,
  };

  await saveToCache({ [url]: data });

  return data;
};

export const fetchOgData = (url: string): Promise<OGData> => {
  return url.startsWith("http") ? fetchRemoteData(url) : fetchLocalData(url);
};
