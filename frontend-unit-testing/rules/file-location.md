# file-location

## Place Tests in `__tests__` Directory

All test files must be located inside a `__tests__` folder within the component's or module's directory.

### ❌ Incorrect

```
src/components/my-button/my-button.spec.tsx        ← same level as component
src/components/my-button/tests/my-button.spec.tsx  ← wrong folder name
src/__tests__/components/my-button.spec.tsx       ← centralized test folder
```

### ✅ Correct

```
src/components/my-button/__tests__/my-button.spec.tsx
src/utils/format-date/__tests__/format-date.spec.ts
```

### Why

Colocating tests in a consistent `__tests__` sub-directory makes them easy to find, keeps the component directory clean, and aligns with the project's Jest configuration.
