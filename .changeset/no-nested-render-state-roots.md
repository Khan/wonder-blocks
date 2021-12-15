---
"@khanacademy/wonder-blocks-core": minor
---

Nesting of `RenderStateRoot`s inside each other can result in extra renders
and potentially incorrect behavior.  `RenderStateRoot` now throws if it
appears as a descendent of another `RenderStateRoot`.
