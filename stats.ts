/**
 * Verified public-health figures shown in "The Facts" section.
 * Every entry names its source and publication date. Figures were checked on
 * 31 Oct 2026 against the pages in `sourceUrl`. If a figure cannot be verified
 * against a recognised source, it must not be added here.
 */

export type StatDisplay = {
  prefix?: string;
  suffix?: string;
  decimals: number;
  /** Optional secondary value shown smaller. */
  note?: string;
};

export type Stat = {
  id: string;
  value: number;
  display: StatDisplay;
  label: string;
  sourceName: string;
  sourceUrl: string;
  /** Shown instead of an animated count, for "more than" figures. */
  fixedText?: string;
  /** Human-readable publication date of the source. */
  published: string;
};

const WHO_TRENDS = "WHO global report on trends in prevalence of tobacco use 2000–2024";
const WHO_TRENDS_URL = "https://www.who.int/news/item/06-10-2025-who-tobacco-trends-report-1-in-5-adults-still-addicted-to-tobacco";
const WHO_FACT = "WHO fact sheet: Tobacco and nicotine";
const WHO_FACT_URL = "https://www.who.int/news-room/fact-sheets/detail/tobacco";
const GATS = "GATS Pakistan 2024 results (Government of Pakistan, WHO, CDC Foundation), as reported by Business Recorder";
const GATS_URL = "https://www.brecorder.com/news/40423917";

export const stats: Stat[] = [
  {
    id: "global-users",
    value: 1.2,
    display: { suffix: " bn", decimals: 1, note: "1.2 billion people, 2024" },
    label: "people worldwide use tobacco",
    sourceName: WHO_TRENDS,
    sourceUrl: WHO_TRENDS_URL,
    published: "6 October 2025",
  },
  {
    id: "global-deaths",
    value: 7,
    fixedText: "7M+",
    display: { decimals: 0 },
    label: "deaths every year are caused by tobacco, including over 1.6 million non-smokers exposed to second-hand smoke",
    sourceName: WHO_FACT,
    sourceUrl: WHO_FACT_URL,
    published: "26 June 2026",
  },
  {
    id: "vaping",
    value: 100,
    fixedText: "100M+",
    display: { decimals: 0, note: "at least 86M adults and 15M aged 13–15" },
    label: "people worldwide now use e-cigarettes",
    sourceName: WHO_TRENDS,
    sourceUrl: WHO_TRENDS_URL,
    published: "6 October 2025",
  },
  {
    id: "pk-users",
    value: 22.7,
    display: { suffix: "M", decimals: 1, note: "22.7 million adults" },
    label: "adults in Pakistan currently use tobacco",
    sourceName: GATS,
    sourceUrl: GATS_URL,
    published: "4 June 2026",
  },
  {
    id: "pk-prevalence",
    value: 16.1,
    display: { suffix: "%", decimals: 1 },
    label: "of people in Pakistan aged 15+ use tobacco",
    sourceName: GATS,
    sourceUrl: GATS_URL,
    published: "4 June 2026",
  },
  {
    id: "pk-deaths",
    value: 164000,
    display: { prefix: "~", decimals: 0, note: "163,600 per the survey release" },
    label: "deaths a year in Pakistan are linked to tobacco",
    sourceName: GATS,
    sourceUrl: GATS_URL,
    published: "4 June 2026",
  },
];

export const statsCopy = {
  eyebrow: "The facts",
  title: "Nicotine harm is global. So is the wish to quit.",
  intro:
    "These figures come from the World Health Organization and Pakistan's 2024 Global Adult Tobacco Survey. Each card names its source and publication date.",
  note:
    "Figures are as published by the sources shown. Pakistan survey results were released on 3 June 2026; we link to news coverage of the release because we could not retrieve the full report. Sources checked 31 October 2026.",
};
