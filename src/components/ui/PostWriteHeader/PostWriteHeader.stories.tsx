import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { PostWriteHeader } from "./PostWriteHeader";

const FIGMA_FILE_URL =
  "https://www.figma.com/design/rR87YiUvJsp04GFlUL474X/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%A1%9C%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0";

const meta = {
  title: "UI/PostWriteHeader",
  component: PostWriteHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: `${FIGMA_FILE_URL}?node-id=764-2338`,
    },
  },
  render: (args) => (
    <div style={{ width: 840, maxWidth: "100%" }}>
      <PostWriteHeader {...args} />
    </div>
  ),
} satisfies Meta<typeof PostWriteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "기본값 (게시글 쓰기)",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "게시글 쓰기" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByText("건전한 커뮤니티를 위해 바른말 고운말을 씁시다."),
    ).toBeInTheDocument();
  },
};

export const CustomText: Story = {
  name: "커스텀 title/description",
  args: {
    title: "게시글 수정",
    description: "수정 사항을 정확히 반영해주세요.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "게시글 수정" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByText("수정 사항을 정확히 반영해주세요."),
    ).toBeInTheDocument();
  },
};
