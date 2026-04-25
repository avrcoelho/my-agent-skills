---
title: Use Imports instead of Require
impact: MEDIUM
impactDescription: consistent module loading pattern across all tests
tags: testing, imports, require, modules
---

## Use Imports instead of Require

Always use ES6 `import` statements rather than CommonJS `require()` in test files. This ensures consistency with the rest of the codebase and provides better type safety and IDE support.

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

- **Consistency**: Matches the standard implementation pattern used throughout the React Native project.
- **Type Safety**: TypeScript provides better type checking and autocompletion for ES6 imports.
- **Tooling Support**: Modern build tools and IDEs are optimized for ES6 modules.
- **Maintainability**: Standardized module loading makes the codebase easier to read and navigate.
- **Static Analysis**: ES6 imports allow for better static analysis and tree-shaking.
