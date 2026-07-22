import type { CSSProperties } from "react";
import { Category } from "../Category";
import { Button } from "../Button";

export interface NavigationBarCategoryItem {
  /** 카테고리 라벨 텍스트 */
  label: string;
  /** 선택 여부. 기본값 false */
  selected?: boolean;
  /** 클릭 핸들러 (탭 전환 등) */
  onClick?: () => void;
}

export type NavigationBarAuthState = "login" | "logout";

export interface NavigationBarProps {
  /** 좌측에 가로로 나열할 카테고리 목록 */
  categories: NavigationBarCategoryItem[];
  /** 로그인 여부. 기본값 "login" (로그인 버튼 노출) */
  state?: NavigationBarAuthState;
  /** 우측 로그인/로그아웃 버튼 클릭 핸들러 */
  onAuthClick?: () => void;
  className?: string;
}

const rootStyle: CSSProperties = {
  paddingTop: "var(--spacing-16)",
  paddingLeft: "var(--spacing-12)",
  paddingRight: "var(--spacing-12)",
  borderBottom: "var(--border-width-1) solid var(--color-background-muted)",
};

const scrollerStyle: CSSProperties = {
  paddingTop: "var(--spacing-2)",
};

/**
 * 카테고리 탭 목록 + 로그인/로그아웃 버튼을 포함하는 상단 내비게이션 바.
 *
 * Figma: node-id 783:2797 (base) / login 764:2274 / logout 783:2798.
 * 내부 CategoryScroller: 764:2261 / 783:2799 (가로 스크롤 영역).
 * 우측 버튼: 783:2754(로그인) / 783:2801(로그아웃) — 기존 `Button`(variant="core-light"
 * size="medium")을 그대로 재사용합니다 (색상이 Figma `background/brandsubtle`,
 * `brand/primary`와 정확히 일치).
 *
 * Figma는 `w-[1280px]` 고정폭이지만, 여기서는 `max-width` + `%` 기반 반응형으로 구현했습니다.
 * 좌우 padding(10px)은 `spacing/*` 스케일에 없어 가장 가까운 `--spacing-12`로 반올림했습니다.
 */
export function NavigationBar({
  categories,
  state = "login",
  onAuthClick,
  className = "",
}: NavigationBarProps) {
  const isLogout = state === "logout";

  return (
    <nav
      aria-label="주요 카테고리"
      className={[
        "w-full max-w-[1280px] flex flex-col items-center justify-center",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={rootStyle}
    >
      <div
        className="w-full max-w-[840px] flex items-center justify-between overflow-x-auto"
        style={scrollerStyle}
      >
        <div className="flex items-center shrink-0">
          {categories.map((category, index) => (
            <Category
              key={`${category.label}-${index}`}
              label={category.label}
              state={category.selected ? "selected" : "default"}
              onClick={category.onClick}
            />
          ))}
        </div>
        <Button variant="core-light" size="medium" onClick={onAuthClick}>
          {isLogout ? "로그아웃" : "로그인"}
        </Button>
      </div>
    </nav>
  );
}
