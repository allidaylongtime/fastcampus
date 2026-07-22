import type {
  ChangeEventHandler,
  CSSProperties,
  HTMLAttributes,
  MouseEventHandler,
} from "react";
import { Checkbox } from "../Checkbox";
import { Button } from "../Button";

export interface LoginSetupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "onChange"
> {
  /** "로그인 유지" 체크박스의 controlled checked 값. 생략 시 uncontrolled로 동작 */
  checked?: boolean;
  /** uncontrolled 초기 checked 값. 기본값 false */
  defaultChecked?: boolean;
  /** 체크박스 상태 변경 핸들러 */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /** "비밀번호 찾기" 버튼 클릭 핸들러 */
  onFindPasswordClick?: MouseEventHandler<HTMLButtonElement>;
}

const rootStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
};

const leftGroupStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  // ⚠️ Figma 원본 gap 7px → spacing 스케일(0,2,4,8,12,16,24,32,40,48,64)에 없어
  // Category/PostCardStats/PostCard와 동일한 관례(다음으로 큰 토큰으로 반올림)에 따라
  // --spacing-8을 사용합니다 (사용자 승인).
  gap: "var(--spacing-8)",
};

const labelStyle: CSSProperties = {
  fontFamily: "var(--typography-caption-lg-medium-font-family)",
  fontWeight:
    "var(--typography-caption-lg-medium-font-weight)" as unknown as number,
  fontSize: "var(--typography-caption-lg-medium-font-size)",
  lineHeight: "var(--typography-caption-lg-medium-line-height)",
  color: "var(--color-content-strong)",
  whiteSpace: "nowrap",
};

/**
 * "로그인 유지" 체크박스와 "비밀번호 찾기" 버튼을 좌우로 배치하는 로그인 폼 하단 행.
 *
 * Figma: node-id 783:4159 (노드명 `LoiginSetup`, 오탈자 — 컴포넌트명은 `LoginSetup`으로
 * 정정, 사용자 확정). 좌측 그룹(783:4157) + 우측 `ButtonSmall`(783:4349)의 조합입니다.
 *
 * - 기존 `Checkbox` / `Button`(variant="outline" size="small")을 그대로 재사용합니다.
 *   새 UI를 추가로 만들지 않습니다.
 * - 라벨 텍스트는 `Checkbox`의 내장 `label` prop(자체적으로 `body/sm/regular` +
 *   `--color-text-primary`로 고정)을 사용하지 않고, `LoginSetup`에서 별도 `<span>`으로
 *   Figma 스펙(`caption/lg/medium`, `--color-content-strong`)에 맞춰 직접 렌더링합니다
 *   (사용자 확정 — Figma 픽셀 일치 우선, `Checkbox`에는 `aria-label`만 전달).
 * - 루트 너비는 Figma 원본의 297px 고정값 대신 `w-full`(100%)로 구현해 부모 폭에 맞춰
 *   늘어나도록 합니다 (사용자 확정).
 * - 좌측 그룹의 gap은 Figma 원본 7px이 spacing 토큰 스케일에 없어, 기존 반올림 관례에
 *   따라 `--spacing-8`을 사용합니다 (사용자 승인).
 */
export function LoginSetup({
  checked,
  defaultChecked = false,
  onChange,
  onFindPasswordClick,
  className = "",
  style,
  ...rest
}: LoginSetupProps) {
  return (
    <div
      className={["shrink-0", className].filter(Boolean).join(" ")}
      style={{ ...rootStyle, ...style }}
      data-login-setup="root"
      {...rest}
    >
      <div style={leftGroupStyle} data-login-setup="left">
        <Checkbox
          aria-label="로그인 유지"
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
        />
        <span style={labelStyle} data-login-setup="label">
          로그인 유지
        </span>
      </div>
      <Button variant="outline" size="small" onClick={onFindPasswordClick}>
        비밀번호 찾기
      </Button>
    </div>
  );
}
