import { act } from "react";
import { createRoot } from "react-dom/client";
import { getByRole, getByText } from "@testing-library/dom";
import { describe, expect, it } from "vitest";
import { PostWriteHeader } from "./PostWriteHeader";

function renderIntoDocument(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

describe("PostWriteHeader", () => {
  it("기본 title/description(Figma 기본값)을 렌더링한다", () => {
    const container = renderIntoDocument(<PostWriteHeader />);

    expect(
      getByRole(container, "heading", { name: "게시글 쓰기" }),
    ).toBeTruthy();
    expect(
      getByText(container, "건전한 커뮤니티를 위해 바른말 고운말을 씁시다."),
    ).toBeTruthy();
  });

  it("title/description prop을 전달하면 덮어쓴다", () => {
    const container = renderIntoDocument(
      <PostWriteHeader title="게시글 수정" description="설명 변경" />,
    );

    expect(
      getByRole(container, "heading", { name: "게시글 수정" }),
    ).toBeTruthy();
    expect(getByText(container, "설명 변경")).toBeTruthy();
  });

  it("title은 heading 요소(h1)로 렌더링된다", () => {
    const container = renderIntoDocument(<PostWriteHeader />);
    const heading = getByRole(container, "heading", { name: "게시글 쓰기" });

    expect(heading.tagName).toBe("H1");
  });

  it("전달한 className이 루트 요소에 이어붙는다", () => {
    const container = renderIntoDocument(
      <PostWriteHeader className="custom-header-class" />,
    );
    const root = container.firstElementChild as HTMLElement;

    expect(root.getAttribute("class")).toContain("custom-header-class");
  });
});
