export const profile = {
  name: "Muhammad Ibrahim Tariq",
  shortName: "Ibrahim",
  location: "Manchester, United Kingdom",
  email: "mibrahimtariq@icloud.com",
  roles: ["Software Engineer", "Full-Stack Developer", "React Native Builder", "AI Tinkerer"],
  tagline: "I build production web and mobile products — end to end.",
  bio: "Software engineer based in Manchester. Currently building EdTech and cross-platform products at Kaye MacKenzie, shipping across frontend, backend, and mobile. Previously at FAST NUCES and UEL, with a background in AI.",
} as const;

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
  highlight?: { label: string; value: string };
};

export const experience: Experience[] = [
  {
    company: "Kaye MacKenzie",
    role: "Intern Software Engineer",
    location: "Manchester, UK",
    period: "Mar 2025 — Present",
    highlight: { label: "Operational cost reduction", value: "30%" },
    bullets: [
      "Shipped across two production systems — a full-scale EdTech platform and a cross-platform mobile + web app.",
      "Built scalable features, optimized APIs, and tuned database performance — 30% lower operational cost, zero hit to load times.",
      "Delivered production-ready updates with product and design, lifting reliability, performance, and UX end-to-end.",
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
    name: "Recello",
    blurb: "A used-phone marketplace built for Pakistan — list a device, browse by brand, and chat sellers in real time.",
    stack: ["React Native", "Expo", "TypeScript", "Supabase", "NativeWind"],
    accent: "from-lime-400/20 to-emerald-500/10",
    bullets: [
      "Onboarding, auth, feed, search, saved items, and listing detail built with Expo Router + TypeScript.",
      "Multi-image upload with client-side compression and a responsive gallery for smooth browsing.",
      "Modular, theme-aware design system on NativeWind for consistency at scale.",
      "Supabase for auth, storage, and realtime messaging — secured by RLS and typed PostgREST.",
    ],
  },
  {
    name: "FATTYS",
    blurb: "Mobile skincare commerce with variant-aware carts, live inventory, and seamless guest-or-signed-in checkout.",
    stack: ["React Native", "Expo", "Supabase", "PostgreSQL"],
    accent: "from-cyan-400/20 to-blue-500/10",
    bullets: [
      "Product browsing, cart, wishlist, and profiles on a reusable component-based UI.",
      "Advanced gallery with WebP optimization, responsive loading, and swipe + zoom gestures.",
      "Variant-aware carts with real-time inventory and session-based carts for guests and users.",
      "Supabase Auth, RLS, and database triggers for automatic profile management.",
    ],
  },
  {
    name: "Nuch Summarizer",
    blurb: "Paste an article or upload audio — get a tunable summary in seconds, powered by GPT and Whisper.",
    stack: ["Next.js", "TypeScript", "Supabase", "OpenAI", "Framer Motion"],
    accent: "from-violet-400/20 to-fuchsia-500/10",
    bullets: [
      "Next.js 14 app for text and audio summarization — new summaries, history, settings, auth-gated dashboards.",
      "Extractive and abstractive modes, configurable length, concise / bullet / comprehensive outputs via ChatGPT.",
      "OpenAI Whisper pipeline for MP3 / WAV / M4A uploads and in-browser recording → transcription → summary.",
      "Supabase auth and per-user history with a responsive, animation-rich UI.",
    ],
  },
];

export type SkillGroup = { label: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "Ruby", "SQL", "C++"] },
  { label: "Frontend", items: ["React", "Next.js", "React Native", "Tailwind CSS", "ShadCN UI", "Redux"] },
  { label: "Backend", items: ["Node.js", "Express", "Supabase", "Ruby on Rails", "WebSockets", "REST APIs"] },
  { label: "Data", items: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "Indexing"] },
  { label: "DevOps", items: ["Git", "Docker", "Azure", "CI/CD", "Nginx", "Postman"] },
  { label: "AI / ML", items: ["Pandas", "NumPy", "Model Evaluation", "Inference Pipelines", "Recommenders"] },
];

export type Education = {
  school: string;
  degree: string;
  period: string;
};

export const education: Education[] = [
  {
    school: "University of East London",
    degree: "Bachelor of Applied Computing",
    period: "Sept 2024 — Jun 2025",
  },
  {
    school: "FAST National University",
    degree: "Bachelor of Artificial Intelligence",
    period: "Jul 2021 — Jun 2024",
  },
  {
    school: "FAST National University",
    degree: "Bachelor of Computer Science",
    period: "Sept 2020 — Jun 2021",
  },
];
