import { HeartHandshake, ShieldCheck, Stethoscope, type LucideIcon } from "lucide-react";
import { trust } from "@/data/site";
import { GradientCard } from "./ui/GradientCard";
import { Section } from "./ui/Section";

const ICONS: LucideIcon[] = [HeartHandshake, Stethoscope, ShieldCheck];

export function Trust() {
  return (
    <Section id="trust" eyebrow={trust.eyebrow} title={trust.title}>
      <GradientCard surface={1} className="divide-y divide-line md:grid md:grid-cols-3 md:divide-x md:divide-y-0">
        {trust.points.map((p, i) => {
          const Icon = ICONS[i] ?? ShieldCheck;
          return (
            <div key={p.title} className="p-7 md:p-9">
              <Icon size={22} className="text-teal" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
            </div>
          );
        })}
      </GradientCard>
    </Section>
  );
}
