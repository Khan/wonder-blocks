---
---

Tooling only: switch the `typecheck`, `typewatch`, and `build:types` scripts to use the TypeScript 7 native compiler (`tsgo`, from `@typescript/native-preview`) for faster type checking and declaration emit. The internal `Text` component was updated to cast its dynamic `tag` to `React.ElementType` instead of suppressing a diagnostic with `@ts-expect-error`, which keeps it passing under both `tsgo` and `tsc`. The emitted `.d.ts` files are semantically identical to the previous `tsc` output (differences are limited to cosmetic member ordering and redundant `| undefined` cleanup). No published API changes.
