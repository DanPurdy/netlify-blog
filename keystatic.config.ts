import { config, fields, collection } from '@keystatic/core';

/**
 * Keystatic is a view over the git files, not a separate store. Everything it
 * writes stays as plain markdown with YAML frontmatter in content/blog and
 * drafts, so agents and editors keep full access to the same text.
 *
 * Local storage at the desk needs no auth. GitHub storage is what makes
 * publishing from a phone possible; it needs a GitHub App, created once through
 * the wizard at /keystatic/setup.
 */

const body = (label: string) =>
  fields.mdx({
    label,
    // Keep files as .md rather than .mdx. MDX is a superset of markdown, and for
    // prose it writes plain markdown, so the files stay ordinary text.
    extension: 'md',
  });

/**
 * Note on templates: Keystatic ignores `defaultValue` on content fields — it is
 * honoured on scalar fields like the status select below, but a new entry's body
 * always opens empty. Starters are therefore real draft entries which you
 * duplicate ("Duplicate entry…" in the toolbar). Adding a new starter is just
 * adding another draft whose title begins with "Template —".
 */

const tags = fields.array(fields.text({ label: 'Tag' }), {
  label: 'Tags',
  itemLabel: (props) => props.value,
  description:
    'Lowercased and hyphenated automatically at build time. Reuse existing tags where you can.',
});

export default config({
  storage:
    process.env.NODE_ENV === 'development'
      ? { kind: 'local' }
      : { kind: 'github', repo: 'DanPurdy/netlify-blog' },

  ui: {
    brand: { name: 'dpurdy.me' },
    navigation: {
      Writing: ['drafts', 'posts'],
      Site: ['experience'],
    },
  },

  collections: {
    /**
     * Ideas and work in progress. Nothing here is in the Astro content config,
     * so a draft cannot reach a build no matter what state it is in.
     */
    drafts: collection({
      label: 'Drafts',
      slugField: 'title',
      path: 'drafts/*/',
      format: { contentField: 'body' },
      entryLayout: 'content',
      columns: ['title', 'status'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Captured', value: 'captured' },
            { label: 'Interrogated', value: 'interrogated' },
            { label: 'Outlined', value: 'outlined' },
            { label: 'Drafting', value: 'drafting' },
            { label: 'Judging', value: 'judging' },
            { label: 'Ready', value: 'ready' },
          ],
          defaultValue: 'captured',
        }),
        body: body('Draft'),
      },
    }),

    /**
     * Published posts. The directory name is the URL, so renaming an entry's
     * slug breaks links — see PLAN.md.
     */
    posts: collection({
      label: 'Blog posts',
      slugField: 'title',
      path: 'content/blog/*/',
      format: { contentField: 'body' },
      entryLayout: 'content',
      columns: ['title', 'date'],
      schema: {
        title: fields.slug({
          name: { label: 'Title' },
          slug: {
            label: 'URL slug',
            description:
              'This is the published URL. Changing it on an existing post breaks every link to it.',
          },
        }),
        date: fields.date({ label: 'Date' }),
        description: fields.text({
          label: 'Description',
          multiline: true,
          description: 'Shown on the blog listing and used for SEO.',
        }),
        tags,
        body: body('Body'),
      },
    }),

    experience: collection({
      label: 'Experience',
      slugField: 'title',
      path: 'content/experience/*',
      format: { contentField: 'body' },
      schema: {
        id: fields.text({ label: 'ID' }),
        title: fields.slug({ name: { label: 'Title' } }),
        url: fields.url({ label: 'URL' }),
        logo: fields.image({
          label: 'Logo',
          directory: 'content/experience',
          publicPath: '',
        }),
        startDate: fields.date({ label: 'Start date' }),
        endDate: fields.date({ label: 'End date' }),
        isCurrent: fields.checkbox({ label: 'Current role' }),
        position: fields.array(fields.text({ label: 'Position' }), {
          label: 'Positions',
          itemLabel: (props) => props.value,
        }),
        previousPosition: fields.array(fields.text({ label: 'Position' }), {
          label: 'Previous positions',
          itemLabel: (props) => props.value,
        }),
        body: body('Body'),
      },
    }),
  },
});
