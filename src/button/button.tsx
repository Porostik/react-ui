import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
} from "react";
import styles from "./button.module.scss";
import classNames from "classnames";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        className={classNames(styles.btn, className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
