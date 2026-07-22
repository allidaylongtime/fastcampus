import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Divider } from "./Divider";

const meta = {
  title: "UI/Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/rR87YiUvJsp04GFlUL474X/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%A1%9C%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0?node-id=781-5293",
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const separator = canvas.getByRole("separator");
    await expect(separator).toBeInTheDocument();
    await expect(separator).toHaveAttribute("aria-orientation", "horizontal");
  },
};

export const Vertical: Story = {
  name: "수직 (Toolbar 내 사용)",
  args: { orientation: "vertical" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/rR87YiUvJsp04GFlUL474X/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%A1%9C%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0?node-id=137-1749",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const separator = canvas.getByRole("separator");
    await expect(separator).toBeInTheDocument();
    await expect(separator).toHaveAttribute("aria-orientation", "vertical");
    await expect(separator.className).toContain("w-[var(--border-width-1)]");
  },
};

export const InContent: Story = {
  name: "본문 내 사용 예시",
  render: () => (
    <div className="flex flex-col gap-[var(--spacing-16)]">
      <p className="m-0 text-[length:var(--typography-body-sm-regular-font-size)] text-[color:var(--color-text-primary)]">
        위 콘텐츠
      </p>
      <Divider />
      <p className="m-0 text-[length:var(--typography-body-sm-regular-font-size)] text-[color:var(--color-text-primary)]">
        아래 콘텐츠
      </p>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("separator")).toBeInTheDocument();
  },
};
