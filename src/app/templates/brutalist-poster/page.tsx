import { PosterHeroPlayer, PosterStampPlayer } from "@/components/templates/brutalist-poster/Players";
import { BackToTemplates } from "@/components/BackToTemplates";
import { profile, experience, projects, skillGroups, education } from "@/content/portfolio";

export const metadata = { title: "Brutalist · Poster — Ibrahim Tariq" };

const CREAM = "#f5efe3";
const BLACK = "#0f0f0f";
const ORANGE = "#ff4500";
const TEAL = "#008b8b";

function InkText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span
        aria-hidden
        className="absolute inset-0 select-none"
        style={{ color: ORANGE, mixBlendMode: "multiply", transform: "translate(3px, 2px)" }}
      >
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 select-none"
        style={{ color: TEAL, mixBlendMode: "multiply", transform: "translate(-2px, -1px)" }}
      >
        {children}
      </span>
      <span className="relative" style={{ color: BLACK, mixBlendMode: "multiply" }}>
        {children}
      </span>
    </span>
  );
}

export default function BrutalistPosterTemplate() {
  return (
    <div
      className="relative min-h-screen font-[family-name:var(--font-space-grotesk)]"
      style={{ background: CREAM, color: BLACK }}
    >
      {/* paper grain */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-60"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(15,15,15,0.06) 1px, transparent 1px),
            radial-gradient(circle at 70% 65%, rgba(15,15,15,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "4px 4px, 7px 7px",
          mixBlendMode: "multiply",
        }}
      />
      <BackToTemplates variant="light" />

      {/* Top masthead */}
      <div className="relative z-10 border-b-[3px] border-black">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-2 font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.3em]">
          <span style={{ color: ORANGE, mixBlendMode: "multiply" }}>★ RISOGRAPH №04</span>
          <span className="hidden sm:inline">2-COLOUR · CYAN 032 + ORANGE 805</span>
          <span style={{ color: TEAL, mixBlendMode: "multiply" }}>EDITION OF ONE</span>
        </div>
      </div>

      {/* Hero — the actual poster */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-12">
        <PosterHeroPlayer />
      </section>

      {/* Intro */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-6 py-16">
        <div className="grid gap-10 border-y-[3px] border-black py-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div
              className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.3em]"
              style={{ color: ORANGE, mixBlendMode: "multiply" }}
            >
              / folio № 01
            </div>
            <h2 className="mt-6 text-6xl font-bold uppercase leading-[0.92] tracking-tight sm:text-7xl">
              <InkText>Prints</InkText>
              <br />
              <InkText>by hand.</InkText>
              <br />
              <InkText>Ships</InkText> daily.
            </h2>
          </div>
          <div className="md:col-span-7">
            <p className="text-xl leading-snug">{profile.bio}</p>
            <p className="mt-4 text-lg text-black/70">
              I care about products that feel fast and look considered — clean interfaces,
              honest performance, and small details that make a product feel alive.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div
                className="border-[3px] border-black p-4"
                style={{ background: ORANGE + "20" }}
              >
                <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.3em]" style={{ color: ORANGE, mixBlendMode: "multiply" }}>
                  Location
                </div>
                <div className="mt-1 text-lg font-semibold">{profile.location}</div>
              </div>
              <div className="border-[3px] border-black p-4" style={{ background: TEAL + "20" }}>
                <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.3em]" style={{ color: TEAL, mixBlendMode: "multiply" }}>
                  Status
                </div>
                <div className="mt-1 text-lg font-semibold">◆ Available</div>
              </div>
              <div className="border-[3px] border-black bg-black p-4 text-white">
                <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.3em]" style={{ color: ORANGE }}>
                  Contact
                </div>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-1 block break-all text-sm font-semibold"
                  style={{ color: CREAM }}
                >
                  {profile.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience — big poster for work */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-6 py-16">
        <div className="mb-10">
          <div
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.3em]"
            style={{ color: TEAL, mixBlendMode: "multiply" }}
          >
            / folio № 02
          </div>
          <h3 className="mt-6 text-6xl font-bold uppercase leading-[0.92] tracking-tight sm:text-8xl">
            <InkText>The work.</InkText>
          </h3>
        </div>
        {experience.map((j) => (
          <article
            key={j.company}
            className="relative grid gap-8 border-[3px] border-black p-8 md:grid-cols-12"
            style={{ background: "#ffffff20" }}
          >
            <div
              className="absolute -right-3 top-6 rotate-6 border-[3px] border-black p-3 text-center"
              style={{ background: ORANGE, color: BLACK }}
            >
              <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold uppercase tracking-widest">
                Certified
              </div>
              <div className="text-2xl font-bold">{j.highlight?.value}</div>
            </div>
            <div className="md:col-span-4">
              <div
                className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.3em]"
                style={{ color: ORANGE, mixBlendMode: "multiply" }}
              >
                {j.period}
              </div>
              <h4 className="mt-4 text-5xl font-bold uppercase tracking-tight">
                <InkText>{j.company}</InkText>
              </h4>
              <div className="mt-2 text-xl italic">{j.role}</div>
              <div className="mt-1 text-sm text-black/60">{j.location}</div>
            </div>
            <div className="md:col-span-8">
              <ul className="space-y-4 text-lg leading-snug">
                {j.bullets.map((b, i) => (
                  <li key={b} className="flex gap-4 border-b border-black/20 pb-4 last:border-b-0">
                    <span
                      className="w-10 shrink-0 font-[family-name:var(--font-jetbrains-mono)] text-sm font-bold"
                      style={{ color: i % 2 === 0 ? ORANGE : TEAL, mixBlendMode: "multiply" }}
                    >
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      {/* Projects as poster grid */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-6 py-16">
        <div className="mb-10">
          <div
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.3em]"
            style={{ color: ORANGE, mixBlendMode: "multiply" }}
          >
            / folio № 03
          </div>
          <h3 className="mt-6 text-6xl font-bold uppercase leading-[0.92] tracking-tight sm:text-8xl">
            <InkText>Portfolio.</InkText>
          </h3>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((p, i) => {
            const ink = i === 0 ? ORANGE : i === 1 ? TEAL : "#7e22ce";
            return (
              <article
                key={p.name}
                className="relative flex flex-col border-[3px] border-black p-6"
                style={{ background: "#ffffff30" }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-2"
                  style={{ background: ink, mixBlendMode: "multiply" }}
                />
                <div
                  className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: ink, mixBlendMode: "multiply" }}
                >
                  folio {String(i + 1).padStart(2, "0")}
                </div>
                <h4 className="mt-3 text-4xl font-bold uppercase tracking-tight leading-none">
                  <InkText>{p.name}</InkText>
                </h4>
                <p className="mt-3 text-sm font-medium">{p.blurb}</p>
                <ul className="mt-4 flex-1 space-y-1.5 text-sm">
                  {p.bullets.slice(0, 3).map((b) => (
                    <li key={b} className="flex gap-2">
                      <span style={{ color: ink, mixBlendMode: "multiply" }}>●</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-1">
                  {p.stack.slice(0, 5).map((s) => (
                    <span
                      key={s}
                      className="border-2 border-black bg-white px-2 py-0.5 font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold uppercase tracking-wider"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Stack */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-6 py-16">
        <div className="mb-10">
          <div
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.3em]"
            style={{ color: TEAL, mixBlendMode: "multiply" }}
          >
            / folio № 04
          </div>
          <h3 className="mt-6 text-6xl font-bold uppercase leading-[0.92] tracking-tight sm:text-8xl">
            <InkText>The stack.</InkText>
          </h3>
        </div>
        <div className="grid gap-0 border-[3px] border-black md:grid-cols-3">
          {skillGroups.map((g, i) => {
            const rowBreak = Math.floor(i / 3);
            const isLastRow = rowBreak === Math.floor((skillGroups.length - 1) / 3);
            const colIdx = i % 3;
            const isLastCol = colIdx === 2 || i === skillGroups.length - 1;
            const bgColor = i % 3 === 0 ? ORANGE + "20" : i % 3 === 1 ? TEAL + "20" : "transparent";
            return (
              <div
                key={g.label}
                className={`p-5 ${!isLastCol ? "md:border-r-[3px] md:border-black" : ""} ${!isLastRow ? "border-b-[3px] border-black" : ""}`}
                style={{ background: bgColor }}
              >
                <div
                  className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.3em]"
                  style={{ color: BLACK }}
                >
                  / {g.label}
                </div>
                <div className="mt-3 text-lg leading-snug font-medium">
                  {g.items.join(" · ")}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <div
              className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.3em]"
              style={{ color: ORANGE, mixBlendMode: "multiply" }}
            >
              / education
            </div>
            <ul className="mt-4 border-[3px] border-black">
              {education.map((e, i) => (
                <li
                  key={`${e.school}-${e.period}`}
                  className={`flex flex-wrap items-baseline justify-between gap-2 p-4 ${
                    i !== education.length - 1 ? "border-b-[3px] border-black" : ""
                  }`}
                >
                  <div>
                    <div className="text-xl font-bold">{e.degree}</div>
                    <div className="text-sm text-black/70">{e.school}</div>
                  </div>
                  <div className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-widest">
                    {e.period}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <div
              className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.3em]"
              style={{ color: TEAL, mixBlendMode: "multiply" }}
            >
              / stamp of approval
            </div>
            <div className="mt-4 border-[3px] border-black">
              <PosterStampPlayer />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-6 py-20">
        <div className="relative border-[3px] border-black bg-black p-12 text-center text-white">
          <div
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.3em]"
            style={{ color: ORANGE }}
          >
            / folio № 05 — print run
          </div>
          <h3 className="mt-6 text-6xl font-bold uppercase leading-none tracking-tight sm:text-8xl">
            <span className="relative inline-block">
              <span
                aria-hidden
                className="absolute inset-0"
                style={{ color: ORANGE, mixBlendMode: "screen", transform: "translate(4px, 3px)" }}
              >
                Let&apos;s make
              </span>
              <span
                aria-hidden
                className="absolute inset-0"
                style={{ color: TEAL, mixBlendMode: "screen", transform: "translate(-3px, -2px)" }}
              >
                Let&apos;s make
              </span>
              <span className="relative" style={{ color: CREAM }}>
                Let&apos;s make
              </span>
            </span>
            <br />
            <span className="relative inline-block">
              <span
                aria-hidden
                className="absolute inset-0"
                style={{ color: ORANGE, mixBlendMode: "screen", transform: "translate(4px, 3px)" }}
              >
                something.
              </span>
              <span
                aria-hidden
                className="absolute inset-0"
                style={{ color: TEAL, mixBlendMode: "screen", transform: "translate(-3px, -2px)" }}
              >
                something.
              </span>
              <span className="relative" style={{ color: CREAM }}>
                something.
              </span>
            </span>
          </h3>
          <a
            href={`mailto:${profile.email}`}
            className="mt-10 inline-block border-[3px] px-8 py-4 text-xl font-bold uppercase tracking-wider transition"
            style={{ borderColor: ORANGE, color: CREAM }}
          >
            ► {profile.email}
          </a>
        </div>
      </section>

      <footer className="relative z-10 border-t-[3px] border-black">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-2 px-6 py-4 font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.3em]">
          <span>© MMXXVI · IBRAHIM TARIQ</span>
          <span style={{ color: ORANGE, mixBlendMode: "multiply" }}>▪ POSTER EDITION ▪</span>
          <span style={{ color: TEAL, mixBlendMode: "multiply" }}>PRINTED BY HAND</span>
        </div>
      </footer>
    </div>
  );
}
