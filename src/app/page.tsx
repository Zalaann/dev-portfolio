import { HeroMagnetic } from "@/components/HeroMagnetic";
import { MetricTickerPlayer } from "@/components/MetricTickerPlayer";
import { ProjectReelPlayer } from "@/components/ProjectReelPlayer";
import { TimeMachineModal } from "@/components/TimeMachineModal";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  ProjectScreenshotDrawer,
  RECELLO_SCREENSHOTS,
  FATTYS_SCREENSHOTS,
  NUCH_SCREENSHOTS,
} from "@/components/ProjectScreenshotDrawer";
import { GitHubGrid } from "@/components/GitHubGrid";
import {
  profile,
  experience,
  projects,
  skillGroups,
  education,
} from "@/content/portfolio";

function splitMetric(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: value };
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

const ACCENT = "#000000";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-space-grotesk)] text-[#ff0000]">
      {/* Hero — magnetic letters */}
      <section className="mx-auto max-w-[1400px] p-6 pt-10">
        <HeroMagnetic location={profile.location} role="Software Engineer" />
      </section>

      {/* Intro strip */}
      <section className="border-y-[3px] border-[#ff0000] bg-white">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 divide-x-[3px] divide-[#ff0000]">
          <div className="col-span-12 p-8 md:col-span-8">
            <div className="text-[11px] font-semibold uppercase tracking-[0.3em]">
              / INDEX
            </div>
            <h2 className="mt-4 text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-7xl">
              Writes <span className="bg-[#ff0000] text-[#000000] px-2">code</span>.
              <br /> Ships <span className="bg-[#ff0000] text-[#000000] px-2">product</span>.
              <br /> Optimises <span className="bg-[#000000] px-2">every millisecond</span>.
            </h2>
          </div>
          <div className="col-span-12 p-8 md:col-span-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.3em]">
              / BRIEF
            </div>
            <p className="mt-4 text-lg leading-snug">{profile.bio}</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-6 inline-block border-[3px] border-[#ff0000] bg-[#ff0000] px-4 py-2 text-sm font-semibold uppercase tracking-wider text-[#000000] transition hover:bg-[#000000] hover:text-[#ff0000]"
            >
              [ WRITE TO ME → ]
            </a>
          </div>
        </div>
      </section>

      {/* Experience */}
      <ScrollReveal>
      <section className="bg-[#fafafa]">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <div className="mb-12 flex items-end justify-between border-b-[3px] border-[#ff0000] pb-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.3em]">
                / 01
              </div>
              <h2 className="text-5xl font-bold uppercase tracking-tight sm:text-6xl">
                Experience
              </h2>
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.3em]">
              N = {experience.length}
            </div>
          </div>
          {experience.map((j) => {
            const metric = j.highlight ? splitMetric(j.highlight.value) : null;
            return (
              <article key={j.company} className="grid gap-6 border-b-[3px] border-[#ff0000] py-10 md:grid-cols-12">
                <div className="md:col-span-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.3em]">
                    {j.period}
                  </div>
                  <div className="mt-3 text-3xl font-bold uppercase tracking-tight">
                    {j.company}
                  </div>
                  <div className="mt-1 text-base">{j.role}</div>
                  <div className="mt-1 text-sm text-[#ff0000]/60">{j.location}</div>
                  {metric && j.highlight && (
                    <div className="mt-6">
                      <MetricTickerPlayer
                        targetValue={metric.num}
                        suffix={metric.suffix}
                        label={j.highlight.label}
                        sublabel={`@ ${j.company}`}
                      />
                    </div>
                  )}
                </div>
                <div className="md:col-span-8">
                  <ul className="space-y-3 text-lg leading-snug">
                    {j.bullets.map((b) => (
                      <li key={b} className="flex gap-4 border-b border-[#ff0000]/15 pb-3">
                        <span className="font-bold">→</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}

          {/* Time Machine button — at end of Experience section */}
          <div className="mt-8">
            <TimeMachineModal />
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
      {/* @swap-protected */}
      {/* Projects — dark contrast section: bg stays black in both modes; accent flips yellow ↔ red */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <div className="mb-12 flex items-end justify-between border-b-[3px] border-[#ff0000] pb-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#ff0000]">
                / 02
              </div>
              <h2 className="text-5xl font-bold uppercase tracking-tight sm:text-6xl">
                Projects
              </h2>
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#ff0000]">
              N = {projects.length}
            </div>
          </div>
          <div className="mb-8">
            <ProjectReelPlayer
              projects={projects.map((p) => ({
                name: p.name,
                blurb: p.blurb,
                stack: p.stack.join(" · "),
              }))}
            />
          </div>
          <div className="grid gap-0 border-[3px] border-[#ff0000]">
            {projects.map((p, i) => (
              <article
                key={p.name}
                className={`border-[#ff0000] p-8 ${
                  i !== projects.length - 1 ? "border-b-[3px]" : ""
                }`}
              >
                <div className="grid gap-6 md:grid-cols-12">
                  <div className="md:col-span-1">
                    <div className="text-4xl font-bold text-[#ff0000]">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="md:col-span-5">
                    <h3 className="text-4xl font-bold uppercase tracking-tight">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-lg text-white/80">{p.blurb}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="border border-[#ff0000]/50 bg-[#ff0000]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#ff0000]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-6">
                    <ul className="space-y-2 text-base leading-snug text-white/85">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="text-[#ff0000]">▸</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <ProjectScreenshotDrawer
                  name={p.name}
                  kind={p.name === "Nuch Summarizer" ? "desktop" : "phone"}
                  screenshots={
                    p.name === "Recello"
                      ? RECELLO_SCREENSHOTS
                      : p.name === "FATTYS"
                      ? FATTYS_SCREENSHOTS
                      : p.name === "Nuch Summarizer"
                      ? NUCH_SCREENSHOTS
                      : undefined
                  }
                />
              </article>
            ))}
          </div>
        </div>
      </section>
      {/* @swap-end */}
      </ScrollReveal>

      {/* Stack */}
      <ScrollReveal>
      <section className="border-t-[3px] border-[#ff0000] bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <div className="mb-12 flex items-end justify-between border-b-[3px] border-[#ff0000] pb-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.3em]">
                / 03
              </div>
              <h2 className="text-5xl font-bold uppercase tracking-tight sm:text-6xl">
                Stack
              </h2>
            </div>
          </div>
          <div className="grid gap-0 border-[3px] border-[#ff0000] md:grid-cols-2">
            {skillGroups.map((g, i) => (
              <div
                key={g.label}
                className={`p-6 ${i < skillGroups.length - (skillGroups.length % 2 === 0 ? 2 : 1) ? "border-b-[3px] border-[#ff0000]" : ""} ${
                  i % 2 === 0 ? "md:border-r-[3px] md:border-[#ff0000]" : ""
                }`}
                style={{ backgroundColor: i % 2 === 0 ? ACCENT : "#fff" }}
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.3em]">
                  / {g.label}
                </div>
                <div className="mt-3 text-xl font-semibold leading-snug">
                  {g.items.join(" · ")}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <div className="text-[11px] font-semibold uppercase tracking-[0.3em]">
              / EDUCATION
            </div>
            <ul className="mt-4 border-[3px] border-[#ff0000]">
              {education.map((e, i) => (
                <li
                  key={`${e.school}-${e.period}`}
                  className={`flex flex-wrap items-baseline justify-between gap-2 p-4 ${
                    i !== education.length - 1 ? "border-b-[3px] border-[#ff0000]" : ""
                  }`}
                >
                  <div>
                    <div className="text-lg font-semibold">{e.degree}</div>
                    <div className="text-sm text-[#ff0000]/70">{e.school}</div>
                  </div>
                  <div className="text-[11px] font-semibold uppercase tracking-widest">
                    {e.period}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Activity */}
      <ScrollReveal>
        <GitHubGrid />
      </ScrollReveal>

      {/* Footer / Contact */}
      <ScrollReveal>
      <footer className="border-t-[3px] border-[#ff0000] bg-[#000000]">
        <div className="mx-auto max-w-[1400px] px-6 py-16">
          <div className="text-[11px] font-semibold uppercase tracking-[0.3em]">
            / END
          </div>
          <h2 className="mt-4 text-6xl font-bold uppercase tracking-tight sm:text-8xl">
            Work with me.
          </h2>
          <a
            href={`mailto:${profile.email}`}
            className="mt-8 inline-block border-[3px] border-[#ff0000] bg-[#ff0000] px-6 py-4 text-xl font-semibold uppercase tracking-wider text-[#000000]"
          >
            {profile.email} →
          </a>
        </div>
        <div className="border-t-[3px] border-[#ff0000]">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.2em]">
            <span>© 2026 IBRAHIM TARIQ</span>
            <span>▪ BRUTALIST EDITION ▪</span>
          </div>
        </div>
      </footer>
      </ScrollReveal>
    </div>
  );
}
