import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const BRUTALIST_FPS = 30;
export const BRUTALIST_WIDTH = 1920;
export const BRUTALIST_HEIGHT = 1080;

const TITLE_DUR = 110;
const CURRENT_DUR = 110;
const WORK_DUR = 110;

export const BRUTALIST_DURATION = TITLE_DUR + CURRENT_DUR + WORK_DUR;

const ACCENT = "#000000";

export type BrutalistHeroProps = {
  name: string;
  role: string;
  location: string;
  employer: string;
  employerRole: string;
  employerPeriod: string;
  projects: readonly { name: string; stack: string }[];
};

// Shared top/bottom chrome — identical across scenes so cuts feel like one reel
const Chrome: React.FC<{ scene: string; sceneIndex: string }> = ({
  scene,
  sceneIndex,
}) => (
  <>
    <div
      style={{
        position: "absolute",
        top: 40,
        left: 80,
        right: 80,
        display: "flex",
        justifyContent: "space-between",
        fontSize: 16,
        letterSpacing: 5,
        textTransform: "uppercase",
        fontWeight: 600,
        fontFamily: "var(--font-jetbrains-mono), monospace",
      }}
    >
      <span>█ {scene}</span>
      <span>REEL 01 · PORTFOLIO / 2026</span>
      <span>{sceneIndex}</span>
    </div>
    <div
      style={{
        position: "absolute",
        bottom: 40,
        left: 80,
        right: 80,
        display: "flex",
        justifyContent: "space-between",
        fontSize: 14,
        letterSpacing: 4,
        textTransform: "uppercase",
        fontWeight: 600,
        fontFamily: "var(--font-jetbrains-mono), monospace",
      }}
    >
      <span>MANCHESTER · UK</span>
      <span>— MUHAMMAD IBRAHIM TARIQ —</span>
      <span>CONT. →</span>
    </div>
  </>
);

