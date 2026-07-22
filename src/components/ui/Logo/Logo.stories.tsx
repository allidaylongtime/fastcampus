import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Logo } from "./Logo";

const FIGMA_FILE_URL =
  "https://www.figma.com/design/rR87YiUvJsp04GFlUL474X/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%A1%9C%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0";

const meta = {
  title: "UI/Logo",
  component: Logo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: `${FIGMA_FILE_URL}?node-id=783-4211`,
    },
  },
  argTypes: {
    width: {
      control: { type: "number", min: 40, max: 400, step: 10 },
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector("svg");
    await expect(svg).toBeTruthy();
    await expect(svg).toHaveAttribute("viewBox", "0 0 186 38");
    await expect(svg).toHaveAttribute("width", "186");
    await expect(svg).toHaveAttribute("height", "38");
    await expect(svg).toHaveAttribute("aria-label", "FigmaPedia");
  },
};

export const CustomWidth: Story = {
  name: "커스텀 너비 (width prop)",
  args: { width: 93 },
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector("svg");
    await expect(svg).toHaveAttribute("width", "93");
    // 원본 비율(186:38)을 유지한 채 높이가 절반으로 축소됩니다.
    await expect(svg).toHaveAttribute("height", "19");
    await expect(svg).toHaveAttribute("viewBox", "0 0 186 38");
  },
};
