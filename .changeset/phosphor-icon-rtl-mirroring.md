---
"@khanacademy/wonder-blocks-icon": major
---

`PhosphorIcon` now automatically mirrors directional icons (arrows, carets, and similar) in RTL via a central allowlist. Call sites that swap left/right icons based on `isRtl` must pass the LTR-facing icon instead, or they will double-flip in RTL. Use `mirrorInRtl` to override the allowlist per call site: `true` mirrors a custom directional SVG, `false` opts an allowlisted icon out.
