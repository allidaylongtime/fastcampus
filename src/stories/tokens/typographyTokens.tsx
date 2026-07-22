import { useEffect, useState } from "react";

export interface TypeToken {
  name: string;
  varPrefix: string;
}

const SAMPLE_TEXT = "안녕하세요, 디자인 시스템입니다";

function TypeSample({ name, varPrefix }: TypeToken) {
  const [values, setValues] = useState({
    fontWeight: "",
    fontSize: "",
    lineHeight: "",
  });

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    setValues({
      fontWeight: style.getPropertyValue(`${varPrefix}-font-weight`).trim(),
      fontSize: style.getPropertyValue(`${varPrefix}-font-size`).trim(),
      lineHeight: style.getPropertyValue(`${varPrefix}-line-height`).trim(),
    });
  }, [varPrefix]);

  return (
    <div className="flex flex-col gap-[var(--spacing-8)] border-b border-[color:var(--color-border-default)] pb-[var(--spacing-16)]">
      <p
        className="m-0 text-[color:var(--color-text-primary)]"
        style={{
          fontFamily: `var(${varPrefix}-font-family)`,
          fontWeight: `var(${varPrefix}-font-weight)`,
          fontSize: `var(${varPrefix}-font-size)`,
          lineHeight: `var(${varPrefix}-line-height)`,
        }}
      >
        {SAMPLE_TEXT}
      </p>
      <div className="flex flex-wrap gap-[var(--spacing-16)] text-[length:var(--typography-caption-sm-regular-font-size)] text-[color:var(--color-text-tertiary)]">
        <span>{name}</span>
        <span>{varPrefix}-*</span>
        <span>font-size: {values.fontSize}</span>
        <span>font-weight: {values.fontWeight}</span>
        <span>line-height: {values.lineHeight}</span>
      </div>
    </div>
  );
}

export function TypeGroup({
  title,
  tokens,
}: {
  title: string;
  tokens: TypeToken[];
}) {
  return (
    <section className="flex flex-col gap-[var(--spacing-16)]">
      <h3 className="m-0 text-[length:var(--typography-body-lg-bold-font-size)] text-[color:var(--color-text-primary)]">
        {title}
      </h3>
      <div className="flex flex-col gap-[var(--spacing-24)]">
        {tokens.map((token) => (
          <TypeSample key={token.varPrefix} {...token} />
        ))}
      </div>
    </section>
  );
}
