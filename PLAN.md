# dpurdy.me rebuild plan

Decided August 2026. This document records what was decided, why, and what is
deliberately not being done. It exists so that any person or agent picking this up
later does not relitigate settled questions.

## The problem

Eight published posts, none since August 2022.

The trigger for this work was "the writing experience sucks", with Notion floated
as a better home for posts. Interrogating that turned up a different diagnosis.

The blocker is **pride of output, not typing friction**. In Dan's words: there are
plenty of ideas, but "the site is uninspiring for me and the thought of having to
use decap to try and finish off what i want to write and then ultimately end up
with a crap looking post i dont want to share is the blocker".

Two consequences follow, and they shape everything below:

1. **Design is a precondition for publishing, not a polish phase.** A migration
   that lands without the redesign has not solved the problem.
2. **Shipping a post on the current site first is not an option.** He has said he
   would not share it. Any plan that starts with "prove the loop works by
   publishing on Gatsby" is dead on arrival.

## Decisions

### Notion is rejected as a content store

Two of Dan's own stated constraints kill it:

- **No copy-paste between apps.** The AI has to be alongside the draft.
- **Vendor neutrality.** Claude, Codex, Cursor and ChatGPT should all be able to
  work on drafts, not just whichever tool has an integration this month.

Markdown files in a git repo is the only format that satisfies both with zero
adapters. Beyond that, moving the source of truth to Notion would mean:

- Downloading and re-hosting images on every build, because Notion serves them as
  S3 URLs signed with roughly one-hour expiry. Today `content/blog/<slug>/index.md`
  colocates images and `gatsby-remark-images` handles them free.
- Hand-mapping callouts, toggles and columns, which have no markdown equivalent.
- A publish trigger, since Notion has no free-tier database webhooks.
- Depending on `notion-to-md`, a community library with patchy maintenance, on a
  site touched twice a year.

The decisive point is the last one: it would make drafts invisible to coding
agents, removing the exact capability the whole exercise is meant to add.

Drafting somewhere else and pasting finished markdown into the repo remains
available at any time, at zero cost. That option was never closed.

### Gatsby is replaced with Astro

Netlify wound the Gatsby team down after the 2023 acquisition. The repo is on
5.14, pinned to React 18 with no React 19 path, running a GraphQL layer and a
custom `createPages` to render eight markdown files.

Astro's Content Collections plus a Zod schema replace `gatsby-node.js`,
`createSchemaCustomization` and every `graphql` template literal in the codebase.
Posts move untouched. Existing TSX components survive as React islands. The
Tailwind v4 theme in `src/styles/global.css` ports as-is.

Next.js was considered and rejected as more machinery than a static portfolio
needs, with a content layer you would hand-roll.

### Design direction

Editorial typography, and the current dark palette becomes *a* theme rather than
*the* theme:

- Navy `#081635` becomes the dark theme; a warm off-white becomes the light theme.
- System preference decides the default, with a manual toggle.
- Neon pink `#EF528A`, yellow `#FFE100` and blue `#33AAFF` retuned to pass
  contrast in both modes.
- Off-white rather than pure `#fff` on dark, to stop halation.

The current typography is what makes the site read as bland, more than the
palette does. Three specific faults:

- `src/styles/global.css` sets `letter-spacing: -1px` on `body`, inherited by all
  prose. At 20px body text that is punishingly tight.
- Post body is `2rem` inside `max-w-content-medium` (850px), giving roughly 95
  characters per line. The comfortable range is 65–75.
- Body copy is set in Noto Sans JP — a face designed for Japanese — doing duty as
  an English long-form reading face.

### Decap CMS is replaced by Keystatic, in phase 1

This was originally deferred, on the reasoning that a CMS is redundant when
drafting is markdown-plus-AI. That was wrong, and Dan corrected it: he wants "the
freedom to publish without doing it on this laptop", and does not want to be
prompting an agent in this repo every time he has an idea. He asked for a surface
where he can "add ideas, start posts, jot down thoughts, have agents help me
refine and then get them published".

A closed `z.enum` tag vocabulary was rejected for the same reason — it would mean
editing a TypeScript file to publish, which is the worst possible file to have to
touch from a phone.

Keystatic fits because it is a **view over the same git files**, not a different
store:

- `format: { contentField }` stores entries as `<path>/<slug>/index.<ext>`, which
  is already the layout of `content/blog/`. URL parity survives untouched.
- `fields.mdx({ extension: 'md' })` keeps files as plain markdown with YAML
  frontmatter, readable and editable by any agent. The vendor-neutrality
  requirement that killed Notion is unaffected.
