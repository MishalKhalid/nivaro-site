"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AUDIENCE_EVENT, type AudienceId } from "@/data/audience";
import { waitlist } from "@/data/site";
import { cn } from "@/lib/utils";
import { nicotineUses, waitlistSchema, type WaitlistInput, type WaitlistResponse } from "@/lib/waitlist-schema";
import { Button } from "./ui/Button";
import { GradientCard } from "./ui/GradientCard";
import { PulseRings } from "./ui/PulseRings";

const AUDIENCE_NOTE: Record<AudienceId, string> = {
  individual: "",
  clinic: "Signing up as a clinic or employer.",
  investor: "Requesting the investor brief.",
};

const inputBase =
  "mt-2 block min-h-[48px] w-full rounded-2xl border bg-bg/70 px-4 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-teal/70 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal";

export function Waitlist() {
  const [status, setStatus] = useState<"idle" | "success" | "error" | "rate_limited">("idle");
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { source: "waitlist", name: "", email: "", phone: "", message: "", audience: "individual", consent: false, company: "" },
    mode: "onTouched",
  });
  const audience = watch("audience") ?? "individual";

  // Timestamp used server-side to reject instant (bot) submissions.
  useEffect(() => {
    setValue("startedAt", Date.now());
  }, [setValue]);

  useEffect(() => {
    const onAudience = (e: Event) => {
      const id = (e as CustomEvent<AudienceId>).detail;
      setValue("audience", id);
    };
    window.addEventListener(AUDIENCE_EVENT, onAudience);
    return () => window.removeEventListener(AUDIENCE_EVENT, onAudience);
  }, [setValue]);

  const onSubmit = async (data: WaitlistInput) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as WaitlistResponse;
      if (json.ok) {
        setStatus("success");
        return;
      }
      if (json.error === "validation") {
        for (const [field, msgs] of Object.entries(json.fieldErrors)) {
          if (msgs?.[0]) setError(field as keyof WaitlistInput, { message: msgs[0] });
        }
        return;
      }
      setStatus(json.error === "rate_limited" ? "rate_limited" : "error");
    } catch {
      setStatus("error");
    }
  };

  const fieldError = (name: keyof WaitlistInput) => {
    const msg = errors[name]?.message;
    return msg ? (
      <p id={`${name}-error`} className="mt-2 text-sm text-[#FF9C9C]">
        {msg}
      </p>
    ) : null;
  };
  const aria = (name: keyof WaitlistInput, extra?: string) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": [errors[name] ? `${name}-error` : "", extra ?? ""].filter(Boolean).join(" ") || undefined,
  });

  return (
    <section id="waitlist" aria-labelledby="waitlist-title" className="section-pad relative">
      <div className="container-site">
        <GradientCard highlight className="relative grid gap-10 overflow-hidden p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(45,226,200,0.35), transparent 70%)" }}
          />
          <div className="relative">
            <p className="eyebrow mb-4">{waitlist.eyebrow}</p>
            <h2 id="waitlist-title" className="text-4xl font-semibold leading-[1.05] text-ink md:text-6xl">
              Be first to <span className="text-gradient">rewire.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted md:text-lg">{waitlist.intro}</p>
            <div className="relative mt-10 hidden h-40 w-40 lg:block" aria-hidden="true">
              <PulseRings intensity={2} duration={3.2} />
              <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal shadow-glow-teal" />
            </div>
          </div>

          <div className="relative">
            {status === "success" ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center" role="status" aria-live="polite">
                <span className="relative mb-8 flex h-32 w-32 items-center justify-center">
                  <PulseRings intensity={3} duration={2} />
                  <span className="h-4 w-4 rounded-full bg-teal shadow-glow-teal" />
                </span>
                <h3 className="text-2xl font-semibold text-ink md:text-3xl">{waitlist.success.title}</h3>
                <p className="mt-3 max-w-sm text-muted">{waitlist.success.body}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5" aria-describedby="form-status">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-ink">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    className={cn(inputBase, errors.name ? "border-[#FF9C9C]/70" : "border-[var(--border-strong)]")}
                    {...aria("name")}
                    {...register("name")}
                  />
                  {fieldError("name")}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-ink">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      className={cn(inputBase, errors.email ? "border-[#FF9C9C]/70" : "border-[var(--border-strong)]")}
                      {...aria("email")}
                      {...register("email")}
                    />
                    {fieldError("email")}
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-sm font-medium text-ink">
                      Phone <span className="font-normal text-muted">(optional)</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+92 3XX XXXXXXX"
                      className={cn(inputBase, errors.phone ? "border-[#FF9C9C]/70" : "border-[var(--border-strong)]")}
                      {...aria("phone")}
                      {...register("phone")}
                    />
                    {fieldError("phone")}
                  </div>
                </div>

                <div>
                  <label htmlFor="use" className="text-sm font-medium text-ink">
                    What do you use?
                  </label>
                  <select
                    id="use"
                    defaultValue=""
                    className={cn(inputBase, "appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10", errors.use ? "border-[#FF9C9C]/70" : "border-[var(--border-strong)]")}
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238B98A5' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                    }}
                    {...aria("use")}
                    {...register("use")}
                  >
                    <option value="" disabled>
                      Choose one
                    </option>
                    {nicotineUses.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                  {fieldError("use")}
                </div>

                <div>
                  <label htmlFor="wl-message" className="text-sm font-medium text-ink">
                    Anything you'd like us to know <span className="font-normal text-muted">(optional)</span>
                  </label>
                  <textarea
                    id="wl-message"
                    rows={3}
                    className={cn(inputBase, "min-h-[96px] resize-y py-3", errors.message ? "border-[#FF9C9C]/70" : "border-[var(--border-strong)]")}
                    {...aria("message")}
                    {...register("message")}
                  />
                  {fieldError("message")}
                </div>

                <input type="hidden" {...register("audience")} />
                {AUDIENCE_NOTE[audience] && (
                  <p className="rounded-2xl border border-violet/30 bg-violet/10 px-4 py-3 text-sm text-ink">
                    {AUDIENCE_NOTE[audience]}{" "}
                    <button type="button" className="underline underline-offset-2 hover:text-teal" onClick={() => setValue("audience", "individual")}>
                      Change
                    </button>
                  </p>
                )}

                {/* Honeypot: hidden from people and assistive tech */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="company">Company</label>
                  <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
                </div>

                <div>
                  <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-5 w-5 shrink-0 rounded border-[var(--border-strong)] bg-bg accent-[var(--teal)]"
                      {...aria("consent")}
                      {...register("consent")}
                    />
                    <span>
                      I agree to NIVARO contacting me about the NicoGuard waitlist and launch. Read our{" "}
                      <a href="/privacy" className="text-ink underline underline-offset-2 hover:text-teal">
                        privacy notice
                      </a>
                      .
                    </span>
                  </label>
                  {fieldError("consent")}
                </div>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                  <Button type="submit" size="lg" disabled={isSubmitting} aria-busy={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
                        Joining…
                      </>
                    ) : (
                      <>
                        Join the waitlist
                        <ArrowRight size={18} aria-hidden="true" />
                      </>
                    )}
                  </Button>
                </div>
                <p id="form-status" role="status" aria-live="polite" className="min-h-[1.5rem] text-sm text-[#FF9C9C]">
                  {status === "error" && waitlist.error}
                  {status === "rate_limited" && "Too many attempts. Please wait a minute and try again."}
                </p>
              </form>
            )}
          </div>
        </GradientCard>
      </div>
    </section>
  );
}
