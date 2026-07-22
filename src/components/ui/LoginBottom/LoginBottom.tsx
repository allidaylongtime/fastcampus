import type {
  ChangeEventHandler,
  CSSProperties,
  HTMLAttributes,
  MouseEventHandler,
} from "react";
import { LoginSetup } from "../LoginSetup";
import { LoginSign } from "../LoginSign";

export interface LoginBottomProps extends Omit<
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
  /** "회원가입" 버튼 클릭 핸들러 */
  onSignUpClick?: MouseEventHandler<HTMLButtonElement>;
}

const rootStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "var(--spacing-8)",
  width: "100%",
};

/**
 * 로그인 폼 하단 전체 블록. 기존 `LoginSetup`(로그인 유지 + 비밀번호 찾기)과
 * `LoginSign`(안내 문구 + 회원가입)을 세로로 묶는 얇은 컨테이너입니다.
 *
 * Figma: node-id 781:5042 (`LoginBottom`). `LoiginSetup`(783:4159, 오탈자) +
 * `LoginSign`(783:4161)을 `flex-col`, `align-items: flex-start`,
 * `gap: var(--spacing/8, 8px)`으로 배치한 컨테이너입니다. 두 섹션 사이에
 * 구분선(Divider)은 없습니다 (get_design_context로 확인, 사용자 확정).
 *
 * - 새 UI를 추가하지 않고 기존 `LoginSetup` / `LoginSign`을 그대로 재사용합니다.
 * - 자식 컴포넌트의 props(`checked`, `defaultChecked`, `onChange`,
 *   `onFindPasswordClick`, `onSignUpClick`)를 그대로 위로 노출해 pass-through합니다.
 * - 루트 너비는 Figma 원본의 320px 고정값 대신 `w-full`(100%)로 구현합니다
 *   (LoginSetup/LoginSign과 동일한 컨벤션, 사용자 확정).
 */
export function LoginBottom({
  checked,
  defaultChecked = false,
  onChange,
  onFindPasswordClick,
  onSignUpClick,
  className = "",
  style,
  ...rest
}: LoginBottomProps) {
  return (
    <div
      className={["shrink-0", className].filter(Boolean).join(" ")}
      style={{ ...rootStyle, ...style }}
      data-login-bottom="root"
      {...rest}
    >
      <LoginSetup
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        onFindPasswordClick={onFindPasswordClick}
      />
      <LoginSign onSignUpClick={onSignUpClick} />
    </div>
  );
}
