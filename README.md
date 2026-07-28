# Foong Zhi Hin — Portfolio

A static, interactive personal portfolio built with Next.js, TypeScript, Tailwind CSS and Motion.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
```

This writes a fully static site to `out/`.

## GitHub Pages

The included workflow deploys automatically from `main`. In GitHub, enable **Settings → Pages → GitHub Actions**. The workflow supplies `NEXT_PUBLIC_BASE_PATH` based on the repository name, so assets and links work beneath a project-pages path. Locally, leave this variable unset.

To use a custom domain or root GitHub Pages site, set `NEXT_PUBLIC_BASE_PATH` to an empty value in the relevant build environment.

## Customising content

Personal details, navigation and social links live in `src/data/personal.ts`; skills are in `src/data/skills.ts`; projects are in `src/data/projects.ts`.
