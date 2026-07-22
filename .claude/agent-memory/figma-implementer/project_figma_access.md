---
name: project_figma_access
description: Figma file IRscndBxHJbK2wgkP6WCjP MCP calls fail with edit-access error even though user is confirmed file owner — likely MCP auth/login mismatch, not file permission
metadata:
  type: project
---

Figma 파일 `IRscndBxHJbK2wgkP6WCjP` ("[실습자료 복사] Part 2. 클로드 코드 Figma MCP 조합으로 디자인 시스템 구성하기 (Copy)")에 대해 `get_variable_defs`, `get_metadata` 등 MCP 도구 호출 시 다음 오류가 발생했음 (2026-07-03 확인):

```
Looks like you don't have edit access to this file. The file owner can share it with you and make you an editor.
```

**Why:** 처음엔 파일 자체의 editor 권한 문제로 추정했으나, 사용자가 "내가 owner이고 복사된 파일이라 수정 가능한 상태"라고 확인함 (2026-07-03). 즉 Figma 파일 자체의 권한은 문제가 아님. `get_variable_defs`/`get_metadata`/`get_design_context` 세 도구 모두 동일 에러 문구("Looks like you don't have edit access to this file...")를 반복 반환 — Debug UUID만 매번 다름. whoami 같은 인증 확인 도구가 MCP에 노출되어 있지 않아 실제 연결된 Figma 계정을 코드에서 검증할 수 없었음. 사용자 계정은 didorphin2015@gmail.com.

**How to apply:** 이 파일(`IRscndBxHJbK2wgkP6WCjP`) 관련 작업 요청 시, 파일 소유권 문제가 아니라 **MCP 클라이언트(Figma 데스크톱 앱 등)의 로그인 계정/인증 세션 문제일 가능성이 높음**을 먼저 안내할 것. 재시도만 반복하지 말고, 사용자에게 Figma 데스크톱 앱 로그인 계정 확인 및 재인증(재로그인/MCP 플러그인 재연결)을 요청할 것. 권한/인증이 해결된 것이 확인되면(같은 파일에 대해 get_variable_defs 등이 성공하면) 이 메모리를 업데이트하거나 삭제할 것.

**추가 검증 (2026-07-03):** 사용자가 파일을 Draft에서 Project로 이동한 뒤 동일 URL/node-id로 재시도했으나 `get_variable_defs`가 여전히 완전히 동일한 에러 문구로 실패함 (Debug UUID만 다름). 이는 파일 위치(Draft vs Project)나 공유 설정이 원인이 아님을 시사하며, MCP 세션 인증/연결 문제 쪽으로 원인 범위가 좁혀짐. 이 MCP 도구셋에는 whoami나 재인증 트리거 도구가 없어 이 이상은 코드 상에서 검증 불가 — 사용자 측 Figma 클라이언트 재로그인/MCP 재연결이 유일한 다음 조치.
