import { act } from "react";
import { createRoot } from "react-dom/client";
import { fireEvent, getByRole, getByText } from "@testing-library/dom";
import { describe, expect, it, vi } from "vitest";
import { LoginBottom } from "./LoginBottom";

function renderIntoDocument(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

describe("LoginBottom", () => {
  it("LoginSetup과 LoginSign을 모두 렌더링한다", () => {
    const container = renderIntoDocument(<LoginBottom />);

    const checkbox = getByRole(container, "checkbox", {
      name: "로그인 유지",
    }) as HTMLInputElement;
    const findPasswordButton = getByRole(container, "button", {
      name: "비밀번호 찾기",
    });
    const signUpButton = getByRole(container, "button", { name: "회원가입" });
    const signUpLabel = getByText(
      container,
      "아직 피그마피디아 회원이 아니세요?",
    );

    expect(checkbox.checked).toBe(false);
    expect(findPasswordButton).toBeTruthy();
    expect(signUpButton).toBeTruthy();
    expect(signUpLabel).toBeTruthy();
  });

  it("defaultChecked=true면 체크박스가 체크된 상태로 렌더링된다", () => {
    const container = renderIntoDocument(<LoginBottom defaultChecked />);
    const checkbox = getByRole(container, "checkbox", {
      name: "로그인 유지",
    }) as HTMLInputElement;

    expect(checkbox.checked).toBe(true);
  });

  it("체크박스를 클릭하면 uncontrolled로 토글되고 onChange가 호출된다", () => {
    const handleChange = vi.fn();
    const container = renderIntoDocument(
      <LoginBottom onChange={handleChange} />,
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
      <LoginBottom checked={false} onChange={handleChange} />,
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
      <LoginBottom onFindPasswordClick={handleClick} />,
    );
    const button = getByRole(container, "button", { name: "비밀번호 찾기" });

    act(() => {
      fireEvent.click(button);
    });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("회원가입 버튼을 클릭하면 onSignUpClick이 호출된다", () => {
    const handleClick = vi.fn();
    const container = renderIntoDocument(
      <LoginBottom onSignUpClick={handleClick} />,
    );
    const button = getByRole(container, "button", { name: "회원가입" });

    act(() => {
      fireEvent.click(button);
    });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("전달한 className이 루트 요소에 이어붙는다", () => {
    const container = renderIntoDocument(
      <LoginBottom className="custom-login-bottom-class" />,
    );
    const root = container.querySelector(
      '[data-login-bottom="root"]',
    ) as HTMLElement;

    expect(root.getAttribute("class")).toContain("custom-login-bottom-class");
  });
});
