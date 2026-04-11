# `page-file-set`

## Rule

Each page folder must contain a standardized set of files following the naming convention `{page-name}-{suffix}`.

## Required Files

| File                          | Purpose                            |
| ----------------------------- | ---------------------------------- |
| `page-name.tsx`               | JSX template (HTML structure only) |
| `page-name.use-controller.ts` | Logic, state, functions, refs      |
| `page-name.data.ts`           | Constants, texts, static data      |
| `page-name.styles.ts`         | Styled components / CSS            |
| `page-name.types.ts`          | Props, return types, interfaces    |
| `index.ts`                    | Re-exports the page component      |

## Correct

```text
src/pages/admin/list/
├── __tests__/
│   └── list.spec.tsx
├── components/             # Page-exclusive components
│   └── list-header/
├── list.tsx
├── list.use-controller.ts
├── list.data.ts
├── list.styles.ts
├── list.types.ts
└── index.ts
```

## Incorrect

```text
src/pages/admin/list/
├── List.tsx                  ← WRONG: PascalCase file name
├── ListController.ts         ← WRONG: not following *.use-controller pattern
├── styles.css                ← WRONG: not following naming convention
└── types.ts                  ← WRONG: not prefixed with page name
```

## Why It Matters

The standardized file set makes pages predictable and navigable. Any developer can open a page folder and immediately understand its structure. The controller pattern ensures JSX files remain clean and focused on rendering.
