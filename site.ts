export const site = {
  name: "NIVARO",
  product: "NicoGuard",
  tagline: "Rewire your habits.",
  description:
    "NicoGuard by NIVARO is a wearable that senses the moment before the craving wins, and answers with a gentle pulse. Quit smoking, vaping, shisha or naswar on your own terms.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  contactEmail: "hello@nivaro.example", // TODO: replace with your real public inbox
  investorEmail: "investors@nivaro.example", // TODO: replace with a real inbox before launch
};

export const navLinks = [
  { href: "#how-it-works", label: "How it works", id: "how-it-works" },
  { href: "#product", label: "Product", id: "product" },
  { href: "#problem", label: "The Facts", id: "problem" },
  { href: "#contact", label: "Contact", id: "contact" },
  { href: "#roadmap", label: "Roadmap", id: "roadmap" },
  { href: "#faq", label: "FAQ", id: "faq" },
] as const;

export const hero = {
  titleStart: "Rewire your",
  titleAccent: "habits.",
  sub: "NicoGuard is a wearable that senses the moment before the craving wins, and answers with a gentle pulse. Quit on your own terms.",
  primaryCta: "Join the waitlist",
  secondaryCta: "See how it works",
  notification: { title: "Craving window detected", body: "Breathe. Pulse sent." },
  chips: ["Vibration-only haptics", "Works with all nicotine forms", "Built in Pakistan by NIVARO"],
};

export const howItWorks = {
  eyebrow: "How it works",
  title: "Sense. Pulse. Rewire.",
  intro: "Three quiet steps that turn an automatic reach into a moment of choice.",
  steps: [
    {
      id: "sense",
      label: "01 · Sense",
      title: "It notices before you do.",
      body: "Motion (IMU) and heart-rate signals pick up the hand-to-mouth gesture and the stress patterns that often come before a craving.",
    },
    {
      id: "pulse",
      label: "02 · Pulse",
      title: "A gentle pulse, right when it counts.",
      body: "Within seconds, a calming haptic pattern interrupts the loop. No sound, no screen, no one else needs to know.",
    },
    {
      id: "rewire",
      label: "03 · Rewire",
      title: "New habits, built over time.",
      body: "The app builds a personalised taper plan and tracks your cravings, streaks and progress, so each week gets a little easier.",
    },
  ],
} as const;

export type StepId = (typeof howItWorks.steps)[number]["id"];

export const demo = {
  eyebrow: "Try it",
  title: "Feel a craving.",
  intro: "Press the button and watch how NicoGuard answers. Pick the pulse pattern that feels right.",
  button: "Feel a craving",
  disclaimer: "Demo only. Real detection happens on the wristband.",
  patterns: [
    { id: "calm", label: "Calm", hint: "Slow, rolling wave", vibrate: [400, 200, 400, 200, 400] },
    { id: "focus", label: "Focus", hint: "Rhythmic double pulse", vibrate: [120, 80, 120, 400, 120, 80, 120] },
    { id: "ground", label: "Ground", hint: "Low, steady steps", vibrate: [600, 300, 600, 300, 600] },
  ],
  status: {
    idle: "Ready",
    rising: "Craving rising",
    pulse: "Pulse sent",
    calm: "Calm",
  },
} as const;

export type PatternId = (typeof demo.patterns)[number]["id"];

export const appPreview = {
  eyebrow: "The app",
  title: "Your progress, without the pressure.",
  intro:
    "See when cravings show up, how the wristband answered, and how far you have come. Clear numbers, no judgement.",
  label: "Illustrative preview",
  points: [
    "A daily craving timeline with every pulse marked",
    "Streaks that celebrate days, not perfection",
    "A taper plan that adjusts to your week",
  ],
};

export const trust = {
  eyebrow: "Built responsibly",
  title: "Honest about what NicoGuard is.",
  points: [
    {
      title: "A behavioral support tool",
      body: "NicoGuard is a behavioral support tool. It is not a medical device.",
    },
    {
      title: "Not a substitute for care",
      body: "It does not diagnose or treat any condition and is not a substitute for professional care.",
    },
    {
      title: "Validating carefully",
      body: "We are validating NicoGuard with clinical partners. We will share results when they are ready, not before.",
    },
  ],
};

export const waitlist = {
  eyebrow: "Waitlist",
  title: "Be first to rewire.",
  intro: "Join the NicoGuard waitlist for early access and launch news. No spam, ever.",
  uses: ["Cigarettes", "Shisha", "Vape", "Smokeless", "Multiple"] as const,
  success: {
    title: "You're on the list.",
    body: "Thanks for joining. We'll be in touch when NicoGuard is ready for you.",
  },
  error: "Something went wrong on our side. Your details are still here, please try again.",
};

export const footer = {
  groups: [
    {
      title: "Product",
      links: [
        { label: "How it works", href: "#how-it-works" },
        { label: "Features", href: "#product" },
        { label: "Try the demo", href: "#demo" },
        { label: "Roadmap", href: "#roadmap" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Who it's for", href: "#audience" },
        { label: "Built responsibly", href: "#trust" },
        { label: "FAQ", href: "#faq" },
        { label: "Join the waitlist", href: "#waitlist" },
        { label: "Contact us", href: "#contact" },
      ],
    },
  ],
  socials: ["Instagram", "LinkedIn", "X"],
  disclaimer: "NicoGuard is not a medical device and does not provide medical advice.",
};

export const contact = {
  eyebrow: "Contact",
  title: "Talk to NIVARO.",
  intro: "Questions about NicoGuard, pilots for clinics and employers, or partnerships? Send us a message and we will reply by email.",
  email: site.contactEmail,
  success: {
    title: "Message sent.",
    body: "Thank you for contacting NIVARO. We have received your message and will reply by email soon.",
  },
  error: "We could not send your message right now. Your details are still here, please try again in a moment.",
};
