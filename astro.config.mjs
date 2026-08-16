// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://dpurdy.me',

  // Keystatic's admin needs server routes, so the build is hybrid: every content
  // page stays prerendered and only /keystatic renders on demand. An auth or CMS
  // failure therefore cannot take the blog down.
  adapter: netlify(),

  integrations: [react(), mdx(), sitemap(), keystatic()],

  markdown: {
    // Shiki is Astro's default highlighter and supports a theme per colour
    // scheme natively, which the light/dark redesign needs anyway.
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
