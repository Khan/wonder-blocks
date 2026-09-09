---
"@khanacademy/wonder-blocks-data": minor
---

Add `ErrorResultGqlError`, a typed `GqlError` thrown when a GraphQL response reports errors, exposing `statusCode` and the parsed `result` payload (partial `data` plus `errors`) so consumers can use partial results without type suppression. Also adds the `isErrorResultGqlError` type guard and the `GqlPartialData`, `GqlResponseError`, and `GqlErrorResultPayload` types.
