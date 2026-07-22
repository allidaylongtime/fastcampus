import { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it } from "vitest";
import { Button } from "./Button";

function renderIntoDocument(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

describe("Button", () => {
  it("기본값(core/medium)으로 렌더링한다", () => {
    const container = renderIntoDocument(<Button>버튼</Button>);
    const button = container.querySelector("button");

    expect(button).toBeTruthy();
    expect(button?.textContent).toBe("버튼");
    expect(button?.style.backgroundColor).toBe("var(--color-button-core-bg)");
    expect(button?.style.color).toBe("var(--color-button-core-text)");
  });

  it("variant별로 올바른 색상 토큰을 사용한다", () => {
    const container = renderIntoDocument(
      <Button variant="warning-light">경고</Button>,
    );
    const button = container.querySelector("button");

    expect(button?.style.backgroundColor).toBe(
      "var(--color-button-warning-light-bg)",
    );
    expect(button?.style.color).toBe("var(--color-button-warning-light-text)");
  });

  it("outline variant는 border 토큰을 추가로 사용한다", () => {
    const container = renderIntoDocument(
      <Button variant="outline">아웃라인</Button>,
    );
    const button = container.querySelector("button");

    expect(button?.style.border).toBe(
      "var(--border-width-1) solid var(--color-button-outline-border)",
    );
  });

  it("size별로 올바른 padding/gap 토큰을 사용한다", () => {
    const large = renderIntoDocument(<Button size="large">버튼</Button>);
    const medium = renderIntoDocument(<Button size="medium">버튼</Button>);
    const small = renderIntoDocument(<Button size="small">버튼</Button>);

    expect(large.querySelector("button")?.style.padding).toBe(
      "var(--spacing-16) var(--spacing-24)",
    );
    expect(medium.querySelector("button")?.style.padding).toBe(
      "var(--spacing-12) var(--spacing-16)",
    );
    expect(small.querySelector("button")?.style.padding).toBe(
      "var(--spacing-8) var(--spacing-12)",
    );
    expect(small.querySelector("button")?.style.gap).toBe("var(--spacing-4)");
  });

  it("children 없이 icon만 전달하면 아이콘 전용(대칭 padding) 버튼이 된다", () => {
    const container = renderIntoDocument(
      <Button icon="search" aria-label="검색" size="large" />,
    );
    const button = container.querySelector("button");

    expect(button?.style.padding).toBe("var(--spacing-16)");
    expect(button?.getAttribute("aria-label")).toBe("검색");
  });

  it("icon prop을 전달하면 size에 맞는 크기로 Icon을 렌더링한다", () => {
    const container = renderIntoDocument(
      <Button icon="search" size="small">
        검색
      </Button>,
    );
    const icon = container.querySelector('svg[data-icon="search"]');

    expect(icon).toBeTruthy();
    expect(icon?.getAttribute("width")).toBe("16");
  });

  it("icon이 없으면 Icon을 렌더링하지 않는다", () => {
    const container = renderIntoDocument(<Button>버튼</Button>);
    const icon = container.querySelector("svg");

    expect(icon).toBeNull();
  });

  it("disabled 상태에서는 네이티브 disabled 속성이 적용된다", () => {
    const container = renderIntoDocument(<Button disabled>버튼</Button>);
    const button = container.querySelector("button");

    expect(button?.disabled).toBe(true);
  });

  it("전달한 className이 기존 클래스에 이어붙는다", () => {
    const container = renderIntoDocument(
      <Button className="custom-button-class">버튼</Button>,
    );
    const button = container.querySelector("button");

    expect(button?.getAttribute("class")).toContain("custom-button-class");
    expect(button?.getAttribute("class")).toContain("inline-flex");
  });

  it("기본 type은 'button'이라 폼 제출을 유발하지 않는다", () => {
    const container = renderIntoDocument(<Button>버튼</Button>);
    const button = container.querySelector("button");

    expect(button?.getAttribute("type")).toBe("button");
  });
});
