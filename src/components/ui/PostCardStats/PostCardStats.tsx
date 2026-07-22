import type { CSSProperties, HTMLAttributes, MouseEventHandler } from "react";
import { Icon } from "../Icon";
import { BookmarkButton } from "../BookmarkButton";

export interface PostCardStatsProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** 조회수. 기본값 0 */
  viewCount?: number;
  /** 좋아요 수. 기본값 0 */
  likeCount?: number;
  /** 좋아요 여부. true면 채워진 빨간 하트(`heart_fill` + `text/danger`), false면 outline 회색 하트. 기본값 false */
  liked?: boolean;
  /** 북마크(저장) 여부. true면 채워진 브랜드색 아이콘, false면 outline 회색 아이콘. 기본값 false */
  bookmarked?: boolean;
  /** 북마크 버튼 클릭 핸들러 */
  onBookmarkClick?: MouseEventHandler<HTMLButtonElement>;
}

const statAreaStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // ⚠️ Figma 원본 gap 6px는 spacing 스케일(0,2,4,8,12,16,24,32,40,48,64)에 없어
  // Category/NavigationBar와 동일한 관례(다음으로 큰 토큰으로 반올림)에 따라 --spacing-8 사용.
  gap: "var(--spacing-8)",
  color: "var(--color-text-tertiary)",
  fontFamily: "var(--typography-caption-lg-medium-font-family)",
  fontWeight:
    "var(--typography-caption-lg-medium-font-weight)" as unknown as number,
  fontSize: "var(--typography-caption-lg-medium-font-size)",
  lineHeight: "var(--typography-caption-lg-medium-line-height)",
  whiteSpace: "nowrap",
};

/**
 * 게시글 카드의 조회수/좋아요수를 아이콘과 함께 보여주는 통계 영역.
 *
 * Figma: node-id 783:2846 (`PostCardStats`).
 * 하위 ViewCountArea(783:2825, 아이콘 783:2826 + 숫자 783:2827) /
 * LikeCountArea(783:2831, 아이콘 783:2832 + 숫자 783:2833).
 *
 * - 조회수 아이콘은 Figma 원본 벡터를 다운로드해 실측 비교한 결과, 기존 `Icon`의
 *   `eye-on`과 SVG path가 완전히 동일하여 그대로 재사용합니다. 새 아이콘을 추가하지 않습니다.
 * - 좋아요 아이콘은 인스턴스별로 상태가 다릅니다. 미좋아요 상태는 `heart_empty`(outline,
 *   `text/tertiary` 상속)이지만, 좋아요 상태(`liked`)의 실측 벡터는 `heart_fill`(solid,
 *   `fill: #FC2A55` = `red/600`)이며 숫자 텍스트 색상은 그대로 `text/tertiary`로 유지됩니다
 *   (아이콘과 숫자 색상이 서로 다름). `red/600`을 참조하는 기존 semantic 토큰 중 이름 그대로
 *   재사용 가능한 "좋아요" 전용 토큰은 없어, 같은 값을 참조하는 `--color-text-danger`를
 *   재사용합니다(`Chip`의 공지 칩도 동일 토큰을 "공지" 의미로 재사용 중인 것과 같은 패턴).
 * - 아이콘은 `currentColor` 상속 방식이므로, 각 통계 영역 컨테이너에
 *   `color: var(--color-text-tertiary)`를 지정해 아이콘/숫자 색상을 기본으로 맞추고,
 *   좋아요 아이콘만 `liked` 시 별도 `className`으로 색상을 오버라이드합니다.
 * - 세 번째 영역인 북마크는 Figma 소스가 없어(사용자 확인 완료) `BookmarkButton`을
 *   새로 만들어 재사용합니다. 숫자가 없는 토글 버튼이라 다른 두 영역과 달리 `<span>`
 *   카운트가 없습니다. Home의 `PostCard`도 이 컴포넌트를 그대로 쓰므로 함께 노출됩니다
 *   (사용자 확정).
 */
export function PostCardStats({
  viewCount = 0,
  likeCount = 0,
  liked = false,
  bookmarked = false,
  onBookmarkClick,
  className = "",
  style,
  ...rest
}: PostCardStatsProps) {
  const rootStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-24)",
    ...style,
  };

  return (
    <div
      className={["shrink-0", className].filter(Boolean).join(" ")}
      style={rootStyle}
      {...rest}
    >
      <div style={statAreaStyle} data-post-card-stats="view">
        <Icon name="eye-on" />
        <span>{viewCount.toLocaleString()}</span>
      </div>
      <div style={statAreaStyle} data-post-card-stats="like">
        <Icon
          name={liked ? "heart_fill" : "heart_empty"}
          className={liked ? "text-[color:var(--color-text-danger)]" : ""}
        />
        <span>{likeCount.toLocaleString()}</span>
      </div>
      <div style={statAreaStyle} data-post-card-stats="bookmark">
        <BookmarkButton bookmarked={bookmarked} onClick={onBookmarkClick} />
      </div>
    </div>
  );
}
