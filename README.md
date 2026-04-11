# My Skills

A collection of AI agent skills and coding conventions for building high-quality React applications with Clean Architecture principles and robust testing practices.

## 📚 Skills Overview

This repository contains reusable skills for AI coding assistants (GitHub Copilot, Cursor, etc.) that enforce best practices and conventions for React development.

### Available Skills

#### ⚛️ [react-clean-architecture-structure](react-clean-architecture-structure/)

**Clean Architecture folder structure conventions for React applications**

Comprehensive folder structure and naming conventions that enforce Clean Architecture principles. This skill guides file organization across multiple layers including Main, Presentation, Entities, Infrastructure, and Shared components.

**Use this skill when:**

- Building React applications following Clean Architecture
- Creating or updating shared components and utilities
- Answering architectural questions specific to React
- Organizing React components, hooks, and pages

**Key conventions:**

- React component organization patterns
- Hook naming and structure conventions
- Page-level architecture patterns
- Colocated components and tests

#### 🔧 [react-component-generator](react-component-generator/)

**Automated generator for React components, pages, and hooks**

Generate complete React artifacts with proper Clean Architecture file structure. Creates all required files with boilerplate code, controller separation, type definitions, and unit tests. Supports components, pages, and hooks.

**Use this skill when:**

- Creating a new React component with proper file structure
- Scaffolding a new page following page conventions
- Generating a custom React hook with all required files
- Bootstrapping any React artifact that requires Clean Architecture compliance

**Key features:**

- Complete file structures (tsx, controller, types, data, styles, tests)
- Automatic naming convention enforcement (kebab-case)
- Boilerplate with imports and exports
- GIVEN/WHEN/THEN test structure
- Controller pattern for logic separation

#### 🧪 [frontend-unit-testing](frontend-unit-testing/)

**Frontend unit testing standards using Jest and React Testing Library**

Comprehensive testing conventions for React components and TypeScript functions. Ensures consistency across all test files with clear patterns for file organization, test structure, and implementation.

**Use this skill when:**

- Writing new unit tests for React components
- Reviewing existing test files
- Refactoring or updating test suites
- Generating test boilerplate

**Key conventions:**

- File naming: `.spec.tsx` for components, `.spec.ts` for functions
- Test structure: Single flat `describe` block with path-based naming
- Test descriptions: GIVEN / WHEN / THEN pattern (uppercase keywords)
- Implementation: `screen` queries, user-centric selectors, `userEvent` over `fireEvent`

## 🚀 How to Use

These skills are designed to be used with AI coding assistants that support custom skills/agents:

1. **GitHub Copilot**: Reference the skill in your chat or instructions
2. **Cursor**: Import skills into your project's `.cursorrules` or reference them
3. **Other AI tools**: Use the `SKILL.md` files as context or reference documentation

### In Your Project

You can reference these skills in several ways:

```markdown
# In your .instructions.md or similar configuration

Follow the conventions in ../my-skills/react-clean-architecture-structure/
Follow the testing conventions in ../my-skills/frontend-unit-testing/
Use ../my-skills/react-component-generator/ to scaffold new React artifacts
```

Or directly reference rule files:

```markdown
When creating components, follow:

- ../my-skills/react-clean-architecture-structure/rules/component-file-set.md
- ../my-skills/react-clean-architecture-structure/rules/page-file-set.md
```

## 📂 Repository Structure

```
my-skills/
├── react-clean-architecture-structure/
│   ├── SKILL.md              # Skill overview and quick reference
│   ├── AGENTS.md             # Full compiled documentation
│   └── rules/                # Individual rule definitions
├── react-component-generator/
│   └── SKILL.md              # Component/page/hook generator
└── frontend-unit-testing/
    ├── SKILL.md              # Testing standards overview
    ├── AGENTS.md             # Complete testing guide
    └── rules/                # Individual testing rules
```

## 🎯 Rule Categories

### Clean Architecture Skills

- **App Layer Structure** (CRITICAL) - Core architectural layers and boundaries
- **Page Conventions** (HIGH) - Page organization and file patterns
- **Component Conventions** (HIGH) - Component structure and naming
- **Hook Conventions** (HIGH) - Custom hooks organization
- **Shared Components** (HIGH) - Reusable component libraries
- **Infrastructure** (MEDIUM) - Gateway and external integrations

### Testing Skill

- **File Location & Naming** (CRITICAL) - Where tests live and how they're named
- **Test Structure** (HIGH) - Organization of test suites
- **Test Descriptions** (HIGH) - Consistent test naming patterns
- **Implementation Patterns** (MEDIUM) - Best practices for writing tests

## ✨ Key Principles

### Clean Architecture

- **Dependency Rule**: Code dependencies can only point inward
- **Layer Separation**: Clear boundaries between Main, Presentation, Entities, Infrastructure, and Shared
- **Controller Pattern**: Logic extracted from JSX components into dedicated controllers
- **Colocated Tests**: Tests live next to the code they test

### Testing

- **User-Centric**: Tests focus on user behavior, not implementation details
- **Readable**: GIVEN/WHEN/THEN pattern makes test intent crystal clear
- **Consistent**: Standardized file structure and naming across all tests
- **Maintainable**: Single flat describe block prevents deep nesting

### Component Generation

- **Complete Scaffolding**: Generate all required files in one go (tsx, controller, types, styles, data, tests)
- **Convention Enforcement**: Automatically applies kebab-case naming and proper file suffixes
- **Boilerplate Included**: Pre-filled imports, exports, and common patterns
- **Test-Ready**: Generated components include test files with proper structure

## 👤 Author

**André Coelho** ([@avrcoelho](https://github.com/avrcoelho))

## 📄 License

MIT - See individual skill directories for specific license information.

## 🤝 Contributing

These are personal skills and conventions. Feel free to fork and adapt them to your own preferences and project needs.

---

_Last updated: April 11, 2026_
