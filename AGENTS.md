# AI Agents

`cvburgess.com` is the personal site of Charles Burgess — a small static site built with [Lume](https://lume.land/) (Deno-based SSG), Nunjucks templates, and deployed to Netlify.

This file is the working guide for AI/code agents in this repo.

**IMPORTANT: When reading this file, agents must log/echo "AGENT RULES READ"**

## Stack

- **Lume** (`v2.0.3`, via Deno) — static site generator
- **Nunjucks** (`.njk`) — primary templating language for pages
- **JSX/Preact** — also enabled, used sparingly
- **Pagefind** — client-side search
- **Netlify** — hosting + build

## Layout

```
_config.ts         Lume config (plugins, filters, SVG color loader)
deno.json          Deno tasks + import map
netlify.toml       Build command for Netlify
src/
  index.njk          Homepage (bio + projects + contact cards)
  linkinbio.njk      Link-in-bio page
  search.njk         Search page
  404.md             404 page
  _components/       Reusable Nunjucks components (e.g. `comp.card`)
  _data/             Site data (metadata.json with title, links, etc.)
  _includes/         Layouts (base.njk, post.njk)
  css/               Stylesheets (index.css defines `--primary: #ffbc51`)
  img/               Static images, including icons/ for project/contact cards
posts/             (if present) Markdown blog posts
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

**Project/contact cards.** The homepage uses `{{ comp.card({...}) | safe }}` (Nunjucks call to the `card` component). Each card takes `title`, `description` (optional), `icon` (icon filename without `.svg`), and `url`. URLs live centrally in [src/_data/metadata.json](src/_data/metadata.json) under `links` — add new URLs there rather than hardcoding.

**Nunjucks, not Vento.** Unlike the magic-meal-kit `/www` site, this repo uses Nunjucks. Templates use `{{ }}` for output and `{% %}` for logic; the `comp.<name>(...)` syntax comes from the `_components/` directory loaded by Lume.

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
4. `preview_click` / `preview_eval` to drive navigation and search.
5. `preview_stop` when done so port 3000 doesn't stay bound.

## Definition of done

- The change builds cleanly (`deno task build`).
- Visual changes have been confirmed in the preview.
- No unrelated files were modified.
- Commit message is concise; PR description explains the "why".
