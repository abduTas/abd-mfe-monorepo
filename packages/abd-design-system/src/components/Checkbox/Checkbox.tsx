import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import styles from "./Checkbox.module.css";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
}

export function Checkbox({ label, className, id, ...props }: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label htmlFor={inputId} className={[styles.wrapper, className].filter(Boolean).join(" ")}>
      <input
        id={inputId}
        type="checkbox"
        className={styles.input}
        {...props}
      />
      <span className={styles.control} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </label>
  );
}
