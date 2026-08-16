# Writing loop

The process for taking a blog post from a half-formed idea to something publishable
on dpurdy.me.

This file is deliberately plain markdown with no tool-specific syntax. Claude Code,
Codex, Cursor, ChatGPT or anything else can read it and follow it. Point whatever
assistant you are using at this file and at [VOICE.md](./VOICE.md).

## The one rule

**Dan writes the prose. The assistant never originates it.**

The assistant may expand a bullet Dan wrote into a sentence, cut what is not
earning its place, tighten what is baggy, reframe an argument that is not landing,
and challenge a claim that is wrong. It may not decide what the post says, and it
may not add a paragraph from nothing because the section "felt thin".

If the assistant produces prose, it must be traceable to something Dan wrote —
a bullet, a note, a scrappy sentence. When a section is genuinely empty, the
assistant asks a question rather than filling it.

The reason is in VOICE.md: voice is preserved by construction, not by reviewing
generated text and hoping. A post that sounds like nobody is worse than no post.

## Stages

Ideas live in `drafts/`, one file per idea. Nothing in `drafts/` is published —
the site only builds from `content/blog/`.

### 1. Capture

Get the idea down. No structure, no quality bar, no assistant. A title guess and
a few lines on why it is interesting is enough. Use `drafts/_template.md`.

The point is that it exists and can be returned to. Most ideas will die here and
that is correct.

### 2. Interrogate

Ask the assistant to interrogate the draft before any outlining. It should push on:

- What is the single claim this post makes? If there are three, it is three posts.
- Who is the reader, and what do they already know?
- What do they leave able to do that they could not do before?
- Does this already exist, done better, on MDN or a vendor's docs? If so, what is
  the angle that justifies it — a real war story, a gap in the official docs, a
  correction?
- What is the actual hard part? That is usually the post; the rest is setup.

Expect this to kill some drafts. That is the stage doing its job.

### 3. Outline

The assistant proposes a structure: headings, the claim each section makes, and
where the code goes. Dan edits it until it is right.

Follow the corpus conventions in VOICE.md — problem established before the first
heading, headings phrased as reader questions, code before explanation, deliberate
sign-off at the end.

### 4. Draft

Dan writes it, in whatever tool is to hand. The assistant is on call for:

- **Flesh** — turn these three bullets into prose.
- **Cut** — this section is bloated, what goes?
- **Reframe** — this argument is not landing, what is the better order?
- **Challenge** — is this claim actually true?

The assistant does not volunteer edits mid-draft. Drafting is not the time for
criticism.

### 5. Judge

When the draft is complete, ask for a verdict against the four criteria below.
The assistant reports findings; it does not silently apply them.

### 6. Revise and publish

Dan revises. When it passes, the draft moves from `drafts/` to
`content/blog/<slug>/index.md` with full frontmatter, and images move alongside it.

## The rubric

Four criteria. Each gets a verdict of **pass**, **needs work**, or **fail**, with
specific line references — never a general impression. A post ships when all four
pass, or when Dan overrules a finding deliberately.

### 1. Structure and argument

- Is there one clear claim, stated or obvious by the end of the opening?
- Does every section earn its place? Name any that could be deleted with no loss.
- Is the order the one that makes the argument easiest to follow, or just the
  order it was discovered in?
- Does the opening establish the problem before diving into the solution?
- Does the ending land, or does it just stop?
- Is anything promised early and never delivered?

### 2. Technical accuracy

- Does every code sample actually run as written? Check syntax properly — the
  corpus contains a `const b;` that throws.
- Are version claims still true today, or has the API moved since drafting?
- Are the links alive and pointing at what the text says they point at?
- Is anything asserted confidently that is actually a guess?
- Are security or cost implications stated where they exist?

### 3. Voice

Checked against [VOICE.md](./VOICE.md) and the eight-post corpus.

- Would each paragraph be at home in one of the published posts?
- Are the signature traits intact — direct address, code-before-explanation, war
  stories from real work, the deliberate sign-off?
- Flag every anti-pattern from the VOICE.md list, quoting the sentence.
- Flag the fixable habits: lowercase "i", "Github" for "GitHub", comma splices,
  sixty-word sentences, typos.
- Where reassurance ("incredibly easy") is applied to something genuinely fiddly,
  say so.

### 4. Reader value

The brutal one. It runs last but it has a veto.

- Who is this for, in one sentence?
- What can they do afterwards that they could not do before?
- Does a better version of this exist already? Be specific — name it.
- What is the single most useful paragraph? If it is buried, say where it should be.
- Would Dan share this link himself, unprompted? If not, what is missing?

## Frontmatter for publishing

When a draft graduates to `content/blog/<slug>/index.md`:

```yaml
---
date: 2026-08-10T20:00:00.000Z
title: The post title
description: One or two sentences. Used for SEO and shown on the blog listing.
tags: [testing, javascript]
---
```

The directory name is the URL — `content/blog/my-post/index.md` publishes to
`/blog/my-post/`. Choose it carefully; changing it later breaks links.

There is a legacy `path:` field in the existing posts. It is unused and disagrees
with the directory name in places. Do not add it to new posts.
