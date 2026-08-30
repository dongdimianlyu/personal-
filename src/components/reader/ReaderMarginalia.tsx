import type { ReaderTheme } from "../../data/reader-themes";

interface ReaderMarginaliaProps {
  theme: ReaderTheme;
  scrollProgress: number;
}

export function ReaderMarginalia({ theme, scrollProgress }: ReaderMarginaliaProps) {
  const progressPercent = Math.round(scrollProgress * 100);

  return (
    <aside
      className="hidden xl:flex flex-col items-end justify-start pt-32 pr-8 pointer-events-none select-none"
      aria-hidden
    >
      <span className="font-display italic text-5xl text-text-primary/10 leading-none mb-6">
        {theme.romanNumeral}
      </span>
      <div className="relative w-px h-32 bg-stroke/60">
        <div
          className="absolute top-0 left-0 w-full accent-gradient origin-top"
          style={{ height: `${Math.max(progressPercent, 2)}%` }}
        />
      </div>
      <span className="mt-3 text-[10px] text-muted/60 uppercase tracking-[0.25em] font-body tabular-nums">
        {progressPercent}%
      </span>
    </aside>
  );
}
