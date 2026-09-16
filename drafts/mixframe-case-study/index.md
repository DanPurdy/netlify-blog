---
title: 'mixframe case study'
status: outlined
---

## The idea

The case study for /projects/mixframe/ — the prose body of
content/projects/mixframe.md. Currently shows "Full write-up to come."

## Why it is worth writing

Dan's answer, Q1 (verbatim):

For years I and my friends have listened to GDS, it used to be that clicking on
the track in their UI would open the track in spotify, they then swtiched this
to apple music which no one uses. Because it was always on in the background
while working I never was able to keep track of the tracks I liked easily.
Being able to add them to my existing playlists was the idea but also being
able to go back through all the music id heard that day to be able to share
with others was the idea. I then felt like being able to possibly extend this
into bandcamp and other audio sites would make sense and become a useful tool
in order to keep track of all the great music I hear.

Bandcamp/other-sites extension: agreed as future ambition — one sentence at
the end at most.

## The war story

Dan's answer, Q2 (verbatim):

The push here was to test Fable and how quickly it could both investigate an
uknown website and its functionality but also map it to an existing service.
the most challengeing part is using the spoify API as they have really
hampered its use by startups or builders. Restricted to bigger companies now
and not really suited for wider release of this app.

Dan's answer, Q3 (verbatim):

the itch has been there for a long time and never got round to it. 2 was the
thing that enabled the quick testing of this and how effective it can be

(Structure decision: the itch leads; Fable is the enabler that collapsed the
cost of finally scratching it.)

## Who it is for

Dan's answer, Q5 (verbatim):

the reader is probably no one, potentoially an employer in the future or
someone who follos me mostly just content for the site and for my own personal
record.

Dan's answer, Q4 (verbatim):

How it did it I dont know. You can check gds.fm to find out how it works and
what it would have done. 2 wall clock it took a few hours one morning while
working on other projects. I dont think fable got anything wrong

## Notes and scraps

Publishes to the project page body, not content/blog/. The landing page at
/plugins/mixframe/ already covers what it does and how to install; the case
study is the story behind it.

Facts from the mixframe repo (verified 2026-09-16, file references in the
mixframe repo):

- Data source: no scraping. gds.fm runs LibreTime, which exposes a public JSON
  API — the extension polls `https://live.gds.fm/api/live-info-v2`
  (src/lib/gds.ts:102). Finding that endpoint was the "investigate an unknown
  website" part.
- Spotify: PKCE OAuth via `chrome.identity.launchWebAuthFlow()`
  (src/lib/spotify.ts:33). Track matching is a two-step search —
  `artist:"name" track:"title"`, falling back to a loose `artist title` query —
  with a high/low confidence score from normalised title+artist comparison
  (spotify.ts:133, :147).
- Set detection: an item is a set if it runs over 20 minutes, has no artist, or
  its name matches the show name (gds.ts:65, :84).
- Storage: `chrome.storage.local`, play counts as timestamp arrays, unsaved
  tracks auto-pruned after 7 days, capture blocked at >95% quota
  (storage.ts:25, :69, :87).
- Architecture: Manifest v3, service worker polls and matches, popup + review
  page read from storage via onChanged. TypeScript + Vite + Preact + CRXJS.
- Timeline: confirmed by Dan — core build was a few hours one morning (while
  working on other projects), with polish over the following days (repo logs
  Sept 2–4 2026).

Dan, additional scrap (verbatim):

also fable creating the marketing site in pretty much one shot when pointing
at a them [theme] was great

(The /plugins/mixframe/ landing page — one-shot from a theme reference.
Natural home: section 2, as a second beat of "the cost collapsed" — not just
the extension, the marketing page too.)

## Approved outline (2026-09-16)

Target: 300–500 words, publishes as the body of content/projects/mixframe.md.
Dan writes bullets or prose per section; assistant fleshes/cuts on request only.

1. (no heading — the hook) GDS always on while working; the Spotify links died
   in favour of Apple Music; tracks kept vanishing unremembered. The itch,
   years old.
2. "Why it finally got built" — the cost of scratching it collapsed: pointed
   Fable at gds.fm, a working extension existed within hours, built in
   parallel with other work. Polish followed over a few days.
3. "How it actually works" — no scraping; the LibreTime endpoint, the two-step
   Spotify match, sets vs tracks. Short, concrete, from the facts above.
4. "The hard part wasn't the code" — Spotify's API restrictions: dev-mode
   gatekeeping makes wider release impractical. Why this stays a personal tool.
5. (sign-off, one or two sentences) — the Bandcamp/other-stations ambition,
   deferred explicitly.
