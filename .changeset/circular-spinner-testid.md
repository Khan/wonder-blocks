---
"@khanacademy/wonder-blocks-progress-spinner": minor
---

`CircularSpinner`: migrated from a class component to a functional component. The `data-testid` attribute now lives on the root wrapping `<div>` rather than the inner `<svg>`, and defaults to `"circular-spinner"` when no `testId` is provided. Also removed the unused `AriaProps` from the public prop type (they were declared but never forwarded to any element).
