import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  label?: String;
}

export const Input = forwardRef(
  (
    { error, label, ...rest }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <>
        {label && <label>{label}</label>}
        <input ref={ref} {...rest}></input>
        {error ? <p>{error.message}</p> : null}
      </>
    );
  }
);
