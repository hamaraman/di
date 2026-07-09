import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 글은 src/content/posts/*.md 에 넣습니다. frontmatter 스키마를 강제해
// 필수 SEO 필드(제목·설명·발행일)를 빠뜨리면 빌드가 실패하도록 합니다.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string().max(60, '제목은 60자 이내가 검색 노출에 유리합니다'),
    description: z.string().min(50).max(160, '메타 설명은 50~160자가 이상적입니다'),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
