import { act } from "react";
import { createRoot } from "react-dom/client";
import { fireEvent, getByRole, getByText } from "@testing-library/dom";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./Checkbox";

function renderIntoDocument(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

describe("Checkbox", () => {
  it("기본값(unchecked)으로 렌더링한다", () => {
    const container = renderIntoDocument(<Checkbox aria-label="동의" />);
    const input = getByRole(container, "checkbox") as HTMLInputElement;
    const box = input.nextElementSibling as HTMLElement;

    expect(input.checked).toBe(false);
    expect(box.style.backgroundColor).toBe("var(--color-text-disabled)");
    expect(container.querySelector("svg[data-icon='check']")).toBeNull();
  });

  it("defaultChecked=true면 checked 배경/체크 아이콘을 표시한다", () => {
    const container = renderIntoDocument(
      <Checkbox aria-label="동의" defaultChecked />,
    );
    const input = getByRole(container, "checkbox") as HTMLInputElement;
    const box = input.nextElementSibling as HTMLElement;

    expect(input.checked).toBe(true);
    expect(box.style.backgroundColor).toBe("var(--color-interactive-primary)");
    expect(container.querySelector("svg[data-icon='check']")).not.toBeNull();
  });

  it("radius는 --radius-xs 토큰을 사용한다", () => {
    const container = renderIntoDocument(<Checkbox aria-label="동의" />);
    const input = getByRole(container, "checkbox") as HTMLInputElement;
    const box = input.nextElementSibling as HTMLElement;

    expect(box.style.borderRadius).toBe("var(--radius-xs)");
  });

  it("클릭하면 uncontrolled 상태로 체크가 토글되고 onChange가 호출된다", () => {
    const handleChange = vi.fn();
    const container = renderIntoDocument(
      <Checkbox aria-label="동의" onChange={handleChange} />,
    );
    const input = getByRole(container, "checkbox") as HTMLInputElement;

    act(() => {
      fireEvent.click(input);
    });

    expect(input.checked).toBe(true);
    expect(handleChange).toHaveBeenCalledTimes(1);

    act(() => {
      fireEvent.click(input);
    });
    expect(input.checked).toBe(false);
  });

  it("checked prop을 전달하면 controlled로 동작하고 클릭만으로 값이 바뀌지 않는다", () => {
    const handleChange = vi.fn();
    const container = renderIntoDocument(
      <Checkbox aria-label="동의" checked={false} onChange={handleChange} />,
    );
    const input = getByRole(container, "checkbox") as HTMLInputElement;

    act(() => {
      fireEvent.click(input);
    });

    // controlled: 부모가 checked를 다시 넘겨주지 않으면 값이 그대로 유지된다.
    expect(input.checked).toBe(false);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("disabled 상태에서는 네이티브 disabled 속성이 적용된다", () => {
    const container = renderIntoDocument(
      <Checkbox aria-label="동의" disabled />,
    );
    const input = getByRole(container, "checkbox") as HTMLInputElement;

    expect(input.disabled).toBe(true);
  });

  it("label을 전달하면 접근 가능한 이름으로 노출된다", () => {
    const container = renderIntoDocument(
      <Checkbox label="약관에 동의합니다" />,
    );
    const input = getByRole(container, "checkbox", {
      name: "약관에 동의합니다",
    }) as HTMLInputElement;
    const labelText = getByText(container, "약관에 동의합니다");

    expect(input).toBeTruthy();
    expect(labelText).toBeTruthy();
  });

  it("전달한 className이 label 요소에 이어붙는다", () => {
    const container = renderIntoDocument(
      <Checkbox aria-label="동의" className="custom-checkbox-class" />,
    );
    const label = container.querySelector("label");

    expect(label?.getAttribute("class")).toContain("custom-checkbox-class");
    expect(label?.getAttribute("class")).toContain("inline-flex");
  });
});
