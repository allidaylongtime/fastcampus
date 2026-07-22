import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { TypeGroup, type TypeToken } from "./typographyTokens";

const DISPLAY: TypeToken[] = [
  "lg-bold",
  "lg-regular",
  "sm-bold",
  "sm-regular",
].map((variant) => ({
  name: `display-${variant}`,
  varPrefix: `--typography-display-${variant}`,
}));

const TITLE: TypeToken[] = [
  "lg-bold",
  "lg-regular",
  "sm-bold",
  "sm-regular",
].map((variant) => ({
  name: `title-${variant}`,
  varPrefix: `--typography-title-${variant}`,
}));

const BODY: TypeToken[] = [
  "lg-bold",
  "lg-regular",
  "sm-bold",
  "sm-regular",
].map((variant) => ({
  name: `body-${variant}`,
  varPrefix: `--typography-body-${variant}`,
}));

const CAPTION: TypeToken[] = [
  "lg-bold",
  "lg-medium",
  "lg-regular",
  "sm-bold",
  "sm-medium",
  "sm-regular",
].map((variant) => ({
  name: `caption-${variant}`,
  varPrefix: `--typography-caption-${variant}`,
}));

const meta = {
  title: "Foundation/Typography",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
  render: () => <TypeGroup title="Display" tokens={DISPLAY} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const labels = canvas.getAllByText(/^display-/);
    await expect(labels).toHaveLength(DISPLAY.length);
  },
};

export const Title: Story = {
  render: () => <TypeGroup title="Title" tokens={TITLE} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const labels = canvas.getAllByText(/^title-/);
    await expect(labels).toHaveLength(TITLE.length);
  },
};

export const Body: Story = {
  render: () => <TypeGroup title="Body" tokens={BODY} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const labels = canvas.getAllByText(/^body-/);
    await expect(labels).toHaveLength(BODY.length);
  },
};

export const Caption: Story = {
  render: () => <TypeGroup title="Caption" tokens={CAPTION} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const labels = canvas.getAllByText(/^caption-/);
    await expect(labels).toHaveLength(CAPTION.length);
  },
};
