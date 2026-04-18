import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const NOIR_CHAPTER_FPS = 30;
export const NOIR_CHAPTER_WIDTH = 1600;
export const NOIR_CHAPTER_HEIGHT = 320;
export const NOIR_CHAPTER_DURATION = 180;

export type NoirChapterProps = {
  roman: string;
  label: string;
  summary: string;
};

export const NoirChapter: React.FC<NoirChapterProps> = ({ roman, label, summary }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const romanS = spring({ frame, fps, config: { damping: 12, mass: 0.5 } });
  const romanScale = interpolate(romanS, [0, 1], [0.3, 1]);

  const labelO = interpolate(frame, [14, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelX = interpolate(frame, [14, 28], [-40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sumO = interpolate(frame, [30, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const barProg = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const flicker = frame < 5 ? (Math.sin(frame * 3) + 1) * 0.5 : 1;

  return (
    <AbsoluteFill
      style={{
        background: "#0a0a0a",
        color: "#f0ead6",
        fontFamily: "var(--font-space-grotesk), sans-serif",
        opacity: flicker,
      }}
    >
      {/* film grain */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 40%, rgba(240,234,214,0.08) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 30,
          left: 60,
          right: 60,
          height: 1,
          background: "#f0ead6",
          transformOrigin: "left center",
          transform: `scaleX(${barProg})`,
        }}
      />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 60,
          }}
        >
          <div
            style={{
              fontSize: 220,
              fontWeight: 700,
              lineHeight: 1,
              color: "#dc2626",
              transform: `scale(${romanScale})`,
              opacity: romanS,
            }}
          >
            {roman}
          </div>
          <div
            style={{
              borderLeft: "2px solid #f0ead6",
              paddingLeft: 40,
              minWidth: 500,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 14,
                letterSpacing: 6,
                color: "#dc2626",
                opacity: labelO,
                transform: `translateX(${labelX}px)`,
              }}
            >
              CHAPTER {roman}
            </div>
            <div
              style={{
                marginTop: 10,
                fontSize: 72,
                fontWeight: 700,
                letterSpacing: -3,
                textTransform: "uppercase",
                lineHeight: 0.95,
                opacity: labelO,
                transform: `translateX(${labelX}px)`,
              }}
            >
              {label}
            </div>
            <div
              style={{
                marginTop: 16,
                fontSize: 18,
                fontFamily: "var(--font-jetbrains-mono), monospace",
                letterSpacing: 2,
                color: "#f0ead6",
                opacity: sumO,
              }}
            >
              — {summary}
            </div>
          </div>
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 60,
          right: 60,
          height: 1,
          background: "#f0ead6",
          transformOrigin: "right center",
          transform: `scaleX(${barProg})`,
        }}
      />
    </AbsoluteFill>
  );
};
