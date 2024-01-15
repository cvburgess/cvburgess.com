import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.40/deno-dom-wasm.ts";

interface OGData {
  title: string;
  description: string;
  image: string;
  hostname: string;
  url: string;
}

const CACHE_PATH = "./src/_data/ogCache.json";

const cacheData = await Deno.readTextFileSync(CACHE_PATH);
const cache = JSON.parse(cacheData);

const findInCache = (url: string) => cache?.[url];

// Write data to file and use `deno fmt` to make it pretty
const saveToCache = async (data: object) => {
  await Deno.writeTextFile(CACHE_PATH, JSON.stringify(data));

  const command = new Deno.Command("deno", {
    args: ["fmt", "src/_data/ogCache.json"],
  });
  await command.output();
};

export const fetchOgData = async (url: string): Promise<OGData> => {
  const cacheHit = findInCache(url);
  if (cacheHit) return { ...cacheHit, url };

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
    hostname: new URL(url).hostname,
    url,
  };

  await saveToCache({ ...cache, [url]: data });

  return data;
};
