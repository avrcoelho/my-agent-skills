---
title: Test Files in __tests__ Folder with Same Name and .spec Extension
impact: CRITICAL
impactDescription: maintains consistent project structure and test discoverability
tags: testing, file-structure, naming
---

## Test Files in __tests__ Folder with Same Name and .spec Extension

All test files must be located inside a `__tests__` folder within the
component's or function's directory. Test files must have the same name as
the file being tested, followed by the `.spec.tsx` (components) or
`.spec.ts` (functions) extension.

**Forbidden:** Do not use `.test.tsx` or `.test.ts` extensions.

**Incorrect (wrong extension):**

```
src/
  components/
    MyButton.tsx
    MyButton.test.tsx  ❌
```

**Incorrect (wrong folder name):**

```
src/
  components/
    MyButton.tsx
    tests/
      MyButton.spec.tsx  ❌
```

**Correct:**

```
src/
  components/
    MyButton.tsx
    __tests__/
      MyButton.spec.tsx  ✅
```

**For utility functions:**

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
- Standard convention in the React/React Native community
