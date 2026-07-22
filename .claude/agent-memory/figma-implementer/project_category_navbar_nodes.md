---
name: project_category_navbar_nodes
description: Category(764:2186)/NavigationBar(783:2797) 노드 조사 결과 — 누락 spacing 토큰, inline-style border 'none' CSSOM 직렬화 함정, 미반영 drop-shadow
metadata:
  type: project
---

`Category`(node 764:2186, default 764:2187 / selected 764:2189)와 `NavigationBar`
(node 783:2797, login 764:2274 / logout 783:2798, 내부 CategoryScroller 764:2261 / 783:2799,
버튼 783:2754 / 783:2801)를 `src/components/ui/Category`, `src/components/ui/NavigationBar`로
구현하며 확인한 사실들.

- **누락된 spacing 토큰**: Category의 상하 padding(6px pt / 10px pb)과 NavigationBar 루트의
  좌우 padding(10px)은 `docs/design-tokens.md`의 spacing 스케일
  (0,2,4,8,12,16,24,32,40,48,64)에 없다. `design-tokens.md`의 "Claude용 규칙 3번"
  (새 변수 만들지 말고 flag)에 따라 raw px + `⚠️ 누락된 토큰` 주석으로 처리했다.
  다음에 이 노드들을 다시 만지거나 비슷한 spacing(6px/10px)이 나오면 동일하게 처리할 것 —
  토큰을 새로 추가하려면 먼저 사용자 승인 필요.
- **inline style로 `border: "none"` 설정 시 CSSOM 직렬화 함정**: React 인라인 스타일에서
  `border: "none"` 또는 `borderBottom: "none"`처럼 style 키워드만 주면, 브라우저가
  border-bottom-width/color 없이 style만 설정된 상태라 `element.style.borderBottom`
  getter가 빈 문자열(`''`)을 반환한다(테스트에서 실측 확인, Chromium). 폭/스타일/색상
  3요소를 모두 명시(`"0 solid transparent"` 등)해야 `.style.borderBottom`이 안정적으로
  `"0px solid transparent"`처럼 직렬화된다. Button.tsx의 `border: colors.border ? "1px solid ..." : "none"`
  패턴도 동일한 함정이 있을 수 있으니(현재 테스트가 없어 미검증) 나중에 Button의 non-border
  variant에 대해 `.style.border` 단정 테스트를 추가하게 되면 이 이슈를 먼저 확인할 것.
- **미반영 drop-shadow**: Figma MCP 출력에 `drop-shadow-[0px_1px_0px_rgba(93,93,93,0.08)]`
  (CategoryScroller)와 `shadow-[inset_0px_-1px_0px_0px_rgba(93,93,93,0.08)]`(Button 내부)가
  있었으나 `tokens/*.json`/`design-tokens.md`에 shadow 토큰이 전혀 정의되어 있지 않다.
  기존 `Button.tsx`도 이 inset shadow를 반영하지 않은 선례가 있어, NavigationBar의
  drop-shadow도 동일하게 생략했다. 이후 shadow 토큰이 추가되면 두 곳 모두 재검토 필요.
