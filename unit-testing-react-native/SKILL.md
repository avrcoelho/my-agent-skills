---
name: unit-testing-react-native
description:
  Strict unit testing conventions for React Native with Jest and React Testing
  Library. Use when writing tests for React Native components and functions.
  Enforces Gherkin-style test descriptions, flat test structure, and user-centric
  queries. Triggers on tasks involving test generation or test refactoring.
license: MIT
metadata:
  author: custom
  version: "1.0.0"
---

# Unit Testing React Native Skills

Strict conventions for unit testing React Native applications using Jest and
React Testing Library (`@testing-library/react-native`). Enforces consistent file structure, Gherkin-style test
descriptions, and user-centric query patterns.

## When to Apply

Reference these guidelines when:

- Writing unit tests for React Native components
- Writing unit tests for TypeScript functions and utilities
- Refactoring existing tests
- Setting up test structure in a React Native project

## Rule Categories by Priority

| Priority | Category          | Impact   | Prefix               |
| -------- | ----------------- | -------- | -------------------- |
| 1        | File Structure    | CRITICAL | `file-`              |
| 2        | Test Structure    | HIGH     | `structure-`         |
| 3        | Test Descriptions | HIGH     | `test-descriptions-` |
| 4        | Implementation    | MEDIUM   | `implementation-`    |

## Quick Reference

### 1. File Structure (CRITICAL)

- `file-location-naming` - Test files in `__tests__` folder with same name and `.spec.tsx`/`.spec.ts` extension; do not use `.test.tsx`/`.test.ts`

### 2. Test Structure (HIGH)

- `structure-flat` - Single top-level describe block, no nesting

### 3. Test Descriptions (HIGH)

- `test-descriptions-gherkin` - GIVEN/WHEN/THEN pattern with UPPERCASE keywords

### 4. Implementation (MEDIUM)

- `implementation-imports` - Always use `import` instead of `require`
- `implementation-screen-object` - Always use the global `screen` object for queries
- `implementation-queries` - Prefer user-centric queries over testIDs
- `implementation-fire-event` - Use `fireEvent` for user interactions

## Core Principles

1. **Consistency**: All tests follow the same structure and conventions
2. **Readability**: Gherkin-style descriptions make tests self-documenting
3. **User-Centric**: Query the UI as a user would interact with it
4. **Isolation**: Each test file lives in its own `__tests__` folder

## Technology Stack

- **Testing Engine**: Jest
- **Testing Library**: React Testing Library (`@testing-library/react-native`)
- **Language**: TypeScript
- **Framework**: React Native

## Example

```tsx
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { MyButton } from "../MyButton";

describe("@/components/component-file", () => {
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
});
```
