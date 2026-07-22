import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { ColorGroup, TOTAL_TOKEN_COUNT, type ColorToken } from "./colorTokens";

const PRIMITIVE_GRAY: ColorToken[] = [
  "100",
  "200",
  "300",
  "305",
  "340",
  "360",
  "400",
  "490",
  "500",
  "540",
  "600",
  "610",
  "700",
  "800",
  "850",
  "900",
  "1000",
  "1050",
].map((step) => ({
  name: `gray-${step}`,
  cssVar: `--color-primitive-gray-${step}`,
}));

const PRIMITIVE_BLUE: ColorToken[] = [
  "20",
  "50",
  "100",
  "120",
  "200",
  "280",
  "300",
  "400",
  "440",
  "500",
  "540",
  "600",
  "680",
  "700",
  "800",
  "900",
  "1000",
].map((step) => ({
  name: `blue-${step}`,
  cssVar: `--color-primitive-blue-${step}`,
}));

const PRIMITIVE_RED: ColorToken[] = [
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "1000",
].map((step) => ({
  name: `red-${step}`,
  cssVar: `--color-primitive-red-${step}`,
}));

const SEMANTIC_TEXT: ColorToken[] = [
  "primary",
  "secondary",
  "tertiary",
  "disabled",
  "onbrand",
  "danger",
].map((name) => ({ name, cssVar: `--color-text-${name}` }));

const SEMANTIC_BACKGROUND: ColorToken[] = [
  "default",
  "subtle",
  "muted",
  "brand",
  "brandsubtle",
  "danger",
  "dangersubtle",
].map((name) => ({ name, cssVar: `--color-background-${name}` }));

const SEMANTIC_BORDER: ColorToken[] = [
  "default",
  "strong",
  "brand",
  "danger",
].map((name) => ({ name, cssVar: `--color-border-${name}` }));

const SEMANTIC_INTERACTIVE: ColorToken[] = [
  "primary",
  "primaryhover",
  "destructive",
  "destructivehover",
].map((name) => ({ name, cssVar: `--color-interactive-${name}` }));

const SEMANTIC_CONTENT: ColorToken[] = ["strong", "default", "muted"].map(
  (name) => ({ name, cssVar: `--color-content-${name}` }),
);

function ColorsPrimitive() {
  return (
    <div className="flex flex-col gap-[var(--spacing-32)]">
      <ColorGroup title="Primitive / Gray" tokens={PRIMITIVE_GRAY} />
      <ColorGroup title="Primitive / Blue" tokens={PRIMITIVE_BLUE} />
      <ColorGroup title="Primitive / Red" tokens={PRIMITIVE_RED} />
    </div>
  );
}

function ColorsSemantic() {
  return (
    <div className="flex flex-col gap-[var(--spacing-32)]">
      <ColorGroup title="Semantic / Text" tokens={SEMANTIC_TEXT} />
      <ColorGroup title="Semantic / Background" tokens={SEMANTIC_BACKGROUND} />
      <ColorGroup title="Semantic / Border" tokens={SEMANTIC_BORDER} />
      <ColorGroup
        title="Semantic / Interactive"
        tokens={SEMANTIC_INTERACTIVE}
      />
      <ColorGroup title="Semantic / Content" tokens={SEMANTIC_CONTENT} />
    </div>
  );
}

const meta = {
  title: "Foundation/Colors",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const PRIMITIVE_TOKEN_COUNT = TOTAL_TOKEN_COUNT(
  PRIMITIVE_GRAY,
  PRIMITIVE_BLUE,
  PRIMITIVE_RED,
);

const SEMANTIC_TOKEN_COUNT = TOTAL_TOKEN_COUNT(
  SEMANTIC_TEXT,
  SEMANTIC_BACKGROUND,
  SEMANTIC_BORDER,
  SEMANTIC_INTERACTIVE,
  SEMANTIC_CONTENT,
);

export const Primitives: Story = {
  render: () => <ColorsPrimitive />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const swatchNames = canvas.getAllByText(/^--color-primitive-/);
    await expect(swatchNames).toHaveLength(PRIMITIVE_TOKEN_COUNT);
  },
};

export const Semantic: Story = {
  render: () => <ColorsSemantic />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const swatchNames = canvas.getAllByText(
      /^--color-(text|background|border|interactive|content)-/,
    );
    await expect(swatchNames).toHaveLength(SEMANTIC_TOKEN_COUNT);
  },
};
