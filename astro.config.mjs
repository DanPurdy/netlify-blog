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

  markdown: {
    // Single dark theme, because the site is dark-only until the redesign.
    // Shiki's dual-theme mode needs a CSS variable block to switch between
    // them, so configuring it now would just render light code blocks on a
    // dark page for anyone whose OS is set to light. Revisit in phase 2.
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
