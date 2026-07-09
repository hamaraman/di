// 새 글의 뼈대(frontmatter 포함)를 오늘 날짜로 생성합니다.
// 사용법:  npm run new "글 제목"
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('제목을 입력하세요.  예)  npm run new "가성비 무선청소기 추천 5"');
  process.exit(1);
}

// 한글/영문 제목을 URL·파일명용 slug 로 변환
const slug = title
  .toLowerCase()
  .replace(/[^\p{L}\p{N}]+/gu, '-') // 문자·숫자가 아니면 하이픈
  .replace(/^-+|-+$/g, '');

const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
const dir = join('src', 'content', 'posts');
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

const file = join(dir, `${slug}.md`);
if (existsSync(file)) {
  console.error(`이미 존재합니다: ${file}`);
  process.exit(1);
}

const template = `---
title: ${title}
description: (검색 결과에 노출될 50~160자 요약을 여기 작성)
pubDate: ${today}
tags: []
draft: true
---

## 소제목

본문을 작성하세요.
`;

writeFileSync(file, template, 'utf8');
console.log(`생성됨: ${file}`);
console.log('작성이 끝나면 frontmatter 의 draft 를 false 로 바꿔 발행하세요.');
