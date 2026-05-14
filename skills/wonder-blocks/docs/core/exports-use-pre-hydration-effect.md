# usePreHydrationEffect()

```ts
function usePreHydrationEffect(
    effect: EffectCallback,
): void);
```

The `usePreHydrationEffect` hook provides means to run some code during the
initial render cycle. It is a drop-in replacement for the `useLayoutEffect` hook except that it does not cause an error during server-side rendering and it only runs once - there are no dependencies to specify.

It is highly recommended that you use `useLayoutEffect` in your components unless you are certain that you need the functionality provided here, you have reliable testing for hydration errors, and you understand the implications of using this hook.

Because it runs pre-hydration, it should never be used for anything that might
change the rendered output or the DOM as that will cause hydration errors. It
should only be used for things like setting up event listeners or other
side-effects that do not affect the rendered output.


---

## Related docs

- [Overview](overview.md)
- [Add Style](add-style.md)
- [Exports Use Force Update](exports-use-force-update.md)
- [Exports Use Is Mounted](exports-use-is-mounted.md)
- [Exports Use Latest Ref](exports-use-latest-ref.md)
- [Exports Use On Mount Effect](exports-use-on-mount-effect.md)
- [Exports Use Online](exports-use-online.md)
- [Exports Use Render State](exports-use-render-state.md)
- [Id](id.md)
- [Initial Fallback](initial-fallback.md)
- [Server](server.md)
- [View](view.md)
