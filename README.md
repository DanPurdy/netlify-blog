# dpurdy.me

Personal site and blog, at [dpurdy.me](https://dpurdy.me). Posts, project write-ups,
a work history, and standalone pages for the apps I publish.

## Stack

- [Astro 7](https://astro.build) with MDX, prerendered to static HTML. Only the
  Keystatic admin renders on demand, through `@astrojs/netlify`, so a CMS or auth
  failure cannot take the site down.
- [Keystatic](https://keystatic.com) as a view over the markdown in git. Local
  storage at the desk, GitHub storage from a phone. Everything it writes is plain
  markdown with YAML frontmatter.
- React only where Keystatic needs it. The site's own pages are `.astro`.
- Hosted on Netlify; images go through its Image CDN.

## Layout

| Path | What lives there |
| --- | --- |
| `content/blog/<slug>/index.md` | Published posts |
| `content/projects/*.md` | Project entries, with optional case-study bodies |
| `content/experience/` | Work history |
| `content/assets/` | Images referenced from content |
| `drafts/` | Unpublished ideas and half-finished posts, never built (see `drafts/README.md`) |
| `src/pages/` | Routes, including the standalone app pages under `apps/` and `plugins/` |
| `public/` | Static files served as-is, plus `_redirects` |

## Writing

The process for taking a post from idea to publishable is in [WRITING.md](WRITING.md),
and [VOICE.md](VOICE.md) describes how the published posts actually read, so a draft
can be checked against the real corpus. The `write` skill in `.claude/skills/` runs that
loop. [PLAN.md](PLAN.md) records the decisions behind the 2026 rebuild and what was
deliberately left out.

## Develop

The toolchain is pinned in `mise.toml` (Node 24, pnpm 11); `.nvmrc` is kept in sync for
Netlify.

```sh
mise install
pnpm install
pnpm dev          # http://localhost:4321, admin at /keystatic
pnpm build        # dist/, the same build Netlify runs
pnpm preview
pnpm format       # Prettier over src/
```

There is no test suite. The build is the check, and `scripts/snapshot-routes.mjs` diffs
the rendered text of two builds when upgrading anything that touches markdown.

## Deploy

Netlify builds `main` with `pnpm build` (see `netlify.toml`) and a deploy preview for
every pull request. Dependabot opens a grouped version PR monthly
(`.github/dependabot.yml`), with majors one PR each.

## Licence

[MIT](LICENSE).
