import type { CSSProperties, InputHTMLAttributes } from "react";

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {}

const inputStyle: CSSProperties = {
  boxSizing: "border-box",
  width: "100%",
  height: "var(--spacing-64)",
  padding: "var(--spacing-16) var(--spacing-24)",
  borderRadius: "var(--radius-md)",
  borderWidth: "var(--border-width-1)",
  borderStyle: "solid",
  borderColor: "var(--color-text-disabled)",
  outline: "none",
  backgroundColor: "transparent",
  color: "var(--color-text-primary)",
  fontFamily: "var(--typography-title-lg-regular-font-family)",
  fontWeight:
    "var(--typography-title-lg-regular-font-weight)" as unknown as number,
  fontSize: "var(--typography-title-lg-regular-font-size)",
  lineHeight: "var(--typography-title-lg-regular-line-height)",
};

/**
 * 게시글 제목을 입력하는 단일 텍스트 입력 필드.
 *
 * Figma: `Input`(node-id 764:2345, `Post` 섹션(781:5936) 하위, 840x64). variant가
 * 없는 단일 컴포넌트로, 실제 `<input>`을 그대로 확장(`value`/`onChange`/`placeholder` 등
 * 네이티브 props)해 controlled/uncontrolled 모두 지원합니다.
 *
 * - border 색상은 Figma에 바인딩된 변수명이 `text/disabled`(#d1d5db)라, 프로젝트 내
 *   동일 패턴인 `TitleInput`/`SearchBar`와 동일하게 `--color-text-disabled`를
 *   기본 테두리 색으로 사용합니다.
 * - 높이는 Figma의 64px가 `--spacing-64` 토큰과 정확히 일치해 그대로 사용했습니다.
 * - 너비는 Figma 원본이 840px 고정이지만 840은 spacing 스케일에 없는 값이라, 같은
 *   섹션의 `TitleInput`이 이미 확정한 방침(고정 데모 폭 대신 `w-full`)을 따라 부모 폭에
 *   맞추는 `w-full`(100%)로 구현했습니다. 실제 840px 폭은 사용처(예: 게시글 쓰기 폼)에서
 *   부모 컨테이너 너비로 제어하면 됩니다.
 */
export function Input({
  placeholder = "제목을 입력해주세요.",
  className = "",
  style,
  type = "text",
  ...rest
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={[
        "placeholder:text-[color:var(--color-text-primary)]",
        "disabled:text-[color:var(--color-text-tertiary)] disabled:placeholder:text-[color:var(--color-text-tertiary)] disabled:cursor-not-allowed",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ ...inputStyle, ...style }}
      {...rest}
    />
  );
}
