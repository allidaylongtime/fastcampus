import { act } from "react";
import { createRoot } from "react-dom/client";
import { fireEvent, getByRole, getByText } from "@testing-library/dom";
import { describe, expect, it, vi } from "vitest";
import { LoginSign } from "./LoginSign";

function renderIntoDocument(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

describe("LoginSign", () => {
  it("안내 문구와 회원가입 버튼을 렌더링한다", () => {
    const container = renderIntoDocument(<LoginSign />);

    const label = getByText(container, "아직 피그마피디아 회원이 아니세요?");
    const button = getByRole(container, "button", { name: "회원가입" });

    expect(label).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it("회원가입 버튼을 클릭하면 onSignUpClick이 호출된다", () => {
    const handleClick = vi.fn();
    const container = renderIntoDocument(
      <LoginSign onSignUpClick={handleClick} />,
    );
    const button = getByRole(container, "button", { name: "회원가입" });

    act(() => {
      fireEvent.click(button);
    });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("전달한 className이 루트 요소에 이어붙는다", () => {
    const container = renderIntoDocument(
      <LoginSign className="custom-login-sign-class" />,
    );
    const root = container.querySelector(
      '[data-login-sign="root"]',
    ) as HTMLElement;

    expect(root.getAttribute("class")).toContain("custom-login-sign-class");
  });
});
