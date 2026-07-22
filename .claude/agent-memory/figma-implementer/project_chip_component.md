---
name: project_chip_component
description: Chip(137:1763) 구현 완료 — category/notice 2 variant, 아이콘 색상은 컨테이너 color로 currentColor 상속
metadata:
  type: project
---

`src/components/ui/Chip`를 신규 구현하며 확인한 사실.

- Figma 스크린샷 실측 결과, category 칩의 아이콘(연필 모양)은 라벨 텍스트와 동일한
  `content/strong`(#262626) 색상이고, notice 칩의 아이콘(스피커 모양)은 라벨과 동일한
  `text/danger`(#fc2a55) 색상이다. 즉 아이콘과 텍스트가 항상 같은 색.
- 기존 `Icon` 컴포넌트는 `stroke="currentColor"` 방식이므로, Chip 루트 `div`에
  `color: var(--color-content-strong)` / `var(--color-text-danger)`를 지정하는 것만으로
  아이콘+텍스트 색상을 한 번에 맞출 수 있었다 (별도 아이콘 color prop 불필요).
  이 패턴은 [[project_icon_duplicate_paths]]에서 확인한 "Icon은 항상 currentColor 상속"
  특성과 일치하므로, 앞으로 아이콘+텍스트를 같은 색으로 쓰는 다른 컴포넌트(Badge 등)에도
  재사용 가능한 접근이다.
- radius 6px → `--radius-sm`(4px) 근사는 이미 작업 지시서에서 사용자가 확정한 사항이라
  별도 질문 없이 주석만 남기고 적용했다 (기존 [[project_category_navbar_nodes]]의
  "누락 토큰은 flag만" 원칙과 달리, 이번엔 사전 확정이라 raw px가 아니라 근사 토큰을 그대로 사용).
- spacing(gap 4px, padding 8px/4px)과 typography(body/sm/bold)는 모두 기존 토큰
  스케일에 정확히 존재해 누락 없이 매핑됨. 새 토큰 필요 없음.
