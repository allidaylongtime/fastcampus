import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Input } from "./Input";

const FIGMA_FILE_URL =
  "https://www.figma.com/design/rR87YiUvJsp04GFlUL474X/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%A1%9C%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0";

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: `${FIGMA_FILE_URL}?node-id=764-2345`,
    },
  },
  args: {
    onChange: fn(),
  },
  render: (args) => (
    <div style={{ width: 840, maxWidth: "100%" }}>
      <Input {...args} />
    </div>
  ),
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "기본 상태 (placeholder)",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText(
      "제목을 입력해주세요.",
    ) as HTMLInputElement;
    await expect(input).toBeInTheDocument();
    await expect(input).not.toBeDisabled();
  },
};

export const CustomPlaceholder: Story = {
  name: "커스텀 placeholder",
  args: { placeholder: "궁금한 내용을 입력해주세요." },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByPlaceholderText("궁금한 내용을 입력해주세요."),
    ).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  name: "비활성화 (disabled)",
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText(
      "제목을 입력해주세요.",
    ) as HTMLInputElement;
    await expect(input).toBeDisabled();
  },
};

export const TypingInteraction: Story = {
  name: "타이핑 입력 인터랙션",
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText(
      "제목을 입력해주세요.",
    ) as HTMLInputElement;
    await userEvent.type(input, "제목을 입력합니다");
    await expect(input).toHaveValue("제목을 입력합니다");
    await expect(args.onChange).toHaveBeenCalled();
  },
};

export const Controlled: Story = {
  name: "controlled 사용 예시",
  render: (args) => {
    function ControlledInput() {
      const [value, setValue] = useState("");
      return (
        <div style={{ width: 840, maxWidth: "100%" }}>
          <Input
            {...args}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              args.onChange?.(event);
            }}
          />
        </div>
      );
    }
    return <ControlledInput />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText(
      "제목을 입력해주세요.",
    ) as HTMLInputElement;
    await userEvent.type(input, "controlled 값");
    await expect(input).toHaveValue("controlled 값");
  },
};
