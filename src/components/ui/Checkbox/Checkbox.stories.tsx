import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Checkbox } from "./Checkbox";

const FIGMA_FILE_URL =
  "https://www.figma.com/design/rR87YiUvJsp04GFlUL474X/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%A1%9C%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0";

/** 상태별 Figma 프레임 node-id (on 783:4139 / off 783:4150) */
const STATE_NODE_IDS = {
  on: "783-4139",
  off: "783-4150",
} as const;

function designUrlFor(state: keyof typeof STATE_NODE_IDS) {
  return `${FIGMA_FILE_URL}?node-id=${STATE_NODE_IDS[state]}`;
}

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: `${FIGMA_FILE_URL}?node-id=783-4142`,
    },
  },
  args: {
    "aria-label": "체크박스",
    onChange: fn(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
  name: "선택 안 됨",
  parameters: { design: { type: "figma", url: designUrlFor("off") } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("checkbox", { name: "체크박스" });
    await expect(input).not.toBeChecked();
    await expect(
      canvasElement.querySelector('svg[data-icon="check"]'),
    ).toBeNull();
  },
};

export const Checked: Story = {
  name: "선택됨",
  args: { defaultChecked: true },
  parameters: { design: { type: "figma", url: designUrlFor("on") } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("checkbox", { name: "체크박스" });
    await expect(input).toBeChecked();
    await expect(
      canvasElement.querySelector('svg[data-icon="check"]'),
    ).not.toBeNull();
  },
};

export const Disabled: Story = {
  name: "비활성화",
  args: { disabled: true },
  parameters: { design: { type: "figma", url: designUrlFor("off") } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("checkbox", { name: "체크박스" });
    await expect(input).toBeDisabled();
  },
};

export const CheckedDisabled: Story = {
  name: "선택됨 + 비활성화",
  args: { defaultChecked: true, disabled: true },
  parameters: { design: { type: "figma", url: designUrlFor("on") } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("checkbox", { name: "체크박스" });
    await expect(input).toBeChecked();
    await expect(input).toBeDisabled();
    await expect(
      canvasElement.querySelector('svg[data-icon="check"]'),
    ).not.toBeNull();
  },
};

export const WithLabel: Story = {
  name: "라벨 포함",
  args: { label: "약관에 동의합니다", "aria-label": undefined },
  parameters: { design: { type: "figma", url: designUrlFor("off") } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("checkbox", {
      name: "약관에 동의합니다",
    });
    await expect(input).toBeInTheDocument();
  },
};

export const ToggleInteraction: Story = {
  name: "클릭 토글 인터랙션",
  parameters: { design: { type: "figma", url: designUrlFor("off") } },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("checkbox", { name: "체크박스" });
    await expect(input).not.toBeChecked();

    await userEvent.click(input);
    await expect(input).toBeChecked();
    await expect(args.onChange).toHaveBeenCalledTimes(1);
    await expect(
      canvasElement.querySelector('svg[data-icon="check"]'),
    ).not.toBeNull();

    await userEvent.click(input);
    await expect(input).not.toBeChecked();
  },
};

export const AllStates: Story = {
  name: "전체 상태 (unchecked/checked/disabled)",
  parameters: { design: { type: "figma", url: designUrlFor("off") } },
  render: (args) => (
    <div style={{ display: "flex", gap: "var(--spacing-16)" }}>
      <Checkbox {...args} aria-label="선택 안 됨" />
      <Checkbox {...args} aria-label="선택됨" defaultChecked />
      <Checkbox {...args} aria-label="비활성화" disabled />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const checkboxes = canvasElement.querySelectorAll('input[type="checkbox"]');
    await expect(checkboxes.length).toBe(3);
  },
};
