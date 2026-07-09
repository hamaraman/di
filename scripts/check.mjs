// 매일 점검용 스크립트: 빌드 산출물을 검사해 발행 전 흔한 문제를 잡습니다.
//   - sitemap / rss / robots 생성 여부
//   - 내부 링크(href="/...")가 실제 생성된 페이지를 가리키는지 (깨진 링크)
// 사용법:  npm run build && npm run inspect
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
if (!existsSync(DIST)) {
  console.error('먼저 빌드하세요:  npm run build');
  process.exit(1);
}

// dist 안의 모든 .html 파일 수집
function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}
const files = walk(DIST);
const htmls = files.filter((f) => f.endsWith('.html'));

// URL 경로 → 파일 존재 여부 판정용 집합
const pages = new Set(
  htmls.map((f) => '/' + relative(DIST, f).replace(/\\/g, '/').replace(/index\.html$/, '')),
);

let problems = 0;
const warn = (m) => { console.log('  ⚠ ' + m); problems++; };

console.log('\n[필수 파일]');
for (const req of ['sitemap-index.xml', 'rss.xml', 'robots.txt']) {
  if (existsSync(join(DIST, req))) console.log('  ✓ ' + req);
  else warn(`${req} 누락`);
}

console.log('\n[내부 링크 점검]');
for (const f of htmls) {
  const html = readFileSync(f, 'utf8');
  const hrefs = [...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]);
  for (const href of hrefs) {
    const norm = href.endsWith('/') ? href : href + '/';
    const asFile = join(DIST, href.slice(1));
    const isAsset = /\.[a-z0-9]+$/i.test(href); // .css/.xml 등
    if (isAsset ? !existsSync(asFile) : !pages.has(norm) && !pages.has(href)) {
      warn(`${relative(DIST, f)}  →  깨진 링크 ${href}`);
    }
  }
}

console.log(`\n총 페이지 ${htmls.length}개 검사. 문제 ${problems}건.`);
process.exit(problems > 0 ? 1 : 0);
