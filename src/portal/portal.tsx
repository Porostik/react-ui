import React, { PropsWithChildren, useMemo } from "react";
import { createPortal } from "react-dom";

type Props = PropsWithChildren<{
  /** Root element id. */
  id?: string;
}>;

export const Portal = ({ children, id }: Props) => {
  const rootElement = useMemo(() => {
    if (!!id) {
      return document.querySelector(id) || document.body;
    }

    return document.body;
  }, [id]);

  return <>{createPortal(children, rootElement)}</>;
};
