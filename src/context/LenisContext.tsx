import { createContext, useContext } from "react";
import type Lenis from "lenis";
import type { LenisScrollTarget } from "../lib/lenis-config";

interface LenisScrollToOptions {
  offset?: number;
  immediate?: boolean;
  duration?: number;
}

interface LenisContextValue {
  lenis: Lenis | null;
  enabled: boolean;
  pause: () => void;
  resume: () => void;
  scrollTo: (target: LenisScrollTarget, options?: LenisScrollToOptions) => void;
}

export const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  enabled: true,
  pause: () => {},
  resume: () => {},
  scrollTo: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}
