import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./overlay.module.scss";

type Props = PropsWithChildren<{
  /** Close handler. */
  onClose: () => void;
  /** Is Overlay open flag. */
  isOpen: boolean;
}>;

export const Overlay = ({ children, onClose, isOpen }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div
        className={classNames(styles.overlay, {
          [styles["overlay--close"]]: !isOpen,
        })}
        onClick={onClose}
      />
      {children}
    </div>
  );
};
