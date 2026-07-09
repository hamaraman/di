import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../../astro.config.mjs';

// 네이버 서치어드바이저는 RSS 제출을 지원합니다. 새 글이 빠르게 수집되도록 함.
export async function GET(context) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/posts/${post.id}/`,
    })),
    customData: `<language>ko-kr</language>`,
  });
}
