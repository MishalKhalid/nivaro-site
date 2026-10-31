import { footer, site } from "@/data/site";
import { Logo } from "./ui/Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line pb-10 pt-16">
      <div className="container-site">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 font-display text-xl text-ink">{site.tagline}</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">NicoGuard is the flagship product of NIVARO. Made in Pakistan.</p>
            <a href={`mailto:${site.contactEmail}`} className="mt-3 inline-flex min-h-[44px] items-center text-sm text-ink/85 transition-colors hover:text-teal">
              {site.contactEmail}
            </a>
            <ul className="mt-6 flex gap-2" aria-label="Social media">
              {footer.socials.map((s) => (
                <li key={s}>
                  <a
                    href="#"
                    aria-label={`NIVARO on ${s} (coming soon)`}
                    className="inline-flex min-h-[44px] items-center rounded-full border border-line px-4 text-sm text-muted transition-colors hover:text-ink"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {footer.groups.map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{g.title}</h2>
              <ul className="mt-4 space-y-1">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="inline-flex min-h-[44px] items-center text-ink/85 transition-colors hover:text-teal">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>{footer.disclaimer}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="/privacy" className="inline-flex min-h-[44px] items-center hover:text-ink">
              Privacy
            </a>
            <a href="/terms" className="inline-flex min-h-[44px] items-center hover:text-ink">
              Terms
            </a>
            <p>© {year} NIVARO. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
