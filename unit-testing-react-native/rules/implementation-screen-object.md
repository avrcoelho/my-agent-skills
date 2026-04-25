---
title: Use Global Screen Object for Queries
impact: MEDIUM
impactDescription: ensures consistent query patterns and better error messages
tags: testing, queries, screen, react-testing-library
---

## Use Global Screen Object for Queries

Always use the global `screen` object to query the DOM. Do not destructure
query methods (e.g., `getByText`, `getByRole`) directly from the `render`
function's return value.

**Incorrect (destructuring from render):**

```tsx
import { render, fireEvent } from "@testing-library/react-native";

const { getByText, getByRole } = render(<MyButton label="Press Me" />);
const button = getByRole("button");
fireEvent.press(button);
```

**Correct (using global screen):**

```tsx
import { render, fireEvent, screen } from "@testing-library/react-native";

render(<MyButton label="Press Me" />);
const button = screen.getByRole("button");
fireEvent.press(button);
```

**Why this matters:**

- `screen` is automatically scoped to the most recent render
- Cleaner syntax with fewer variables to track
- Better error messages from Testing Library
- Consistent with React Testing Library best practices
- Easier to debug when queries fail

**Common queries with screen:**

```tsx
// Text content
screen.getByText("Submit");
screen.queryByText("Optional Text"); // Returns null if not found

// Accessibility role
screen.getByRole("button");
screen.getByRole("textbox");

// Accessibility hint
screen.getByAccessibilityHint("Tap to submit");

// Test ID (use sparingly)
screen.getByTestId("submit-button");

// Multiple elements
screen.getAllByRole("button"); // Returns array
```

**Query variants:**

```tsx
// getBy* - Throws error if not found (use for assertions)
screen.getByText("Submit");

// queryBy* - Returns null if not found (use for absence checks)
expect(screen.queryByText("Error")).toBeNull();

// findBy* - Returns promise, waits for element (use for async)
await screen.findByText("Loaded");
```

**Multiple renders:**

```tsx
it("GIVEN initial state WHEN data loads THEN new content displays", async () => {
  const { rerender } = render(<MyComponent loading={true} />);
  expect(screen.getByText("Loading...")).toBeTruthy();

  rerender(<MyComponent loading={false} data="Success" />);
  expect(screen.getByText("Success")).toBeTruthy();
});
```
