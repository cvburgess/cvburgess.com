import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

interface OGData {
  title: string;
  subtitle: string;
  image: string;
  hostname: string;
}

export const fetchOgData = async (url: string): Promise<OGData> => {
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

  const data = Object.fromEntries(
    Object.entries(selectors).map((
      [key, selector],
    ) => [key, getData(selector)]),
  );

  return {
    title: data.title,
    subtitle: data.subtitle,
    image: data.image,
    hostname: new URL(url).hostname,
  };
};
