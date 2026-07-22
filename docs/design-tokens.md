# 디자인 토큰 매핑 테이블

> Figma 변수명 ↔ CSS custom property 매핑.
> Claude Code가 Figma 디자인 구현 시 이 문서를 참조합니다.
> 토큰 추가/변경 시 이 문서도 업데이트하세요.

## 네이밍 규칙

Figma `/` → CSS `-` 변환. 예: `color/bg/primary` → `--color-bg-primary`

## 출처

아래 표는 Figma 파일(node-id 4035-1488, `실습자료 Part 2. 클로드 코드 Figma MCP 조합으로 디자인 시스템 구성하기`)에서
`get_variable_defs`로 가져온 실제 변수값입니다.

- 색상 · 스페이싱: `src/tokens/colors.css`, `src/tokens/spacing.css` (CSS custom properties 직접 작성)
- 라디우스 · 타이포그래피: `tokens/radius.json`, `tokens/typography.json` (Style Dictionary 소스, `npm run build:tokens`로 `src/tokens/_generated.css`에 반영)

## 색상 — Primitive (원시값)

Figma의 `gray/*`, `blue/*`, `red/*` 스케일. Semantic 토큰이 이 값을 참조(alias)합니다.

| Figma 변수명 | CSS Property                | 값      |
| ------------ | --------------------------- | ------- |
| gray/100     | --color-primitive-gray-100  | #ffffff |
| gray/200     | --color-primitive-gray-200  | #fafafa |
| gray/300     | --color-primitive-gray-300  | #f5f7fa |
| gray/305     | --color-primitive-gray-305  | #f1f5f9 |
| gray/340     | --color-primitive-gray-340  | #e2e8f0 |
| gray/360     | --color-primitive-gray-360  | #e5e7eb |
| gray/400     | --color-primitive-gray-400  | #d1d5db |
| gray/490     | --color-primitive-gray-490  | #94a3b8 |
| gray/500     | --color-primitive-gray-500  | #9ca3af |
| gray/540     | --color-primitive-gray-540  | #7c8484 |
| gray/600     | --color-primitive-gray-600  | #6b7280 |
| gray/610     | --color-primitive-gray-610  | #64748b |
| gray/700     | --color-primitive-gray-700  | #4b5563 |
| gray/800     | --color-primitive-gray-800  | #374151 |
| gray/850     | --color-primitive-gray-850  | #2c3030 |
| gray/900     | --color-primitive-gray-900  | #262626 |
| gray/1000    | --color-primitive-gray-1000 | #161c1c |
| gray/1050    | --color-primitive-gray-1050 | #0f172a |
| blue/20      | --color-primitive-blue-20   | #f7faff |
| blue/50      | --color-primitive-blue-50   | #eff6ff |
| blue/100     | --color-primitive-blue-100  | #f1f8fe |
| blue/120     | --color-primitive-blue-120  | #dbeafe |
| blue/200     | --color-primitive-blue-200  | #b8dcfc |
| blue/280     | --color-primitive-blue-280  | #93c5fd |
| blue/300     | --color-primitive-blue-300  | #91caff |
| blue/400     | --color-primitive-blue-400  | #69b1ff |
| blue/440     | --color-primitive-blue-440  | #63a3fb |
| blue/500     | --color-primitive-blue-500  | #4096ff |
| blue/540     | --color-primitive-blue-540  | #3b82f6 |
| blue/600     | --color-primitive-blue-600  | #1289f6 |
| blue/680     | --color-primitive-blue-680  | #1d4ed8 |
| blue/700     | --color-primitive-blue-700  | #0958d9 |
| blue/800     | --color-primitive-blue-800  | #003eb3 |
| blue/900     | --color-primitive-blue-900  | #002c8c |
| blue/1000    | --color-primitive-blue-1000 | #001d66 |
| red/100      | --color-primitive-red-100   | #fffbfc |
| red/200      | --color-primitive-red-200   | #fff2f5 |
| red/300      | --color-primitive-red-300   | #ffccc7 |
| red/400      | --color-primitive-red-400   | #ffa39e |
| red/500      | --color-primitive-red-500   | #ff4d4f |
| red/600      | --color-primitive-red-600   | #fc2a55 |
| red/700      | --color-primitive-red-700   | #cf1322 |
| red/800      | --color-primitive-red-800   | #a8071a |
| red/900      | --color-primitive-red-900   | #820014 |
| red/1000     | --color-primitive-red-1000  | #5c0011 |

## 색상 — Semantic (의미론적 참조)

