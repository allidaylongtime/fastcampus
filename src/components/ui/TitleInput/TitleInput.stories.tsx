import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { TitleInput } from "./TitleInput";

const FIGMA_FILE_URL =
  "https://www.figma.com/design/rR87YiUvJsp04GFlUL474X/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%A1%9C%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0";

/** type variant별 Figma 프레임 node-id (default 783:3884 / focus 783:3925 / error 783:3934 / disabled 783:4036) */
const STATE_NODE_IDS = {
  default: "783-3884",
  focus: "783-3925",
  error: "783-3934",
  disabled: "783-4036",
} as const;

function designUrlFor(state: keyof typeof STATE_NODE_IDS) {
  return `${FIGMA_FILE_URL}?node-id=${STATE_NODE_IDS[state]}`;
}

const meta = {
  title: "UI/TitleInput",
  component: TitleInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: `${FIGMA_FILE_URL}?node-id=783-3924`,
    },
  },
  args: {
    label: "label",
    placeholder: "placeholder",
    onChange: fn(),
  },
  render: (args) => (
    <div style={{ width: 345 }}>
      <TitleInput {...args} />
    </div>
  ),
} satisfies Meta<typeof TitleInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "기본 상태 (default)",
  args: { helpText: "placeholder" },
  parameters: { design: { type: "figma", url: designUrlFor("default") } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("label") as HTMLInputElement;
    await expect(input).not.toBeDisabled();
    await expect(input).not.toHaveAttribute("aria-invalid", "true");
  },
};

export const Focus: Story = {
  name: "포커스 상태 (focus, CSS :focus)",
  args: { helpText: "placeholder" },
  parameters: { design: { type: "figma", url: designUrlFor("focus") } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("label") as HTMLInputElement;
    await userEvent.click(input);
    await expect(input).toHaveFocus();
  },
};

export const Error: Story = {
  name: "에러 상태 (error)",
  args: { error: true, helpText: "placeholder" },
  parameters: { design: { type: "figma", url: designUrlFor("error") } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("label") as HTMLInputElement;
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAttribute(
      "aria-describedby",
      expect.stringContaining("helptext"),
    );
  },
};

export const Disabled: Story = {
  name: "비활성화 (disabled)",
  args: { disabled: true, helpText: "placeholder" },
  parameters: { design: { type: "figma", url: designUrlFor("disabled") } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("label") as HTMLInputElement;
    await expect(input).toBeDisabled();
  },
};

export const WithoutHelpText: Story = {
  name: "도움말 텍스트 생략",
  parameters: { design: { type: "figma", url: designUrlFor("default") } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("label") as HTMLInputElement;
    await expect(input).not.toHaveAttribute("aria-describedby");
    await expect(canvasElement.querySelector("p")).toBeNull();
  },
};

export const ErrorDisabled: Story = {
  name: "에러 + 비활성화 동시 상태",
  args: { error: true, disabled: true, helpText: "placeholder" },
  parameters: { design: { type: "figma", url: designUrlFor("error") } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("label") as HTMLInputElement;
    await expect(input).toBeDisabled();
    await expect(input).toHaveAttribute("aria-invalid", "true");
  },
};

export const TypingInteraction: Story = {
  name: "타이핑 입력 인터랙션",
  args: { helpText: "placeholder" },
  parameters: { design: { type: "figma", url: designUrlFor("default") } },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("label") as HTMLInputElement;
    await userEvent.type(input, "제목을 입력합니다");
    await expect(input).toHaveValue("제목을 입력합니다");
    await expect(args.onChange).toHaveBeenCalled();
  },
};
