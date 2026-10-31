export type FeatureVisual = "prediction" | "gesture" | "haptic" | "taper" | "streak" | "share" | "forms" | "battery";

export type Feature = {
  id: string;
  title: string;
  body: string;
  visual: FeatureVisual;
  /** Grid span on large screens. */
  size: "lg" | "md" | "sm";
  highlight?: boolean;
};

export const featuresCopy = {
  eyebrow: "Product",
  title: "Small band. Quietly clever.",
  intro: "Everything NicoGuard does is built around one moment: the second before an automatic habit takes over.",
};

export const features: Feature[] = [
  {
    id: "prediction",
    title: "Craving prediction",
    body: "Learns your patterns over time and flags likely craving windows before they peak.",
    visual: "prediction",
    size: "lg",
    highlight: true,
  },
  {
    id: "gesture",
    title: "Gesture detection",
    body: "Recognises the hand-to-mouth motion that usually comes with a cigarette, vape or pinch.",
    visual: "gesture",
    size: "md",
  },
  {
    id: "haptic",
    title: "Haptic coach",
    body: "Calming vibration patterns that interrupt the loop. Silent and private.",
    visual: "haptic",
    size: "md",
    highlight: true,
  },
  {
    id: "taper",
    title: "Taper plans",
    body: "Cut down at a pace that fits your life, week by week.",
    visual: "taper",
    size: "sm",
  },
  {
    id: "streak",
    title: "Progress and streaks",
    body: "See every craving you rode out. Celebrate the days, not perfection.",
    visual: "streak",
    size: "sm",
  },
  {
    id: "share",
    title: "Accountability",
    body: "Share progress with a quit-buddy or your doctor, only if you want to.",
    visual: "share",
    size: "md",
  },
  {
    id: "forms",
    title: "Every nicotine form",
    body: "Works with shisha, vapes, cigarettes and smokeless products like naswar and gutka.",
    visual: "forms",
    size: "md",
  },
  {
    id: "battery",
    title: "Lasts for days",
    body: "Designed for multi-day battery life.",
    visual: "battery",
    size: "md",
  },
];
