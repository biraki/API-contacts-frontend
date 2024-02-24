import { ForwardedRef, InputHTMLAttributes, forwardRef, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import styles from "./styles.module.scss";

interface InputPasswordProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: String;
}

export const InputPassword = forwardRef(
  (
    { label, ...rest }: InputPasswordProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [isHidden, setIsHidden] = useState(true);

    return (
      <div className={styles.inputBox}>
        <label className="label">{label}</label>
        <input
          ref={ref}
          {...rest}
          type={isHidden ? "password" : "text"}
        ></input>
        <button type="button" onClick={() => setIsHidden(!isHidden)}>
          {isHidden ? (
            <MdVisibility size={12} />
          ) : (
            <MdVisibilityOff size={12} />
          )}
        </button>
      </div>
    );
  }
);
