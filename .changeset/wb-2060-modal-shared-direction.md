---
"@khanacademy/wonder-blocks-modal": patch
---

Migrate `DrawerDialog`'s internal direction detection onto the shared `useIsRtl` hook from `wonder-blocks-core`, removing the package's own `useDirectionDetection` hook. No behavior or public API change.
