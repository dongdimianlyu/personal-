import { useEffect, useState, type CSSProperties } from "react";
import type { ReaderTheme } from "../../data/reader-themes";
import { prefersReducedMotion } from "../../lib/lenis-config";
import {
  ColumnCapital,
  ColumnFlute,
  MotifOrnament,
} from "./ReaderOrnaments";

interface ReaderChromeProps {
  theme: ReaderTheme;
  scrollProgress: number;
}

export function ReaderChrome({ theme, scrollProgress }: ReaderChromeProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(prefersReducedMotion());
  }, []);

  const parallaxY = reduceMotion ? 0 : (scrollProgress - 0.5) * 48;
  const parallaxLeft = reduceMotion ? 0 : scrollProgress * -24;
  const parallaxRight = reduceMotion ? 0 : scrollProgress * 24;

  return (
    <div
      className="reader-vignette reader-grain pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
      style={{ "--reader-scroll": scrollProgress } as CSSProperties}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--surface)/0.15)_0%,transparent_70%)]" />

      {/* Left salon column */}
      <div
        className="reader-ornament-parallax hidden xl:block absolute left-[4%] top-24 text-text-primary/10"
        style={{ transform: `translateY(${parallaxLeft}px)` }}
      >
        <ColumnCapital className="w-10 h-auto mb-2" />
        <ColumnFlute className="w-6 h-64 mx-auto" />
      </div>

      {/* Right salon column */}
      <div
        className="reader-ornament-parallax hidden xl:block absolute right-[4%] top-32 text-text-primary/10"
        style={{ transform: `translateY(${parallaxRight}px)` }}
      >
        <ColumnCapital className="w-10 h-auto mb-2 ml-auto" />
        <ColumnFlute className="w-6 h-64 mx-auto" />
      </div>

      {/* Per-essay motif */}
      <div
        className="reader-ornament-parallax hidden xl:flex absolute right-[12%] top-[18%] text-text-primary/[0.07]"
        style={{ transform: `translateY(${parallaxY}px)` }}
      >
        <MotifOrnament motif={theme.motif} className="w-20 h-auto" />
      </div>
    </div>
  );
}
