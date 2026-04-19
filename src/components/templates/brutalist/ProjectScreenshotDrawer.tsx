"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type Screen = { src: string; label: string };
export type DrawerKind = "phone" | "desktop";

type Dims = {
  w: number;
  h: number;
  scale: number;
  influence: number;
};

const DIMS: Record<DrawerKind, Dims> = {
  // 1290 × 2796 source → ~1 : 2.17 aspect
  phone: { w: 110, h: 238, scale: 1.95, influence: 230 },
  // 3024 × 1886 source → ~1.6 : 1 aspect
  desktop: { w: 175, h: 109, scale: 2.4, influence: 240 },
};

type DrawerProps = {
  name: string;
  screenshots?: readonly Screen[];
  kind?: DrawerKind;
};

export function ProjectScreenshotDrawer({
  name,
  screenshots,
  kind = "phone",
}: DrawerProps) {
  const hasScreenshots = !!screenshots && screenshots.length > 0;

  if (!hasScreenshots) {
    return (
      <div className="mt-6 flex items-center justify-between border border-[#ff0000]/15 px-4 py-3 font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.25em] text-white/30">
        <span className="flex items-center gap-3">
          <span>▼</span>
          {name.toUpperCase()} · SCREEN REEL
        </span>
        <span className="text-white/30">// NO PREVIEW YET</span>
      </div>
    );
  }

  return (
    <div className="group/drawer mt-6">
      {/* Bar */}
      <div className="flex cursor-pointer items-center justify-between border-2 border-[#ff0000]/40 bg-[#ff0000]/5 px-4 py-3 font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-bold uppercase tracking-[0.25em] text-[#ff0000] transition-colors duration-300 group-hover/drawer:border-[#ff0000] group-hover/drawer:bg-[#ff0000]/10">
        <span className="flex items-center gap-3">
          <span className="inline-block transition-transform duration-300 group-hover/drawer:rotate-180">
            ▼
          </span>
          {name.toUpperCase()} · SCREEN REEL · {screenshots.length} SHOTS
          <span className="ml-2 border border-[#ff0000]/40 px-1.5 py-0.5 text-[9px] tracking-widest text-[#ff0000]/70">
            {kind === "desktop" ? "DESKTOP" : "MOBILE"}
          </span>
        </span>
        <span className="hidden text-white/40 sm:inline">
          ← MOVE CURSOR TO OPEN →
        </span>
      </div>

      {/* Drawer */}
      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover/drawer:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <PhoneStripInner screens={screenshots} dims={DIMS[kind]} />
        </div>
      </div>
    </div>
  );
}

