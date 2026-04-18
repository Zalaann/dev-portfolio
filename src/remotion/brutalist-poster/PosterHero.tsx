import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const POSTER_FPS = 30;
export const POSTER_WIDTH = 1200;
export const POSTER_HEIGHT = 1500;
export const POSTER_DURATION = 240;

export type PosterHeroProps = {
  headline: readonly string[];
  role: string;
  date: string;
};

const CREAM = "#f5efe3";
const BLACK = "#0f0f0f";
const ORANGE = "#ff4500";
const TEAL = "#008b8b";

export const PosterHero: React.FC<PosterHeroProps> = ({ headline, role, date }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ink layer 1 — teal block
  const tealProg = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ink layer 2 — orange circle
  const orangeS = spring({ frame: frame - 25, fps, config: { damping: 20, mass: 0.8 } });
  const orangeScale = interpolate(orangeS, [0, 1], [0, 1]);

  // Headline slam
  const headlineS = spring({ frame: frame - 45, fps, config: { damping: 14, mass: 0.6 } });
  const headlineO = interpolate(headlineS, [0, 1], [0, 1]);
  const headlineY = interpolate(headlineS, [0, 1], [-30, 0]);

  // Offset mis-registration (gets smaller over time — simulating ink drying/settling)
  const misreg = interpolate(frame, [45, 70], [8, 2], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Role / date fade
  const metaO = interpolate(frame, [80, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bottom black bar
  const barW = interpolate(frame, [60, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: CREAM,
        overflow: "hidden",
        fontFamily: "var(--font-space-grotesk), sans-serif",
      }}
    >
      {/* Paper grain */}
      <AbsoluteFill
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 25%, rgba(15,15,15,0.05) 1px, transparent 1px),
            radial-gradient(circle at 70% 65%, rgba(15,15,15,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "4px 4px, 7px 7px",
          mixBlendMode: "multiply",
        }}
      />

      {/* Registration marks (corners) */}
      {[
        { top: 30, left: 30 },
        { top: 30, right: 30 },
        { bottom: 30, left: 30 },
        { bottom: 30, right: 30 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...pos,
            width: 28,
            height: 28,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 13,
              left: 0,
              right: 0,
              height: 2,
              background: BLACK,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 13,
              width: 2,
              background: BLACK,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 4,
              borderRadius: "50%",
              border: `1px solid ${BLACK}`,
            }}
          />
        </div>
      ))}

      {/* Layer 1: Teal block (mis-registered) */}
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 220,
          width: 600,
          height: 500,
          background: TEAL,
          mixBlendMode: "multiply",
          opacity: 0.82,
          clipPath: `inset(0 ${(1 - tealProg) * 100}% 0 0)`,
        }}
      />

      {/* Layer 2: Orange circle */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 500,
          width: 700,
          height: 700,
          marginLeft: -350,
          borderRadius: "50%",
          background: ORANGE,
          mixBlendMode: "multiply",
          opacity: 0.85,
          transform: `scale(${orangeScale}) translate(${misreg}px, ${misreg * 0.5}px)`,
        }}
      />

      {/* Top label */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 80,
          right: 80,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 14,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: BLACK,
          fontWeight: 600,
          opacity: metaO,
        }}
      >
        <span>№ 04</span>
        <span style={{ color: ORANGE, mixBlendMode: "multiply" }}>RISOGRAPH · 2-COLOUR</span>
        <span>{date}</span>
      </div>

      {/* Big headline with mis-register */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 60,
          right: 60,
          opacity: headlineO,
          transform: `translateY(${headlineY}px)`,
        }}
      >
        {headline.map((line, i) => (
          <div
            key={i}
            style={{
              fontSize: 180,
              fontWeight: 900,
              letterSpacing: -6,
              lineHeight: 0.9,
              textTransform: "uppercase",
              color: BLACK,
              position: "relative",
              marginBottom: 8,
            }}
          >
            {/* Orange mis-register */}
            <span
              style={{
                position: "absolute",
                inset: 0,
                color: ORANGE,
                mixBlendMode: "multiply",
                transform: `translate(${misreg}px, ${misreg * 0.5}px)`,
              }}
              aria-hidden
            >
              {line}
            </span>
            {/* Teal mis-register */}
            <span
              style={{
                position: "absolute",
                inset: 0,
                color: TEAL,
                mixBlendMode: "multiply",
                transform: `translate(${-misreg * 0.7}px, ${-misreg * 0.3}px)`,
              }}
              aria-hidden
            >
              {line}
            </span>
            {/* Main black */}
            <span style={{ position: "relative", mixBlendMode: "multiply" }}>{line}</span>
          </div>
        ))}
      </div>

      {/* Bottom info strip */}
      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          bottom: 120,
          display: "flex",
          alignItems: "center",
          gap: 30,
          opacity: metaO,
        }}
      >
        <div
          style={{
            height: 10,
            background: BLACK,
            flex: 1,
            transformOrigin: "left center",
            transform: `scaleX(${barW})`,
          }}
        />
        <div
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 16,
            letterSpacing: 4,
            textTransform: "uppercase",
            fontWeight: 600,
            color: BLACK,
            whiteSpace: "nowrap",
          }}
        >
          {role}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          bottom: 60,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 12,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: BLACK,
          opacity: metaO,
        }}
      >
        <span>PRINTED IN MANCHESTER</span>
        <span>EDITION OF ONE</span>
        <span style={{ color: TEAL, mixBlendMode: "multiply" }}>CYAN 032 + ORANGE 805</span>
      </div>
    </AbsoluteFill>
  );
};
