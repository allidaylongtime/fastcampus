import { act } from "react";
import { createRoot } from "react-dom/client";
import {
  fireEvent,
  getByPlaceholderText,
  getByRole,
  queryByRole,
} from "@testing-library/dom";
import { describe, expect, it, vi } from "vitest";
import { ContentInputContainer } from "./ContentInputContainer";

function renderIntoDocument(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

describe("ContentInputContainer", () => {
  it("imageType이 없으면 empty 스타일(테두리 박스)로 렌더링되고 이미지가 없다", () => {
    const container = renderIntoDocument(<ContentInputContainer />);
    const root = container.firstElementChild as HTMLElement;

    expect(root.dataset.contentInputContainer).toBe("empty");
    expect(root.style.border).toContain("var(--color-text-disabled)");
    expect(queryByRole(container, "img")).toBeNull();
  });

  it("imageType을 지정하면 filled 스타일(테두리 제거)로 전환되고 PostImage가 렌더링된다", () => {
    const container = renderIntoDocument(
      <ContentInputContainer imageType={1} imageAlt="첨부 이미지" />,
    );
    const root = container.firstElementChild as HTMLElement;

    expect(root.dataset.contentInputContainer).toBe("filled");
    expect(root.style.border).toBe("");
    expect(getByRole(container, "img", { name: "첨부 이미지" })).toBeTruthy();
  });

  it("기본 placeholder는 '게시글 내용을 입력해주세요.'이다", () => {
    const container = renderIntoDocument(<ContentInputContainer />);
    const textarea = getByPlaceholderText(
      container,
      "게시글 내용을 입력해주세요.",
    ) as HTMLTextAreaElement;

    expect(textarea.tagName).toBe("TEXTAREA");
  });

  it("표준 textarea 패턴으로 타이핑 시 값이 변경되고 onChange가 호출된다(uncontrolled)", () => {
    const handleChange = vi.fn();
    const container = renderIntoDocument(
      <ContentInputContainer onChange={handleChange} />,
    );
    const textarea = getByPlaceholderText(
      container,
      "게시글 내용을 입력해주세요.",
    ) as HTMLTextAreaElement;

    act(() => {
      fireEvent.change(textarea, { target: { value: "새 본문" } });
    });

    expect(textarea.value).toBe("새 본문");
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("value/onChange를 전달하면 controlled textarea로 동작한다", () => {
    const handleChange = vi.fn();
    const container = renderIntoDocument(
      <ContentInputContainer value="고정 본문" onChange={handleChange} />,
    );
    const textarea = getByPlaceholderText(
      container,
      "게시글 내용을 입력해주세요.",
    ) as HTMLTextAreaElement;

    expect(textarea.value).toBe("고정 본문");

    act(() => {
      fireEvent.change(textarea, { target: { value: "다른 본문" } });
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(textarea.value).toBe("고정 본문");
  });

  it("radius는 --radius-md 토큰을 사용한다", () => {
    const container = renderIntoDocument(<ContentInputContainer />);
    const root = container.firstElementChild as HTMLElement;

    expect(root.style.borderRadius).toBe("var(--radius-md)");
  });

  it("전달한 className이 루트 요소에 적용된다", () => {
    const container = renderIntoDocument(
      <ContentInputContainer className="custom-content-input-class" />,
    );
    const root = container.firstElementChild as HTMLElement;

    expect(root.getAttribute("class")).toContain("custom-content-input-class");
  });
});
