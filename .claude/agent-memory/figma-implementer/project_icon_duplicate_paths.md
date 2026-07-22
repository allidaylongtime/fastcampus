---
name: project_icon_duplicate_paths
description: wrench/speaker 아이콘(Chip 137:1763)이 design/notification과 SVG path가 100% 동일 — 향후 유사 사례 발견 시 통합 여부 판단 기준
metadata:
  type: project
---

Chip 컴포넌트셋(node-id 137:1763)의 카테고리 아이콘(783:7817)과 공지사항 아이콘(783:7840)을
`src/components/ui/Icon/Icon.tsx`에 `wrench`, `speaker`로 추가하면서 확인한 사실.

- `wrench`의 path는 기존 `design`(783:7792) 아이콘과 좌표 단위로 완전히 동일하다.
- `speaker`의 path 2개는 기존 `notification`(781:5151) 아이콘과 완전히 동일하다.
- 즉 Figma에서 같은 벡터 애셋이 서로 다른 컴포넌트(Icon 세트 vs Chip)에서 재사용되고 있었음.
  이번엔 사용자 지시(작업 지시서)에 따라 문맥상 의미가 다르므로 별도 이름(`wrench`/`speaker`)으로
  중복 추가했고, 코드 주석에 "~와 동일 도형"이라고 명시해 두었다.

**Why:** Figma MCP `get_design_context`는 이런 vector 아이콘을 인라인 SVG path가 아니라
`<img src={...}>` (원격 애셋 URL)로 반환한다. path를 얻으려면 개별 아이콘 노드 id로
`get_design_context`를 호출한 뒤, 반환된 asset URL을 curl로 직접 다운로드해서 실제 SVG 내용을
읽어야 한다 (asset URL은 7일 유효). 이 과정에서 우연히 두 아이콘이 기존 아이콘과 동일한 도형임을
발견했다.

**How to apply:** 이후 Icon 세트에 새 아이콘을 추가할 때, 먼저 path를 추출한 뒤
`Icon.tsx`의 기존 `ICON_PATHS` 전체와 문자열 비교해서 중복 도형이 있는지 확인할 것.
중복이 확인되면 (1) 사용자에게 통합(기존 이름 재사용) vs 별도 이름 유지 중 선택하게 하거나,
(2) 이미 지시가 명확하면 별도 이름으로 추가하되 주석에 "~와 동일 도형"을 남겨 향후 정리 근거를
남길 것. 새 아이콘 추출 시 `get_design_context`가 `<img>` 참조만 반환하면, 해당 URL을
curl로 받아 실제 `<path>` 데이터를 확인하는 절차를 거쳐야 한다는 점도 재사용할 것.
