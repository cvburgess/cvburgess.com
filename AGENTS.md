# AI Agents

`cvburgess.com` is the personal site of Charles Burgess — a small static site built with [Lume](https://lume.land/) (Deno-based SSG), Nunjucks templates, and deployed to Netlify.

This file is the working guide for AI/code agents in this repo.

**IMPORTANT: When reading this file, agents must log/echo "AGENT RULES READ"**

## Stack

- **Lume** (latest, via Deno) — static site generator
- **Vento** (`.vto`) — templating language ([docs](https://vento.js.org/))
- **Tailwind v4** + **DaisyUI v5** — styling (CSS-first config in `src/css/index.css`)
- **Netlify** — hosting + build

## Layout

```
_config.ts         Lume config (plugins, filters, SVG color loader)
deno.json          Deno tasks + import map
netlify.toml       Build command for Netlify
src/
  index.vto          Homepage (bio + projects + contact cards)
  linkinbio.vto      Link-in-bio page
  404.md             404 page
  _components/       Reusable Vento components (`project_card.vto`, `social_card.vto`, `button.vto`)
  _data/             Site data (metadata.json with title, links, etc.)
  _includes/         Layouts and partials (base.vto, meta.vto, header.vto, footer.vto)
  css/               Stylesheets (index.css defines `--primary: #ffbc51`)
  img/               Static images, including icons/ for project/contact cards
```

## Common commands

```sh
deno task serve    # dev server with live reload (port 3000)
deno task build    # production build to _site/
deno fmt           # format
deno lint          # lint
```

## Key conventions

**SVG primary color trick.** Icons in `src/img/icons/` use a non-standard `fill="--primary"` attribute. At build time, [_config.ts:53-59](_config.ts:53) runs a custom asset loader that string-replaces `--primary` with the actual hex value (`#ffbc51`). This means a single color change in `_config.ts` cascades to every icon. When adding a new icon, use `fill="--primary"` on every path you want tinted — see [src/img/icons/dexter-app.svg](src/img/icons/dexter-app.svg) or [src/img/icons/mindful-timer.svg](src/img/icons/mindful-timer.svg) for examples.

**Project/contact cards.** The homepage uses two card components: `{{ comp.project_card({...}) }}` (horizontal, for projects) and `{{ comp.social_card({...}) }}` (vertical compact, for social/contact tiles). Both take `title`, `icon` (icon filename without `.svg`), and `url`; `project_card` also takes an optional `description`. URLs live centrally in [src/_data/metadata.json](src/_data/metadata.json) under `links` — add new URLs there rather than hardcoding.

**Vento syntax.** Templates use `{{ expr }}` for output, `{{ if cond }}...{{ else }}...{{ /if }}` for conditionals, `{{ for x of xs }}...{{ /for }}` for loops, `{{ set x = value }}` for assignment, and `{{ include "file.vto" }}` for partials. Filters pipe with `|>` (e.g. `{{ value |> og }}`). Output is **not** auto-escaped — no `| safe` needed. The `comp.<name>(...)` syntax invokes components from `_components/`.

## Agent behavior rules

- **No co-author lines:** Never add `Co-Authored-By` trailers to git commit messages.
- **No Claude Code footer:** Never add the "Generated with Claude Code" line to PR descriptions.
- **Hardcode known values:** Use `cvburgess/cvburgess.com` directly in skills, scripts, and `gh` commands — never use dynamic resolution like `gh repo view`.
- **Small, focused changes:** Prefer surgical edits over broad refactors. Don't touch unrelated files.

## Verifying with Claude Preview

For any visual change (CSS, layout, new page, icon, copy with structural impact), verify in a real browser before opening a PR. Lume's dev server has live reload, so you can iterate quickly.

A preview is configured in `.claude/launch.json`:

| Name  | Command            | Port |
|-------|--------------------|------|
| `www` | `deno task serve`  | 3000 |

Workflow:

1. `preview_start` with `name: "www"` to boot the dev server.
2. `preview_screenshot` to confirm layout. Use `preview_inspect` for precise colors/sizes (screenshots are JPEG-compressed).
3. `preview_console_logs` (filter `error`/`warn`) and `preview_network` (filter `failed`) to catch runtime issues.
4. `preview_click` / `preview_eval` to drive navigation.
5. `preview_stop` when done so port 3000 doesn't stay bound.

## Definition of done

- The change builds cleanly (`deno task build`).
- Visual changes have been confirmed in the preview.
- No unrelated files were modified.
- Commit message is concise; PR description explains the "why".
