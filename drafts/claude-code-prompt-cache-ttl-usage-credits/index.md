---
title: 'Being dropped into the 5-minute cache can cost you more overall'
status: outlined
---

**Claim:** explain what happens to the cache. Going over your limit drops you into
the 5-minute cache, and on a long session that means spending more overall. No
dramatic framing.

**What the reader leaves with:** both options. What a 1-hour prompt cache TTL does
and how to set it, and what pinging might do, then leave it up to them with the
facts. The premise is to give the facts, not the conclusion of what's best, because
what's best depends on the situation they find themselves in. Close with
guidelines: if you do X, then Y is probably best, but if you're doing Z, then A is
probably best. Not "you should set this" or "you should ping".

## Outline (approved)

Headings and the claim each makes. No prose yet.

- **Opening, before the first heading.** The problem: you go past your weekly limit
  onto usage credits and the cache quietly drops from an hour to 5 minutes. How I
  spotted it in Headroom's cache countdown. Screenshot from Headroom.
- **What is the prompt cache doing in a Claude Code session?** Every request
  re-sends the whole conversation. Most of it is a cheap read; only the new slice is
  written. A miss writes the whole thing again. *Diagram 1.*
- **Why does it drop to 5 minutes on usage credits?** On a subscription the main
  conversation gets an hour; on credits Claude Code picks 5 minutes because writes
  are cheaper (1.25x vs 2x). Quote the docs, small pricing table. One line: API-key
  users have always been on 5 minutes.
- **What does a miss actually cost?** It scales with context. Light vs deep
  session table. *Diagram 2* (the rewritten bar after a break, light vs deep).
- **Why do sessions with subagents miss so often?** You aren't talking to the main
  agent while subagents work, or while you think about its question. The real
  session: four misses, all just over 5 minutes, $5.57.
- **How do I get the 1-hour cache back?** Code first: `promptCacheTtl` in
  settings.json, the env var, the `claude -p` check, the version. Then what it
  costs: the premium on every write, whether you break or not.
- **What about keeping the 5-minute cache warm instead?** Pinging at ~4 minutes
  idle. Cost per ping scales with context; break-length table; stops when the
  machine sleeps; pings are real turns. Link the mod if it's open source.
- **Summing it up.** The real session under all four strategies, then the
  if-you-do-X guidelines as a short table. Sign-off.

## The idea

Using API tokens or usage credits once you've gone past your weekly limit drops you
immediately into the 5-minute cache. That's because the 5-minute cache costs less
than the 1-hour cache: 1.25x versus 2x.

But doesn't that mean you're more likely to fall outside the cache window if it's
only 5 minutes, in a session that's running quite long? Then you'd pay for the
full conversation input back into the 5-minute cache if you spent more than 5
minutes between calls.

So being able to use the 1-hour cache is probably preferable in a lot of cases when
you're running on usage. Larger sessions probably save you a lot on input tokens
overall, rather than worrying about the 2x cost per call.

## Why it is worth writing

I don't feel like this is really that well known at the moment. It'd be useful to
start talking about it.

## The war story

I regularly hit my weekly limit. Since building [Headroom](/apps/headroom/), I
noticed that once I'd gone into usage credits I was only on the 5-minute cache, and
I was wondering why I wasn't on the 1-hour cache.

Right now there's a session running in another account that's in usage credits. At
the minute I'm having to keep that session alive in the 5-minute cache by constantly
writing to it.

## Who it is for

Subscribers. That's the usage pattern. People on API keys are definitely using it
too, but that's probably more well known (one line for them, not the focus).

Use it as a link into the work I've done with Headroom, and the cache mod too if I
open source it.

They need a very quick layman's explanation of how the cache works and what that
looks like for a session.

Compare a session that isn't using much of the 1 million context with one that goes
deep into it: past the 300k–400k mark over an hour or so. You're potentially going
to be missing the 5-minute cache regularly and dropping everything back into the
input tokens. Make sure that's really clear.

A couple of little block diagrams to explain how that's working.

## Notes and scraps

Research notes, gathered 2026-10-18. Not post prose.

