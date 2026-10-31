export type FaqItem = { id: string; question: string; answer: string };

export const faq: FaqItem[] = [
  {
    id: "shock",
    question: "Does it shock me?",
    answer: "No. NicoGuard uses vibration only. There are no shocks, no sounds and no penalties.",
  },
  {
    id: "nicotine-blood",
    question: "Does it measure nicotine in my blood?",
    answer:
      "Not in this version. NicoGuard looks at movement and heart-rate patterns to spot likely use and craving moments. It does not measure anything in your blood.",
  },
  {
    id: "products",
    question: "Which products does it cover?",
    answer:
      "Cigarettes, shisha, vapes, naswar, gutka and other smokeless products. Detection performance may differ by product, and we are still validating it for each one.",
  },
  {
    id: "privacy",
    question: "Is my data private?",
    answer:
      "We collect the motion and heart-rate signals the wristband needs, plus the progress you log in the app. We do not sell your data, and you can ask us to delete it at any time. Our full privacy policy will be published before launch.",
  },
  {
    id: "launch",
    question: "When does it launch?",
    answer: "To be announced. Waitlist members hear first.",
  },
  {
    id: "vape-naswar",
    question: "Can I use it if I vape or use naswar?",
    answer:
      "Yes. NicoGuard is designed for every form of nicotine, including vapes and smokeless products like naswar. Craving support and the taper plan work the same way, whatever you use.",
  },
  {
    id: "doctor",
    question: "Can my doctor see my progress?",
    answer: "Only if you choose to share it. Sharing is off by default and you can stop at any time.",
  },
  {
    id: "price",
    question: "How much will it cost?",
    answer: "To be announced. Waitlist members will hear about pricing first.",
  },
];
