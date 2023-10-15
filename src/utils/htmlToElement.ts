import { Element, HTMLDocument } from "lume/deps/dom.ts";

export const htmlToElement = (
  html: string,
  document: HTMLDocument,
): Element => {
  const template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
};