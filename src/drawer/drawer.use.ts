import {
  type MouseEvent,
  type TouchEvent,
  useState,
  useRef,
  useEffect,
} from "react";
import { fromEvent, takeUntil, repeat } from "rxjs";
import { map, switchMap, pairwise } from "rxjs/operators";

export const useTransition = () => {
  const [isTransition, setIsTransition] = useState(false);

  const toggleTransition = (isOn: boolean, duration: number) => {
    setIsTransition(isOn);
    setTimeout(() => setIsTransition(!isOn), duration);
  };

  return {
    isTransition,
    toggleTransition,
  };
};

export const useDrawer = (onClose: () => void) => {
  const { isTransition, toggleTransition } = useTransition();
  const rootRef = useRef<HTMLDivElement>(null);

  const mapMouseY = map<MouseEvent, number>((e) => e.clientY);
  const mapTouchY = map<TouchEvent, number>((e) => e.targetTouches[0].clientY);

  const getElementTransform = () => {
    if (rootRef.current) {
      return (
        Number(rootRef.current.style.transform.replace(/[^\-?\d.]/g, "")) || 0
      );
    }
    return 0;
  };

  const handlePointerMove = map(([prevCoords, currentCoords]: number[]) => {
    const prev = getElementTransform();

    let newCoord = 0;

    if (prevCoords < currentCoords) {
      newCoord = prev - (prevCoords - currentCoords);
    } else {
      newCoord = prev + (currentCoords - prevCoords);
    }

    if (newCoord <= -30) {
      return prev;
    }

    return newCoord;
  });

  const resetCoords = map(() => {
    toggleTransition(true, 200);
    const prev = getElementTransform();

    if (prev >= 100) {
      onClose();
    }
    return 0;
  });

  const setElementTransform = map((translate: number) => {
    if (rootRef.current) {
      rootRef.current.style.transform = `translateY(${translate}px)`;
    }
  });

  useEffect(() => {
    const mouseUp$ = fromEvent<MouseEvent>(document, "mouseup");
    const mouseMove$ = fromEvent<MouseEvent>(document, "mousemove");

    const touchEnd$ = fromEvent<TouchEvent>(document, "touchend");
    const touchMove$ = fromEvent<TouchEvent>(document, "touchmove");

    mouseUp$.pipe(resetCoords, setElementTransform).subscribe();
    touchEnd$.pipe(resetCoords, setElementTransform).subscribe();

    if (rootRef.current) {
      const mouseDown$ = fromEvent<MouseEvent>(rootRef.current, "mousedown");

      mouseDown$
        .pipe(
          switchMap(() =>
            mouseMove$.pipe(
              mapMouseY,
              pairwise(),
              handlePointerMove,
              setElementTransform
            )
          ),
          takeUntil(mouseUp$),
          repeat()
        )
        .subscribe();

      const touchStart$ = fromEvent<TouchEvent>(rootRef.current, "touchstart");

      touchStart$
        .pipe(
          switchMap(() =>
            touchMove$.pipe(
              mapTouchY,
              pairwise(),
              handlePointerMove,
              setElementTransform
            )
          ),
          takeUntil(touchEnd$),
          repeat()
        )
        .subscribe();
    }
  }, [rootRef.current]);

  return {
    rootRef,
    isTransition,
  };
};
