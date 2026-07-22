import postCardImage1 from "../../../image/post-card-image-1.png";
import postCardImage2 from "../../../image/post-card-image-2.png";
import postCardImage3 from "../../../image/post-card-image-3.png";
import postCardImage4 from "../../../image/post-card-image-4.png";
import postCardImage5 from "../../../image/post-card-image-5.png";
import postCardImage6 from "../../../image/post-card-image-6.png";

/** Figma `PostCardImage` 컴포넌트 세트(node-id 783:7868)의 6종 `type` variant. */
export type PostCardImageType = 1 | 2 | 3 | 4 | 5 | 6;

/** `type` variant → 실제 PNG 에셋(src/image) 매핑. */
const POST_CARD_IMAGE_SOURCES: Record<PostCardImageType, string> = {
  1: postCardImage1,
  2: postCardImage2,
  3: postCardImage3,
  4: postCardImage4,
  5: postCardImage5,
  6: postCardImage6,
};

export interface PostCardImageProps {
  /** 렌더링할 썸네일 종류 (Figma `type` variant, 1~6) */
  type: PostCardImageType;
  /** 접근성 대체 텍스트 (필수) */
  alt: string;
  /** 추가 클래스명 */
  className?: string;
}

/**
 * 게시글 카드용 정사각 근접 썸네일 이미지.
 *
 * Figma: node-id 783:7868 (`PostCardImage` 컴포넌트 세트, `type` variant), 160×102px 고정.
 */
export function PostCardImage({
  type,
  alt,
  className = "",
}: PostCardImageProps) {
  return (
    <img
      src={POST_CARD_IMAGE_SOURCES[type]}
      alt={alt}
      width={160}
      height={102}
      data-post-card-image={type}
      className={[
        "block object-cover rounded-[var(--radius-sm)] border border-[var(--color-border-default)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
