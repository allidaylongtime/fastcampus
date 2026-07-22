---
name: project_bookmark_icon_absent
description: Figma 파일(rR87YiUvJsp04GFlUL474X) 전체에 "bookmark"/"save" 관련 아이콘·컴포넌트 없음을 확인 완료 — 북마크 기능은 Figma 소스 없이 신규 제작 필요
metadata:
  type: project
---

Icon 컴포넌트 세트(node-id 137:1723)의 `name` variant 19개 전체
(iconview, arrow_left, user, ai, dog, eye-on, design, eye-off, menu, notification,
arrow_right, close, search, message, heart_empty, heart_fill, check, pencil, google)를
재확인했지만 `bookmark`/`save`류 variant는 존재하지 않는다.

PostCardStats(783:2846)의 실제 자식도 `ViewCountArea`(eye-on) + `LikeCountArea`(heart_empty)
2개뿐이며, 놓친 세 번째(북마크) 아이콘 슬롯은 없다. ([[project_postcardstats_component]] 참고)

전체 페이지(0:1 "디자인 시스템", 유일한 페이지)의 메타데이터를 통째로 덤프해
`name="..."` 속성 406개를 전부 추출/검색했지만 "bookmark", "save" 문자열이
포함된 노드가 단 하나도 없었다 (대소문자 무시 검색).

**Why:** 사용자가 "북마크(저장) 기능"을 추가하기 전에 Figma에 이미 있는 아이콘을
재사용해야 하는지 확인 요청. 임의로 새 아이콘을 만들기 전에 반드시 실측 확인이
필요하다는 [[project_icon_duplicate_paths]] 원칙을 그대로 적용해 전수 조사했다.

**How to apply:** 이후 "북마크/저장" 관련 Figma 구현 요청이 오면, 이 파일이 최신
상태로 남아있는 한(파일이 업데이트되지 않았다는 전제 하에) 재조사 없이 바로
"Figma 소스 없음 → 신규 아이콘 필요"로 결론짓고 사용자에게 확인만 받으면 된다.
단, 결론 재사용 전에 [[project_icon_duplicate_paths]]에서 확립한 절차대로
Icon 세트(137:1723)의 variant 개수가 여전히 19개인지 `get_metadata`로 가볍게
재검증할 것 — 시간이 지나 디자이너가 새 variant를 추가했을 수 있다.
