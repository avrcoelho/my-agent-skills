# structure-describe-path

## Describe Block Naming

The top-level `describe` string must match the file's relative path from the `src` directory, using the `@/` alias prefix.

### ❌ Incorrect

```typescript
describe('MyButton', () => { ... });
describe('MyButton component', () => { ... });
describe('Button tests', () => { ... });
```

### ✅ Correct

```typescript
// For: src/components/my-button/__tests__/my-button.spec.tsx
describe('@/components/my-button', () => { ... });

// For: src/utils/format-date/__tests__/format-date.spec.ts
describe('@/utils/format-date', () => { ... });
```

### Why

Using the file path as the describe name creates a unique identifier for each test suite and helps quickly locate the source file being tested.
