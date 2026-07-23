import { AnimatedCount } from "./AnimatedCount";

const USERNAME = "zalaann";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

type ApiResponse = {
  total: Record<string, number>;
  contributions: Day[];
};

const EMPTY_COLOR = "#ffffff";
const COMMIT_COLOR = "#000000";

const LEVEL_MAP: Record<string, Day["level"]> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

type CalendarDay = {
  date: string;
  contributionCount: number;
  contributionLevel: string;
};

async function fetchFromGitHub(token: string): Promise<ApiResponse | null> {
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query:
          "query($login: String!) { user(login: $login) { contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel } } } } } }",
        variables: { login: USERNAME },
      }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      data?: {
        user?: {
          contributionsCollection?: {
            contributionCalendar?: {
              totalContributions: number;
              weeks: { contributionDays: CalendarDay[] }[];
            };
          };
        };
      };
    };
    const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!cal?.weeks) return null;
    const contributions: Day[] = cal.weeks
      .flatMap((w) => w.contributionDays)
      .map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: LEVEL_MAP[d.contributionLevel] ?? 0,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
    return { total: { lastYear: cal.totalContributions }, contributions };
  } catch {
    return null;
  }
}

async function fetchContributions(): Promise<ApiResponse | null> {
  // Official API when a token is configured; community API as fallback
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    const gh = await fetchFromGitHub(token);
    if (gh) return gh;
  }
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as ApiResponse;
    if (!Array.isArray(data?.contributions)) return null;
    return data;
  } catch {
    return null;
  }
}

function computeStreaks(contributions: Day[]) {
  let longest = 0;
  let running = 0;
  for (const d of contributions) {
    if (d.count > 0) {
      running++;
      if (running > longest) longest = running;
    } else {
      running = 0;
    }
  }
  let current = 0;
  for (let i = contributions.length - 1; i >= 0; i--) {
    if (contributions[i].count > 0) current++;
    else break;
  }
  return { longest, current };
}

