---
"@khanacademy/wonder-blocks-tokens": minor
---

Soft-deprecate the `spacing` primitive token in favor of `sizing`. Editors
will now show deprecation warnings on `spacing`, `VALID_PRIMARY_SPACING`,
`VALID_SECONDARY_SPACING`, and `VALID_SPACING`. No runtime or visual changes
— each `spacing.<name>` value still maps 1:1 to a `sizing.size_<n>` token. A
codemod is available at `wb-codemod/transforms/migrate-spacing-to-sizing.ts`
to help migrate consumers; run it with
`npx @khanacademy/wb-codemod -t migrate-spacing-to-sizing <paths>`.
