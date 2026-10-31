import { ImageResponse } from "next/og";

export const alt = "NicoGuard by NIVARO: Rewire your habits.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const rings = [520, 400, 280, 160];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#05070A",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(139,92,246,0.25), transparent 50%), radial-gradient(circle at 15% 85%, rgba(45,226,200,0.18), transparent 45%)",
          color: "#E6EDF3",
          padding: 80,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {rings.map((r, i) => (
          <div
            key={r}
            style={{
              position: "absolute",
              right: 180 - r / 2 + 80,
              top: 315 - r / 2,
              width: r,
              height: r,
              borderRadius: 9999,
              border: `2px solid rgba(45,226,200,${0.12 + i * 0.12})`,
            }}
          />
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 32 32">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2DE2C8" />
                <stop offset="1" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            <path d="M7 25V7l6 10 2.3-4.6 2.8 8.4 2.3-4.6L25 25V7" fill="none" stroke="url(#g)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ fontSize: 48, fontWeight: 600, letterSpacing: -1 }}>NIVARO</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 600, letterSpacing: -3, lineHeight: 1 }}>
            Rewire your&nbsp;
            <span style={{ backgroundImage: "linear-gradient(135deg, #2DE2C8, #8B5CF6)", backgroundClip: "text", color: "transparent" }}>habits.</span>
          </div>
          <div style={{ marginTop: 24, fontSize: 30, color: "#8B98A5", maxWidth: 760 }}>
            A wearable that answers cravings with a gentle pulse. Built in Pakistan.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
