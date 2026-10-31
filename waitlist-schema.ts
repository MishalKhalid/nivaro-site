import { z } from "zod";

export const nicotineUses = ["Cigarettes", "Shisha", "Vape", "Smokeless", "Multiple"] as const;
export const audienceValues = ["individual", "clinic", "investor"] as const;
export const leadSources = ["waitlist", "contact"] as const;

const phone = z
  .string()
  .trim()
  .max(20, "That number looks too long.")
  .refine((v) => v === "" || /^\+?[0-9\s-]{7,20}$/.test(v), "Please enter a valid phone number, or leave it blank.")
  .optional()
  .default("");

/** Shared by the client forms and the /api/waitlist route (waitlist + contact inquiries). */
export const waitlistSchema = z
  .object({
    source: z.enum(leadSources).optional().default("waitlist"),
    name: z
      .string()
      .trim()
      .min(2, "Please enter your name.")
      .max(80, "That name is a little long. Please shorten it."),
    email: z.string().trim().toLowerCase().email("Please enter a valid email address.").max(160),
    phone,
    use: z.enum(nicotineUses, { errorMap: () => ({ message: "Please choose what you use." }) }).optional(),
    message: z.string().trim().max(2000, "Please keep your message under 2,000 characters.").optional().default(""),
    audience: z.enum(audienceValues).optional().default("individual"),
    consent: z.boolean().refine((v) => v, "Please agree so we can contact you."),
    // Honeypot: real people never see or fill this.
    company: z.string().max(200).optional().default(""),
    // Timestamp (ms) set when the form mounted; used to reject instant bot submissions.
    startedAt: z.number().optional(),
  })
  .superRefine((v, ctx) => {
    if (v.source === "waitlist" && !v.use) {
      ctx.addIssue({ code: "custom", path: ["use"], message: "Please choose what you use." });
    }
    if (v.source === "contact" && v.message.length < 10) {
      ctx.addIssue({ code: "custom", path: ["message"], message: "Please tell us a little more (at least 10 characters)." });
    }
  });

export type WaitlistInput = z.input<typeof waitlistSchema>;
export type WaitlistData = z.output<typeof waitlistSchema>;

export type WaitlistResponse =
  | { ok: true }
  | { ok: false; error: "validation"; fieldErrors: Partial<Record<keyof WaitlistData, string[]>> }
  | { ok: false; error: "rate_limited" | "server" | "bad_request" };
