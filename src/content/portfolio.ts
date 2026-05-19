export const profile = {
  name: "Muhammad Ibrahim Tariq",
  shortName: "Ibrahim",
  location: "Manchester, United Kingdom",
  email: "mibrahimtariq@icloud.com",
  github: "https://github.com/Zalaann",
  linkedin: "https://www.linkedin.com/in/muhammad-ibrahim-tariq-b9126932b",
  roles: ["Cofounder @ IntellectraX", "Software Engineer", "Full-Stack Developer", "AI Builder"],
  tagline: "I build production web and mobile products, end to end.",
  bio: "Software engineer based in Manchester. Cofounder and sole engineer at IntellectraX (intellectrax.co.uk), building a UK online tutoring platform for GCSE and A-Level students with live video, AI session summaries, quizzes, assignments, and a parent-oversight portal. First Class Honours graduate (85%) from UEL, with a background in AI from FAST NUCES.",
  languagesSpoken: ["English (IELTS 7.0, fluent)", "Urdu (native)"],
} as const;

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
  highlight?: { label: string; value: string };
  url?: string;
};

export const experience: Experience[] = [
  {
    company: "IntellectraX",
    role: "Cofounder & Sole Engineer",
    location: "Remote · UK",
    period: "May 2026 - Present",
    url: "https://intellectrax.co.uk",
    bullets: [
      "Cofounding IntellectraX: a vertically-integrated AI EdTech platform pairing vetted teachers with in-house live classes, where AI generates per-student summaries, quizzes, and assignments from each session, closing the lesson-to-homework loop in a single product.",
      "Sole engineer on the full stack: Postgres schema with row-level security, backend services, frontend (React + Vite + Tailwind), Stripe payments, 100ms video + recording + transcription, Cloudflare Workers and Pages, design system, and CI.",
      "Designed a Postgres RLS model letting four roles (student, teacher, parent, admin) see exactly the right slice of shared classes, chats, payments, and credit history, with zero leaks and no perf hit under realtime subscriptions.",
      "Pre-launch on production infrastructure with a pre-launch security audit complete. Targeting public release June 2026.",
    ],
  },
  {
    company: "Kaye MacKenzie",
    role: "Software Engineer Intern",
    location: "Manchester, UK",
    period: "Jun 2025 - Nov 2025",
    highlight: { label: "Operational cost reduction", value: "30%" },
    bullets: [
      "Led a full backend migration from MongoDB to Supabase (PostgreSQL) on a cross-platform retail inventory and invoicing app. Redesigned schemas and rewrote REST APIs end-to-end, reducing operational cost by ~30% with no impact on load times.",
      "Built frontend features and supporting backend APIs on IntellectraX, a Next.js EdTech web platform, shipping production-ready updates on a weekly release cadence.",
      "Worked across TypeScript, Next.js, React Native, Node.js, and Supabase in production, collaborating with product and design to ship reliability, performance, and UX improvements.",
    ],
  },
];

export type Project = {
  name: string;
  blurb: string;
  stack: string[];
  bullets: string[];
  accent: string;
};

