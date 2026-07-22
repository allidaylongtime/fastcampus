import { act } from "react";
import { createRoot } from "react-dom/client";
import {
  fireEvent,
  getByPlaceholderText,
  getByRole,
} from "@testing-library/dom";
import { describe, expect, it, vi } from "vitest";
import { PostFilterHeader } from "./PostFilterHeader";

function renderIntoDocument(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

describe("PostFilterHeader", () => {
  it("기본 title(Figma 기본값)과 글쓰기 버튼을 렌더링한다", () => {
    const container = renderIntoDocument(<PostFilterHeader />);

    expect(
      getByRole(container, "heading", { name: "전체 게시글" }),
    ).toBeTruthy();
    expect(getByRole(container, "button", { name: "글쓰기" })).toBeTruthy();
  });

  it("title prop을 전달하면 덮어쓴다", () => {
    const container = renderIntoDocument(
      <PostFilterHeader title="내가 쓴 글" />,
    );

    expect(
      getByRole(container, "heading", { name: "내가 쓴 글" }),
    ).toBeTruthy();
  });

  it("기본 정렬 탭은 최신글이 선택된 상태로 렌더링된다", () => {
    const container = renderIntoDocument(<PostFilterHeader />);
    const latest = getByRole(container, "button", { name: "최신글" });
    const popular = getByRole(container, "button", { name: "인기글" });

    expect(latest.getAttribute("aria-pressed")).toBe("true");
    expect(popular.getAttribute("aria-pressed")).toBe("false");
  });

  it("글쓰기 버튼 클릭 시 onWriteClick이 호출된다", () => {
    const handleWriteClick = vi.fn();
    const container = renderIntoDocument(
      <PostFilterHeader onWriteClick={handleWriteClick} />,
    );
    const writeButton = getByRole(container, "button", { name: "글쓰기" });

    act(() => {
      fireEvent.click(writeButton);
    });

    expect(handleWriteClick).toHaveBeenCalledTimes(1);
  });

  it("Toolbar의 검색창 placeholder는 기본적으로 '제목, 내용, 작성자'이다", () => {
    const container = renderIntoDocument(<PostFilterHeader />);

    expect(getByPlaceholderText(container, "제목, 내용, 작성자")).toBeTruthy();
  });

  it("전달한 className이 루트 요소에 이어붙는다", () => {
    const container = renderIntoDocument(
      <PostFilterHeader className="custom-filter-header-class" />,
    );
    const root = container.firstElementChild as HTMLElement;

    expect(root.getAttribute("class")).toContain("custom-filter-header-class");
  });
});
