# portfolio-rave

A production-ready, neon-glow ("rave") personal portfolio built with **Next.js 14 (App Router)**, **TypeScript (strict)**, **Tailwind + CSS Modules**, **Three.js** (`@react-three/fiber`), **Framer Motion**, **GSAP**, **Prisma + MySQL**, **React Hook Form + Zod**, and **Nodemailer**.

> **Note on Barba.js:** Barba.js mutates the DOM directly, which conflicts with React's virtual DOM and Next.js App Router's hydration model. This project uses **Framer Motion's `AnimatePresence`** for route transitions (App Router–native, SSR-safe) plus **GSAP** (and CSS-driven `IntersectionObserver` reveals) for scroll effects.

---

## Features

- **Sticky Header** with neon underline animation + mobile hamburger drawer
- **Hero** with interactive **Three.js** particle field (audio-visualizer style, mouse-reactive, `prefers-reduced-motion` aware)
- **About**, **Skills**, **Experience** (animated vertical timeline), **Education**, **Contact** — all with scroll-reveal animations
- **Contact form**: React Hook Form + Zod client validation, server-side Zod re-validation, in-memory rate-limit, optional Nodemailer notification, persists to MySQL via Prisma
- **API routes**: `POST /api/contact`, `GET /api/projects` (DB or graceful fallback)
- **Prisma schema** for `ContactMessage`, `Project`, `Experience`, `Education`
- **SEO**: metadata, OG tags, `sitemap.xml`, `robots.ts`, `favicon.svg`, OG image
- **Accessibility**: skip link, focus-visible rings, ARIA labels, semantic HTML, reduced-motion overrides
- **Lighthouse-friendly**: dynamic-imported Three.js, `dpr={[1,1.6]}`, downscaled on low-power devices
- Responsive breakpoints: 375 / 768 / 1024 / 1440 (mobile-first)

---

## Project Structure

```
portfolio-rave/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── about/page.tsx
│   ├── experience/page.tsx
│   ├── skills/page.tsx
│   ├── education/page.tsx
│   ├── contact/page.tsx
│   └── api/
│       ├── contact/route.ts
│       └── projects/route.ts
├── components/
│   ├── layout/  (Header, Footer, BackToTop, PageTransition)
│   ├── sections/(Hero, About, Experience, Skills, Education, Contact)
│   ├── three/   (HeroScene, SceneShell — dynamic-imported to avoid SSR)
│   └── ui/      (Reveal, GlowButton, Toast)
├── lib/
│   ├── db.ts        Prisma singleton + isDbConfigured()
│   ├── validation.ts Zod schemas
│   ├── rateLimit.ts in-memory IP token bucket
│   ├── projects-data.ts fallback project content
│   └── prefersReducedMotion.ts
├── prisma/
│   └── schema.prisma (ContactMessage, Project, Experience, Education)
├── public/   (favicon.svg, og-image.svg)
├── styles/globals.css
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
└── .env.example
```

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Set environment variables
cp .env.example .env.local
# Edit .env.local — at minimum set NEXT_PUBLIC_SITE_URL.
# To enable the contact DB + email pipeline, also set DATABASE_URL and SMTP_*.

# 3. Generate the Prisma client (no MySQL needed at this step)
npx prisma generate

# 4. Once you have a MySQL instance, run the migration:
npx prisma migrate dev --name init

# 5. Run the dev server
npm run dev
# → http://localhost:3000
```

### Useful scripts

| Command               | Purpose                                      |
| --------------------- | -------------------------------------------- |
| `npm run dev`         | Start the Next.js dev server                 |
| `npm run build`       | Production build                             |
| `npm start`           | Run the production build                     |
| `npm run typecheck`   | `tsc --noEmit` (strict mode)                 |
| `npm run lint`        | Lint with `eslint-config-next`               |
| `prisma:generate`     | Regenerate the Prisma client                 |
| `prisma:migrate`      | `prisma migrate dev`                         |
| `prisma:studio`       | Open Prisma Studio (DB GUI)                  |

---

## Environment Variables

| Key                          | Purpose                                            |
| ---------------------------- | -------------------------------------------------- |
| `DATABASE_URL`               | MySQL connection string (Prisma)                   |
| `SMTP_HOST/PORT/USER/PASS`   | Nodemailer SMTP credentials                        |
| `NOTIFY_TO`                  | Destination address for contact notifications      |
| `NEXT_PUBLIC_SITE_URL`       | Public origin (used by sitemap, robots, OG image)  |

> The contact API degrades gracefully: if `DATABASE_URL` is missing it logs a warning and still returns success to the client. If SMTP isn't configured, persistence still happens (DB only).

---

## Architectural Notes

- **Three.js scene** is loaded with `next/dynamic` (`ssr: false`) and gated on `prefers-reduced-motion` plus a coarse `deviceMemory`/`hardwareConcurrency` check, so low-end devices skip the WebGL pass entirely.
- **Scroll triggers** use a thin `IntersectionObserver` helper (`components/ui/Reveal.tsx`) rather than pulling in `gsap/ScrollTrigger`, which keeps TTI low and respects reduced-motion.
- **Page transitions** use Framer Motion's `AnimatePresence` keyed by `pathname` (works inside App Router) plus a one-shot "rave curtain" intro.
- **Rate limiting** is per-IP via an in-memory token bucket. Replace with `@upstash/ratelimit` for multi-instance deployments.
- **Prisma**: a single cached client instance prevents the dev HMR connection-exhaustion bug.

---

## Customizing

- **Palette**: change values in `tailwind.config.ts` under `theme.extend.colors` and `--magenta/--cyan/--acid/--uv` in `styles/globals.css`.
- **Fonts**: `next/font` already wires `Space Grotesk` and `Inter` — replace with any Google or self-hosted display font you like.
- **Section content** lives in `components/sections/*`. To make it CMS-driven, swap arrays for `prisma.experience.findMany()` etc. inside Server Components.

---

## License

MIT — use, fork, add lasers.