// ─────────────────────────────────────────────
// SCENE 01 — IDENTITY CARD
// ─────────────────────────────────────────────
const SceneIdentity: React.FC<{ name: string; role: string; location: string }> = ({
  name,
  role,
  location,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s1 = spring({ frame: frame - 2, fps, config: { damping: 22, mass: 0.9 } });
  const s2 = spring({ frame: frame - 22, fps, config: { damping: 22, mass: 0.9 } });
  const s3 = spring({ frame: frame - 40, fps, config: { damping: 22, mass: 0.9 } });

  // Yellow accent bar grows
  const barW = interpolate(frame, [50, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#fff",
        color: "#ff0000",
        fontFamily: "var(--font-space-grotesk), sans-serif",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />
      <Chrome scene="IDENTITY" sceneIndex="01 / 03" />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: 8,
            fontWeight: 600,
            fontFamily: "var(--font-jetbrains-mono), monospace",
            opacity: s1,
            transform: `translateY(${interpolate(s1, [0, 1], [20, 0])}px)`,
          }}
        >
          [ {location.toUpperCase()} ]
        </div>

        <div
          style={{
            marginTop: 30,
            fontSize: 200,
            fontWeight: 900,
            letterSpacing: -10,
            lineHeight: 0.9,
            textTransform: "uppercase",
            textAlign: "center",
            opacity: s2,
            transform: `translateY(${interpolate(s2, [0, 1], [30, 0])}px)`,
            filter: `blur(${interpolate(s2, [0, 1], [12, 0])}px)`,
          }}
        >
          {name}
        </div>

        {/* Yellow accent */}
        <div
          style={{
            marginTop: 34,
            height: 18,
            width: 800 * barW,
            background: ACCENT,
            border: "3px solid #ff0000",
          }}
        />

        <div
          style={{
            marginTop: 30,
            fontSize: 38,
            letterSpacing: 4,
            fontWeight: 600,
            textTransform: "uppercase",
            opacity: s3,
          }}
        >
          {role}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// SCENE 02 — CURRENT ROLE
// ─────────────────────────────────────────────
const SceneCurrent: React.FC<{
  employer: string;
  employerRole: string;
  employerPeriod: string;
}> = ({ employer, employerRole, employerPeriod }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nowS = spring({ frame, fps, config: { damping: 22 } });
  const employerS = spring({ frame: frame - 18, fps, config: { damping: 20, mass: 0.8 } });
  const roleS = spring({ frame: frame - 48, fps, config: { damping: 22 } });
  const rulerProg = interpolate(frame, [26, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#fff",
        color: "#ff0000",
        fontFamily: "var(--font-space-grotesk), sans-serif",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />
      <Chrome scene="CURRENT ROLE" sceneIndex="02 / 03" />

      <AbsoluteFill
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "0 120px",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 8,
            fontWeight: 600,
            fontFamily: "var(--font-jetbrains-mono), monospace",
            background: "#ff0000",
            color: ACCENT,
            padding: "8px 14px",
            opacity: nowS,
            transform: `translateX(${interpolate(nowS, [0, 1], [-40, 0])}px)`,
          }}
        >
          NOW · {employerPeriod}
        </div>

        <div
          style={{
            marginTop: 30,
            fontSize: 220,
            fontWeight: 900,
            letterSpacing: -10,
            lineHeight: 0.9,
            textTransform: "uppercase",
            opacity: employerS,
            transform: `translateX(${interpolate(employerS, [0, 1], [-80, 0])}px)`,
          }}
        >
          {employer}
        </div>

        {/* Horizontal ruler */}
        <div
          style={{
            marginTop: 30,
            height: 14,
            width: 900 * rulerProg,
            background: ACCENT,
            border: "3px solid #ff0000",
          }}
        />

        <div
          style={{
            marginTop: 24,
            fontSize: 36,
            letterSpacing: 2,
            fontWeight: 600,
            opacity: roleS,
            transform: `translateY(${interpolate(roleS, [0, 1], [20, 0])}px)`,
          }}
        >
          {employerRole}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// SCENE 03 — SELECTED WORK
// ─────────────────────────────────────────────
const SceneWork: React.FC<{ projects: BrutalistHeroProps["projects"] }> = ({
  projects,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerS = spring({ frame, fps, config: { damping: 22 } });

  return (
    <AbsoluteFill
      style={{
        background: "#fff",
        color: "#ff0000",
        fontFamily: "var(--font-space-grotesk), sans-serif",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />
      <Chrome scene="SELECTED WORK" sceneIndex="03 / 03" />

      <AbsoluteFill
        style={{
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontSize: 60,
            fontWeight: 900,
            letterSpacing: -3,
            textTransform: "uppercase",
            opacity: headerS,
            transform: `translateY(${interpolate(headerS, [0, 1], [15, 0])}px)`,
          }}
        >
          Selected work <span style={{ color: "#ff000040" }}>/</span>{" "}
          <span style={{ background: ACCENT, padding: "0 14px", border: "3px solid #ff0000" }}>
            {projects.length.toString().padStart(2, "0")}
          </span>
        </div>

        <div
          style={{
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {projects.map((p, i) => {
            const pS = spring({
              frame: frame - 20 - i * 18,
              fps,
              config: { damping: 20 },
            });
            return (
              <div
                key={p.name}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 40,
                  borderBottom: "3px solid #ff0000",
                  paddingBottom: 14,
                  opacity: pS,
                  transform: `translateY(${interpolate(pS, [0, 1], [30, 0])}px)`,
                }}
              >
                <span
                  style={{
                    fontSize: 28,
                    letterSpacing: 4,
                    fontWeight: 700,
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    color: "#ff000080",
                    minWidth: 100,
                  }}
                >
                  0{i + 1}/
                </span>
                <span
                  style={{
                    fontSize: 110,
                    fontWeight: 900,
                    letterSpacing: -5,
                    lineHeight: 0.9,
                    textTransform: "uppercase",
                    flex: 1,
                  }}
                >
                  {p.name}
                </span>
                <span
                  style={{
                    fontSize: 20,
                    letterSpacing: 3,
                    fontWeight: 600,
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    textAlign: "right",
                    maxWidth: 500,
                  }}
                >
                  {p.stack}
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// MASTER
// ─────────────────────────────────────────────
export const BrutalistHero: React.FC<BrutalistHeroProps> = ({
  name,
  role,
  location,
  employer,
  employerRole,
  employerPeriod,
  projects,
}) => {
  return (
    <AbsoluteFill style={{ background: "#fff" }}>
      <Sequence from={0} durationInFrames={TITLE_DUR}>
        <SceneIdentity name={name} role={role} location={location} />
      </Sequence>
      <Sequence from={TITLE_DUR} durationInFrames={CURRENT_DUR}>
        <SceneCurrent
          employer={employer}
          employerRole={employerRole}
          employerPeriod={employerPeriod}
        />
      </Sequence>
      <Sequence from={TITLE_DUR + CURRENT_DUR} durationInFrames={WORK_DUR}>
        <SceneWork projects={projects} />
      </Sequence>
    </AbsoluteFill>
  );
};
