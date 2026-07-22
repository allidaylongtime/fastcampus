import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { LoginSign } from "./LoginSign";

const FIGMA_FILE_URL =
  "https://www.figma.com/design/rR87YiUvJsp04GFlUL474X/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%A1%9C%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0";

const meta = {
  title: "UI/LoginSign",
  component: LoginSign,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: `${FIGMA_FILE_URL}?node-id=783-4161`,
    },
  },
  args: {
    onSignUpClick: fn(),
  },
} satisfies Meta<typeof LoginSign>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "기본",
};

export const Interaction: Story = {
  name: "회원가입 버튼 클릭 인터랙션",
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("아직 피그마피디아 회원이 아니세요?"),
    ).toBeInTheDocument();

    const signUpButton = canvas.getByRole("button", { name: "회원가입" });
    await userEvent.click(signUpButton);
    await expect(args.onSignUpClick).toHaveBeenCalledTimes(1);
  },
};
