---
title: Gherkin-Style Test Descriptions
impact: HIGH
impactDescription: makes tests self-documenting and behavior-focused
tags: testing, gherkin, descriptions
---

## Gherkin-Style Test Descriptions

All test descriptions (`it` or `test` strings) must use the **GIVEN / WHEN /
THEN** pattern. The keywords `GIVEN`, `WHEN`, and `THEN` must be **UPPERCASE**.

**Template:** `GIVEN [initial state/context] WHEN [action/event occurs] THEN [expected outcome]`

**Incorrect (vague descriptions):**

```tsx
it("should render", () => {
  // test
});

it("button press works", () => {
  // test
});

it("disabled state", () => {
  // test
});
```

**Incorrect (lowercase keywords):**

```tsx
it("given a label when rendering then it displays text", () => {
  // test
});
```

**Correct:**

```tsx
it("GIVEN a label prop WHEN the component renders THEN it displays the correct text", () => {
  render(<MyButton label="Submit" onPress={() => {}} />);
  expect(screen.getByText("Submit")).toBeTruthy();
});

it("GIVEN the button is enabled WHEN the user presses it THEN the onPress handler is triggered", () => {
  const mockOnPress = jest.fn();
  render(<MyButton label="Press Me" onPress={mockOnPress} />);

  const button = screen.getByRole("button");
  fireEvent.press(button);

  expect(mockOnPress).toHaveBeenCalledTimes(1);
});

it("GIVEN the button is disabled WHEN the user presses it THEN the onPress handler is NOT triggered", () => {
  const mockOnPress = jest.fn();
  render(<MyButton label="Press Me" onPress={mockOnPress} disabled />);

  const button = screen.getByRole("button");
  fireEvent.press(button);

  expect(mockOnPress).not.toHaveBeenCalled();
});
```

**Variations for different scenarios:**

```tsx
// Testing initial render
it("GIVEN no props WHEN the component renders THEN it displays default state", () => {});

// Testing state changes
it("GIVEN a counter at 5 WHEN increment is called THEN counter shows 6", () => {});

// Testing error conditions
it("GIVEN invalid input WHEN form is submitted THEN validation error is displayed", () => {});

// Testing async operations
it("GIVEN a valid user ID WHEN fetching user data THEN loading spinner is shown", () => {});

// Testing conditional rendering
it("GIVEN isLoading is true WHEN the component renders THEN spinner is visible", () => {});
```

**Why this matters:**

- Tests read like specifications
- Clear separation of setup (GIVEN), action (WHEN), and assertion (THEN)
- Easy to understand test intent without reading implementation
- Consistent format makes test suites scannable
- Maps directly to behavior-driven development (BDD) practices
- Non-technical stakeholders can understand test coverage
