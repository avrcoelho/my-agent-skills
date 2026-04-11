# file-no-test-suffix

## Never Use `.test` Extension

Do **not** use `.test.tsx` or `.test.ts` for any test file. This project exclusively uses `.spec` extensions.

### ❌ Incorrect

```typescript
// File: my-button.test.tsx — FORBIDDEN
import { render, screen } from "@testing-library/react";
```

### ✅ Correct

```typescript
// File: my-button.spec.tsx — CORRECT
import { render, screen } from "@testing-library/react";
```

### Why

This codebase exclusively uses `.spec` to avoid ambiguity and maintain a single, searchable pattern for test files.
