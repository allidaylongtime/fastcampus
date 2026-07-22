---
name: project-titleinput-component
description: TitleInput 컴포넌트(783:3924) 구현 완료 - focus는 CSS 의사클래스, error는 명시적 prop, disabled는 네이티브 처리 방식
metadata:
  type: project
---

`src/components/ui/TitleInput/`에 label+input+helpText 조합 텍스트 필드 구현 완료 (2026-07-07).

- Figma `type` variant 4종(default/focus/error/disabled) 중 `focus`는 실제 값·색상 차이가
  `default` 대비 border/helpText 색만 바뀌는 순수 상호작용 상태라고 판단해 별도 prop 없이
  **CSS `:focus` / `group-focus-within:`** 로 구현(Checkbox처럼 JS 상태 추적 불필요, 실제
  `<input>`을 그대로 확장하는 표준 폼 컴포넌트라서 controlled/uncontrolled 로직도 필요 없음).
- `error`는 Figma에 자동 트리거 수단이 없어 명시적 `error?: boolean` prop. error와 focus가
  동시 발생하면 error 스타일이 항상 우선(Figma에 정의 안 된 조합이라 일반 UX 관례로 결정).
- 색상 매핑: default border `--color-text-disabled`, focus border/helpText
  `--color-interactive-primaryhover`, error border/helpText `--color-interactive-destructivehover`,
  disabled input 텍스트/placeholder `--color-text-tertiary`(disabled의 border/helpText는
  default와 동일하게 `--color-text-disabled`/`--color-text-tertiary`).
- 아이콘 슬롯(16x16 dotted)은 실제 렌더링용 아님 → 미구현 (사용자 확정).
- 루트 너비는 Figma 데모의 고정 345px 대신 `w-full`(부모 폭 100%)로 구현 — 사용자가 명시적으로
  승인. border-width 1px은 색상만 토큰화하고 두께 자체는 [[project_test_infra]]에 기록된
  SearchBar 컨벤션과 동일하게 하드코딩 유지(토큰 테이블에 border-width 토큰이 없음).
- helpText 존재 시 항상(에러 여부 무관) `aria-describedby`로 연결하기로 결정(요청은 error일 때만
  명시했지만 항상 연결하는 편이 더 견고하다고 판단, 사용자 승인 받음).
