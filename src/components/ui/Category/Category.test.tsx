import { act } from "react";
import { createRoot } from "react-dom/client";
import { getByRole } from "@testing-library/dom";
import { describe, expect, it, vi } from "vitest";
import { Category } from "./Category";

function renderIntoDocument(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

describe("Category", () => {
  it("기본값(default)으로 렌더링한다", () => {
    const container = renderIntoDocument(<Category label="커뮤니티" />);
    const button = getByRole(container, "button");

    expect(button.textContent).toBe("커뮤니티");
    expect(button.getAttribute("aria-pressed")).toBe("false");
    expect((button as HTMLButtonElement).style.color).toBe(
      "var(--color-text-disabled)",
    );
    expect((button as HTMLButtonElement).style.borderBottom).toBe(
      "0px solid transparent",
    );
  });

  it("selected 상태에서는 하단 4px 밑줄과 텍스트 색상이 바뀐다", () => {
    const container = renderIntoDocument(
      <Category label="커뮤니티" state="selected" />,
    );
    const button = getByRole(container, "button") as HTMLButtonElement;

    expect(button.getAttribute("aria-pressed")).toBe("true");
    expect(button.style.color).toBe("var(--color-text-primary)");
    expect(button.style.borderBottom).toBe(
      "var(--spacing-4) solid var(--color-interactive-primary)",
    );
  });

  it("좌우 padding은 --spacing-8 토큰을 사용한다", () => {
    const container = renderIntoDocument(<Category label="커뮤니티" />);
    const button = getByRole(container, "button") as HTMLButtonElement;

    expect(button.style.paddingLeft).toBe("var(--spacing-8)");
    expect(button.style.paddingRight).toBe("var(--spacing-8)");
  });

  it("클릭 시 onClick 핸들러가 호출된다", () => {
    const handleClick = vi.fn();
    const container = renderIntoDocument(
      <Category label="커뮤니티" onClick={handleClick} />,
    );
    const button = getByRole(container, "button") as HTMLButtonElement;
    button.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("전달한 className이 기존 클래스에 이어붙는다", () => {
    const container = renderIntoDocument(
      <Category label="커뮤니티" className="custom-category-class" />,
    );
    const button = getByRole(container, "button");

    expect(button.getAttribute("class")).toContain("custom-category-class");
    expect(button.getAttribute("class")).toContain("inline-flex");
  });

  it("기본 type은 'button'이라 폼 제출을 유발하지 않는다", () => {
    const container = renderIntoDocument(<Category label="커뮤니티" />);
    const button = getByRole(container, "button");

    expect(button.getAttribute("type")).toBe("button");
  });
});
