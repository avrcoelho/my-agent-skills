# description-gherkin

## Gherkin-Style Descriptions

All test descriptions (`it` or `test` strings) must use the **GIVEN / WHEN / THEN** pattern.

**Template:** `GIVEN [initial state/context] WHEN [action/event occurs] THEN [expected outcome]`

### ❌ Incorrect

```typescript
it('should render the button', () => { ... });
it('renders correctly', () => { ... });
it('calls onClick when clicked', () => { ... });
it('displays error message', () => { ... });
```

### ✅ Correct

```typescript
it('GIVEN a label prop WHEN the component renders THEN it displays the correct text', () => { ... });
it('GIVEN the button is enabled WHEN the user clicks it THEN the onClick handler is triggered', () => { ... });
it('GIVEN an invalid email WHEN the form is submitted THEN an error message is displayed', () => { ... });
```

### Why

Gherkin-style descriptions clearly communicate preconditions, actions, and expected results. This makes tests self-documenting and easier to understand at a glance.
