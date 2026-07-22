import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { BookmarkButton } from "./BookmarkButton";

const meta = {
  title: "UI/BookmarkButton",
  component: BookmarkButton,
  tags: ["autodocs"],
  // ⚠️ Figma 디자인 시스템의 Icon 컴포넌트 세트(node-id 137:1723)를 전수 조사했으나
  // 북마크 관련 variant/프레임이 존재하지 않아, 연결할 Figma 소스 URL이 없습니다
  // (Icon.tsx의 IconName 주석, 사용자 확인 완료).
  parameters: {
    layout: "centered",
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof BookmarkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "기본 (outline)",
  args: { bookmarked: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "북마크" });

    await expect(button).toHaveAttribute("aria-pressed", "false");
    await expect(canvasElement.querySelector("[data-icon]")).toHaveAttribute(
      "data-icon",
      "bookmark_empty",
    );
  },
};

export const Filled: Story = {
  name: "북마크 활성 (filled)",
  args: { bookmarked: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "북마크" });

    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(canvasElement.querySelector("[data-icon]")).toHaveAttribute(
      "data-icon",
      "bookmark_fill",
    );
  },
};

export const Toggle: Story = {
  name: "클릭 시 onClick 호출",
  args: { bookmarked: false },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "북마크" });

    await userEvent.click(button);

    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
