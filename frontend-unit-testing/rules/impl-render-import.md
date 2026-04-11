# impl-render-import

## Render Import

Always import `render` from `@testing-library/react`. Do not create custom render wrappers unless providing context providers.

### ❌ Incorrect

```typescript
import { mount } from 'enzyme'; // wrong library
import { renderComponent } from '../testUtils'; // non-standard wrapper
```

### ✅ Correct

```typescript
import { render, screen } from '@testing-library/react';
```

### Why

Using the standard `render` from React Testing Library ensures consistency and avoids hidden complexity from custom wrappers.
