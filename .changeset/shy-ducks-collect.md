---
"eslint-plugin-wonder-blocks-demo": minor
"@khanacademy/eslint-plugin-wonder-blocks": minor
---

Add two new ESLint rules for BodyText HTML validity and complexity

- `no-invalid-bodytext-children` (recommended): flags block-level elements inside a phrasing-content BodyText. Accounts for BodyText's `tag` prop and View's `tag` prop — `<View tag="span">` is valid inside BodyText, `<BodyText tag="div">` allows block children.
- `no-excessive-bodytext-children` (strict): flags BodyText with more direct JSX element children than a configurable threshold (default: 5). Separated from the validity rule so severity and options can be configured independently.
