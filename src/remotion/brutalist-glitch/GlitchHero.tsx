import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const GLITCH_FPS = 30;
export const GLITCH_WIDTH = 1600;
export const GLITCH_HEIGHT = 900;
export const GLITCH_DURATION = 240;

export type GlitchHeroProps = {
  name: string;
  role: string;
};

const SCRAMBLE_CHARS = "!@#$%&*()_+=-[]{}|;:,.<>/?~`░▒▓█▀▄";

const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

export const GlitchHero: React.FC<GlitchHeroProps> = ({ name, role }) => {
  const frame = useCurrentFrame();

  // RGB offset — baseline sine + occasional bursts
  const baseOffset = 3 + Math.sin(frame * 0.2) * 2;
  const burst = Math.max(0, Math.sin(frame * 0.13) - 0.85) * 80;
  const offsetX = baseOffset + burst;
  const offsetY = Math.sin(frame * 0.11) * 2;

  // Scramble moments — every ~40 frames for 4 frames
  const scrambleLocal = frame % 60;
  const isScramble = scrambleLocal >= 54 && scrambleLocal < 60;
  const scrambleMoment = Math.floor(frame / 60);

  const displayName = isScramble
    ? name
        .split("")
        .map((c, i) => {
          if (c === " ") return " ";
          const r = seededRandom(i + scrambleMoment * 13 + scrambleLocal);
          return SCRAMBLE_CHARS[Math.floor(r * SCRAMBLE_CHARS.length)];
        })
        .join("")
    : name;

  // Horizontal slice glitch — pick a horizontal band and shift it
  const bandActive = frame % 40 >= 35;
  const bandY = (seededRandom(Math.floor(frame / 40)) * 500 + 200) | 0;
  const bandH = 60;
  const bandShift = bandActive ? seededRandom(Math.floor(frame / 40) + 7) * 80 - 40 : 0;

  // Scanline jitter
  const scanlineY = Math.floor(frame * 6) % 12;

  // Corner error flicker
  const errFlash = Math.floor(frame / 10) % 3 === 0;

  return (
    <AbsoluteFill
      style={{
        background: "#faf9f6",
        color: "#000",
        fontFamily: "var(--font-space-grotesk), sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Scanlines */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0) 0, rgba(0,0,0,0) 2px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0) 4px)",
          backgroundPosition: `0 ${scanlineY}px`,
          pointerEvents: "none",
        }}
      />

      {/* Grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      {/* Top label */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 50,
          right: 50,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 13,
          letterSpacing: 3,
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        <span>
          {"["}SIG_LOST:{String(frame).padStart(5, "0")}
          {"]"}
        </span>
        <span style={{ color: errFlash ? "#ff00aa" : "#000" }}>
          ⚠ ERR 0xF0 — UNSTABLE FEED
        </span>
        <span>{"[MON/04/26]"}</span>
      </div>

      {/* Horizontal slice overlay */}
      {bandActive && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: bandY,
            height: bandH,
            transform: `translateX(${bandShift}px)`,
            background: "rgba(0,0,0,0.03)",
            mixBlendMode: "difference",
            borderTop: "1px solid #000",
            borderBottom: "1px solid #000",
          }}
        />
      )}

      {/* Main title stack */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
        }}
      >
        <div style={{ textAlign: "center", position: "relative" }}>
          <div
            style={{
              fontSize: 180,
              fontWeight: 700,
              letterSpacing: -8,
              textTransform: "uppercase",
              lineHeight: 0.9,
              position: "relative",
            }}
          >
            {/* Cyan layer */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                color: "#00e5ff",
                transform: `translate(${-offsetX}px, ${-offsetY}px)`,
                mixBlendMode: "multiply",
              }}
              aria-hidden
            >
              {displayName}
            </div>
            {/* Magenta layer */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                color: "#ff00aa",
                transform: `translate(${offsetX}px, ${offsetY}px)`,
                mixBlendMode: "multiply",
              }}
              aria-hidden
            >
              {displayName}
            </div>
            {/* Yellow layer */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                color: "#ffee00",
                transform: `translate(${offsetX * 0.3}px, ${offsetX * 0.3}px)`,
                mixBlendMode: "multiply",
                opacity: 0.7,
              }}
              aria-hidden
            >
              {displayName}
            </div>
            {/* Main text */}
            <div
              style={{ position: "relative", color: "#000", mixBlendMode: "multiply" }}
            >
              {displayName}
            </div>
          </div>

          {/* Role */}
          <div
            style={{
              marginTop: 30,
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 20,
              letterSpacing: 4,
              color: "#000",
              padding: "8px 16px",
              border: "3px solid #000",
              display: "inline-block",
              background: "#fff",
              textTransform: "uppercase",
            }}
          >
            &gt; {role}
          </div>
        </div>
      </AbsoluteFill>

      {/* Bottom meta */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 50,
          right: 50,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 11,
          letterSpacing: 3,
          textTransform: "uppercase",
        }}
      >
        <span>RGB: SPLIT · CH/0x03</span>
        <span style={{ color: "#ff00aa" }}>
          BUF OVERFLOW — RECOVERING ({Math.floor(interpolate(frame, [0, GLITCH_DURATION], [0, 100], { extrapolateRight: "clamp" }))}%)
        </span>
        <span>DATAMOSH v0.4.1</span>
      </div>

      {/* Random pixel noise rectangles */}
      {[0, 1, 2, 3].map((i) => {
        const visible = seededRandom(frame + i * 17) > 0.92;
        if (!visible) return null;
        const x = seededRandom(frame + i * 3) * GLITCH_WIDTH;
        const y = seededRandom(frame + i * 5) * GLITCH_HEIGHT;
        const w = 40 + seededRandom(frame + i * 7) * 140;
        const h = 2 + seededRandom(frame + i * 11) * 6;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: w,
              height: h,
              background: i % 2 === 0 ? "#ff00aa" : "#00e5ff",
              mixBlendMode: "multiply",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
