import { ExternalLink } from "lucide-react";
import { stats, statsCopy } from "@/data/stats";
import { CountUp } from "./CountUp";
import { GradientCard } from "./ui/GradientCard";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

export function StatsSection() {
  return (
    <Section id="problem" eyebrow={statsCopy.eyebrow} title={statsCopy.title} intro={statsCopy.intro}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s, i) => (
          <Reveal key={s.id} delay={60 * (i % 3)}>
            <GradientCard surface={1} className="flex h-full flex-col justify-between gap-6 p-6 md:p-7">
              <div>
                <p className="font-mono text-4xl font-medium leading-none text-teal md:text-5xl">
                  {s.fixedText ? (
                    s.fixedText
                  ) : (
                    <CountUp value={s.value} decimals={s.display.decimals} prefix={s.display.prefix} suffix={s.display.suffix} />
                  )}
                </p>
                <p className="mt-4 text-base leading-snug text-ink">{s.label}</p>
                {s.display.note && <p className="mt-1 font-mono text-xs text-muted">{s.display.note}</p>}
              </div>
              <p className="border-t border-line pt-4 text-xs leading-relaxed text-muted">
                <a
                  href={s.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-1.5 text-ink/80 underline-offset-2 hover:text-teal hover:underline"
                >
                  <span>{s.sourceName}</span>
                  <ExternalLink size={12} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <span className="mt-1 block font-mono">Published {s.published}</span>
              </p>
            </GradientCard>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 max-w-3xl font-mono text-xs leading-relaxed text-muted">{statsCopy.note}</p>
    </Section>
  );
}
