// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://dpurdy.me',

  // Keystatic's admin needs server routes, so the build is hybrid: every content
  // page stays prerendered and only /keystatic renders on demand. An auth or CMS
  // failure therefore cannot take the blog down.
  adapter: netlify(),

  integrations: [react(), mdx(), sitemap(), keystatic()],

  // Hover-prefetch every internal link. The pages are tiny static HTML, so
  // the cost is negligible and navigation feels instant.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },

  markdown: {
    // A single dark code theme in both site themes is the phase 2 design
    // decision (the mockups keep dark code blocks on the light ground), so
    // Shiki's dual-theme mode stays unused deliberately.
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
