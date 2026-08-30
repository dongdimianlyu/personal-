import type { ReaderMotif } from "../../data/reader-themes";

interface OrnamentProps {
  className?: string;
}

export function ColumnCapital({ className }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 48 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M8 4h32v8c0 6-4 10-10 10H18c-6 0-10-4-10-10V4z"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <path
        d="M12 22c6 2 18 2 24 0M14 30c5 1.5 15 1.5 20 0M16 38c4 1 12 1 16 0"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.6"
      />
      <path d="M24 44v72" stroke="currentColor" strokeWidth="0.75" />
      <path
        d="M18 52h12M17 64h14M18 76h12M17 88h14M18 100h12"
        stroke="currentColor"
        strokeWidth="0.4"
        opacity="0.35"
      />
      <path d="M14 116h20" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

export function ColumnFlute({ className }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 24 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <line x1="12" y1="0" x2="12" y2="400" stroke="currentColor" strokeWidth="0.5" />
      <path
        d="M8 0v400M16 0v400"
        stroke="currentColor"
        strokeWidth="0.35"
        opacity="0.4"
      />
      {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((y) => (
        <ellipse
          key={y}
          cx="12"
          cy={y}
          rx="5"
          ry="1.5"
          stroke="currentColor"
          strokeWidth="0.35"
          opacity="0.25"
        />
      ))}
    </svg>
  );
}

export function SectionFleuron({ className }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 32 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M16 8c-3 0-5-2-5-4s2-4 5-4 5 2 5 4-2 4-5 4z"
        stroke="currentColor"
        strokeWidth="0.6"
      />
      <path
        d="M4 8c2-1 4-2 6-2M28 8c-2-1-4-2-6-2"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.5"
      />
      <path
        d="M8 10c2 1 4 2 8 2s6-1 8-2M8 6c2-1 4-2 8-2s6 1 8 2"
        stroke="currentColor"
        strokeWidth="0.4"
        opacity="0.35"
      />
    </svg>
  );
}

export function PullquoteBrackets({ className }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 120 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M8 4v40M8 4h16M8 44h16"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.4"
      />
      <path
        d="M112 4v40M96 4h16M96 44h16"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.4"
      />
    </svg>
  );
}

export function LyreMotif({ className }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 80 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M40 8c-12 0-20 8-20 20 0 14 8 22 20 28 12-6 20-14 20-28 0-12-8-20-20-20z"
        stroke="currentColor"
        strokeWidth="0.6"
      />
      <path
        d="M28 36c4 8 8 16 12 28M52 36c-4 8-8 16-12 28"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.5"
      />
      <path
        d="M24 72h32M20 88h40M18 104h44"
        stroke="currentColor"
        strokeWidth="0.45"
        opacity="0.35"
      />
      {[32, 40, 48, 56].map((x) => (
        <line
          key={x}
          x1={x}
          y1="28"
          x2={x}
          y2="68"
          stroke="currentColor"
          strokeWidth="0.35"
          opacity="0.3"
        />
      ))}
    </svg>
  );
}

export function CelestialMotif({ className }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
      <circle cx="50" cy="50" r="26" stroke="currentColor" strokeWidth="0.45" opacity="0.45" />
      <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="0.4" opacity="0.55" />
      <path
        d="M50 12v76M12 50h76M22 22l56 56M78 22L22 78"
        stroke="currentColor"
        strokeWidth="0.35"
        opacity="0.2"
      />
      <circle cx="50" cy="12" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="88" cy="50" r="1.5" fill="currentColor" opacity="0.35" />
      <circle cx="50" cy="88" r="1.5" fill="currentColor" opacity="0.35" />
      <circle cx="12" cy="50" r="1.5" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

interface MotifOrnamentProps extends OrnamentProps {
  motif: ReaderMotif;
}

export function MotifOrnament({ motif, className }: MotifOrnamentProps) {
  switch (motif) {
    case "music":
      return <LyreMotif className={className} />;
    case "synchronicity":
      return <CelestialMotif className={className} />;
    default:
      return <ColumnCapital className={className} />;
  }
}
