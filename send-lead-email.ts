import type { WaitlistData } from "./waitlist-schema";

/**
 * Sends the lead notification through Resend's REST API (no extra dependency).
 * Secrets stay server-side: RESEND_API_KEY, LEAD_NOTIFY_EMAIL, RESEND_FROM_EMAIL.
 */
export class EmailNotConfiguredError extends Error {}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export async function sendLeadEmail(lead: WaitlistData, meta: { id: string; createdAt: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL ?? "NIVARO Website <onboarding@resend.dev>";
  if (!apiKey || !to) throw new EmailNotConfiguredError("RESEND_API_KEY or LEAD_NOTIFY_EMAIL is not set");

  const kind = lead.source === "contact" ? "Contact inquiry" : "NicoGuard waitlist signup";
  const rows: [string, string][] = [
    ["Type", kind],
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone || "Not provided"],
    ["Uses", lead.use ?? "Not applicable"],
    ["Audience", lead.audience],
    ["Message", lead.message || "None"],
    ["Received", meta.createdAt],
    ["Reference", meta.id],
  ];

  const html = `<div style="font-family:Arial,sans-serif;max-width:560px">
<h2 style="margin:0 0 12px">New ${escapeHtml(kind)}</h2>
<table style="border-collapse:collapse;width:100%">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px;border-bottom:1px solid #eee;color:#555;width:110px;vertical-align:top">${escapeHtml(k)}</td><td style="padding:8px;border-bottom:1px solid #eee;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>
<p style="color:#777;font-size:12px">Reply to this email to answer ${escapeHtml(lead.name)} directly.</p></div>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((e) => e.trim()).filter(Boolean),
      reply_to: lead.email,
      subject: oneLine(`[NIVARO] New ${kind.toLowerCase()} from ${lead.name}`).slice(0, 150),
      html,
      text,
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend responded ${res.status}: ${detail.slice(0, 200)}`);
  }
}
