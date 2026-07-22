import { act } from "react";
import { createRoot } from "react-dom/client";
import { fireEvent, getByLabelText, getByText } from "@testing-library/dom";
import { describe, expect, it, vi } from "vitest";
import { TitleInput } from "./TitleInput";

function renderIntoDocument(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

describe("TitleInput", () => {
  it("label과 input이 htmlFor/id로 연결되어 렌더링된다", () => {
    const container = renderIntoDocument(<TitleInput label="제목" />);
    const input = getByLabelText(container, "제목") as HTMLInputElement;

    expect(input).toBeTruthy();
    expect(input.tagName).toBe("INPUT");
  });

  it("helpText를 전달하면 하단에 표시되고 input에 aria-describedby로 연결된다", () => {
    const container = renderIntoDocument(
      <TitleInput label="제목" helpText="13자 이내로 입력하세요" />,
    );
    const input = getByLabelText(container, "제목") as HTMLInputElement;
    const helpText = getByText(container, "13자 이내로 입력하세요");

    expect(helpText).toBeTruthy();
    expect(input.getAttribute("aria-describedby")).toBe(helpText.id);
  });

  it("helpText가 없으면 aria-describedby가 없다", () => {
    const container = renderIntoDocument(<TitleInput label="제목" />);
    const input = getByLabelText(container, "제목") as HTMLInputElement;

    expect(input.hasAttribute("aria-describedby")).toBe(false);
  });

  it("error=true면 aria-invalid가 true로 설정된다", () => {
    const container = renderIntoDocument(
      <TitleInput label="제목" error helpText="에러 메시지" />,
    );
    const input = getByLabelText(container, "제목") as HTMLInputElement;

    expect(input.getAttribute("aria-invalid")).toBe("true");
  });

  it("error가 아니면 aria-invalid가 없다", () => {
    const container = renderIntoDocument(<TitleInput label="제목" />);
    const input = getByLabelText(container, "제목") as HTMLInputElement;

    expect(input.hasAttribute("aria-invalid")).toBe(false);
  });

  it("disabled 상태에서는 네이티브 disabled 속성이 적용된다", () => {
    const container = renderIntoDocument(<TitleInput label="제목" disabled />);
    const input = getByLabelText(container, "제목") as HTMLInputElement;

    expect(input.disabled).toBe(true);
  });

  it("표준 input 패턴으로 타이핑 시 값이 변경되고 onChange가 호출된다(uncontrolled)", () => {
    const handleChange = vi.fn();
    const container = renderIntoDocument(
      <TitleInput label="제목" onChange={handleChange} />,
    );
    const input = getByLabelText(container, "제목") as HTMLInputElement;

    act(() => {
      fireEvent.change(input, { target: { value: "새 제목" } });
    });

    expect(input.value).toBe("새 제목");
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("value/onChange를 전달하면 controlled input으로 동작한다", () => {
    const handleChange = vi.fn();
    const container = renderIntoDocument(
      <TitleInput label="제목" value="고정값" onChange={handleChange} />,
    );
    const input = getByLabelText(container, "제목") as HTMLInputElement;

    expect(input.value).toBe("고정값");

    act(() => {
      fireEvent.change(input, { target: { value: "다른 값" } });
    });

    // controlled: 부모가 value를 다시 넘겨주지 않으면 값이 그대로 유지된다.
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("radius는 --radius-md 토큰을 사용한다", () => {
    const container = renderIntoDocument(<TitleInput label="제목" />);
    const input = getByLabelText(container, "제목") as HTMLInputElement;

    expect(input.style.borderRadius).toBe("var(--radius-md)");
  });

  it("전달한 className이 루트 요소에 이어붙는다", () => {
    const container = renderIntoDocument(
      <TitleInput label="제목" className="custom-title-input-class" />,
    );
    const root = container.firstElementChild as HTMLElement;

    expect(root.getAttribute("class")).toContain("custom-title-input-class");
    expect(root.getAttribute("class")).toContain("w-full");
  });
});
