---
name: mixframe
role: chrome extension
description: Logs what plays on gds.fm while you listen and saves the tracks you like to Spotify.
url: https://github.com/DanPurdy/mixframe
site: https://dpurdy.me/plugins/mixframe/
year: "2026"
status: live
order: 0
---

For years GDS has been on in the background while I work. Their player used
to open the current track in Spotify. Click the thing you liked, save it,
done. Then they switched those links to Apple Music, which nobody I know
uses, and that was that. Because the station is always on while I'm
concentrating on something else, I was never able to easily keep track of the
tracks I liked. The itch had been there for years. I never got round to it.

## Why it finally got built

Honestly, the push was wanting to test Fable. I wanted to see how quickly it
could investigate a website it had never seen, work out how it functioned,
and map what it found onto an existing service. So one morning, while working
on other projects, I pointed it at gds.fm and let it get on with it. A few
hours later I had a working extension. I don't think it got anything wrong.
The polish came over the following days in odd moments, and the landing page
arrived in pretty much one shot from pointing Fable at a theme I liked.

## How it actually works

I genuinely didn't know until I had Fable investigate its own work for this
write-up. It turns out there's no scraping involved. GDS runs LibreTime,
which exposes a public JSON API, so the extension simply polls the live-info
endpoint and records what comes back. Saving to Spotify is a PKCE OAuth flow
through the extension identity API, and matching a heard track to a Spotify
track is a two-step search: a strict artist and title query first, then a
looser fallback, with a confidence score so I can see when it's guessing.
Anything longer than twenty minutes, missing an artist, or named like the
show itself gets logged as a set rather than a track.

## The hard part wasn't the code

The Spotify API. Spotify have really hampered its use for small builders and
startups. Development mode is restricted, proper access is for bigger
companies now, and it isn't suited to releasing an app like this widely. So
mixframe stays a personal tool, installed from a zip.

Extending it to Bandcamp and the other places I hear music would make sense
one day, and would turn this into a proper tool for keeping track of all the
great music I hear. That's for another time.
