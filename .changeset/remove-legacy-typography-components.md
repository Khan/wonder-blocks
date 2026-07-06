---
"@khanacademy/wonder-blocks-typography": major
---

Remove the deprecated legacy typography components. `Title`, `HeadingLarge`, `HeadingMedium`, `HeadingSmall`, `HeadingXSmall`, `Tagline`, `Body`, `BodySerif`, `BodySerifBlock`, `LabelLarge`, `LabelMedium`, `LabelSmall`, `LabelXSmall`, `Caption`, and `Footnote` have been removed. Use `Heading` (with the appropriate `size`/`weight`) and `BodyText` instead, per the typography conversion guide. `BodyText`, `Heading`, and `BodyMonospace` remain. The exported `Typography` type now resolves to the surviving components, and the `Label` union type has been removed.
