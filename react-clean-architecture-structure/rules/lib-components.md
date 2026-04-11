# `lib-components`

## Rule

The shared components (`src/presentation/components/`) must follow a strict folder structure with components grouped by semantic type (forms, buttons, inputs, modals).

## Correct Structure

```text
src/presentation/components/
├── constants/            # Component enums and constants
├── types/                # Component types shared across components
└── components/
    ├── forms/
    │   └── segmentation-form/
    │       ├── __tests__/
    │       │   └── segmentation-form.spec.tsx
    │       ├── segmentation-form.tsx
    │       ├── segmentation-form.use-controller.ts
    │       ├── segmentation-form.styles.ts
    │       ├── segmentation-form.data.ts
    │       ├── segmentation-form.types.ts
    │       └── index.ts
    ├── buttons/
    │   └── submit-button/
    ├── inputs/
    │   └── search-input/
    ├── modals/
    │   └── confirmation-modal/
    └── index.ts          # Exports all components
```

## Incorrect

```text
src/presentation/components/
├── SegmentationForm.tsx          ← WRONG: flat structure, PascalCase
├── SubmitButton.tsx              ← WRONG: no grouping by type
└── SearchInput.tsx               ← WRONG: no individual folders
```

```text
src/presentation/components/
├── segmentation-form.tsx         ← WRONG: no folder per component
├── submit-button.tsx
└── search-input.tsx
```

## Why It Matters

Grouping components by semantic type makes it intuitive to find and organize UI elements. Each component in its own folder with the standard file set ensures it is self-contained, testable, and follows the project conventions consistently.