### Official sources

- Claude Code — How Claude Code uses prompt caching, "Which TTL each request gets":
  https://code.claude.com/docs/en/prompt-caching#which-ttl-each-request-gets
  - Main conversation: 1h on a subscription within plan usage; 5m on usage credits,
    API key or cloud provider. Subagents, workflows, compaction etc. are 5m everywhere
    by default.
  - "Once you go over your plan's usage limit and Claude Code draws on usage credits,
    you are billed for that usage, so Claude Code drops the main conversation to the
    five-minute TTL, which charges a lower rate for cache writes."
- Same page, "Choose the TTL yourself":
  https://code.claude.com/docs/en/prompt-caching#choose-the-ttl-yourself
  - `promptCacheTtl` setting or `CLAUDE_CODE_PROMPT_CACHE_TTL` env var, `5m` or `1h`.
  - `subagentPromptCacheTtl` / `CLAUDE_CODE_SUBAGENT_PROMPT_CACHE_TTL` for everything
    else.
  - Needs Claude Code v2.1.242+.
  - Precedence: `FORCE_PROMPT_CACHING_5M=1` > env var > setting > subagent frontmatter
    `cacheTtl` (ignored on usage credits) > `ENABLE_PROMPT_CACHING_1H=1` > default.
  - Verify: `claude -p "hello" --output-format json`, look at
    `usage.cache_creation.ephemeral_1h_input_tokens` vs `ephemeral_5m_input_tokens`.
- Claude Code — Manage costs, "Why usage climbs in a long session":
  https://code.claude.com/docs/en/costs#why-usage-climbs-in-a-long-session
  - States the drop to 5m on usage credits and links straight to "choose the TTL
    yourself" to keep the hour.
- Claude Code — `/usage` "Prompt cache (main)" line shows misses and the TTL in effect
  (v2.1.251+): https://code.claude.com/docs/en/costs#prompt-cache-statistics
- API — Prompt caching pricing:
  https://platform.claude.com/docs/en/build-with-claude/prompt-caching#pricing
  - 5m write 1.25x base input, 1h write 2x, cache read 0.1x — and 0.05x on Opus 5.5
    and Sonnet 5.5.
  - Hits refresh the TTL at no extra cost; lifetime counts from the start of the
    request.
- API — "When to use the 1-hour cache":
  https://platform.claude.com/docs/en/build-with-claude/prompt-caching#when-to-use-the-1-hour-cache
  - Their own example: "storing a long chat conversation with a user and you
    generally expect that user may not respond in the next 5 minutes." That is a
    Claude Code session.
- Help Center — Manage usage credits for paid Claude plans: "Usage credits are billed
  at standard API rates." Nothing about caching.
  https://support.claude.com/en/articles/12429409-extra-usage-for-paid-claude-plans

### Corrections to the capture

- The 1.25x vs 2x is the cache *write* rate, not the input rate. Claude Code writes
  everything to cache, so plain 1x input barely features.
- The premium is not "2x per call". The 1h rate only applies to tokens being
  *written* (the new bit each request appends). The bulk of each request is a read,
  and reads cost the same under both TTLs.
- The docs already say this and give the fix. The angle is not "nobody knows"; it's
  "it's one line in a long page, the default flips silently when you cross your limit,
  and nobody has put numbers on it".

### Calculations (Opus 5.5 list: input $4, 5m write $5, 1h write $8, read $0.20, output $20 per MTok)

| Context | 5m miss (rewrite it all) | Warm read | 1h premium on writing the whole context once | Keep-alive ping | Pings to equal one miss |
| --- | --- | --- | --- | --- | --- |
| 100k | $0.50 | $0.02 | $0.30 | ~$0.03 | ~16 |
| 200k | $1.00 | $0.04 | $0.60 | ~$0.05 | ~19 |
| 400k | $2.00 | $0.08 | $1.20 | ~$0.09 | ~21 |

