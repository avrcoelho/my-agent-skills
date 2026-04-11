# Frontend Unit Testing Standards

**Version 1.0.0**  
AndreCoelho Engineering  
March 2026

> **Note:**  
> This document is mainly for agents and LLMs to follow when generating,  
> reviewing, or refactoring unit tests in this React/TypeScript codebase.  
> Humans may also find it useful, but guidance here is optimized for  
> automation and consistency by AI-assisted workflows.

---

## Abstract

Comprehensive unit testing standards guide for React components and TypeScript functions. Covers file naming conventions, test structure, description formatting (Gherkin-style), and implementation patterns using Jest and React Testing Library. All AI-generated tests must strictly adhere to these rules to maintain codebase consistency.

---

## Table of Contents

1. [File Location & Naming](#1-file-location--naming) — **CRITICAL**
   - 1.1 [Place Tests in `__tests__` Directory](#11-place-tests-in-__tests__-directory)
   - 1.2 [Use `.spec` Extension](#12-use-spec-extension)
   - 1.3 [Never Use `.test` Extension](#13-never-use-test-extension)
2. [Test Structure & Hierarchy](#2-test-structure--hierarchy) — **HIGH**
   - 2.1 [Flat Describe Blocks](#21-flat-describe-blocks)
   - 2.2 [Describe Block Naming](#22-describe-block-naming)
3. [Test Descriptions](#3-test-descriptions) — **HIGH**
   - 3.1 [Gherkin-Style Descriptions](#31-gherkin-style-descriptions)
   - 3.2 [Uppercase Keywords](#32-uppercase-keywords)
4. [Implementation Patterns](#4-implementation-patterns) — **MEDIUM**
   - 4.1 [Use Global Screen Object](#41-use-global-screen-object)
   - 4.2 [User-Centric Queries](#42-user-centric-queries)
   - 4.3 [Use userEvent Over fireEvent](#43-use-userevent-over-fireevent)
   - 4.4 [Render Import](#44-render-import)

---

## 1. File Location & Naming — **CRITICAL**

### 1.1 Place Tests in `__tests__` Directory

> **Rule:** `file-location`

All test files must be located inside a `__tests__` folder within the component's or module's directory.

#### ❌ Incorrect

```
src/components/my-button/my-button.spec.tsx    ← test at same level as component
src/components/my-button/tests/my-button.spec.tsx  ← wrong folder name
src/__tests__/components/my-button.spec.tsx   ← centralized test folder
```

#### ✅ Correct

```
src/components/my-button/__tests__/my-button.spec.tsx
src/utils/format-date/__tests__/format-date.spec.ts
```

**Why:** Colocating tests in a consistent `__tests__` sub-directory makes them easy to find, keeps the component directory clean, and aligns with this project's Jest configuration.

---

### 1.2 Use `.spec` Extension

> **Rule:** `file-extension`

All test files must use the `.spec` extension:

- `.spec.tsx` for component tests (files with JSX)
- `.spec.ts` for pure function/utility tests (no JSX)

#### ❌ Incorrect

```
my-button.test.tsx
format-date.test.ts
my-button.tests.tsx
```

#### ✅ Correct

```
my-button.spec.tsx
format-date.spec.ts
```

**Why:** The project standardizes on `.spec` to maintain a single convention. Jest is configured to match `*.spec.ts` and `*.spec.tsx` files.

---

### 1.3 Never Use `.test` Extension

> **Rule:** `file-no-test-suffix`

Do **not** use `.test.tsx` or `.test.ts` for any test file.

#### ❌ Incorrect

```typescript
// File: my-button.test.tsx — FORBIDDEN
import { render, screen } from "@testing-library/react";
```

#### ✅ Correct

```typescript
// File: my-button.spec.tsx — CORRECT
import { render, screen } from "@testing-library/react";
```

**Why:** This codebase exclusively uses `.spec` to avoid ambiguity and maintain a single, searchable pattern for test files.

---

## 2. Test Structure & Hierarchy — **HIGH**

### 2.1 Flat Describe Blocks

> **Rule:** `structure-flat-describe`

Use a single top-level `describe` block. Do **not** nest `describe` blocks inside one another.

#### ❌ Incorrect

```typescript
describe("MyButton", () => {
  describe("when enabled", () => {
    // ← nested describe FORBIDDEN
    describe("on click", () => {
      // ← deeper nesting FORBIDDEN
      it("calls handler", () => {
        // ...
      });
    });
  });
});
```

#### ✅ Correct

```typescript
describe("@/components/my-button", () => {
  it("GIVEN the button is enabled WHEN the user clicks it THEN the handler is called", () => {
    // ...
  });

  it("GIVEN the button is disabled WHEN the user clicks it THEN the handler is NOT called", () => {
    // ...
  });
});
```

**Why:** Flat test suites are easier to read, scan, and maintain. The Gherkin-style description provides all the context that nested `describe` blocks would otherwise give.

---

### 2.2 Describe Block Naming

> **Rule:** `structure-describe-path`

The top-level `describe` string must match the file's relative path from the `src` directory, using the `@/` alias prefix.

#### ❌ Incorrect

```typescript
describe('MyButton', () => { ... });
describe('MyButton component', () => { ... });
describe('Button tests', () => { ... });
```

#### ✅ Correct

```typescript
// For: src/components/my-button/__tests__/my-button.spec.tsx
describe('@/components/my-button', () => { ... });

// For: src/utils/format-date/__tests__/format-date.spec.ts
describe('@/utils/format-date', () => { ... });
```

**Why:** Using the file path as the describe name creates a unique identifier for each test suite and helps quickly locate the source file being tested.

---

## 3. Test Descriptions — **HIGH**

### 3.1 Gherkin-Style Descriptions

> **Rule:** `description-gherkin`

All test descriptions (`it` or `test` strings) must use the **GIVEN / WHEN / THEN** pattern.

**Template:** `GIVEN [initial state/context] WHEN [action/event occurs] THEN [expected outcome]`

#### ❌ Incorrect

```typescript
it('should render the button', () => { ... });
it('renders correctly', () => { ... });
it('calls onClick when clicked', () => { ... });
it('displays error message', () => { ... });
```

#### ✅ Correct

```typescript
it('GIVEN a label prop WHEN the component renders THEN it displays the correct text', () => { ... });
it('GIVEN the button is enabled WHEN the user clicks it THEN the onClick handler is triggered', () => { ... });
it('GIVEN an invalid email WHEN the form is submitted THEN an error message is displayed', () => { ... });
```

**Why:** Gherkin-style descriptions clearly communicate preconditions, actions, and expected results. This makes tests self-documenting and easier to understand at a glance.

---

### 3.2 Uppercase Keywords

> **Rule:** `description-uppercase-keywords`

The keywords `GIVEN`, `WHEN`, and `THEN` must always be **UPPERCASE** in test descriptions.

#### ❌ Incorrect

```typescript
it('given a label when rendered then shows text', () => { ... });
it('Given a label When rendered Then shows text', () => { ... });
it('GIVEN a label when rendered THEN shows text', () => { ... });  // inconsistent
```

#### ✅ Correct

```typescript
it('GIVEN a label WHEN rendered THEN shows text', () => { ... });
```

**Why:** Uppercase keywords create visual anchors in test output, making it easy to scan test results and quickly identify the three sections of each test description.

---

## 4. Implementation Patterns — **MEDIUM**

### 4.1 Use Global Screen Object

> **Rule:** `impl-screen-queries`

Always use the global `screen` object from `@testing-library/react` to query the DOM. **Do not** destructure query methods from the `render` function's return value.

#### ❌ Incorrect

```typescript
import { render } from '@testing-library/react';

it('GIVEN a label WHEN rendered THEN shows text', () => {
  const { getByText, getByRole } = render(<MyButton label="Submit" />);
  //      ^^^^^^^^^ ^^^^^^^^^ — destructured from render — FORBIDDEN

  expect(getByText('Submit')).toBeTruthy();
});
```

#### ✅ Correct

```typescript
import { render, screen } from '@testing-library/react';

it('GIVEN a label WHEN rendered THEN shows text', () => {
  render(<MyButton label="Submit" />);

  expect(screen.getByText('Submit')).toBeTruthy();
});
```

**Why:** Using `screen` consistently across all tests creates a uniform API surface and avoids confusion about query scope. The `screen` object always reflects the latest DOM state.

---

### 4.2 User-Centric Queries

> **Rule:** `impl-user-centric-queries`

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

#### ❌ Incorrect

```typescript
it('GIVEN a submit button WHEN rendered THEN it is visible', () => {
  render(<MyButton label="Submit" />);

  expect(screen.getByTestId('submit-btn')).toBeTruthy();
  //     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ — data-testid as first choice — AVOID
});
```

#### ✅ Correct

```typescript
it('GIVEN a submit button WHEN rendered THEN it is visible', () => {
  render(<MyButton label="Submit" />);

  expect(screen.getByRole('button', { name: 'Submit' })).toBeTruthy();
  //     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ — role-based query — PREFERRED
});
```

**Why:** User-centric queries test the component from the user's perspective. They are more resilient to refactors and ensure accessibility is maintained.

---

### 4.3 Use userEvent Over fireEvent

> **Rule:** `impl-user-event`

Use `userEvent` from `@testing-library/user-event` for simulating user interactions. Do **not** use `fireEvent` from `@testing-library/react`.

#### ❌ Incorrect

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

#### ✅ Correct

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

**Why:** `userEvent` more closely simulates real browser behavior (focus, hover, pointer events) compared to `fireEvent`, which only dispatches a single DOM event. This leads to more realistic and reliable tests.

---

### 4.4 Render Import

> **Rule:** `impl-render-import`

Always import `render` from `@testing-library/react`. Do not create custom render wrappers unless providing context providers.

#### ❌ Incorrect

```typescript
import { mount } from "enzyme"; // wrong library
import { renderComponent } from "../testUtils"; // non-standard wrapper
```

#### ✅ Correct

```typescript
import { render, screen } from "@testing-library/react";
```

**Why:** Using the standard `render` from React Testing Library ensures consistency and avoids hidden complexity from custom wrappers.

---

## Complete Example

Below is a fully compliant test file demonstrating all rules:

**Path:** `src/components/my-button/__tests__/my-button.spec.tsx`

```tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MyButton } from "../my-button";

describe("@/components/my-button", () => {
  it("GIVEN a label prop WHEN the component renders THEN it displays the correct text", () => {
    render(<MyButton label="Submit" onPress={() => {}} />);

    expect(screen.getByText("Submit")).toBeTruthy();
  });

  it("GIVEN the button is enabled WHEN the user presses it THEN the onPress handler is triggered", () => {
    const mockOnPress = jest.fn();
    render(<MyButton label="Press Me" onPress={mockOnPress} />);

    const button = screen.getByRole("button");
    userEvent.click(button);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("GIVEN the button is disabled WHEN the user presses it THEN the onPress handler is NOT triggered", () => {
    const mockOnPress = jest.fn();
    render(<MyButton label="Press Me" onPress={mockOnPress} disabled />);

    const button = screen.getByRole("button");
    userEvent.click(button);

    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
```

---

## Checklist

Use this checklist to validate any test file:

- [ ] Test file is inside a `__tests__` directory
- [ ] File extension is `.spec.tsx` or `.spec.ts`
- [ ] No `.test.tsx` or `.test.ts` files exist
- [ ] Single top-level `describe` block (no nesting)
- [ ] `describe` name matches file path with `@/` prefix
- [ ] All `it`/`test` descriptions use `GIVEN / WHEN / THEN`
- [ ] Keywords `GIVEN`, `WHEN`, `THEN` are UPPERCASE
- [ ] DOM queries use `screen` object (not destructured from `render`)
- [ ] Queries prioritize `getByRole`/`getByText` over `getByTestId`
- [ ] User interactions use `userEvent`, not `fireEvent`
- [ ] `render` is imported from `@testing-library/react`
