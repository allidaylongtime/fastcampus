import { act } from "react";
import { createRoot } from "react-dom/client";
import { fireEvent, getByPlaceholderText } from "@testing-library/dom";
import { describe, expect, it, vi } from "vitest";
import { SearchBar } from "./SearchBar";

function renderIntoDocument(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

describe("SearchBar", () => {
  it("기본 placeholder로 실제 search input을 렌더링한다", () => {
    const container = renderIntoDocument(<SearchBar />);
    const input = getByPlaceholderText(
      container,
      "제목, 내용, 작성자",
    ) as HTMLInputElement;

    expect(input.tagName).toBe("INPUT");
    expect(input.getAttribute("type")).toBe("search");
  });

  it("커스텀 placeholder를 반영한다", () => {
    const container = renderIntoDocument(
      <SearchBar placeholder="닉네임으로 검색" />,
    );

    expect(getByPlaceholderText(container, "닉네임으로 검색")).toBeTruthy();
  });

  it("입력 시 onChange가 호출된다", () => {
    const handleChange = vi.fn();
    const container = renderIntoDocument(<SearchBar onChange={handleChange} />);
    const input = getByPlaceholderText(
      container,
      "제목, 내용, 작성자",
    ) as HTMLInputElement;

    act(() => {
      fireEvent.change(input, { target: { value: "리액트" } });
    });

    expect(handleChange).toHaveBeenCalledWith("리액트");
  });

  it("엔터 입력 시 onSubmit이 현재 값과 함께 호출된다", () => {
    const handleSubmit = vi.fn();
    const container = renderIntoDocument(
      <SearchBar value="리액트" onSubmit={handleSubmit} onChange={() => {}} />,
    );
    const input = getByPlaceholderText(
      container,
      "제목, 내용, 작성자",
    ) as HTMLInputElement;

    act(() => {
      fireEvent.keyDown(input, { key: "Enter" });
    });

    expect(handleSubmit).toHaveBeenCalledWith("리액트");
  });

  it("토큰 기반 border/radius 클래스를 사용한다 (하드코딩 색상 금지)", () => {
    const container = renderIntoDocument(<SearchBar />);
    const root = container.firstElementChild as HTMLDivElement;

    expect(root.style.border).toContain("var(--color-text-disabled)");
    expect(root.style.borderRadius).toBe("var(--radius-circle)");
  });
});
