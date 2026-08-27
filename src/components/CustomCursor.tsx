import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      rafId = requestAnimationFrame(animateRing);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, label");
      if (interactive) {
        dot.classList.add("cursor-hover");
        ring.classList.add("cursor-hover");
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, label");
      if (interactive) {
        dot.classList.remove("cursor-hover");
        ring.classList.remove("cursor-hover");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor-dot fixed top-0 left-0 z-[10000] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-text-primary mix-blend-difference transition-[width,height,opacity] duration-300"
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-text-primary/40 mix-blend-difference transition-[width,height,border-color] duration-300"
      />
    </>
  );
}
