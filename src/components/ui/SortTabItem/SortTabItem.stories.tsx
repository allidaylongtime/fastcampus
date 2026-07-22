import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { SortTabItem } from "./SortTabItem";

const FIGMA_FILE_URL =
  "https://www.figma.com/design/rR87YiUvJsp04GFlUL474X/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%A1%9C%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0";

/** state별 Figma 프레임 node-id (default 137:1758 / select 137:1760) */
const STATE_NODE_IDS = {
  default: "137-1758",
  select: "137-1760",
} as const;

function designUrlFor(state: keyof typeof STATE_NODE_IDS) {
  return `${FIGMA_FILE_URL}?node-id=${STATE_NODE_IDS[state]}`;
}

const meta = {
  title: "UI/SortTabItem",
  component: SortTabItem,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: `${FIGMA_FILE_URL}?node-id=137-1757`,
    },
  },
  args: {
    label: "최신글",
    onClick: fn(),
  },
  argTypes: {
    state: {
      control: "select",
      options: ["default", "select"],
    },
  },
} satisfies Meta<typeof SortTabItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { design: { type: "figma", url: designUrlFor("default") } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "최신글" });
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveAttribute("aria-pressed", "false");
    await expect(
      canvasElement.querySelector('svg[data-icon="check"]'),
    ).toBeNull();
  },
};

export const Select: Story = {
  name: "선택됨",
  args: { state: "select" },
  parameters: { design: { type: "figma", url: designUrlFor("select") } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "최신글" });
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(
      canvasElement.querySelector('svg[data-icon="check"]'),
    ).not.toBeNull();
  },
};

export const AllStates: Story = {
  name: "전체 상태 (default/select)",
  parameters: { design: { type: "figma", url: designUrlFor("default") } },
  render: (args) => (
    <div style={{ display: "flex", gap: "var(--spacing-16)" }}>
      <SortTabItem {...args} state="default" />
      <SortTabItem {...args} state="select" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const buttons = canvasElement.querySelectorAll("button");
    await expect(buttons.length).toBe(2);
  },
};

export const Disabled: Story = {
  name: "비활성화",
  args: { disabled: true },
  parameters: { design: { type: "figma", url: designUrlFor("default") } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "최신글" });
    await expect(button).toBeDisabled();
  },
};

export const Clickable: Story = {
  name: "클릭 인터랙션",
  parameters: { design: { type: "figma", url: designUrlFor("default") } },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "최신글" });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
