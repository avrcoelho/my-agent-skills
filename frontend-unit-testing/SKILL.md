---
name: frontend-unit-testing
description: Frontend unit testing standards and conventions for React components and TypeScript functions using Jest and React Testing Library. This skill should be used when writing, reviewing, or generating unit tests to ensure consistency with project conventions. Triggers on tasks involving test creation, test refactoring, test reviews, or any testing-related questions.
license: MIT
metadata:
  author: avrcoelho
  version: "1.0.0"
---

# Frontend Unit Testing Standards

Comprehensive unit testing guide for React components and TypeScript functions using Jest and React Testing Library. Contains rules across 4 categories covering file structure, test organization, description conventions, and implementation patterns.

## When to Apply

Reference these guidelines when:

- Writing new unit tests for React components or TypeScript functions
- Reviewing existing test files for convention compliance
- Refactoring or updating test suites
- Generating test boilerplate or scaffolding
- Answering questions about testing patterns in this project

## Technology Stack

- **Framework:** React.js
- **Language:** TypeScript
- **Testing Engine:** Jest
- **Testing Utilities:** React Testing Library (`@testing-library/react`)
- **User Events:** `@testing-library/user-event`

## Rule Categories

| Priority | Category                   | Impact   | Prefix         |
| -------- | -------------------------- | -------- | -------------- |
| 1        | File Location & Naming     | CRITICAL | `file-`        |
| 2        | Test Structure & Hierarchy | HIGH     | `structure-`   |
| 3        | Test Descriptions          | HIGH     | `description-` |
| 4        | Implementation Patterns    | MEDIUM   | `impl-`        |

## Quick Reference

### 1. File Location & Naming (CRITICAL)

- `file-location` - Place test files inside a `__tests__` folder within the component's directory
- `file-extension` - Use `.spec.tsx` for components and `.spec.ts` for functions
- `file-no-test-suffix` - Never use `.test.tsx` or `.test.ts` extensions

### 2. Test Structure & Hierarchy (HIGH)

- `structure-flat-describe` - Use a single top-level `describe` block, no nesting
- `structure-describe-path` - Name the `describe` block with the file's relative path

### 3. Test Descriptions (HIGH)

- `description-gherkin` - Use GIVEN / WHEN / THEN pattern for all test descriptions
- `description-uppercase-keywords` - Keywords GIVEN, WHEN, THEN must be uppercase

### 4. Implementation Patterns (MEDIUM)

- `impl-screen-queries` - Always use the global `screen` object for DOM queries
- `impl-user-centric-queries` - Prioritize `getByText`, `getByRole` over `data-testid`
- `impl-user-event` - Use `userEvent` for interactions instead of `fireEvent`
- `impl-render-import` - Use `render` from `@testing-library/react`

## How to Use

Read individual rule files for detailed explanations and code examples:

```
rules/file-location.md
rules/structure-flat-describe.md
rules/description-gherkin.md
rules/impl-screen-queries.md
```

Each rule file contains:

- Brief explanation of why it matters
- Incorrect code example with explanation
- Correct code example with explanation
- Additional context

## Full Compiled Document

For the complete guide with all rules expanded: `AGENTS.md`
