"use client";

import { Zap } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { demo, type PatternId } from "@/data/site";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import { GradientCard } from "./ui/GradientCard";
import { PulseRings } from "./ui/PulseRings";
import { Section } from "./ui/Section";

type Phase = "idle" | "rising" | "pulse" | "calm";

const METER: Record<Phase, number> = { idle: 12, rising: 86, pulse: 60, calm: 14 };
const W = 400;
const H = 80;

/** One period of each waveform, repeated across the width. */
function wavePath(pattern: PatternId): string {
  const mid = H / 2;
  const pts: string[] = [];
  for (let x = 0; x <= W; x += 2) {
    let y = mid;
    if (pattern === "calm") {
      y = mid - Math.sin((x / W) * Math.PI * 4) * 26;
    } else if (pattern === "focus") {
      const p = x % 100;
      const bump = (c: number) => Math.exp(-Math.pow((p - c) / 5, 2));
      y = mid - (bump(20) + bump(40)) * 30;
    } else {
      const step = Math.floor(x / 50) % 2 === 0 ? 1 : -0.25;
      y = mid - step * 18;
    }
    pts.push(`${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

export function CravingDemo() {
  const [pattern, setPattern] = useState<PatternId>("calm");
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<number[]>([]);
  const groupId = useId();
  const path = useMemo(() => wavePath(pattern), [pattern]);
  const selected = demo.patterns.find((p) => p.id === pattern) ?? demo.patterns[0];

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const run = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    setPhase("rising");
    timers.current = [
      window.setTimeout(() => {
        setPhase("pulse");
        if (typeof navigator !== "undefined" && "vibrate" in navigator) {
          navigator.vibrate([...selected.vibrate]);
        }
      }, 1800),
      window.setTimeout(() => setPhase("calm"), 4400),
    ];
  };

  const busy = phase === "rising" || phase === "pulse";
  const statusText =
    phase === "idle" ? demo.status.idle : phase === "rising" ? demo.status.rising : phase === "pulse" ? demo.status.pulse : demo.status.calm;

  return (
    <Section id="demo" eyebrow={demo.eyebrow} title={demo.title} intro={demo.intro}>
      <GradientCard highlight className="p-5 sm:p-8 md:p-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          {/* left: device + meter */}
          <div className="flex items-center gap-8">
            <div className="relative flex aspect-square w-36 shrink-0 items-center justify-center sm:w-44">
              <div
                className={cn(
                  "absolute inset-0 transition-opacity duration-500",
                  phase === "pulse" ? "opacity-100" : "opacity-0",
                )}
              >
                <PulseRings intensity={3} duration={1.4} paused={phase !== "pulse"} />
              </div>
              <div
                className={cn(
                  "relative flex h-24 w-20 items-center justify-center rounded-[28px] border bg-gradient-to-br from-[#2A3542] to-[#0B0F14] transition-shadow duration-500 sm:h-28 sm:w-24",
                  phase === "pulse" ? "border-teal/60 shadow-glow-teal" : "border-white/10",
                )}
                aria-hidden="true"
              >
                <span
                  className={cn(
                    "h-3 w-3 rounded-full transition-colors duration-500",
                    phase === "rising" ? "bg-[var(--violet-text)]" : phase === "idle" ? "bg-white/30" : "bg-teal",
                  )}
                />
              </div>
            </div>

            <div className="flex-1">
              <p id={`${groupId}-meter`} className="font-mono text-xs uppercase tracking-widest text-muted">
                Craving level
              </p>
              <div
                role="meter"
                aria-labelledby={`${groupId}-meter`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={METER[phase]}
                className="mt-3 h-3 overflow-hidden rounded-full bg-white/[0.06]"
              >
                <div
                  className="h-full origin-left rounded-full transition-transform ease-out"
                  style={{
                    transform: `scaleX(${METER[phase] / 100})`,
                    transitionDuration: phase === "rising" ? "1700ms" : "1200ms",
                    background:
                      phase === "rising" || phase === "pulse"
                        ? "linear-gradient(90deg, var(--teal), var(--violet))"
                        : "var(--teal)",
                  }}
                />
              </div>
              <p className="mt-4 flex items-center gap-2 font-display text-2xl font-medium text-ink" aria-live="polite" aria-atomic="true">
                <span
                  aria-hidden="true"
                  className={cn("h-2 w-2 rounded-full", phase === "rising" ? "bg-[var(--violet-text)]" : "bg-teal")}
                />
                {statusText}
              </p>
            </div>
          </div>

          {/* right: controls + waveform */}
          <div>
            <fieldset>
              <legend className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">Pulse pattern</legend>
              <div className="flex flex-wrap gap-2">
                {demo.patterns.map((p) => (
                  <label
                    key={p.id}
                    className={cn(
                      "relative inline-flex min-h-[44px] cursor-pointer items-center rounded-full border px-5 text-sm transition-colors",
                      "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-teal",
                      pattern === p.id ? "border-teal/60 bg-teal/10 text-ink" : "border-[var(--border-strong)] text-muted hover:text-ink",
                    )}
                  >
                    <input
                      type="radio"
                      name={`${groupId}-pattern`}
                      value={p.id}
                      checked={pattern === p.id}
                      onChange={() => setPattern(p.id)}
                      className="sr-only"
                    />
                    {p.label}
                  </label>
                ))}
              </div>
              <p className="mt-2 text-sm text-muted">{selected.hint}</p>
            </fieldset>

            <div className="relative mt-6 overflow-hidden rounded-2xl border border-line bg-bg/60 p-4">
              <p className="sr-only">
                Waveform of the {selected.label} vibration pattern: {selected.hint.toLowerCase()}.
              </p>
              <div aria-hidden="true" className="h-20 overflow-hidden">
                <div
                  className="flex h-full w-[200%] motion-reduce:!animate-none"
                  style={{ animation: phase === "pulse" ? "wave-scroll 1.6s linear infinite" : "none" }}
                >
                  {[0, 1].map((k) => (
                    <svg key={k} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-full w-1/2">
                      <path
                        d={path}
                        fill="none"
                        stroke={phase === "pulse" ? "var(--teal)" : "rgba(230,237,243,0.35)"}
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                        className="transition-[stroke] duration-500"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button onClick={run} disabled={busy} size="lg" aria-describedby={`${groupId}-disc`}>
                <Zap size={18} aria-hidden="true" />
                {phase === "calm" ? "Try again" : demo.button}
              </Button>
              <p id={`${groupId}-disc`} className="text-sm text-muted">
                {demo.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </GradientCard>
    </Section>
  );
}
