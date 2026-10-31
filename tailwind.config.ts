import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // Mirrors the CSS variables in globals.css. Hex values (not var()) so opacity modifiers like bg-teal/15 work.
      colors: {
        bg: "#05070A",
        "surface-1": "#0B0F14",
        "surface-2": "#111821",
        line: "rgba(255, 255, 255, 0.06)",
        ink: "#E6EDF3",
        muted: "#8B98A5",
        teal: "#2DE2C8",
        violet: "#8B5CF6",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        brand: "var(--grad-brand)",
      },
      boxShadow: {
        "glow-teal": "var(--glow-teal)",
        "glow-violet": "var(--glow-violet)",
      },
      borderRadius: {
        card: "24px",
      },
      maxWidth: {
        site: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
