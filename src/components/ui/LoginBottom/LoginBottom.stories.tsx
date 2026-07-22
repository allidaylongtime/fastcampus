import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { LoginBottom } from "./LoginBottom";

const FIGMA_FILE_URL =
  "https://www.figma.com/design/rR87YiUvJsp04GFlUL474X/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%A1%9C%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0";

const meta = {
  title: "UI/LoginBottom",
  component: LoginBottom,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: `${FIGMA_FILE_URL}?node-id=781-5042`,
    },
  },
  args: {
    onChange: fn(),
    onFindPasswordClick: fn(),
    onSignUpClick: fn(),
  },
} satisfies Meta<typeof LoginBottom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "기본",
};

export const Checked: Story = {
  name: "로그인 유지 체크됨",
  args: { defaultChecked: true },
};

export const Interaction: Story = {
  name: "체크박스 토글 / 비밀번호 찾기 / 회원가입 클릭 인터랙션",
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const checkbox = canvas.getByRole("checkbox", { name: "로그인 유지" });
    await expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
    await expect(args.onChange).toHaveBeenCalledTimes(1);

    const findPasswordButton = canvas.getByRole("button", {
      name: "비밀번호 찾기",
    });
    await userEvent.click(findPasswordButton);
    await expect(args.onFindPasswordClick).toHaveBeenCalledTimes(1);

    const signUpButton = canvas.getByRole("button", { name: "회원가입" });
    await userEvent.click(signUpButton);
    await expect(args.onSignUpClick).toHaveBeenCalledTimes(1);
  },
};
