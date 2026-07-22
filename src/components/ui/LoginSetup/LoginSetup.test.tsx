import { act } from "react";
import { createRoot } from "react-dom/client";
import { fireEvent, getByRole, getByText } from "@testing-library/dom";
import { describe, expect, it, vi } from "vitest";
import { LoginSetup } from "./LoginSetup";

function renderIntoDocument(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

describe("LoginSetup", () => {
  it("로그인 유지 체크박스와 비밀번호 찾기 버튼을 렌더링한다", () => {
    const container = renderIntoDocument(<LoginSetup />);

    const checkbox = getByRole(container, "checkbox", {
      name: "로그인 유지",
    }) as HTMLInputElement;
    const button = getByRole(container, "button", { name: "비밀번호 찾기" });
    const label = getByText(container, "로그인 유지");

    expect(checkbox.checked).toBe(false);
    expect(button).toBeTruthy();
    expect(label).toBeTruthy();
  });

  it("defaultChecked=true면 체크박스가 체크된 상태로 렌더링된다", () => {
    const container = renderIntoDocument(<LoginSetup defaultChecked />);
    const checkbox = getByRole(container, "checkbox", {
      name: "로그인 유지",
    }) as HTMLInputElement;

    expect(checkbox.checked).toBe(true);
  });

  it("체크박스를 클릭하면 uncontrolled로 토글되고 onChange가 호출된다", () => {
    const handleChange = vi.fn();
    const container = renderIntoDocument(
      <LoginSetup onChange={handleChange} />,
    );
    const checkbox = getByRole(container, "checkbox", {
      name: "로그인 유지",
    }) as HTMLInputElement;

    act(() => {
      fireEvent.click(checkbox);
    });

    expect(checkbox.checked).toBe(true);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("checked prop을 전달하면 controlled로 동작한다", () => {
    const handleChange = vi.fn();
    const container = renderIntoDocument(
      <LoginSetup checked={false} onChange={handleChange} />,
    );
    const checkbox = getByRole(container, "checkbox", {
      name: "로그인 유지",
    }) as HTMLInputElement;

    act(() => {
      fireEvent.click(checkbox);
    });

    expect(checkbox.checked).toBe(false);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("비밀번호 찾기 버튼을 클릭하면 onFindPasswordClick이 호출된다", () => {
    const handleClick = vi.fn();
    const container = renderIntoDocument(
      <LoginSetup onFindPasswordClick={handleClick} />,
    );
    const button = getByRole(container, "button", { name: "비밀번호 찾기" });

    act(() => {
      fireEvent.click(button);
    });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("전달한 className이 루트 요소에 이어붙는다", () => {
    const container = renderIntoDocument(
      <LoginSetup className="custom-login-setup-class" />,
    );
    const root = container.querySelector(
      '[data-login-setup="root"]',
    ) as HTMLElement;

    expect(root.getAttribute("class")).toContain("custom-login-setup-class");
  });
});
