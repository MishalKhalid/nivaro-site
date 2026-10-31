"use client";

import { ArrowRight, Check } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { AUDIENCE_EVENT, audienceCopy, audiences, type AudienceId } from "@/data/audience";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import { GradientCard } from "./ui/GradientCard";
import { Section } from "./ui/Section";

export function Audience() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (i: number) => {
    const next = (i + audiences.length) % audiences.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const map: Record<string, () => void> = {
      ArrowRight: () => focusTab(i + 1),
      ArrowDown: () => focusTab(i + 1),
      ArrowLeft: () => focusTab(i - 1),
      ArrowUp: () => focusTab(i - 1),
      Home: () => focusTab(0),
      End: () => focusTab(audiences.length - 1),
    };
    const fn = map[e.key];
    if (fn) {
      e.preventDefault();
      fn();
    }
  };

  const choose = (id: AudienceId) => {
    window.dispatchEvent(new CustomEvent<AudienceId>(AUDIENCE_EVENT, { detail: id }));
  };

  return (
    <Section id="audience" eyebrow={audienceCopy.eyebrow} title={audienceCopy.title}>
      <div role="tablist" aria-label="Audiences" className="mb-6 inline-flex max-w-full flex-wrap gap-1 rounded-[28px] border border-line bg-surface-1 p-1.5">
        {audiences.map((a, i) => (
          <button
            key={a.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            type="button"
            id={`tab-${a.id}`}
            aria-selected={active === i}
            aria-controls={`panel-${a.id}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "min-h-[44px] rounded-full px-5 text-sm font-medium transition-colors",
              active === i ? "bg-white/[0.08] text-ink shadow-[inset_0_0_0_1px_rgba(45,226,200,0.35)]" : "text-muted hover:text-ink",
            )}
          >
            {a.tab}
          </button>
        ))}
      </div>

      {audiences.map((a, i) => (
        <div key={a.id} role="tabpanel" id={`panel-${a.id}`} aria-labelledby={`tab-${a.id}`} hidden={active !== i} tabIndex={0}>
          <GradientCard highlight className="grid gap-10 p-7 md:grid-cols-[1fr_1fr] md:p-10">
            <div>
              <h3 className="text-2xl font-semibold leading-tight text-ink md:text-4xl">{a.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{a.body}</p>
              <div className="mt-8">
                <Button href="#waitlist" onClick={() => choose(a.id)}>
                  {a.cta}
                  <ArrowRight size={16} aria-hidden="true" />
                </Button>
              </div>
            </div>
            <ul className="space-y-4 self-center">
              {a.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 rounded-2xl border border-line bg-surface-2 p-4 text-ink">
                  <Check size={18} className="mt-0.5 shrink-0 text-teal" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </GradientCard>
        </div>
      ))}
    </Section>
  );
}