function PhoneStripInner({
  screens,
  dims,
}: {
  screens: readonly Screen[];
  dims: Dims;
}) {
  const [hoverX, setHoverX] = useState<number | null>(null);
  const [stripW, setStripW] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      const r = stripRef.current?.getBoundingClientRect();
      if (r && r.width > 0) setStripW(r.width);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stripRef.current) ro.observe(stripRef.current);
    return () => ro.disconnect();
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      const r = stripRef.current?.getBoundingClientRect();
      if (!r) return;
      if (r.width !== stripW) setStripW(r.width);
      setHoverX(e.clientX - r.left);
    },
    [stripW],
  );

  const handleLeave = useCallback(() => setHoverX(null), []);

  const N = screens.length;
  const totalGap = Math.max(0, stripW - N * dims.w);
  const gap = N > 0 ? totalGap / (N + 1) : 0;

  return (
    <div className="relative isolate overflow-hidden pt-4 pb-2">
      <div
        ref={stripRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative flex w-full items-end justify-evenly"
        style={{ minHeight: dims.h * dims.scale + 50 }}
      >
        <span
          className="pointer-events-none absolute left-2 bottom-1/2 translate-y-1/2 font-[family-name:var(--font-jetbrains-mono)] text-3xl text-[#ff0000] transition-opacity duration-300"
          style={{ opacity: hoverX === null ? 0.4 : 0.1 }}
        >
          ◀
        </span>
        <span
          className="pointer-events-none absolute right-2 bottom-1/2 translate-y-1/2 font-[family-name:var(--font-jetbrains-mono)] text-3xl text-[#ff0000] transition-opacity duration-300"
          style={{ opacity: hoverX === null ? 0.4 : 0.1 }}
        >
          ▶
        </span>

        {screens.map((s, i) => {
          const center = (i + 1) * gap + i * dims.w + dims.w / 2;
          const dist = hoverX === null ? Infinity : Math.abs(hoverX - center);
          const t = Math.max(0, 1 - dist / dims.influence);
          const scale = 1 + t * (dims.scale - 1);
          const isFocused = t > 0.6;

          const isFirst = i === 0;
          const isLast = i === N - 1;
          const transformOrigin = isFirst
            ? "left bottom"
            : isLast
            ? "right bottom"
            : "center bottom";

          return (
            <figure
              key={s.src}
              className="flex flex-col items-center"
              style={{ width: dims.w, zIndex: isFocused ? 20 : 1 }}
            >
              <div className="relative w-full" style={{ height: dims.h }}>
                <div
                  className="absolute inset-x-0 bottom-0 overflow-hidden border-2 bg-black"
                  style={{
                    height: dims.h,
                    transform: `scale(${scale})`,
                    transformOrigin,
                    transition:
                      hoverX === null
                        ? "transform 0.45s cubic-bezier(0.22,1,0.36,1), border-color 0.3s"
                        : "transform 0.16s ease-out, border-color 0.2s",
                    borderColor: isFocused
                      ? "#ff0000"
                      : "rgba(255,255,255,0.15)",
                  }}
                >
                  <Image
                    src={s.src}
                    alt={s.label}
                    fill
                    sizes="240px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <figcaption
                className="mt-3 whitespace-nowrap font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold uppercase tracking-[0.18em] transition-colors duration-300"
                style={{
                  color: isFocused ? "#ffffff" : "rgba(255,255,255,0.5)",
                }}
              >
                {String(i + 1).padStart(2, "0")} {s.label}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}

// ─────────── Project screenshot manifests ───────────

export const RECELLO_SCREENSHOTS: readonly Screen[] = [
  { src: "/projects/recello/01-signin.png", label: "SIGN IN" },
  { src: "/projects/recello/02-home.png", label: "HOME" },
  { src: "/projects/recello/03-search.png", label: "SEARCH" },
  { src: "/projects/recello/04-detail.png", label: "DETAIL" },
  { src: "/projects/recello/05-sell.png", label: "SELL" },
  { src: "/projects/recello/06-chat.png", label: "CHAT" },
];

export const FATTYS_SCREENSHOTS: readonly Screen[] = [
  { src: "/projects/fattys/1.png", label: "SIGN IN" },
  { src: "/projects/fattys/3.png", label: "HOME" },
  { src: "/projects/fattys/4.png", label: "DETAIL" },
  { src: "/projects/fattys/12.png", label: "CHECKOUT" },
  { src: "/projects/fattys/10.png", label: "ORDER" },
  { src: "/projects/fattys/6.png", label: "PROFILE" },
  { src: "/projects/fattys/7.png", label: "ACCOUNT" },
  { src: "/projects/fattys/8.png", label: "EDIT INFO" },
];

export const NUCH_SCREENSHOTS: readonly Screen[] = [
  { src: "/projects/nuch/2.png", label: "SIGN IN" },
  { src: "/projects/nuch/3.png", label: "DASHBOARD" },
  { src: "/projects/nuch/4.png", label: "TEXT SUMMARY" },
  { src: "/projects/nuch/5.png", label: "AUDIO SUMMARY" },
  { src: "/projects/nuch/6.png", label: "HISTORY" },
  { src: "/projects/nuch/8.png", label: "SETTINGS" },
];
