import { config, fields, collection, singleton } from '@keystatic/core';

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

/**
 * Local storage writes straight to disk with no auth, which is what you want at
 * the desk. GitHub storage is what makes publishing from any device work.
 *
 * The override matters for one specific job. Keystatic's GitHub App setup wizard
 * refuses to run unless NODE_ENV is development — see createdGithubApp in
 * @keystatic/core, which returns "App setup only allowed in development".
 * Running /keystatic/setup on a deployed site therefore cannot work. But local
 * dev defaults to local storage, which never asks you to sign in, so the wizard
 * never appears either.
 *
 * To create or re-create the GitHub App, run:
 *
 *   PUBLIC_KEYSTATIC_STORAGE=github pnpm dev
 *
 * then open /keystatic and sign in. The wizard writes the credentials it creates
 * into .env, which is gitignored. Copy those values into Netlify's environment
 * variables for the deployed site, and add the production callback URL to the
 * GitHub App afterwards — the app is created pointing at localhost.
 *
 * Both flags must come from import.meta.env rather than process.env: this file is
 * bundled into the browser as well, because the admin UI is a React island, and
 * `process` does not exist there. `process.env.NODE_ENV` happens to survive only
 * because Vite replaces that exact expression with a literal; anything else off
 * `process.env` throws ReferenceError during hydration and renders a blank page.
 * The PUBLIC_ prefix is required for the value to reach client code at all.
 */
const useGitHubStorage =
  !import.meta.env.DEV || import.meta.env.PUBLIC_KEYSTATIC_STORAGE === 'github';

export default config({
  storage: useGitHubStorage
    ? { kind: 'github', repo: 'DanPurdy/netlify-blog' }
    : { kind: 'local' },

  ui: {
    brand: { name: 'dpurdy.me' },
    navigation: {
      Writing: ['drafts', 'posts'],
      Site: ['home', 'experience', 'projects'],
    },
  },

  singletons: {
    /** The home hero, bio, social links and site-wide SEO defaults. */
    home: singleton({
      label: 'Home & profile',
      path: 'content/personal_details',
      format: { contentField: 'body' },
      schema: {
        title: fields.text({ label: 'Name' }),
        subtitle: fields.text({ label: 'Role' }),
        headline: fields.text({
          label: 'Headline',
          description: 'The big sentence on the home page, up to the accent.',
        }),
        headlineAccent: fields.text({
          label: 'Headline accent',
          description:
            'The pink remainder of the sentence. Leave empty for no colour break.',
        }),
        links: fields.array(
          fields.object({
            label: fields.text({ label: 'Text' }),
            url: fields.text({
              label: 'URL',
              description: 'Absolute (https://…) or site-relative (/rss.xml).',
            }),
          }),
          {
            label: 'Links',
            description:
              'The link row under the home page bio. Add as many or as few as you like.',
            itemLabel: (props) => props.fields.label.value,
          },
        ),
        seoDescription: fields.text({
          label: 'SEO description',
          multiline: true,
          description: 'Fallback meta description for pages without their own.',
        }),
        body: body('Bio'),
      },
    }),
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

    projects: collection({
      label: 'Projects',
      slugField: 'name',
      path: 'content/projects/*',
      format: { contentField: 'body' },
      columns: ['name', 'role'],
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        role: fields.text({
          label: 'Role',
          description: 'The small annotation on the card: author, demo, tool…',
        }),
        description: fields.text({ label: 'Description', multiline: true }),
        url: fields.url({ label: 'Repository URL' }),
        site: fields.url({
          label: 'Site URL',
          description: 'Live site or product page, if there is one.',
        }),
        year: fields.text({
          label: 'Year',
          description: 'When it started — shown on the projects list.',
        }),
        status: fields.text({
          label: 'Status',
          description: 'e.g. live, archived, reference.',
        }),
        stack: fields.array(fields.text({ label: 'Technology' }), {
          label: 'Stack',
          itemLabel: (props) => props.value,
        }),
        order: fields.integer({
          label: 'Order',
          description: 'Cards sort ascending by this.',
        }),
        body: body('Case study'),
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
