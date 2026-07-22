import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { NavigationBar, type NavigationBarCategoryItem } from "./NavigationBar";

const FIGMA_FILE_URL =
  "https://www.figma.com/design/rR87YiUvJsp04GFlUL474X/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%A1%9C%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0";

/** 로그인/로그아웃 상태별 Figma 프레임 node-id */
const STATE_NODE_IDS = {
  login: "764-2274",
  logout: "783-2798",
} as const;

function designUrlFor(state: keyof typeof STATE_NODE_IDS) {
  return `${FIGMA_FILE_URL}?node-id=${STATE_NODE_IDS[state]}`;
}

const SAMPLE_CATEGORIES: NavigationBarCategoryItem[] = [
  { label: "커뮤니티", selected: true },
  { label: "채용", selected: false },
  { label: "스터디", selected: false },
];

const meta = {
  title: "UI/NavigationBar",
  component: NavigationBar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: `${FIGMA_FILE_URL}?node-id=783-2797`,
    },
  },
  args: {
    categories: SAMPLE_CATEGORIES,
    onAuthClick: fn(),
  },
  argTypes: {
    state: {
      control: "select",
      options: ["login", "logout"],
    },
  },
} satisfies Meta<typeof NavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  name: "로그인 상태",
  args: { state: "login" },
  parameters: { design: { type: "figma", url: designUrlFor("login") } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("navigation")).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "로그인" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "커뮤니티" }),
    ).toHaveAttribute("aria-pressed", "true");
  },
};

export const LoggedOut: Story = {
  name: "로그아웃 상태",
  args: { state: "logout" },
  parameters: { design: { type: "figma", url: designUrlFor("logout") } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("button", { name: "로그아웃" }),
    ).toBeInTheDocument();
  },
};

export const ManyCategories: Story = {
  name: "카테고리 다수 (가로 스크롤)",
  args: {
    categories: [
      { label: "커뮤니티", selected: true },
      { label: "채용" },
      { label: "스터디" },
      { label: "이벤트" },
      { label: "공지사항" },
      { label: "프로젝트" },
      { label: "멘토링" },
    ],
  },
  parameters: { design: { type: "figma", url: designUrlFor("login") } },
  play: async ({ canvasElement }) => {
    const buttons = canvasElement.querySelectorAll(
      '[aria-label="주요 카테고리"] button',
    );
    // 카테고리 7개 + 로그인 버튼 1개
    await expect(buttons.length).toBe(8);
  },
};

export const CategoryClick: Story = {
  name: "카테고리 클릭 인터랙션",
  args: {
    categories: [
      { label: "커뮤니티", selected: true, onClick: fn() },
      { label: "채용", selected: false, onClick: fn() },
    ],
  },
  parameters: { design: { type: "figma", url: designUrlFor("login") } },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const target = canvas.getByRole("button", { name: "채용" });
    await userEvent.click(target);
    await expect(args.categories[1].onClick).toHaveBeenCalledTimes(1);
  },
};
