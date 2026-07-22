---
name: project_checkbox_component
description: Checkbox(783:4142) 구현 완료 — 2-state(checked boolean), 실제 input[type=checkbox] 래핑 방식
metadata:
  type: project
---

`src/components/ui/Checkbox`를 신규 구현하며 확정/적용한 사실.

- Figma 노드 안의 3개 인스턴스(`on` 783:4139 / `off` 783:4150 / `state3` 4035:1501) 중
  `state3`는 `on`과 픽셀 단위로 완전히 동일해 정리 안 된 잔여 레이어로 판단, 무시하고
  `checked: boolean` 2-state로만 구현하기로 사용자가 사전 확정한 사안.
- "접근성 있는 실제 폼 컴포넌트로 구현" 요구에 따라 CSS `:checked` 가상클래스/peer 방식이 아니라
  기존 코드베이스 컨벤션(Button/Chip/SortTabItem이 모두 JS/React props로 상태를 조건부 렌더링하는
  방식)을 그대로 따라, `<input type="checkbox">`를 `sr-only`로 숨기고 controlled/uncontrolled를
  모두 지원하는 내부 `useState` + `checked !== undefined` 판별로 시각적 박스(`<span aria-hidden>`)를
  그린다. 이유: CSS peer-checked로 nested Icon까지 스타일링하려면 general sibling combinator의
  한계(직계 형제만 선택 가능) 때문에 CSS 커스텀 프로퍼티 상속 같은 우회가 필요해 복잡도가
  올라가고, 기존 컴포넌트들의 patterns(JS 조건부 렌더링)과도 어긋남.
- 체크마크는 기존 `Icon name="check"`을 16px(박스 전체 크기)로 그대로 채워 사용 —
  [[project_icon_duplicate_paths]]에서 확인된 path 동일성과 별개로, SortTabItem도 이미
  `Icon name="check" size={16}`을 동일하게 사용 중이라 선례 일치 확인.
- 색상: checked 배경 `--color-interactive-primary`(blue/600), unchecked 배경
  `--color-text-disabled`(gray/400), 체크마크 색 `--color-text-onbrand`(흰색). radius
  `--radius-xs`(2px). 모두 토큰 스케일에 정확히 존재, 누락 토큰 없음.
- 테스트는 `@testing-library/dom`의 `fireEvent`/`getByRole`을 사용 (프로젝트에
  `@testing-library/react`는 없고 `@testing-library/dom`만 devDependency 체인에 존재,
  [[project_test_infra]]와 일치). controlled/uncontrolled 토글 동작을 각각 별도 테스트로 검증.
