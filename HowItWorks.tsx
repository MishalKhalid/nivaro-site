"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { howItWorks, type StepId } from "@/data/site";
import { cn } from "@/lib/utils";
import { Section } from "./ui/Section";
import { Wristband } from "./ui/Wristband";

export function HowItWorks() {
  const [active, setActive] = useState<StepId>("sense");
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.step as StepId);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <Section id="how-it-works" eyebrow={howItWorks.eyebrow} title={howItWorks.title} intro={howItWorks.intro}>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        {/* sticky device, desktop only */}
        <div className="hidden lg:block">
          <div className="sticky top-[calc(var(--nav-h)+48px)] flex h-[calc(100vh-var(--nav-h)-96px)] max-h-[640px] items-center justify-center">
            <div className="relative w-[72%] max-w-[360px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <Wristband state={active} />
                </motion.div>
              </AnimatePresence>
              <ol className="mt-6 flex justify-center gap-2" aria-hidden="true">
                {howItWorks.steps.map((s) => (
                  <li
                    key={s.id}
                    className={cn("h-1.5 rounded-full transition-all duration-500", active === s.id ? "w-8 bg-teal" : "w-3 bg-white/15")}
                  />
                ))}
              </ol>
            </div>
          </div>
        </div>

        <ol className="flex flex-col">
          {howItWorks.steps.map((s, i) => (
            <li
              key={s.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-step={s.id}
              className="flex flex-col justify-center border-t border-line py-10 first:border-t-0 first:pt-0 lg:min-h-[70vh] lg:py-0 lg:first:pt-0"
            >
              <div className="mb-6 w-40 lg:hidden">
                <Wristband state={s.id} rings={s.id === "pulse"} />
              </div>
              <p className={cn("font-mono text-sm uppercase tracking-[0.18em] transition-colors", active === s.id ? "text-teal" : "text-muted")}>
                {s.label}
              </p>
              <h3 className="mt-4 text-2xl font-semibold leading-tight text-ink md:text-4xl">{s.title}</h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted md:text-lg">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
