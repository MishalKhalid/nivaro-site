"use client";

import { useEffect, useRef, useState } from "react";
import { formatNumber } from "@/lib/utils";

type CountUpProps = { value: number; decimals: number; prefix?: string; suffix?: string; duration?: number };

/**
 * Counts up once when visible. The final value is rendered on the server and used to reserve width,
 * so there is no layout shift; reduced-motion users just see the final value.
 */
export function CountUp({ value, decimals, prefix = "", suffix = "", duration = 1600 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(value);
  const final = `${prefix}${formatNumber(value, decimals)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    // Only animate if it starts below the fold; otherwise keep the final value.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setCurrent(0);
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setCurrent(value * eased);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular relative inline-grid">
      {/* invisible final value reserves the width */}
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {final}
      </span>
      <span aria-hidden="true" className="col-start-1 row-start-1">
        {prefix}
        {formatNumber(current, decimals)}
        {suffix}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  );
}