Figma에서 alias(참조) 변수로 존재하는 것들. `tokens/color.json`에서도 Style Dictionary
`{color.primitive....}` 참조 문법으로 동일하게 연결되어 있습니다 (값 하드코딩 아님).

| Figma 변수명                 | CSS Property                         | 참조하는 Primitive | 값      | 용도                  |
| ---------------------------- | ------------------------------------ | ------------------ | ------- | --------------------- |
| text/primary                 | --color-text-primary                 | gray/1000          | #161c1c | 주요 텍스트           |
| text/secondary               | --color-text-secondary               | gray/600           | #6b7280 | 보조 텍스트           |
| text/tertiary                | --color-text-tertiary                | gray/500           | #9ca3af | 3차 텍스트            |
| text/disabled                | --color-text-disabled                | gray/400           | #d1d5db | 비활성 텍스트         |
| text/onbrand                 | --color-text-onbrand                 | gray/100           | #ffffff | 브랜드 배경 위 텍스트 |
| text/Danger                  | --color-text-danger                  | red/600            | #fc2a55 | 에러 텍스트           |
| background/default           | --color-background-default           | gray/100           | #ffffff | 주요 배경             |
| background/Subtle            | --color-background-subtle            | gray/200           | #fafafa | 은은한 배경           |
| background/muted             | --color-background-muted             | gray/300           | #f5f7fa | 보조 배경             |
| background/brand             | --color-background-brand             | blue/600           | #1289f6 | 브랜드 배경           |
| background/brandsubtle       | --color-background-brandsubtle       | blue/100           | #f1f8fe | 브랜드 연한 배경      |
| background/danger            | --color-background-danger            | red/200            | #fff2f5 | 에러 배경             |
| background/dangersubtle      | --color-background-dangersubtle      | red/100            | #fffbfc | 에러 연한 배경        |
| border/default               | --color-border-default               | gray/400           | #d1d5db | 기본 보더             |
| border/strong                | --color-border-strong                | gray/700           | #4b5563 | 강조 보더             |
| border/brand                 | --color-border-brand                 | blue/600           | #1289f6 | 브랜드 보더           |
| border/danger                | --color-border-danger                | red/600            | #fc2a55 | 에러 보더             |
| interactive/primary          | --color-interactive-primary          | blue/600           | #1289f6 | 주요 인터랙션         |
| interactive/primaryhover     | --color-interactive-primaryhover     | blue/700           | #0958d9 | 주요 인터랙션 hover   |
| interactive/destructive      | --color-interactive-destructive      | red/600            | #fc2a55 | 파괴적 인터랙션       |
| interactive/destructivehover | --color-interactive-destructivehover | red/700            | #cf1322 | 파괴적 인터랙션 hover |
| content/strong               | --color-content-strong               | gray/900           | #262626 | 강조 콘텐츠           |
| content/default              | --color-content-default              | gray/800           | #374151 | 기본 콘텐츠           |
| content/muted                | --color-content-muted                | gray/700           | #4b5563 | 보조 콘텐츠           |

## 스페이싱

Figma `spacing/*` 변수 (raw 값, alias 없음). `tokens/spacing.json`에 px 단위로 반영.

| Figma 변수명 | CSS Property | 값   |
| ------------ | ------------ | ---- |
| spacing/0    | --spacing-0  | 0px  |
| spacing/2    | --spacing-2  | 2px  |
| spacing/4    | --spacing-4  | 4px  |
| spacing/8    | --spacing-8  | 8px  |
| spacing/12   | --spacing-12 | 12px |
| spacing/16   | --spacing-16 | 16px |
| spacing/24   | --spacing-24 | 24px |
| spacing/32   | --spacing-32 | 32px |
| spacing/40   | --spacing-40 | 40px |
| spacing/48   | --spacing-48 | 48px |
| spacing/64   | --spacing-64 | 64px |

> 이전 문서에 있던 `color/bg/primary`, `spacing/xs~xl` 등 예시 행은 이번에 Figma에서
> 실제로 가져온 변수명·값과 다르므로 제거했습니다 (혼동 방지). 실제 사용 가능한 spacing 스케일은
> 위 `spacing/0 ~ spacing/64` 입니다.

## 보더 두께

Figma 변수에는 없으나, 여러 컴포넌트에서 반복되던 `1px` 보더 하드코딩을 정리하기
위해 프로젝트에서 자체적으로 추가한 토큰입니다. `tokens/border-width.json`에
반영했습니다.

