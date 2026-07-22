import { act } from "react";
import { createRoot } from "react-dom/client";
import { getByText } from "@testing-library/dom";
import { describe, expect, it } from "vitest";
import { Date } from "./Date";

function renderIntoDocument(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

describe("Date", () => {
  it("text prop으로 전달한 문자열을 그대로 렌더링한다", () => {
    const container = renderIntoDocument(<Date text="26.05.06" />);
    const date = getByText(container, "26.05.06");

    expect(date).toBeTruthy();
  });

  it("text가 바뀌면 표시 문자열도 바뀐다", () => {
    const container = renderIntoDocument(<Date text="25.12.31" />);
    const date = getByText(container, "25.12.31");

    expect(date).toBeTruthy();
  });

  it("색상 토큰으로 text/tertiary(--color-text-tertiary)를 사용한다", () => {
    const container = renderIntoDocument(<Date text="26.05.06" />);
    const date = getByText(container, "26.05.06") as HTMLElement;

    expect(date.style.color).toBe("var(--color-text-tertiary)");
  });

  it("타이포그래피 토큰으로 body/sm/regular를 사용한다", () => {
    const container = renderIntoDocument(<Date text="26.05.06" />);
    const date = getByText(container, "26.05.06") as HTMLElement;

    expect(date.style.fontSize).toBe(
      "var(--typography-body-sm-regular-font-size)",
    );
    expect(date.style.lineHeight).toBe(
      "var(--typography-body-sm-regular-line-height)",
    );
  });

  it("전달한 className이 루트 요소에 적용된다", () => {
    const container = renderIntoDocument(
      <Date text="26.05.06" className="custom-date-class" />,
    );
    const root = container.firstElementChild as HTMLElement;

    expect(root.getAttribute("class")).toBe("custom-date-class");
  });
});
