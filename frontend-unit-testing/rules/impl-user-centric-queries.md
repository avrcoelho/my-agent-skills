# impl-user-centric-queries

## User-Centric Queries

Prioritize user-centric queries over implementation details. Prefer queries that reflect how a real user finds elements.

**Query priority (highest to lowest):**

1. `getByRole` — accessible role (button, heading, textbox, etc.)
2. `getByText` — visible text content
3. `getByLabelText` — form elements by their label
4. `getByPlaceholderText` — input placeholders
5. `getByDisplayValue` — current input value
6. `getByAltText` — images by alt text
7. `getByTitle` — title attribute
8. `getByTestId` — **last resort only**

### ❌ Incorrect

```typescript
it('GIVEN a submit button WHEN rendered THEN it is visible', () => {
  render(<MyButton label="Submit" />);

  expect(screen.getByTestId('submit-btn')).toBeTruthy();
  //     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ — data-testid as first choice — AVOID
});
```

### ✅ Correct

```typescript
it('GIVEN a submit button WHEN rendered THEN it is visible', () => {
  render(<MyButton label="Submit" />);

  expect(screen.getByRole('button', { name: 'Submit' })).toBeTruthy();
  //     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ — role-based query — PREFERRED
});
```

### Why

User-centric queries test the component from the user's perspective. They are more resilient to refactors and ensure accessibility is maintained.
