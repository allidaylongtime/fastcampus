import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { PostFilterHeader } from "./PostFilterHeader";

const FIGMA_FILE_URL =
  "https://www.figma.com/design/rR87YiUvJsp04GFlUL474X/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%A1%9C%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0";

const meta = {
  title: "UI/PostFilterHeader",
  component: PostFilterHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: `${FIGMA_FILE_URL}?node-id=764-2375`,
    },
  },
  args: {
    onWriteClick: fn(),
    onSearchChange: fn(),
    onSearchSubmit: fn(),
  },
  render: (args) => (
    <div style={{ width: 840, maxWidth: "100%" }}>
      <PostFilterHeader {...args} />
    </div>
  ),
} satisfies Meta<typeof PostFilterHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "기본값 (전체 게시글)",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "전체 게시글" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "글쓰기" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "최신글" }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(canvas.getByRole("searchbox")).toHaveAttribute(
      "placeholder",
      "제목, 내용, 작성자",
    );
  },
};

export const WriteButtonInteraction: Story = {
  name: "글쓰기 버튼 클릭",
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "글쓰기" }));
    await expect(args.onWriteClick).toHaveBeenCalledTimes(1);
  },
};

export const CustomTitle: Story = {
  name: "커스텀 title",
  args: { title: "내가 쓴 글" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "내가 쓴 글" }),
    ).toBeInTheDocument();
  },
};

export const CustomSortTabs: Story = {
  name: "커스텀 정렬 탭 (3개) + 검색 placeholder",
  args: {
    sortTabs: [
      { label: "최신글", selected: true },
      { label: "인기글" },
      { label: "댓글순" },
    ],
    searchPlaceholder: "댓글 검색",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("button", { name: "댓글순" }),
    ).toBeInTheDocument();
    await expect(canvas.getByRole("searchbox")).toHaveAttribute(
      "placeholder",
      "댓글 검색",
    );
  },
};

export const SearchInteraction: Story = {
  name: "검색 입력 인터랙션",
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("searchbox");
    await userEvent.type(input, "리액트{enter}");
    await expect(args.onSearchChange).toHaveBeenCalled();
    await expect(args.onSearchSubmit).toHaveBeenCalled();
  },
};