| CSS Property     | 값  | 비고                            |
| ---------------- | --- | ------------------------------- |
| --border-width-1 | 1px | Figma 변수 없음 (프로젝트 추가) |

## 라디우스

Figma `radius/*` 변수 (raw 값, alias 없음). `tokens/radius.json`에 px 단위로 반영.
`tokens/button-3068-1303.json`의 `borderRadius.button`(`--border-radius-button`)과는
별도 네임스페이스(`radius.*` → `--radius-*`)로 분리되어 있어 이름 충돌이 없습니다.

| Figma 변수명  | CSS Property    | 값     |
| ------------- | --------------- | ------ |
| radius/none   | --radius-none   | 0px    |
| radius/xs     | --radius-xs     | 2px    |
| radius/sm     | --radius-sm     | 4px    |
| radius/md     | --radius-md     | 8px    |
| radius/lg     | --radius-lg     | 12px   |
| radius/xl     | --radius-xl     | 16px   |
| radius/2xl    | --radius-2xl    | 24px   |
| radius/3xl    | --radius-3xl    | 32px   |
| radius/circle | --radius-circle | 9999px |

## 타이포그래피

Figma `typography/*` primitive(폰트 패밀리·굵기·크기·행간)와 이를 조합한
`title|display|body|caption/*` 합성 토큰. `tokens/typography.json`에 반영했으며,
합성 토큰은 모두 primitive를 `{typography.primitive....}` 참조로 연결해 값을 중복
하드코딩하지 않았습니다. `tokens/button-3068-1303.json`의 `typography.button.*`
(`--typography-button-*`)과는 하위 경로가 겹치지 않아 충돌 없이 공존합니다.

### Primitive

| Figma 변수명                       | CSS Property                               | 값         |
| ---------------------------------- | ------------------------------------------ | ---------- |
| typography/font family/font family | --typography-primitive-font-family-base    | Pretendard |
| typography/font weight/regular     | --typography-primitive-font-weight-regular | 400        |
| typography/font weight/medium      | --typography-primitive-font-weight-medium  | 500        |
| typography/font weight/bold        | --typography-primitive-font-weight-bold    | 700        |
| typography/size/12                 | --typography-primitive-font-size-12        | 12px       |
| typography/size/13                 | --typography-primitive-font-size-13        | 13px       |
| typography/size/14                 | --typography-primitive-font-size-14        | 14px       |
| typography/size/16                 | --typography-primitive-font-size-16        | 16px       |
| typography/size/18                 | --typography-primitive-font-size-18        | 18px       |
| typography/size/20                 | --typography-primitive-font-size-20        | 20px       |
| typography/size/24                 | --typography-primitive-font-size-24        | 24px       |
| typography/size/32                 | --typography-primitive-font-size-32        | 32px       |
| typography/line height/18          | --typography-primitive-line-height-18      | 18px       |
| typography/line height/20          | --typography-primitive-line-height-20      | 20px       |
| typography/line height/21          | --typography-primitive-line-height-21      | 21px       |
| typography/line height/24          | --typography-primitive-line-height-24      | 24px       |
| typography/line height/27          | --typography-primitive-line-height-27      | 27px       |
| typography/line height/30          | --typography-primitive-line-height-30      | 30px       |
| typography/line height/36          | --typography-primitive-line-height-36      | 36px       |
| typography/line height/48          | --typography-primitive-line-height-48      | 48px       |

`Size/Title`(18), `Size/Caption`(13)은 Figma에서 별도 alias 변수로 존재하지만
각각 `typography/size/18`, `typography/size/13`과 값이 동일한 소스이므로,
`tokens/typography.json`에서는 별도 변수를 만들지 않고 해당 합성 토큰(`title/sm/*`,
`caption/*/medium` 등)이 `typography.primitive.fontSize.18` / `.13`을 직접
참조하도록 연결했습니다.

### 합성 토큰 (Display / Title / Body / Caption)

