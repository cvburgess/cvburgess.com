import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

interface OGData {
  title: string;
  subtitle: string;
  image: string;
  hostname: string;
  url: string;
}

const CACHE_PATH = "./src/_data/ogCache.json";

const cacheData = await Deno.readTextFileSync(CACHE_PATH);
const cache = JSON.parse(cacheData);

const findInCache = (url: string) => cache?.[url];
const saveToCache = (data: object) =>
  Deno.writeTextFile(CACHE_PATH, JSON.stringify(data));

export const fetchOgData = async (url: string): Promise<OGData> => {
  const cacheHit = findInCache(url);
  if (cacheHit) return { ...cacheHit, url };

  const r = await fetch(url);
  const html = await r.text();

  const doc = new DOMParser().parseFromString(html, "text/html")!;

  const selectors = {
    title: "meta[property='og:title']",
    subtitle: "meta[property='og:description']",
    image: "meta[property='og:image']",
  };

  const getData = (prop: string) => {
    const node = doc.querySelector(prop);
    return node?.getAttribute("content") ?? "";
  };

  const data = {
    title: getData(selectors.title),
    subtitle: getData(selectors.subtitle),
    image: getData(selectors.image),
    hostname: new URL(url).hostname,
    url,
  };

  await saveToCache({ ...cache, [url]: data });

  return data;
};
