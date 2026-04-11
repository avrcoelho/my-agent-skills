# React Clean Architecture Folder Structure — Full Rules Reference

This document contains all rules expanded with explanations, correct and incorrect examples, and additional context.

---

## Category 1: App Layer Structure (CRITICAL)

### `app-dependency-direction`

**Why it matters:** This is the core Clean Architecture rule. Dependencies can only point inward. Entities must not depend on Infrastructure; Presentation must not depend on Infrastructure directly (only through use cases).

**Dependency flow:**

```
Main → Presentation → Entities
                   ↘ Infrastructure (implements Entities interfaces)
```

**Correct:**

```ts
// src/presentation/hooks/use-get-product.ts
import { Product } from "../../entities/product"; // ✅ inner layer
import { getProduct } from "../../infrastructure/gateways/https/get-product"; // ✅ via injection/adapter
```

**Incorrect:**

```ts
// src/entities/product.ts
import axios from "axios"; // ← WRONG: entity depends on infrastructure library
```

---

## Category 2: App Layer Structure (CRITICAL)

### `app-main-layer`

**Why it matters:** The `main/` layer is the entry point for the application. It bootstraps the app, registers routes, and wires dependencies. Keeping this layer minimal prevents tight coupling.

**Correct structure:**

```text
src/
└── main/
    ├── bootstrap.ts    # App bootstrap and mount logic
    ├── index.ts        # Entry point
    └── routes.ts       # Route definitions
```

**Incorrect — mixing route definitions with page components:**

```text
src/
└── main/
    ├── bootstrap.ts
    ├── index.ts
    ├── routes.ts
    └── AdminPage.tsx    ← WRONG: page component does not belong in main/
```

---

### `app-presentation-layer`

**Why it matters:** The `presentation/` layer holds shared UI elements for the app — components, hooks, assets, constants, and types that are used across multiple pages.

**Correct structure:**

```text
src/
└── presentation/
    ├── assets/           # Static files (images, SVGs)
    ├── constants/        # Enums.ts, RouteNames.ts
    ├── types/            # Shared types
    ├── components/       # Shared presentation components
    └── hooks/            # Shared presentation hooks
```

**Incorrect — placing page-specific components in presentation:**

```text
src/
└── presentation/
    └── components/
        └── admin-page-header.tsx   ← WRONG if only used in one page
```

---

### `app-pages-layer`

**Why it matters:** Pages are grouped by domain inside `src/pages/`. Each page is a self-contained unit with its own components, styles, tests, and logic.

**Correct structure:**

```text
src/
└── pages/
    └── admin/
        └── page-a/
            ├── __tests__/
            ├── components/              # Page-exclusive components
            ├── page-a.tsx               # JSX (HTML)
            ├── page-a.use-controller.ts # Page logic
            ├── page-a.data.ts           # Constants and texts
            ├── page-a.styles.ts         # CSS
            ├── page-a.types.ts          # Types
            └── index.ts                 # Export
```

---

### `app-entities-layer`

**Why it matters:** Entities are pure data structures and interfaces with zero external dependencies. They represent the core business domain and must remain stable and decoupled.

**Correct structure:**

```text
src/
└── entities/
    ├── product.ts          # Pure interface/type
    ├── product-status.ts   # Enum
    └── index.ts
```

**Incorrect:**

```ts
// entities/product.ts
import { useQuery } from "react-query"; // ← WRONG: external dependency in entities
```

---

### `app-infrastructure-layer`

**Why it matters:** Infrastructure contains the implementations of external integrations — HTTP clients, analytics, storage. It is the outermost layer and must never be imported by entities.

**Correct structure:**

```text
src/
└── infrastructure/
    ├── libs/
    │   ├── axios.ts           # Axios instance and config
    │   └── analytics/         # Analytics setup
    └── gateways/
        └── https/
            ├── get-product.ts
            ├── create-product.ts
            └── update-product.ts
```

---

## Category 3: Page Conventions (HIGH)

### `page-file-set`

**Why it matters:** A consistent file set per page ensures predictable structure and reduces cognitive load when navigating pages.

**Required files per page:**

