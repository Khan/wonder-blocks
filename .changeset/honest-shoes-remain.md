---
"@khanacademy/wonder-blocks-testing": major
---

Make sure that `MockResponse<TData>` properly enforces `TData` type. This is a breaking change as it affects the usage of the various mocking frameworks, and may result in new type errors in consuming code.
