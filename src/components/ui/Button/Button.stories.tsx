import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Button, type ButtonSize, type ButtonVariant } from "./Button";

const FIGMA_FILE_URL =
  "https://www.figma.com/design/rR87YiUvJsp04GFlUL474X/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%A1%9C%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0";

/** size별 Figma 프레임 node-id (ButtonLarge / ButtonMedium / ButtonSmall) */
const SIZE_NODE_IDS: Record<ButtonSize, string> = {
  large: "137-1497",
  medium: "137-1384",
  small: "137-1610",
};

const VARIANTS: ButtonVariant[] = [
  "core",
  "core-light",
  "mono",
  "mono-light",
  "outline",
  "warning",
  "warning-light",
];

function designUrlFor(size: ButtonSize) {
  return `${FIGMA_FILE_URL}?node-id=${SIZE_NODE_IDS[size]}`;
}

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: `${FIGMA_FILE_URL}?node-id=781-5374`,
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: VARIANTS,
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "버튼" },
  parameters: { design: { type: "figma", url: designUrlFor("medium") } },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector("button");
    await expect(button).toBeTruthy();
    await expect(button?.style.backgroundColor).toBe(
      "var(--color-button-core-bg)",
    );
    await expect(button?.style.color).toBe("var(--color-button-core-text)");
  },
};

export const AllVariants: Story = {
  name: "전체 색상 variant (7종)",
  args: { children: "버튼" },
  parameters: { design: { type: "figma", url: designUrlFor("medium") } },
  render: (args) => (
    <div
      style={{ display: "flex", gap: "var(--spacing-12)", flexWrap: "wrap" }}
    >
      {VARIANTS.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const buttons = canvasElement.querySelectorAll("button");
    await expect(buttons.length).toBe(VARIANTS.length);
  },
};

export const Sizes: Story = {
  name: "크기 (Large/Medium/Small)",
  args: { children: "버튼" },
  parameters: { design: { type: "figma", url: designUrlFor("large") } },
  render: (args) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--spacing-12)",
      }}
    >
      <Button {...args} size="large">
        Large
      </Button>
      <Button {...args} size="medium">
        Medium
      </Button>
      <Button {...args} size="small">
        Small
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const buttons = canvasElement.querySelectorAll("button");
    await expect(buttons[0]?.style.padding).toBe(
      "var(--spacing-16) var(--spacing-24)",
    );
    await expect(buttons[1]?.style.padding).toBe(
      "var(--spacing-12) var(--spacing-16)",
    );
    await expect(buttons[2]?.style.padding).toBe(
      "var(--spacing-8) var(--spacing-12)",
    );
  },
};

export const WithLeadingIcon: Story = {
  name: "리딩 아이콘 포함",
  args: { children: "검색", icon: "search" },
  parameters: { design: { type: "figma", url: designUrlFor("medium") } },
  play: async ({ canvasElement }) => {
    const icon = canvasElement.querySelector('svg[data-icon="search"]');
    await expect(icon).toBeTruthy();
  },
};

export const IconOnly: Story = {
  name: "아이콘 전용 (정사각형)",
  args: { icon: "search", "aria-label": "검색", size: "large" },
  parameters: { design: { type: "figma", url: designUrlFor("large") } },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector("button");
    await expect(button).toHaveAttribute("aria-label", "검색");
    // 대칭 padding(--spacing-16) + 아이콘 24px = 56px 정사각형이 하드코딩 없이 나옵니다.
    await expect(button?.style.padding).toBe("var(--spacing-16)");
    const icon = canvasElement.querySelector('svg[data-icon="search"]');
    await expect(icon).toHaveAttribute("width", "24");
  },
};

export const Outline: Story = {
  args: { children: "버튼", variant: "outline" },
  parameters: { design: { type: "figma", url: designUrlFor("medium") } },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector("button");
    await expect(button?.style.border).toBe(
      "var(--border-width-1) solid var(--color-button-outline-border)",
    );
  },
};

export const Disabled: Story = {
  args: { children: "버튼", disabled: true },
  parameters: { design: { type: "figma", url: designUrlFor("medium") } },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector("button");
    await expect(button).toBeDisabled();
  },
};
