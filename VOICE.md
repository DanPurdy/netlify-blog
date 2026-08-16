# Voice profile

Derived from the seven published posts in `content/blog/` (2020–2022). This is a
description of how Dan actually writes, not an aspiration. Its purpose is to let
any AI tool check a draft against the real corpus instead of guessing.

When editing, the question is never "is this good writing?" — it is "would this
sentence be at home in one of the seven posts below?"

## Reference corpus

| Post | Date |
| --- | --- |
| Logging and mocking HTTP requests with TestCafe | 2020-09 |
| Using generator functions to handle mock responses | 2020-12 |
| Firebase Cloud Firestore security rules — Part one | 2020-12 |
| Firebase Cloud Firestore security rules — Part two | 2021-01 |
| Using private Github packages in Github workflows | 2021-02 |
| What is the nullish coalescing operator for in JavaScript | 2021-02 |
| Adding state to storybook stories | 2021-03 |
| Multiple Github accounts with individual git profiles over SSH | 2022-08 |

## Signature traits

These are the things that make a post recognisably Dan's. Preserve them.

**Second person, with "we" for the walkthrough.** The reader is addressed
directly as "you", but the work is done together as "we". Both appear in the
same paragraph constantly.

> "First off let's tackle the issue of your gitconfig and separating your
> identities, open up you gitconfig"

**Open with the problem, never the solution.** The first paragraph establishes
why anyone would care, usually by naming a situation the reader recognises.

> "Connecting to multiple Github accounts from your machine is one of those
> things you don't really think about until you need it."

**Reassurance about difficulty.** Some variant of "this is easier than you
think" appears in nearly every post. It is the single most consistent tic in the
corpus.

> "Thankfully it's actually incredibly easy."
> "How do we setup a logger in TestCafe? It's actually extremely simple."
> "Simple to understand right?"
> "All pretty self explanatory."

**Code first, explanation underneath.** A block of code is shown, then unpacked
in prose beginning with "So", "What we've done here", or "Notice". Almost never
the other way round.

**War stories from real work.** Abstract topics get anchored to something
actually shipped at Urban or PrimaryBid, with real constraints and real numbers.

> "we implemented a limit of around 10 calls before we show an error to the user
> and alert our ops team that something is wrong"

**Consequences made personal and slightly absurd.** Risks are illustrated by
imagining them happening to him.

> "So that gets me sacked from Org A and all of a sudden all of their builds
> start failing with auth errors for their packages"

**Exclamatory punctuation as punctuation.** Short celebratory beats close a
section: "Voila!", "Perfect!", "Great!", "pretty cool that we can iterate over
arrays in our rules too!"

**Self-deprecating parentheticals.**

> "much more for my lazy (read efficient) self to type"
> "early on in TypeScript (if you're not using it, why not?)"

**Explicit deferral of scope.** Tangents are named and postponed rather than
followed.

> "which i'll cover in another post and link here"
> "let's leave the TDD argument alone for now"
> "i'll leave you to decide whether you want that or not"

**Signposted structure.** "Firstly", "Next", "Finally", "So", "Well", "Now" open
paragraphs freely. This is conversational connective tissue and should survive
editing.

**Headings are questions or imperatives**, phrased as the reader would think
them: "What is a generator function", "Why are generators useful in mocks",
"TLDR - Show an example", "Show me some more examples!"

**Closing sign-off.** Every post ends deliberately — an explicit `## Conclusion`
or `## Summing it up`, or a short valediction: "Happy testing.", "Hopefully that
helps clear it up!", "And there you go".

**British English throughout**: colour, organisation, authorisation, behaviour.

## Habits to fix, not preserve

These are in the corpus but they are faults, not voice. An editor should catch
them without flattening anything above.

**Run-on sentences and comma splices.** The most common readability problem by
far. Sentences of sixty-plus words joined by commas where a full stop belongs.

> "Being able to guarantee how your generator behaves and when and how you can
> expect data in our examples goes a long way to achieving this goal."

Split them. Do not, however, chop everything into staccato fragments — the
natural rhythm is medium-length and flowing, just not endless.

**Lowercase "i".** Appears constantly: "i'm", "i have", "i'll", "i tend to".
Always correct to "I".

**Inconsistent proper nouns.** "Github" should be "GitHub". "javascript" should
be "JavaScript". "Yarn"/"yarn", "npm"/"NPM" drift within a single post.

**Genuine typos.** The corpus contains "How would we of written" (have),
"seen as that increment happens" (seeing as), "publishd", "multple", "invalid
from" (form), "user our personal config" (use). Catch these.

**Over-reassurance.** "Incredibly easy" is a signature, but when it is applied to
something genuinely fiddly it alienates a reader who is struggling. Keep the
warmth; drop the claim when the thing is not, in fact, easy.

**Missing hook.** The Firestore part-one post opens directly on a `##` heading
with no lead-in. Every post should establish the problem before the first
heading.

## Anti-patterns — the AI tells

If any of these appear in a draft, they are almost certainly not Dan's and should
be cut on sight.

- Tricolons and "It's not just X, it's Y" constructions.
- "Let's dive in", "In today's fast-paced world", "game-changer", "leverage",
  "seamless", "robust solution", "best practices" as a noun phrase.
- Em-dash-heavy balanced clauses used for rhetorical effect.
- Bulleted summaries of prose that was already clear.
- Section-closing sentences that restate the section.
- Hedging stacks: "it's worth noting that it may potentially be the case that".
- Any sentence a reader would skip without loss.
