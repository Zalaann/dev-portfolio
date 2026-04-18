import { NoirHeroPlayer, NoirChapterPlayer } from "@/components/templates/brutalist-noir/Players";
import { BackToTemplates } from "@/components/BackToTemplates";
import { profile, experience, projects, skillGroups, education } from "@/content/portfolio";

export const metadata = { title: "Brutalist · Noir — Ibrahim Tariq" };

const CREAM = "#f0ead6";
const RED = "#dc2626";

export default function BrutalistNoirTemplate() {
  return (
    <div
      className="min-h-screen font-[family-name:var(--font-space-grotesk)]"
      style={{ background: "#0a0a0a", color: CREAM }}
    >
      <BackToTemplates />

      {/* Top film strip */}
      <div className="border-b-2 border-[#f0ead6]/30 bg-black">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-2 font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.3em] text-[#f0ead6]/70">
          <span style={{ color: RED }}>◆ REEL 01 · PORTFOLIO</span>
          <span className="hidden sm:inline">ASPECT 1.85:1 · 35MM · MONO</span>
          <span>MMXXVI</span>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1400px] px-6 pt-10">
        <NoirHeroPlayer />
      </section>

      {/* Intro typography */}
      <section className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="grid gap-12 border-y-2 border-[#f0ead6]/30 py-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div
              className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.3em]"
              style={{ color: RED }}
            >
              / DOSSIER
            </div>
            <h2 className="mt-6 text-6xl font-bold uppercase leading-[0.92] tracking-tight sm:text-7xl">
              A quiet
              <br />
              <span style={{ color: RED }}>shipper.</span>
            </h2>
          </div>
          <div className="md:col-span-7">
            <p className="text-2xl leading-[1.45]" style={{ color: CREAM }}>
              {profile.bio}
            </p>
            <p className="mt-6 text-lg text-[#f0ead6]/70">
              I care about products that feel fast and look considered — clean interfaces,
              honest performance, and the small details that make an app feel alive.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div>
                <div
                  className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: RED }}
                >
                  Location
                </div>
                <div className="mt-2 text-lg">{profile.location}</div>
              </div>
              <div>
                <div
                  className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: RED }}
                >
                  Status
                </div>
                <div className="mt-2 text-lg">◆ Available</div>
              </div>
              <div>
                <div
                  className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: RED }}
                >
                  Contact
                </div>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-2 block text-lg underline decoration-[#dc2626] decoration-2 underline-offset-4"
                >
                  {profile.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter II — The Work */}
      <div className="mx-auto max-w-[1400px] px-6">
        <NoirChapterPlayer
          roman="II"
          label="The Work"
          summary="a full-scale edtech platform · a cross-platform app"
        />
      </div>
      <section className="mx-auto max-w-[1400px] px-6 py-20">
        {experience.map((j) => (
          <article
            key={j.company}
            className="border-2 py-10"
            style={{ borderColor: CREAM + "30" }}
          >
            <div className="grid gap-8 md:grid-cols-12">
              <div className="md:col-span-4 px-6">
                <div
                  className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: RED }}
                >
                  {j.period}
                </div>
                <h3 className="mt-4 text-4xl font-bold uppercase tracking-tight">
                  {j.company}
                </h3>
                <div className="mt-1 text-lg" style={{ color: CREAM + "aa" }}>{j.role}</div>
                <div className="mt-1 text-sm" style={{ color: CREAM + "70" }}>{j.location}</div>
                {j.highlight && (
                  <div
                    className="mt-8 inline-block border-2 px-5 py-3"
                    style={{ borderColor: RED, color: RED }}
                  >
                    <div className="text-5xl font-bold">{j.highlight.value}</div>
                    <div className="mt-1 font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-widest">
                      {j.highlight.label}
                    </div>
                  </div>
                )}
              </div>
              <div className="md:col-span-8 px-6">
                <ul className="space-y-4 text-lg leading-relaxed">
                  {j.bullets.map((b, i) => (
                    <li key={b} className="flex gap-4 border-b border-[#f0ead6]/15 pb-4">
                      <span
                        className="w-8 shrink-0 font-[family-name:var(--font-jetbrains-mono)] text-sm"
                        style={{ color: RED }}
                      >
                        §{String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Chapter III — The Case Files (projects) */}
      <div className="mx-auto max-w-[1400px] px-6">
        <NoirChapterPlayer
          roman="III"
          label="Case Files"
          summary={`three studies · mobile · web · ai`}
        />
      </div>
      <section className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="space-y-6">
          {projects.map((p, i) => (
            <article
              key={p.name}
              className="grid gap-8 border-2 p-8 md:grid-cols-12"
              style={{ borderColor: CREAM + "30", background: "#000" }}
            >
              <div className="md:col-span-4">
                <div
                  className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: RED }}
                >
                  File № {String(i + 1).padStart(3, "0")}
                </div>
                <h4 className="mt-4 text-5xl font-bold uppercase tracking-tight">
                  {p.name}
                </h4>
                <p className="mt-3 text-lg" style={{ color: CREAM + "aa" }}>
                  {p.blurb}
                </p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="border px-2 py-0.5 font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider"
                      style={{ borderColor: CREAM + "60", color: CREAM }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="md:col-span-8">
                <ul className="space-y-3 text-lg leading-relaxed">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-4">
                      <span style={{ color: RED }}>—</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Chapter IV — The Arsenal (skills) */}
      <div className="mx-auto max-w-[1400px] px-6">
        <NoirChapterPlayer
          roman="IV"
          label="The Arsenal"
          summary={`${skillGroups.reduce((a, g) => a + g.items.length, 0)} tools across ${skillGroups.length} disciplines`}
        />
      </div>
      <section className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g) => (
            <div
              key={g.label}
              className="border-2 p-6"
              style={{ borderColor: CREAM + "30" }}
            >
              <div
                className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.3em]"
                style={{ color: RED }}
              >
                / {g.label}
              </div>
              <div className="mt-3 text-lg leading-snug">{g.items.join(" · ")}</div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div
            className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.3em]"
            style={{ color: RED }}
          >
            / Education
          </div>
          <ul className="mt-4 border-2" style={{ borderColor: CREAM + "30" }}>
            {education.map((e, i) => (
              <li
                key={`${e.school}-${e.period}`}
                className="flex flex-wrap items-baseline justify-between gap-2 p-4"
                style={{
                  borderBottom:
                    i !== education.length - 1 ? `2px solid ${CREAM}30` : undefined,
                }}
              >
                <div>
                  <div className="text-xl font-semibold">{e.degree}</div>
                  <div className="text-sm" style={{ color: CREAM + "aa" }}>
                    {e.school}
                  </div>
                </div>
                <div
                  className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-widest"
                  style={{ color: CREAM + "80" }}
                >
                  {e.period}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Chapter V — Credits */}
      <div className="mx-auto max-w-[1400px] px-6">
        <NoirChapterPlayer
          roman="V"
          label="The End"
          summary="— fin —"
        />
      </div>
      <section className="mx-auto max-w-[1400px] px-6 py-32 text-center">
        <div
          className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.3em]"
          style={{ color: RED }}
        >
          — THE END —
        </div>
        <h2 className="mt-8 text-7xl font-bold uppercase leading-none tracking-tight sm:text-9xl">
          Work
          <br />
          <span style={{ color: RED }}>with me.</span>
        </h2>
        <a
          href={`mailto:${profile.email}`}
          className="mt-12 inline-block border-2 px-8 py-4 text-xl font-bold uppercase tracking-wider transition"
          style={{ borderColor: CREAM, color: CREAM }}
        >
          ► {profile.email}
        </a>
      </section>

      <footer className="border-t-2 border-[#f0ead6]/20">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-2 px-6 py-4 font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.3em] text-[#f0ead6]/60">
          <span>© MMXXVI · Ibrahim Tariq</span>
          <span style={{ color: RED }}>▪ NOIR EDITION ▪</span>
          <span>PRINT A · 1 OF 1</span>
        </div>
      </footer>
    </div>
  );
}
