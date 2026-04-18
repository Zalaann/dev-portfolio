import {
  GlitchHeroPlayer,
  GlitchTickerPlayer,
} from "@/components/templates/brutalist-glitch/Players";
import { BackToTemplates } from "@/components/BackToTemplates";
import { profile, experience, projects, skillGroups, education } from "@/content/portfolio";

export const metadata = { title: "Brutalist · Glitch — Ibrahim Tariq" };

const MAGENTA = "#ff00aa";
const CYAN = "#00e5ff";

function RgbText({ children, size }: { children: string; size: string }) {
  return (
    <span className="relative inline-block" style={{ fontSize: size }}>
      <span
        aria-hidden
        className="absolute inset-0 select-none"
        style={{ color: CYAN, transform: "translate(-2px, -1px)", mixBlendMode: "multiply" }}
      >
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 select-none"
        style={{ color: MAGENTA, transform: "translate(2px, 1px)", mixBlendMode: "multiply" }}
      >
        {children}
      </span>
      <span className="relative" style={{ color: "#000", mixBlendMode: "multiply" }}>
        {children}
      </span>
    </span>
  );
}

export default function BrutalistGlitchTemplate() {
  return (
    <div className="min-h-screen bg-[#faf9f6] font-[family-name:var(--font-space-grotesk)] text-black">
      {/* Top scanline */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0)_0,rgba(0,0,0,0)_2px,rgba(0,0,0,0.04)_3px,rgba(0,0,0,0)_4px)]" />
      <BackToTemplates variant="light" />

      {/* Top bar */}
      <div className="relative z-10 border-b-[3px] border-black bg-black text-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-2 font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.25em]">
          <span>[SIG_LOST: 00023]</span>
          <span style={{ color: MAGENTA }}>⚠ ERR 0xF0 — FEED UNSTABLE</span>
          <span style={{ color: CYAN }}>▸ PORTFOLIO.GLITCH</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-6 pt-8">
        <GlitchHeroPlayer name="IBRAHIM TARIQ" role="SOFTWARE ENGINEER · UK" />
      </section>

      {/* Ticker */}
      <section className="relative z-10 mt-6">
        <GlitchTickerPlayer />
      </section>

      {/* Intro */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-6 py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.3em]" style={{ color: MAGENTA }}>
              / decode: about
            </div>
            <h2 className="mt-6 text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl">
              <RgbText size="1em">SHIPS FAST.</RgbText>
              <br />
              <RgbText size="1em">BREAKS CLEANLY.</RgbText>
            </h2>
          </div>
          <div className="md:col-span-7">
            <p className="text-xl leading-snug">{profile.bio}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="border-[3px] border-black bg-white p-4">
                <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.25em]" style={{ color: CYAN }}>
                  / location
                </div>
                <div className="mt-1 text-lg font-semibold">{profile.location}</div>
              </div>
              <div className="border-[3px] border-black bg-black p-4 text-white">
                <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.25em]" style={{ color: MAGENTA }}>
                  / contact
                </div>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-1 block break-all text-lg font-semibold underline decoration-[#ff00aa] decoration-2 underline-offset-4"
                >
                  {profile.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <GlitchTickerPlayer />

      {/* Experience */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-6 py-20">
        <div className="mb-10 flex items-end justify-between border-b-[3px] border-black pb-4">
          <div>
            <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.3em]" style={{ color: MAGENTA }}>
              / stream_01
            </div>
            <h3 className="text-5xl font-bold uppercase tracking-tight sm:text-6xl">
              <RgbText size="1em">EXPERIENCE.LOG</RgbText>
            </h3>
          </div>
          <div className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-widest text-black/60">
            entries: {experience.length}
          </div>
        </div>
        {experience.map((j) => (
          <article key={j.company} className="grid gap-6 border-b-[3px] border-black py-10 last:border-b-0 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.25em]" style={{ color: CYAN }}>
                {j.period}
              </div>
              <h4 className="mt-3 text-3xl font-bold uppercase tracking-tight">
                {j.company}
              </h4>
              <div className="mt-1 text-lg">{j.role}</div>
              <div className="mt-0.5 text-sm text-black/60">{j.location}</div>
              {j.highlight && (
                <div className="mt-6 inline-block border-[3px] border-black bg-black p-4 text-white">
                  <div className="text-4xl font-bold" style={{ color: MAGENTA }}>
                    {j.highlight.value}
                  </div>
                  <div className="mt-1 font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-widest" style={{ color: CYAN }}>
                    {j.highlight.label}
                  </div>
                </div>
              )}
            </div>
            <div className="md:col-span-8">
              <ul className="space-y-3 text-lg leading-snug">
                {j.bullets.map((b, i) => (
                  <li
                    key={b}
                    className="flex gap-4 border border-black/20 bg-white p-4"
                  >
                    <span
                      className="font-[family-name:var(--font-jetbrains-mono)] text-sm font-bold"
                      style={{ color: i % 2 === 0 ? MAGENTA : CYAN }}
                    >
                      0x{String(i).padStart(2, "0")}
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <GlitchTickerPlayer />

      {/* Projects */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-6 py-20">
        <div className="mb-10 flex items-end justify-between border-b-[3px] border-black pb-4">
          <div>
            <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.3em]" style={{ color: CYAN }}>
              / stream_02
            </div>
            <h3 className="text-5xl font-bold uppercase tracking-tight sm:text-6xl">
              <RgbText size="1em">PROJECTS.BIN</RgbText>
            </h3>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((p, i) => (
            <article
              key={p.name}
              className="relative border-[3px] border-black bg-white p-6"
            >
              <div className="absolute right-3 top-3 font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold uppercase tracking-widest" style={{ color: i % 2 === 0 ? MAGENTA : CYAN }}>
                0x{String(i + 1).padStart(3, "0")}
              </div>
              <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-black/60">
                /repo/{p.name.toLowerCase().replace(/\s+/g, "-")}
              </div>
              <h4 className="mt-2 text-3xl font-bold uppercase tracking-tight">
                <RgbText size="1em">{p.name}</RgbText>
              </h4>
              <p className="mt-2 text-sm">{p.blurb}</p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {p.bullets.slice(0, 3).map((b, bi) => (
                  <li key={b} className="flex gap-2">
                    <span
                      className="font-[family-name:var(--font-jetbrains-mono)] font-bold"
                      style={{ color: bi % 2 === 0 ? MAGENTA : CYAN }}
                    >
                      ▸
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="border-2 border-black bg-black px-2 py-0.5 font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold uppercase tracking-wider text-white"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <GlitchTickerPlayer />

      {/* Skills */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-6 py-20">
        <div className="mb-10 flex items-end justify-between border-b-[3px] border-black pb-4">
          <div>
            <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.3em]" style={{ color: MAGENTA }}>
              / stream_03
            </div>
            <h3 className="text-5xl font-bold uppercase tracking-tight sm:text-6xl">
              <RgbText size="1em">STACK.DUMP</RgbText>
            </h3>
          </div>
        </div>
        <div className="grid gap-0 border-[3px] border-black md:grid-cols-2">
          {skillGroups.map((g, i) => {
            const accent = i % 3 === 0 ? MAGENTA : i % 3 === 1 ? CYAN : "#000";
            return (
              <div
                key={g.label}
                className={`p-5 ${i % 2 === 0 ? "md:border-r-[3px] md:border-black" : ""} ${
                  i < skillGroups.length - 2 ? "border-b-[3px] border-black" : ""
                }`}
              >
                <div
                  className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.3em]"
                  style={{ color: accent }}
                >
                  / {g.label}
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="border-2 border-black bg-white px-2 py-0.5 text-xs font-bold"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12">
          <div className="mb-3 font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.3em]" style={{ color: CYAN }}>
            / meta: education
          </div>
          <ul className="divide-y-[3px] divide-black border-[3px] border-black">
            {education.map((e) => (
              <li
                key={`${e.school}-${e.period}`}
                className="flex flex-wrap items-baseline justify-between gap-2 p-4"
              >
                <div>
                  <div className="text-lg font-semibold">{e.degree}</div>
                  <div className="text-sm text-black/70">{e.school}</div>
                </div>
                <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-widest">
                  {e.period}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <GlitchTickerPlayer />

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-6 py-20">
        <div className="border-[3px] border-black bg-black p-12 text-center text-white">
          <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.3em]" style={{ color: CYAN }}>
            / signal recovered
          </div>
          <h3 className="mt-6 text-6xl font-bold uppercase leading-none tracking-tight sm:text-8xl">
            <RgbText size="1em">WORK WITH ME.</RgbText>
          </h3>
          <a
            href={`mailto:${profile.email}`}
            className="mt-10 inline-block border-[3px] border-white px-8 py-4 text-xl font-bold uppercase tracking-wider transition hover:bg-white hover:text-black"
          >
            ► {profile.email}
          </a>
        </div>
      </section>

      <footer className="relative z-10 border-t-[3px] border-black bg-[#faf9f6]">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-2 px-6 py-4 font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.3em]">
          <span>© 2026 IBRAHIM TARIQ</span>
          <span style={{ color: MAGENTA }}>▪ GLITCH EDITION ▪</span>
          <span style={{ color: CYAN }}>STATIC · RECOVERED</span>
        </div>
      </footer>
    </div>
  );
}
