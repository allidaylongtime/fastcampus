import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { ContentInputContainer } from "./ContentInputContainer";

const FIGMA_FILE_URL =
  "https://www.figma.com/design/rR87YiUvJsp04GFlUL474X/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%A1%9C%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0";

/** state variant별 Figma 프레임 node-id (empty 764:2351 / filled 783:2818) */
const STATE_NODE_IDS = {
  empty: "764-2351",
  filled: "783-2818",
} as const;

function designUrlFor(state: keyof typeof STATE_NODE_IDS) {
  return `${FIGMA_FILE_URL}?node-id=${STATE_NODE_IDS[state]}`;
}

const meta = {
  title: "UI/ContentInputContainer",
  component: ContentInputContainer,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: `${FIGMA_FILE_URL}?node-id=783-2817`,
    },
  },
  args: {
    onChange: fn(),
  },
  render: (args) => (
    <div style={{ width: 840, maxWidth: "100%" }}>
      <ContentInputContainer {...args} />
    </div>
  ),
} satisfies Meta<typeof ContentInputContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  name: "빈 상태 (state=empty)",
  parameters: { design: { type: "figma", url: designUrlFor("empty") } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText(
      "게시글 내용을 입력해주세요.",
    ) as HTMLTextAreaElement;
    await expect(textarea).toBeInTheDocument();
    await expect(canvas.queryByRole("img")).not.toBeInTheDocument();
  },
};

export const Filled: Story = {
  name: "이미지+텍스트 채워진 상태 (state=filled)",
  args: {
    imageType: 1,
    imageAlt: "게시글 첨부 이미지",
    defaultValue:
      "안녕하세요, 피그마피디아 운영팀입니다. 커뮤니티가 점점 성장하면서 새롭게 정책을 정비하게 되었습니다.",
  },
  parameters: { design: { type: "figma", url: designUrlFor("filled") } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("img")).toBeInTheDocument();
    const textarea = canvas.getByDisplayValue(
      /피그마피디아 운영팀입니다/,
    ) as HTMLTextAreaElement;
    await expect(textarea).toBeInTheDocument();
  },
};

export const TypingInteraction: Story = {
  name: "타이핑 입력 인터랙션",
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText(
      "게시글 내용을 입력해주세요.",
    ) as HTMLTextAreaElement;
    await userEvent.type(textarea, "본문 내용입니다");
    await expect(textarea).toHaveValue("본문 내용입니다");
    await expect(args.onChange).toHaveBeenCalled();
  },
};

export const Controlled: Story = {
  name: "controlled 사용 예시",
  render: (args) => {
    function ControlledContentInput() {
      const [value, setValue] = useState("");
      return (
        <div style={{ width: 840, maxWidth: "100%" }}>
          <ContentInputContainer
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
    return <ControlledContentInput />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText(
      "게시글 내용을 입력해주세요.",
    ) as HTMLTextAreaElement;
    await userEvent.type(textarea, "controlled 본문");
    await expect(textarea).toHaveValue("controlled 본문");
  },
};
