import type { ButtonHTMLAttributes, CSSProperties } from "react";
import { Icon } from "../Icon";

export type SortTabItemState = "default" | "select";

export interface SortTabItemProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  /** 탭 라벨 텍스트 */
  label: string;
  /** 선택 상태. 기본값 "default" */
  state?: SortTabItemState;
}

const selectedTextStyle: CSSProperties = {
  fontFamily: "var(--typography-body-sm-bold-font-family)",
  fontWeight: "var(--typography-body-sm-bold-font-weight)" as unknown as number,
  fontSize: "var(--typography-body-sm-bold-font-size)",
  lineHeight: "var(--typography-body-sm-bold-line-height)",
  color: "var(--color-text-primary)",
};

const defaultTextStyle: CSSProperties = {
  fontFamily: "var(--typography-body-sm-regular-font-family)",
  fontWeight:
    "var(--typography-body-sm-regular-font-weight)" as unknown as number,
  fontSize: "var(--typography-body-sm-regular-font-size)",
  lineHeight: "var(--typography-body-sm-regular-line-height)",
  color: "var(--color-text-secondary)",
};

/**
 * 정렬 탭(최신글/인기글 등)의 개별 아이템.
 *
 * Figma: node-id 137:1757 (base) / default 137:1758 / select 137:1760.
 * - default: 아이콘 없이 `--color-text-secondary` + `body/sm/regular` 텍스트만 표시.
 * - select: 좌측 체크 아이콘(`Icon name="check"`, 16x16) + `--color-text-primary` +
 *   `body/sm/bold` 텍스트, 아이콘-텍스트 사이 gap은 `--spacing-4`.
 */
export function SortTabItem({
  label,
  state = "default",
  className = "",
  style,
  ...rest
}: SortTabItemProps) {
  const isSelected = state === "select";

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      className={[
        "inline-flex items-center gap-[var(--spacing-4)] shrink-0 whitespace-nowrap cursor-pointer bg-transparent border-0 p-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      {...rest}
    >
      {isSelected && <Icon name="check" size={16} />}
      <span style={isSelected ? selectedTextStyle : defaultTextStyle}>
        {label}
      </span>
    </button>
  );
}
