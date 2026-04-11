# impl-user-event

## Use userEvent Over fireEvent

Use `userEvent` from `@testing-library/user-event` for simulating user interactions. Do **not** use `fireEvent` from `@testing-library/react`.

### ❌ Incorrect

```typescript
import { render, screen, fireEvent } from '@testing-library/react';

it('GIVEN a button WHEN clicked THEN handler is called', () => {
  const handleClick = jest.fn();
  render(<MyButton label="Click" onClick={handleClick} />);

  fireEvent.click(screen.getByRole('button'));
  //        ^^^^^ — fireEvent — AVOID

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### ✅ Correct

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it('GIVEN a button WHEN clicked THEN handler is called', () => {
  const handleClick = jest.fn();
  render(<MyButton label="Click" onClick={handleClick} />);

  userEvent.click(screen.getByRole('button'));
  //        ^^^^^ — userEvent — PREFERRED

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Why

`userEvent` more closely simulates real browser behavior (focus, hover, pointer events) compared to `fireEvent`, which only dispatches a single DOM event. This leads to more realistic and reliable tests.
