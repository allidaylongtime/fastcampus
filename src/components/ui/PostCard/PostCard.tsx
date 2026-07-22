import type { CSSProperties, HTMLAttributes } from "react";
import { Chip, type ChipType } from "../Chip";
import type { IconName } from "../Icon";
import { PostCardStats } from "../PostCardStats";
import { PostCardImage, type PostCardImageType } from "../PostCardImage";

/** ChipArea에 표시할 칩 1개 항목 */
export interface PostCardChipItem {
  /** 칩 라벨 텍스트 */
  label: string;
  /** 칩 종류. 기본값 "category" (Chip과 동일) */
  type?: ChipType;
  /** 아이콘 override. 지정하지 않으면 Chip의 `type` 기준 기본 아이콘 사용 */
  icon?: IconName;
}

export interface PostCardProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "title"
> {
  /** 게시글 제목 */
  title: string;
  /** 본문 미리보기 텍스트. 2줄을 넘으면 말줄임(…) 처리됩니다 */
  preview: string;
  /** 작성 후 경과 시간 표시 텍스트 (예: "3시간 전") */
  timeAgo: string;
  /** 상단 ChipArea에 표시할 칩 목록 (카테고리/공지 등 자유 조합). 기본값 빈 배열 */
  chips?: PostCardChipItem[];
  /** 썸네일 표시 여부. 기본값 true */
  showThum?: boolean;
  /** 썸네일 종류 (showThum=true일 때만 사용, PostCardImage의 type). 기본값 1 */
  thumbnailType?: PostCardImageType;
  /** 썸네일 대체 텍스트. 생략 시 `${title} 썸네일 이미지`로 자동 생성 */
  thumbnailAlt?: string;
  /** 조회수. 기본값 0 */
  viewCount?: number;
  /** 좋아요 수. 기본값 0 */
  likeCount?: number;
}

const rootStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "var(--spacing-12)",
  // 사용자 확정: Figma 원본은 루트에 명시적 width가 없지만(내부 섹션만 840px 고정),
  // 이번 구현에서는 루트를 포함해 전체를 840px로 고정합니다.
  width: "840px",
  paddingTop: "var(--spacing-24)",
  paddingBottom: "var(--spacing-24)",
};

const contentStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "var(--spacing-8)",
  width: "100%",
};

const chipAreaStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  // ⚠️ Figma 원본 gap 6px → spacing 스케일에 없어 Category/NavigationBar/PostCardStats와
  // 동일한 관례(다음으로 큰 토큰으로 반올림)에 따라 --spacing-8 사용 (사용자 승인).
  gap: "var(--spacing-8)",
  width: "100%",
};

const bodyStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  // ⚠️ Figma 원본 gap 20px → 동일 관례로 --spacing-24 사용 (사용자 승인).
  gap: "var(--spacing-24)",
  width: "100%",
};

const textAreaStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "var(--spacing-8)",
  flex: "1 0 0",
  minWidth: 0,
};

const titleStyle: CSSProperties = {
  margin: 0,
  width: "100%",
  color: "var(--color-text-primary)",
  fontFamily: "var(--typography-title-sm-bold-font-family)",
  fontWeight:
    "var(--typography-title-sm-bold-font-weight)" as unknown as number,
  fontSize: "var(--typography-title-sm-bold-font-size)",
  lineHeight: "var(--typography-title-sm-bold-line-height)",
};

const previewStyle: CSSProperties = {
  margin: 0,
  width: "100%",
  color: "var(--color-content-default)",
  fontFamily: "var(--typography-body-lg-regular-font-family)",
  fontWeight:
    "var(--typography-body-lg-regular-font-weight)" as unknown as number,
  fontSize: "var(--typography-body-lg-regular-font-size)",
  lineHeight: "var(--typography-body-lg-regular-line-height)",
  // 사용자 확정: 2줄 초과 시 말줄임(line-clamp) 처리
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const footerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
};

const statsAreaStyle: CSSProperties = {
  flex: "1 0 0",
};

const timeAgoStyle: CSSProperties = {
  color: "var(--color-text-secondary)",
  fontFamily: "var(--typography-caption-lg-medium-font-family)",
  fontWeight:
    "var(--typography-caption-lg-medium-font-weight)" as unknown as number,
  fontSize: "var(--typography-caption-lg-medium-font-size)",
  lineHeight: "var(--typography-caption-lg-medium-line-height)",
  whiteSpace: "nowrap",
};

/**
 * 게시글 목록의 카드 1개를 나타내는 최상위 조합 컴포넌트.
 *
 * Figma: node-id 137:1364 (`PostCard`, 섹션 781:5287 하위). variant 없는 단일 조합
 * 컴포넌트로, 하위 `Chip` / `PostCardStats` / `PostCardImage`를 그대로 조합합니다.
 *
 * - ChipArea(137:1366)는 Figma 예시에서 공지(notice)+카테고리(category) 칩 2개를
 *   함께 보여주지만, 실제로는 0~N개 자유 조합이 가능해야 하므로 `chips` 배열 prop으로
 *   받습니다 (사용자 확정).
 * - preview 텍스트는 Figma 변환 코드상 `overflow-hidden text-ellipsis`만 있어 문자
 *   그대로는 트렁케이션이 발동하지 않는 조합이지만, 기본 예시 텍스트가 정확히 2줄에
 *   맞춰져 있어 "2줄 초과 시 말줄임"이 의도로 판단, `-webkit-line-clamp: 2`로 구현
 *   합니다 (사용자 확정).
 * - Figma 원본은 루트에 명시적 width가 없고 내부 PostCardContent/PostCardFooter만
 *   840px로 고정되어 있지만, 이번 구현에서는 루트도 포함해 840px로 고정합니다
 *   (사용자 확정, Figma 원본과 다르게 적용).
 */
export function PostCard({
  title,
  preview,
  timeAgo,
  chips = [],
  showThum = true,
  thumbnailType = 1,
  thumbnailAlt,
  viewCount = 0,
  likeCount = 0,
  className = "",
  style,
  ...rest
}: PostCardProps) {
  return (
    <div
      className={["shrink-0", className].filter(Boolean).join(" ")}
      style={{ ...rootStyle, ...style }}
      data-post-card="root"
      {...rest}
    >
      <div style={contentStyle} data-post-card-section="content">
        {chips.length > 0 && (
          <div style={chipAreaStyle} data-post-card-chip-area="">
            {chips.map((chip, index) => (
              <Chip
                key={`${chip.type ?? "category"}-${index}`}
                label={chip.label}
                type={chip.type}
                icon={chip.icon}
              />
            ))}
          </div>
        )}
        <div style={bodyStyle} data-post-card-body="">
          <div style={textAreaStyle}>
            <p style={titleStyle} data-post-card-title="">
              {title}
            </p>
            <p style={previewStyle} data-post-card-preview="">
              {preview}
            </p>
          </div>
          {showThum && (
            <PostCardImage
              type={thumbnailType}
              alt={thumbnailAlt ?? `${title} 썸네일 이미지`}
            />
          )}
        </div>
      </div>
      <div style={footerStyle} data-post-card-section="footer">
        <PostCardStats
          style={statsAreaStyle}
          viewCount={viewCount}
          likeCount={likeCount}
        />
        <span style={timeAgoStyle} data-post-card-time="">
          {timeAgo}
        </span>
      </div>
    </div>
  );
}
