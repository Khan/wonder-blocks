The `UniqueIDProvider` component is how Wonder Blocks components obtain unique identifiers. This component ensures that server-side rendering and initial client rendering match while allowing the provision of unique identifiers for the client. It does this by not guaranteeing unique identifiers for the initial render, but instead allowing for a placeholder to be rendered in place of the real content, or for non-unique values to be provided as identifiers.

In all but the first render, the children are rendered with the same `IIdentifierFactory` instance, ensuring that the same calls will return the same identifiers.

### mockOnFirstRender absent or false

When no `mockOnFirstRender` is `false` (the default), the `children` prop is only called after the initial render. Each call provides the same identifier factory, meaning the same identifier gets returned. Try it below.

```jsx
const {Body, HeadingSmall} = require("@khanacademy/wonder-blocks-typography");
const {Spring, Strut} = require("@khanacademy/wonder-blocks-layout");
const Button = require("@khanacademy/wonder-blocks-button").default;

let providerRef = null;

const renders = [];
const provider = (
    <UniqueIDProvider ref={ref => providerRef = ref}>
        {ids => {
            renders.push(ids.id("my-unique-id"));
            return (
                <View>
                    {renders.map((id,i) => (
                        <Body key={i}>Render {i}: {id}</Body>
                    ))}
                </View>
            );
        }}
    </UniqueIDProvider>
);

const onClick = () => {
    if (providerRef) {
        providerRef.forceUpdate();
    }
};

<View>
    <View style={{flexDirection: "row"}}><Button onClick={onClick}>Click Me to Rerender</Button><Spring /></View>
    <Strut size={16} />
    <HeadingSmall>The UniqueIDProvider:</HeadingSmall>
    {provider}
</View>
```

### mockOnFirstRender is true

When specifying `mockOnFirstRender` to be `true`, the first render will use a mock identifier factory that doesn't guarantee identifier uniqueness.

```jsx
const {Body, HeadingSmall} = require("@khanacademy/wonder-blocks-typography");
const {Spring, Strut} = require("@khanacademy/wonder-blocks-layout");

let firstId = null;

const children = (idf) => {
    const id = idf.id("an-id");
    firstId = firstId || id;
    return (
        <View>
            <HeadingSmall>The initial render ID:</HeadingSmall>
            {firstId}
            <Strut size={16} />
            <HeadingSmall>Subsequent ID:</HeadingSmall>
            {id}
        </View>
    );
};

<UniqueIDProvider mockOnFirstRender={true}>
    {children}
</UniqueIDProvider>
```

### Scoped

`UniqueIDProvider` ensures every identifier factory is unique using a unique number for each one. However, this isn't very readable when wanting to differentiate the types of things using unique identifiers. If we want to, we can provide a `scope` prop that adds some text to each identifier provided. This can be useful for providing some quick at-a-glance component identification to identifiers when there are multiple providers.

```jsx
const {Body, HeadingSmall, BodyMonospace} = require("@khanacademy/wonder-blocks-typography");
const {Spring, Strut} = require("@khanacademy/wonder-blocks-layout");

const children = ({id}) => (
    <View>
        <Body>
            The id returned for "my-identifier": {id("my-identifier")}
        </Body>
    </View>
);

<View>
    <HeadingSmall>First Provider with scope: first</HeadingSmall>
    <UniqueIDProvider scope="first">
        {children}
    </UniqueIDProvider>
    <HeadingSmall>Second Provider with scope: second</HeadingSmall>
    <UniqueIDProvider scope="second">
        {children}
    </UniqueIDProvider>
</View>
```