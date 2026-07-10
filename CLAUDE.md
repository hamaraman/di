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
  - `astro.config.mjs` 의 `SITE.url` 과 `public/robots.txt` 도메인은 실주소
    `https://di-cnv.pages.dev` 로 반영 완료. 커스텀 도메인 구매 시 둘 다 교체.
  - 네이버/구글 소유확인 메타태그는 `src/layouts/BaseLayout.astro` 에 삽입 완료
    (google-site-verification / naver-site-verification).
  - 글 frontmatter 스키마(`src/content.config.ts`)가 제목·설명 길이를 강제한다.
    빌드가 스키마 에러로 실패하면 길이를 조정할 것.

## 매일 업무 흐름

1. `npm run new "제목"` 으로 글 생성
2. 본문 작성 후 `draft: false`
3. `npm run build && npm run inspect` 로 점검
4. `git push origin main` 으로 발행/배포

## 보조 직원: Gemini CLI (외부 위임)

Gemini 는 Claude 의 서브에이전트가 될 수 없다(서브에이전트는 Claude 모델 전용).
대신 **Claude 가 필요할 때 호출하는 외부 도구**로 쓴다. 사용자가 Gemini Pro CLI(v0.49+)를
인증해 두었으므로 아래처럼 비대화형으로 위임할 수 있다.

```
npm run gemini -- "여기에 프롬프트"
```

(내부적으로 `gemini --skip-trust -p "..."` 실행. --skip-trust 는 이 폴더를 신뢰 처리.)

- 잘 맞는 작업: 키워드 브레인스토밍(제미나이는 구글 검색 그라운딩 강점), 제목/메타 문구 후보,
  글 아이디어의 "제2의 의견".
- 결과는 Claude 가 검토·정리한 뒤 반영한다(제미나이 출력을 그대로 신뢰하지 말 것).
- 실제 파일 수정·발행은 Claude 가 한다. 제미나이는 아이디어·초안 생성까지만.
