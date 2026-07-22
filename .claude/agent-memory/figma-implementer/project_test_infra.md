---
name: project_test_infra
description: fastcampus 저장소의 실제 빌드/타입체크/테스트 명령어와 vitest 실행 범위 (CLAUDE.md에 적힌 것과 실제가 다름)
metadata:
  type: project
---

`fastcampus` 저장소는 CLAUDE.md에 `npm run typecheck`, `npm test` 명령이 문서화되어 있지만
(2026-07-06 최종 확인 시점) `package.json`의 실제 scripts에는 `typecheck`도 `test`도 없다.

- 타입체크: `npm run typecheck`가 없으므로 `npx tsc -b` (또는 `--noEmit`)로 대체 실행해야 함.
- 빌드: `npm run build` (`build:tokens` → `tsc -b` → `vite build`) 는 정상 동작.
- lint: `npm run lint`는 ESLint가 아니라 `oxlint`. (CLAUDE.md는 "ESLint + Prettier"라고 적혀 있지만 실제론 oxlint)
- 테스트: `vite.config.ts`의 `test.projects`에 두 프로젝트가 있음 (둘 다 playwright chromium 브라우저 모드):
  1. `storybook` — `@storybook/addon-vitest`의 `storybookTest()`. `.stories.tsx` 안의 play function을 테스트로 수집.
  2. `unit` — `include: ["src/**/*.test.{ts,tsx}"]`. 컴포넌트별 `Component.test.tsx` 파일을 **정상적으로 자동 수집**한다.
     즉 `npx vitest run` 한 번으로 story play function + 개별 `.test.tsx` 유닛 테스트가 모두 실행된다.
     `@testing-library/react`/`jsdom`은 여전히 설치되어 있지 않으므로 (`@testing-library/dom`만 존재),
     테스트는 `react-dom/client`의 `createRoot` + `@testing-library/dom`의 `getByRole` 등으로 작성해야 하며
     브라우저 모드(playwright chromium)에서 실행된다.

**Why:** 2026-07-06 초반 Divider 작업 때는 `unit` 프로젝트가 없어 `Divider.test.tsx`가 수집되지 않았으나,
같은 날 이후 PostCardImage/PostImage 작업 시점에 `vite.config.ts`에 `unit` 프로젝트가 추가된 것을 확인함
(`npx vitest run` 결과 "storybook (chromium)"과 "unit (chromium)" 두 프로젝트 모두에서 테스트가 실행되고,
`PostCardImage.test.tsx`/`PostImage.test.tsx`도 정상 통과함). 이전 메모(“Component.test.tsx는 수집되지 않는다”)는
더 이상 유효하지 않음 — 설정 파일이 그 사이 변경되었기 때문.

**How to apply:** 이 저장소에서 컴포넌트 구현 후 검증 단계를 진행할 때:

1. 타입체크는 `npx tsc -b`로 수행하고, 사용자에게 보고할 때 "`npm run typecheck` 스크립트가
   없어 `tsc -b`로 대체 실행" 이라고 명시할 것.
2. `Component.test.tsx`는 계속 작성하고, `npx vitest run`으로 실제 실행되는지 항상 재확인할 것 —
   현재는 `unit` 프로젝트가 자동 수집하지만, 이 결론도 `vite.config.ts`가 다시 바뀌면 무효화될 수 있으므로
   매 작업마다 `vite.config.ts`의 `test.projects` 구성을 먼저 확인할 것.
3. lint 결과를 보고할 때는 "oxlint 통과"라고 명시할 것 (CLAUDE.md의 "ESLint" 표현과 다름).
