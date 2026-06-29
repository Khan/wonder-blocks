---
"@khanacademy/wonder-blocks-testing-core": patch
---

Router test harness adapter: make the context-mode `location` and `initialEntries` config options mutually exclusive at the type level. Previously this exclusivity relied on union excess-property checking, which TypeScript 6.0 relaxed; it is now enforced structurally with `never` guards (mirroring the existing data-routes guards) so combining the two shapes is a hard type error under both TypeScript 5.7 and 6.0.
