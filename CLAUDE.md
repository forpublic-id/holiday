# Holiday Calendar Indonesia - Development Guide

This is a Next.js application for Indonesian Holiday Calendar with bilingual support (ID/EN).

## Tech Stack & Tools

Default to using Bun instead of Node.js for this project.

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun run build` for Next.js production build
- Use `bun install` instead of `npm install` or `yarn install` or `pnpm install`
- Use `bun run <script>` instead of `npm run <script>` or `yarn run <script>` or `pnpm run <script>`
- Bun automatically loads .env, so don't use dotenv.

## Project-Specific Commands

### Development

```bash
bun run dev              # Start development server
bun run build            # Build for production (includes Biome check)
bun run build:skip-checks # Build without quality checks
bun run start            # Start production server
bun run lint             # Run Biome linting
bun run format           # Format code with Biome
```

### Testing & Quality

```bash
bun test           # Run tests (when implemented)
bun run build      # Also runs type checking
bun run lint       # Run Biome linting
bun run lint:fix   # Apply automatic fixes
bun run check      # Run full Biome check (lint + format)
```

## Project Architecture

This project uses **Next.js 15** with App Router, **TypeScript**, and **Tailwind CSS**.

### Key Technologies

- **Next.js 15.4.7** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **next-intl** - Internationalization (ID/EN support)
- **Lucide React** - Icon system
- **Bun** - Runtime and package manager
- **Biome** - Lightning-fast linter and formatter (replacing ESLint + Prettier)

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── [locale]/          # Locale-based routing (id/en)
│   │   ├── [year]/[month]/page.tsx  # Month calendar pages
│   │   ├── about/page.tsx # About page
│   │   └── layout.tsx     # Locale layout with metadata
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── robots.ts          # SEO robots.txt
│   └── sitemap.ts         # Dynamic sitemap generation
├── components/            # React components
│   ├── calendar/         # Calendar-related components
│   ├── holiday/          # Holiday display components
│   ├── layout/           # Layout components (Header, Footer)
│   └── ui/               # Reusable UI components
├── data/                 # Holiday data
│   └── holidays/         # Holiday definitions by year
├── lib/                  # Utility functions
│   ├── holiday-data.ts   # Holiday data management
│   ├── holiday-utils.ts  # Holiday filtering utilities
│   └── seo-utils.ts      # SEO metadata generation
├── types/                # TypeScript type definitions
└── messages/             # Internationalization messages
    ├── id.json           # Indonesian translations
    └── en.json           # English translations
```

## Development Guidelines

### Holiday Data Management

- Holiday data is stored in `/src/data/holidays/` organized by year
- Each year has separate files for national and regional holidays
- Use the `Holiday` type from `/src/types/holiday.ts` for consistency
- National holidays take priority in default filtering

### Component Development

- Follow existing component patterns in `/src/components/`
- Use Tailwind CSS for styling with consistent design tokens
- Implement proper TypeScript types for all props
- Support bilingual content using next-intl

### Internationalization

- All user-facing text must support ID/EN languages
- Add translations to `/messages/id.json` and `/messages/en.json`
- Use `useTranslations()` hook or `getTranslations()` for server components
- Test both language versions before committing

### SEO Implementation

- Dynamic metadata generation in `generateMetadata()` functions
- Sitemap auto-updates with new pages in `/src/app/sitemap.ts`
- Use SEO utilities from `/src/lib/seo-utils.ts` for consistency
- Optimize for Indonesian holiday search terms

### Code Quality

- Always run `bun run build` before committing to catch type errors
- Run `bun run check` to lint and format code with Biome
- Run `bun run lint:fix` to automatically fix linting issues
- Follow existing naming conventions and file organization
- Keep components focused on single responsibilities
- Document complex holiday filtering logic

## Key Features Implemented

### 🎯 Holiday Filtering System

- **Default View**: Shows only national holidays and joint leave days
- **Regional Filter**: Toggle to view province-specific holidays
- **Smart Categorization**: Different badge colors for holiday types

### 🌍 Bilingual Support

- Complete ID/EN interface translation
- Locale-specific URLs (`/id/2025/januari` vs `/en/2025/january`)
- SEO-optimized metadata for both languages

### 📅 Calendar Features

- Interactive month/year navigation
- Today highlighting and working day detection
- Color-coded holiday types (national=red, regional=blue, joint_leave=orange)
- Responsive design for all screen sizes

### 🔍 SEO Optimization

- Dynamic titles with accurate holiday counts
- Comprehensive sitemap (53 URLs covering all pages)
- Smart priority system for search engine indexing
- Structured metadata for better search visibility

## Deployment

This project is configured for Vercel deployment:

```bash
# Build and deploy
bun run build
# Deploy to Vercel (configure vercel.json as needed)
```

## Important Notes

- **Never commit secrets** - Use environment variables for sensitive data
- **Test both languages** - All features must work in ID and EN
- **Verify holiday counts** - SEO titles should reflect default filter (national + joint leave only)
- **Check mobile responsiveness** - Test on various screen sizes
- **Validate accessibility** - Ensure proper contrast ratios and keyboard navigation
