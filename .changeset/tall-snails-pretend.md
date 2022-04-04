---
"@khanacademy/wonder-blocks-testing": major
---

Introduced `mockFetch` and expanded `RespondWith` options. `RespondWith` responses will now be real `Response` instances (needs node-fetch peer dependency if no other implementation exists). Breaking changes: `RespondWith.data` is now `RespondWith.graphQLData`.
