import dynamic from "next/dynamic";
import { AppPreview } from "@/components/AppPreview";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Navbar } from "@/components/Navbar";
import { Roadmap } from "@/components/Roadmap";
import { StatsSection } from "@/components/StatsSection";
import { Trust } from "@/components/Trust";
import { PulseDivider } from "@/components/ui/Section";
import { faq } from "@/data/faq";

// Below-the-fold interactive sections are split into their own chunks.
const CravingDemo = dynamic(() => import("@/components/CravingDemo").then((m) => m.CravingDemo));
const Audience = dynamic(() => import("@/components/Audience").then((m) => m.Audience));
const Faq = dynamic(() => import("@/components/Faq").then((m) => m.Faq));
const Contact = dynamic(() => import("@/components/Contact").then((m) => m.Contact));
const Waitlist = dynamic(() => import("@/components/Waitlist").then((m) => m.Waitlist));

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="relative z-[1] outline-none">
        <Hero />
        <PulseDivider />
        <StatsSection />
        <HowItWorks />
        <CravingDemo />
        <PulseDivider />
        <Features />
        <AppPreview />
        <Audience />
        <Roadmap />
        <Trust />
        <Faq />
        <Waitlist />
        <Contact />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
