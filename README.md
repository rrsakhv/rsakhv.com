# rsakhv.com

Personal portfolio website inspired by the engineering-first style of `daveallie.com`, implemented with a modern stack.

## Tech stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ESLint

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Project structure

- `src/app/layout.tsx`: global layout and SEO metadata
- `src/app/page.tsx`: homepage sections (hero, about, projects, experience)
- `src/data/portfolio.ts`: editable portfolio content data
- `src/app/globals.css`: base styles and typography defaults

## How to customize

1. Update personal information, social links, projects, and experience in `src/data/portfolio.ts`.
2. Replace placeholder links (`#`) with real project URLs.
3. Adjust section layout and tone in `src/app/page.tsx` if needed.

## Production checks

```bash
npm run lint
npm run build
```
