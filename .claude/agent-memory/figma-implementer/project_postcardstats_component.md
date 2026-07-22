---
name: project_postcardstats_component
description: PostCardStats(783:2846) 구현 완료 — 6px 반올림 관례 최종 확인, eye-on/heart_empty 아이콘 실측 확인
metadata:
  type: project
---

`src/components/ui/PostCardStats`를 신규 구현하며 확인/재확인한 사실.

- **6px 미보유 spacing의 실제 코드 관례 재확인**: [[project_category_navbar_nodes]]에는 "raw px +
  ⚠️ 플래그"로 적었다고 기록했지만, 실제 `Category.tsx`/`NavigationBar.tsx` 코드를 다시 읽어보니
  6px→`--spacing-8`, 10px→`--spacing-12`처럼 **다음으로 큰 토큰으로 반올림**하고 주석으로 설명하는
  방식이 실제로 적용되어 있었다. 즉 이전 메모(raw px 플래그)는 최신 코드 상태와 다르다 —
  이번 PostCardStats도 아이콘-숫자 gap 6px을 동일 관례로 `--spacing-8`로 반올림했다.
  **Why:** design-tokens.md의 "누락 토큰은 플래그만" 문서 규칙과 실제 코드 관례가 어긋나 있음.
  코드가 최신 실제 동작이므로 문서보다 코드를 우선 신뢰했다.
  **How to apply:** 앞으로 spacing 불일치 발견 시, 먼저 `Category.tsx`/`NavigationBar.tsx` 같은
  기존 구현을 읽어 "반올림(주로 올림) + 주석" 관례를 따를 것. 정확히 중간값(예: 6은 4/8의 정중앙)이면
  기존 선례(올림)를 따라 큰 쪽 토큰을 선택.
- **아이콘 실측 재확인**: PostCardStats의 조회수/좋아요 아이콘을 asset URL로 다운로드해 path를
  비교한 결과, 조회수는 `eye-on`, 좋아요는 `heart_empty`(outline, `heart_fill` 아님)와 100% 동일.
  이는 [[project_icon_duplicate_paths]]에서 확립한 "새 아이콘 추가 전 asset URL curl로 실측"
  절차를 그대로 따른 것이고, 이번엔 기존 Icon 세트에 이미 있는 이름이라 재사용만 하고 새로 추가하지
  않았다.
- color/typography는 모두 기존 토큰(`--color-text-tertiary`, `--typography-caption-lg-medium-*`)에
  정확히 일치, 누락 없음. 바깥 두 통계 영역 사이 gap(24px)도 `--spacing-24`로 정확히 매핑됨.
