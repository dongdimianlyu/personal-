import { useEffect, useRef } from "react";

interface CustomCursorProps {
  disabled?: boolean;
}

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, textarea, select, label, summary";

export function CustomCursor({ disabled = false }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!cursor || !dot || !ring) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isCoarsePointer = window.matchMedia("(hover: none) and (pointer: coarse)")
      .matches;

    if (prefersReducedMotion || isCoarsePointer) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let ringX = targetX;
    let ringY = targetY;
    let isVisible = false;
    let isHovering = false;
    let isPressing = false;
    let rafId = 0;

    const setState = (hover: boolean, press: boolean) => {
      isHovering = hover;
      isPressing = press;
      cursor.dataset.hover = hover ? "true" : "false";
      cursor.dataset.press = press ? "true" : "false";
    };

    const show = () => {
      if (!isVisible) {
        isVisible = true;
        cursor.dataset.visible = "true";
      }
    };

    const hide = () => {
      isVisible = false;
      cursor.dataset.visible = "false";
      setState(false, false);
    };

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      show();
    };

    const onMouseDown = () => setState(isHovering, true);
    const onMouseUp = () => setState(isHovering, false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(INTERACTIVE_SELECTOR)) {
        setState(true, isPressing);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(INTERACTIVE_SELECTOR)) {
        setState(false, isPressing);
      }
    };

    const onMouseLeave = () => hide();

    const animate = () => {
      const dotEase = isHovering ? 0.28 : 0.38;
      const ringEase = isHovering ? 0.14 : 0.18;

      currentX += (targetX - currentX) * dotEase;
      currentY += (targetY - currentY) * dotEase;
      ringX += (targetX - ringX) * ringEase;
      ringY += (targetY - ringY) * ringEase;

      dot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

      rafId = requestAnimationFrame(animate);
    };

    document.body.classList.add("custom-cursor-active");
    rafId = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [disabled]);

  if (disabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      data-visible="false"
      data-hover="false"
      data-press="false"
      className="custom-cursor fixed inset-0 z-[10000] pointer-events-none"
    >
      <div ref={ringRef} className="custom-cursor__ring" />
      <div ref={dotRef} className="custom-cursor__dot" />
    </div>
  );
}
