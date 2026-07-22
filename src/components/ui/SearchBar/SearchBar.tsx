import type { CSSProperties, KeyboardEvent } from "react";
import { Icon } from "../Icon";

export interface SearchBarProps {
  /** placeholder 텍스트. 기본값 "제목, 내용, 작성자" (Figma 기본값) */
  placeholder?: string;
  /** 제어 컴포넌트로 사용할 때의 입력값 */
  value?: string;
  /** 입력값 변경 핸들러 */
  onChange?: (value: string) => void;
  /** 엔터로 검색을 실행했을 때 호출 */
  onSubmit?: (value: string) => void;
  /** 추가 클래스명 */
  className?: string;
}

const containerStyle: CSSProperties = {
  paddingLeft: "var(--spacing-16)",
  paddingRight: "var(--spacing-16)",
  paddingTop: "var(--spacing-8)",
  paddingBottom: "var(--spacing-8)",
  borderRadius: "var(--radius-circle)",
  border: "var(--border-width-1) solid var(--color-text-disabled)",
};

const inputStyle: CSSProperties = {
  fontFamily: "var(--typography-body-lg-regular-font-family)",
  fontWeight:
    "var(--typography-body-lg-regular-font-weight)" as unknown as number,
  fontSize: "var(--typography-body-lg-regular-font-size)",
  lineHeight: "var(--typography-body-lg-regular-line-height)",
  color: "var(--color-text-secondary)",
};

/**
 * 제목/내용/작성자 검색용 검색창.
 *
 * Figma: node-id 137:1359. 좌측에 기존 `Icon name="search"` 배치.
 * 컨테이너는 `border-[color:var(--color-text-disabled)]` + `--radius-circle`
 * (Figma의 `rounded-[99px]`는 완전 pill 형태라 `--radius-circle`(9999px)로
 * 반올림해도 시각 차이가 없습니다).
 *
 * ⚠️ 참고: Figma 원본 높이는 `h-[36px]`이지만 36px는 `spacing/*` 스케일에 없는 값이라
 * 별도 높이를 강제하지 않고 `py-[var(--spacing-8)]`(8px) + 콘텐츠 높이로 자연스럽게
 * 결정되도록 했습니다 (Category/NavigationBar의 6px/10px 반올림 사례와 동일한 방침).
 */
export function SearchBar({
  placeholder = "제목, 내용, 작성자",
  value,
  onChange,
  onSubmit,
  className = "",
}: SearchBarProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSubmit?.(event.currentTarget.value);
    }
  };

  return (
    <div
      className={[
        "inline-flex items-center gap-[var(--spacing-8)] w-full max-w-[240px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={containerStyle}
    >
      <Icon name="search" size={16} />
      <input
        type="search"
        role="searchbox"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 min-w-0 bg-transparent border-0 outline-none p-0"
        style={inputStyle}
      />
    </div>
  );
}
