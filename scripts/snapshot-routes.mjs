#!/usr/bin/env node
/**
 * Parity snapshot tool for the Gatsby -> Astro migration.
 *
 * Walks a build output directory, records every generated route, and extracts
 * the readable text of each page. Run it against the Gatsby build first to
 * capture a baseline, then against the Astro build, then diff the two.
 *
 *   node scripts/snapshot-routes.mjs public  .parity/gatsby
 *   node scripts/snapshot-routes.mjs dist    .parity/astro
 *   diff -ru .parity/gatsby .parity/astro
 *
 * Markup is expected to differ (layouts are being consolidated), so this
 * deliberately compares text content and the route set, not HTML.
 */

import { readdir, readFile, mkdir, writeFile, rm } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const [, , buildDir, outDir] = process.argv;

if (!buildDir || !outDir) {
  console.error('usage: snapshot-routes.mjs <build-dir> <out-dir>');
  process.exit(1);
}

async function findHtml(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      // Gatsby emits per-page JSON and webpack chunks we do not care about.
      if (entry.name === 'static' || entry.name === 'page-data') continue;
      found.push(...(await findHtml(path)));
    } else if (entry.name.endsWith('.html')) {
      found.push(path);
    }
  }
  return found;
}

/** Turn a file path into the URL it will be served at. */
function toRoute(file) {
  const rel = relative(buildDir, file).split(sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  return `/${rel.replace(/\.html$/, '')}`;
}

/** Crude but sufficient: strip markup, keep the words a reader would see. */
function toText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/\s+/g, ' ')
    .trim();
}

/** Every internal href on the page, so we can catch links broken by a slug change. */
function internalLinks(html) {
  const links = new Set();
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (href.startsWith('/') && !href.startsWith('//')) links.add(href);
  }
  return [...links].sort();
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

const files = (await findHtml(buildDir)).sort();
const routes = [];

for (const file of files) {
  const route = toRoute(file);
  const html = await readFile(file, 'utf8');
  const text = toText(html);
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1].trim() ?? '';

  routes.push({ route, words: text.split(' ').filter(Boolean).length, title });

  const name = route === '/' ? 'index' : route.replace(/^\/|\/$/g, '').replace(/\//g, '__');
  await writeFile(
    join(outDir, `${name}.txt`),
    [`route: ${route}`, `title: ${title}`, '', 'links:', ...internalLinks(html).map((l) => `  ${l}`), '', 'text:', text].join('\n'),
  );
}

routes.sort((a, b) => a.route.localeCompare(b.route));
await writeFile(
  join(outDir, '_routes.txt'),
  routes.map((r) => `${r.route}\t${r.words} words\t${r.title}`).join('\n'),
);

console.log(`${routes.length} routes snapshotted from ${buildDir} into ${outDir}`);
for (const r of routes) console.log(`  ${r.route}  (${r.words} words)`);
