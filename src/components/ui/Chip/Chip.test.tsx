import { act } from "react";
import { createRoot } from "react-dom/client";
import { getByText } from "@testing-library/dom";
import { describe, expect, it } from "vitest";
import { Chip } from "./Chip";

function renderIntoDocument(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

describe("Chip", () => {
  it("기본값(category)으로 렌더링한다", () => {
    const container = renderIntoDocument(<Chip label="공지" />);
    const label = getByText(container, "공지");
    const chip = label.parentElement as HTMLElement;

    expect(chip.style.backgroundColor).toBe("var(--color-background-muted)");
    expect(chip.style.color).toBe("var(--color-content-strong)");
  });

  it("notice 타입에서는 danger 배경/텍스트 색상을 사용한다", () => {
    const container = renderIntoDocument(<Chip label="공지" type="notice" />);
    const label = getByText(container, "공지");
    const chip = label.parentElement as HTMLElement;

    expect(chip.style.backgroundColor).toBe("var(--color-background-danger)");
    expect(chip.style.color).toBe("var(--color-text-danger)");
  });

  it("category 타입은 design 아이콘, notice 타입은 notification 아이콘을 사용한다", () => {
    const categoryContainer = renderIntoDocument(<Chip label="공지" />);
    expect(
      categoryContainer.querySelector("[data-icon]")?.getAttribute("data-icon"),
    ).toBe("design");

    const noticeContainer = renderIntoDocument(
      <Chip label="공지" type="notice" />,
    );
    expect(
      noticeContainer.querySelector("[data-icon]")?.getAttribute("data-icon"),
    ).toBe("notification");
  });

  it("좌우/상하 padding과 gap은 spacing 토큰을 사용한다", () => {
    const container = renderIntoDocument(<Chip label="공지" />);
    const label = getByText(container, "공지");
    const chip = label.parentElement as HTMLElement;

    expect(chip.style.paddingLeft).toBe("var(--spacing-8)");
    expect(chip.style.paddingRight).toBe("var(--spacing-8)");
    expect(chip.style.paddingTop).toBe("var(--spacing-4)");
    expect(chip.style.paddingBottom).toBe("var(--spacing-4)");
    expect(chip.style.gap).toBe("var(--spacing-4)");
  });

  it("radius는 --radius-sm 토큰을 사용한다", () => {
    const container = renderIntoDocument(<Chip label="공지" />);
    const label = getByText(container, "공지");
    const chip = label.parentElement as HTMLElement;

    expect(chip.style.borderRadius).toBe("var(--radius-sm)");
  });

  it("전달한 className이 기존 클래스에 이어붙는다", () => {
    const container = renderIntoDocument(
      <Chip label="공지" className="custom-chip-class" />,
    );
    const label = getByText(container, "공지");
    const chip = label.parentElement as HTMLElement;

    expect(chip.getAttribute("class")).toContain("custom-chip-class");
    expect(chip.getAttribute("class")).toContain("shrink-0");
  });
});
