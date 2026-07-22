---
name: project_button_node_781_5374
description: Figma Button 노드(781:5374, node-id=781-5374) 구조 조사 결과 — 3개 사이즈가 별도 컴포넌트셋으로 분리, style 오탈자, spacing 20px 누락 등
metadata:
  type: project
---

Figma 파일 `rR87YiUvJsp04GFlUL474X`의 "Button" 섹션(node-id 781:5374)은 하나의 컴포넌트셋이 아니라
사이즈별로 분리된 3개의 프레임/컴포넌트셋이다: `ButtonLarge`(137:1497), `ButtonMedium`(137:1384),
`ButtonSmall`(137:1610). 즉 Figma에는 `size` variant 속성이 없고, 크기별로 완전히 다른 컴포넌트셋이 존재한다.

**Why:** 향후 Button 컴포넌트를 실제로 구현(4단계 Generate)할 때 이 구조를 몰라서 `get_metadata`/
`get_design_context`를 node-id 781-5374에만 호출하면 sparse 응답만 오고, 각 사이즈 프레임(137:1384 /
137:1497 / 137:1610)에 개별적으로 다시 호출해야 실제 코드가 나온다. 매번 재조사하는 비용을 줄이기 위해 기록.

**변형(variant) 구조 (각 사이즈 프레임 공통):**

- `style`: `core` | `corelight` | `mono` | `monolight` | `outline` | `warining` | `warininglight`
  (Figma 원본에 오탈자 있음 — "warning"이 "warining", "warning-light"가 "warininglight"로 오기됨.
  의미상으로는 프로젝트의 `tokens/button-3068-1303.json` 색상 7종과 1:1 대응됨.)
- `type`: `label` | `icon` (아이콘 전용 정사각형 버튼)
- `disabled`: `true` | `false` (색상 변경 없이 전체 박스에 `opacity: 0.3`만 적용됨. hover/pressed/focus
  variant는 Figma에 전혀 존재하지 않음 — 필요하면 CSS `:hover`/`:active`로 새로 설계해야 함, 소스에 없음)
- `leadingArea`: boolean (label 타입에서 텍스트 옆에 리딩 아이콘을 붙일지 여부)

**색상 토큰 매핑 검증 결과:** 7개 `style` 값 모두 `tokens/button-3068-1303.json`의
`--color-button-{core,core-light,mono,mono-light,warning,warning-light}-bg/text`,
`--color-button-outline-bg/border/text`와 정확히 일치함(hex 대조 완료). 새 토큰 불필요.

**사이즈별 padding/gap/typography (px):**

- Large: padding 20px(H, spacing 스케일에 없음 ⚠️)/16px(V, spacing/16), gap 8px(spacing/8),
  font 16/700/24 → `--typography-button-*` 토큰과 정확히 일치. 아이콘 전용 정사각형 56×56(비-스페이싱 값, 아이콘 24px).
- Medium: padding 16px(spacing/16)/12px(spacing/12), gap 8px(spacing/8),
  font 14/700/21 → `docs/design-tokens.md`의 `body/sm/bold` 합성 토큰과 일치 (공용 `--typography-button-*`은 16/24라서 Medium엔 안 맞음). 아이콘 전용 정사각형 44×44(비-스페이싱 값, 아이콘 20px).
- Small: padding 12px(spacing/12)/8px(spacing/8), gap 4px(spacing/4),
  font 13/700/20 → `caption/lg/bold` 합성 토큰과 일치. 아이콘 전용 정사각형 32×32(아이콘 16px).
- `border-radius`는 모든 사이즈/타입에서 8px = `--border-radius-button` (radius/md)로 통일.

**⚠️ 누락/불일치 토큰:** ButtonLarge의 가로 패딩 20px은 프로젝트 spacing 스케일
(0/2/4/8/12/16/24/32/40/48/64)에 없음 — 16 또는 24 중 선택하거나 새 토큰 추가 여부를 구현 전 사용자에게
확인 필요. 아이콘 전용 정사각형 크기(44/56/32)도 spacing 토큰이 아닌 계산값(padding×2+아이콘크기)이라
하드코딩 여부를 사전에 논의해야 함.

**아이콘 연동:** `type=icon`일 때 Figma가 실제로 렌더링하는 이미지는 프로젝트 `Icon` 컴포넌트의
`iconview` placeholder variant(점선 원, 실제 아이콘 아님 — `src/components/ui/Icon/Icon.tsx`에 이미
`IconName`에서 의도적으로 제외되어 있음)이다. 즉 Figma 소스 자체에는 특정 아이콘이 박혀있지 않고, 실제
아이콘은 소비자가 채워야 하는 슬롯이다. 기존 `Icon` 컴포넌트(`name: IconName`, `size` prop)를 그대로
재사용 가능 — 사이즈별 아이콘 그래픽 크기는 large=24 / medium=20 / small=16.

**텍스트:** 라벨은 실제 편집 가능한 텍스트 레이어(`<p>Button</p>` 형태)로, Logo처럼 아웃라인 벡터가
아님 — `children`/`label` string prop으로 그대로 받을 수 있음.

**Code Connect:** `figma-code-connect.json`은 현재 `mappings: {}`로 비어 있음 — Button에 대한 기존
매핑 없음.

**How to apply:** 이 Button을 실제로 구현(Generate 단계)할 때 위 3개 프레임 node-id를 각각
`get_design_context`로 재조회하고, style 오탈자는 정규화해서 `variant: 'core'|'core-light'|'mono'|
'mono-light'|'warning'|'warning-light'|'outline'`로 매핑하며, `size: 'large'|'medium'|'small'`은
React prop으로 통합하되 Figma에는 그런 단일 variant가 없었다는 점을 인지할 것. Large 20px 패딩과
아이콘 전용 정사각형 크기는 구현 계획(3단계) 때 반드시 사용자에게 먼저 확인.
