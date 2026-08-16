# Drafts

Ideas, outlines and half-finished posts. One file per idea.

**Nothing in here is published.** The site builds only from `content/blog/`, so a
draft can sit here indefinitely, in any state, with no risk of it going live.

That is the point. The failure mode this folder exists to prevent is starting a
post somewhere temporary, losing momentum, and having nothing to come back to.

## How to use it

1. Copy `_template.md` to `drafts/some-slug.md` and get the idea down.
2. Work through the stages in [../WRITING.md](../WRITING.md).
3. When it passes the rubric, move it to `content/blog/<slug>/index.md`, add the
   full frontmatter, and put any images in the same directory.

Files beginning with `_` are templates, not drafts.

## Status

Each draft tracks its own stage in the frontmatter so you — and any assistant
reading the folder — can tell at a glance what needs doing:

- `captured` — the idea exists, nothing more
- `interrogated` — survived the questions in stage 2
- `outlined` — has an approved structure
- `drafting` — prose in progress
- `judging` — complete, going through the rubric
- `ready` — passes all four criteria, waiting to be moved

Drafts are committed to git deliberately. They are meant to be visible to every
AI tool you point at this repo, and to survive between machines.

Delete drafts that die. A folder of abandoned ideas is discouraging; a short list
of live ones is not.
