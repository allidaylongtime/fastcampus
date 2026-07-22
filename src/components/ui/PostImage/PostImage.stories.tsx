import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { PostImage, type PostImageType } from "./PostImage";

const FIGMA_FILE_URL =
  "https://www.figma.com/design/rR87YiUvJsp04GFlUL474X/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%A1%9C%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0";

/** `type` variant → Figma 개별 인스턴스 node-id (node-id 쿼리 형식) */
const POST_IMAGE_NODE_IDS: Record<PostImageType, string> = {
  1: "781-5252",
  2: "781-5251",
  3: "781-5256",
  4: "781-5266",
  5: "781-5267",
  6: "781-5285",
};

function designUrlFor(type: PostImageType) {
  return `${FIGMA_FILE_URL}?node-id=${POST_IMAGE_NODE_IDS[type]}`;
}

const meta = {
  title: "UI/PostImage",
  component: PostImage,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      // PostImage 프레임(type variant 781:5253 포함) — node-id 781-5253
      url: `${FIGMA_FILE_URL}?node-id=781-5253`,
    },
  },
  args: {
    alt: "게시글 상세 이미지",
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6],
    },
  },
} satisfies Meta<typeof PostImage>;

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
    await expect(img).toHaveAttribute("width", "500");
    await expect(img).toHaveAttribute("height", "319");
    await expect(img).toHaveAttribute("data-post-image", "1");
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
    await expect(img).toHaveAttribute("data-post-image", "6");
  },
};

export const AllTypes: Story = {
  name: "전체 확대 이미지 (6종)",
  args: { type: 1 },
  parameters: {
    design: { type: "figma", url: `${FIGMA_FILE_URL}?node-id=781-5253` },
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
        <PostImage key={type} {...args} type={type} />
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const imgs = canvasElement.querySelectorAll("img");
    await expect(imgs.length).toBe(6);
  },
};
