---
name: project_postcard_component
description: PostCard(137:1364) 구현 완료 — chips 배열형 API, line-clamp 2줄, 루트 840px 고정은 모두 사용자 확정 후 반영
metadata:
  type: project
---

`src/components/ui/PostCard`(최상위 조합 컴포넌트, Chip/PostCardStats/PostCardImage를
그대로 조합)를 구현하며 확정된 사실.

- **ChipArea는 배열형(`chips?: Array<{ label: string; type?: ChipType }>`)으로 결정**.
  Figma 예시 인스턴스는 notice+category 칩 2개를 하드코딩해서 보여주지만, 실제로는
  0~N개 자유 조합이 필요하다고 판단해 사용자에게 "배열형 vs 고정 categoryLabel+isNotice"
  두 안을 제시했고, 사용자가 배열형을 채택함. **Why:** 확장성 원칙(`.claude/CLAUDE.md`의
  "확장성/유연성 검토")에 부합하고 향후 칩 종류/개수가 늘어나도 API 변경이 필요 없음.
  **How to apply:** 앞으로 Figma 예시 인스턴스에 동일 컴포넌트가 여러 개 나열된 패턴을
  보면(칩, 배지 등), 그 개수를 props로 고정하지 말고 배열/리스트 형태 제안을 우선 고려할 것.
- **preview 텍스트 2줄 line-clamp**: Figma 변환 코드가 `overflow-hidden text-ellipsis`만
  갖고 `white-space: nowrap`/`line-clamp` 클래스가 없어 문자 그대로는 트렁케이션이
  발동하지 않는 모순된 조합이었음. 기본 예시 텍스트가 정확히 2줄에 맞춰 배치되어 있다는
  근거로 "2줄 line-clamp"라고 가설을 세워 사용자에게 확인 후 승인받아
  `-webkit-line-clamp: 2` 방식으로 구현. **Why:** Figma MCP가 반환하는 Tailwind 변환
  코드는 텍스트 트렁케이션 같은 동적 동작(CSS만으로 재현 어려운 것)을 항상 정확히
  반영하지 못할 수 있음 — 특히 line-clamp 계열은 스크린샷의 텍스트 줄바꿈 결과로
  역추론해야 하는 경우가 있었음. **How to apply:** 비슷하게 애매한 텍스트 트렁케이션
  클래스 조합(nowrap 없는 ellipsis 등)을 만나면, 스크린샷에서 실제 줄바꿈 결과를 보고
  가설을 세운 뒤 반드시 사용자 확인을 받을 것 — 임의로 line-clamp 유무/줄 수를 결정하지 말 것.
- **루트 width 840px 고정**: Figma 원본은 루트에 명시적 width가 없고(내부 두 섹션만
  840px 고정, 루트는 hug) 사용자가 "루트도 포함해 전체 고정"으로 확정. Figma 원본과
  다르게 구현한 케이스이므로 컴포넌트 JSDoc에 "Figma 원본과 다르게 적용"이라고 명시해둠.
- 미보유 spacing 근사(ChipArea gap 6px→`--spacing-8`, PostCardBody gap 20px→`--spacing-24`)는
  [[project_postcardstats_component]]에서 확립한 "다음으로 큰 토큰으로 반올림" 관례를
  그대로 적용, 사용자 사전 승인 받음.
- vitest 실행 시 `toBeInTheDocument`(jest-dom matcher) 사용 시 `unit` 프로젝트에서
  타입 에러 발생 — 이 저장소의 `unit` 테스트는 jest-dom을 세팅하지 않으므로(스토리
  play function만 `storybook/test`에서 jest-dom 확장 제공), `Component.test.tsx`에서는
  `.not.toBeNull()` 등 plain assertion만 사용해야 함. [[project_test_infra]]에 이어
  실제 타입체크(`tsc -b`)로 이 문제를 미리 잡아냈음.
