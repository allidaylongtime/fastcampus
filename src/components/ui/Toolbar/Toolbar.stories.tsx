import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Toolbar, type ToolbarSortTab } from "./Toolbar";

const FIGMA_FILE_URL =
  "https://www.figma.com/design/rR87YiUvJsp04GFlUL474X/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%A1%9C%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0";

const SAMPLE_SORT_TABS: ToolbarSortTab[] = [
  { label: "최신글", selected: true },
  { label: "인기글", selected: false },
];

const meta = {
  title: "UI/Toolbar",
  component: Toolbar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: `${FIGMA_FILE_URL}?node-id=137-1356`,
    },
  },
  args: {
    sortTabs: SAMPLE_SORT_TABS,
    onSearchChange: fn(),
    onSearchSubmit: fn(),
  },
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("button", { name: "최신글" }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(
      canvas.getByRole("button", { name: "인기글" }),
    ).toHaveAttribute("aria-pressed", "false");
    await expect(
      canvas.getByPlaceholderText("제목, 내용, 작성자"),
    ).toBeInTheDocument();
  },
};

export const ThreeSortTabs: Story = {
  name: "정렬 탭 3개",
  args: {
    sortTabs: [
      { label: "최신글", selected: true },
      { label: "인기글" },
      { label: "댓글순" },
    ],
  },
  play: async ({ canvasElement }) => {
    const separators = canvasElement.querySelectorAll(
      '[role="separator"][aria-orientation="vertical"]',
    );
    // 탭 3개 사이에 구분선 2개
    await expect(separators.length).toBe(2);
  },
};

export const SortTabClick: Story = {
  name: "정렬 탭 클릭 인터랙션",
  args: {
    sortTabs: [
      { label: "최신글", selected: true, onClick: fn() },
      { label: "인기글", selected: false, onClick: fn() },
    ],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const target = canvas.getByRole("button", { name: "인기글" });
    await userEvent.click(target);
    await expect(args.sortTabs[1].onClick).toHaveBeenCalledTimes(1);
  },
};

export const SingleTab: Story = {
  name: "정렬 탭 1개 (구분선 없음)",
  args: {
    sortTabs: [{ label: "최신글", selected: true }],
  },
  play: async ({ canvasElement }) => {
    const separators = canvasElement.querySelectorAll(
      '[role="separator"][aria-orientation="vertical"]',
    );
    await expect(separators.length).toBe(0);
  },
};

export const EmptyTabs: Story = {
  name: "정렬 탭 없음",
  args: {
    sortTabs: [],
  },
  play: async ({ canvasElement }) => {
    const buttons = canvasElement.querySelectorAll("button");
    await expect(buttons.length).toBe(0);
    const searchbox =
      within(canvasElement).getByPlaceholderText("제목, 내용, 작성자");
    await expect(searchbox).toBeInTheDocument();
  },
};

export const SearchInteraction: Story = {
  name: "검색 인터랙션",
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("제목, 내용, 작성자");
    await userEvent.type(input, "리액트{enter}");
    await expect(args.onSearchChange).toHaveBeenCalled();
    await expect(args.onSearchSubmit).toHaveBeenCalled();
  },
};
