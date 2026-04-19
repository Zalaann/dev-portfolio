"use client";

import { useEffect, useMemo, useState } from "react";

// NOTE: This component intentionally uses Tailwind `zinc-*` and `red-*`
// utilities (instead of `bg-black`, `text-black`, or arbitrary hex like
// `[#ff0000]`) so the brutalist color-swap script does not touch it. The
// modal stays visually consistent across yellow and red themes.

type Item = {
  kind: "edu" | "project" | "exp";
  title: string;
  sub?: string;
  from: number;
  to: number;
  body?: string;
};

const ITEMS: Item[] = [
  {
    kind: "edu",
    title: "Bachelor of Computer Science",
    sub: "FAST National University",
    from: 2020,
    to: 2021,
  },
  {
    kind: "edu",
    title: "Bachelor of Artificial Intelligence",
    sub: "FAST National University",
    from: 2021,
    to: 2024,
  },
  {
    kind: "project",
    title: "Recello",
    sub: "Mobile · React Native · Supabase",
    from: 2024,
    to: 2026,
    body: "Used-phone marketplace for Pakistan. Listings, search, real-time chat.",
  },
  {
    kind: "project",
    title: "FATTYS",
    sub: "Mobile · React Native · Supabase",
    from: 2024,
    to: 2026,
    body: "Mobile skincare commerce with variant-aware carts and live inventory.",
  },
  {
    kind: "edu",
    title: "Bachelor of Applied Computing",
    sub: "University of East London",
    from: 2024,
    to: 2025,
  },
  {
    kind: "project",
    title: "Nuch Summarizer",
    sub: "Web · Next.js · OpenAI",
    from: 2025,
    to: 2026,
    body: "AI text + audio summaries powered by GPT and Whisper.",
  },
  {
    kind: "exp",
    title: "Intern Software Engineer",
    sub: "Kaye MacKenzie · Manchester",
    from: 2025,
    to: 2026,
    body: "EdTech and cross-platform products. Cut operational cost 30%.",
  },
];

const MIN_YEAR = 2020;
const MAX_YEAR = 2026;

const YEAR_TAGLINES: Record<number, string> = {
  2020: "Just starting — first year of CS at FAST.",
  2021: "Switching tracks — Bachelor of AI begins.",
  2022: "Deep in AI coursework: ML, OS, Stats.",
  2023: "Building, learning, prototyping in AI.",
  2024: "Wrapping up FAST + UEL Applied Computing + first apps.",
  2025: "First role at Kaye MacKenzie. Shipping production code.",
  2026: "Now — building production EdTech + the portfolio you're reading.",
};

const KIND_META = {
  edu: { label: "EDUCATION" },
  project: { label: "PROJECT" },
  exp: { label: "EXPERIENCE" },
} as const;

export function TimeMachineModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group flex w-full cursor-pointer items-center justify-between border-2 border-red-600/40 bg-red-600/5 px-5 py-4 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold uppercase tracking-[0.25em] text-red-600 transition-colors duration-300 hover:border-red-600 hover:bg-red-600/10"
      >
        <span className="flex items-center gap-3">
          <span className="text-lg">▸</span>
          OPEN TIME MACHINE
          <span className="ml-2 hidden border border-red-600/40 px-2 py-0.5 text-[9px] tracking-widest text-red-600/70 sm:inline">
            INTERACTIVE
          </span>
        </span>
        <span className="hidden text-zinc-500 group-hover:text-zinc-700 sm:inline">
          ← SCRUB MY CAREER 2020 → 2026 →
        </span>
      </button>

      {open && <TimeMachineSheet onClose={() => setOpen(false)} />}
    </>
  );
}

