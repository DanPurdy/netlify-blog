import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

/**
 * The Gatsby config had no feed plugin, so the blog was unsubscribable for its
 * entire life. Linked from the head in Seo.astro.
 */
export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  return rss({
    title: 'Dan Purdy',
    description:
      'Development blog of Dan Purdy, a senior fullstack engineer from London, UK.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      categories: post.data.tags,
      link: `/blog/${post.id}/`,
    })),
    customData: '<language>en-gb</language>',
  });
}
