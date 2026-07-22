import { act } from "react";
import { createRoot } from "react-dom/client";
import { getByText } from "@testing-library/dom";
import { describe, expect, it, vi } from "vitest";
import { PostCardStats } from "./PostCardStats";

function renderIntoDocument(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

describe("PostCardStats", () => {
  it("기본값(0/0)으로 렌더링한다", () => {
    const container = renderIntoDocument(<PostCardStats />);

    expect(
      container.querySelector('[data-post-card-stats="view"] span')
        ?.textContent,
    ).toBe("0");
    expect(
      container.querySelector('[data-post-card-stats="like"] span')
        ?.textContent,
    ).toBe("0");
  });

  it("전달한 viewCount/likeCount가 그대로 렌더링된다", () => {
    const container = renderIntoDocument(
      <PostCardStats viewCount={128} likeCount={42} />,
    );

    expect(
      container.querySelector('[data-post-card-stats="view"] span')
        ?.textContent,
    ).toBe("128");
    expect(
      container.querySelector('[data-post-card-stats="like"] span')
        ?.textContent,
    ).toBe("42");
  });

  it("eye-on 아이콘과 heart_empty(outline) 아이콘을 사용한다", () => {
    const container = renderIntoDocument(<PostCardStats />);

    const viewIcon = container.querySelector(
      '[data-post-card-stats="view"] [data-icon]',
    );
    const likeIcon = container.querySelector(
      '[data-post-card-stats="like"] [data-icon]',
    );

    expect(viewIcon?.getAttribute("data-icon")).toBe("eye-on");
    expect(likeIcon?.getAttribute("data-icon")).toBe("heart_empty");
  });

  it("liked=true면 heart_fill 아이콘과 danger 색상 클래스를 사용한다", () => {
    const container = renderIntoDocument(<PostCardStats liked />);

    const likeIcon = container.querySelector(
      '[data-post-card-stats="like"] [data-icon]',
    );

    expect(likeIcon?.getAttribute("data-icon")).toBe("heart_fill");
    expect(likeIcon?.getAttribute("class")).toContain(
      "text-[color:var(--color-text-danger)]",
    );
  });

  it("루트 gap과 통계 영역 색상은 토큰을 사용한다", () => {
    const container = renderIntoDocument(<PostCardStats />);
    const root = container.firstElementChild as HTMLElement;
    const viewArea = container.querySelector(
      '[data-post-card-stats="view"]',
    ) as HTMLElement;

    expect(root.style.gap).toBe("var(--spacing-24)");
    expect(viewArea.style.gap).toBe("var(--spacing-8)");
    expect(viewArea.style.color).toBe("var(--color-text-tertiary)");
  });

  it("전달한 className이 기존 클래스에 이어붙는다", () => {
    const container = renderIntoDocument(
      <PostCardStats className="custom-post-card-stats" />,
    );
    const root = container.firstElementChild as HTMLElement;

    expect(root.getAttribute("class")).toContain("custom-post-card-stats");
    expect(root.getAttribute("class")).toContain("shrink-0");
  });

  it("텍스트에 caption/lg/medium 타이포그래피 토큰을 사용한다", () => {
    const container = renderIntoDocument(<PostCardStats viewCount={5} />);
    const label = getByText(container, "5");
    const viewArea = label.parentElement as HTMLElement;

    expect(viewArea.style.fontSize).toBe(
      "var(--typography-caption-lg-medium-font-size)",
    );
    expect(viewArea.style.lineHeight).toBe(
      "var(--typography-caption-lg-medium-line-height)",
    );
  });

  it("세 번째 영역에 bookmark_empty 아이콘의 BookmarkButton을 렌더링한다 (기본값)", () => {
    const container = renderIntoDocument(<PostCardStats />);
    const bookmarkArea = container.querySelector(
      '[data-post-card-stats="bookmark"]',
    ) as HTMLElement;
    const button = bookmarkArea.querySelector("button");

    expect(button?.getAttribute("data-bookmark-button")).toBe("default");
    expect(
      button?.querySelector("[data-icon]")?.getAttribute("data-icon"),
    ).toBe("bookmark_empty");
  });

  it("bookmarked=true면 bookmark_fill 아이콘을 렌더링한다", () => {
    const container = renderIntoDocument(<PostCardStats bookmarked />);
    const button = container.querySelector(
      '[data-post-card-stats="bookmark"] button',
    );

    expect(button?.getAttribute("data-bookmark-button")).toBe("filled");
    expect(
      button?.querySelector("[data-icon]")?.getAttribute("data-icon"),
    ).toBe("bookmark_fill");
  });

  it("북마크 버튼 클릭 시 onBookmarkClick이 호출된다", () => {
    const handleClick = vi.fn();
    const container = renderIntoDocument(
      <PostCardStats onBookmarkClick={handleClick} />,
    );
    const button = container.querySelector(
      '[data-post-card-stats="bookmark"] button',
    ) as HTMLButtonElement;

    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
