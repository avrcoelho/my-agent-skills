# my-skills

A showcase of my favorite technologies and skills, built with React, TypeScript, and TailwindCSS.

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm test` | Run unit tests |
| `npm run test:cov` | Run tests with coverage |

## Adding a skill

Open `src/data/skills.ts` and add a new entry to the `skills` array:

```ts
{
  id: '9',          // unique identifier
  name: 'GraphQL',  // skill name
  category: 'Backend', // Frontend | Mobile | Backend | Testing | Tools
  level: 'intermediate', // beginner | intermediate | advanced | expert
}
```

## Tech stack

- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)