| Figma 변수명       | CSS Property (font-size 예시)             | fontSize | fontWeight | lineHeight | 용도                  |
| ------------------ | ----------------------------------------- | -------- | ---------- | ---------- | --------------------- |
| display/lg/bold    | --typography-display-lg-bold-font-size    | 32px     | 700        | 48px       | 대형 디스플레이(굵게) |
| display/lg/regular | --typography-display-lg-regular-font-size | 32px     | 400        | 48px       | 대형 디스플레이       |
| display/sm/bold    | --typography-display-sm-bold-font-size    | 24px     | 700        | 36px       | 소형 디스플레이(굵게) |
| display/sm/regular | --typography-display-sm-regular-font-size | 24px     | 400        | 36px       | 소형 디스플레이       |
| title/lg/bold      | --typography-title-lg-bold-font-size      | 20px     | 700        | 30px       | 대제목(굵게)          |
| title/lg/regular   | --typography-title-lg-regular-font-size   | 20px     | 400        | 30px       | 대제목                |
| title/sm/bold      | --typography-title-sm-bold-font-size      | 18px     | 700        | 27px       | 소제목(굵게)          |
| title/sm/regular   | --typography-title-sm-regular-font-size   | 18px     | 400        | 27px       | 소제목                |
| body/lg/bold       | --typography-body-lg-bold-font-size       | 16px     | 700        | 24px       | 본문 대(굵게)         |
| body/lg/regular    | --typography-body-lg-regular-font-size    | 16px     | 400        | 24px       | 본문 대               |
| body/sm/bold       | --typography-body-sm-bold-font-size       | 14px     | 700        | 21px       | 본문 소(굵게)         |
| body/sm/regular    | --typography-body-sm-regular-font-size    | 14px     | 400        | 21px       | 본문 소               |
| caption/lg/bold    | --typography-caption-lg-bold-font-size    | 13px     | 700        | 20px       | 캡션 대(굵게)         |
| caption/lg/medium  | --typography-caption-lg-medium-font-size  | 13px     | 500        | 20px       | 캡션 대(medium)       |
| caption/lg/regular | --typography-caption-lg-regular-font-size | 13px     | 400        | 20px       | 캡션 대               |
| caption/sm/bold    | --typography-caption-sm-bold-font-size    | 12px     | 700        | 18px       | 캡션 소(굵게)         |
| caption/sm/medium  | --typography-caption-sm-medium-font-size  | 12px     | 500        | 18px       | 캡션 소(medium)       |
| caption/sm/regular | --typography-caption-sm-regular-font-size | 12px     | 400        | 18px       | 캡션 소               |

각 합성 토큰은 `-font-family`, `-font-weight`, `-font-size`, `-line-height` 4개의
CSS Property로 생성됩니다 (예: `title/lg/bold` → `--typography-title-lg-bold-font-family`,
`--typography-title-lg-bold-font-weight`, `--typography-title-lg-bold-font-size`,
`--typography-title-lg-bold-line-height`). 모든 `fontFamily`는
`--typography-primitive-font-family-base`(Pretendard)를 참조합니다.

## 이번 동기화에서 의도적으로 제외한 Figma 변수

다음 변수들은 `get_variable_defs`에 포함되어 있지만, 검토 결과 `tokens/*.json`에
**추가하지 않기로 확정**했습니다 (보류가 아니라 완전 제외 결정):

- `var(--sds-color-background-neutral-default)`(#5a5a5a) — Figma 변수명이 아닌 raw
  CSS var 문자열로 export된 레거시/오류성 값이므로 반영하지 않기로 확정했습니다.

> ~~`Gray/100`(#f9fafb), `Gray/200`(#f3f4f6) 대소문자 충돌~~ — Figma에서 해당 변수가
> 정리되어 더 이상 이 값으로 존재하지 않습니다. 대신 새 `gray/200`(#fafafa)이 추가되어
> `color.primitive.gray.200`으로 반영했고, 기존 `background/subtle`의 하드코딩 값을
> `{color.primitive.gray.200}` 참조로 교체했습니다 (위 Primitive/Semantic 표 참고).

## 하드코딩 허용 예외

- **`Icon.tsx`의 `google` 아이콘(4색 hex: `#F44336`, `#FFC107`, `#448AFF`, `#43A047`)**
  — Google 브랜드 로고는 브랜드 가이드라인이 고정한 색상이며 디자인 시스템의
  의미론적 팔레트가 아니므로, 토큰화 대상에서 제외하고 hex 하드코딩을 허용합니다.
  다른 아이콘(단색, `currentColor` 사용)과 달리 이 경우만 예외입니다.

## Claude용 규칙

1. Figma MCP가 hex 색상 반환 → 이 테이블에서 찾아서 `var(--color-*)` 사용
2. Figma가 스페이싱 숫자 반환 → `var(--spacing-*)` 매핑
3. 테이블에 없는 값 → 새 변수 만들지 말고 `/* ⚠️ 누락된 토큰 */` 플래그
4. 브랜드 로고 등 고정 색상은 위 "하드코딩 허용 예외" 참고 (임의로 새 예외 추가 금지, 이 문서에 먼저 기록)
