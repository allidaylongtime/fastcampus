import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Chip } from "./Chip";

const FIGMA_FILE_URL =
  "https://www.figma.com/design/rR87YiUvJsp04GFlUL474X/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%A1%9C%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0";

/** type별 Figma 프레임 node-id (category 137:1756 / notice 137:1755) */
const TYPE_NODE_IDS = {
  category: "137-1756",
  notice: "137-1755",
} as const;

function designUrlFor(type: keyof typeof TYPE_NODE_IDS) {
  return `${FIGMA_FILE_URL}?node-id=${TYPE_NODE_IDS[type]}`;
}

const meta = {
  title: "UI/Chip",
  component: Chip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: `${FIGMA_FILE_URL}?node-id=137-1763`,
    },
  },
  args: {
    label: "Label",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["category", "notice"],
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Category: Story = {
  name: "카테고리",
  parameters: { design: { type: "figma", url: designUrlFor("category") } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = await canvas.findByText("Label");
    const chip = label.parentElement as HTMLElement;
    await expect(chip).toBeInTheDocument();
    await expect(chip.style.backgroundColor).toBe(
      "var(--color-background-muted)",
    );
    await expect(chip.style.color).toBe("var(--color-content-strong)");
  },
};

export const Notice: Story = {
  name: "공지사항",
  args: { type: "notice" },
  parameters: { design: { type: "figma", url: designUrlFor("notice") } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = await canvas.findByText("Label");
    const chip = label.parentElement as HTMLElement;
    await expect(chip.style.backgroundColor).toBe(
      "var(--color-background-danger)",
    );
    await expect(chip.style.color).toBe("var(--color-text-danger)");
  },
};

export const IconOverride: Story = {
  name: "아이콘 override (icon prop)",
  parameters: { design: { type: "figma", url: designUrlFor("notice") } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-8)" }}>
      <Chip label="튜토리얼" type="notice" icon="pencil" />
      <Chip label="AI" type="category" icon="ai" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tutorial = await canvas.findByText("튜토리얼");
    const ai = await canvas.findByText("AI");
    await expect(
      (tutorial.parentElement as HTMLElement).querySelector(
        '[data-icon="pencil"]',
      ),
    ).toBeInTheDocument();
    await expect(
      (ai.parentElement as HTMLElement).querySelector('[data-icon="ai"]'),
    ).toBeInTheDocument();
  },
};

export const AllTypes: Story = {
  name: "전체 종류 (category/notice)",
  parameters: { design: { type: "figma", url: designUrlFor("category") } },
  render: (args) => (
    <div style={{ display: "flex", gap: "var(--spacing-8)" }}>
      <Chip {...args} type="category" />
      <Chip {...args} type="notice" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const chips = canvasElement.querySelectorAll("[data-icon]");
    await expect(chips.length).toBe(2);
  },
};
