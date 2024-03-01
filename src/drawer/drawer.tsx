import React, { PropsWithChildren, type CSSProperties, useEffect } from "react";
import classNames from "classnames";
import { Portal } from "../portal";
import { Overlay } from "../overlay";
import { RenderWithTransition } from "../render-with-transition";
import styles from "./drawer.module.scss";
import { useDrawer } from "./drawer.use";

const FOOTER_HEIGHT = 100;

type Props = PropsWithChildren<{
  /** Is Drawer open flag. */
  isOpen: boolean;
  /** Drawer open handler. */
  onClose: () => void;
}>;

const Render = ({ children, isOpen, onClose }: Props) => (
  <RenderWithTransition isOpen={isOpen} duration={200}>
    <Portal>
      <Overlay onClose={onClose} isOpen={isOpen}>
        {children}
      </Overlay>
    </Portal>
  </RenderWithTransition>
);

export const Drawer = ({ children, isOpen, onClose }: Props) => {
  const { isTransition, rootRef } = useDrawer(onClose);

  return (
    <Render isOpen={isOpen} onClose={onClose}>
      <div
        className={classNames(styles.root, {
          [styles["root--transition"]]: isTransition,
          [styles["root--close"]]: !isOpen,
        })}
        style={
          {
            "--footer-height": `${FOOTER_HEIGHT}px`,
          } as CSSProperties
        }
        ref={rootRef}
      >
        <div className={styles.head}>
          <span className={styles.bullet} />
        </div>
        <div className={styles.body}>{children}</div>
        <div className={styles.footer} />
      </div>
    </Render>
  );
};
