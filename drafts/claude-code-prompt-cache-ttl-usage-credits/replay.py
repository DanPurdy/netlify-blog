"""Replay a Claude Code transcript's main conversation under three cache strategies.

Usage: python3 replay.py <session>.jsonl
Opus 5.5 list prices ($/MTok). A keep-alive ping is modelled as: read the whole
context, write ~50 tokens of prompt plus ~150 tokens of reply, and pay for ~150
output tokens. Each ping also grows the context by those ~200 tokens.
"""
import json, sys
from datetime import datetime

W5, W1, READ, OUT = 5, 8, 0.20, 20
ttl_writes = {'5m': 0, '1h': 0}
PING_IN, PING_OUT = 50, 150

def main_requests(path):
    seen, out = set(), []
    for line in open(path, errors='ignore'):
        try: d = json.loads(line)
        except ValueError: continue
        m = d.get('message') or {}
        if d.get('type') != 'assistant' or d.get('isSidechain') or not m.get('usage') or m.get('id') in seen:
            continue
        seen.add(m['id'])
        u = m['usage']
        ctx = u.get('cache_read_input_tokens', 0) + u.get('cache_creation_input_tokens', 0) + u.get('input_tokens', 0)
        cc = u.get('cache_creation') or {}
        ttl_writes['5m'] += cc.get('ephemeral_5m_input_tokens', 0)
        ttl_writes['1h'] += cc.get('ephemeral_1h_input_tokens', 0)
        out.append((datetime.fromisoformat(d['timestamp'].replace('Z', '+00:00')), ctx, u.get('output_tokens', 0)))
    return sorted(out)

def cost(reqs, ttl_min, write, ping_every=None):
    total, misses, pings, prev_t, prev_ctx = 0.0, 0, 0, None, 0
    for t, ctx, out in reqs:
        total += out * OUT / 1e6
        if prev_t is None:
            total += ctx * write / 1e6
        else:
            idle = (t - prev_t).total_seconds() / 60
            if ping_every and idle > ping_every:
                n = int(idle // ping_every)
                pings += n
                total += n * (prev_ctx * READ + (PING_IN + PING_OUT) * write + PING_OUT * OUT) / 1e6
                idle -= n * ping_every
            if idle > ttl_min:
                misses += 1
                total += ctx * write / 1e6
            else:
                total += (prev_ctx * READ + max(ctx - prev_ctx, 0) * write) / 1e6
        prev_t, prev_ctx = t, ctx
    return total, misses, pings

reqs = main_requests(sys.argv[1])
print(f"{len(reqs)} main-conversation requests, {(reqs[-1][0] - reqs[0][0]).total_seconds() / 60:.0f} minutes, "
      f"context {reqs[0][1]:,} -> {reqs[-1][1]:,}")
actual = max(ttl_writes, key=ttl_writes.get)
print(f"cache writes: 5m {ttl_writes['5m']:,}, 1h {ttl_writes['1h']:,}, so this session ran on {actual}")
for label, args in (("5m", (5, W5)), ("1h", (60, W1)),
                    ("5m + ping after 4 min idle", (5, W5, 4)), ("5m + ping every 2 min idle", (5, W5, 2))):
    c, m, p = cost(reqs, *args)
    print(f"  {label:28} ${c:6.2f}  misses {m}  pings {p}")
