# Recello — Mobile Marketplace (React Native)

- Role: Full‑Stack Developer
- Stack: React Native (Expo), TypeScript, Supabase (Auth/DB), Realtime chat, OAuth

## Screenshots

![Listing Feed](/projects/recello-2.png)
- Optimized FlatList with image caching and skeletons for smooth scroll
- Query pagination and memoized item renders to cut re-renders

![Listing Details](/projects/recello-3.png)
- Rich detail view with seller profile, actions, and safety prompts
- Deferred loading of related listings for faster TTI

![Chat](/projects/recello-4.png)
- Supabase realtime channel for buyer–seller messaging
- Presence indicators and optimistic UI for message send

![Auth](/projects/recello-5.png)
- OAuth + email/password; guarded routes and persisted sessions
- Error surfaced inline with resilient retry flows

![Sell Flow](/projects/recello-6.png)
- Multi-step form with image picker, validation, and autosave
- Server-side checks to prevent duplicate or unsafe listings

![Performance](/projects/recello-7.png)
- Code-split heavy modules; lazy images; reduced bundle via aliasing
- Strict TypeScript and lint rules for maintainability
