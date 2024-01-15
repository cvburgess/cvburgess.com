import { Page } from "lume/core/file.ts";
import { renderToString } from "npm:preact-render-to-string@6.3.1";

import { fetchOgData } from "./fetchOgData.ts";
import { htmlToElement } from "./htmlToElement.ts";
import Preview from "../_components/Preview.tsx";

export const processPreviews = (pages: Page[]) =>
  pages.forEach(async (page: Page) => {
    const elements = page.document?.querySelectorAll("a") ?? [];
    for (const element of elements) {
      const shouldHydratePreview = element.textContent === "preview";

      if (shouldHydratePreview) {
        const url = element.getAttribute("href")!;
        const props = await fetchOgData(url);
        const html = renderToString(Preview(props));
        const newElement = htmlToElement(html, page.document!);

        element.parentNode!._replaceWith(newElement);
      }
    }
  });
