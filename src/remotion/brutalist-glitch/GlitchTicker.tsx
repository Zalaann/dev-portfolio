import { AbsoluteFill, useCurrentFrame } from "remotion";

export const GLITCH_TICKER_FPS = 30;
export const GLITCH_TICKER_WIDTH = 1600;
export const GLITCH_TICKER_HEIGHT = 60;
export const GLITCH_TICKER_DURATION = 600;

const MESSAGES = [
  "0xE4F1: buffer flushed",
  "WARN: packet_loss=0.02%",
  "OK: deploy/recello → prod",
  "0xBE55: frame dropped",
  "INFO: compiling /nuch-summarizer",
  "OK: kaye-mackenzie/ci passed",
  "WARN: stream_reset channel=03",
  "0x01DE: signal recovered",
  "HIRE_SIGNAL: available=true",
  "0xA55C: cache purged",
  "OK: fattys/e2e passing",
  "INFO: uptime=∞",
];

export const GlitchTicker: React.FC = () => {
  const frame = useCurrentFrame();
  const scroll = (frame * 4) % 2400;

  // occasional hue flip
  const flip = Math.floor(frame / 40) % 3 === 0;

  return (
    <AbsoluteFill
      style={{
        background: flip ? "#000" : "#faf9f6",
        color: flip ? "#faf9f6" : "#000",
        borderTop: "3px solid #000",
        borderBottom: "3px solid #000",
        fontFamily: "var(--font-jetbrains-mono), monospace",
        fontSize: 18,
        letterSpacing: 2,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          whiteSpace: "nowrap",
          transform: `translateX(${-scroll}px)`,
          display: "flex",
          gap: 48,
          fontWeight: 600,
          textTransform: "uppercase",
        }}
      >
        {Array.from({ length: 3 }).map((_, rep) => (
          <span key={rep} style={{ display: "flex", gap: 48 }}>
            {MESSAGES.map((m, i) => {
              const isErr = m.startsWith("0x") || m.startsWith("WARN");
              const color = flip
                ? isErr
                  ? "#ff00aa"
                  : "#faf9f6"
                : isErr
                ? "#ff00aa"
                : "#000";
              return (
                <span key={i + rep * 100} style={{ color }}>
                  ▸ {m}
                </span>
              );
            })}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};
