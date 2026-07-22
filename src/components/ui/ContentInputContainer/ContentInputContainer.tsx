import type { CSSProperties, TextareaHTMLAttributes } from "react";
import { PostImage, type PostImageType } from "../PostImage";

export interface ContentInputContainerProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "children"
> {
  /**
   * 미리보기로 표시할 첨부 이미지 종류(`PostImage`의 `type` variant). 지정하면 Figma의
   * `state=filled` 스타일(테두리/패딩 제거 + 이미지 미리보기)로 전환됩니다.
   * 생략하면(기본값 없음) `state=empty` 스타일(테두리 박스 + placeholder)로 표시됩니다.
   */
  imageType?: PostImageType;
  /** 첨부 이미지 대체 텍스트. `imageType`을 지정할 때 함께 전달해야 합니다. */
  imageAlt?: string;
}

/**
 * Figma 고정 높이(766px)를 `body/lg/regular`(줄간격 24px) 기준, 상하 패딩(32px×2)을
 * 뺀 높이(702px)로 근사한 `<textarea rows>` 값입니다. 766이라는 px 값 자체는
 * spacing 토큰 스케일(0~64)에 없어 `height`로 하드코딩하지 않고, 콘텐츠 기반으로
 * 유사한 높이를 만드는 네이티브 `rows` 속성으로 대체했습니다.
 */
const DEFAULT_ROWS = 29;

const rootBaseStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "var(--spacing-32)",
  width: "100%",
  borderRadius: "var(--radius-md)",
};

const emptyRootStyle: CSSProperties = {
  ...rootBaseStyle,
  border: "var(--border-width-1) solid var(--color-text-disabled)",
  padding: "var(--spacing-32) var(--spacing-24)",
};

const textareaStyle: CSSProperties = {
  width: "100%",
  flex: "1 0 auto",
  margin: 0,
  border: "none",
  outline: "none",
  resize: "none",
  backgroundColor: "transparent",
  color: "var(--color-content-strong)",
  fontFamily: "var(--typography-body-lg-regular-font-family)",
  fontWeight:
    "var(--typography-body-lg-regular-font-weight)" as unknown as number,
  fontSize: "var(--typography-body-lg-regular-font-size)",
  lineHeight: "var(--typography-body-lg-regular-line-height)",
};

/**
 * 게시글 본문을 입력하는 영역. 실제 `<textarea>`를 확장해 controlled/uncontrolled
 * 모두 지원합니다.
 *
 * Figma: `ContentInputContainer`(node-id 783:2817, `Post` 섹션(781:5936) 하위,
 * 1740x806 프레임). `state` variant 2종을 조사했습니다.
 * - `state=empty`(764:2351, 840x766): 테두리(`text/disabled`) + 라운드(`radius/md`) +
 *   패딩(세로 32px/가로 24px) 박스 안에 `text/tertiary` + `body/lg/regular`
 *   placeholder("게시글 내용을 입력해주세요.")만 표시.
 * - `state=filled`(783:2818, 840x766): 테두리·패딩이 전부 제거되고, 기존 `PostImage`
 *   컴포넌트(500x319) + `content/strong` + `body/lg/regular` 본문 텍스트가 32px
 *   간격으로 세로 배치.
 *
 * Figma에 hover/focus 등 인터랙션 힌트가 없어(순수 정적 variant), 실사용 관점에서
 * 자연스럽게 실제 편집 가능한 `<textarea>`로 구현했습니다. `state`는 별도 prop이
 * 아니라 `imageType` 지정 여부로 파생됩니다 — filled 예시가 항상 이미지+텍스트
 * 조합이라, "첨부 이미지가 있으면 미리보기 레이아웃, 없으면 입력 박스"로 판단했습니다
 * (텍스트만 입력된 경우는 Figma에 별도 variant가 없어 empty 박스 스타일을 유지합니다).
 *
 * 너비는 Figma 원본이 840px 고정이지만 840은 spacing 스케일에 없는 값이라, 같은
 * 섹션의 `Input`/`PostWriteHeader`와 동일한 방침으로 `w-full`(100%)을 사용했습니다.
 */
export function ContentInputContainer({
  imageType,
  imageAlt,
  placeholder = "게시글 내용을 입력해주세요.",
  className = "",
  style,
  rows = DEFAULT_ROWS,
  ...rest
}: ContentInputContainerProps) {
  const isFilled = imageType != null;

  return (
    <div
      className={className}
      style={{ ...(isFilled ? rootBaseStyle : emptyRootStyle), ...style }}
      data-content-input-container={isFilled ? "filled" : "empty"}
    >
      {isFilled && (
        <PostImage type={imageType} alt={imageAlt ?? "첨부 이미지"} />
      )}
      <textarea
        placeholder={placeholder}
        rows={rows}
        className="placeholder:text-[color:var(--color-text-tertiary)]"
        style={textareaStyle}
        {...rest}
      />
    </div>
  );
}
