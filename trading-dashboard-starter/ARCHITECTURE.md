# Architecture overview

## Layering

- `app`: bootstrapping, providers, router, top-level store
- `pages`: route-level composition only
- `widgets`: reusable screen sections
- `features`: business modules with API, hooks, UI, and grid config
- `entities`: shared domain models
- `shared`: generic infrastructure and reusable utilities

## Main flow

1. Feature hook calls feature API
2. Feature API uses shared HTTP client
3. DTO payload is validated with Zod
4. Mapper converts DTO to domain and then to grid row model
5. UI renders typed rows through AG Grid

## Extension pattern

When adding a new module such as `orders` or `risk`:

1. Create `features/orders`
2. Add `api`, `hooks`, `model`, `grid`, and `components`
3. Add a route page in `pages/orders`
4. Compose it through the existing shell

## Campfire integration

The starter uses plain React markup so it runs immediately. Replace shell, buttons, inputs, cards, and layout primitives with Campfire components once you wire in your internal Morgan Stanley packages.
