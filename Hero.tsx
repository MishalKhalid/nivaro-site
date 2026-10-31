import { ArrowRight, Check } from "lucide-react";
import { hero } from "@/data/site";
import { Button } from "./ui/Button";
import { Chip } from "./ui/Chip";
import { Wristband } from "./ui/Wristband";
import { HeroParallax } from "./HeroParallax";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pb-16 pt-[calc(var(--nav-h)+40px)] md:pb-24 md:pt-[calc(var(--nav-h)+72px)]">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div className="max-w-xl">
          <p className="eyebrow mb-6 inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-teal animate-blink-soft" aria-hidden="true" />
            NicoGuard by NIVARO
          </p>
          <h1 id="hero-title" className="text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-6xl lg:text-7xl">
            {hero.titleStart} <span className="text-gradient">{hero.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted md:text-xl">{hero.sub}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="#waitlist" size="lg">
              {hero.primaryCta}
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button href="#how-it-works" variant="ghost" size="lg">
              {hero.secondaryCta}
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2" aria-label="Highlights">
            {hero.chips.map((c) => (
              <li key={c}>
                <Chip>
                  <Check size={14} className="text-teal" aria-hidden="true" />
                  {c}
                </Chip>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[420px] lg:max-w-[460px]">
          <Wristband state="pulse" className="mx-auto w-[78%]" />
          <HeroParallax className="absolute bottom-[10%] left-0 sm:-left-6 lg:-left-16">
            <div className="glass animate-float flex max-w-[260px] items-start gap-3 rounded-2xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <span className="relative mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal/15">
                <span className="h-2 w-2 rounded-full bg-teal" />
              </span>
              <div>
                <p className="text-sm font-medium text-ink">{hero.notification.title}</p>
                <p className="mt-0.5 text-sm text-muted">{hero.notification.body}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted">Just now · Example</p>
              </div>
            </div>
          </HeroParallax>
        </div>
      </div>
    </section>
  );
}
