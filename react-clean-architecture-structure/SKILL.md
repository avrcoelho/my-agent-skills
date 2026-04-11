---
name: react-clean-architecture-structure
description: Clean Architecture folder structure conventions for React applications. This skill should be used when creating new pages, components, hooks, or any file that must follow the project's strict directory and naming standards. Triggers on tasks involving scaffolding, file creation, code organization, new features, new pages, new components, or architectural questions.
license: MIT
metadata:
  author: avrcoelho
  version: "1.0.0"
---

# Clean Architecture Folder Structure

Comprehensive folder structure and naming conventions for React applications, enforcing Clean Architecture principles. Contains rules across 5 categories covering project layout, app layers, component/hook/page conventions, and deployment structure.

## When to Apply

Reference these guidelines when:

- Creating a new React application from scratch
- Adding a new page, component, or hook to the application
- Creating or updating shared components and utilities
- Scaffolding new files or folders anywhere in the project
- Reviewing code for architectural compliance
- Answering questions about where code should live

## Core Principle

**Code dependencies can only point inward.** Nothing in an inner circle can know anything about an outer circle. This is the most important rule of Clean Architecture.

## Architecture Layers

| Layer                 | Description                                                                                                     |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------- |
| **Main**              | Application initialization files (`index.ts`, `bootstrap.ts`, `routes.ts`).                                     |
| **Presentation (UI)** | Components, pages, and hooks. Utilizes Domain Use Cases and depends on React and UI libraries.                  |
| **Entities**          | Entities (pure data structures) and Interfaces. Must not have external dependencies (e.g., React, data-access). |
| **Infrastructure**    | Output Adapters (Repositories, Gateways). Logic for APIs, axios, react-query, analytics.                        |
| **Shared**            | General-purpose utilities, design system, helpers, and generic hooks that do not violate dependency rules.      |

## Rule Categories

| Priority | Category                    | Impact   | Prefix       |
| -------- | --------------------------- | -------- | ------------ |
| 1        | App Layer Structure         | CRITICAL | `app-`       |
| 2        | Page Conventions            | HIGH     | `page-`      |
| 3        | Component Conventions       | HIGH     | `component-` |
| 4        | Hook Conventions            | HIGH     | `hook-`      |
| 5        | Shared Components           | HIGH     | `lib-`       |
| 6        | Infrastructure & Deployment | MEDIUM   | `infra-`     |

## Quick Reference

### 1. App Layer Structure (CRITICAL)

- `app-main-layer` — The app has `src/main/` with `bootstrap.ts`, `index.ts`, and `routes.ts`
- `app-presentation-layer` — `src/presentation/` holds shared components, hooks, assets, constants, and types
- `app-pages-layer` — `src/pages/` groups pages by domain (e.g., `admin/page-a/`)
- `app-entities-layer` — `src/entities/` holds pure data structures and interfaces with zero external dependencies
- `app-infrastructure-layer` — `src/infrastructure/` holds gateways, HTTP adapters, and external library integrations
- `app-dependency-direction` — Dependencies only point inward; inner layers never import from outer layers

### 2. Page Conventions (HIGH)

- `page-file-set` — Each page folder contains: `page-name.tsx`, `page-name.use-controller.ts`, `page-name.data.ts`, `page-name.styles.ts`, `page-name.types.ts`, `index.ts`
- `page-colocated-components` — If a component is used only on one page, it must live inside that page's `components/` folder
- `page-colocated-tests` — Tests live in a `__tests__/` folder inside the page directory
- `page-controller-pattern` — Page logic (states, functions, refs) is extracted into `*.use-controller.ts`
- `page-index-export` — The `index.ts` file is responsible only for exporting the page JSX component

### 3. Component Conventions (HIGH)

- `component-file-set` — Each component folder contains: `component-name.tsx`, `component-name.use-controller.ts`, `component-name.styles.ts`, `component-name.data.ts`, `component-name.types.ts`, `index.ts`
- `component-grouped-by-type` — Components are organized in semantic subfolders: `forms/`, `buttons/`, `inputs/`, `modals/`, etc.
- `component-tests` — Tests live in a `__tests__/` folder inside the component directory with `.spec.tsx` extension
- `component-index-export` — The `index.ts` file exports only the JSX component
- `component-controller-separation` — Logic (states, refs, side effects) goes in `*.use-controller.ts`, never in the `.tsx` file

### 4. Hook Conventions (HIGH)

- `hook-file-set` — Each hook folder contains: `use-hook-name.tsx`, `use-hook-name.data.ts`, `use-hook-name.types.ts`, `index.ts`
- `hook-tests` — Tests live in a `__tests__/` folder inside the hook directory with `.spec.tsx` extension
- `hook-index-export` — The `index.ts` file exports only the hook function
- `hook-naming` — Hook folders and files always start with `use-` prefix (kebab-case)

### 5. Shared Components (HIGH)

- `lib-components` — `src/presentation/components/` contains grouped subfolders by type (forms, buttons, inputs, modals)
- `lib-hooks` — `src/presentation/hooks/` contains individual hook folders
- `lib-barrel-exports` — Component and hook folders have an `index.ts` that re-exports public symbols

### 6. Infrastructure & Deployment (MEDIUM)

- `infra-gateways-folder` — API adapters live under `src/infrastructure/gateways/https/` with verb-noun naming (e.g., `get-product.ts`, `create-product.ts`)
- `infra-libs-folder` — External library setup (e.g., `axios.ts`, `analytics/`) lives under `src/infrastructure/libs/`

## File Naming Conventions

| Type       | Convention                       | Example                               |
| ---------- | -------------------------------- | ------------------------------------- |
| Component  | kebab-case                       | `segmentation-form.tsx`               |
| Controller | kebab-case + `.use-controller`   | `segmentation-form.use-controller.ts` |
| Styles     | kebab-case + `.styles`           | `segmentation-form.styles.ts`         |
| Data       | kebab-case + `.data`             | `segmentation-form.data.ts`           |
| Types      | kebab-case + `.types`            | `segmentation-form.types.ts`          |
| Hook       | `use-` prefix, kebab-case        | `use-get-items.tsx`                   |
| Gateway    | verb-noun, kebab-case            | `get-product.ts`                      |
| Entity     | PascalCase                       | `Product.ts`                          |
| Test       | same name + `.spec.tsx/.spec.ts` | `segmentation-form.spec.tsx`          |
| Index      | `index.ts`                       | `index.ts`                            |

## How to Use

Read individual rule files for detailed explanations and code examples:

```
rules/app-dependency-direction.md
rules/app-main-layer.md
rules/page-file-set.md
rules/component-file-set.md
rules/hook-file-set.md
rules/lib-components.md
rules/infra-gateways-folder.md
```

Each rule file contains:

- Brief explanation of why it matters
- Incorrect code example with explanation
- Correct code example with explanation
- Additional context

## Full Compiled Document

For the complete guide with all rules expanded: `AGENTS.md`
