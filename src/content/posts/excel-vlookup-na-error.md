---
title: "엑셀 VLOOKUP #N/A 오류 원인과 해결 방법"
description: "엑셀 VLOOKUP에서 #N/A 오류가 뜨는 5가지 원인과 각각의 해결법을 정리했습니다. 데이터 형식, 공백, 정확히 일치 옵션까지 순서대로 확인하세요."
pubDate: 2026-07-09
tags: ["엑셀", "VLOOKUP", "오류해결"]
draft: false
---

VLOOKUP을 쓰다 보면 값이 분명히 있는데도 `#N/A` 오류가 뜨는 경우가 있습니다. 원인은 대부분 정해져 있어서, 아래 순서대로 확인하면 거의 해결됩니다. VLOOKUP 자체가 처음이라면 [엑셀 VLOOKUP 사용법 기초](/posts/excel-vlookup-basic/)부터 보고 오면 이해가 빠릅니다.

## 1. 찾는 값이 실제로 없음

가장 흔한 원인입니다. 찾을 값이 참조 범위의 **첫 번째 열**에 실제로 존재해야 합니다. 오타나 띄어쓰기 차이로 값이 다르면 오류가 납니다.

## 2. 숫자와 텍스트 형식 불일치

찾는 값은 숫자(1001)인데 표의 값은 텍스트("1001")로 저장돼 있으면 서로 다른 값으로 인식합니다. 셀 왼쪽 위에 초록색 삼각형이 있으면 텍스트로 저장된 숫자입니다.

<svg viewBox="0 0 360 58" role="img" aria-label="텍스트로 저장된 숫자를 VALUE 함수로 진짜 숫자로 변환하는 흐름">
  <title>텍스트 숫자를 진짜 숫자로</title>
  <rect x="1" y="14" width="104" height="32" rx="6" fill="none" stroke="#3b82f6" stroke-width="1.5"></rect>
  <text x="53" y="34" text-anchor="middle" font-size="12" fill="currentColor" font-family="system-ui">"1001" 텍스트</text>
  <line x1="107" y1="30" x2="131" y2="30" stroke="#2563eb" stroke-width="2"></line>
  <polygon points="131,26 139,30 131,34" fill="#2563eb"></polygon>
  <rect x="143" y="14" width="74" height="32" rx="6" fill="#2563eb"></rect>
  <text x="180" y="34" text-anchor="middle" font-size="12" fill="#ffffff" font-family="system-ui">VALUE()</text>
  <line x1="219" y1="30" x2="243" y2="30" stroke="#2563eb" stroke-width="2"></line>
  <polygon points="243,26 251,30 243,34" fill="#2563eb"></polygon>
  <rect x="255" y="14" width="104" height="32" rx="6" fill="none" stroke="#3b82f6" stroke-width="1.5"></rect>
  <text x="307" y="34" text-anchor="middle" font-size="12" fill="currentColor" font-family="system-ui">1001 숫자</text>
</svg>

- 해결: 텍스트를 숫자로 바꾸려면 `=VALUE(A2)`, 반대로 숫자를 텍스트로 맞추려면 `=TEXT(A2,"0")` 를 사용해 형식을 통일합니다. 숫자가 텍스트로 저장돼 생기는 문제는 [엑셀 수식 계산이 안 될 때](/posts/excel-formula-not-calculating/)에서도 자세히 다룹니다.

## 3. 앞뒤 공백

값 끝에 보이지 않는 공백이 있으면 다른 값으로 취급됩니다. `=TRIM(A2)` 로 공백을 제거한 뒤 비교하세요.

## 4. 정확히 일치 옵션 누락

VLOOKUP의 네 번째 인수를 생략하거나 `TRUE`로 두면 **근사 일치**로 동작합니다. 정확한 값을 찾으려면 반드시 `FALSE`(또는 `0`)를 넣습니다.

```
=VLOOKUP(A2, 표범위, 2, FALSE)
```

## 5. 참조 범위가 어긋남

수식을 아래로 복사할 때 표 범위가 같이 밀려서 어긋나는 경우입니다. 범위를 `$`로 고정하세요. 예: `$D$2:$E$100`.

## 오류를 깔끔하게 숨기고 싶다면

원인을 다 확인했는데도 없는 값이 섞여 있다면, `IFERROR`로 감싸 빈칸이나 안내 문구로 바꿀 수 있습니다.

```
=IFERROR(VLOOKUP(A2, 표범위, 2, FALSE), "값 없음")
```

## 자주 묻는 질문

**Q. XLOOKUP을 쓰면 #N/A가 안 나나요?**
XLOOKUP도 값이 없으면 #N/A가 납니다. 다만 `찾을값이_없을때` 인수가 내장돼 있어 `=XLOOKUP(A2, 찾을범위, 반환범위, "값 없음")` 처럼 더 간단히 처리할 수 있습니다.

**Q. #N/A와 #REF! 는 뭐가 다른가요?**
`#N/A`는 값을 못 찾은 것이고, `#REF!`는 참조하던 셀이 삭제돼 참조 자체가 깨진 것입니다. 원인이 다릅니다.
