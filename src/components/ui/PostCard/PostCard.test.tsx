import { act } from "react";
import { createRoot } from "react-dom/client";
import { getByText, queryByRole } from "@testing-library/dom";
import { describe, expect, it } from "vitest";
import { PostCard } from "./PostCard";

function renderIntoDocument(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

const baseProps = {
  title: "테스트 제목",
  preview: "테스트 미리보기 텍스트입니다.",
  timeAgo: "3시간 전",
};

describe("PostCard", () => {
  it("title/preview/timeAgo를 그대로 렌더링한다", () => {
    const container = renderIntoDocument(<PostCard {...baseProps} />);

    expect(getByText(container, "테스트 제목")).not.toBeNull();
    expect(
      getByText(container, "테스트 미리보기 텍스트입니다."),
    ).not.toBeNull();
    expect(getByText(container, "3시간 전")).not.toBeNull();
  });

  it("showThum 기본값(true)이면 PostCardImage가 렌더링된다", () => {
    const container = renderIntoDocument(
      <PostCard {...baseProps} thumbnailType={2} />,
    );
    const img = queryByRole(container, "img");

    expect(img).not.toBeNull();
    expect(img?.getAttribute("data-post-card-image")).toBe("2");
  });

  it("showThum=false면 PostCardImage가 렌더링되지 않는다", () => {
    const container = renderIntoDocument(
      <PostCard {...baseProps} showThum={false} />,
    );

    expect(queryByRole(container, "img")).toBeNull();
  });

  it("chips 배열을 전달하면 각 항목이 Chip으로 렌더링된다", () => {
    const container = renderIntoDocument(
      <PostCard
        {...baseProps}
        chips={[
          { label: "공지사항", type: "notice" },
          { label: "디자인", type: "category" },
        ]}
      />,
    );

    expect(getByText(container, "공지사항")).not.toBeNull();
    expect(getByText(container, "디자인")).not.toBeNull();
  });

  it("chips를 생략하거나 빈 배열이면 ChipArea가 렌더링되지 않는다", () => {
    const container = renderIntoDocument(<PostCard {...baseProps} />);

    expect(container.querySelector("[data-post-card-chip-area]")).toBeNull();
  });

  it("viewCount/likeCount가 PostCardStats에 전달된다", () => {
    const container = renderIntoDocument(
      <PostCard {...baseProps} viewCount={128} likeCount={42} />,
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

  it("viewCount/likeCount 기본값은 0이다", () => {
    const container = renderIntoDocument(<PostCard {...baseProps} />);

    expect(
      container.querySelector('[data-post-card-stats="view"] span')
        ?.textContent,
    ).toBe("0");
    expect(
      container.querySelector('[data-post-card-stats="like"] span')
        ?.textContent,
    ).toBe("0");
  });

  it("thumbnailAlt를 생략하면 title 기반 기본 alt가 생성된다", () => {
    const container = renderIntoDocument(<PostCard {...baseProps} />);
    const img = queryByRole(container, "img");

    expect(img?.getAttribute("alt")).toBe("테스트 제목 썸네일 이미지");
  });

  it("루트 요소는 840px 고정 width와 spacing 토큰을 사용한다", () => {
    const container = renderIntoDocument(<PostCard {...baseProps} />);
    const root = container.querySelector(
      '[data-post-card="root"]',
    ) as HTMLElement;

    expect(root.style.width).toBe("840px");
    expect(root.style.gap).toBe("var(--spacing-12)");
    expect(root.style.paddingTop).toBe("var(--spacing-24)");
    expect(root.style.paddingBottom).toBe("var(--spacing-24)");
  });

  it("전달한 className이 기존 클래스에 이어붙는다", () => {
    const container = renderIntoDocument(
      <PostCard {...baseProps} className="custom-post-card" />,
    );
    const root = container.querySelector(
      '[data-post-card="root"]',
    ) as HTMLElement;

    expect(root.getAttribute("class")).toContain("custom-post-card");
    expect(root.getAttribute("class")).toContain("shrink-0");
  });
});