- Local mode edits the filesystem directly at the desk with no auth. GitHub mode,
  via a GitHub App, commits from any device.

**Known limitation, stated plainly:** Keystatic is a form over git, not an AI
surface. It provides capture, editing and publishing anywhere. It does not put an
agent beside you in that browser — the refine step remains agent-on-files.

**Creating the GitHub App.** The setup wizard only runs in development —
`createdGithubApp` in `@keystatic/core` returns "App setup only allowed in
development" otherwise — so running `/keystatic/setup` on a deployed site cannot
work. Local dev defaults to local storage, which never prompts for sign-in, so
the wizard does not appear there either. Both conditions are needed at once:

```sh
PUBLIC_KEYSTATIC_STORAGE=github pnpm dev
```

The `PUBLIC_` prefix is load-bearing. `keystatic.config.ts` is bundled into the
browser as well as the server, because the admin UI is a React island, so the
flag has to be readable from client code — and it must be read via
`import.meta.env`, not `process.env`, which does not exist there.

Then open `/keystatic` and sign in. The wizard writes the credentials into
`.env`, which is gitignored. Copy `KEYSTATIC_GITHUB_CLIENT_ID`,
`KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` and
`PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` into Netlify's environment variables, scoped
to every deploy context you want the admin to work in — Netlify defaults can
leave deploy previews without them. The app is created pointing at localhost, so
add the deployed callback URL to it in GitHub App settings afterwards.

Two collections: `posts` over `content/blog/`, and `drafts` over `drafts/`.
Sveltia was considered and rejected as not Astro-native and self-described beta.

**Consequence: the site is no longer purely static.** Keystatic's admin needs
server routes, so `@astrojs/netlify` is added and the build runs hybrid. All
eleven content routes stay prerendered; only `/keystatic` and its API routes
render on demand. A Keystatic or auth failure therefore cannot take the blog down.

### The mobile editor question is answered by Keystatic

Previously deferred on the basis that Working Copy, an Obsidian vault and
github.dev all read the same files and the choice was cheap. Keystatic supersedes
it for capture and publishing. Any of those remain available for offline drafting,
which was downgraded to nice-to-have.

## Phases

Phases 1 and 2 are **one continuous push with a single deploy**. Splitting them
into separate milestones is the main way this project stalls — see Risks.

### Phase 0 — the writing loop (done)

Shipped August 2026, independent of the site so it could not be blocked by the
rebuild.

- `WRITING.md` — six stages and a four-criterion rubric, in plain markdown so any
  assistant can run it.
- `VOICE.md` — voice profile derived from the published corpus, separating
  signature traits from habits that are simply faults.
- `drafts/` — draft home with a template and a `status` field, excluded from the
  build because no `gatsby-source-filesystem` instance points at it.
- `.claude/skills/write/` — thin skill wrapping the markdown, no duplicated rubric.

The governing rule: **Dan writes the prose, AI never originates it.** It may
expand his bullets, cut, tighten, reframe and challenge. It may not decide what
the post says.

### Phase 1 — Astro migration at parity

No design changes. Same site, different engine, so that any visual difference in
phase 2 is a decision rather than a regression.

- Astro 7 with Content Collections and a Zod schema for `blog` and `experience`,
  defined in `src/content.config.ts`. The `glob()` loader's `base` can point at
  the existing `./content/blog`, so content stays where it is.
- **Slug handling.** `gatsby-node.js` builds URLs from `createFilePath`, which for
  `content/blog/foo/index.md` yields `/foo/`. Astro's default ID is derived from
  the *filename*, which is `index` for all eight posts. Left alone every post
  becomes `/blog/index`. Fixed with the loader's `generateId` option, stripping
  the trailing `/index.md` so the directory name becomes the ID.
- **URL parity is a hard gate.** Posts cross-link to live `dpurdy.me/blog/...`
  URLs and they are the only SEO surface. Verify all eight paths byte-for-byte.
- Drop the vestigial `path:` frontmatter field. Nothing queries it, and it
  disagrees with the directory name on at least two posts —
  `firebase-cloud-firestore-security-rules` carries `path: ...-part-one`.
- Shiki replaces `gatsby-remark-prismjs`, the `prismjs` dependency, and the
  `.gatsby-highlight` overrides in `global.css`. Shiki is Astro's default
  highlighter and supports dual light/dark themes natively via
  `markdown.shikiConfig.themes`, which phase 2 needs anyway.
