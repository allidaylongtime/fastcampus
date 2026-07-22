import type { ButtonHTMLAttributes, CSSProperties } from "react";
import { Icon } from "../Icon";

export interface BookmarkButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  /** 북마크(저장) 여부. true면 채워진 브랜드 색 아이콘, false면 outline 회색 아이콘. 기본값 false */
  bookmarked?: boolean;
}

const rootStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
};

/**
 * 게시글을 북마크(저장)하는 토글 버튼.
 *
 * Figma 디자인 시스템의 `Icon` 컴포넌트 세트(node-id 137:1723)를 전수 조사했으나
 * 북마크 관련 variant가 존재하지 않아(사용자 확인 완료), `PostCardStats`의
 * `heart_empty`/`heart_fill`과 동일한 컨벤션(outline/solid 페어, 16x16, currentColor)으로
 * 새로 제작한 `bookmark_empty`/`bookmark_fill` 아이콘을 사용합니다.
 *
 * 색상은 사용자 확정: 기본(outline)은 `PostCardStats`의 다른 통계 아이콘과 동일한
 * `text/tertiary`, 활성(bookmarked)은 브랜드 색상 `interactive/primary`
 * (`NavigationBar` 로그인 버튼 등과 동일 토큰)를 사용합니다. `heart_fill`의
 * `text/danger`(빨강)와는 시각적으로 구분됩니다.
 */
export function BookmarkButton({
  bookmarked = false,
  className = "",
  style,
  "aria-label": ariaLabel = "북마크",
  ...rest
}: BookmarkButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={bookmarked}
      aria-label={ariaLabel}
      data-bookmark-button={bookmarked ? "filled" : "default"}
      className={className}
      style={{
        ...rootStyle,
        color: bookmarked
          ? "var(--color-interactive-primary)"
          : "var(--color-text-tertiary)",
        ...style,
      }}
      {...rest}
    >
      <Icon name={bookmarked ? "bookmark_fill" : "bookmark_empty"} />
    </button>
  );
}
