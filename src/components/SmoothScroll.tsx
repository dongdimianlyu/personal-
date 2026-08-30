import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { LenisContext } from "../context/LenisContext";

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      duration: 2.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    lenisRef.current = instance;
    setLenis(instance);

    let rafId: number;
    const raf = (time: number) => {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    document.documentElement.classList.add("lenis", "lenis-smooth");

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      lenis,
      pause: () => lenisRef.current?.stop(),
      resume: () => lenisRef.current?.start(),
    }),
    [lenis]
  );

  return (
    <LenisContext.Provider value={contextValue}>{children}</LenisContext.Provider>
  );
}
