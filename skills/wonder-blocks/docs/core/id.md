# Id

`Id` is a component that provides an identifier to its children.

It is useful for situations where the `useId` hook cannot be easily used,
such as in class-based components.

If an `id` prop is provided, that is passed through to the children;
otherwise, a unique identifier is generated.

## Usage

```tsx
import {Id} from "@khanacademy/wonder-blocks-core";

<Id id={maybeId}>{(id) => <div id={id}>Hello, world!</div>}</Id>;
```

## Examples

### 1. Generating an id

An identifier will always be generated if an `id` prop is not provided, or the
provided `id` property is falsy.

```tsx
<View>
    <Id>
        {(id) => (
            <View style={{flexDirection: "row"}}>
                <Body>Generated identifier: </Body>
                <Strut size={spacing.xSmall_8} />
                <BodyMonospace>{id}</BodyMonospace>
            </View>
        )}
    </Id>
</View>
```

### 2. Passthrough an id

If an `id` prop is provided and it is truthy, that value will be passed through
to the children.

```tsx
<View>
    <Id id="my-identifier">
        {(id) => (
            <View style={{flexDirection: "row"}}>
                <Body>Passed through identifier: </Body>
                <Strut size={spacing.xSmall_8} />
                <BodyMonospace>{id}</BodyMonospace>
            </View>
        )}
    </Id>
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
- [Initial Fallback](initial-fallback.md)
- [Server](server.md)
- [View](view.md)