export const projects: Project[] = [
  {
    name: "Khushoo",
    blurb: "Cross-platform prayer tracking with live social widgets. Postgres triggers fire silent pushes that refresh native iOS and Android widgets in near-real time. Private launch 2026.",
    stack: ["React Native", "Expo SDK 54", "TypeScript", "Supabase", "SQLite", "Swift / WidgetKit"],
    accent: "from-amber-400/20 to-rose-500/10",
    bullets: [
      "Live-widget pipeline: a Postgres trigger on prayer_logs invokes a pg_net.http_post edge function, dispatching silent pushes that wake peers' apps and refresh native iOS and Android widgets in near-real time.",
      "Offline-first sync with SQLite as local source of truth and Supabase as cloud backend. Optimistic UI via React Query, retry-aware sync queue (max 5 attempts per item), and debounced profile writes for unreliable networks.",
      "6 native iOS widgets in Swift / WidgetKit and 10 Android widgets via react-native-android-widget, sharing data across app and widget targets through an App Group store and a custom Expo native module.",
      "Diagnosed an Apple AppIntents release-build constraint (reflection only inspects public types per WWDC23) that unblocked the entire interactive-widget feature after two days of tracing.",
      "Supabase Auth, Postgres RLS, and Realtime for social 'Circles', instrumented in production with PostHog and Sentry.",
    ],
  },
  {
    name: "FATTYS",
    blurb: "Mobile boutique commerce with realtime courier tracking, atomic order pipelines, and cross-device cart sync.",
    stack: ["React Native", "Expo SDK 54", "TypeScript", "Supabase", "Zustand", "React Query", "EAS Build"],
    accent: "from-cyan-400/20 to-blue-500/10",
    bullets: [
      "Atomic create_order_transaction Postgres RPC validates per-variant inventory, applies discount codes, inserts order + line items + status-history in a single transaction. Idempotency keys de-dupe retries.",
      "Realtime courier-tracking timeline without polling: a PostEx webhook triggers a service-role insert into tracking_events, fires a Supabase Realtime push filtered by shipment_id, and merges on-device. Terminal events auto-flip order status.",
      "Cross-device cart sync between the RN app and a Next.js companion via a shared cart_items table with hydrate-on-sign-in union-merge, debounced 400ms push from a Zustand store, and Realtime subscription for cross-device pull.",
      "Resolved a Zustand persist race where AsyncStorage rehydration silently overwrote server-merged state. Gated all sync effects on persist.onFinishHydration.",
      "Diagnosed a TestFlight production crash from EXPO_PUBLIC_* env vars not propagating to EAS cloud builds without explicit eas.json mirroring; locked the env-var contract.",
    ],
  },
  {
    name: "Recello",
    blurb: "A used-phone marketplace built for Pakistan. List a device, browse by brand, and chat sellers in real time.",
    stack: ["React Native", "Expo", "TypeScript", "Supabase", "NativeWind"],
    accent: "from-lime-400/20 to-emerald-500/10",
    bullets: [
      "Onboarding, auth, feed, search, saved items, and listing detail built with Expo Router + TypeScript.",
      "Multi-image upload with client-side compression and a responsive gallery for smooth browsing.",
      "Modular, theme-aware design system on NativeWind for consistency at scale.",
      "Supabase for auth, storage, and realtime messaging, secured by RLS and typed PostgREST.",
    ],
  },
  {
    name: "Nuch Summarizer",
    blurb: "Paste an article or upload audio. Get a tunable summary in seconds, powered by GPT and Whisper.",
    stack: ["Next.js", "TypeScript", "Supabase", "OpenAI", "Whisper", "Framer Motion"],
    accent: "from-violet-400/20 to-fuchsia-500/10",
    bullets: [
      "Next.js 14 app for text and audio summarization with new summaries, history, settings, auth-gated dashboards.",
      "Extractive and abstractive modes, configurable length, concise / bullet / comprehensive outputs via ChatGPT.",
      "OpenAI Whisper pipeline for MP3 / WAV / M4A uploads and in-browser recording, transcription, and summary.",
      "Supabase auth and per-user history with a responsive, animation-rich UI.",
    ],
  },
];

export type SkillGroup = { label: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "Swift", "SQL", "C++"] },
  { label: "Frontend", items: ["React", "Next.js", "React Native", "Vite", "Tailwind CSS", "NativeWind", "ShadCN UI", "Redux", "Framer Motion"] },
  { label: "Backend", items: ["Node.js", "Express", "Supabase", "Stripe", "100ms", "WebSockets", "REST APIs"] },
  { label: "Data", items: ["PostgreSQL", "Row-Level Security", "Realtime", "SQLite", "MySQL", "MongoDB", "Firebase", "Indexing"] },
  { label: "AI / ML", items: ["scikit-learn", "Pandas", "NumPy", "OpenAI ChatGPT API", "OpenAI Whisper", "Model Evaluation", "Inference Pipelines"] },
  { label: "DevOps", items: ["Git", "Docker", "Linux", "Cloudflare Workers", "Cloudflare Pages", "Vercel", "Azure", "CI/CD", "PostHog", "Sentry", "Nginx", "Postman"] },
];

export type Education = {
  school: string;
  degree: string;
  period: string;
  honors?: string;
  note?: string;
};

export const education: Education[] = [
  {
    school: "University of East London",
    degree: "BSc (Hons) Applied Computing",
    period: "Sept 2024 - Jun 2025",
    honors: "First Class Honours · 85%",
  },
  {
    school: "FAST National University (NUCES)",
    degree: "BSc Artificial Intelligence",
    period: "Sept 2020 - Jun 2024",
    note: "Transferred from BSc Computer Science in 2021",
  },
];
