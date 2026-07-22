import type { CSSProperties, HTMLAttributes } from "react";

export interface PostWriteHeaderProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /** 제목 텍스트. 기본값 "게시글 쓰기" (Figma 기본값) */
  title?: string;
  /** 부제 텍스트. 기본값 "건전한 커뮤니티를 위해 바른말 고운말을 씁시다." (Figma 기본값) */
  description?: string;
}

const rootStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "var(--spacing-12)",
  width: "100%",
};

const titleStyle: CSSProperties = {
  margin: 0,
  width: "100%",
  color: "var(--color-content-strong)",
  fontFamily: "var(--typography-display-lg-bold-font-family)",
  fontWeight:
    "var(--typography-display-lg-bold-font-weight)" as unknown as number,
  fontSize: "var(--typography-display-lg-bold-font-size)",
  lineHeight: "var(--typography-display-lg-bold-line-height)",
};

const descriptionStyle: CSSProperties = {
  margin: 0,
  width: "100%",
  color: "var(--color-text-secondary)",
  fontFamily: "var(--typography-title-lg-regular-font-family)",
  fontWeight:
    "var(--typography-title-lg-regular-font-weight)" as unknown as number,
  fontSize: "var(--typography-title-lg-regular-font-size)",
  lineHeight: "var(--typography-title-lg-regular-line-height)",
};

/**
 * 게시글 작성 화면 상단의 제목 + 안내 문구 조합 헤더.
 *
 * Figma: `PostWriteHeader`(node-id 764:2338, `Post` 섹션(781:5936) 하위, 840x90).
 * variant가 없는 단일 컴포넌트로, 제목은 `display/lg/bold` + `content/strong`,
 * 부제는 `title/lg/regular` + `text/secondary`를 사용합니다.
 *
 * 너비는 Figma 원본이 840px 고정이지만 840은 spacing 스케일에 없는 값이라, 같은
 * 섹션의 `Input`/`TitleInput`과 동일한 방침으로 부모 폭에 맞추는 `w-full`(100%)로
 * 구현했습니다.
 */
export function PostWriteHeader({
  title = "게시글 쓰기",
  description = "건전한 커뮤니티를 위해 바른말 고운말을 씁시다.",
  className = "",
  style,
  ...rest
}: PostWriteHeaderProps) {
  return (
    <div className={className} style={{ ...rootStyle, ...style }} {...rest}>
      <h1 style={titleStyle}>{title}</h1>
      <p style={descriptionStyle}>{description}</p>
    </div>
  );
}
