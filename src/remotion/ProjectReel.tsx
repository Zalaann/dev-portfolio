import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const REEL_FPS = 30;
export const REEL_WIDTH = 1920;
export const REEL_HEIGHT = 480;

const PER_PROJECT = 100;

export type ReelProject = {
  name: string;
  blurb: string;
  stack: string;
};

export type ProjectReelProps = {
  projects: readonly ReelProject[];
};

export const getReelDuration = (count: number) => count * PER_PROJECT;

const ACCENT = "#000000";

// Single project slide
const ProjectSlide: React.FC<{
  caseNo: number;
  project: ReelProject;
}> = ({ caseNo, project }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const caseS = spring({ frame: frame - 2, fps, config: { damping: 22 } });
  const nameS = spring({ frame: frame - 14, fps, config: { damping: 22 } });
  const blurbS = spring({ frame: frame - 30, fps, config: { damping: 22 } });

  // Slide out at end
  const exitO = interpolate(frame, [PER_PROJECT - 16, PER_PROJECT], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Stack marquee scrolls
  const stackScroll = (frame * 3) % 600;

  return (
    <AbsoluteFill
      style={{
        background: "#fff",
        color: "#ff0000",
        fontFamily: "var(--font-space-grotesk), sans-serif",
        opacity: exitO,
      }}
    >
      {/* Grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 30,
          left: 50,
          right: 50,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 14,
          letterSpacing: 5,
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontWeight: 600,
          textTransform: "uppercase",
        }}
      >
        <span>█ CASE REEL</span>
        <span>SCROLL TO BROWSE</span>
      </div>

      <div
        style={{
          position: "absolute",
          top: 80,
          left: 50,
          right: 50,
          bottom: 80,
          display: "flex",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Left — case number */}
        <div
          style={{
            opacity: caseS,
            transform: `translateX(${interpolate(caseS, [0, 1], [-30, 0])}px)`,
            minWidth: 180,
          }}
        >
          <div
            style={{
              fontSize: 16,
              letterSpacing: 4,
              fontWeight: 700,
              textTransform: "uppercase",
              fontFamily: "var(--font-jetbrains-mono), monospace",
            }}
          >
            CASE № {String(caseNo).padStart(2, "0")}
          </div>
          <div
            style={{
              marginTop: 6,
              fontSize: 120,
              fontWeight: 900,
              lineHeight: 0.85,
              letterSpacing: -6,
              background: ACCENT,
              border: "3px solid #ff0000",
              padding: "6px 18px",
              display: "inline-block",
            }}
          >
            {String(caseNo).padStart(2, "0")}
          </div>
        </div>

        {/* Middle — name */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 150,
              fontWeight: 900,
              letterSpacing: -8,
              lineHeight: 0.9,
              textTransform: "uppercase",
              opacity: nameS,
              transform: `translateY(${interpolate(nameS, [0, 1], [20, 0])}px)`,
            }}
          >
            {project.name}
          </div>
          <div
            style={{
              marginTop: 10,
              fontSize: 26,
              fontWeight: 500,
              opacity: blurbS,
              transform: `translateY(${interpolate(blurbS, [0, 1], [20, 0])}px)`,
              maxWidth: 900,
            }}
          >
            {project.blurb}
          </div>
        </div>
      </div>

      {/* Bottom — stack marquee */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          height: 46,
          borderTop: "3px solid #ff0000",
          borderBottom: "3px solid #ff0000",
          background: "#ff0000",
          color: ACCENT,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            whiteSpace: "nowrap",
            transform: `translateX(${-stackScroll}px)`,
            fontSize: 18,
            letterSpacing: 5,
            fontWeight: 700,
            fontFamily: "var(--font-jetbrains-mono), monospace",
          }}
        >
          {(project.stack + " · ").repeat(6)}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const ProjectReel: React.FC<ProjectReelProps> = ({ projects }) => {
  return (
    <AbsoluteFill>
      {projects.map((p, i) => (
        <Sequence
          key={p.name}
          from={i * PER_PROJECT}
          durationInFrames={PER_PROJECT}
        >
          <ProjectSlide caseNo={i + 1} project={p} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
