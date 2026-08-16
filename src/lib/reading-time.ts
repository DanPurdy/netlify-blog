/**
 * Reading time, computed from the raw markdown body.
 *
 * Replaces the version in gatsby-node.js, which read `node.body || ''` during
 * onCreateNode — an assumption that happened to hold but would have silently
 * produced "1 min read" for every post if it ever stopped holding.
 *
 * Deliberately not a markdown plugin: Astro 7 swapped the default processor to
 * Sätteri, so a remark plugin would drag in @astrojs/markdown-remark to opt back
 * into the unified pipeline. Not worth a dependency for a word count.
 */
const WORDS_PER_MINUTE = 200;

export function readingTime(body: string | undefined): string {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}
