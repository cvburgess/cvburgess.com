import { Page } from "lume/core/file.ts";
import { renderToString } from "npm:preact-render-to-string@6.3.1";

import { fetchOgData } from "./fetchOgData.ts";
import { htmlToElement } from "./htmlToElement.ts";
import Preview from "../_components/Preview.tsx";

const processPreview = async (page: Page) => {
  const elements = page.document?.querySelectorAll("a") ?? [];
  for (const element of elements) {
    const shouldHydratePreview = element.textContent === "preview";

    if (shouldHydratePreview) {
      const url = element.getAttribute("href")!;
      const props = await fetchOgData(url);
      const html = renderToString(Preview(props));
      const newElement = htmlToElement(html, page.document!);

      element.parentElement!.replaceWith(newElement);
    }
  }
};

export const processPreviews = async (pages: Page[]) => {
  await Promise.all(pages.map(processPreview));
};
