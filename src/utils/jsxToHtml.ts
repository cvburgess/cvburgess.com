import { React, ReactDOMServer } from "lume/deps/react.ts";

export const jsxToHtml = async (
  component: React.ReactNode,
  props: object,
): Promise<string> =>
  ReactDOMServer.renderToStaticMarkup(
    React.createElement(component, props),
  );
