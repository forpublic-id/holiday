# Repository Guidelines

## Project Structure & Module Organization
- Code: `src/` with key areas:
  - `app/` (Next.js App Router, routes like `/[locale]/[year]/...`)
  - `components/` (UI + calendar components)
  - `lib/` (utilities: SEO, holiday helpers)
  - `data/` (holiday data by year/region)
  - `hooks/`, `i18n/`, `types/`
- Assets: `public/` (images, icons, static files)
- Localization: `messages/en.json`, `messages/id.json`
- Config: `next.config.ts`, `tailwind.config.ts`, `eslint.config.mjs`, `.prettierrc`, `tsconfig.json`
- Env: copy `.env.local.example` to `.env.local` (never commit secrets).

## Build, Test, and Development Commands
- Install: `bun install`
- Dev server: `bun run dev` (Turbopack at `http://localhost:3000`)
- Build: `bun run build`
- Start (prod): `bun run start`
- Lint: `bun run lint`
- Type check: `bun run type-check`
- Format: `bun run format`
- Tests: `bun test` (Bun’s built‑in runner; see Testing).

## Coding Style & Naming Conventions
- Language: TypeScript (strict), ESNext modules, path alias `@/*` to `src/*`.
- Formatting (Prettier): 2 spaces, semicolons, single quotes, width 80, trailing commas `es5`.
- Linting: ESLint `next/core-web-vitals` + `next/typescript`.
- Files:
  - Components: `PascalCase.tsx` (e.g., `CalendarGrid.tsx`).
  - Hooks/Utils/Data: `kebab-case.ts` (e.g., `use-holidays.ts`, `holiday-utils.ts`).
  - Routes: Next App Router conventions and dynamic segments (e.g., `[locale]`).

## Testing Guidelines
- Runner: Prefer Bun test (`bun test`).
- Location/Names: Co-locate as `*.test.ts(x)` near source or under `tests/`.
- Scope: Focus on `src/lib/**`, hooks, and pure helpers; mock browser APIs when needed.
- Example: `bun test src/lib/holiday-utils.test.ts`.

## Commit & Pull Request Guidelines
- Commits: Imperative subject, concise body; scopes optional. Examples:
  - `feat(calendar): add regional filter toggle`
  - `fix(i18n): correct month names in en.json`
- PRs: clear description, linked issue, steps to verify, screenshots for UI, note i18n/SEO impact, and update docs if paths or messages change.
- Quality gate: run `bun run lint`, `bun run type-check`, and tests before opening a PR.

## Security & Configuration Tips
- Keep secrets out of VCS; document new keys in `.env.local.example`.
- When changing routes, verify `middleware.ts`, `sitemap.ts`, and SEO utilities.
- Update both `messages/en.json` and `messages/id.json` for any text changes.
