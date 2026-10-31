/** Window event that tells the waitlist form which audience to pre-select. */
export const AUDIENCE_EVENT = "nivaro:audience";

export type AudienceId = "individual" | "clinic" | "investor";

export type AudienceTab = {
  id: AudienceId;
  tab: string;
  title: string;
  body: string;
  bullets: string[];
  cta: string;
};

export const audienceCopy = {
  eyebrow: "Who it's for",
  title: "Built for people. Ready for partners.",
};

export const audiences: AudienceTab[] = [
  {
    id: "individual",
    tab: "For individuals",
    title: "Support that fits your day.",
    body: "Whether you want to cut down or quit completely, NicoGuard works quietly alongside your routine.",
    bullets: [
      "Private by default. Your progress is yours.",
      "Non-judgmental. Slips are data, not failures.",
      "Works with your routine, not against it.",
    ],
    cta: "Join the waitlist",
  },
  {
    id: "clinic",
    tab: "For clinics and employers",
    title: "A behavioral layer for your programme.",
    body: "Add continuous, between-visit support to existing cessation and wellbeing programmes.",
    bullets: [
      "Pilot-ready behavioral support layer.",
      "Anonymised progress views, opt-in only.",
      "Designed to complement professional care.",
    ],
    cta: "Talk to us about a pilot",
  },
  {
    id: "investor",
    tab: "For investors",
    title: "A large, underserved market.",
    body: "Millions of nicotine users in Pakistan, and very little everyday support built for them.",
    bullets: [
      "Large underserved market across all nicotine forms.",
      "Behavioral-first wedge into digital health.",
      "Clear, phased roadmap.",
    ],
    cta: "Request the investor brief",
  },
];