| File                          | Purpose                         |
| ----------------------------- | ------------------------------- |
| `page-name.tsx`               | JSX template (HTML structure)   |
| `page-name.use-controller.ts` | Logic, state, functions, refs   |
| `page-name.data.ts`           | Constants, texts, static data   |
| `page-name.styles.ts`         | Styled components / CSS         |
| `page-name.types.ts`          | Props, return types, interfaces |
| `index.ts`                    | Re-exports the page component   |

---

### `page-colocated-components`

**Why it matters:** Components that are only used on a single page should live inside that page's `components/` folder. This keeps the shared `presentation/components/` folder clean and makes page dependencies explicit.

**Correct:**

```text
src/pages/admin/list/
├── components/
│   └── list-header/
│       ├── list-header.tsx
│       ├── list-header.styles.ts
│       └── index.ts
├── list.tsx
└── index.ts
```

**Incorrect:**

```text
src/presentation/components/
└── list-header/         ← WRONG if only used in the list page
```

---

### `page-colocated-tests`

**Why it matters:** Tests live next to the code they test inside a `__tests__/` folder, making them easy to find and maintain.

**Correct:**

```text
src/pages/admin/list/
├── __tests__/
│   └── list.spec.tsx
├── list.tsx
└── index.ts
```

---

### `page-controller-pattern`

**Why it matters:** Separating logic from JSX keeps components lean and testable. The controller hook encapsulates state management, side effects, and business logic.

**Correct:**

```ts
// page-a.use-controller.ts
export function usePageAController() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    /* ... */
  };

  return { items, loading, fetchItems };
}
```

```tsx
// page-a.tsx
import { usePageAController } from './page-a.use-controller';

export function PageA() {
  const { items, loading, fetchItems } = usePageAController();
  return ( /* JSX only */ );
}
```

**Incorrect — mixing logic into the .tsx file:**

```tsx
// page-a.tsx
export function PageA() {
  const [items, setItems] = useState([]);     // ← WRONG: logic in .tsx
  const [loading, setLoading] = useState(false);
  useEffect(() => { fetch('/api/items') }, []);
  return ( /* JSX */ );
}
```

---

### `page-index-export`

**Why it matters:** The `index.ts` file serves only as a barrel export for the page component, enabling clean imports.

**Correct:**

```ts
// index.ts
export { PageA } from "./page-a";
```

**Incorrect:**

```ts
// index.ts
export { PageA } from "./page-a";
export { usePageAController } from "./page-a.use-controller"; // ← WRONG: controller is internal
export { PageAContainer } from "./page-a-container"; // ← WRONG: multiple exports
```

---

## Category 4: Component Conventions (HIGH)

### `component-file-set`

**Why it matters:** Every component follows the same file set pattern, ensuring consistency across the project.

**Required files per component:**

| File                               | Purpose                      |
| ---------------------------------- | ---------------------------- |
| `component-name.tsx`               | JSX template                 |
| `component-name.use-controller.ts` | Logic, state, refs           |
| `component-name.styles.ts`         | Styled components / CSS      |
| `component-name.data.ts`           | Constants, texts             |
| `component-name.types.ts`          | Props, interfaces, types     |
| `index.ts`                         | Re-exports the JSX component |

Not all files are mandatory for every component — simple components may skip `.data.ts` or `.use-controller.ts` if they have no state or constants.

---

### `component-grouped-by-type`

**Why it matters:** Components are organized in semantic subfolders (forms, buttons, inputs, modals) to make navigation intuitive.

**Correct:**

```text
src/presentation/components/
├── forms/
│   └── segmentation-form/
├── buttons/
│   └── submit-button/
├── inputs/
│   └── search-input/
└── modals/
    └── confirmation-modal/
```

---

### `component-tests`

**Why it matters:** Tests are co-located in a `__tests__/` folder inside the component directory.

**Correct:**

```text
src/presentation/components/forms/segmentation-form/
├── __tests__/
│   └── segmentation-form.spec.tsx
├── segmentation-form.tsx
└── index.ts
```

---

### `component-index-export`

**Why it matters:** The `index.ts` exports only the component, not internal files.

