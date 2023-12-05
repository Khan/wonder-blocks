---
"@khanacademy/wonder-blocks-dropdown": major
---

Allow custom `ActionItem` components by using Cell internally.

- Removed `ClickableBehavior` from `ActionItem` and replaced it with
  `CompactCell` (which internally uses `Clickable`).
- Removed `skipClientNav` from `ActionItem` as it is no longer used/needed.
