import { act } from "react";
import { createRoot } from "react-dom/client";
import { getByRole } from "@testing-library/dom";
import { describe, expect, it, vi } from "vitest";
import { SortTabItem } from "./SortTabItem";

function renderIntoDocument(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

describe("SortTabItem", () => {
  it("기본값(default)으로 렌더링한다 (체크 아이콘 없음)", () => {
    const container = renderIntoDocument(<SortTabItem label="최신글" />);
    const button = getByRole(container, "button") as HTMLButtonElement;

    expect(button.textContent).toBe("최신글");
    expect(button.getAttribute("aria-pressed")).toBe("false");
    expect(container.querySelector('svg[data-icon="check"]')).toBeNull();
  });

  it("select 상태에서는 체크 아이콘과 굵은 텍스트가 표시된다", () => {
    const container = renderIntoDocument(
      <SortTabItem label="최신글" state="select" />,
    );
    const button = getByRole(container, "button") as HTMLButtonElement;
    const icon = container.querySelector('svg[data-icon="check"]');

    expect(button.getAttribute("aria-pressed")).toBe("true");
    expect(icon).not.toBeNull();
  });

  it("클릭 시 onClick 핸들러가 호출된다", () => {
    const handleClick = vi.fn();
    const container = renderIntoDocument(
      <SortTabItem label="최신글" onClick={handleClick} />,
    );
    const button = getByRole(container, "button") as HTMLButtonElement;
    button.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("전달한 className이 기존 클래스에 이어붙는다", () => {
    const container = renderIntoDocument(
      <SortTabItem label="최신글" className="custom-sort-tab-class" />,
    );
    const button = getByRole(container, "button");

    expect(button.getAttribute("class")).toContain("custom-sort-tab-class");
    expect(button.getAttribute("class")).toContain("inline-flex");
  });

  it("기본 type은 'button'이라 폼 제출을 유발하지 않는다", () => {
    const container = renderIntoDocument(<SortTabItem label="최신글" />);
    const button = getByRole(container, "button");

    expect(button.getAttribute("type")).toBe("button");
  });
});
