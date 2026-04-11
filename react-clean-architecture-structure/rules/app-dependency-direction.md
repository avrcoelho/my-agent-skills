# `app-dependency-direction`

## Rule

Dependencies can only point inward. Nothing in an inner circle can know anything about an outer circle. This is the fundamental rule of Clean Architecture.

## Dependency Flow

```
Main → Presentation → Entities
                   ↘ Infrastructure (implements Entities interfaces)
```

- **Entities** (innermost): Zero external dependencies. Pure types and interfaces.
- **Presentation**: Depends on Entities. Uses React and UI libraries.
- **Infrastructure**: Depends on Entities (implements interfaces). Uses axios, react-query, analytics.
- **Main**: Depends on all layers. Wires everything together.

## Incorrect

```ts
// src/entities/product.ts
import axios from "axios"; // ← WRONG: entity depends on infrastructure lib
import { useQuery } from "react-query"; // ← WRONG: entity depends on presentation lib
```

```ts
// src/presentation/components/button/button.tsx
import { getProduct } from "../../../infrastructure/gateways/https/get-product";
// ← WRONG: component should use hooks/controllers that encapsulate infrastructure
```

## Correct

```ts
// src/entities/product.ts
export interface Product {
  id: string;
  title: string;
  status: ProductStatus;
}

export enum ProductStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}
```

```ts
// src/infrastructure/gateways/https/get-product.ts
import { Product } from "../../../entities/product"; // ✅ infra implements entity interface
import { api } from "../../libs/axios";

export async function getProduct(id: string): Promise<Product> {
  const { data } = await api.get(`/products/${id}`);
  return data;
}
```

## Why It Matters

Violating this rule creates tight coupling between layers, making it impossible to replace infrastructure (e.g., switching from axios to fetch) without modifying business logic. It also breaks testability — entities and presentation should be testable without real HTTP calls.
