import { Page } from "lume/core.ts";

import { fetchOgData } from "./fetchOgData.ts";
import { jsxToHtml } from "./jsxToHtml.ts";
import { htmlToElement } from "./htmlToElement.ts";
import Preview from "../_components/preview.tsx";

export const processPreviews = async (page: Page) => {
  const elements = page.document?.querySelectorAll("a") ?? [];
  for (const element of elements) {
    const shouldHydratePreview = element.textContent === "preview";

    if (shouldHydratePreview) {
      const url = element.getAttribute("href");
      const props = await fetchOgData(url);
      const html = await jsxToHtml(Preview, props);
      const newElement = htmlToElement(html, page.document!);

      element.parentNode!._replaceWith(newElement);
    }
  }
};
