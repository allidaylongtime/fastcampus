import {
  useId,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { Icon } from "../Icon";

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> {
  /**
   * 체크박스 옆에 표시할 라벨 텍스트(선택).
   * Figma 원본 노드(783:4142)에는 라벨이 없는 16x16 박스만 존재하므로, 라벨을 생략할
   * 경우 접근성을 위해 `aria-label` 또는 `aria-labelledby`를 함께 전달해야 합니다.
   */
  label?: ReactNode;
}

const ICON_SIZE = 16;

const boxBaseStyle: CSSProperties = {
  width: "var(--spacing-16)",
  height: "var(--spacing-16)",
  borderRadius: "var(--radius-xs)",
};

const labelTextStyle: CSSProperties = {
  fontFamily: "var(--typography-body-sm-regular-font-family)",
  fontWeight:
    "var(--typography-body-sm-regular-font-weight)" as unknown as number,
  fontSize: "var(--typography-body-sm-regular-font-size)",
  lineHeight: "var(--typography-body-sm-regular-line-height)",
  color: "var(--color-text-primary)",
};

/**
 * 접근성을 갖춘 실제 폼 체크박스.
 *
 * Figma: `Checkbox`(node-id 783:4142, 16x16). 내부에 `on`(783:4139) / `off`(783:4150) /
 * `state3`(4035:1501) 3개 인스턴스가 있었으나, `state3`는 `on`과 배경색·아이콘·크기가
 * 픽셀 단위로 완전히 동일해 정리되지 않은 잔여 레이어로 판단, 2-state(`checked: boolean`)로만
 * 구현합니다 (사용자 확정).
 *
 * - checked: 배경 `--color-interactive-primary` + 흰색(`--color-text-onbrand`) 체크마크.
 *   체크마크는 기존 `Icon name="check"`을 16px로 재사용합니다(path가 완전히 동일).
 * - unchecked: 배경 `--color-text-disabled`, 체크마크 없음.
 * - 실제 `<input type="checkbox">`를 화면 밖으로 숨기고(`sr-only`) 시각적 박스는 옆의
 *   `<span aria-hidden>`으로 그려, 키보드 포커스/스크린리더/폼 제출 등 네이티브 동작을
 *   그대로 유지합니다.
 */
export function Checkbox({
  label,
  disabled,
  className = "",
  id,
  checked,
  defaultChecked = false,
  onChange,
  ...rest
}: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(!!defaultChecked);
  const isChecked = isControlled ? !!checked : internalChecked;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalChecked(event.target.checked);
    }
    onChange?.(event);
  };

  const boxStyle: CSSProperties = {
    ...boxBaseStyle,
    backgroundColor: isChecked
      ? "var(--color-interactive-primary)"
      : "var(--color-text-disabled)",
  };

  return (
    <label
      htmlFor={inputId}
      className={[
        "inline-flex items-center gap-[var(--spacing-8)]",
        disabled ? "opacity-30 pointer-events-none" : "cursor-pointer",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        id={inputId}
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        className="sr-only peer"
        {...rest}
      />
      <span
        aria-hidden="true"
        className="inline-flex items-center justify-center shrink-0"
        style={boxStyle}
      >
        {isChecked && (
          <Icon
            name="check"
            size={ICON_SIZE}
            className="text-[color:var(--color-text-onbrand)]"
          />
        )}
      </span>
      {label != null && <span style={labelTextStyle}>{label}</span>}
    </label>
  );
}
