import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const METRIC_FPS = 30;
export const METRIC_WIDTH = 800;
export const METRIC_HEIGHT = 500;
export const METRIC_DURATION = 150;

export type MetricTickerProps = {
  targetValue: number;
  suffix: string;
  label: string;
  sublabel: string;
};

export const MetricTicker: React.FC<MetricTickerProps> = ({
  targetValue,
  suffix,
  label,
  sublabel,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Counter animates 0 → target over ~45 frames, holds, then fades for loop
  const rampEnd = 60;
  const holdEnd = 120;
  const fadeEnd = METRIC_DURATION;

  const countS = spring({ frame, fps, config: { damping: 22, mass: 1 } });
  const rampProgress = Math.min(frame / rampEnd, 1) * countS;
  const value = Math.round(targetValue * rampProgress);

  const barProgress = rampProgress;

  // Fade out before loop
  const loopOpacity = interpolate(frame, [holdEnd, fadeEnd - 6], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tickCount = 20;
  const tickFillCount = Math.round(barProgress * tickCount);

  return (
    <AbsoluteFill
      style={{
        background: "#000000",
        color: "#ff0000",
        fontFamily: "var(--font-space-grotesk), sans-serif",
        padding: 40,
        border: "3px solid #ff0000",
        opacity: loopOpacity,
      }}
    >
      {/* Grid texture */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: 16,
            letterSpacing: 5,
            fontWeight: 700,
            textTransform: "uppercase",
            fontFamily: "var(--font-jetbrains-mono), monospace",
          }}
        >
          / METRIC · VERIFIED
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          <div
            style={{
              fontSize: 220,
              fontWeight: 400,
              letterSpacing: 0,
              lineHeight: 0.85,
              fontVariantNumeric: "tabular-nums",
              fontFamily: "var(--font-glasstty), monospace",
              textShadow: "0 0 12px rgba(255,0,0,0.5), 0 0 40px rgba(255,0,0,0.25)",
            }}
          >
            {String(value).padStart(2, "0")}
          </div>
          <div style={{ fontSize: 100, fontWeight: 400, letterSpacing: 0, lineHeight: 0.85, fontFamily: "var(--font-glasstty), monospace", textShadow: "0 0 12px rgba(255,0,0,0.5), 0 0 40px rgba(255,0,0,0.25)" }}>
            {suffix}
          </div>
        </div>

        {/* Tick bar */}
        <div style={{ display: "flex", gap: 4, marginTop: 10 }}>
          {Array.from({ length: tickCount }).map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 18,
                background: i < tickFillCount ? "#ff0000" : "transparent",
                border: "2px solid #ff0000",
              }}
            />
          ))}
        </div>

        <div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              fontFamily: "var(--font-jetbrains-mono), monospace",
            }}
          >
            {label}
          </div>
          <div
            style={{
              marginTop: 4,
              fontSize: 14,
              letterSpacing: 4,
              textTransform: "uppercase",
              fontWeight: 600,
              fontFamily: "var(--font-jetbrains-mono), monospace",
              opacity: 0.7,
            }}
          >
            ▸ {sublabel}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
