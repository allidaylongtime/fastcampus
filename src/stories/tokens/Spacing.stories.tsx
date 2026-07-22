import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { expect, within } from "storybook/test";

const SPACING_STEPS = [
  "0",
  "2",
  "4",
  "8",
  "12",
  "16",
  "24",
  "32",
  "40",
  "48",
  "64",
];

function SpacingSample({ step }: { step: string }) {
  const cssVar = `--spacing-${step}`;
  const [resolved, setResolved] = useState("");

  useEffect(() => {
    setResolved(
      getComputedStyle(document.documentElement)
        .getPropertyValue(cssVar)
        .trim(),
    );
  }, [cssVar]);

  return (
    <div className="flex items-center gap-[var(--spacing-16)]">
      <div className="flex w-[var(--spacing-64)] flex-col gap-[var(--spacing-2)]">
        <span className="text-[length:var(--typography-body-sm-regular-font-size)] text-[color:var(--color-text-primary)]">
          {cssVar}
        </span>
        <span className="text-[length:var(--typography-caption-sm-regular-font-size)] text-[color:var(--color-text-tertiary)]">
          {resolved}
        </span>
      </div>
      <div className="h-[var(--spacing-24)] flex-1 border-l border-[color:var(--color-border-default)]">
        <div
          className="h-full rounded-[var(--radius-xs)] bg-[color:var(--color-background-brand)]"
          style={{ width: `var(${cssVar})` }}
        />
      </div>
    </div>
  );
}

function SpacingScale() {
  return (
    <div className="flex flex-col gap-[var(--spacing-16)]">
      {SPACING_STEPS.map((step) => (
        <SpacingSample key={step} step={step} />
      ))}
    </div>
  );
}

const meta = {
  title: "Foundation/Spacing",
  component: SpacingScale,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof SpacingScale>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const labels = canvas.getAllByText(/^--spacing-/);
    await expect(labels).toHaveLength(SPACING_STEPS.length);
  },
};
