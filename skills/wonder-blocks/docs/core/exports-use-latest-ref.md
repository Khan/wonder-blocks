# useLatestRef()

```ts
function useLatestRef<T>(value: T): {readonly current: T};
```

The `useLatestRef` hook returns a ref that always contains the `value` passed
to the hook during the most recent render.

It can be used to wrap a possibly-changing prop in a stable value that can
be passed to `useEffect`'s dependency array. This can be useful when you don't
want the `useEffect` callback to be re-run when the prop changes, but do need
to use the prop's value inside the `useEffect` callback.

## Example

```ts
export function ComponentThatAlertsOnUnmount({message}) {
    const messageRef = useLatestRef(message);
    useEffect(() => {
        return () => alert(messageRef.current);
    }, [messageRef]);
    return <p>Message: {message}</p>;
}
```

The component above will `alert()` a message when it unmounts. (If you want to
imagine a more realistic example, pretend it's sending an analytics event!)
The component always alerts the message it was rendering just before unmount,
even if the message changes during the component's lifespan.

Here it is in action, wrapped in controls that let you change the `message`
prop and unmount/remount the component.

<Example1 />


---

## Related docs

- [Overview](overview.md)
- [Add Style](add-style.md)
- [Exports Use Force Update](exports-use-force-update.md)
- [Exports Use Is Mounted](exports-use-is-mounted.md)
- [Exports Use On Mount Effect](exports-use-on-mount-effect.md)
- [Exports Use Online](exports-use-online.md)
- [Exports Use Pre Hydration Effect](exports-use-pre-hydration-effect.md)
- [Exports Use Render State](exports-use-render-state.md)
- [Id](id.md)
- [Initial Fallback](initial-fallback.md)
- [Server](server.md)
- [View](view.md)
