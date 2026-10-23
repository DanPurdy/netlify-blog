# One-hour session on Opus 5.5 list prices ($/MTok). Output tokens ignored: same under both TTLs.
W5, W1, READ = 5, 8, 0.20

def session(start, end, gaps_min, active_min=60, every_s=30):
    """Requests every `every_s` seconds while active; context grows linearly start->end.
    `gaps_min` are idle breaks inserted evenly through the hour."""
    n = active_min * 60 // every_s
    times, t = [], 0.0
    gap_at = {round(n * (i + 1) / (len(gaps_min) + 1)): g for i, g in enumerate(gaps_min)}
    for i in range(n):
        t += gap_at.get(i, 0) * 60 + every_s
        times.append(t)
    ctx = [start + (end - start) * i / (n - 1) for i in range(n)]
    out = {}
    for name, ttl, w in (("5m", 300, W5), ("1h", 3600, W1)):
        cost, misses, prev_t, prev_c = 0.0, 0, None, 0
        for ti, c in zip(times, ctx):
            if prev_t is None or ti - prev_t > ttl:
                cost += c * w / 1e6; misses += prev_t is not None
            else:
                cost += prev_c * READ / 1e6 + (c - prev_c) * w / 1e6
            prev_t, prev_c = ti, c
        out[name] = (cost, misses)
    return n, out

for label, s, e in (("light: 30k -> 100k", 30_000, 100_000), ("deep: 30k -> 400k", 30_000, 400_000)):
    for gaps in ([], [10], [8, 12, 15], [8, 10, 12, 15, 20]):
        n, o = session(s, e, gaps)
        print(f"{label:20} breaks={str(gaps):18} reqs={n}  5m=${o['5m'][0]:.2f} ({o['5m'][1]} misses)  1h=${o['1h'][0]:.2f}  diff=${o['5m'][0]-o['1h'][0]:+.2f}")