- Without compaction, a session writes each token to cache roughly once, so the
  total 1h premium over a session is about its final size × $3/MTok. One 5m miss at
  context C costs C × $4.80/MTok more than a warm read. So one miss outweighs the
  whole session's premium only if it lands past ~60% of the final size. Earlier
  misses need two to break even. (Corrected after the simulation below.)
- Break-even in general: 1h wins if misses × 1.2 × context > 0.75 × tokens written.
  (0.15 × context on models still on the 0.1x read rate.)
- Keep-alive pinging every ~4.5 minutes is cheaper than a miss for gaps up to ~80
  minutes (ping assumed: prefix read, ~300 tokens in, ~400 out). It also grows the
  context and needs you or a tool to do it. On 1h you don't ping at all.
- Where 5m wins: short bursts that never idle past 5 minutes, and subagents.

### Light vs deep session, simulated

One hour of work, a request every 30 seconds (120 requests), context growing
linearly, idle breaks spread through the hour. Opus 5.5 list prices, output tokens
left out because they're the same under both TTLs.

| Session | Breaks over 5 min | 5m cost | 1h cost | 5m minus 1h |
| --- | --- | --- | --- | --- |
| Light, 30k → 100k | none | $2.04 | $2.34 | −$0.30 |
| Light, 30k → 100k | 1 (10 min) | $2.35 | $2.34 | +$0.01 |
| Light, 30k → 100k | 3 (8, 12, 15 min) | $2.97 | $2.34 | +$0.63 |
| Light, 30k → 100k | 5 (8–20 min) | $3.59 | $2.34 | +$1.25 |
| Deep, 30k → 400k | none | $7.08 | $8.28 | −$1.20 |
| Deep, 30k → 400k | 1 (10 min) | $8.10 | $8.28 | −$0.18 |
| Deep, 30k → 400k | 3 (8, 12, 15 min) | $10.15 | $8.28 | +$1.87 |
| Deep, 30k → 400k | 5 (8–20 min) | $12.20 | $8.28 | +$3.92 |

- Honest reading: 5m wins if you never step away, and one break is roughly break-even.
  From two breaks on, 1h wins, and the gap grows with context size. That's the point
  to make clear: a deep session with a normal hour of breaks costs ~50% more on 5m.
- The correction to "dropping everything back into the input tokens": a miss
  re-writes the whole context at the 5m *write* rate (1.25x input), not plain input.
  It's worse than input, not equal.
- Script: `sim.py` alongside this draft. Run `python3 sim.py` to regenerate the table.

### The hard part (my answer)

If you've got subagents running, you're not tending to interact with the main agent.
That means you fall into the trap where the 5-minute cache is expiring fairly
regularly, and a miss with a lot of tokens really starts costing you quite a lot of
money.

### Real session: a PR review at work, on usage credits

Opus 5.5, 5m cache throughout (zero 1h writes), read from the local transcript
2026-10-18. Numbers only; don't name the work repo in the post. Replay it with
`python3 replay.py <transcript>.jsonl`.

- ~68 minutes, 116 main-conversation requests, context grew 90k → 403k. Six
  subagents ran during it.
- Four cache misses, each a full rewrite of the conversation:

| Idle gap | What the main agent was waiting on | Rewritten | Cost of the miss |
| --- | --- | --- | --- |
| 7.4 min | Me answering its question | 213k | $1.06 |
| 5.4 min | A subagent | 254k | $1.27 |
| 6.2 min | A subagent | 274k | $1.37 |
| 5.3 min | Me answering its question | 374k | $1.87 |

- None of the gaps were me stepping away. Two were subagents doing the work, and
  two were me taking a few minutes to think about a question the agent asked. Every
  one was just over 5 minutes.
- The same session under each strategy (main conversation only):

| Strategy | Cost | Misses | Pings |
| --- | --- | --- | --- |
| 5m, what actually happened | $15.01 | 4 | 0 |
| 1h | $10.92 | 0 | 0 |
| 5m + keep-alive ping after 4 min idle | $9.95 | 0 | 4 |
| 5m + keep-alive ping every 2 min idle | $10.53 | 0 | 14 |

