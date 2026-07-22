import type { CSSProperties, HTMLAttributes } from "react";

export interface DateProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children"
> {
  /** 표시할 날짜/타임스탬프 문자열 (예: "26.05.06") */
  text: string;
}

const dateStyle: CSSProperties = {
  margin: 0,
  color: "var(--color-text-tertiary)",
  fontFamily: "var(--typography-body-sm-regular-font-family)",
  fontWeight:
    "var(--typography-body-sm-regular-font-weight)" as unknown as number,
  fontSize: "var(--typography-body-sm-regular-font-size)",
  lineHeight: "var(--typography-body-sm-regular-line-height)",
  whiteSpace: "nowrap",
};

/**
 * 날짜/타임스탬프를 표시하는 단순 텍스트 atom.
 *
 * Figma: `Date`(node-id 781:5082, `Post` 섹션(781:5936) 하위). variant가 없는 단일
 * 컴포넌트로, 표시 텍스트만 다른 형태로 재사용되므로 `text` prop 하나만 받습니다.
 * 색상은 `text/tertiary`, 타이포그래피는 `body/sm/regular`를 그대로 사용합니다.
 */
export function Date({ text, className = "", style, ...rest }: DateProps) {
  return (
    <span className={className} style={{ ...dateStyle, ...style }} {...rest}>
      {text}
    </span>
  );
}
