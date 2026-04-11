# `hook-file-set`

## Rule

Each hook folder must follow a standardized naming pattern with `use-` prefix in kebab-case.

## Required Files

| File                     | Purpose              |
| ------------------------ | -------------------- |
| `use-hook-name.tsx`      | Hook logic           |
| `use-hook-name.data.ts`  | Constants, texts     |
| `use-hook-name.types.ts` | Interfaces and types |
| `index.ts`               | Re-exports the hook  |

## Correct

```text
src/presentation/hooks/use-get-items/
├── __tests__/
│   └── use-get-items.spec.tsx
├── use-get-items.tsx
├── use-get-items.data.ts
├── use-get-items.types.ts
└── index.ts
```

## Incorrect

```text
src/presentation/hooks/getItems/
├── getItems.ts              ← WRONG: no use- prefix, camelCase folder
├── getItems.types.ts        ← WRONG: dot separator
└── getItems.test.ts         ← WRONG: .test extension
```

```text
src/presentation/hooks/UseGetItems/  ← WRONG: PascalCase folder
├── UseGetItems.tsx                  ← WRONG: PascalCase file
└── index.ts
```

## Why It Matters

The `use-` prefix is a React convention that signals a file contains a hook. Kebab-case naming provides consistency with the rest of the project. The file set pattern ensures hooks are self-contained and testable.
