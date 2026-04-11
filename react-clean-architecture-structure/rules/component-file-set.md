# `component-file-set`

## Rule

Each component folder must contain a standardized set of files following the naming convention `{component-name}-{suffix}`.

## Required Files

| File                               | Purpose                      |
| ---------------------------------- | ---------------------------- |
| `component-name.tsx`               | JSX template                 |
| `component-name.use-controller.ts` | Logic, state, refs           |
| `component-name.styles.ts`         | Styled components / CSS      |
| `component-name.data.ts`           | Constants, texts             |
| `component-name.types.ts`          | Props, interfaces, types     |
| `index.ts`                         | Re-exports the JSX component |

Not all files are mandatory — simple, stateless components may omit `.use-controller.ts` or `.data.ts`.

## Correct

```text
src/presentation/components/forms/segmentation-form/
├── __tests__/
│   └── segmentation-form.spec.tsx
├── segmentation-form.tsx
├── segmentation-form.use-controller.ts
├── segmentation-form.styles.ts
├── segmentation-form.data.ts
├── segmentation-form.types.ts
└── index.ts
```

## Incorrect

```text
src/presentation/components/forms/
├── SegmentationForm.tsx          ← WRONG: PascalCase file name
├── SegmentationForm.styles.ts    ← WRONG: dot separator, PascalCase
└── SegmentationForm.test.tsx     ← WRONG: not in __tests__/, wrong extension
```

## Why It Matters

Consistency in component file structure reduces onboarding time and makes automated tooling (generators, linters) easier to maintain. The controller separation keeps JSX files focused on rendering.
