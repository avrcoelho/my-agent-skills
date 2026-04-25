---
title: Prefer User-Centric Queries
impact: MEDIUM
impactDescription: tests become more resilient to implementation changes
tags: testing, queries, accessibility, user-centric
---

## Prefer User-Centric Queries

Prioritize user-centric queries (e.g., `getByText`, `getByAccessibilityHint`,
`getByRole`) over implementation details (testIDs) whenever possible.

**Query Priority:**

1. `getByText` - What the user sees
2. `getByRole` - How screen readers identify elements
3. `getByAccessibilityHint` - Additional accessibility information
4. `getByTestId` - Last resort when semantic queries aren't possible

**Incorrect (over-reliance on testIDs):**

```tsx
render(<MyButton label="Submit" onPress={mockOnPress} />);
const button = screen.getByTestId("submit-button");
fireEvent.press(button);
```

**Correct (user-centric queries):**

```tsx
render(<MyButton label="Submit" onPress={mockOnPress} />);
const button = screen.getByText("Submit");
fireEvent.press(button);
```

**Or with role:**

```tsx
render(<MyButton label="Submit" onPress={mockOnPress} />);
const button = screen.getByRole("button");
fireEvent.press(button);
```

**When testIDs are acceptable:**

```tsx
// Complex components where text/role queries are ambiguous
const deleteButton = screen.getByTestId("delete-button-123");

// Dynamic content that changes frequently
const userAvatar = screen.getByTestId(`avatar-${userId}`);

// Multiple similar elements that need distinction
const firstNameInput = screen.getByTestId("input-first-name");
const lastNameInput = screen.getByTestId("input-last-name");
```

**Query examples by priority:**

```tsx
// Priority 1: Text (what user sees)
screen.getByText("Submit");
screen.getByText(/submit/i); // Case-insensitive regex

// Priority 2: Role (accessibility)
screen.getByRole("button");
screen.getByRole("textbox");
screen.getByRole("checkbox");

// Priority 3: Accessibility hints
screen.getByAccessibilityHint("Double tap to open");
screen.getByLabelText("Email address");

// Priority 4: TestID (last resort)
screen.getByTestId("complex-widget-123");
```

**Combining queries:**

```tsx
// Find button with specific text
const submitButton = screen.getByRole("button", { name: "Submit" });

// Find all buttons, then filter
const buttons = screen.getAllByRole("button");
const submitButton = buttons.find((b) => b.props.children === "Submit");
```

**Why this matters:**

- Tests focus on user behavior, not implementation details
- More resilient to refactoring (internal structure can change)
- Encourages better accessibility in your components
- Tests serve as documentation of user interactions
- Screen readers and automated tools use the same queries
- Easier to understand what the test is verifying
