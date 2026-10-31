import { Check } from "lucide-react";
import { appPreview } from "@/data/site";
import { Reveal } from "./ui/Reveal";

// Illustrative data only, not real users.
const CRAVINGS = [
  { h: 8.5, level: 0.55, pulsed: true },
  { h: 11, level: 0.35, pulsed: false },
  { h: 13.5, level: 0.8, pulsed: true },
  { h: 16, level: 0.6, pulsed: true },
  { h: 19, level: 0.9, pulsed: true },
  { h: 22, level: 0.4, pulsed: false },
];

function Timeline() {
  const W = 260;
  const H = 90;
  const x = (h: number) => ((h - 7) / 17) * W;
  const y = (l: number) => H - 10 - l * (H - 24);
  const path = CRAVINGS.reduce((d, c, i) => {
    if (i === 0) return `M0 ${H - 12} L${x(c.h)} ${y(c.level)}`;
    const prev = CRAVINGS[i - 1];
    if (!prev) return d;
    const mx = (x(prev.h) + x(c.h)) / 2;
    return `${d} Q${mx} ${H - 6} ${x(c.h)} ${y(c.level)}`;
  }, "");

  return (
    <svg viewBox={`0 0 ${W} ${H + 14}`} className="w-full" aria-hidden="true">
      <path d={`${path} L${W} ${H - 12}`} fill="none" stroke="rgba(167,139,250,0.7)" strokeWidth="1.8" strokeLinejoin="round" />
      {CRAVINGS.map((c) =>
        c.pulsed ? (
          <g key={c.h}>
            <circle cx={x(c.h)} cy={y(c.level)} r="7" fill="none" stroke="#2DE2C8" strokeOpacity="0.4" />
            <circle cx={x(c.h)} cy={y(c.level)} r="3.5" fill="#2DE2C8" />
          </g>
        ) : (
          <circle key={c.h} cx={x(c.h)} cy={y(c.level)} r="3" fill="#8B98A5" />
        ),
      )}
      {["8am", "12pm", "4pm", "8pm"].map((t, i) => (
        <text key={t} x={x(8 + i * 4)} y={H + 12} fontSize="9" fill="#8B98A5" textAnchor="middle" fontFamily="var(--font-mono)">
          {t}
        </text>
      ))}
    </svg>
  );
}

function Phone() {
  const c = 2 * Math.PI * 40;
  return (
    <figure className="relative mx-auto w-[300px] max-w-full">
      <div
        aria-hidden="true"
        className="absolute inset-x-6 bottom-0 top-16 rounded-[48px] opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle at 50% 40%, rgba(45,226,200,0.3), rgba(139,92,246,0.2) 60%, transparent)" }}
      />
      <div className="relative rounded-[48px] border border-white/10 bg-gradient-to-b from-[#1A222D] to-[#0B0F14] p-2.5 shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
        <div className="relative overflow-hidden rounded-[40px] bg-[#06090D] px-5 pb-6 pt-10" aria-hidden="true">
          <span className="absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
          <div className="flex items-center justify-between">
            <p className="font-display text-lg font-semibold text-ink">Today</p>
            <span className="rounded-full bg-teal/15 px-2.5 py-1 font-mono text-[10px] text-teal">Band connected</span>
          </div>

          <div className="mt-4 rounded-2xl border border-line bg-surface-1 p-3.5">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-medium text-ink">Craving windows</p>
              <p className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-teal" /> pulse sent
              </p>
            </div>
            <Timeline />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="flex flex-col items-center rounded-2xl border border-line bg-surface-1 p-3">
              <div className="relative">
                <svg viewBox="0 0 100 100" className="h-20 w-20 -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="url(#ring-g)" strokeWidth="9" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * 0.4} />
                  <defs>
                    <linearGradient id="ring-g">
                      <stop stopColor="#2DE2C8" />
                      <stop offset="1" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-mono text-2xl font-semibold text-ink">12</span>
              </div>
              <p className="mt-1 text-center text-[11px] text-muted">days smoke-free</p>
            </div>
            <div className="flex flex-col justify-between rounded-2xl border border-line bg-surface-1 p-3">
              <p className="text-[11px] text-muted">Taper plan</p>
              <p className="font-mono text-lg font-semibold text-ink">
                8 <span className="text-teal">→</span> 6
              </p>
              <p className="text-[11px] leading-tight text-muted">This week, per day</p>
              <div className="mt-2 h-1.5 rounded-full bg-white/10">
                <div className="h-full w-3/5 rounded-full bg-teal" />
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-teal/25 bg-teal/[0.06] p-3">
            <span className="h-2 w-2 rounded-full bg-teal" />
            <p className="text-xs text-ink">4 cravings ridden out today</p>
          </div>
        </div>
      </div>
      <figcaption className="mt-5 text-center font-mono text-xs uppercase tracking-widest text-muted">
        {appPreview.label} · sample data
      </figcaption>
    </figure>
  );
}

export function AppPreview() {
  return (
    <section id="app" aria-labelledby="app-title" className="section-pad relative">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2">
        <div className="max-w-lg">
          <p className="eyebrow mb-4">{appPreview.eyebrow}</p>
          <h2 id="app-title" className="text-3xl font-semibold leading-[1.1] text-ink sm:text-4xl md:text-5xl">
            {appPreview.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{appPreview.intro}</p>
          <ul className="mt-8 space-y-4">
            {appPreview.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-ink">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/15">
                  <Check size={14} className="text-teal" aria-hidden="true" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <Reveal>
          <Phone />
          <p className="sr-only">
            Illustrative app screen with sample data: a craving timeline for one day with pulses marked, a ring showing 12 days
            smoke-free, and a taper plan going from 8 to 6 per day this week.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
