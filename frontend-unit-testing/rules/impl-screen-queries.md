# impl-screen-queries

## Use Global Screen Object

Always use the global `screen` object from `@testing-library/react` to query the DOM. **Do not** destructure query methods from the `render` function's return value.

### ❌ Incorrect

```typescript
import { render } from '@testing-library/react';

it('GIVEN a label WHEN rendered THEN shows text', () => {
  const { getByText, getByRole } = render(<MyButton label="Submit" />);
  //      ^^^^^^^^^ ^^^^^^^^^ — destructured from render — FORBIDDEN

  expect(getByText('Submit')).toBeTruthy();
});
```

### ✅ Correct

```typescript
import { render, screen } from '@testing-library/react';

it('GIVEN a label WHEN rendered THEN shows text', () => {
  render(<MyButton label="Submit" />);

  expect(screen.getByText('Submit')).toBeTruthy();
});
```

### Why

Using `screen` consistently across all tests creates a uniform API surface and avoids confusion about query scope. The `screen` object always reflects the latest DOM state.