- **Reading time is computed in plain JavaScript from `entry.body`**, not via a
  markdown plugin. Astro 7 replaced the default markdown processor with Sätteri,
  so remark plugins now require opting back into the unified pipeline via
  `@astrojs/markdown-remark`. Not worth that dependency for a word count. This
  also removes the fragile `node.body || ''` assumption in `gatsby-node.js`.
- Port TSX components as React islands. Port the Tailwind v4 theme as-is.
- Add `tags` to all eight posts. Cheap now while every file is being touched for
  the slug fix; expensive later. Proposed tags need approval.
- Delete `static/admin/` and the `gatsby-*` dependencies. `static/_redirects`
  becomes `public/_redirects` — it carries three live `/plugins/*` redirects to
  `gridslide.dpurdy.dev` and `takecounter.dpurdy.dev`.
- Drop `OpenSourceSection`, which `index.tsx` never imported and which has
  therefore been rendering nowhere. Recoverable from git history.
- Consolidate `layout.tsx`/`ThinLayout.tsx` and `Footer.tsx`/`FooterThin.tsx` into
  one component each with a variant prop.
- **Node 22.12 or higher is a hard requirement** — Astro 7 declares it in
  `engines`. `.nvmrc` says 20 and must be bumped; Netlify's build image needs the
  same. React 18 can stay: `@astrojs/react` accepts 17, 18 or 19.
- Package manager moves to pnpm 11, pinned via the `packageManager` field.
- Netlify deploy is otherwise unchanged — static output.

Four gaps found in the current site, all in scope:

- **RSS feed.** `gatsby-config.js` has no feed plugin, so the blog is
  unsubscribable. `@astrojs/rss` fixes it.
- **Prev/next links.** `gatsby-node.js` already computes `previous` and `next`
  into page context and `blog-post.tsx` silently ignores them. Half-built since
  2022.
- **Descriptions on `/blog`.** The listing shows title, date and reading time
  only, though the homepage `Post.tsx` does show a description.
- **Tag pages.**

### Phase 2 — design

The actual unblock, per the diagnosis above.

**The blog stops being tacked on.** This is an information-architecture change,
decided August 2026, not just a repaint. Today `/` is a three-screen portfolio —
full-viewport name hero, then Work, then three recent posts — and the blog is
exiled to `/blog`. That ordering says the writing is an afterthought, which is
the thing being fixed.

- `/` opens with a **compact intro card**: portrait, two or three sentences,
  social links and RSS. No full-viewport hero.
- Immediately below it, the **writing list** — every post, not three.
- A **condensed Work strip** at the foot of `/`, linking to a new `/work` route
  that carries the full experience entries currently inlined on the home page.
- `/blog/` stays resolving. It is a live URL, it is in the sitemap, and posts
  cross-link to it.
- `/blog/<slug>/` is untouched. Still the hard gate from phase 1.

Design work proper:

- Editorial typography: **serif body, sans headings**, 65–75ch measure, and
  `letter-spacing: -1px` removed from prose.
- Light and dark themes as described, system default plus toggle.
- Accent contrast retuned for both modes.
- The post page is the thing being designed. Target: a page Dan would paste into
  Slack without wincing.

**What survives of the current identity is deliberately open.** The neon pink is
liked but not mandated. The giant tracked-tight display type was the portfolio's
voice and may not be the blog's. Both are decided after the references below, not
before.

**How the design gets picked.** Deriving it from this document plus an agent's
own judgement reliably produces tasteful generic. Instead:

1. Dan supplies reference URLs — post pages he would be happy to have written on.
2. Those pages are screenshotted desktop and mobile, and reduced to a concrete
   spec: measure, type scale ratio, faces, vertical rhythm, how code blocks and
   headings sit, colour temperature. Naming what he is reacting to, not cloning.
3. Two or three **standalone HTML mockup directions** are built from that spec —
   each direction is a post page *and* the new home page, in both themes, using a
   real post's content (`content/blog/firebase-cloud-firestore-security-rules/`
   has code blocks; bio lives in `content/personal_details.md`). Files go in
   `mockups/` (gitignored). Cheap to throw away. Reference screenshots:
   `.playwright-mcp/refs/*.png`.
4. He picks or mixes; only then is it implemented into Astro tokens and
   components across the whole site.

Judging a page as a page beats judging a written description of one.

**References, supplied August 2026.** Positives: `joshwcomeau.com` in dark mode
(the original inspiration for the current site, still standing), `samwho.dev`
(clean, easy to read), `iamrob.in` (desktop-versus-mobile treatment),
`studioprimal.com` (bold statement landing, the original intent for the home
page), `digitalmeadow.studio` (visual character without photography). Anti-example:
`overreacted.io` — "too simple, the fonts are too small, more notes than
presentation".

