import { act } from "react";
import { createRoot } from "react-dom/client";
import { getByRole } from "@testing-library/dom";
import { describe, expect, it } from "vitest";
import { Divider } from "./Divider";

function renderIntoDocument(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

describe("Divider", () => {
  it("수평 구분선 역할(separator)로 렌더링된다", () => {
    const container = renderIntoDocument(<Divider />);
    const separator = getByRole(container, "separator");

    expect(separator).toBeTruthy();
    expect(separator.getAttribute("aria-orientation")).toBe("horizontal");
  });

  it("전달한 className이 그대로 반영된다", () => {
    const container = renderIntoDocument(<Divider className="custom-class" />);
    const separator = getByRole(container, "separator");

    expect(separator.className).toContain("custom-class");
  });

  it("토큰 기반 배경/높이 클래스를 사용한다 (하드코딩 색상/스페이싱 금지)", () => {
    const container = renderIntoDocument(<Divider />);
    const separator = getByRole(container, "separator");

    expect(separator.className).toContain(
      "bg-[var(--color-background-subtle)]",
    );
    expect(separator.className).toContain("h-[var(--spacing-2)]");
  });

  it("orientation='vertical'이면 수직 구분선으로 렌더링된다", () => {
    const container = renderIntoDocument(<Divider orientation="vertical" />);
    const separator = getByRole(container, "separator");

    expect(separator.getAttribute("aria-orientation")).toBe("vertical");
    expect(separator.className).toContain("w-[var(--border-width-1)]");
    expect(separator.className).toContain("h-[var(--spacing-12)]");
    expect(separator.className).toContain("bg-[var(--color-text-disabled)]");
  });

  it("orientation 미지정 시 기본값은 여전히 horizontal이다 (회귀 방지)", () => {
    const container = renderIntoDocument(<Divider />);
    const separator = getByRole(container, "separator");

    expect(separator.getAttribute("aria-orientation")).toBe("horizontal");
  });
});
