# structure-flat-describe

## Flat Describe Blocks

Use a single top-level `describe` block. Do **not** nest `describe` blocks inside one another.

### ❌ Incorrect

```typescript
describe("MyButton", () => {
  describe("when enabled", () => {
    // ← nested describe FORBIDDEN
    describe("on click", () => {
      // ← deeper nesting FORBIDDEN
      it("calls handler", () => {
        // ...
      });
    });
  });
});
```

### ✅ Correct

```typescript
describe("@/components/my-button", () => {
  it("GIVEN the button is enabled WHEN the user clicks it THEN the handler is called", () => {
    // ...
  });

  it("GIVEN the button is disabled WHEN the user clicks it THEN the handler is NOT called", () => {
    // ...
  });
});
```

### Why

Flat test suites are easier to read, scan, and maintain. The Gherkin-style description provides all the context that nested `describe` blocks would otherwise give.
