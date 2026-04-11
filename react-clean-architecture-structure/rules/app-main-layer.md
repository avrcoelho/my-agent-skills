# `app-main-layer`

## Rule

The app must have a `src/main/` folder containing exactly the application initialization files: `bootstrap.ts`, `index.ts`, and `routes.ts`.

## Correct

```text
src/
└── main/
    ├── bootstrap.ts    # App bootstrap and mount logic
    ├── index.ts        # Entry point (imports bootstrap)
    └── routes.ts       # Route definitions
```

## Incorrect

```text
src/
└── main/
    ├── bootstrap.ts
    ├── index.ts
    ├── routes.ts
    └── AdminPage.tsx    ← WRONG: page component does not belong in main/
```

```text
src/
├── bootstrap.ts         ← WRONG: not inside main/ folder
├── index.ts
└── routes.ts
```

## Why It Matters

The `main/` layer is the composition root of the application. Keeping it minimal and focused on bootstrapping prevents tight coupling and makes it easy to understand how the app starts.
