import { act } from "react";
import { createRoot } from "react-dom/client";
import { getByRole } from "@testing-library/dom";
import { describe, expect, it } from "vitest";
import { PostImage, type PostImageType } from "./PostImage";

const ALL_TYPES: readonly PostImageType[] = [1, 2, 3, 4, 5, 6];

function renderIntoDocument(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

describe("PostImage", () => {
  it("고정 크기(500x319)의 img로 렌더링된다", () => {
    const container = renderIntoDocument(<PostImage type={1} alt="이미지" />);
    const img = getByRole(container, "img");

    expect(img.getAttribute("width")).toBe("500");
    expect(img.getAttribute("height")).toBe("319");
  });

  it("전달한 alt가 그대로 반영된다 (필수 prop)", () => {
    const container = renderIntoDocument(
      <PostImage type={2} alt="게시글 상세 이미지 설명" />,
    );
    const img = getByRole(container, "img");

    expect(img.getAttribute("alt")).toBe("게시글 상세 이미지 설명");
  });

  it("전달한 className이 기본 클래스에 추가로 반영된다", () => {
    const container = renderIntoDocument(
      <PostImage type={1} alt="이미지" className="custom-class" />,
    );
    const img = getByRole(container, "img");

    expect(img.className).toContain("custom-class");
  });

  it("토큰 기반 라운드/보더 클래스를 사용한다 (하드코딩 색상/spacing 금지)", () => {
    const container = renderIntoDocument(<PostImage type={1} alt="이미지" />);
    const img = getByRole(container, "img");

    expect(img.className).toContain("rounded-[var(--radius-md)]");
    expect(img.className).toContain("border-[var(--color-border-default)]");
  });

  it("type=1~6 각각 다른 이미지 src를 렌더링한다", () => {
    const srcs = ALL_TYPES.map((type) => {
      const container = renderIntoDocument(
        <PostImage type={type} alt={`이미지 ${type}`} />,
      );
      const img = getByRole(container, "img");
      return img.getAttribute("src");
    });

    expect(new Set(srcs).size).toBe(ALL_TYPES.length);
  });

  it("data-post-image 속성에 현재 type을 노출한다", () => {
    const container = renderIntoDocument(<PostImage type={5} alt="이미지" />);
    const img = getByRole(container, "img");

    expect(img.getAttribute("data-post-image")).toBe("5");
  });
});
