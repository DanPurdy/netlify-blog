# Drafts

Ideas, outlines and half-finished posts. One directory per idea, each holding an
`index.md`.

**Nothing in here is published.** `drafts/` is deliberately absent from
`src/content.config.ts`, so a draft cannot reach a build no matter what state it
is in.

That is the point. The failure mode this folder exists to prevent is starting a
post somewhere temporary, losing momentum, and having nothing to come back to.

## Two ways in

**Keystatic** — run `pnpm dev` and open `/keystatic`, or use the deployed admin
from any device. Drafts appear under Writing, with a status field and a form for
everything else. This is the normal route, and it needs no knowledge of the file
layout.

**Directly** — copy `template-new-post/` to `drafts/<slug>/` and edit its
`index.md` in any editor.

Either way the result is the same markdown in git, so agents can read, judge and
edit drafts however they were created. Work the stages in
[../WRITING.md](../WRITING.md).

## Starting from a template

`template-new-post/` is an ordinary draft that exists to be copied. In Keystatic,
open it and use **Duplicate entry…** in the toolbar.

Keystatic ignores `defaultValue` on content fields, so a new entry's body always
opens empty — duplicating a starter is the mechanism that actually works. To add
another starter, create a draft whose title begins with `Template —`; nothing
else is needed.

## Status

Each draft records its stage in frontmatter, so you — and any tool reading the
folder — can tell at a glance what needs doing:

- `captured` — the idea exists, nothing more
- `interrogated` — survived the questions in stage 2
- `outlined` — has an approved structure
- `drafting` — prose in progress
- `judging` — complete, going through the rubric
- `ready` — passes all four criteria, waiting to be published

## Publishing

Moving a draft to `content/blog/<slug>/index.md` publishes it, with images
alongside. The directory name becomes the URL.

Drafts are committed to git deliberately: they are meant to be visible to every
AI tool pointed at this repo, and to survive between machines.

Delete drafts that die. A folder of abandoned ideas is discouraging; a short list
of live ones is not.
