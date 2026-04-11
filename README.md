# My Skills

A collection of AI agent skills and coding conventions for building high-quality software across frontend, backend, and full-stack applications. This repository includes best practices for Clean Architecture principles, robust testing practices, and technology-specific conventions.

## 📚 Skills Overview

This repository contains reusable skills for AI coding assistants (GitHub Copilot, Cursor, etc.) that enforce best practices and conventions across different technologies and domains.

### Frontend Skills

#### ⚛️ [react-clean-architecture-structure](.agents/skills/react-clean-architecture-structure/)

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

#### 🔧 [react-component-generator](.agents/skills/react-component-generator/)

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

#### 🧪 [frontend-unit-testing](.agents/skills/frontend-unit-testing/)

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

### Backend Skills

_Coming soon: Skills for backend development, API design, database patterns, and more._

### Other Skills

_Coming soon: Additional skills for DevOps, testing strategies, architecture patterns, and cross-cutting concerns._

## 🚀 How to Use

This repository is structured to work with **any AI coding assistant** that supports custom skills:

### Multi-Agent Compatibility

The skills are organized with symlinks to support multiple agent systems:

- **`.agents/skills/`** - Canonical location (works with most generic agents)
- **`.github/skills/`** - GitHub Copilot integration ↗️ symlink to `.agents/skills/`
- **`.claude/skills/`** - Claude/Anthropic integration ↗️ symlink to `.agents/skills/`

This means the repository works seamlessly with:

- ✅ **GitHub Copilot** - Reads from `.github/skills/`
- ✅ **Cursor** - Supports `.agents/skills/` and `.github/skills/`
- ✅ **Claude Projects** - Reads from `.claude/skills/`
- ✅ **Any other agent** - Falls back to `.agents/skills/`

### In Your Project

You can reference these skills in several ways:

```markdown
# In your .instructions.md or similar configuration

Follow the conventions in ../my-skills/.agents/skills/react-clean-architecture-structure/
Follow the testing conventions in ../my-skills/.agents/skills/frontend-unit-testing/
Use ../my-skills/.agents/skills/react-component-generator/ to scaffold new React artifacts
```

Or directly reference rule files:

```markdown
When creating components, follow:

- ../my-skills/.agents/skills/react-clean-architecture-structure/references/component-file-set.md
- ../my-skills/.agents/skills/react-clean-architecture-structure/references/page-file-set.md
```

## 📂 Repository Structure

```
my-skills/
├── .agents/skills/           # Canonical skills location
│   ├── frontend-unit-testing/
│   │   ├── SKILL.md          # Testing standards overview
│   │   ├── AGENTS.md         # Complete testing guide
│   │   └── references/       # Individual testing rules (renamed from rules/)
│   ├── react-clean-architecture-structure/
│   │   ├── SKILL.md          # Skill overview and quick reference
│   │   ├── AGENTS.md         # Full compiled documentation
│   │   └── references/       # Individual rule definitions (renamed from rules/)
│   └── react-component-generator/
│       └── SKILL.md          # Component/page/hook generator
├── .github/skills/           # Symlink to .agents/skills/ (GitHub Copilot)
├── .claude/skills/           # Symlink to .agents/skills/ (Claude)
└── README.md                 # This file
```

**Note:** The `.github/skills/` and `.claude/skills/` directories are symbolic links to `.agents/skills/`, ensuring all agents can access the same skills without duplication.

## 🎯 Rule Categories

### Frontend - Clean Architecture Skills (React)

- **App Layer Structure** (CRITICAL) - Core architectural layers and boundaries
- **Page Conventions** (HIGH) - Page organization and file patterns
- **Component Conventions** (HIGH) - Component structure and naming
- **Hook Conventions** (HIGH) - Custom hooks organization
- **Shared Components** (HIGH) - Reusable component libraries
- **Infrastructure** (MEDIUM) - Gateway and external integrations

### Frontend - Testing Skills

- **File Location & Naming** (CRITICAL) - Where tests live and how they're named
- **Test Structure** (HIGH) - Organization of test suites
- **Test Descriptions** (HIGH) - Consistent test naming patterns
- **Implementation Patterns** (MEDIUM) - Best practices for writing tests

### Backend & Other Skills

_Coming soon: Rule categories for backend development, DevOps, and other domains._

## ✨ Key Principles

This repository emphasizes best practices across different domains. Below are the core principles for the current skills:

### Frontend Development

#### Clean Architecture (React)

- **Dependency Rule**: Code dependencies can only point inward
- **Layer Separation**: Clear boundaries between Main, Presentation, Entities, Infrastructure, and Shared
- **Controller Pattern**: Logic extracted from JSX components into dedicated controllers
- **Colocated Tests**: Tests live next to the code they test

#### Testing (Frontend)

- **User-Centric**: Tests focus on user behavior, not implementation details
- **Readable**: GIVEN/WHEN/THEN pattern makes test intent crystal clear
- **Consistent**: Standardized file structure and naming across all tests
- **Maintainable**: Single flat describe block prevents deep nesting

#### Component Generation (React)

- **Complete Scaffolding**: Generate all required files in one go (tsx, controller, types, styles, data, tests)
- **Convention Enforcement**: Automatically applies kebab-case naming and proper file suffixes
- **Boilerplate Included**: Pre-filled imports, exports, and common patterns
- **Test-Ready**: Generated components include test files with proper structure

### Backend Development

_Coming soon: Principles for API design, data persistence, security, and more._

### Cross-Cutting Concerns

_Coming soon: Principles for logging, error handling, configuration management, and other shared concerns._

## 👤 Author

**André Coelho** ([@avrcoelho](https://github.com/avrcoelho))

## 📄 License

MIT - See individual skill directories for specific license information.

## 🤝 Contributing

These are personal skills and conventions. Feel free to fork and adapt them to your own preferences and project needs.

---

_Last updated: April 11, 2026_
