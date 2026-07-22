import { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it } from "vitest";
import { Icon, ICON_NAMES } from "./Icon";

function renderIntoDocument(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

describe("Icon", () => {
  it("기본 사이즈(16px)와 viewBox로 svg를 렌더링한다", () => {
    const container = renderIntoDocument(<Icon name="search" />);
    const svg = container.querySelector("svg");

    expect(svg).toBeTruthy();
    expect(svg?.getAttribute("width")).toBe("16");
    expect(svg?.getAttribute("height")).toBe("16");
    expect(svg?.getAttribute("viewBox")).toBe("0 0 16 16");
  });

  it("size prop을 전달하면 width/height가 그에 맞게 바뀐다", () => {
    const container = renderIntoDocument(<Icon name="search" size={32} />);
    const svg = container.querySelector("svg");

    expect(svg?.getAttribute("width")).toBe("32");
    expect(svg?.getAttribute("height")).toBe("32");
    expect(svg?.getAttribute("viewBox")).toBe("0 0 16 16");
  });

  it("전달한 className이 svg에 그대로 반영된다", () => {
    const container = renderIntoDocument(
      <Icon name="search" className="custom-icon-class" />,
    );
    const svg = container.querySelector("svg");

    expect(svg?.getAttribute("class")).toContain("custom-icon-class");
  });

  it("20종 아이콘 이름 모두 렌더링 시 path를 포함한다 (하드코딩 색상 없이 currentColor 상속)", () => {
    for (const name of ICON_NAMES) {
      const container = renderIntoDocument(<Icon name={name} />);
      const svg = container.querySelector("svg");
      const paths = svg?.querySelectorAll("path");

      expect(svg?.getAttribute("data-icon")).toBe(name);
      expect(paths?.length ?? 0).toBeGreaterThan(0);
    }
  });

  it("outline 아이콘은 fill='none' + stroke='currentColor'를 사용한다 (예: arrow_left)", () => {
    const container = renderIntoDocument(<Icon name="arrow_left" />);
    const path = container.querySelector("path");

    expect(path?.getAttribute("fill")).toBe("none");
    expect(path?.getAttribute("stroke")).toBe("currentColor");
  });

  it("heart_fill은 채워진 아이콘이라 fill='currentColor'만 사용한다 (stroke 없음)", () => {
    const container = renderIntoDocument(<Icon name="heart_fill" />);
    const path = container.querySelector("path");

    expect(path?.getAttribute("fill")).toBe("currentColor");
    expect(path?.hasAttribute("stroke")).toBe(false);
  });

  it("google은 브랜드 로고 예외로 4개의 다색 hex path를 하드코딩한다", () => {
    const container = renderIntoDocument(<Icon name="google" />);
    const paths = container.querySelectorAll("path");

    expect(paths.length).toBe(4);
    expect(paths[0].getAttribute("fill")).toBe("#F44336");
    expect(paths[1].getAttribute("fill")).toBe("#FFC107");
    expect(paths[2].getAttribute("fill")).toBe("#448AFF");
    expect(paths[3].getAttribute("fill")).toBe("#43A047");
  });

  it("ICON_NAMES는 20개 아이콘 이름을 담고 있다 (iconview placeholder 제외)", () => {
    expect(ICON_NAMES.length).toBe(20);
    expect(ICON_NAMES).not.toContain("iconview");
  });

  it("bookmark_empty는 outline, bookmark_fill은 solid로 렌더링한다 (Figma 소스 없는 예외)", () => {
    const emptyContainer = renderIntoDocument(<Icon name="bookmark_empty" />);
    const emptyPath = emptyContainer.querySelector("path");
    expect(emptyPath?.getAttribute("fill")).toBe("none");
    expect(emptyPath?.getAttribute("stroke")).toBe("currentColor");

    const fillContainer = renderIntoDocument(<Icon name="bookmark_fill" />);
    const fillPath = fillContainer.querySelector("path");
    expect(fillPath?.getAttribute("fill")).toBe("currentColor");
    expect(fillPath?.hasAttribute("stroke")).toBe(false);
  });
});
