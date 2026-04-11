# `infra-gateways-folder`

## Rule

API adapters (HTTP gateway functions) must live under `src/infrastructure/gateways/https/` and use verb-noun kebab-case naming.

## Correct

```text
src/infrastructure/gateways/https/
├── get-product.ts
├── create-product.ts
├── update-product.ts
└── delete-product.ts
```

```ts
// get-product.ts
import { Product } from "../../../entities/product";
import { api } from "../../libs/axios";

export async function getProduct(id: string): Promise<Product> {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
}
```

## Incorrect

```text
src/infrastructure/
└── api/
    └── ProductService.ts    ← WRONG: class-based, PascalCase, wrong folder
```

```text
src/services/
└── product-service.ts        ← WRONG: "services" folder, not under infrastructure/gateways/https/
```

```ts
// ProductService.ts
export class ProductService {
  // ← WRONG: class-based approach
  static async get(id: string) {}
  static async create(data: any) {}
}
```

## Why It Matters

Verb-noun naming (`get-product`, `create-product`) makes the function's purpose immediately clear from the file name. Placing all HTTP adapters under `gateways/https/` enforces the Clean Architecture boundary — infrastructure is isolated from business logic and easily replaceable.
