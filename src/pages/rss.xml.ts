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

  // Feed identity comes from the same editable entry as the rest of the site.
  const personal = (await getCollection('personal'))[0];

  return rss({
    title: personal.data.title,
    description: personal.data.seoDescription,
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
