# CLAUDE.md — side-site

회사 메뉴얼(전역 CLAUDE.md)의 작업 원칙·배포 규칙을 따른다. 이 파일은 그중
**이 프로젝트에만 해당하는 정보**를 채운 것이다.

## 환경

- OS: **Windows** (win32) — 회사 메뉴얼 예시는 macOS/zsh 기준이지만 이 머신은 Windows다.
- 셸: PowerShell (POSIX 스크립트는 Bash 도구)
- 작업 디렉토리: `C:\side-site`

## 프로젝트별 정보

- **프로젝트 이름:** side-site (부업용 콘텐츠 사이트)
- **목표:** 구글 + 네이버 검색 노출로 트래픽 확보 → 수익화
- **기술 스택:** Astro 5 (정적 사이트), 콘텐츠는 Markdown
- **개발 서버 실행:** `npm run dev` (포트 4321)
- **빌드:** `npm run build`
- **점검:** `npm run inspect` (빌드 후 필수파일·깨진 링크 검사)
- **새 글 작성:** `npm run new "글 제목"` → `src/content/posts/*.md` 본문 작성 → `draft: false`
- **배포:** `git push origin main` (자동 배포). CLI 직접 배포 금지.
- **주의사항:**
  - `astro.config.mjs` 의 `SITE.url` 과 `public/robots.txt` 의 도메인이 아직
    `https://example.com` 플레이스홀더다. 실제 도메인 확정 시 둘 다 교체.
  - 네이버/구글 소유확인 메타태그는 `src/layouts/BaseLayout.astro` 에 주석으로
    대기 중. 발급받은 코드로 교체.
  - 글 frontmatter 스키마(`src/content.config.ts`)가 제목·설명 길이를 강제한다.
    빌드가 스키마 에러로 실패하면 길이를 조정할 것.

## 매일 업무 흐름

1. `npm run new "제목"` 으로 글 생성
2. 본문 작성 후 `draft: false`
3. `npm run build && npm run inspect` 로 점검
4. `git push origin main` 으로 발행/배포