Measured, at a 1440px viewport:

| Site | Body face | Size / line-height | Measure | Ground |
| --- | --- | --- | --- | --- |
| Comeau (dark) | Wotfard, sans | 18px / 1.5 | 686px | `#182939` |
| samwho | Seravek, sans | 18.7px / 1.5 | 748px | white, serif headings |
| iamrob.in | Fira Mono | 17.4px / 1.63 | 576px | `#EAE8E3` |
| overreacted (anti) | Merriweather, serif | 16px / 1.75 | 632px | pure white |
| dpurdy.me today | Noto Sans JP | 20px / 1.65, -1px tracking | ~850px | `#081635` |

What they share, and what it implies:

- **Neither ground is pure.** Off-white or near-black, never `#fff` or `#000`.
  Studio Primal is the deliberate exception, using true black as a canvas for one
  loud colour.
- **Measure runs 576–748px.** The current 850px is most of the "bland" feeling on
  its own, before any face is changed.
- **The hero is a sentence, not a name.** Primal and Robin both lead with a full
  sentence in heavy sans at 48–50px, line-height 1.0–1.1, with a colour break
  mid-sentence. `DAN PURDY` at 110px is larger and says less.
- **None of them use photography.** Robin has a drawn mark, Meadow renders ASCII,
  Primal uses video stills. The "no images" constraint is not a constraint.

**The serif decision is reversed.** "Serif body, sans headings" was chosen in the
abstract before references existed. Every positive reference uses a sans or mono
body; the sole serif-body site in the set is the anti-example. Body face is
therefore reopened, with sans and mono as the live candidates.

**Generated imagery is rejected.** Higgsfield-style AI art or voxel illustration
was considered. It reads as decoration on a code blog, dates quickly, and imposes
an asset pipeline the project does not otherwise need. Meadow and Robin get more
character from ASCII and a single drawn mark.

**New requirement: a side-projects surface.** Open-source contributions, books
and side projects need a home. `iamrob.in` demonstrates the shape — a scrolling
index column beside a fixed identity panel on desktop. This is additional to the
`/work` route and is in scope for phase 2's information architecture.

**Outcome, August 2026.** Four mockup directions were built and Dan picked a
hybrid: direction A's palette, type (Figtree + JetBrains Mono) and tidiness with
direction C's statement hero and post-list layout — recorded as `d-hybrid` in
`mockups/README.md`. That design is now implemented across the site: tokens and
prose styles in `src/styles/global.css` (light and dark, system default plus a
persisted toggle), the inverted blog-first home page, the statement post page,
the new `/work` route (typographic — the employer logos are white-text SVGs and
would vanish on the light ground), restyled `/blog`, tag pages and 404, and a
side-projects card row on the home page fed by `src/data/projects.ts`. Tailwind
was removed in the process: every page was being rewritten anyway, and the
mockup CSS transfers verbatim into Astro scoped styles, which it could not
through a utility-class translation. Fonts are self-hosted via Fontsource.

Through the loop, on the new site.

## Risks

**Phase 1 has no visible payoff.** Same site, different engine — exactly where a
personal project loses momentum. Mitigated by treating phases 1 and 2 as one push
with a single deploy.

**The diagnosis could be wrong.** "No time or nothing to say" was named as a
co-cause alongside the bad editor. The honest test is whether a draft appears in
`drafts/` before the migration lands. If none does, the tooling was not the
blocker and the rebuild will not fix it.

**URL breakage is silent.** Nothing in the current setup would fail loudly if a
post moved. A baseline was captured from the final Gatsby build before any
migration work started:

```sh
node scripts/snapshot-routes.mjs public .parity/gatsby   # baseline, already taken
node scripts/snapshot-routes.mjs dist   .parity/astro    # after migration
diff -ru .parity/gatsby .parity/astro
```

It records the route set, each page's readable text and every internal link, so
markup differences from the layout consolidation do not create noise. The target
is 11 routes: `/`, `/404`, `/blog/` and the eight posts. `/admin/` disappears
deliberately with Decap, `/_gatsby/slices/*` is framework internal, and Gatsby's
duplicate `/404/` is not reproduced.

From phase 2 onward the snapshot is a **URL gate only**, not a text-parity gate.
The home page is being restructured and `/work` is being added, so page text will
legitimately differ. What must not change is the eight post paths and `/blog/`.

The baseline confirmed the slug trap is real: the live URL is
`/blog/firebase-cloud-firestore-security-rules/`, taken from the directory name,
while that post's `path:` frontmatter claims
`firebase-cloud-firestore-security-rules-part-one` and is served nowhere.
