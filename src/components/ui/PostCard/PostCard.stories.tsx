import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { PostCard } from "./PostCard";

const FIGMA_FILE_URL =
  "https://www.figma.com/design/rR87YiUvJsp04GFlUL474X/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%A1%9C%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0";

const DEFAULT_PREVIEW =
  "피그마피디아(Figmapedia)는 Figma 중심의 디자인 지식, 템플릿, 프로세스, 그리고 AI 기반 워크플로우를 체계적으로 정리•아카이빙하는 크리에이티브 지식 플랫폼입니다.";

const meta = {
  title: "UI/PostCard",
  component: PostCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: `${FIGMA_FILE_URL}?node-id=137-1364`,
    },
  },
  args: {
    title: "피그마 커뮤니티는 역시 피그마피디아",
    preview: DEFAULT_PREVIEW,
    timeAgo: "1분 전",
    chips: [
      { label: "공지사항", type: "notice" },
      { label: "디자인", type: "category" },
    ],
    showThum: true,
    thumbnailType: 1,
    viewCount: 0,
    likeCount: 0,
  },
  argTypes: {
    thumbnailType: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6],
    },
  },
} satisfies Meta<typeof PostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "기본 (공지+카테고리 칩, 썸네일 있음)",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = await canvas.findByText(
      "피그마 커뮤니티는 역시 피그마피디아",
    );
    await expect(title).toBeInTheDocument();

    const img = canvas.getByRole("img");
    await expect(img).toHaveAttribute("data-post-card-image", "1");

    const chips = canvasElement.querySelectorAll("[data-icon]");
    // Chip 2개(공지/카테고리) + PostCardStats 아이콘 3개(조회/좋아요/북마크) = 5개
    await expect(chips.length).toBe(5);
  },
};

export const ThumbnailVariant: Story = {
  name: "썸네일 종류 변경 (thumbnailType=3)",
  args: { thumbnailType: 3 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const img = canvas.getByRole("img");
    await expect(img).toHaveAttribute("data-post-card-image", "3");
  },
};

export const NoThumbnail: Story = {
  name: "showThum=false (썸네일 없음)",
  args: { showThum: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole("img")).not.toBeInTheDocument();
  },
};

export const SingleCategoryChip: Story = {
  name: "카테고리 칩 1개만",
  args: {
    chips: [{ label: "디자인", type: "category" }],
  },
  play: async ({ canvasElement }) => {
    const chipArea = canvasElement.querySelector("[data-post-card-chip-area]");
    await expect(chipArea?.querySelectorAll("[data-icon]").length).toBe(1);
  },
};

export const NoChips: Story = {
  name: "칩 없음",
  args: { chips: [] },
  play: async ({ canvasElement }) => {
    const chipArea = canvasElement.querySelector("[data-post-card-chip-area]");
    await expect(chipArea).toBeNull();
  },
};

export const WithStats: Story = {
  name: "조회수/좋아요수 있음",
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
