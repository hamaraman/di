import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: url 은 도메인 확정 후 교체. sitemap / canonical / RSS 가 이 값을 씁니다.
export const SITE = {
  url: 'https://di-cnv.pages.dev',
  title: '디지털 꿀팁 노트',
  description: '엑셀·윈도우·스마트폰 사용법과 오류 해결을 쉽고 빠르게 정리하는 IT 활용 블로그',
  author: '디지털 꿀팁 노트',
  lang: 'ko-KR',
};

export default defineConfig({
  site: SITE.url,
  integrations: [
    sitemap({
      // 마지막 수정일을 sitemap 에 넣어 크롤러 재방문을 유도
      lastmod: new Date(),
    }),
  ],
});
