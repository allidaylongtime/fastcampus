import { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it } from "vitest";
import { Logo } from "./Logo";

function renderIntoDocument(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

describe("Logo", () => {
  it("기본 사이즈(186x38)와 viewBox로 svg를 렌더링한다", () => {
    const container = renderIntoDocument(<Logo />);
    const svg = container.querySelector("svg");

    expect(svg).toBeTruthy();
    expect(svg?.getAttribute("width")).toBe("186");
    expect(svg?.getAttribute("height")).toBe("38");
    expect(svg?.getAttribute("viewBox")).toBe("0 0 186 38");
  });

  it("width prop을 전달하면 원본 비율(186:38)을 유지하며 height가 계산된다", () => {
    const container = renderIntoDocument(<Logo width={93} />);
    const svg = container.querySelector("svg");

    expect(svg?.getAttribute("width")).toBe("93");
    expect(svg?.getAttribute("height")).toBe("19");
    expect(svg?.getAttribute("viewBox")).toBe("0 0 186 38");
  });

  it("전달한 className이 svg에 그대로 반영된다", () => {
    const container = renderIntoDocument(
      <Logo className="custom-logo-class" />,
    );
    const svg = container.querySelector("svg");

    expect(svg?.getAttribute("class")).toContain("custom-logo-class");
  });

  it("접근성을 위해 role='img'와 aria-label을 갖는다", () => {
    const container = renderIntoDocument(<Logo />);
    const svg = container.querySelector("svg");

    expect(svg?.getAttribute("role")).toBe("img");
    expect(svg?.getAttribute("aria-label")).toBe("FigmaPedia");
  });

  it("하드코딩된 hex 없이 var(--color-text-primary) 토큰만 사용한다", () => {
    const container = renderIntoDocument(<Logo />);
    const group = container.querySelector("g");

    expect(group?.getAttribute("fill")).toBe("var(--color-text-primary)");
  });

  it("13개의 path를 포함한다 (심볼 1개 + 워드마크 아웃라인 12개)", () => {
    const container = renderIntoDocument(<Logo />);
    const paths = container.querySelectorAll("path");

    expect(paths.length).toBe(13);
  });
});
