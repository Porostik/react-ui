import { PropsWithChildren, useEffect, useState } from "react";

type Props = PropsWithChildren<{
  /** Is Component open flag. */
  isOpen: boolean;
  /** Component animation duration. */
  duration: number;
}>;

export const RenderWithTransition = ({ children, isOpen, duration }: Props) => {
  const [isRender, setIsRender] = useState(isOpen);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setIsRender(false), duration);
    } else {
      setIsRender(true);
    }
  }, [isOpen]);

  return isRender ? children : null;
};
