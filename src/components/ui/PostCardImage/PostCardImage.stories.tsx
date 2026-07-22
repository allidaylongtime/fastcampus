import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { PostCardImage, type PostCardImageType } from "./PostCardImage";

const FIGMA_FILE_URL =
  "https://www.figma.com/design/rR87YiUvJsp04GFlUL474X/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%A1%9C%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0";

/** `type` variant → Figma 개별 인스턴스 node-id (node-id 쿼리 형식) */
const POST_CARD_IMAGE_NODE_IDS: Record<PostCardImageType, string> = {
  1: "781-5205",
  2: "783-7869",
  3: "783-7870",
  4: "783-7871",
  5: "783-7872",
  6: "783-7873",
};

function designUrlFor(type: PostCardImageType) {
  return `${FIGMA_FILE_URL}?node-id=${POST_CARD_IMAGE_NODE_IDS[type]}`;
}

const meta = {
  title: "UI/PostCardImage",
  component: PostCardImage,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      // PostCardImage 프레임(type variant 783:7868 포함) — node-id 783-7868
      url: `${FIGMA_FILE_URL}?node-id=783-7868`,
    },
  },
  args: {
    alt: "게시글 썸네일 이미지",
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6],
    },
  },
} satisfies Meta<typeof PostCardImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Type1: Story = {
  args: { type: 1 },
  parameters: { design: { type: "figma", url: designUrlFor(1) } },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const img = canvas.getByRole("img");
    await expect(img).toBeInTheDocument();
    await expect(img).toHaveAttribute("alt", args.alt);
    await expect(img).toHaveAttribute("width", "160");
    await expect(img).toHaveAttribute("height", "102");
    await expect(img).toHaveAttribute("data-post-card-image", "1");
  },
};

export const Type2: Story = {
  args: { type: 2 },
  parameters: { design: { type: "figma", url: designUrlFor(2) } },
};

export const Type3: Story = {
  args: { type: 3 },
  parameters: { design: { type: "figma", url: designUrlFor(3) } },
};

export const Type4: Story = {
  args: { type: 4 },
  parameters: { design: { type: "figma", url: designUrlFor(4) } },
};

export const Type5: Story = {
  args: { type: 5 },
  parameters: { design: { type: "figma", url: designUrlFor(5) } },
};

export const Type6: Story = {
  args: { type: 6 },
  parameters: { design: { type: "figma", url: designUrlFor(6) } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const img = canvas.getByRole("img");
    await expect(img).toHaveAttribute("data-post-card-image", "6");
  },
};

export const AllTypes: Story = {
  name: "전체 썸네일 (6종)",
  args: { type: 1 },
  parameters: {
    design: { type: "figma", url: `${FIGMA_FILE_URL}?node-id=783-7868` },
  },
  render: (args) => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--spacing-16)",
      }}
    >
      {([1, 2, 3, 4, 5, 6] as const).map((type) => (
        <PostCardImage key={type} {...args} type={type} />
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const imgs = canvasElement.querySelectorAll("img");
    await expect(imgs.length).toBe(6);
  },
};
