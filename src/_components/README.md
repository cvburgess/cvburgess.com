# Components

[Lume docs for components](https://lume.land/docs/core/components/)

The `_components` directory is a special directory in Lume.

With Lume, you can write components in any language and have them be available
in your main templating language for use in page authoring.

For me, that means being able to write components in React/JSX and use them in
Nunjucks templates.

## Limitations

**Reminder**: This is a static site, not an interactive SPA! Interactivity
doesn't often work as expected if at all.

Lume components **_cannot be async_** (await data), and cannot leverage related
React features like Suspense.

## Using components

If you create a component in this directory named `button.jsx` with the
following code:

```jsx
export default function ({ text }) {
  return (
    <Button className="button">
      {text}
    </Button>
  );
}
```

You can reference it elsewhere automatically with:

```hbs
<h1>Welcome to my site.</h1>
{{ comp.button({ text: "Login" }) | safe }}
```

## Automatic components

Some components (like `preview`) are not meant to be used directly (though they
can be).

Instead, these are used with Lume's processing hooks to automatically "hydrate"
some markdown or HTML element into a rich component.

In the case of `preview` it will take a link with the text "preview" and swap it
for a rich social-media-like card preview.

```md
My _fancy_ paragraph with **normal** markdown styling.

[preview](https://brenebrown.com/book/dare-to-lead/")

More text that will appear _after_ the automatically hydrated `preview`
component.
```

The above will be automatically extracted and converted to a component following
the logic in `_config.ts`.
