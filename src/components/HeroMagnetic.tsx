"use client";

import { useEffect, useRef, useState } from "react";

const NAME_LINES = ["MUHAMMAD", "IBRAHIM TARIQ"] as const;

const REPEL_RADIUS = 200;
const FORCE = 75;
const SPRING = 0.18;

const MARQUEE_ITEMS = [
  "MUHAMMAD IBRAHIM TARIQ",
  "SOFTWARE ENGINEER · MANCHESTER",
  "REACT · NEXT.JS · REACT NATIVE · SUPABASE",
  "BUILDS PRODUCT · SHIPS DAILY",
];

export function HeroMagnetic({
  location,
  role,
}: {
  location: string;
  role: string;
}) {
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cursorRef = useRef({ x: -9999, y: -9999 });
  const posRef = useRef<Array<{ x: number; y: number }>>([]);
  const [active, setActive] = useState(false);
  const [tick, setTick] = useState(0);

  // Live frame counter — ticks 10x/sec
  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % 1000000), 100);
    return () => clearInterval(id);
  }, []);

  // Magnetic letters
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      if (!active) setActive(true);
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const tickFn = () => {
      letterRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = cx - cursorRef.current.x;
        const dy = cy - cursorRef.current.y;
        const dist = Math.hypot(dx, dy);
        let tx = 0;
        let ty = 0;
        if (dist > 0 && dist < REPEL_RADIUS) {
          const strength = Math.pow(1 - dist / REPEL_RADIUS, 2);
          tx = (dx / dist) * FORCE * strength;
          ty = (dy / dist) * FORCE * strength;
        }
        const cur = posRef.current[i] ?? { x: 0, y: 0 };
        cur.x += (tx - cur.x) * SPRING;
        cur.y += (ty - cur.y) * SPRING;
        posRef.current[i] = cur;
        el.style.transform = `translate3d(${cur.x.toFixed(2)}px, ${cur.y.toFixed(2)}px, 0)`;
      });
      raf = requestAnimationFrame(tickFn);
    };
    raf = requestAnimationFrame(tickFn);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [active]);

  let runningIdx = 0;

  return (
    <section className="relative border-[3px] border-[#ff0000] bg-white text-[#ff0000]">
      {/* Faint grid — slowly drifts */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          animation: "brutGridDrift 18s linear infinite",
        }}
      />

      {/* Sweeping accent line — slides across periodically */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-1/2 h-[2px] origin-left"
        style={{
          background: "linear-gradient(90deg, transparent, #ff0000, transparent)",
          animation: "brutSweep 7s ease-in-out infinite",
        }}
      />

      {/* Top meta */}
      <div className="relative z-10 flex justify-between border-b border-[#ff0000]/30 px-6 py-3 font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-semibold uppercase tracking-[0.25em]">
        <span className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 animate-pulse bg-[#ff0000]" />
          IDENTITY · MAGNETIC
        </span>
        <span className="hidden tabular-nums sm:inline">
          REEL 01 · FR {String(tick).padStart(6, "0")}
        </span>
        <span className="flex items-center gap-2">
          <span
            className="inline-block h-2 w-2 rounded-full bg-[#ff0000]"
            style={{
              animation: active ? "brutHeartbeat 1.2s ease-in-out infinite" : "none",
              opacity: active ? 1 : 0.3,
            }}
          />
          {active ? "TRACKING" : "DORMANT"}
        </span>
      </div>

      {/* Center stack */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-20 text-center sm:py-28">
        <div className="mb-8 font-[family-name:var(--font-jetbrains-mono)] text-xs font-bold uppercase tracking-[0.4em] text-[#ff0000]/60">
          [ {location.toUpperCase()} ]
        </div>

        <div className="select-none">
          {NAME_LINES.map((line, lineIdx) => (
            <div
              key={line}
              className="whitespace-nowrap font-black uppercase leading-[0.85] tracking-[-0.04em]"
              style={{
                fontSize: "clamp(40px, 9vw, 150px)",
                marginTop: lineIdx === 1 ? "-0.04em" : 0,
              }}
            >
              {line.split("").map((ch, charIdx) => {
                const i = runningIdx++;
                return (
                  <span
                    key={`${lineIdx}-${charIdx}`}
                    ref={(el) => {
                      letterRefs.current[i] = el;
                    }}
                    className="inline-block"
                    style={{
                      willChange: "transform",
                      whiteSpace: ch === " " ? "pre" : "normal",
                    }}
                  >
                    {ch === " " ? "\u00A0" : ch}
                  </span>
                );
              })}
            </div>
          ))}
        </div>

        {/* Red accent bar (pulsing width) */}
        <div className="relative mt-10 h-2 w-64 overflow-hidden bg-[#000000]">
          <div
            className="absolute inset-y-0 left-0 bg-[#ff0000]"
            style={{ width: "30%", animation: "brutBarSlide 3.5s ease-in-out infinite" }}
          />
        </div>

        <div className="mt-8 font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold uppercase tracking-[0.15em] sm:text-3xl">
          {role}
        </div>

        <div
          className="mt-12 flex items-center gap-3 font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff0000]/40 transition-opacity duration-500"
          style={{ opacity: active ? 0 : 1 }}
        >
          <span className="h-px w-10 bg-[#ff0000]/30" />
          MOVE CURSOR · LETTERS RESPOND
          <span className="h-px w-10 bg-[#ff0000]/30" />
        </div>
      </div>

      {/* Bottom — scrolling marquee inside the hero */}
      <div className="relative z-10 overflow-hidden border-t-[3px] border-[#ff0000] bg-[#000000]">
        <div
          className="flex whitespace-nowrap py-2 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold uppercase tracking-[0.3em] text-[#ff0000]"
          style={{ animation: "brutMarquee 35s linear infinite" }}
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-center gap-8 px-4"
              aria-hidden={copy === 1 ? true : undefined}
            >
              {MARQUEE_ITEMS.map((item, i) => (
                <span key={`${copy}-${i}`} className="flex items-center gap-8">
                  <span>{item}</span>
                  <span className="opacity-50">▪</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
