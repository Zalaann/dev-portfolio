import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const POSTER_STAMP_FPS = 30;
export const POSTER_STAMP_SIZE = 600;
export const POSTER_STAMP_DURATION = 360;

export type PosterStampProps = {
  aroundText: string;
  center: string;
  subtext: string;
};

export const PosterStamp: React.FC<PosterStampProps> = ({ aroundText, center, subtext }) => {
  const frame = useCurrentFrame();

  const rotation = (frame * 0.6) % 360;
  const pulse = interpolate(Math.sin(frame * 0.08), [-1, 1], [0.97, 1.03]);
  const pressFadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const radius = 240;
  const centerX = POSTER_STAMP_SIZE / 2;
  const centerY = POSTER_STAMP_SIZE / 2;

  return (
    <AbsoluteFill
      style={{
        background: "#f5efe3",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-space-grotesk), sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Paper grain */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 30%, rgba(15,15,15,0.05) 1px, transparent 1px)",
          backgroundSize: "5px 5px",
          mixBlendMode: "multiply",
        }}
      />

      <svg
        width={POSTER_STAMP_SIZE}
        height={POSTER_STAMP_SIZE}
        viewBox={`0 0 ${POSTER_STAMP_SIZE} ${POSTER_STAMP_SIZE}`}
        style={{ opacity: pressFadeIn, transform: `scale(${pulse})` }}
      >
        <defs>
          <path
            id="stamp-circle"
            d={`M ${centerX - radius},${centerY} a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 ${-radius * 2},0`}
          />
        </defs>

        {/* Orange ring */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius + 20}
          fill="none"
          stroke="#ff4500"
          strokeWidth={6}
          opacity={0.9}
          style={{ mixBlendMode: "multiply" as const }}
        />

        {/* Teal ring mis-reg */}
        <circle
          cx={centerX + 3}
          cy={centerY + 2}
          r={radius + 20}
          fill="none"
          stroke="#008b8b"
          strokeWidth={6}
          opacity={0.85}
          style={{ mixBlendMode: "multiply" as const }}
        />

        {/* Black outer ring */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius + 10}
          fill="none"
          stroke="#0f0f0f"
          strokeWidth={3}
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={radius - 50}
          fill="none"
          stroke="#0f0f0f"
          strokeWidth={2}
        />

        {/* Rotating text around ring */}
        <g transform={`rotate(${rotation} ${centerX} ${centerY})`}>
          <text fontSize={22} fontWeight={700} fill="#0f0f0f" letterSpacing={6}>
            <textPath href="#stamp-circle" startOffset={0}>
              {aroundText}
            </textPath>
          </text>
        </g>

        {/* Center block */}
        <g>
          <rect
            x={centerX - 160}
            y={centerY - 70}
            width={320}
            height={140}
            fill="#0f0f0f"
            style={{ mixBlendMode: "multiply" as const }}
          />
          <rect
            x={centerX - 160 + 6}
            y={centerY - 70 + 4}
            width={320}
            height={140}
            fill="#ff4500"
            opacity={0.25}
            style={{ mixBlendMode: "multiply" as const }}
          />
          <text
            x={centerX}
            y={centerY - 5}
            textAnchor="middle"
            fontSize={44}
            fontWeight={900}
            letterSpacing={-1}
            fill="#f5efe3"
          >
            {center}
          </text>
          <text
            x={centerX}
            y={centerY + 35}
            textAnchor="middle"
            fontSize={14}
            fontWeight={600}
            letterSpacing={4}
            fill="#f5efe3"
          >
            {subtext}
          </text>
        </g>

        {/* Star accents */}
        <g transform={`rotate(${-rotation * 0.5} ${centerX} ${centerY})`}>
          {[0, 90, 180, 270].map((a) => {
            const rad = (a * Math.PI) / 180;
            const x = centerX + Math.cos(rad) * (radius - 25);
            const y = centerY + Math.sin(rad) * (radius - 25);
            return (
              <text
                key={a}
                x={x}
                y={y + 6}
                textAnchor="middle"
                fontSize={18}
                fill="#ff4500"
                fontWeight={700}
                style={{ mixBlendMode: "multiply" as const }}
              >
                ✦
              </text>
            );
          })}
        </g>
      </svg>
    </AbsoluteFill>
  );
};
