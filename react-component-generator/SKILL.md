---
name: react-component-generator
description: Generate React components, pages, or hooks with complete Clean Architecture file structure. Use when creating new components, pages, hooks, or scaffolding React artifacts. Triggers on "create component", "scaffold page", "generate hook", "new React component", or similar component creation tasks.
license: MIT
metadata:
  author: avrcoelho
  version: "1.0.0"
---

# React Component Generator

Automated generator for React components, pages, and hooks following Clean Architecture principles. Creates complete file structures with proper naming conventions, boilerplate code, and unit tests.

## When to Use

Use this skill when you need to:

- Create a new React component with proper file structure
- Scaffold a new page following page conventions
- Generate a custom React hook with all required files
- Bootstrap any React artifact that requires Clean Architecture compliance

## What This Skill Generates

This skill creates **complete, production-ready file structures** including:

- ✅ All required files with proper naming conventions
- ✅ Basic boilerplate with imports and exports
- ✅ Controller logic separation (for components/pages)
- ✅ Type definitions and interfaces
- ✅ Styled component setup
- ✅ Data/constants files
- ✅ Unit test files with GIVEN/WHEN/THEN structure
- ✅ Index barrel exports

## Supported Types

### 1. Components

Generates shared/reusable components in `src/presentation/components/`

**File Structure:**

```
component-name/
├── __tests__/
│   └── component-name.spec.tsx
├── component-name.tsx
├── component-name.use-controller.ts
├── component-name.styles.ts
├── component-name.data.ts
├── component-name.types.ts
└── index.ts
```

### 2. Pages

Generates route-level pages in `src/pages/`

**File Structure:**

```
page-name/
├── __tests__/
│   └── page-name.spec.tsx
├── components/             # Page-exclusive components
├── page-name.tsx
├── page-name.use-controller.ts
├── page-name.data.ts
├── page-name.styles.ts
├── page-name.types.ts
└── index.ts
```

### 3. Hooks

Generates custom React hooks in `src/presentation/hooks/`

**File Structure:**

```
use-hook-name/
├── __tests__/
│   └── use-hook-name.spec.tsx
├── use-hook-name.tsx
├── use-hook-name.data.ts
├── use-hook-name.types.ts
└── index.ts
```

## Usage Workflow

When invoked, this skill will:

1. **Determine Type** — Ask what you want to create: Component, Page, or Hook
2. **Get Name** — Request the name (e.g., "segmentation-form", "use-get-items")
3. **Determine Location** — For components, ask which category (forms, buttons, inputs, modals, etc.)
4. **Validate Path** — Ensure the target path follows Clean Architecture structure
5. **Generate Files** — Create all files with proper boilerplate
6. **Report** — Summarize what was created with file paths

## Naming Conventions

The skill automatically enforces:

- **kebab-case** for all file and folder names
- **use-** prefix for hooks
- **.tsx** extension for React components and hooks
- **.ts** extension for logic, types, data files
- **.spec.tsx** for test files
- **No** PascalCase in file names (only in code exports)

## File Content Templates

### Component JSX (\*.tsx)

```tsx
import { ComponentNameProps } from "./component-name.types";
import { Container } from "./component-name.styles";
import { useComponentNameController } from "./component-name.use-controller";

export const ComponentName = (props: ComponentNameProps) => {
  const controller = useComponentNameController(props);

  return (
    <Container>
      <h1>{controller.title}</h1>
      {/* Add your JSX here */}
    </Container>
  );
};
```

### Controller (\*.use-controller.ts)

```typescript
import { useState } from "react";
import {
  ComponentNameProps,
  UseComponentNameController,
} from "./component-name.types";
import { COMPONENT_NAME_CONSTANTS } from "./component-name.data";

export const useComponentNameController = (
  props: ComponentNameProps,
): UseComponentNameController => {
  const [state, setState] = useState("");

  // Add your logic here

  return {
    title: COMPONENT_NAME_CONSTANTS.TITLE,
    // Export your state and functions
  };
};
```

### Types (\*.types.ts)

```typescript
export interface ComponentNameProps {
  // Define your props here
}

export interface UseComponentNameController {
  title: string;
  // Define your return interface
}
```

### Data (\*.data.ts)

```typescript
export const COMPONENT_NAME_CONSTANTS = {
  TITLE: "Component Name",
  // Add your constants here
} as const;
```

### Styles (\*.styles.ts)

```typescript
import styled from "styled-components";

export const Container = styled.div`
  /* Add your styles here */
`;
```

### Index (index.ts)

```typescript
export { ComponentName } from "./component-name";
```

### Test (\*.spec.tsx)

```typescript
import { render, screen } from '@testing-library/react';
import { ComponentName } from '../component-name';

describe('presentation/components/category/component-name', () => {
  it('GIVEN ComponentName is rendered WHEN the component mounts THEN it should display correctly', () => {
    render(<ComponentName />);

    expect(screen.getByText(/component name/i)).toBeInTheDocument();
  });
});
```

## Page-Specific Features

When generating a **Page**, the skill will also:

1. Create an empty `components/` folder for page-exclusive components
2. Use page-specific naming in the describe block: `pages/domain/page-name`
3. Include router/navigation imports if needed

## Hook-Specific Features

When generating a **Hook**, the skill will:

1. Use `.tsx` extension for the hook file (following convention)
2. Prefix all files with `use-`
3. Include `renderHook` from `@testing-library/react` in tests
4. Use hook-specific test patterns

## Example Prompts

- "Create a component called login-form in the forms category"
- "Generate a page named dashboard in the admin folder"
- "Scaffold a hook called use-fetch-users"
- "Create a modal component called confirmation-dialog"
- "Generate a new button component named submit-button"

## Notes

- **Not all files are mandatory** — Simple components may not need `.data.ts` or `.use-controller.ts`
- **Tests are always created** — Following TDD principles
- **Controller pattern is default** — Logic is separated from JSX
- **Clean Architecture rules are enforced** — Dependency direction is validated

## Integration with Other Skills

This skill works in conjunction with:

- **react-clean-architecture-structure** — References the architectural rules
- **frontend-unit-testing** — Generates tests following testing conventions

## Related Files

For detailed rules and patterns, see:

- `../react-clean-architecture-structure/rules/component-file-set.md`
- `../react-clean-architecture-structure/rules/page-file-set.md`
- `../react-clean-architecture-structure/rules/hook-file-set.md`
- `../frontend-unit-testing/rules/file-location.md`
- `../frontend-unit-testing/rules/description-gherkin.md`
