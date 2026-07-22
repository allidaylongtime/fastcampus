import { Fragment } from "react";
import { Divider } from "../Divider";
import { SearchBar, type SearchBarProps } from "../SearchBar";
import { SortTabItem } from "../SortTabItem";

export interface ToolbarSortTab {
  /** 탭 라벨 텍스트 */
  label: string;
  /** 선택 여부. 기본값 false */
  selected?: boolean;
  /** 클릭 핸들러 (정렬 기준 전환 등) */
  onClick?: () => void;
}

export interface ToolbarProps {
  /** 좌측에 가로로 나열할 정렬 탭 목록 */
  sortTabs: ToolbarSortTab[];
  /** SearchBar placeholder */
  searchPlaceholder?: SearchBarProps["placeholder"];
  /** SearchBar 제어값 */
  searchValue?: SearchBarProps["value"];
  /** SearchBar 입력 변경 핸들러 */
  onSearchChange?: SearchBarProps["onChange"];
  /** SearchBar 엔터 검색 핸들러 */
  onSearchSubmit?: SearchBarProps["onSubmit"];
  className?: string;
}

/**
 * 정렬 탭(최신글/인기글 등) + 검색창을 포함하는 툴바.
 *
 * Figma: node-id 781:5336 (base 섹션) / 137:1356 (조립본).
 * 좌측 정렬 탭 그룹은 `SortTabItem`을 map으로 렌더링하고 아이템 사이사이에
 * `Divider orientation="vertical"`을 삽입합니다. 우측은 `SearchBar`.
 * 전체 레이아웃은 `justify-between`으로 좌/우 그룹을 배치합니다.
 */
export function Toolbar({
  sortTabs,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  onSearchSubmit,
  className = "",
}: ToolbarProps) {
  return (
    <div
      className={[
        "w-full flex items-center justify-between gap-[var(--spacing-16)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-center gap-[var(--spacing-12)] shrink-0">
        {sortTabs.map((tab, index) => (
          <Fragment key={`${tab.label}-${index}`}>
            {index > 0 && <Divider orientation="vertical" />}
            <SortTabItem
              label={tab.label}
              state={tab.selected ? "select" : "default"}
              onClick={tab.onClick}
            />
          </Fragment>
        ))}
      </div>
      <SearchBar
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={onSearchChange}
        onSubmit={onSearchSubmit}
      />
    </div>
  );
}
