import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Posts live at content/blog/<slug>/index.md with their images alongside them.
 * The published URL has always been the *directory* name, so generateId strips
 * the filename — without this every post would get the id "index".
 */
const blog = defineCollection({
  loader: glob({
    pattern: '**/index.{md,mdx}',
    base: './content/blog',
    generateId: ({ entry }) => entry.replace(/\/index\.mdx?$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    /**
     * Deliberately open rather than an enum: a closed vocabulary would mean
     * editing this file to publish, which is the worst thing to have to do from
     * a phone. Normalising on read is what actually prevents tag drift.
     */
    tags: z
      .array(z.string())
      .default([])
      .transform((tags) =>
        tags.map((tag) => tag.trim().toLowerCase().replace(/\s+/g, '-')),
      ),
    draft: z.boolean().default(false),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/experience' }),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      title: z.string(),
      url: z.string().url(),
      logo: image(),
      startDate: z.coerce.date(),
      // Present on every entry today, but meaningless when isCurrent is set —
      // the Wonderbly entry carries an endDate equal to its startDate.
      endDate: z.coerce.date().optional(),
      isCurrent: z.boolean().default(false),
      position: z.array(z.string()),
      previousPosition: z.array(z.string()).default([]),
    }),
});

const personal = defineCollection({
  loader: glob({ pattern: 'personal_details.md', base: './content' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    // The home hero, split where the accent colour starts. An empty accent
    // renders the headline with no colour break.
    headline: z.string(),
    headlineAccent: z.string().default(''),
    // The link row under the hero bio. Any number of entries, including none;
    // urls may be site-relative (/rss.xml) or absolute.
    links: z
      .array(z.object({ label: z.string(), url: z.string() }))
      .default([]),
    seoDescription: z.string(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/projects' }),
  schema: z.object({
    name: z.string(),
    // The small mono annotation on the card: author, demo, tool…
    role: z.string(),
    description: z.string(),
    url: z.string().url(),
    order: z.number().default(0),
  }),
});

// drafts/ is deliberately absent. Keystatic reads that directory directly, and
// leaving it out of the content config guarantees a draft can never reach a build.
export const collections = { blog, experience, personal, projects };
