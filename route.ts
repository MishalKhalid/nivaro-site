import { NextResponse, type NextRequest } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { EmailNotConfiguredError, sendLeadEmail } from "@/lib/send-lead-email";
import { waitlistSchema, type WaitlistResponse } from "@/lib/waitlist-schema";
import { getWaitlistStorage } from "@/lib/waitlist-storage";

export const runtime = "nodejs";

function json(body: WaitlistResponse, status = 200) {
  return NextResponse.json<WaitlistResponse>(body, { status });
}

/** Strip control characters and angle brackets from free text. */
const clean = (s: string) => s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F<>]/g, "").trim();

/** Forms submitted faster than this are almost certainly bots. */
const MIN_FILL_MS = 2500;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (!rateLimit(ip).allowed) return json({ ok: false, error: "rate_limited" }, 429);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    return json({ ok: false, error: "validation", fieldErrors: parsed.error.flatten().fieldErrors }, 422);
  }
  const data = parsed.data;

  // Spam traps: honeypot filled, or submitted implausibly fast. Pretend success, send nothing.
  if (data.company) return json({ ok: true });
  if (typeof data.startedAt === "number" && Date.now() - data.startedAt < MIN_FILL_MS) return json({ ok: true });

  const lead = { ...data, name: clean(data.name), phone: clean(data.phone), message: clean(data.message) };
  const meta = { id: crypto.randomUUID(), createdAt: new Date().toISOString() };

  // 1. Email notification is the source of truth: if it fails, the visitor must see an error.
  try {
    await sendLeadEmail(lead, meta);
  } catch (err) {
    if (err instanceof EmailNotConfiguredError) {
      console.error("[lead] Email is not configured. Set RESEND_API_KEY and LEAD_NOTIFY_EMAIL. See README.");
    } else {
      console.error("[lead] email error:", err instanceof Error ? err.message : "unknown");
    }
    return json({ ok: false, error: "server" }, 500);
  }

  // 2. Storage is a best-effort backup copy; it must never turn a delivered lead into an error.
  try {
    await getWaitlistStorage().add({
      id: meta.id,
      createdAt: meta.createdAt,
      source: lead.source,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      use: lead.use,
      message: lead.message,
      audience: lead.audience,
    });
  } catch (err) {
    console.warn("[lead] backup storage skipped:", err instanceof Error ? err.message : "unknown");
  }

  return json({ ok: true });
}
