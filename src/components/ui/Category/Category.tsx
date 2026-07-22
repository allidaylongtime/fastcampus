import type { ButtonHTMLAttributes, CSSProperties } from "react";

export type CategoryState = "default" | "selected";

export interface CategoryProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  /** 탭 라벨 텍스트 */
  label: string;
  /** 선택 상태. 기본값 "default" */
  state?: CategoryState;
}

/**
 * 네비게이션 탭에 쓰이는 카테고리 라벨.
 *
 * Figma: node-id 764:2186 (base) / default 764:2187 / selected 764:2189.
 * selected 상태는 하단 4px 파란 밑줄(`--color-interactive-primary`) + 텍스트 색상 변경으로 표시됩니다.
 *
 * Figma의 상하 padding(6px / 10px)은 `spacing/*` 스케일에 없는 값이라 가장 가까운 토큰으로
 * 반올림했습니다(6px→`--spacing-8`, 10px→`--spacing-12`). 좌우 padding(8px)은 `--spacing-8`을 사용합니다.
 */
export function Category({
  label,
  state = "default",
  className = "",
  style,
  ...rest
}: CategoryProps) {
  const isSelected = state === "selected";

  const computedStyle: CSSProperties = {
    paddingLeft: "var(--spacing-8)",
    paddingRight: "var(--spacing-8)",
    paddingTop: "var(--spacing-8)",
    paddingBottom: "var(--spacing-12)",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    borderBottom: isSelected
      ? "var(--spacing-4) solid var(--color-interactive-primary)"
      : "0 solid transparent",
    backgroundColor: "transparent",
    fontFamily: "var(--typography-display-sm-bold-font-family)",
    fontWeight:
      "var(--typography-display-sm-bold-font-weight)" as unknown as number,
    fontSize: "var(--typography-display-sm-bold-font-size)",
    lineHeight: "var(--typography-display-sm-bold-line-height)",
    color: isSelected
      ? "var(--color-text-primary)"
      : "var(--color-text-disabled)",
    ...style,
  };

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      className={[
        "inline-flex flex-col items-start shrink-0 whitespace-nowrap cursor-pointer",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={computedStyle}
      {...rest}
    >
      {label}
    </button>
  );
}
