---
"@khanacademy/wonder-blocks-tokens": major
---

Remove the `font.body.lineHeight.large` token. This token was originally added to provide backwards compatibility with the default theme while building the ThunderBlocks theme. Now that typography uses the new `Heading` and `BodyText` components (which reference the correct tokens), this token is no longer needed.
