"use client";

import { useEffect, useRef } from "react";

/** Desktop-only soft glow that follows the pointer. One element, rAF-throttled. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!fine || reduce || !el) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${x - 200}px, ${y - 200}px, 0)`;
        el.style.opacity = "1";
        frame = 0;
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[400px] w-[400px] rounded-full opacity-0 transition-opacity duration-500 [@media(hover:hover)_and_(pointer:fine)]:block"
      style={{ background: "radial-gradient(circle, rgba(45,226,200,0.07), transparent 65%)" }}
    />
  );
}
