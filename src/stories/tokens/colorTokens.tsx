import { useEffect, useState } from "react";

export interface ColorToken {
  name: string;
  cssVar: string;
}

export function TOTAL_TOKEN_COUNT(...groups: ColorToken[][]): number {
  return groups.reduce((sum, group) => sum + group.length, 0);
}

function ColorSwatch({ name, cssVar }: ColorToken) {
  const [resolved, setResolved] = useState("");

  useEffect(() => {
    setResolved(
      getComputedStyle(document.documentElement)
        .getPropertyValue(cssVar)
        .trim(),
    );
  }, [cssVar]);

  return (
    <div className="flex flex-col gap-[var(--spacing-8)]">
      <div
        className="h-[var(--spacing-64)] w-full rounded-[var(--radius-md)] border border-[color:var(--color-border-default)]"
        style={{ backgroundColor: `var(${cssVar})` }}
      />
      <div className="flex flex-col gap-[var(--spacing-2)]">
        <span className="text-[length:var(--typography-body-sm-regular-font-size)] text-[color:var(--color-text-primary)]">
          {name}
        </span>
        <span className="text-[length:var(--typography-caption-sm-regular-font-size)] text-[color:var(--color-text-tertiary)]">
          {cssVar}
        </span>
        <span className="text-[length:var(--typography-caption-sm-regular-font-size)] text-[color:var(--color-text-tertiary)]">
          {resolved}
        </span>
      </div>
    </div>
  );
}

export function ColorGroup({
  title,
  tokens,
}: {
  title: string;
  tokens: ColorToken[];
}) {
  return (
    <section className="flex flex-col gap-[var(--spacing-16)]">
      <h3 className="m-0 text-[length:var(--typography-body-lg-bold-font-size)] text-[color:var(--color-text-primary)]">
        {title}
      </h3>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-[var(--spacing-16)]">
        {tokens.map((token) => (
          <ColorSwatch key={token.cssVar} {...token} />
        ))}
      </div>
    </section>
  );
}
