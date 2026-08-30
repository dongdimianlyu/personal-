export const PREMIUM_EASE = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export const MAIN_LENIS_OPTIONS = {
  lerp: 0.08,
  smoothWheel: true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.15,
  syncTouch: true,
  autoResize: true,
} as const;

export const READER_LENIS_OPTIONS = {
  lerp: 0.1,
  smoothWheel: true,
  wheelMultiplier: 0.85,
  touchMultiplier: 1.1,
  syncTouch: true,
  autoResize: true,
} as const;

export const SCROLL_TO_OPTIONS = {
  duration: 1.6,
  easing: PREMIUM_EASE,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export type LenisScrollTarget = string | number | HTMLElement;

export function resolveScrollTarget(target: LenisScrollTarget): LenisScrollTarget {
  if (typeof target === "string" && target.startsWith("#")) {
    const element = document.querySelector(target);
    if (element instanceof HTMLElement) return element;
  }
  return target;
}
