---
name: project_post_section_atoms
description: Post 섹션(781:5936) 하위 노드 ID 지도 및 5개 컴포넌트(Date/Input/PostWriteHeader/ContentInputContainer/PostFilterHeader) 구현 시 확정한 방침 (840px 폭, border 색상 매핑, state 파생 방식)
metadata:
  type: project
---

Figma `Post` 섹션(node-id `781:5936`, fileKey `rR87YiUvJsp04GFlUL474X`, 1940x1564)의
`get_metadata` 결과로 확인한 하위 노드 ID 지도 — **5개 컴포넌트 모두 구현 완료**:

- `PostFilterHeader` — 764:2375 (840x96, **구현 완료**)
- `Date` — 781:5082 (57x21, **구현 완료**)
- `ContentInputContainer` — 783:2817 (1740x806, **구현 완료**)
  - `state=empty` — 764:2351 (840x766)
  - `state=filled` — 783:2818 (840x766)
- `Input` — 764:2345 (840x64, **구현 완료**)
- `PostWriteHeader` — 764:2338 (840x90, **구현 완료**)

**Why:** 5개 컴포넌트를 2세션에 나눠 구현했다 — 세션 1(Date/Input/PostWriteHeader, 의존성
없는 원자)과 세션 2(ContentInputContainer/PostFilterHeader, 다른 컴포넌트에 의존).

**How to apply:**

1. 이 섹션은 5개 컴포넌트 모두 구현 완료 상태다. 향후 이 섹션을 다시 손댈 일이 있으면
   (스타일 변경, 리팩토링 등) 아래 방침을 유지할 것.
2. **840px 폭 정책**: `Input`/`PostWriteHeader`/`ContentInputContainer`/`PostFilterHeader`
   모두 Figma 원본은 840px 고정이지만, 840은 `spacing/*` 토큰 스케일(0~64)에 없는 값이라
   하드코딩을 피하기 위해 루트를 `w-full`(100%, 부모 폭에 맞춤)로 구현했다. 이는 기존
   `TitleInput`이 이미 확정한 방침과 동일한 연장선. `PostCard`만 예외적으로 루트 840px
   고정을 사용자가 명시적으로 확정했으므로([[project_postcard_component]] 참고), 폭 정책이
   컴포넌트마다 다를 수 있다는 점에 주의.
3. **border 색상 매핑**: `Input`/`ContentInputContainer`의 테두리는 Figma에서 변수명이
   `text/disabled`(#d1d5db, `gray/400`)로 바인딩되어 있었다(시맨틱하게는 `border/default`와
   값이 같지만 변수명 자체가 다름). `--color-text-disabled`를 그대로 사용했는데, 이는 기존
   `TitleInput`/`SearchBar`가 이미 같은 패턴(테두리에 `--color-text-disabled` 사용)을
   확립해 놓았기 때문 — 새 변수를 만들지 않고 기존 관례를 따랐다.
4. `Date`는 이름이 JS 전역 `Date`와 충돌하지만 Figma 컴포넌트명을 그대로 따르라는 사용자
   지시(`export function Date()`)에 따라 그대로 사용함. 같은 파일 내에서 네이티브 `Date`가
   동시에 필요해지면 `import { Date as DateComponent }`로 별칭 처리 필요.
5. **ContentInputContainer의 `state` 파생 방식**: Figma의 `state=empty`/`state=filled`를
   별도 enum prop으로 노출하지 않고, `imageType` prop 지정 여부로 파생했다
   (`imageType`이 있으면 filled: 테두리/패딩 제거 + `PostImage` 렌더 / 없으면 empty: 테두리
   박스 + placeholder). Figma의 filled 예시가 항상 "이미지+텍스트" 조합이라 이렇게
   판단했다 — 텍스트만 입력되고 이미지가 없는 경우는 Figma에 별도 variant가 없어 empty
   박스 스타일을 그대로 유지하도록 구현했다(사용자 재확인 없이 자체 판단, 후속 세션에서
   이견이 있으면 조정 필요).
6. **ContentInputContainer 높이(766px) 처리**: 766px는 spacing 토큰에 없는 값이라 `height`로
   하드코딩하지 않고, `body/lg/regular`(24px 줄간격) 기준으로 근사한 `<textarea rows={29}>`
   속성으로 대체했다(순수 시각적 근사치, 사용자 확인 없이 자체 판단).
7. **PostFilterHeader**: 새 로직 없이 기존 `Button`(`variant="core"` `size="medium"`)과
   `Toolbar`를 그대로 조합한 레이아웃 전용 컴포넌트. 기본 정렬 탭은 Figma 예시가
   "최신글"에 체크 아이콘+bold(선택 상태)를 보여줘 `sortTabs` 기본값에 `selected: true`를
   포함했다(코디네이터가 준 예시 `[{label:"최신글"},{label:"인기글"}]`에는 명시되지
   않았지만, 시각적 사실에 근거해 추가함).