- Subagents are on 5m regardless (that's the default for everything outside the main
  conversation). They wrote ~1M tokens and read ~36M on top of the above.

### Keep-alive pings vs the 1h cache

Ping modelled as: read the whole context, ~50 tokens in, ~150 out. At 300k context,
one break of each length, extra cost compared with no break:

| Break | 5m miss | Ping every 4 min | Ping every 2 min |
| --- | --- | --- | --- |
| 6 min | $1.44 | $0.06 | $0.19 |
| 10 min | $1.44 | $0.13 | $0.32 |
| 20 min | $1.44 | $0.32 | $0.64 |
| 30 min | $1.44 | $0.45 | $0.96 |
| 45 min | $1.44 | $0.70 | $1.41 |
| 60 min | $1.44 | $0.96 | $1.92 |

- On 1h a break under an hour costs nothing at the time. Its cost is the ~$3/MTok
  premium on everything written across the session (~$0.90 for a session that writes
  300k), paid whether you break or not.
- Pinging beats 1h on short, frequent gaps (the real session above), because you
  never pay the write premium. It loses on long breaks, where you're paying a full
  context read every few minutes for nothing.
- Ping as late as is safe, not often. Any request refreshes the 5 minutes, so one ping
  at ~4 minutes idle does the same job as two at 2 minutes, for half the cost.
- It only works while the pinger is running. Close the lid and the next request is a
  miss anyway. The 1h cache has no moving parts.
- A ping is a real turn: it sits in the conversation and the model replies to it.

### Contrast: my personal account, same evening

The session drafting this post ran on my personal account, inside plan usage. Every
cache write was 1h; the work account on usage credits wrote every one at 5m. Neither
account sets a TTL, so both are Claude Code's defaults. Snapshot at ~22:00 UTC, still
running.

- ~44 minutes, 40 main-conversation requests, context grew 58k → 158k.
- Two breaks: 8.4 and 18.1 minutes (me reading and answering). On 1h, the request
  after each one read ~140k from the cache and wrote a few hundred tokens. On 5m both
  would have been full rewrites.

| Strategy | Cost (list price equivalent) | Misses | Pings |
| --- | --- | --- | --- |
| 1h, what actually happened | $3.09 | 0 | 0 |
| 5m, what credits would have given me | $3.97 | 2 | 0 |
| 5m + ping after 4 min idle | $2.81 | 0 | 6 |
| 5m + ping every 2 min idle | $3.09 | 0 | 15 |

- On the subscription this isn't billed in dollars; it comes out of plan usage. The
  dollar figures are what the same tokens cost at list price, i.e. what they'd cost
  on credits.
- Same machine, same evening, same kind of work. The only difference is which side
  of the weekly limit the account is on.

### Diagrams (drawn)

- `cache-requests.svg`: requests as growing bars, read vs written, then a break and
  request 6 on each TTL. For "What is the prompt cache doing".
- `cache-miss-cost.svg`: the first request after a break, light (100k) vs deep (400k),
  same scale, with costs. For "What does a miss actually cost?".
- Both carry their own light/dark colours from the site palette. They follow the
  reader's OS setting, not the site's theme toggle (an `<img>` can't see page CSS).
- Embed as `![alt](cache-requests.svg "title")`, like the other posts' images.

### Diagram ideas

1. A session as a stack of growing bars, one per request: most of each bar is the
   cached prefix (read, cheap), with a thin new slice on the end (written).
2. The same stack with a 10-minute gap: on 5m, the bar after the gap is entirely
   written; on 1h it's still a read with a thin slice. Side by side, light vs deep, so
   the size of that rewritten bar is the thing you see.

### Things to check before claiming

- Does `promptCacheTtl: "1h"` hold while on usage credits on a subscription? The docs
  imply yes ("To keep the one-hour TTL there, choose the TTL yourself") and only call
  out subagent frontmatter as ignored. Confirm with the `-p --output-format json`
  check on the account that's in credits.
- Real numbers from that session would beat my assumed ones: context size, misses
  from `/usage`, and how often you've been pinging.
- Headroom's cache countdown screenshot could show the 5m switch happening.
