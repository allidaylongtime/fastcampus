import { act } from "react";
import { createRoot } from "react-dom/client";
import { fireEvent, getByPlaceholderText } from "@testing-library/dom";
import { describe, expect, it, vi } from "vitest";
import { Input } from "./Input";

function renderIntoDocument(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

describe("Input", () => {
  it("기본 placeholder는 '제목을 입력해주세요.'이다", () => {
    const container = renderIntoDocument(<Input />);
    const input = getByPlaceholderText(
      container,
      "제목을 입력해주세요.",
    ) as HTMLInputElement;

    expect(input).toBeTruthy();
    expect(input.tagName).toBe("INPUT");
  });

  it("placeholder prop을 전달하면 덮어쓴다", () => {
    const container = renderIntoDocument(<Input placeholder="다른 안내" />);
    const input = getByPlaceholderText(
      container,
      "다른 안내",
    ) as HTMLInputElement;

    expect(input).toBeTruthy();
  });

  it("표준 input 패턴으로 타이핑 시 값이 변경되고 onChange가 호출된다(uncontrolled)", () => {
    const handleChange = vi.fn();
    const container = renderIntoDocument(<Input onChange={handleChange} />);
    const input = getByPlaceholderText(
      container,
      "제목을 입력해주세요.",
    ) as HTMLInputElement;

    act(() => {
      fireEvent.change(input, { target: { value: "새 제목" } });
    });

    expect(input.value).toBe("새 제목");
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("value/onChange를 전달하면 controlled input으로 동작한다", () => {
    const handleChange = vi.fn();
    const container = renderIntoDocument(
      <Input value="고정값" onChange={handleChange} />,
    );
    const input = getByPlaceholderText(
      container,
      "제목을 입력해주세요.",
    ) as HTMLInputElement;

    expect(input.value).toBe("고정값");

    act(() => {
      fireEvent.change(input, { target: { value: "다른 값" } });
    });

    // controlled: 부모가 value를 다시 넘겨주지 않으면 값이 그대로 유지된다.
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input.value).toBe("고정값");
  });

  it("disabled prop이 네이티브 disabled 속성으로 적용된다", () => {
    const container = renderIntoDocument(<Input disabled />);
    const input = getByPlaceholderText(
      container,
      "제목을 입력해주세요.",
    ) as HTMLInputElement;

    expect(input.disabled).toBe(true);
  });

  it("radius는 --radius-md 토큰을 사용한다", () => {
    const container = renderIntoDocument(<Input />);
    const input = getByPlaceholderText(
      container,
      "제목을 입력해주세요.",
    ) as HTMLInputElement;

    expect(input.style.borderRadius).toBe("var(--radius-md)");
  });

  it("높이는 --spacing-64 토큰을 사용한다", () => {
    const container = renderIntoDocument(<Input />);
    const input = getByPlaceholderText(
      container,
      "제목을 입력해주세요.",
    ) as HTMLInputElement;

    expect(input.style.height).toBe("var(--spacing-64)");
  });

  it("전달한 className이 이어붙는다", () => {
    const container = renderIntoDocument(
      <Input className="custom-input-class" />,
    );
    const input = container.firstElementChild as HTMLElement;

    expect(input.getAttribute("class")).toContain("custom-input-class");
  });
});
