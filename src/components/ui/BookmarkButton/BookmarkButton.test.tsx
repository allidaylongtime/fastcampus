import { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import { BookmarkButton } from "./BookmarkButton";

function renderIntoDocument(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

describe("BookmarkButton", () => {
  it("기본값(bookmarked=false)일 때 outline 아이콘과 tertiary 색상을 사용한다", () => {
    const container = renderIntoDocument(<BookmarkButton />);
    const button = container.querySelector("button") as HTMLButtonElement;
    const icon = button.querySelector("[data-icon]");

    expect(button.getAttribute("aria-pressed")).toBe("false");
    expect(button.getAttribute("data-bookmark-button")).toBe("default");
    expect(icon?.getAttribute("data-icon")).toBe("bookmark_empty");
    expect(button.style.color).toBe("var(--color-text-tertiary)");
  });

  it("bookmarked=true일 때 filled 아이콘과 브랜드 색상을 사용한다", () => {
    const container = renderIntoDocument(<BookmarkButton bookmarked />);
    const button = container.querySelector("button") as HTMLButtonElement;
    const icon = button.querySelector("[data-icon]");

    expect(button.getAttribute("aria-pressed")).toBe("true");
    expect(button.getAttribute("data-bookmark-button")).toBe("filled");
    expect(icon?.getAttribute("data-icon")).toBe("bookmark_fill");
    expect(button.style.color).toBe("var(--color-interactive-primary)");
  });

  it("클릭 시 onClick 핸들러가 호출된다", () => {
    const handleClick = vi.fn();
    const container = renderIntoDocument(
      <BookmarkButton onClick={handleClick} />,
    );
    const button = container.querySelector("button") as HTMLButtonElement;

    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("기본 aria-label은 '북마크'이며, 전달하면 오버라이드된다", () => {
    const defaultContainer = renderIntoDocument(<BookmarkButton />);
    expect(
      defaultContainer.querySelector("button")?.getAttribute("aria-label"),
    ).toBe("북마크");

    const customContainer = renderIntoDocument(
      <BookmarkButton aria-label="북마크 해제" />,
    );
    expect(
      customContainer.querySelector("button")?.getAttribute("aria-label"),
    ).toBe("북마크 해제");
  });
});
