export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps {
  /** 구분선 방향. 기본값 "horizontal" (기존 동작과 100% 동일) */
  orientation?: DividerOrientation;
  /** 추가 클래스명 (너비 제한, 좌우 마진 등 레이아웃 오버라이드용) */
  className?: string;
}

/**
 * 콘텐츠 사이를 구분하는 구분선. 수평(기본)/수직 두 방향을 지원합니다.
 *
 * Figma: node-id 781:5293 (Divider, horizontal) / 137:1749 (Vertical Divider, Toolbar 내 사용).
 *
 * 수직 구분선의 두께는 `spacing/*` 스케일이 아닌 `--border-width-1` 토큰을 사용합니다.
 */
export function Divider({
  orientation = "horizontal",
  className = "",
}: DividerProps) {
  const isVertical = orientation === "vertical";

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={[
        isVertical
          ? "w-[var(--border-width-1)] h-[var(--spacing-12)] bg-[var(--color-text-disabled)]"
          : "w-full h-[var(--spacing-2)] bg-[var(--color-background-subtle)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