function TimeMachineSheet({ onClose }: { onClose: () => void }) {
  const [year, setYear] = useState(2024);

  const active = useMemo(
    () => ITEMS.filter((item) => year >= item.from && year <= item.to),
    [year],
  );
  const inactive = useMemo(
    () => ITEMS.filter((item) => year < item.from || year > item.to),
    [year],
  );
  const counts = useMemo(
    () => ({
      edu: active.filter((i) => i.kind === "edu").length,
      project: active.filter((i) => i.kind === "project").length,
      exp: active.filter((i) => i.kind === "exp").length,
    }),
    [active],
  );

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-zinc-950/85 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-[1400px] overflow-y-auto border-[4px] border-zinc-900 bg-white shadow-[20px_20px_0_0_#dc2626]">
        {/* Sticky top bar */}
        <div className="sticky top-0 z-50 flex items-center justify-between border-b-[3px] border-zinc-900 bg-red-600 px-6 py-3 font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-semibold uppercase tracking-[0.25em] text-white">
          <span>▣ TIME MACHINE · CAREER SCRUBBER</span>
          <span className="hidden sm:inline">ESC OR CLICK BACKDROP TO CLOSE</span>
          <button
            onClick={onClose}
            className="border border-white px-3 py-1 transition hover:bg-white hover:text-red-600"
            aria-label="Close"
          >
            CLOSE ×
          </button>
        </div>

        {/* Slider section */}
        <section className="border-b-[3px] border-zinc-900 bg-white">
          <div className="px-6 py-8">
            <div className="grid items-end gap-6 md:grid-cols-12">
              <div className="md:col-span-3">
                <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.25em] text-zinc-500">
                  YEAR
                </div>
                <div className="mt-1 text-7xl font-bold leading-none tracking-tight tabular-nums text-zinc-900">
                  {year}
                </div>
              </div>
              <div className="md:col-span-9">
                <input
                  type="range"
                  min={MIN_YEAR}
                  max={MAX_YEAR}
                  step={1}
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value, 10))}
                  aria-label="Year"
                  className="brutal-slider w-full"
                />
                <div className="mt-2 flex justify-between font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-bold uppercase tracking-[0.25em]">
                  {Array.from({ length: MAX_YEAR - MIN_YEAR + 1 }).map((_, i) => {
                    const y = MIN_YEAR + i;
                    return (
                      <button
                        key={y}
                        onClick={() => setYear(y)}
                        className={`px-2 py-1 transition-colors ${
                          y === year
                            ? "bg-zinc-900 text-red-500"
                            : "text-zinc-400 hover:text-zinc-900"
                        }`}
                      >
                        {y}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 border-t-[3px] border-zinc-900 pt-5">
              <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.25em] text-red-600">
                IN {year} · IBRAHIM IS
              </div>
              <h2 className="mt-3 text-3xl font-bold leading-snug tracking-tight text-zinc-900 sm:text-4xl">
                {YEAR_TAGLINES[year]}
              </h2>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-0 border-[3px] border-zinc-900">
              {(["edu", "project", "exp"] as const).map((kind, i) => {
                const palette = [
                  { bg: "bg-red-600", label: "text-white", num: "text-white" },
                  { bg: "bg-white", label: "text-zinc-500", num: "text-zinc-900" },
                  { bg: "bg-zinc-900", label: "text-red-500", num: "text-white" },
                ][i];
                return (
                  <div
                    key={kind}
                    className={`p-4 ${palette.bg} ${i < 2 ? "border-r-[3px] border-zinc-900" : ""}`}
                  >
                    <div
                      className={`font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.3em] ${palette.label}`}
                    >
                      {KIND_META[kind].label}
                    </div>
                    <div
                      className={`mt-2 text-4xl font-bold leading-none tabular-nums ${palette.num}`}
                    >
                      {String(counts[kind]).padStart(2, "0")}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Active items */}
        <section className="px-6 py-8">
          <div className="mb-5 flex items-end justify-between border-b-[3px] border-zinc-900 pb-3">
            <h3 className="text-2xl font-bold uppercase tracking-tight text-zinc-900">
              ACTIVE / {year}
            </h3>
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.25em] text-zinc-500">
              N = {active.length}
            </span>
          </div>

          {active.length === 0 ? (
            <div className="border-2 border-dashed border-zinc-300 p-10 text-center font-[family-name:var(--font-jetbrains-mono)] text-sm uppercase tracking-[0.25em] text-zinc-400">
              // NOTHING HERE YET
            </div>
          ) : (
            <ul className="grid gap-4 md:grid-cols-2">
              {active.map((item) => (
                <li
                  key={`${item.kind}-${item.title}`}
                  className="border-2 border-zinc-900 bg-white p-5"
                  style={{ animation: "tmPopIn 0.4s cubic-bezier(0.22,1,0.36,1)" }}
                >
                  <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold uppercase tracking-[0.3em] text-red-600">
                    {KIND_META[item.kind].label} · {item.from}–
                    {item.to === MAX_YEAR ? "NOW" : item.to}
                  </div>
                  <div className="mt-2 text-xl font-bold uppercase tracking-tight text-zinc-900">
                    {item.title}
                  </div>
                  {item.sub && (
                    <div className="mt-1 text-sm text-zinc-500">{item.sub}</div>
                  )}
                  {item.body && (
                    <p className="mt-3 text-sm leading-snug text-zinc-700">
                      {item.body}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}

          {inactive.length > 0 && (
            <div className="mt-8">
              <div className="mb-3 font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.25em] text-zinc-400">
                // NOT YET / NO LONGER ACTIVE — N = {inactive.length}
              </div>
              <ul className="flex flex-wrap gap-2">
                {inactive.map((item) => (
                  <li
                    key={`out-${item.kind}-${item.title}`}
                    className="border border-zinc-200 px-3 py-1.5 text-xs uppercase tracking-wide text-zinc-400"
                  >
                    {item.title} · {item.from}–
                    {item.to === MAX_YEAR ? "now" : item.to}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <style>{`
          @keyframes tmPopIn {
            0% { opacity: 0; transform: translateY(8px) scale(0.97); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          .brutal-slider {
            appearance: none;
            height: 12px;
            background: #ffffff;
            border: 3px solid #18181b;
            outline: none;
          }
          .brutal-slider::-webkit-slider-thumb {
            appearance: none;
            width: 28px;
            height: 28px;
            background: #dc2626;
            border: 3px solid #18181b;
            cursor: pointer;
            margin-top: 0;
          }
          .brutal-slider::-moz-range-thumb {
            width: 28px;
            height: 28px;
            background: #dc2626;
            border: 3px solid #18181b;
            cursor: pointer;
          }
        `}</style>
      </div>
    </div>
  );
}
