import { useEffect, useRef, useState } from "react";

function useDiyMazeByMouseHook({
  isMobile,
  ref,
  enabled = true,
}: {
  isMobile: boolean;
  ref: React.RefObject<HTMLDivElement>;
  enabled?: boolean;
}) {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const isMouseDown = useRef(false);

  const onMouseDown = (e: MouseEvent | TouchEvent) => {
    if (e.target) {
      isMouseDown.current = true;
      setElement(e.target as HTMLElement);
    }
  };

  const onmouseMove = (e: MouseEvent | TouchEvent) => {
    if (isMouseDown.current) {
      setElement(e.target as HTMLElement);
    }
  };

  const onMouseUp = () => {
    isMouseDown.current = false;
    setElement(null);
  };

  useEffect(() => {
    if (isMobile || !enabled) {
      return;
    }

    const referenceEl = ref.current;
    if (!referenceEl) {
      return;
    }

    referenceEl.addEventListener("mousedown", onMouseDown);
    referenceEl.addEventListener("mousemove", onmouseMove);
    referenceEl.addEventListener("mouseup", onMouseUp);
    referenceEl.addEventListener("mouseleave", onMouseUp);

    return () => {
      referenceEl.removeEventListener("mousedown", onMouseDown);
      referenceEl.removeEventListener("mouseleave", onmouseMove);
      referenceEl.removeEventListener("mouseup", onMouseUp);
      referenceEl.removeEventListener("mouseleave", onMouseUp);
    };
  }, [isMobile, ref, enabled]);

  return { element, isMouseDown: isMouseDown.current };
}

export default useDiyMazeByMouseHook;
