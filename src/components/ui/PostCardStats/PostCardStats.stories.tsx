import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { PostCardStats } from "./PostCardStats";

const FIGMA_FILE_URL =
  "https://www.figma.com/design/rR87YiUvJsp04GFlUL474X/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%A1%9C%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0";

const meta = {
  title: "UI/PostCardStats",
  component: PostCardStats,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: `${FIGMA_FILE_URL}?node-id=783-2846`,
    },
  },
  args: {
    viewCount: 0,
    likeCount: 0,
    onBookmarkClick: fn(),
  },
} satisfies Meta<typeof PostCardStats>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "기본값 (0/0)",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const view = canvas.getByText("0", {
      selector: '[data-post-card-stats="view"] span',
    });
    const like = canvas.getByText("0", {
      selector: '[data-post-card-stats="like"] span',
    });
    await expect(view).toBeInTheDocument();
    await expect(like).toBeInTheDocument();
  },
};

export const WithCounts: Story = {
  name: "조회수/좋아요수 값 있음",
  args: { viewCount: 128, likeCount: 42 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("128", {
        selector: '[data-post-card-stats="view"] span',
      }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByText("42", {
        selector: '[data-post-card-stats="like"] span',
      }),
    ).toBeInTheDocument();
  },
};

export const LargeCounts: Story = {
  name: "큰 숫자",
  args: { viewCount: 12345, likeCount: 9876 },
};

export const Liked: Story = {
  name: "좋아요 상태 (liked)",
  args: { viewCount: 56654, likeCount: 99999, liked: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const likeIcon = canvasElement.querySelector(
      '[data-post-card-stats="like"] [data-icon]',
    );
    await expect(likeIcon?.getAttribute("data-icon")).toBe("heart_fill");
    await expect(
      canvas.getByText("99,999", {
        selector: '[data-post-card-stats="like"] span',
      }),
    ).toBeInTheDocument();
  },
};

export const Bookmarked: Story = {
  name: "북마크 활성 상태",
  args: { viewCount: 56654, likeCount: 99999, liked: true, bookmarked: true },
  play: async ({ canvasElement }) => {
    const bookmarkIcon = canvasElement.querySelector(
      '[data-post-card-stats="bookmark"] [data-icon]',
    );
    await expect(bookmarkIcon?.getAttribute("data-icon")).toBe("bookmark_fill");
  },
};

export const BookmarkToggle: Story = {
  name: "북마크 클릭 시 onBookmarkClick 호출",
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const bookmarkButton = canvas.getByRole("button", { name: "북마크" });

    await userEvent.click(bookmarkButton);

    await expect(args.onBookmarkClick).toHaveBeenCalledTimes(1);
  },
};
