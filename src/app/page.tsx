import Link from "next/link";
import { templates } from "@/content/templates";
import { profile } from "@/content/portfolio";

export default function TemplatesIndex() {
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-space-grotesk)] text-[#ff0000]">
      {/* Top ribbon */}
      <div className="border-b-[3px] border-[#ff0000] bg-[#000000]">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em]">
          <span>► PORTFOLIO LAB / 2026</span>
          <span className="hidden sm:inline">4 BRUTALIST VARIANTS</span>
          <span>IBRAHIM_TARIQ</span>
        </div>
      </div>

      <header className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="text-[11px] font-semibold uppercase tracking-[0.3em]">
          / INDEX — BRUTALIST FAMILY
        </div>
        <h1 className="mt-6 text-6xl font-bold uppercase leading-[0.92] tracking-tight sm:text-8xl">
          Four portfolios.
          <br />
          <span className="bg-[#ff0000] text-[#000000] px-3">One engineer.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-xl leading-snug">
          Same content — {profile.name}&apos;s work and background — expressed as four
          distinct brutalist websites. Each one leans heavily into Remotion for
          animation. Pick a variant to explore.
        </p>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 pb-32">
        <ul className="grid gap-6 md:grid-cols-2">
          {templates.map((t, i) => (
            <li key={t.slug}>
              <Link
                href={`/templates/${t.slug}`}
                className="group relative block overflow-hidden border-[3px] border-[#ff0000] bg-white shadow-[10px_10px_0_0_#000000] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[6px_6px_0_0_#000000]"
              >
                <div className="flex items-center justify-between border-b-[3px] border-[#ff0000] bg-[#ff0000] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-white">
                  <span>VARIANT {t.index}</span>
                  <div className="flex gap-1.5">
                    {t.palette.map((c) => (
                      <span
                        key={c}
                        className="h-4 w-4 ring-1 ring-white/40"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-4xl font-bold uppercase tracking-tight">
                      {t.title}
                    </h2>
                    <div className="shrink-0 text-6xl font-bold leading-none text-[#ff0000]/10">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <p className="mt-2 text-base">{t.tagline}</p>
                  <div className="mt-8 flex items-center justify-between border-t-[3px] border-[#ff0000] pt-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.25em]">
                      {t.mood}
                    </span>
                    <span className="bg-[#ff0000] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#000000] transition group-hover:bg-[#000000] group-hover:text-[#ff0000]">
                      OPEN →
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <footer className="border-t-[3px] border-[#ff0000] bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-2 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.3em]">
          <span>© 2026 {profile.name}</span>
          <a href={`mailto:${profile.email}`} className="hover:underline">
            {profile.email}
          </a>
        </div>
      </footer>
    </div>
  );
}
