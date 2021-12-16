# @khanacademy/wonder-blocks-core

## 4.2.0

### Minor Changes

-   0aed8723: Adds `throwIfNested` required prop to `RenderStateRoot`.

## 4.1.0

### Minor Changes

-   45588e5f: Fix an issue with `useUniqueIdWithMock`/`useUniqueIdWithoutMock`
    rerender more than was needed. The fix introduces `<RenderStateRoot>`
    which must be an ancestor to all components uses these hooks.
-   875b7893: Nesting of `RenderStateRoot`s inside each other can result in extra renders
    and potentially incorrect behavior. `RenderStateRoot` now throws if it
    appears as a descendent of another `RenderStateRoot`.
