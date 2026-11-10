---
"@khanacademy/wonder-blocks-modal": patch
---

FlexibleDialog: Stop injecting a `testId` prop into the `title` element. This prevents React warnings when `title` is a native DOM element (e.g. `<h1>`).
