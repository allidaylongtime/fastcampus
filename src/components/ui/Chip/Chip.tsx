import type { CSSProperties, HTMLAttributes } from "react";
import { Icon, type IconName } from "../Icon";

export type ChipType = "category" | "notice";

export interface ChipProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** 칩에 표시할 라벨 텍스트 */
  label: string;
  /** 칩 종류. 기본값 "category" */
  type?: ChipType;
  /** 아이콘 override. 지정하지 않으면 `type` 기준 기본 아이콘(category→design, notice→notification) 사용 */
  icon?: IconName;
}

/**
 * 카테고리/공지사항을 나타내는 작은 라벨 칩.
 *
 * Figma: node-id 137:1763 (컴포넌트셋, `type` variant: category 137:1756 / notice 137:1755)
 *
 * - 아이콘은 Figma 원본 벡터가 기존 `Icon` 컴포넌트의 `design`(category) / `notification`(notice)과
 *   path가 완전히 동일하여 별도 아이콘을 추가하지 않고 재사용합니다.
 * - 아이콘은 `currentColor`로 색을 상속받으므로, 텍스트와 같은 색을 컨테이너에 지정해
 *   라벨/아이콘 색상을 한 번에 맞춥니다.
 * - Figma의 border-radius(6px)는 토큰 스케일(`--radius-sm` 4px / `--radius-md` 8px)에
 *   없어 가장 가까운 `--radius-sm`(4px)으로 근사합니다 (사용자 확정, 새 radius 토큰 추가 안 함).
 */
export function Chip({
  label,
  type = "category",
  icon,
  className = "",
  style,
  ...rest
}: ChipProps) {
  const isNotice = type === "notice";

  const computedStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--spacing-4)",
    paddingTop: "var(--spacing-4)",
    paddingBottom: "var(--spacing-4)",
    paddingLeft: "var(--spacing-8)",
    paddingRight: "var(--spacing-8)",
    // ⚠️ Figma 원본 radius 6px → 토큰 스케일에 없어 --radius-sm(4px)으로 근사 (사용자 확정)
    borderRadius: "var(--radius-sm)",
    backgroundColor: isNotice
      ? "var(--color-background-danger)"
      : "var(--color-background-muted)",
    color: isNotice
      ? "var(--color-text-danger)"
      : "var(--color-content-strong)",
    fontFamily: "var(--typography-body-sm-bold-font-family)",
    fontWeight:
      "var(--typography-body-sm-bold-font-weight)" as unknown as number,
    fontSize: "var(--typography-body-sm-bold-font-size)",
    lineHeight: "var(--typography-body-sm-bold-line-height)",
    whiteSpace: "nowrap",
    ...style,
  };

  return (
    <div
      className={["shrink-0", className].filter(Boolean).join(" ")}
      style={computedStyle}
      {...rest}
    >
      <Icon name={icon ?? (isNotice ? "notification" : "design")} />
      <span>{label}</span>
    </div>
  );
}
