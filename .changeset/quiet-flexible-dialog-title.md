---
"@khanacademy/wonder-blocks-modal": patch
---

FlexibleDialog: Stop injecting a hardcoded `testId` (`"title-heading-wrapper"`) into the `title` element. This prevents React warnings when `title` is a native DOM element (e.g. `<h1>`). The hardcoded test id isn't needed internally; if you need a test id on the title, pass it directly to the component you provide for the `title` prop (e.g. `title={<Heading testId="my-title">...</Heading>}`).
