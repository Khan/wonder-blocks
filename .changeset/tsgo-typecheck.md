---
---

Tooling only: switch the `typecheck` and `typewatch` scripts to use the TypeScript 7 native compiler (`tsgo`, from `@typescript/native-preview`) for faster type checking. The internal `Text` component was updated to cast its dynamic `tag` to `React.ElementType` instead of suppressing a diagnostic with `@ts-expect-error`, which keeps it passing under both `tsgo` and `tsc`. No published package changes.
