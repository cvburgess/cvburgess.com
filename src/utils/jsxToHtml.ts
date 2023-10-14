import { React, ReactDOMServer } from "lume/deps/react.ts";

export const jsxToHtml = (
  component: React.ReactNode,
  props: object,
): string =>
  ReactDOMServer.renderToStaticMarkup(
    React.createElement(component, props),
  );
