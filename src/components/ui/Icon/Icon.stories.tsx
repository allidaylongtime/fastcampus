import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Icon, ICON_NAMES, type IconName } from "./Icon";

const FIGMA_FILE_URL =
  "https://www.figma.com/design/rR87YiUvJsp04GFlUL474X/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%A1%9C%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0";

/**
 * 아이콘 이름 → Figma 개별 노드 id (node-id 쿼리 형식).
 * `bookmark_empty`/`bookmark_fill`은 Figma 소스가 없는 예외라 매핑이 없습니다
 * (`IconName` 주석 참고) — `designUrlFor`가 세트 프레임 URL로 폴백합니다.
 */
const ICON_NODE_IDS: Partial<Record<IconName, string>> = {
  arrow_left: "783-4306",
  user: "137-1726",
  ai: "783-7780",
  dog: "783-7788",
  "eye-on": "137-1728",
  design: "783-7792",
  "eye-off": "781-4895",
  menu: "137-1730",
  notification: "781-5151",
  arrow_right: "862-8208",
  close: "137-1732",
  search: "137-1734",
  message: "137-1736",
  heart_empty: "137-1738",
  heart_fill: "137-1740",
  check: "137-1742",
  pencil: "137-1744",
  google: "781-4833",
};

function designUrlFor(name: IconName) {
  const nodeId = ICON_NODE_IDS[name];
  return nodeId
    ? `${FIGMA_FILE_URL}?node-id=${nodeId}`
    : `${FIGMA_FILE_URL}?node-id=781-5290`;
}

const meta = {
  title: "UI/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      // 아이콘 세트 프레임(name variant 137:1723 포함) — node-id 781-5290
      url: `${FIGMA_FILE_URL}?node-id=781-5290`,
    },
  },
  argTypes: {
    name: {
      control: "select",
      options: ICON_NAMES,
    },
    size: {
      control: { type: "number", min: 8, max: 64, step: 4 },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ArrowLeft: Story = {
  args: { name: "arrow_left" },
  parameters: { design: { type: "figma", url: designUrlFor("arrow_left") } },
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector("svg");
    await expect(svg).toBeTruthy();
    await expect(svg).toHaveAttribute("viewBox", "0 0 16 16");
    await expect(svg).toHaveAttribute("width", "16");
    await expect(svg).toHaveAttribute("height", "16");
    await expect(svg).toHaveAttribute("data-icon", "arrow_left");
  },
};

export const User: Story = {
  args: { name: "user" },
  parameters: { design: { type: "figma", url: designUrlFor("user") } },
};

export const Ai: Story = {
  args: { name: "ai" },
  parameters: { design: { type: "figma", url: designUrlFor("ai") } },
};

export const Dog: Story = {
  args: { name: "dog" },
  parameters: { design: { type: "figma", url: designUrlFor("dog") } },
};

export const EyeOn: Story = {
  args: { name: "eye-on" },
  parameters: { design: { type: "figma", url: designUrlFor("eye-on") } },
};

export const Design: Story = {
  args: { name: "design" },
  parameters: { design: { type: "figma", url: designUrlFor("design") } },
};

export const EyeOff: Story = {
  args: { name: "eye-off" },
  parameters: { design: { type: "figma", url: designUrlFor("eye-off") } },
};

export const Menu: Story = {
  args: { name: "menu" },
  parameters: { design: { type: "figma", url: designUrlFor("menu") } },
};

export const Notification: Story = {
  args: { name: "notification" },
  parameters: {
    design: { type: "figma", url: designUrlFor("notification") },
  },
};

export const ArrowRight: Story = {
  args: { name: "arrow_right" },
  parameters: { design: { type: "figma", url: designUrlFor("arrow_right") } },
};

export const Close: Story = {
  args: { name: "close" },
  parameters: { design: { type: "figma", url: designUrlFor("close") } },
};

export const Search: Story = {
  args: { name: "search" },
  parameters: { design: { type: "figma", url: designUrlFor("search") } },
};

export const Message: Story = {
  args: { name: "message" },
  parameters: { design: { type: "figma", url: designUrlFor("message") } },
};

export const HeartEmpty: Story = {
  args: { name: "heart_empty" },
  parameters: { design: { type: "figma", url: designUrlFor("heart_empty") } },
};

export const HeartFill: Story = {
  args: { name: "heart_fill" },
  parameters: { design: { type: "figma", url: designUrlFor("heart_fill") } },
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector("svg");
    const path = svg?.querySelector("path");
    await expect(path).toHaveAttribute("fill", "currentColor");
    await expect(path).not.toHaveAttribute("stroke");
  },
};

export const Check: Story = {
  args: { name: "check" },
  parameters: { design: { type: "figma", url: designUrlFor("check") } },
};

export const Pencil: Story = {
  args: { name: "pencil" },
  parameters: { design: { type: "figma", url: designUrlFor("pencil") } },
};

export const BookmarkEmpty: Story = {
  name: "BookmarkEmpty (Figma 소스 없음, heart_empty 컨벤션 준용)",
  args: { name: "bookmark_empty" },
  parameters: {
    design: { type: "figma", url: designUrlFor("bookmark_empty") },
  },
  play: async ({ canvasElement }) => {
    const path = canvasElement.querySelector("path");
    await expect(path).toHaveAttribute("fill", "none");
    await expect(path).toHaveAttribute("stroke", "currentColor");
  },
};

export const BookmarkFill: Story = {
  name: "BookmarkFill (Figma 소스 없음, heart_fill 컨벤션 준용)",
  args: { name: "bookmark_fill" },
  parameters: { design: { type: "figma", url: designUrlFor("bookmark_fill") } },
  play: async ({ canvasElement }) => {
    const path = canvasElement.querySelector("path");
    await expect(path).toHaveAttribute("fill", "currentColor");
    await expect(path).not.toHaveAttribute("stroke");
  },
};

export const Google: Story = {
  args: { name: "google" },
  parameters: { design: { type: "figma", url: designUrlFor("google") } },
  play: async ({ canvasElement }) => {
    // google은 브랜드 로고 예외로 다색 hex를 하드코딩합니다 (docs/design-tokens.md 참고).
    const svg = canvasElement.querySelector("svg");
    const paths = svg?.querySelectorAll("path");
    await expect(paths?.length).toBe(4);
    await expect(paths?.[0]).toHaveAttribute("fill", "#F44336");
  },
};

export const CustomSize: Story = {
  name: "커스텀 사이즈 (size prop)",
  args: { name: "search", size: 32 },
  parameters: { design: { type: "figma", url: designUrlFor("search") } },
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector("svg");
    await expect(svg).toHaveAttribute("width", "32");
    await expect(svg).toHaveAttribute("height", "32");
    // 확대해도 viewBox는 원본 16x16 좌표계를 유지합니다.
    await expect(svg).toHaveAttribute("viewBox", "0 0 16 16");
  },
};

export const AllIcons: Story = {
  name: "전체 아이콘 (20종)",
  args: { name: "arrow_left" },
  parameters: {
    design: { type: "figma", url: `${FIGMA_FILE_URL}?node-id=781-5290` },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--spacing-16)",
      }}
    >
      {ICON_NAMES.map((name) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--spacing-4)",
          }}
        >
          <Icon name={name} />
          <span
            style={{
              fontSize: "var(--typography-caption-sm-regular-font-size)",
              color: "var(--color-text-secondary)",
            }}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const svgs = canvasElement.querySelectorAll("svg");
    await expect(svgs.length).toBe(ICON_NAMES.length);
  },
};
