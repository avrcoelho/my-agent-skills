---
title: Use fireEvent for User Interactions
impact: MEDIUM
impactDescription: consistent interaction patterns across all tests
tags: testing, fireEvent, interactions, user-simulation
---

## Use fireEvent for User Interactions

Use `fireEvent` from `@testing-library/react-native` for simulating user
interactions. This ensures tests verify the full component behavior, not just
direct function calls.

**Common events:**

```tsx
import { render, fireEvent, screen } from "@testing-library/react-native";

// Press/tap interactions
fireEvent.press(screen.getByText("Submit"));

// Text input
const input = screen.getByRole("textbox");
fireEvent.changeText(input, "new value");

// Scroll events
fireEvent.scroll(screen.getByTestId("scrollview"), {
  nativeEvent: { contentOffset: { y: 200 } },
});

// Focus/blur
fireEvent(input, "focus");
fireEvent(input, "blur");
```

**Incorrect (direct function calls):**

```tsx
const mockOnPress = jest.fn();
render(<MyButton onPress={mockOnPress} />);
mockOnPress(); // Directly calling the mock ❌
expect(mockOnPress).toHaveBeenCalledTimes(1);
```

This bypasses the component entirely and doesn't test actual user interaction.

**Correct (fireEvent):**

```tsx
const mockOnPress = jest.fn();
render(<MyButton onPress={mockOnPress} />);
fireEvent.press(screen.getByRole("button"));
expect(mockOnPress).toHaveBeenCalledTimes(1);
```

**Testing form interactions:**

```tsx
it("GIVEN an empty input WHEN user types text THEN input value updates", () => {
  render(<LoginForm onSubmit={mockSubmit} />);

  const emailInput = screen.getByLabelText("Email");
  const passwordInput = screen.getByLabelText("Password");

  fireEvent.changeText(emailInput, "user@example.com");
  fireEvent.changeText(passwordInput, "password123");

  expect(emailInput.props.value).toBe("user@example.com");
  expect(passwordInput.props.value).toBe("password123");
});
```

**Testing button states:**

```tsx
it("GIVEN a disabled button WHEN user attempts to press THEN onPress is not called", () => {
  const mockOnPress = jest.fn();
  render(<MyButton label="Submit" onPress={mockOnPress} disabled />);

  const button = screen.getByRole("button");
  fireEvent.press(button);

  expect(mockOnPress).not.toHaveBeenCalled();
});
```

**Testing complex interactions:**

```tsx
it("GIVEN a login form WHEN user submits with valid data THEN onSubmit is called with credentials", () => {
  const mockSubmit = jest.fn();
  render(<LoginForm onSubmit={mockSubmit} />);

  fireEvent.changeText(screen.getByLabelText("Email"), "user@example.com");
  fireEvent.changeText(screen.getByLabelText("Password"), "password123");
  fireEvent.press(screen.getByText("Log In"));

  expect(mockSubmit).toHaveBeenCalledWith({
    email: "user@example.com",
    password: "password123",
  });
});
```

**Testing scroll behavior:**

```tsx
it("GIVEN a scrollable list WHEN user scrolls down THEN onEndReached is triggered", () => {
  const mockOnEndReached = jest.fn();
  render(<InfiniteList onEndReached={mockOnEndReached} />);

  const scrollView = screen.getByTestId("infinite-list");
  fireEvent.scroll(scrollView, {
    nativeEvent: {
      contentOffset: { y: 1000 },
      contentSize: { height: 1200 },
      layoutMeasurement: { height: 600 },
    },
  });

  expect(mockOnEndReached).toHaveBeenCalled();
});
```

**Why this matters:**

- Simulates real user interactions
- Tests the full component behavior including event propagation
- Catches bugs that direct calls wouldn't reveal
- Consistent with Testing Library philosophy ("test like a user")
- Verifies that event handlers are properly wired up
- Tests accessibility tree interactions