export async function GitHubGrid() {
  const data = await fetchContributions();

  const box = "border-[3px] border-[#ff0000]";

  if (!data) {
    return (
      <section id="activity" className="mx-auto max-w-[1400px] px-6 py-20">
        <div className={`${box} bg-white p-10 text-center`}>
          <div className="text-[11px] font-semibold uppercase tracking-[0.3em]">
            / 04 · ACTIVITY
          </div>
          <h2 className="mt-4 text-3xl font-bold uppercase">
            GitHub feed unavailable.
          </h2>
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block border-[3px] border-[#ff0000] bg-[#ff0000] px-4 py-2 text-sm font-bold uppercase tracking-wider text-[#000000]"
          >
            github.com/{USERNAME} →
          </a>
        </div>
      </section>
    );
  }

  const contributions = data.contributions;
  const totalLastYear =
    data.total?.lastYear ??
    contributions.reduce((a, d) => a + d.count, 0);

  // Pad the start so the first week aligns to Sunday
  const firstDate = new Date(contributions[0].date + "T00:00:00Z");
  const padCount = firstDate.getUTCDay(); // 0 = Sunday
  const padded: (Day | null)[] = [
    ...Array.from({ length: padCount }, () => null),
    ...contributions,
  ];

  // Group into week-columns of 7 days
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }

  // Month labels — position at the first week where a new month begins
  const monthLabels: { week: number; label: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, w) => {
    const firstReal = week.find((d): d is Day => d !== null);
    if (!firstReal) return;
    const m = new Date(firstReal.date + "T00:00:00Z").getUTCMonth();
    if (m !== lastMonth) {
      monthLabels.push({
        week: w,
        label: new Date(firstReal.date + "T00:00:00Z").toLocaleString("en-US", {
          month: "short",
          timeZone: "UTC",
        }),
      });
      lastMonth = m;
    }
  });

  const { longest, current } = computeStreaks(contributions);

  const CELL = 14;
  const GAP = 3;
  const LEFT = 36;
  const TOP = 22;
  const gridW = weeks.length * (CELL + GAP) + LEFT;
  const gridH = 7 * (CELL + GAP) + TOP;

  return (
    <section id="activity" className="mx-auto max-w-[1400px] px-6 py-20">
      <div className="mb-10 flex items-end justify-between border-b-[3px] border-[#ff0000] pb-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.3em]">
            / 04
          </div>
          <h2 className="text-5xl font-bold uppercase tracking-tight sm:text-6xl">
            Activity
          </h2>
        </div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.3em]">
          @{USERNAME} · LAST 12 MO
        </div>
      </div>

      {/* Stat row */}
      <div className="mb-6 grid grid-cols-3 gap-0 border-[3px] border-[#ff0000]">
        <Stat label="Total · 12 months" valueNode={<AnimatedCount to={totalLastYear} />} accent />
        <Stat label="Longest streak" value={`${longest} days`} />
        <Stat label="Current streak" value={`${current} days`} last />
      </div>

      {/* The grid */}
      <div className={`${box} bg-white p-6`}>
        <div className="overflow-x-auto">
          <svg
            width={gridW}
            height={gridH}
            style={{ display: "block", minWidth: gridW, shapeRendering: "crispEdges" }}
            role="img"
            aria-label={`${totalLastYear} GitHub contributions in the last year`}
          >
            {/* Month labels */}
            {monthLabels.map((m) => (
              <text
                key={`m-${m.week}`}
                x={LEFT + m.week * (CELL + GAP)}
                y={14}
                fontFamily="var(--font-jetbrains-mono), monospace"
                fontSize={10}
                fontWeight={600}
                fill="#ff0000"
                style={{ letterSpacing: 1, textTransform: "uppercase" }}
              >
                {m.label}
              </text>
            ))}

            {/* Day labels — Mon, Wed, Fri */}
            {[
              { d: 1, label: "MON" },
              { d: 3, label: "WED" },
              { d: 5, label: "FRI" },
            ].map(({ d, label }) => (
              <text
                key={label}
                x={0}
                y={TOP + d * (CELL + GAP) + CELL - 3}
                fontFamily="var(--font-jetbrains-mono), monospace"
                fontSize={9}
                fontWeight={600}
                fill="#ff0000"
                style={{ letterSpacing: 1 }}
              >
                {label}
              </text>
            ))}

            {/* Cells */}
            {weeks.flatMap((week, wi) =>
              week.map((day, di) => {
                if (!day) return null;
                return (
                  <rect
                    key={`${wi}-${di}`}
                    x={LEFT + wi * (CELL + GAP)}
                    y={TOP + di * (CELL + GAP)}
                    width={CELL}
                    height={CELL}
                    fill={day.count > 0 ? COMMIT_COLOR : EMPTY_COLOR}
                    stroke="#ff0000"
                    strokeWidth={1}
                  >
                    <title>{`${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`}</title>
                  </rect>
                );
              }),
            )}
          </svg>
        </div>

        {/* Footer row */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-semibold uppercase tracking-[0.25em] transition hover:underline"
          >
            ▸ github.com/{USERNAME}
          </a>
          <div className="flex items-center gap-3 font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-semibold uppercase tracking-[0.2em]">
            <span className="flex items-center gap-1.5">
              <span className="h-4 w-4 border border-[#ff0000]" style={{ background: EMPTY_COLOR }} />
              No commits
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-4 w-4 border border-[#ff0000]" style={{ background: COMMIT_COLOR }} />
              Committed
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  valueNode,
  accent,
  last,
}: {
  label: string;
  value?: string;
  valueNode?: React.ReactNode;
  accent?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={`p-5 ${!last ? "border-r-[3px] border-[#ff0000]" : ""}`}
      style={{ background: accent ? "#000000" : "#fff" }}
    >
      <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-semibold uppercase tracking-[0.3em]">
        {label}
      </div>
      <div className="mt-2 text-4xl font-bold tracking-tight">
        {valueNode ?? value}
      </div>
    </div>
  );
}
