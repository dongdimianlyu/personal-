import { useEffect, useRef } from "react";
import { useLenis } from "../context/LenisContext";

interface ScrollRestorationProps {
  active?: boolean;
}

export function ScrollRestoration({ active = true }: ScrollRestorationProps) {
  const { scrollTo } = useLenis();
  const hasRestored = useRef(false);

  useEffect(() => {
    if (!active || hasRestored.current) return;
    scrollTo(0, { immediate: true });
    hasRestored.current = true;
  }, [active, scrollTo]);

  return null;
}
