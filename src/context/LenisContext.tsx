import { createContext, useContext } from "react";
import type Lenis from "lenis";

interface LenisContextValue {
  lenis: Lenis | null;
  pause: () => void;
  resume: () => void;
}

export const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  pause: () => {},
  resume: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}
