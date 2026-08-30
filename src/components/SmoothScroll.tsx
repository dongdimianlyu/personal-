import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { useLenisRaf } from "../hooks/useLenisRaf";
import {
  MAIN_LENIS_OPTIONS,
  prefersReducedMotion,
  resolveScrollTarget,
  SCROLL_TO_OPTIONS,
} from "../lib/lenis-config";
import { LenisContext } from "../context/LenisContext";

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setEnabled(false);
      return;
    }

    const instance = new Lenis(MAIN_LENIS_OPTIONS);
    lenisRef.current = instance;
    setLenis(instance);

    document.documentElement.classList.add("lenis", "lenis-smooth");

    return () => {
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, []);

  useLenisRaf(enabled ? lenis : null);

  const contextValue = useMemo(
    () => ({
      lenis,
      enabled,
      pause: () => lenisRef.current?.stop(),
      resume: () => lenisRef.current?.start(),
      scrollTo: (
        target: Parameters<typeof resolveScrollTarget>[0],
        options?: { offset?: number; immediate?: boolean; duration?: number }
      ) => {
        const instance = lenisRef.current;
        if (!instance) {
          const resolved = resolveScrollTarget(target);
          if (typeof resolved === "number") {
            window.scrollTo({ top: resolved, behavior: "smooth" });
          } else if (resolved instanceof HTMLElement) {
            resolved.scrollIntoView({ behavior: "smooth" });
          }
          return;
        }

        instance.scrollTo(resolveScrollTarget(target), {
          ...SCROLL_TO_OPTIONS,
          ...options,
        });
      },
    }),
    [lenis, enabled]
  );

  return (
    <LenisContext.Provider value={contextValue}>{children}</LenisContext.Provider>
  );
}
