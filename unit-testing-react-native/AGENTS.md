# Unit Testing React Native Skills

**Version 1.0.0**  
Testing  
March 2026

> **Note:**  
> This document is for agents and LLMs to follow when generating or refactoring  
> unit tests for React Native codebases. These rules enforce strict consistency  
> in test structure, descriptions, and implementation patterns.

---

## Abstract

Comprehensive unit testing guidelines for React Native applications using Jest and React Testing Library, designed for AI agents and LLMs. Contains 7 strict rules across 4 categories, prioritized by impact from critical (file structure) to medium (implementation details). Each rule includes detailed explanations and real-world examples comparing incorrect vs. correct implementations to guide automated test generation and refactoring.

---

## Table of Contents

1. [File Structure](#1-file-structure) — **CRITICAL**
   - 1.1 [Test Files in **tests** Folder with .spec Extension](#11-test-files-in-__tests__-folder-with-spec-extension)
2. [Test Structure](#2-test-structure) — **HIGH**
   - 2.1 [Single Top-Level Describe Block](#21-single-top-level-describe-block)
3. [Test Descriptions](#3-test-descriptions) — **HIGH**
   - 3.1 [Gherkin-Style Test Descriptions](#31-gherkin-style-test-descriptions)
4. [Implementation](#4-implementation) — **MEDIUM**
   - 4.1 [Use ES6 Imports instead of Require](#41-use-es6-imports-instead-of-require)
   - 4.2 [Use Global Screen Object for Queries](#42-use-global-screen-object-for-queries)
   - 4.3 [Prefer User-Centric Queries](#43-prefer-user-centric-queries)
   - 4.4 [Use fireEvent for User Interactions](#44-use-fireevent-for-user-interactions)

---

## 1. File Structure — **CRITICAL**

### 1.1 Test Files in __tests__ Folder with Same Name and .spec Extension

**Rule:** All test files must be located inside a `__tests__` folder within the component's or function's directory. Test files must have the same name as the file being tested, followed by the `.spec.tsx` (components) or `.spec.ts` (functions) extension.

**Impact:** CRITICAL - Maintains consistent project structure and test discoverability

**Forbidden:** Do not use `.test.tsx` or `.test.ts` extensions.

**Incorrect:**

```
src/
  components/
    MyButton.tsx
    MyButton.test.tsx  ❌ Wrong extension
```

```
src/
  components/
    MyButton.tsx
    tests/
      MyButton.spec.tsx  ❌ Wrong folder name
```

**Correct:**

```
src/
  components/
    MyButton.tsx
    __tests__/
      MyButton.spec.tsx  ✅
```

```
src/
  utils/
    formatDate.ts
    __tests__/
      formatDate.spec.ts  ✅
```

**Why this matters:**

- Consistent file structure across the entire codebase
- Easy to locate tests for any component or function
- Clear separation between implementation and test files
- Jest configuration can target `__tests__` folders reliably

---

## 2. Test Structure — **HIGH**

### 2.1 Single Top-Level Describe Block

**Rule:** Use a single, top-level `describe` block matching the file's relative path. Do not nest `describe` blocks. Keep the test suite flat.

**Impact:** HIGH - Improves test readability and maintainability

**Incorrect (nested describes):**

```tsx
describe("@/components/MyButton", () => {
  describe("rendering", () => {
    it("displays the label", () => {
      // test
    });
  });

  describe("interactions", () => {
    it("calls onPress", () => {
      // test
    });
  });
});
```

**Correct (flat structure):**

```tsx
describe("@/components/MyButton", () => {
  it("GIVEN a label prop WHEN the component renders THEN it displays the correct text", () => {
    // test
  });

  it("GIVEN the button is enabled WHEN the user presses it THEN the onPress handler is triggered", () => {
    // test
  });
});
```

**Why this matters:**

- Simpler test output and error messages
- Easier to scan and understand test coverage
- Reduces cognitive overhead when reading tests
- Test descriptions are self-documenting without needing context

---

## 3. Test Descriptions — **HIGH**

### 3.1 Gherkin-Style Test Descriptions

**Rule:** All test descriptions (`it` or `test` strings) must use the **GIVEN / WHEN / THEN** pattern. The keywords `GIVEN`, `WHEN`, and `THEN` must be **UPPERCASE**.

**Impact:** HIGH - Makes tests self-documenting and behavior-focused

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
  // test
});

it("GIVEN the button is enabled WHEN the user presses it THEN the onPress handler is triggered", () => {
  // test
});

it("GIVEN the button is disabled WHEN the user presses it THEN the onPress handler is NOT triggered", () => {
  // test
});
```

**Why this matters:**

- Tests read like specifications
- Clear separation of setup, action, and assertion
- Easy to understand test intent without reading implementation
- Consistent format makes test suites scannable

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
```

---

## 4. Implementation — **MEDIUM**

### 4.1 Use ES6 Imports instead of Require

**Rule:** Always use ES6 `import` statements rather than CommonJS `require()` in test files.

**Impact:** MEDIUM - Consistent module loading pattern across all tests

**Correct (ES6 Import):**

```tsx
import React from "react";
import { render, screen } from "@testing-library/react-native";
import { MyComponent } from "../MyComponent";
```

**Incorrect (CommonJS Require):**

```tsx
const React = require("react");
const { render, screen } = require("@testing-library/react-native");
const MyComponent = require("../MyComponent").MyComponent;
```

**Why this matters:**

- Consistent implementation pattern across the project
- Better type checking and IDE support
- Modern tooling is optimized for ES6 modules

---

### 4.2 Use Global Screen Object for Queries

**Rule:** Always use the global `screen` object to query the DOM. Do not destructure query methods (e.g., `getByText`, `getByRole`) directly from the `render` function's return value.

**Impact:** MEDIUM - Ensures consistent query patterns and better error messages

**Incorrect (destructuring from render):**

```tsx
const { getByText, getByRole } = render(<MyButton label="Press Me" />);
const button = getByRole("button");
```

**Correct (using global screen):**

```tsx
render(<MyButton label="Press Me" />);
const button = screen.getByRole("button");
```

**Why this matters:**

- `screen` is automatically scoped to the most recent render
- Cleaner syntax with fewer variables
- Better error messages from Testing Library
- Consistent with React Testing Library best practices

**Common queries:**

```tsx
// Text content
screen.getByText("Submit");
screen.queryByText("Optional Text");

// Accessibility role
screen.getByRole("button");
screen.getByRole("textbox");

// Accessibility hint
screen.getByAccessibilityHint("Tap to submit");

// Test ID (use sparingly)
screen.getByTestId("submit-button");
```

---

### 4.3 Prefer User-Centric Queries

**Rule:** Prioritize user-centric queries (e.g., `getByText`, `getByAccessibilityHint`, `getByRole`) over implementation details (testIDs) whenever possible.

**Impact:** MEDIUM - Tests become more resilient to implementation changes

**Query Priority:**

1. `getByText` - What the user sees
2. `getByRole` - How screen readers identify elements
3. `getByAccessibilityHint` - Additional accessibility information
4. `getByTestId` - Last resort when semantic queries aren't possible

**Incorrect (over-reliance on testIDs):**

```tsx
render(<MyButton label="Submit" onPress={mockOnPress} />);
const button = screen.getByTestId("submit-button");
```

**Correct (user-centric queries):**

```tsx
render(<MyButton label="Submit" onPress={mockOnPress} />);
const button = screen.getByText("Submit");
// or
const button = screen.getByRole("button");
```

**When testIDs are acceptable:**

```tsx
// Complex components where text/role queries are ambiguous
const deleteButton = screen.getByTestId("delete-button-123");

// Dynamic content that changes frequently
const userAvatar = screen.getByTestId(`avatar-${userId}`);
```

**Why this matters:**

- Tests focus on user behavior, not implementation details
- More resilient to refactoring
- Encourages better accessibility
- Tests serve as documentation of user interactions

---

### 4.4 Use fireEvent for User Interactions

**Rule:** Use `fireEvent` from `@testing-library/react-native` for simulating user interactions.

**Impact:** MEDIUM - Consistent interaction patterns across all tests

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
```

**Incorrect (direct function calls):**

```tsx
const mockOnPress = jest.fn();
render(<MyButton onPress={mockOnPress} />);
mockOnPress(); // Directly calling the mock ❌
```

**Correct (fireEvent):**

```tsx
const mockOnPress = jest.fn();
render(<MyButton onPress={mockOnPress} />);
fireEvent.press(screen.getByRole("button"));
expect(mockOnPress).toHaveBeenCalledTimes(1);
```

**Why this matters:**

- Simulates real user interactions
- Tests the full component behavior, not just function calls
- Catches bugs that direct calls wouldn't reveal
- Consistent with Testing Library philosophy

---

## Complete Example

**File:** `src/components/MyButton/__tests__/MyButton.spec.tsx`

```tsx
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { MyButton } from "../MyButton";

describe("@/components/MyButton", () => {
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

  it("GIVEN a disabled prop WHEN the component renders THEN it applies disabled styling", () => {
    render(<MyButton label="Press Me" onPress={() => {}} disabled />);

    const button = screen.getByRole("button");
    expect(button.props.accessibilityState.disabled).toBe(true);
  });
});
```

---

## Testing Utilities Example

**File:** `src/utils/formatDate/__tests__/formatDate.spec.ts`

```ts
import { formatDate } from "../formatDate";

describe("@/utils/formatDate", () => {
  it("GIVEN a valid date string WHEN formatting THEN it returns the correct format", () => {
    const result = formatDate("2026-03-27");
    expect(result).toBe("March 27, 2026");
  });

  it("GIVEN an invalid date string WHEN formatting THEN it returns an error message", () => {
    const result = formatDate("invalid");
    expect(result).toBe("Invalid date");
  });

  it("GIVEN no argument WHEN formatting THEN it uses the current date", () => {
    const result = formatDate();
    expect(result).toMatch(/\w+ \d+, \d{4}/);
  });
});
```

---

## Summary

All generated tests must strictly follow these conventions:

1. **File Structure**: `__tests__` folder, `.spec.tsx`/`.spec.ts` extension
2. **Test Structure**: Single top-level `describe` block, flat structure
3. **Test Descriptions**: GIVEN/WHEN/THEN pattern with UPPERCASE keywords
4. **Implementation**: Use ES6 `import`, `screen` object, user-centric queries, `fireEvent` for interactions

These rules ensure consistency, readability, and maintainability across all unit tests in the React Native codebase.
