# Next Auth Flow

<img width="1397" height="824" alt="Screenshot 2026-09-04 at 17 27 07" src="https://github.com/user-attachments/assets/7c1314cf-e388-4197-b037-6418ab7860b6" />

<br/>

**🚀 Live Demo:** [https://next-auth-flow-6r0f9l1wo-testing-team13.vercel.app/](https://next-auth-flow-6r0f9l1wo-testing-team13.vercel.app/)

<br/>

Authentication hub built with Next.js — credentials, OAuth, passkeys, and password recovery.

## Deployments

| Platform   | Scope                       | URL                                                                                                                        |
| ---------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Vercel** | Next.js Frontend & Auth Hub | [https://next-auth-flow-6r0f9l1wo-testing-team13.vercel.app/](https://next-auth-flow-6r0f9l1wo-testing-team13.vercel.app/) |

### Deployment Details

- **Frontend & Authentication (Vercel):**
  - Hosted on Vercel with App Router and Server-Side Rendering (SSR).
  - Connected to a remote PostgreSQL database on Supabase via Prisma ORM (`DATABASE_URL` / `DIRECT_URL`).
  - Configure Auth.js secrets (`AUTH_SECRET`, `AUTH_URL`) and OAuth redirect URIs (`/api/auth/callback/google` & `/github`) for production.

## Features

- **Credentials login** — email/password with bcrypt hashing
- **Sign up** — create accounts with validated forms (Zod + React Hook Form)
- **Google & GitHub OAuth** — social sign-in with account linking by email
- **Passkeys (WebAuthn)** — register and sign in without a password
- **Password recovery** — forgot/reset flow via Gmail SMTP (Nodemailer)
- **Protected home** — session-aware UI with sign-out and passkey setup prompts
- **Prisma + Supabase Postgres** — Auth.js adapter with migrations and seed user

## Technologies

| Technology                | Purpose                                          |
| ------------------------- | ------------------------------------------------ |
| **Next.js 16**            | App Router framework                             |
| **React 19**              | UI                                               |
| **TypeScript**            | Static typing                                    |
| **Auth.js (NextAuth v5)** | Auth (JWT, Credentials, Google, GitHub, Passkey) |
| **Prisma**                | ORM + Auth.js adapter                            |
| **Supabase**              | Postgres database                                |
| **Chakra UI v3**          | Design system                                    |
| **Emotion**               | CSS-in-JS                                        |
| **React Hook Form + Zod** | Forms and validation                             |
| **SimpleWebAuthn**        | Passkeys / WebAuthn                              |
| **bcryptjs**              | Password hashing                                 |
| **Nodemailer**            | Password-reset emails                            |
| **pnpm**                  | Package manager                                  |
| **ESLint + Prettier**     | Linting and formatting                           |
| **React Compiler**        | Render optimization                              |

## Getting started

```bash
cp .env.example .env
pnpm install
pnpm prisma:migrate
pnpm dev
```
