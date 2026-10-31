import { Activity, BatteryFull, Hand, LineChart, Repeat, Share2, Sparkles, TrendingDown, type LucideIcon } from "lucide-react";
import { features, featuresCopy, type FeatureVisual } from "@/data/features";
import { cn } from "@/lib/utils";
import { GradientCard } from "./ui/GradientCard";
import { PulseRings } from "./ui/PulseRings";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

const ICONS: Record<FeatureVisual, LucideIcon> = {
  prediction: LineChart,
  gesture: Hand,
  haptic: Activity,
  taper: TrendingDown,
  streak: Sparkles,
  share: Share2,
  forms: Repeat,
  battery: BatteryFull,
};

const SPAN: Record<"lg" | "md" | "sm", string> = {
  lg: "md:col-span-2 lg:col-span-2 lg:row-span-2",
  md: "md:col-span-2 lg:col-span-2",
  sm: "md:col-span-1 lg:col-span-1",
};

export function Features() {
  return (
    <Section id="product" eyebrow={featuresCopy.eyebrow} title={featuresCopy.title} intro={featuresCopy.intro}>
      <ul className="grid grid-flow-dense gap-4 md:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => {
          const Icon = ICONS[f.visual];
          return (
            <Reveal as="li" key={f.id} delay={(i % 4) * 60} className={SPAN[f.size]}>
              <GradientCard highlight={f.highlight} surface={f.highlight ? 1 : 2} className="flex h-full flex-col p-6 md:p-7">
                <div className={cn("relative mb-6 flex items-center", f.size === "lg" ? "min-h-[180px] lg:min-h-[260px]" : "min-h-[88px]")}>
                  <Micro visual={f.visual} />
                </div>
                <div className="mt-auto">
                  <h3 className="flex items-center gap-2.5 text-lg font-semibold text-ink md:text-xl">
                    <Icon size={18} className="shrink-0 text-teal" aria-hidden="true" />
                    {f.title}
                  </h3>
                  <p className={cn("mt-2 leading-relaxed text-muted", f.size === "lg" ? "text-base md:text-lg" : "text-sm md:text-base")}>
                    {f.body}
                  </p>
                </div>
              </GradientCard>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

function Micro({ visual }: { visual: FeatureVisual }) {
  switch (visual) {
    case "prediction":
      return (
        <svg viewBox="0 0 320 160" className="w-full" aria-hidden="true">
          <defs>
            <linearGradient id="pred-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2DE2C8" stopOpacity="0.35" />
              <stop offset="1" stopColor="#2DE2C8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="164" y="8" width="104" height="140" rx="10" fill="rgba(139,92,246,0.12)" stroke="rgba(167,139,250,0.4)" strokeDasharray="4 4" />
          <text x="216" y="26" textAnchor="middle" fontSize="9" fill="#A78BFA" fontFamily="var(--font-mono)">
            LIKELY WINDOW
          </text>
          {[40, 80, 120].map((y) => (
            <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="rgba(255,255,255,0.05)" />
          ))}
          <path d="M0 130 C40 128 60 110 90 112 S140 120 170 90 S210 40 232 60 S280 120 320 118 V160 H0Z" fill="url(#pred-fill)" />
          <path
            d="M0 130 C40 128 60 110 90 112 S140 120 170 90 S210 40 232 60 S280 120 320 118"
            fill="none"
            stroke="#2DE2C8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="218" cy="50" r="5" fill="#2DE2C8" />
          <circle cx="218" cy="50" r="12" fill="none" stroke="#2DE2C8" strokeOpacity="0.4" />
        </svg>
      );
    case "gesture":
      return (
        <svg viewBox="0 0 200 90" className="h-[88px] w-full max-w-[260px]" aria-hidden="true">
          <path id="g-arc" d="M20 80 Q60 0 170 24" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeDasharray="3 5" />
          <circle r="6" fill="#2DE2C8">
            <animateMotion dur="3s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.7;1" calcMode="linear">
              <mpath href="#g-arc" />
            </animateMotion>
          </circle>
          <circle cx="170" cy="24" r="10" fill="none" stroke="#A78BFA" strokeOpacity="0.6" />
        </svg>
      );
    case "haptic":
      return (
        <div className="relative flex h-[88px] w-full items-center gap-6">
          <span className="relative h-20 w-20 shrink-0">
            <PulseRings intensity={2} duration={2.2} />
            <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal shadow-glow-teal" />
          </span>
          <svg viewBox="0 0 160 40" className="h-10 flex-1" aria-hidden="true">
            <path d="M0 20 Q10 4 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20" fill="none" stroke="#2DE2C8" strokeOpacity="0.7" strokeWidth="2" />
          </svg>
        </div>
      );
    case "taper":
      return (
        <div className="flex h-[88px] items-end gap-2" aria-hidden="true">
          {[8, 7, 6, 5, 4].map((n, i) => (
            <div key={n} className="flex flex-col items-center gap-1">
              <div className={cn("w-6 rounded-md", i === 2 ? "bg-teal" : "bg-white/15")} style={{ height: `${n * 8}px` }} />
              <span className="font-mono text-[10px] text-muted">{n}</span>
            </div>
          ))}
        </div>
      );
    case "streak":
      return (
        <div className="grid grid-cols-7 gap-1.5" aria-hidden="true">
          {Array.from({ length: 14 }, (_, i) => (
            <span key={i} className={cn("h-5 w-5 rounded-md", i < 12 ? "bg-teal/80" : "bg-white/10", i === 11 && "shadow-glow-teal")} />
          ))}
        </div>
      );
    case "share":
      return (
        <div className="flex items-center gap-3" aria-hidden="true">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal/15 font-mono text-xs text-teal">You</span>
          <span className="h-px w-12 border-t border-dashed border-white/30" />
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-violet/20 font-mono text-xs text-[var(--violet-text)]">Dr</span>
          <span className="ml-2 rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
            Opt-in
          </span>
        </div>
      );
    case "forms":
      return (
        <ul className="flex flex-wrap gap-2" aria-label="Supported products">
          {["Cigarettes", "Shisha", "Vapes", "Naswar", "Gutka", "Smokeless"].map((p) => (
            <li key={p} className="rounded-full border border-[var(--border-strong)] bg-white/[0.03] px-3 py-1.5 text-xs text-ink/85">
              {p}
            </li>
          ))}
        </ul>
      );
    case "battery":
      return (
        <div className="flex items-center" aria-hidden="true">
          <div className="flex h-12 w-28 gap-1 rounded-xl border-2 border-white/20 p-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={cn("flex-1 rounded-md", i < 3 ? "bg-teal" : "bg-teal/25")} />
            ))}
          </div>
          <span className="ml-0.5 h-5 w-1.5 rounded-r-md bg-white/20" />
        </div>
      );
  }
}
