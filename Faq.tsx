"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { faq } from "@/data/faq";
import { cn } from "@/lib/utils";
import { Section } from "./ui/Section";

export function Faq() {
  const [open, setOpen] = useState<Set<string>>(() => new Set([faq[0]?.id ?? ""]));

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <Section id="faq" eyebrow="FAQ" title="Straight answers.">
      <ul className="mx-auto max-w-3xl divide-y divide-line border-y border-line">
        {faq.map((item) => {
          const isOpen = open.has(item.id);
          return (
            <li key={item.id}>
              <h3>
                <button
                  type="button"
                  id={`faq-q-${item.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${item.id}`}
                  onClick={() => toggle(item.id)}
                  className="flex min-h-[64px] w-full items-center justify-between gap-6 py-5 text-left font-display text-lg font-medium text-ink transition-colors hover:text-teal md:text-xl"
                >
                  {item.question}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-[transform,border-color] duration-300",
                      isOpen ? "rotate-45 border-teal/60 text-teal" : "border-[var(--border-strong)] text-muted",
                    )}
                  >
                    <Plus size={18} />
                  </span>
                </button>
              </h3>
              <div
                id={`faq-a-${item.id}`}
                role="region"
                aria-labelledby={`faq-q-${item.id}`}
                hidden={!isOpen}
                className="pb-6 pr-14 text-base leading-relaxed text-muted"
              >
                {item.answer}
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
