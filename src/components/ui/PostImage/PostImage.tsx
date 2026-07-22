import postImage1 from "../../../image/post-image-1.png";
import postImage2 from "../../../image/post-image-2.png";
import postImage3 from "../../../image/post-image-3.png";
import postImage4 from "../../../image/post-image-4.png";
import postImage5 from "../../../image/post-image-5.png";
import postImage6 from "../../../image/post-image-6.png";

/** Figma `PostImage` 컴포넌트 세트(node-id 781:5253)의 6종 `type` variant. */
export type PostImageType = 1 | 2 | 3 | 4 | 5 | 6;

/** `type` variant → 실제 PNG 에셋(src/image) 매핑. */
const POST_IMAGE_SOURCES: Record<PostImageType, string> = {
  1: postImage1,
  2: postImage2,
  3: postImage3,
  4: postImage4,
  5: postImage5,
  6: postImage6,
};

export interface PostImageProps {
  /** 렌더링할 확대 이미지 종류 (Figma `type` variant, 1~6) */
  type: PostImageType;
  /** 접근성 대체 텍스트 (필수) */
  alt: string;
  /** 추가 클래스명 */
  className?: string;
}

/**
 * 게시글 상세용 확대 이미지.
 *
 * Figma: node-id 781:5253 (`PostImage` 컴포넌트 세트, `type` variant), 500×319px 고정.
 */
export function PostImage({ type, alt, className = "" }: PostImageProps) {
  return (
    <img
      src={POST_IMAGE_SOURCES[type]}
      alt={alt}
      width={500}
      height={319}
      data-post-image={type}
      className={[
        "block object-cover rounded-[var(--radius-md)] border border-[var(--color-border-default)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
