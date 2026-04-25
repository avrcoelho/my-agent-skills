---
title: Single Top-Level Describe Block
impact: HIGH
impactDescription: improves test readability and maintainability
tags: testing, structure, describe
---

## Single Top-Level Describe Block

Use a single, top-level `describe` block matching the file's relative path. Do
not nest `describe` blocks. Keep the test suite flat.

**Incorrect (nested describes):**

```tsx
describe("@/components/MyButton", () => {
  describe("rendering", () => {
    it("displays the label", () => {
      // test
    });
  });

  describe("interactions", () => {
    it("calls onPress", () => {
      // test
    });
  });

  describe("disabled state", () => {
    it("prevents interaction", () => {
      // test
    });
  });
});
```

**Correct (flat structure):**

```tsx
describe("@/components/MyButton", () => {
  it("GIVEN a label prop WHEN the component renders THEN it displays the correct text", () => {
    // test
  });

  it("GIVEN the button is enabled WHEN the user presses it THEN the onPress handler is triggered", () => {
    // test
  });

  it("GIVEN the button is disabled WHEN the user presses it THEN the onPress handler is NOT triggered", () => {
    // test
  });
});
```

**Why this matters:**

- Simpler test output and error messages
- Easier to scan and understand test coverage
- Reduces cognitive overhead when reading tests
- Test descriptions are self-documenting without needing grouped context
- Flatter test reports are easier to parse in CI/CD pipelines

**Describe block naming:**

The top-level `describe` should match the relative path from the project root:

```tsx
// For src/components/MyButton/__tests__/MyButton.spec.tsx
describe("@/components/MyButton", () => {});

// For src/utils/formatDate/__tests__/formatDate.spec.ts
describe("@/utils/formatDate", () => {});

// For src/hooks/useAuth/__tests__/useAuth.spec.ts
describe("@/hooks/useAuth", () => {});
```
