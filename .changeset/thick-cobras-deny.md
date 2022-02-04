---
"@khanacademy/wonder-blocks-data": minor
---

useGql method now merges defaultContext and partial context by ignoring values explicitly set to undefined in the partial context. This ensures that that existing default context values are not overridden unless explicitly given a value other than undefined.
