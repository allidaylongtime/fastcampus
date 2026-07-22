import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { SearchBar } from "./SearchBar";

const FIGMA_FILE_URL =
  "https://www.figma.com/design/rR87YiUvJsp04GFlUL474X/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%A1%9C%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0";

const meta = {
  title: "UI/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: `${FIGMA_FILE_URL}?node-id=137-1359`,
    },
  },
  args: {
    onChange: fn(),
    onSubmit: fn(),
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("제목, 내용, 작성자");
    await expect(input).toBeInTheDocument();
    await expect(input).toHaveAttribute("type", "search");
  },
};

export const CustomPlaceholder: Story = {
  name: "커스텀 placeholder",
  args: { placeholder: "닉네임으로 검색" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByPlaceholderText("닉네임으로 검색"),
    ).toBeInTheDocument();
  },
};

export const Controlled: Story = {
  name: "제어 컴포넌트 (입력/엔터 검색)",
  render: (args) => {
    function ControlledSearchBar() {
      const [value, setValue] = useState("");
      return (
        <SearchBar
          {...args}
          value={value}
          onChange={(next) => {
            setValue(next);
            args.onChange?.(next);
          }}
          onSubmit={args.onSubmit}
        />
      );
    }
    return <ControlledSearchBar />;
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("제목, 내용, 작성자");
    await userEvent.type(input, "리액트{enter}");
    await expect(args.onChange).toHaveBeenCalled();
    await expect(args.onSubmit).toHaveBeenCalledWith("리액트");
  },
};