**Correct:**

```ts
// index.ts
export { SegmentationForm } from "./segmentation-form";
```

---

### `component-controller-separation`

**Why it matters:** The `.tsx` file should contain only JSX. All logic (state, refs, effects, callbacks) must be extracted into `*.use-controller.ts`.

**Correct:**

```tsx
// segmentation-form.tsx
import { useSegmentationFormController } from "./segmentation-form.use-controller";

export function SegmentationForm() {
  const { fields, handleSubmit } = useSegmentationFormController();
  return <form onSubmit={handleSubmit}>{/* JSX */}</form>;
}
```

---

## Category 5: Hook Conventions (HIGH)

### `hook-file-set`

**Why it matters:** Hooks follow a predictable file structure.

**Required files per hook:**

| File                     | Purpose              |
| ------------------------ | -------------------- |
| `use-hook-name.tsx`      | Hook logic           |
| `use-hook-name.data.ts`  | Constants, texts     |
| `use-hook-name.types.ts` | Interfaces and types |
| `index.ts`               | Re-exports the hook  |

---

### `hook-tests`

**Correct:**

```text
src/presentation/hooks/use-get-items/
├── __tests__/
│   └── use-get-items.spec.tsx
├── use-get-items.tsx
└── index.ts
```

---

### `hook-index-export`

**Correct:**

```ts
// index.ts
export { useGetItems } from "./use-get-items";
```

---

### `hook-naming`

**Why it matters:** All hook files and folders use the `use-` prefix in kebab-case to be immediately recognizable as React hooks.

**Correct:** `use-get-items/`, `use-get-items.tsx`

**Incorrect:** `getItems/`, `get-items.tsx`, `UseGetItems.tsx`

---

## Category 5: Shared Components (HIGH)

### `lib-components`

**Correct structure:**

```text
src/presentation/components/
├── constants/            # Component enums and constants
├── types/                # Component types
└── components/
    ├── forms/
    ├── buttons/
    ├── inputs/
    ├── modals/
    └── index.ts          # Exports all components
```

---

### `lib-hooks`

**Correct structure:**

```text
src/presentation/hooks/
├── constants/            # Enums and constants used across hooks
├── types/                # Types used across hooks
└── hooks/
    ├── use-get-items/
    ├── use-hook-x/
    └── index.ts          # Exports all hooks
```

---

### `lib-barrel-exports`

**Why it matters:** Component and hook folders have an `index.ts` that re-exports all public symbols, enabling clean imports.

---

## Category 6: Infrastructure & Deployment (MEDIUM)

### `infra-gateways-folder`

**Why it matters:** API adapters use verb-noun kebab-case naming and live in `infrastructure/gateways/https/`.

**Correct:**

```text
infrastructure/gateways/https/
├── get-product.ts
├── create-product.ts
├── update-product.ts
└── delete-product.ts
```

**Incorrect:**

```text
infrastructure/api/ProductService.ts   ← WRONG: not kebab-case, not verb-noun
```

---

### `infra-libs-folder`

**Why it matters:** External library configurations (axios instance, analytics setup) live in `infrastructure/libs/`.

**Correct:**

```text
infrastructure/libs/
├── axios.ts
└── analytics/
    ├── analytics.ts
    └── index.ts
```

---

## Summary Cheat Sheet

```text
src/
├── main/                              # bootstrap.ts, index.ts, routes.ts
├── entities/                          # Pure types/interfaces, no external deps
├── presentation/
│   ├── assets/
│   ├── constants/
│   ├── types/
│   ├── components/                    # Shared components
│   └── hooks/                         # Shared hooks
├── pages/
│   └── {domain}/
│       └── {page-name}/
│           ├── __tests__/
│           ├── components/            # Page-exclusive components
│           ├── {page-name}.tsx
│           ├── {page-name}.use-controller.ts
│           ├── {page-name}.data.ts
│           ├── {page-name}.styles.ts
│           ├── {page-name}.types.ts
│           └── index.ts
└── infrastructure/
    ├── libs/                          # axios.ts, analytics/
    └── gateways/
        └── https/                     # get-x.ts, create-x.ts
```
