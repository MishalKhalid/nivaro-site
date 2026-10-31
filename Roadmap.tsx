import { roadmap, roadmapCopy } from "@/data/roadmap";
import { cn } from "@/lib/utils";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

export function Roadmap() {
  return (
    <Section id="roadmap" eyebrow={roadmapCopy.eyebrow} title={roadmapCopy.title} intro={roadmapCopy.note}>
      <ol className="relative grid gap-8 md:grid-cols-3 md:gap-6">
        {/* connecting line: vertical on mobile, horizontal on desktop */}
        <span aria-hidden="true" className="absolute bottom-4 left-[11px] top-4 w-px bg-gradient-to-b from-teal via-violet to-white/5 md:hidden" />
        <span aria-hidden="true" className="absolute left-0 right-0 top-[11px] hidden h-px bg-gradient-to-r from-teal via-violet to-white/5 md:block" />
        {roadmap.map((r, i) => (
          <Reveal as="li" key={r.id} delay={i * 100} className="relative pl-10 md:pl-0 md:pt-12">
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border bg-bg",
                i === 0 ? "border-teal" : "border-white/20",
              )}
            >
              <span className={cn("h-2 w-2 rounded-full", i === 0 ? "bg-teal shadow-glow-teal" : "bg-white/30")} />
            </span>
            <div className="flex items-center gap-3">
              <p className="font-mono text-sm uppercase tracking-[0.18em] text-teal">{r.phase}</p>
              <span className="rounded-full border border-[var(--border-strong)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                {roadmapCopy.status}
              </span>
            </div>
            <h3 className="mt-3 text-xl font-semibold text-ink md:text-2xl">{r.title}</h3>
            <p className="mt-2 text-muted">{r.body}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
