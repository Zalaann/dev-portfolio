import { AbsoluteFill, useCurrentFrame } from "remotion";

export const SCROLL_TICKER_FPS = 30;
export const SCROLL_TICKER_WIDTH = 1920;
export const SCROLL_TICKER_HEIGHT = 72;
export const SCROLL_TICKER_DURATION = 1000;

const ACCENT = "#000000";

type Section = { name: string; at: number };

const DEFAULT_SECTIONS: Section[] = [
  { name: "INTRO", at: 0.0 },
  { name: "ABOUT", at: 0.12 },
  { name: "EXPERIENCE", at: 0.25 },
  { name: "PROJECTS", at: 0.45 },
  { name: "STACK", at: 0.65 },
  { name: "ACTIVITY", at: 0.82 },
  { name: "END", at: 0.97 },
];

export type ScrollTickerProps = {
  sections?: Section[];
};

export const ScrollTicker: React.FC<ScrollTickerProps> = ({
  sections = DEFAULT_SECTIONS,
}) => {
  const frame = useCurrentFrame();
  const progress = Math.max(0, Math.min(1, frame / (SCROLL_TICKER_DURATION - 1)));

  // Determine current section
  let currentIdx = 0;
  for (let i = 0; i < sections.length; i++) {
    if (progress >= sections[i].at) currentIdx = i;
  }
  const currentSection = sections[currentIdx];

  // Layout constants (in composition units)
  const leftCol = 360;
  const rightCol = 420;
  const timelineLeft = leftCol + 20;
  const timelineRight = SCROLL_TICKER_WIDTH - rightCol - 20;
  const timelineW = timelineRight - timelineLeft;
  const timelineY = SCROLL_TICKER_HEIGHT / 2;
  // playhead position is RELATIVE to the timeline container (which is already offset by timelineLeft)
  const playheadX = progress * timelineW;

  // Faux frame counter: maps progress 0..1 → 0000..9999
  const counter = Math.floor(progress * 9999);

  return (
    <AbsoluteFill
      style={{
        background: ACCENT,
        borderBottom: "3px solid #ff0000",
        fontFamily: "var(--font-space-grotesk), sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Hairline grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 100%",
          pointerEvents: "none",
        }}
      />

      {/* Left — frame + label */}
      <div
        style={{
          position: "absolute",
          left: 30,
          top: 0,
          bottom: 0,
          width: leftCol,
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        <span>█ SCROLL</span>
        <span
          style={{
            background: "#ff0000",
            color: ACCENT,
            padding: "4px 10px",
          }}
        >
          FR {String(counter).padStart(4, "0")}/9999
        </span>
      </div>

      {/* Middle — timeline */}
      <div
        style={{
          position: "absolute",
          left: timelineLeft,
          top: 0,
          bottom: 0,
          width: timelineW,
        }}
      >
        {/* Base line */}
        <div
          style={{
            position: "absolute",
            top: timelineY - 1,
            left: 0,
            right: 0,
            height: 2,
            background: "#ff0000",
          }}
        />

        {/* Filled portion up to playhead */}
        <div
          style={{
            position: "absolute",
            top: timelineY - 3,
            left: 0,
            width: progress * timelineW,
            height: 6,
            background: "#ff0000",
          }}
        />

        {/* Section tick marks */}
        {sections.map((s, i) => {
          const x = s.at * timelineW;
          const isPast = progress >= s.at;
          const isCurrent = i === currentIdx;
          const distance = Math.abs(progress - s.at);
          const emphasis = Math.max(0, 1 - distance * 14);

          return (
            <div
              key={s.name}
              style={{
                position: "absolute",
                left: x - 2,
                top: timelineY - 14,
                width: 4,
                height: 28,
                background: "#ff0000",
                transform: `scaleY(${1 + emphasis * 0.4})`,
                transformOrigin: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 32,
                  left: -40,
                  width: 80,
                  textAlign: "center",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 2,
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  color: isCurrent ? "#ff0000" : isPast ? "#ff000090" : "#ff000050",
                  transform: `scale(${1 + emphasis * 0.2})`,
                  transformOrigin: "center top",
                  transition: "none",
                }}
              >
                {s.name}
              </div>
            </div>
          );
        })}

        {/* Playhead block */}
        <div
          style={{
            position: "absolute",
            left: playheadX - 12,
            top: timelineY - 20,
            width: 24,
            height: 40,
            background: "#ff0000",
            border: "3px solid #ff0000",
          }}
        />
        {/* Playhead dot */}
        <div
          style={{
            position: "absolute",
            left: playheadX - 5,
            top: timelineY - 5,
            width: 10,
            height: 10,
            background: ACCENT,
            border: "2px solid #ff0000",
            borderRadius: 0,
          }}
        />
      </div>

      {/* Right — current section */}
      <div
        style={{
          position: "absolute",
          right: 30,
          top: 0,
          bottom: 0,
          width: rightCol,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 16,
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        <span style={{ opacity: 0.55 }}>
          {String(currentIdx + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
        </span>
        <span
          style={{
            background: "#ff0000",
            color: ACCENT,
            padding: "4px 12px",
            minWidth: 180,
            textAlign: "center",
          }}
        >
          ▸ {currentSection.name}
        </span>
      </div>
    </AbsoluteFill>
  );
};
