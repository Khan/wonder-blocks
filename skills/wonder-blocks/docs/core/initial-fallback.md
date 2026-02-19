# InitialFallback

> Package: `@khanacademy/wonder-blocks-core`

---

## Default

---

## Without Placeholder

This example shows how you can use a `null` placeholder to display nothing during server-side render.

```tsx
<InitialFallback fallback={null}>
    {() => (
        <View>
            This is rendered only by the client, while nothing was rendered
            on the server.
        </View>
    )}
</InitialFallback>
```

---

## Nested Component

Here, we nest two `InitialFallback` components and use an array to track rendering, so that we can see how only the top level `InitialFallback` component skips the initial render.

```tsx
<View>
    <Body>
        The list below should have three render entries; root
        placeholder, root children render, and child children render. If
        there are two child renders that means that the second forced
        render is still occurring for nested InitialFallback components,
        which would be a bug.
    </Body>
    <ul id={resultsId} />
    <Body>
        And below this is the actual InitialFallback nesting, which
        should just show the child render.
    </Body>
    <InitialFallback
        fallback={() => (
            <View>{trackAndRender("Root: placeholder")}</View>
        )}
    >
        {() => {
            addTrackedRender("Root: render");
            return (
                <InitialFallback
                    fallback={() => (
                        <View>
                            {trackAndRender(
                                "Child: placeholder (should never see me)",
                            )}
                        </View>
                    )}
                >
                    {() => (
                        <View>{trackAndRender("Child: render")}</View>
                    )}
                </InitialFallback>
            );
        }}
    </InitialFallback>
</View>
```

---

## Side By Side

In this example, we have side-by-side `InitialFallback` components. This demonstrates how component non-nested `InitialFallback` components independently track the first render.

```tsx
<View>
    <Body>
        The list below should have six render entries; 2 x root
        placeholder, 2 x root children render, and 2 x child children
        render.
    </Body>
    <ul id={resultsId} />
    <Body>
        And below this are the InitialFallback component trees, which
        should just show their child renders.
    </Body>
    <InitialFallback
        fallback={() => (
            <View>{trackAndRender("Root 1: placeholder")}</View>
        )}
    >
        {() => {
            addTrackedRender("Root 1: render");
            return (
                <InitialFallback
                    fallback={() => (
                        <View>
                            {trackAndRender(
                                "Child 1: placeholder (should never see me)",
                            )}
                        </View>
                    )}
                >
                    {() => (
                        <View>{trackAndRender("Child 1: render")}</View>
                    )}
                </InitialFallback>
            );
        }}
    </InitialFallback>
    <InitialFallback
        fallback={() => (
            <View>{trackAndRender("Root 2: placeholder")}</View>
        )}
    >
        {() => {
            addTrackedRender("Root 2: render");
            return (
                <InitialFallback
                    fallback={() => (
                        <View>
                            {trackAndRender(
                                "Child 2: placeholder (should never see me)",
                            )}
                        </View>
                    )}
                >
                    {() => (
                        <View>{trackAndRender("Child 2: render")}</View>
                    )}
                </InitialFallback>
            );
        }}
    </InitialFallback>
</View>
```



---

## Related docs

- [Overview](overview.md)
- [Add Style](add-style.md)
- [Exports Use Force Update](exports-use-force-update.md)
- [Exports Use Is Mounted](exports-use-is-mounted.md)
- [Exports Use Latest Ref](exports-use-latest-ref.md)
- [Exports Use On Mount Effect](exports-use-on-mount-effect.md)
- [Exports Use Online](exports-use-online.md)
- [Exports Use Pre Hydration Effect](exports-use-pre-hydration-effect.md)
- [Exports Use Render State](exports-use-render-state.md)
- [Id](id.md)
- [Server](server.md)
- [View](view.md)
