import { useEffect } from "react";
import gsap from "gsap";
import type Lenis from "lenis";

export function useLenisRaf(lenis: Lenis | null) {
  useEffect(() => {
    if (!lenis) return;

    const onRaf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => {
      lenis.resize();
    };

    window.addEventListener("resize", onResize);

    return () => {
      gsap.ticker.remove(onRaf);
      window.removeEventListener("resize", onResize);
    };
  }, [lenis]);
}
