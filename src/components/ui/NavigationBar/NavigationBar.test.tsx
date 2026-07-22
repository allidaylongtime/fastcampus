import { act } from "react";
import { createRoot } from "react-dom/client";
import { getByRole, getAllByRole } from "@testing-library/dom";
import { describe, expect, it, vi } from "vitest";
import { NavigationBar, type NavigationBarCategoryItem } from "./NavigationBar";

function renderIntoDocument(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

const categories: NavigationBarCategoryItem[] = [
  { label: "커뮤니티", selected: true },
  { label: "채용", selected: false },
];

describe("NavigationBar", () => {
  it("categories 배열을 Category로 렌더링한다", () => {
    const container = renderIntoDocument(
      <NavigationBar categories={categories} />,
    );
    const buttons = getAllByRole(container, "button");
    // 카테고리 2개 + 로그인 버튼 1개
    expect(buttons.length).toBe(3);
    expect(buttons[0].textContent).toBe("커뮤니티");
    expect(buttons[0].getAttribute("aria-pressed")).toBe("true");
    expect(buttons[1].textContent).toBe("채용");
    expect(buttons[1].getAttribute("aria-pressed")).toBe("false");
  });

  it("기본 상태(login)에서는 로그인 버튼을 렌더링한다", () => {
    const container = renderIntoDocument(
      <NavigationBar categories={categories} />,
    );
    const button = getByRole(container, "button", { name: "로그인" });

    expect(button).toBeTruthy();
  });

  it("state='logout'이면 로그아웃 버튼을 렌더링한다", () => {
    const container = renderIntoDocument(
      <NavigationBar categories={categories} state="logout" />,
    );
    const button = getByRole(container, "button", { name: "로그아웃" });

    expect(button).toBeTruthy();
  });

  it("로그인/로그아웃 버튼 클릭 시 onAuthClick이 호출된다", () => {
    const handleAuthClick = vi.fn();
    const container = renderIntoDocument(
      <NavigationBar categories={categories} onAuthClick={handleAuthClick} />,
    );
    const button = getByRole(container, "button", {
      name: "로그인",
    }) as HTMLButtonElement;
    button.click();

    expect(handleAuthClick).toHaveBeenCalledTimes(1);
  });

  it("개별 카테고리 클릭 시 해당 onClick만 호출된다", () => {
    const handleFirst = vi.fn();
    const handleSecond = vi.fn();
    const container = renderIntoDocument(
      <NavigationBar
        categories={[
          { label: "커뮤니티", selected: true, onClick: handleFirst },
          { label: "채용", selected: false, onClick: handleSecond },
        ]}
      />,
    );
    const secondButton = getByRole(container, "button", {
      name: "채용",
    }) as HTMLButtonElement;
    secondButton.click();

    expect(handleFirst).not.toHaveBeenCalled();
    expect(handleSecond).toHaveBeenCalledTimes(1);
  });

  it("하단 보더는 --color-background-muted 토큰을 사용한다", () => {
    const container = renderIntoDocument(
      <NavigationBar categories={categories} />,
    );
    const nav = container.querySelector("nav") as HTMLElement;

    expect(nav.style.borderBottom).toBe(
      "var(--border-width-1) solid var(--color-background-muted)",
    );
  });

  it("전달한 className이 기존 클래스에 이어붙는다", () => {
    const container = renderIntoDocument(
      <NavigationBar categories={categories} className="custom-nav-class" />,
    );
    const nav = container.querySelector("nav");

    expect(nav?.getAttribute("class")).toContain("custom-nav-class");
    expect(nav?.getAttribute("class")).toContain("max-w-[1280px]");
  });
});
