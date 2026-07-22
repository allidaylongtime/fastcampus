import type { CSSProperties, HTMLAttributes } from "react";
import { Button } from "../Button";
import { Toolbar, type ToolbarProps } from "../Toolbar";

export interface PostFilterHeaderProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /** 상단 제목 텍스트. 기본값 "전체 게시글" (Figma 기본값) */
  title?: string;
  /** 우측 "글쓰기" 버튼 클릭 핸들러 */
  onWriteClick?: () => void;
  /** 하단 Toolbar의 정렬 탭 목록. 기본값 [{label:"최신글", selected:true}, {label:"인기글"}] (Figma 기본값) */
  sortTabs?: ToolbarProps["sortTabs"];
  /** 하단 Toolbar 검색창 placeholder. 기본값 "제목, 내용, 작성자" (Figma 기본값) */
  searchPlaceholder?: ToolbarProps["searchPlaceholder"];
  /** 하단 Toolbar 검색창 제어값 */
  searchValue?: ToolbarProps["searchValue"];
  /** 하단 Toolbar 검색창 입력 변경 핸들러 */
  onSearchChange?: ToolbarProps["onSearchChange"];
  /** 하단 Toolbar 검색창 엔터 검색 핸들러 */
  onSearchSubmit?: ToolbarProps["onSearchSubmit"];
}

const DEFAULT_SORT_TABS: ToolbarProps["sortTabs"] = [
  { label: "최신글", selected: true },
  { label: "인기글" },
];

const rootStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "var(--spacing-12)",
  width: "100%",
};

const rowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
};

const titleStyle: CSSProperties = {
  margin: 0,
  color: "var(--color-content-strong)",
  fontFamily: "var(--typography-display-lg-bold-font-family)",
  fontWeight:
    "var(--typography-display-lg-bold-font-weight)" as unknown as number,
  fontSize: "var(--typography-display-lg-bold-font-size)",
  lineHeight: "var(--typography-display-lg-bold-line-height)",
};

/**
 * 게시글 목록 상단의 제목 + 글쓰기 버튼 + 정렬/검색 툴바 조합 헤더.
 *
 * Figma: `PostFilterHeader`(node-id 764:2375, `Post` 섹션(781:5936) 하위, 840x90).
 * variant 없는 단일 조합 컴포넌트로, 새로 만드는 부분은 레이아웃(제목-버튼 좌우 배치 +
 * 그 아래 Toolbar)뿐이며 하위 요소는 기존 `Button`(`size="medium"` `variant="core"`)과
 * `Toolbar`를 그대로 재사용합니다.
 *
 * - 제목은 `display/lg/bold` + `content/strong`.
 * - "글쓰기" 버튼은 Figma 예시가 `Button`의 medium/core variant와 색상·타이포그래피가
 *   동일해 그대로 재사용했습니다(별도 버튼 스타일 신규 작성 없음).
 * - 하단 Toolbar는 Figma 예시에서 "최신글"이 체크 아이콘 + bold로 선택 표시되어 있어
 *   기본 정렬 탭에 `selected: true`를 포함했습니다.
 * - 너비는 Figma 원본이 840px 고정이지만 840은 spacing 스케일에 없는 값이라, 같은
 *   섹션의 `Input`/`PostWriteHeader`와 동일한 방침으로 `w-full`(100%)을 사용했습니다.
 */
export function PostFilterHeader({
  title = "전체 게시글",
  onWriteClick,
  sortTabs = DEFAULT_SORT_TABS,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  onSearchSubmit,
  className = "",
  style,
  ...rest
}: PostFilterHeaderProps) {
  return (
    <div className={className} style={{ ...rootStyle, ...style }} {...rest}>
      <div style={rowStyle}>
        <h1 style={titleStyle}>{title}</h1>
        <Button variant="core" size="medium" onClick={onWriteClick}>
          글쓰기
        </Button>
      </div>
      <Toolbar
        sortTabs={sortTabs}
        searchPlaceholder={searchPlaceholder}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        onSearchSubmit={onSearchSubmit}
      />
    </div>
  );
}
