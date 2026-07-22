import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { Icon, type IconName } from "../Icon";

/**
 * Figma `style` variant. 원본에 `warining`/`warininglight` 오탈자가 있어
 * 여기서는 정상 철자(`warning`/`warning-light`)로 정규화했습니다.
 */
export type ButtonVariant =
  | "core"
  | "core-light"
  | "mono"
  | "mono-light"
  | "outline"
  | "warning"
  | "warning-light";

export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  /** 색상 variant. 기본값 "core" */
  variant?: ButtonVariant;
  /** 크기. 기본값 "medium" */
  size?: ButtonSize;
  /** 리딩 아이콘(children과 함께 사용) 또는 아이콘 전용 버튼의 유일한 콘텐츠 */
  icon?: IconName;
  /**
   * 버튼 라벨. 생략하면 아이콘 전용(정사각형) 버튼이 되며, 이 경우 `icon`과
   * 접근성을 위한 `aria-label`을 함께 전달해야 합니다.
   */
  children?: ReactNode;
}

const ICON_PX: Record<ButtonSize, number> = {
  large: 24,
  medium: 20,
  small: 16,
};

/** 아이콘 전용 버튼은 대칭 padding + 아이콘 크기로 56/44/32px 정사각형이 자동으로 나옵니다. */
const ICON_ONLY_PADDING: Record<ButtonSize, string> = {
  large: "var(--spacing-16)",
  medium: "var(--spacing-12)",
  small: "var(--spacing-8)",
};

const LABEL_PADDING: Record<ButtonSize, { x: string; y: string }> = {
  large: { x: "var(--spacing-24)", y: "var(--spacing-16)" },
  medium: { x: "var(--spacing-16)", y: "var(--spacing-12)" },
  small: { x: "var(--spacing-12)", y: "var(--spacing-8)" },
};

const GAP: Record<ButtonSize, string> = {
  large: "var(--spacing-8)",
  medium: "var(--spacing-8)",
  small: "var(--spacing-4)",
};

/** size별 매핑된 합성 타이포그래피 토큰 prefix (Large만 버튼 전용 토큰과 정확히 일치) */
const TYPOGRAPHY_PREFIX: Record<ButtonSize, string> = {
  large: "--typography-button",
  medium: "--typography-body-sm-bold",
  small: "--typography-caption-lg-bold",
};

const VARIANT_COLORS: Record<
  ButtonVariant,
  { bg: string; text: string; border?: string }
> = {
  core: {
    bg: "var(--color-button-core-bg)",
    text: "var(--color-button-core-text)",
  },
  "core-light": {
    bg: "var(--color-button-core-light-bg)",
    text: "var(--color-button-core-light-text)",
  },
  mono: {
    bg: "var(--color-button-mono-bg)",
    text: "var(--color-button-mono-text)",
  },
  "mono-light": {
    bg: "var(--color-button-mono-light-bg)",
    text: "var(--color-button-mono-light-text)",
  },
  outline: {
    bg: "var(--color-button-outline-bg)",
    text: "var(--color-button-outline-text)",
    border: "var(--color-button-outline-border)",
  },
  warning: {
    bg: "var(--color-button-warning-bg)",
    text: "var(--color-button-warning-text)",
  },
  "warning-light": {
    bg: "var(--color-button-warning-light-bg)",
    text: "var(--color-button-warning-light-text)",
  },
};

/**
 * 라벨(텍스트 + 선택적 리딩 아이콘) 또는 아이콘 전용 버튼을 렌더링하는 컴포넌트.
 *
 * Figma: `ButtonLarge`(137:1497) / `ButtonMedium`(137:1384) / `ButtonSmall`(137:1610).
 * 색상·라디우스·Large 타이포그래피는 `tokens/button-3068-1303.json` 전용 토큰을,
 * Medium/Small 타이포그래피는 기존 `body/sm/bold`·`caption/lg/bold` 합성 토큰을 사용합니다.
 * Figma에는 disabled(opacity 0.3)만 존재하고 hover/pressed variant는 없어 그대로
 * disabled만 구현했습니다.
 */
export function Button({
  variant = "core",
  size = "medium",
  icon,
  children,
  disabled,
  className = "",
  style,
  ...rest
}: ButtonProps) {
  const isIconOnly = children == null;
  const colors = VARIANT_COLORS[variant];
  const typographyPrefix = TYPOGRAPHY_PREFIX[size];

  const computedStyle: CSSProperties = {
    padding: isIconOnly
      ? ICON_ONLY_PADDING[size]
      : `${LABEL_PADDING[size].y} ${LABEL_PADDING[size].x}`,
    gap: GAP[size],
    backgroundColor: colors.bg,
    color: colors.text,
    border: colors.border
      ? `var(--border-width-1) solid ${colors.border}`
      : "none",
    fontFamily: `var(${typographyPrefix}-font-family)`,
    fontWeight: `var(${typographyPrefix}-font-weight)` as unknown as number,
    fontSize: `var(${typographyPrefix}-font-size)`,
    lineHeight: `var(${typographyPrefix}-line-height)`,
    ...style,
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center rounded-[var(--border-radius-button)] disabled:opacity-30 disabled:pointer-events-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={computedStyle}
      {...rest}
    >
      {icon && <Icon name={icon} size={ICON_PX[size]} />}
      {children}
    </button>
  );
}
