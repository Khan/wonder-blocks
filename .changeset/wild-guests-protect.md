---
"@khanacademy/wonder-blocks-core": patch
---

Change the return type of `useLatestRef` from `RefObject<T>` to
`{readonly current: T}`, so the `current` property is not nullable.

This fixes a bug introduced by the migration to TypeScript.
