# file-extension

## Use `.spec` Extension

All test files must use the `.spec` extension:

- `.spec.tsx` for component tests (files with JSX)
- `.spec.ts` for pure function/utility tests (no JSX)

### ❌ Incorrect

```
my-button.test.tsx
format-date.test.ts
my-button.tests.tsx
```

## Correct

```
my-button.spec.tsx
format-date.spec.ts
```

### Why

The project standardizes on `.spec` to maintain a single convention. Jest is configured to match `*.spec.ts` and `*.spec.tsx` files.
