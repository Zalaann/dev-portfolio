import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const NOIR_FPS = 30;
export const NOIR_WIDTH = 1600;
export const NOIR_HEIGHT = 900;
export const NOIR_DURATION = 300;

export type NoirHeroProps = {
  name: string;
  subtitle: string;
};

export const NoirHero: React.FC<NoirHeroProps> = ({ name, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Letterbox grows from 0 to 120px over first 15 frames
  const barH = interpolate(frame, [0, 20], [0, 120], { extrapolateRight: "clamp" });

  // Red slash sweeps down
  const slashY = interpolate(frame, [0, 28], [-200, NOIR_HEIGHT + 200], {
    extrapolateRight: "clamp",
  });
  const slashVisible = frame < 28;

  // Label "FEATURE PRESENTATION"
  const featureO = interpolate(frame, [30, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const featureOut = interpolate(frame, [85, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const featureVisible = featureO * (1 - featureOut);

  // Name reveal — letter by letter after frame 90
  const NAME_START = 90;
  const letters = name.split("");
  const charPerFrame = 2;

  // Name underline
  const underlineProg = interpolate(
    frame,
    [NAME_START + letters.length / charPerFrame + 2, NAME_START + letters.length / charPerFrame + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Subtitle fade
  const subS = spring({ frame: frame - 170, fps, config: { damping: 22, mass: 0.9 } });

  // Flicker — light random modulation
  const flicker = (Math.sin(frame * 3.7) + Math.cos(frame * 2.1)) * 0.5 + 0.5;
  const grainOpacity = 0.08 + flicker * 0.04;

  // Corner marks
  const cornersVisible = interpolate(frame, [10, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Bottom-right chapter marker
  const chapO = interpolate(frame, [200, 230], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#0a0a0a",
        color: "#f0ead6",
        fontFamily: "var(--font-space-grotesk), sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Film grain overlay */}
      <AbsoluteFill
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(240,234,214,${grainOpacity}) 1px, transparent 1px),
            radial-gradient(circle at 70% 60%, rgba(240,234,214,${grainOpacity}) 1px, transparent 1px),
            radial-gradient(circle at 40% 80%, rgba(240,234,214,${grainOpacity * 0.7}) 1px, transparent 1px)
          `,
          backgroundSize: "3px 3px, 5px 5px, 7px 7px",
          pointerEvents: "none",
          mixBlendMode: "overlay",
        }}
      />

      {/* Red slash sweep */}
      {slashVisible && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: slashY,
            height: 8,
            background: "#dc2626",
            boxShadow: "0 0 40px rgba(220,38,38,0.6)",
          }}
        />
      )}

      {/* Letterbox bars */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: barH, background: "#000" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: barH, background: "#000" }} />

      {/* Cross-hair corners */}
      {[
        { top: barH + 30, left: 30 },
        { top: barH + 30, right: 30 },
        { bottom: barH + 30, left: 30 },
        { bottom: barH + 30, right: 30 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...pos,
            width: 40,
            height: 40,
            borderLeft: pos.left !== undefined ? "2px solid #f0ead6" : undefined,
            borderRight: pos.right !== undefined ? "2px solid #f0ead6" : undefined,
            borderTop: pos.top !== undefined ? "2px solid #f0ead6" : undefined,
            borderBottom: pos.bottom !== undefined ? "2px solid #f0ead6" : undefined,
            opacity: cornersVisible * 0.7,
          }}
        />
      ))}

      {/* Top meta */}
      <div
        style={{
          position: "absolute",
          top: barH - 40,
          left: 80,
          right: 80,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 12,
          letterSpacing: 3,
          color: "#f0ead6",
          opacity: cornersVisible * 0.7,
        }}
      >
        <span>MANCHESTER · MMXXVI</span>
        <span>FRAME {String(frame + 1).padStart(6, "0")} / {String(NOIR_DURATION).padStart(6, "0")}</span>
      </div>

      {/* Feature label */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: featureVisible,
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 16,
          letterSpacing: 8,
          color: "#dc2626",
        }}
      >
        — FEATURE PRESENTATION —
      </div>

      {/* Name */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 140,
              fontWeight: 700,
              letterSpacing: -6,
              lineHeight: 0.95,
              textTransform: "uppercase",
            }}
          >
            {letters.map((ch, i) => {
              const charFrame = NAME_START + i / charPerFrame;
              const o = interpolate(frame, [charFrame, charFrame + 3], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const blur = interpolate(frame, [charFrame, charFrame + 3], [12, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <span key={i} style={{ opacity: o, filter: `blur(${blur}px)`, display: "inline-block" }}>
                  {ch === " " ? "\u00A0" : ch}
                </span>
              );
            })}
          </div>

          {/* Red underline */}
          <div
            style={{
              margin: "24px auto 0",
              height: 6,
              width: 600 * underlineProg,
              background: "#dc2626",
            }}
          />

          <div
            style={{
              marginTop: 30,
              fontSize: 22,
              fontFamily: "var(--font-jetbrains-mono), monospace",
              letterSpacing: 3,
              color: "#f0ead6",
              opacity: subS,
              transform: `translateY(${interpolate(subS, [0, 1], [15, 0])}px)`,
              textTransform: "uppercase",
            }}
          >
            {subtitle}
          </div>
        </div>
      </AbsoluteFill>

      {/* Bottom chapter */}
      <div
        style={{
          position: "absolute",
          bottom: barH + 30,
          left: 80,
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 12,
          letterSpacing: 3,
          color: "#dc2626",
          opacity: chapO,
        }}
      >
        ◆ CHAPTER I · OPENING CREDITS ◆
      </div>
      <div
        style={{
          position: "absolute",
          bottom: barH + 30,
          right: 80,
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 12,
          letterSpacing: 3,
          color: "#f0ead6",
          opacity: chapO * 0.7,
        }}
      >
        REEL 1 · 35MM · 1:85.1
      </div>
    </AbsoluteFill>
  );
};
