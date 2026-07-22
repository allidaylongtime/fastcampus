import type { CSSProperties, HTMLAttributes, MouseEventHandler } from "react";
import { Button } from "../Button";

export interface LoginSignProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** "회원가입" 버튼 클릭 핸들러 */
  onSignUpClick?: MouseEventHandler<HTMLButtonElement>;
}

const rootStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "var(--spacing-8)",
  paddingTop: "var(--spacing-12)",
  paddingBottom: "var(--spacing-12)",
  width: "100%",
};

const labelStyle: CSSProperties = {
  fontFamily: "var(--typography-caption-lg-medium-font-family)",
  fontWeight:
    "var(--typography-caption-lg-medium-font-weight)" as unknown as number,
  fontSize: "var(--typography-caption-lg-medium-font-size)",
  lineHeight: "var(--typography-caption-lg-medium-line-height)",
  color: "var(--color-text-tertiary)",
  textAlign: "center",
};

/**
 * "아직 피그마피디아 회원이 아니세요?" 안내 문구와 "회원가입" 버튼을 수직으로
 * 배치하는 로그인 폼 하단 블록.
 *
 * Figma: node-id 783:4161 (`LoginSign`). 안내 텍스트(783:4131) + `ButtonSmall`
 * 인스턴스(783:4359)의 조합입니다.
 *
 * - 기존 `Button`(variant="mono-light" size="small")을 그대로 재사용합니다.
 *   Figma 버튼 배경(`background/muted` #f5f7fa)·텍스트(`content/strong` #262626)
 *   색상이 `--color-button-mono-light-bg`/`-text` 토큰값과 정확히 일치해 확정한
 *   variant입니다 (사전 조사의 "outline" 추정과 다름). 새 UI를 추가로 만들지
 *   않습니다.
 * - 안내 텍스트는 Figma 스펙(`caption/lg/medium`, `--color-text-tertiary`)에
 *   맞춰 직접 렌더링합니다.
 * - 루트 너비는 Figma 원본의 185px 고정값 대신 `w-full`(100%)로 구현해 부모
 *   폭에 맞춰 늘어나도록 합니다 (LoginSetup/TitleInput과 동일한 컨벤션).
 */
export function LoginSign({
  onSignUpClick,
  className = "",
  style,
  ...rest
}: LoginSignProps) {
  return (
    <div
      className={["shrink-0", className].filter(Boolean).join(" ")}
      style={{ ...rootStyle, ...style }}
      data-login-sign="root"
      {...rest}
    >
      <p style={labelStyle} data-login-sign="label">
        아직 피그마피디아 회원이 아니세요?
      </p>
      <Button variant="mono-light" size="small" onClick={onSignUpClick}>
        회원가입
      </Button>
    </div>
  );
}
