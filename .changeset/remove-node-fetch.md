---
"@khanacademy/wonder-blocks-testing-core": minor
"@khanacademy/wonder-blocks-testing": minor
---

Remove the `node-fetch` peer dependency. The mock response machinery now uses the built-in Fetch API `Response` (available in Node 18+ and in test environments that provide a Fetch polyfill). `RespondWith.text` no longer includes a body when the mocked status code forbids one (204, 205, 304), matching the Fetch spec.
