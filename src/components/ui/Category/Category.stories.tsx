import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Category } from "./Category";

const FIGMA_FILE_URL =
  "https://www.figma.com/design/rR87YiUvJsp04GFlUL474X/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%A1%9C%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0";

/** state별 Figma 프레임 node-id (default 764:2187 / selected 764:2189) */
const STATE_NODE_IDS = {
  default: "764-2187",
  selected: "764-2189",
} as const;

function designUrlFor(state: keyof typeof STATE_NODE_IDS) {
  return `${FIGMA_FILE_URL}?node-id=${STATE_NODE_IDS[state]}`;
}

const meta = {
  title: "UI/Category",
  component: Category,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: `${FIGMA_FILE_URL}?node-id=764-2186`,
    },
  },
  args: {
    label: "커뮤니티",
    onClick: fn(),
  },
  argTypes: {
    state: {
      control: "select",
      options: ["default", "selected"],
    },
  },
} satisfies Meta<typeof Category>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { design: { type: "figma", url: designUrlFor("default") } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "커뮤니티" });
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveAttribute("aria-pressed", "false");
    await expect(button.style.color).toBe("var(--color-text-disabled)");
    await expect(button.style.borderBottom).toBe("0px solid transparent");
  },
};

export const Selected: Story = {
  name: "선택됨",
  args: { state: "selected" },
  parameters: { design: { type: "figma", url: designUrlFor("selected") } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "커뮤니티" });
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(button.style.color).toBe("var(--color-text-primary)");
    await expect(button.style.borderBottom).toBe(
      "var(--spacing-4) solid var(--color-interactive-primary)",
    );
  },
};

export const AllStates: Story = {
  name: "전체 상태 (default/selected)",
  parameters: { design: { type: "figma", url: designUrlFor("default") } },
  render: (args) => (
    <div style={{ display: "flex", gap: "var(--spacing-16)" }}>
      <Category {...args} state="default" />
      <Category {...args} state="selected" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const buttons = canvasElement.querySelectorAll("button");
    await expect(buttons.length).toBe(2);
  },
};

export const Clickable: Story = {
  name: "클릭 인터랙션",
  parameters: { design: { type: "figma", url: designUrlFor("default") } },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "커뮤니티" });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
