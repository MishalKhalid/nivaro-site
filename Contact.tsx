"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, Loader2, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { contact } from "@/data/site";
import { cn } from "@/lib/utils";
import { waitlistSchema, type WaitlistInput, type WaitlistResponse } from "@/lib/waitlist-schema";
import { Button } from "./ui/Button";
import { GradientCard } from "./ui/GradientCard";

const inputBase =
  "mt-2 block min-h-[48px] w-full rounded-2xl border bg-bg/70 px-4 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-teal/70 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "success" | "error" | "rate_limited">("idle");
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { source: "contact", name: "", email: "", phone: "", message: "", audience: "individual", consent: false, company: "" },
    mode: "onTouched",
  });

  useEffect(() => {
    setValue("startedAt", Date.now());
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
      <p id={`ct-${name}-error`} className="mt-2 text-sm text-[#FF9C9C]">
        {msg}
      </p>
    ) : null;
  };
  const aria = (name: keyof WaitlistInput) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `ct-${name}-error` : undefined,
  });
  const border = (name: keyof WaitlistInput) => (errors[name] ? "border-[#FF9C9C]/70" : "border-[var(--border-strong)]");

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad relative">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-4">{contact.eyebrow}</p>
            <h2 id="contact-title" className="text-3xl font-semibold leading-[1.1] text-ink sm:text-4xl md:text-5xl">
              {contact.title}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted md:text-lg">{contact.intro}</p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-8 inline-flex min-h-[44px] items-center gap-3 rounded-full border border-line px-5 text-ink transition-colors hover:border-teal/50 hover:text-teal"
            >
              <Mail size={18} aria-hidden="true" />
              {contact.email}
            </a>
          </div>

          <GradientCard surface={1} className="p-6 sm:p-8">
            {status === "success" ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center text-center" role="status" aria-live="polite">
                <CheckCircle2 size={48} className="text-teal" aria-hidden="true" />
                <h3 className="mt-6 text-2xl font-semibold text-ink">{contact.success.title}</h3>
                <p className="mt-3 max-w-sm text-muted">{contact.success.body}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5" aria-describedby="contact-status">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="ct-name" className="text-sm font-medium text-ink">
                      Name
                    </label>
                    <input id="ct-name" type="text" autoComplete="name" className={cn(inputBase, border("name"))} {...aria("name")} {...register("name")} />
                    {fieldError("name")}
                  </div>
                  <div>
                    <label htmlFor="ct-email" className="text-sm font-medium text-ink">
                      Email
                    </label>
                    <input
                      id="ct-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      className={cn(inputBase, border("email"))}
                      {...aria("email")}
                      {...register("email")}
                    />
                    {fieldError("email")}
                  </div>
                </div>
                <div>
                  <label htmlFor="ct-phone" className="text-sm font-medium text-ink">
                    Phone <span className="font-normal text-muted">(optional)</span>
                  </label>
                  <input
                    id="ct-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+92 3XX XXXXXXX"
                    className={cn(inputBase, border("phone"))}
                    {...aria("phone")}
                    {...register("phone")}
                  />
                  {fieldError("phone")}
                </div>
                <div>
                  <label htmlFor="ct-message" className="text-sm font-medium text-ink">
                    How can we help?
                  </label>
                  <textarea
                    id="ct-message"
                    rows={5}
                    className={cn(inputBase, "min-h-[140px] resize-y py-3", border("message"))}
                    {...aria("message")}
                    {...register("message")}
                  />
                  {fieldError("message")}
                </div>

                {/* Honeypot: hidden from people and assistive tech */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="ct-company">Company</label>
                  <input id="ct-company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
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
                      I agree to NIVARO contacting me about my inquiry. Read our{" "}
                      <a href="/privacy" className="text-ink underline underline-offset-2 hover:text-teal">
                        privacy notice
                      </a>
                      .
                    </span>
                  </label>
                  {fieldError("consent")}
                </div>

                <Button type="submit" size="lg" disabled={isSubmitting} aria-busy={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <ArrowRight size={18} aria-hidden="true" />
                    </>
                  )}
                </Button>
                <p id="contact-status" role="status" aria-live="polite" className="min-h-[1.5rem] text-sm text-[#FF9C9C]">
                  {status === "error" && contact.error}
                  {status === "rate_limited" && "Too many attempts. Please wait a minute and try again."}
                </p>
              </form>
            )}
          </GradientCard>
        </div>
      </div>
    </section>
  );
}
