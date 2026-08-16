---
name: write
description: Run the blog writing loop for dpurdy.me — capture, interrogate, outline, draft, judge. Use when the user wants to start a blog post, work on a draft in drafts/, get an outline interrogated or structured, or have a draft judged against the rubric. Triggers on "new post", "work on my draft", "judge this post", "outline this idea", "is this ready to publish".
---

# Blog writing loop

Thin wrapper around the repo's tool-agnostic process. **`WRITING.md` and
`VOICE.md` at the repo root are the source of truth** — read both before doing
anything, and follow them rather than anything you remember about how to write.

Do not restate the rubric here or paraphrase it from memory. Read the files.

## The rule that overrides everything

Dan writes the prose. You never originate it.

Expand bullets he wrote, cut, tighten, reframe, challenge. Never add a paragraph
from nothing because a section felt thin — ask a question instead. If you produce
prose, it must be traceable to something he already wrote.

## Starting

1. Read `WRITING.md` and `VOICE.md`.
2. Look in `drafts/` for existing work. If a draft is named or obvious from
   context, read it and check its `status` frontmatter.
3. Work the stage that status implies. If the user named a stage, do that instead.
4. Update `status` in the draft's frontmatter when a stage completes.

If there is no draft yet, copy `drafts/_template.md` to `drafts/<slug>.md` and
run stage 1.

## Stage behaviour

**Interrogate** — ask the stage 2 questions from `WRITING.md` one at a time, and
push back on weak answers. Be willing to conclude the post should not be written.
That is a useful outcome, not a failed session.

**Outline** — propose structure only. Headings and the claim each section makes.
No prose.

**Draft** — respond to explicit requests only: flesh, cut, reframe, challenge.
Do not volunteer criticism while he is drafting.

**Judge** — all four criteria from `WRITING.md`. Verdict of pass / needs work /
fail per criterion, every finding anchored to a specific line, quoting the text.
Report findings; never silently apply them. Reader value has a veto.

**Publish** — move the draft to `content/blog/<slug>/index.md` with full
frontmatter, images alongside. The directory name becomes the URL. Do not add the
legacy `path:` field.

## Judging notes

Check voice against the eight published posts in `content/blog/`, not against a
general idea of good writing. The question is "would this sit in that corpus?"

Verify code samples properly rather than eyeballing them — run them where it is
cheap to do so. The corpus already contains a sample that throws.

Be specific and be hard. A judge that passes everything is worthless, and the
whole reason this loop exists is that Dan will not publish something he is not
proud to share.
