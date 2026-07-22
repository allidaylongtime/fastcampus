import { act } from "react";
import { createRoot } from "react-dom/client";
import {
  getByPlaceholderText,
  getByRole,
  getByText,
} from "@testing-library/dom";
import { describe, expect, it, vi } from "vitest";
import { Toolbar, type ToolbarSortTab } from "./Toolbar";

function renderIntoDocument(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

const TWO_SORT_TABS: ToolbarSortTab[] = [
  { label: "최신글", selected: true },
  { label: "인기글", selected: false },
];

describe("Toolbar", () => {
  it("정렬 탭 목록과 검색창을 함께 렌더링한다", () => {
    const container = renderIntoDocument(<Toolbar sortTabs={TWO_SORT_TABS} />);

    expect(getByText(container, "최신글")).toBeTruthy();
    expect(getByText(container, "인기글")).toBeTruthy();
    expect(getByPlaceholderText(container, "제목, 내용, 작성자")).toBeTruthy();
  });

  it("select 상태인 탭에는 aria-pressed=true가 붙는다", () => {
    const container = renderIntoDocument(<Toolbar sortTabs={TWO_SORT_TABS} />);
    const latest = getByRole(container, "button", {
      name: "최신글",
    }) as HTMLButtonElement;
    const popular = getByRole(container, "button", {
      name: "인기글",
    }) as HTMLButtonElement;

    expect(latest.getAttribute("aria-pressed")).toBe("true");
    expect(popular.getAttribute("aria-pressed")).toBe("false");
  });

  it("탭 사이사이에 수직 Divider를 삽입한다 (탭 N개 → 구분선 N-1개)", () => {
    const container = renderIntoDocument(
      <Toolbar
        sortTabs={[
          { label: "최신글" },
          { label: "인기글" },
          { label: "댓글순" },
        ]}
      />,
    );
    const separators = container.querySelectorAll(
      '[role="separator"][aria-orientation="vertical"]',
    );

    expect(separators.length).toBe(2);
  });

  it("탭 클릭 시 해당 탭의 onClick 핸들러가 호출된다", () => {
    const handleClick = vi.fn();
    const container = renderIntoDocument(
      <Toolbar
        sortTabs={[
          { label: "최신글", selected: true },
          { label: "인기글", onClick: handleClick },
        ]}
      />,
    );
    const popular = getByRole(container, "button", {
      name: "인기글",
    }) as HTMLButtonElement;
    popular.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("검색어 입력/제출 핸들러를 SearchBar에 그대로 전달한다", () => {
    const handleChange = vi.fn();
    const handleSubmit = vi.fn();
    const container = renderIntoDocument(
      <Toolbar
        sortTabs={TWO_SORT_TABS}
        searchValue="리액트"
        onSearchChange={handleChange}
        onSearchSubmit={handleSubmit}
      />,
    );
    const input = getByPlaceholderText(
      container,
      "제목, 내용, 작성자",
    ) as HTMLInputElement;

    act(() => {
      input.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
      );
    });

    expect(handleSubmit).toHaveBeenCalledWith("리액트");
  });

  it("searchPlaceholder를 SearchBar에 전달한다", () => {
    const container = renderIntoDocument(
      <Toolbar sortTabs={TWO_SORT_TABS} searchPlaceholder="닉네임으로 검색" />,
    );

    expect(getByPlaceholderText(container, "닉네임으로 검색")).toBeTruthy();
  });
});
