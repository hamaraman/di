import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';
import { SITE } from '../../../astro.config.mjs';

// 발행된 글 + 사이트 기본 카드(default)를 OG 이미지로 굽는다.
const posts = await getCollection('posts', ({ data }) => !data.draft);

const pages: Record<string, { title: string; description: string }> = {
  default: { title: SITE.title, description: SITE.description },
};
for (const post of posts) {
  pages[post.id] = { title: post.data.title, description: post.data.description };
}

// 브랜드 톤: 깔끔한 신뢰형(화이트 → 연한 파랑 그라데이션 + 파랑 액센트 바)
const KR_700 =
  './node_modules/@fontsource/noto-sans-kr/files/noto-sans-kr-korean-700-normal.woff2';
const KR_400 =
  './node_modules/@fontsource/noto-sans-kr/files/noto-sans-kr-korean-400-normal.woff2';

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    bgGradient: [
      [255, 255, 255],
      [219, 234, 254],
    ],
    border: { color: [37, 99, 235], width: 24, side: 'inline-start' },
    padding: 70,
    font: {
      title: {
        color: [17, 24, 39],
        weight: 'Bold',
        size: 62,
        lineHeight: 1.25,
        families: ['Noto Sans KR'],
      },
      description: {
        color: [71, 85, 105],
        weight: 'Normal',
        size: 30,
        lineHeight: 1.4,
        families: ['Noto Sans KR'],
      },
    },
    fonts: [KR_700, KR_400],
  }),
});
