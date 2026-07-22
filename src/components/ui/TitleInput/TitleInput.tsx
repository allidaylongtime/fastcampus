import { useId, type CSSProperties, type InputHTMLAttributes } from "react";

export interface TitleInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  /** 입력 필드 라벨 텍스트 */
  label: string;
  /** 입력 필드 하단 도움말/에러 텍스트(선택) */
  helpText?: string;
  /** 에러 상태 여부. 기본값 false. Figma "error" variant에 대응 */
  error?: boolean;
}

const labelStyle: CSSProperties = {
  fontFamily: "var(--typography-body-sm-bold-font-family)",
  fontWeight: "var(--typography-body-sm-bold-font-weight)" as unknown as number,
  fontSize: "var(--typography-body-sm-bold-font-size)",
  lineHeight: "var(--typography-body-sm-bold-line-height)",
  color: "var(--color-text-primary)",
};

const inputStyle: CSSProperties = {
  fontFamily: "var(--typography-body-lg-regular-font-family)",
  fontWeight:
    "var(--typography-body-lg-regular-font-weight)" as unknown as number,
  fontSize: "var(--typography-body-lg-regular-font-size)",
  lineHeight: "var(--typography-body-lg-regular-line-height)",
  borderWidth: "var(--border-width-1)",
  borderStyle: "solid",
  borderRadius: "var(--radius-md)",
  padding: "var(--spacing-12) var(--spacing-16)",
};

const helpTextBaseStyle: CSSProperties = {
  fontFamily: "var(--typography-caption-lg-medium-font-family)",
  fontWeight:
    "var(--typography-caption-lg-medium-font-weight)" as unknown as number,
  fontSize: "var(--typography-caption-lg-medium-font-size)",
  lineHeight: "var(--typography-caption-lg-medium-line-height)",
};

/**
 * 제목 등을 입력하는 라벨+인풋+도움말 조합 텍스트 필드.
 *
 * Figma: `TitleInput`(node-id 783:3924, `type` variant: default 783:3884 /
 * focus 783:3925 / error 783:3934 / disabled 783:4036).
 *
 * - 아이콘 슬롯(우측 16x16 dotted placeholder)은 실제 렌더링용이 아니므로 구현에서
 *   제외했습니다(사용자 확정).
 * - `focus` variant는 Figma에서도 `default` 대비 border/도움말 색상만 바뀌는 순수
 *   상호작용 상태라, 별도 prop 없이 실제 `:focus` / `:focus-within` 의사클래스로
 *   자연스럽게 구현했습니다. `error`는 Figma에 자동 트리거 수단이 없어 명시적
 *   `error` prop으로, `disabled`는 네이티브 `<input disabled>` 그대로 사용합니다.
 * - `error`와 focus가 동시에 발생하면(에러 상태에서 포커스) error 스타일이
 *   우선하도록 처리했습니다(Figma에 정의되지 않은 조합이라 일반적인 UX 관례를 따름).
 * - 실제 `<input>`을 그대로 확장(`value`/`onChange`/`defaultValue` 등 네이티브 props)하므로
 *   Checkbox와 달리 내부 controlled/uncontrolled 상태를 별도로 관리하지 않습니다.
 * - 루트 너비는 Figma 데모 인스턴스의 고정 345px 대신, 부모 폭에 맞추는
 *   `w-full`로 구현했습니다(사용자 확정).
 */
export function TitleInput({
  label,
  helpText,
  error = false,
  className = "",
  id,
  disabled,
  type = "text",
  style,
  ...rest
}: TitleInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helpTextId = helpText ? `${inputId}-helptext` : undefined;

  const borderColorClassName = error
    ? "border-[color:var(--color-interactive-destructivehover)]"
    : "border-[color:var(--color-text-disabled)] focus:border-[color:var(--color-interactive-primaryhover)] disabled:border-[color:var(--color-text-disabled)]";

  const inputClassName = [
    "w-full min-w-0 bg-transparent outline-none border",
    "text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-primary)]",
    "disabled:text-[color:var(--color-text-tertiary)] disabled:placeholder:text-[color:var(--color-text-tertiary)] disabled:cursor-not-allowed",
    borderColorClassName,
  ].join(" ");

  const helpTextClassName = error
    ? "text-[color:var(--color-interactive-destructivehover)]"
    : "text-[color:var(--color-text-tertiary)] group-focus-within:text-[color:var(--color-interactive-primaryhover)]";

  return (
    <div
      className={["group flex flex-col w-full", className]
        .filter(Boolean)
        .join(" ")}
      style={{ gap: "var(--spacing-2)" }}
    >
      <div
        className="flex items-center w-full"
        style={{ padding: "var(--spacing-4)" }}
      >
        <label htmlFor={inputId} style={labelStyle}>
          {label}
        </label>
      </div>
      <input
        id={inputId}
        type={type}
        disabled={disabled}
        aria-invalid={error || undefined}
        aria-describedby={helpTextId}
        className={inputClassName}
        style={{ ...inputStyle, ...style }}
        {...rest}
      />
      {helpText != null && (
        <div
          className="flex items-center w-full"
          style={{ padding: "var(--spacing-4)" }}
        >
          <p
            id={helpTextId}
            className={helpTextClassName}
            style={helpTextBaseStyle}
          >
            {helpText}
          </p>
        </div>
      )}
    </div>
  );
}
