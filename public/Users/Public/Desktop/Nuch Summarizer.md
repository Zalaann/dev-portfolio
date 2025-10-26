# Nuch AI Summarizer — Case Study

- Role: Full‑Stack Developer
- Stack: Next.js, TypeScript, Tailwind CSS, Supabase (Auth/DB), Whisper (speech‑to‑text), DeepSeek (summarization)
- Live: https://nuch-ai-article-summarizer.vercel.app/auth/sign-up/

## Screenshots

![Auth / Landing](/projects/Nuch-1.png)
- Supabase Auth (email + OAuth) gate protects app routes and persists sessions
- Post‑login redirect to app; guarded pages check `getSession` on server

![Paste Article](/projects/Nuch-2.png)
- URL/Text input validated with Zod; disabled state and helper copy guide the user
- Submit posts to a Next.js Route Handler/Server Action that queues summarize work

![Summarization Output](/projects/Nuch-3.png)
- Structured result (headings, bullets, TL;DR) with copy/share actions
- Streamed/async UI updates keep page responsive on long inputs

![Audio Upload](/projects/Nuch-4.png)
- Audio uploaded, transcribed via Whisper, then summarized; shows per‑step progress
- Accepts common formats; client size checks and graceful cancellation

![History](/projects/Nuch-5.png)
- Per‑user history stored via Supabase; timestamped entries for recall
- Quick reopen to compare outputs; purge action clears user data

![Error Handling](/projects/Nuch-6.png)
- Typed error boundary; retries and edit‑and‑resubmit affordances
- Handles API rate limits/invalid JSON with safe parsing and user messaging

![Performance](/projects/Nuch-7.png)
- Client memoization and Suspense boundaries minimize re‑renders
- Background jobs + debounced inputs keep interactions snappy

![Security](/projects/Nuch-8.png)
- Environment secrets server‑side only; no keys in client bundles
- Validation and CORS defaults; authenticated requests scoped per session
