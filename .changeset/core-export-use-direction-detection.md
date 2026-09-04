---
"@khanacademy/wonder-blocks-core": minor
"@khanacademy/wonder-blocks-modal": patch
---

Move `useDirectionDetection` from `wonder-blocks-modal` (internal-only) to `wonder-blocks-core` and export it publicly, so other packages can detect the nearest ancestor's writing direction (RTL/LTR) without depending on `wonder-blocks-modal`. `wonder-blocks-modal`'s own usage (`DrawerDialog`) now imports it from `wonder-blocks-core`; no change to `wonder-blocks-modal`'s public API.
