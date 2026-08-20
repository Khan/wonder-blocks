---
"@khanacademy/wonder-blocks-icon": major
---

`PhosphorIcon` now automatically mirrors directional icons in RTL via a central allowlist, so call sites must stop swapping icons on `isRtl` (or pass `mirrorInRtl` to override per call site) to avoid double-flipping.
