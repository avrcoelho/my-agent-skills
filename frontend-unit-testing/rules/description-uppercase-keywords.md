# description-uppercase-keywords

## Uppercase Keywords

The keywords `GIVEN`, `WHEN`, and `THEN` must always be **UPPERCASE** in test descriptions.

### ❌ Incorrect

```typescript
it('given a label when rendered then shows text', () => { ... });
it('Given a label When rendered Then shows text', () => { ... });
it('GIVEN a label when rendered THEN shows text', () => { ... });  // inconsistent
```

### ✅ Correct

```typescript
it('GIVEN a label WHEN rendered THEN shows text', () => { ... });
```

### Why

Uppercase keywords create visual anchors in test output, making it easy to scan test results and quickly identify the three sections of each test description.
