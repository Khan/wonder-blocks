`NoSSR` is a behavioral component, providing a mechanism to hide the rendering of a component from server-side rendering (SSR).

```jsx
<NoSSR placeholder={() => <View>This gets rendered on client and server for the first render call in the component tree</View>}>
    {() => <View>This is rendered only by the client for all but the very first render of the component tree.</View>}
</NoSSR>
```

Here, we nest two `NoSSR` components and use an array to track rendering, so that we can see how only the top level `NoSSR` component skips the initial render.

```jsx
const {Body, BodyMonospace} = require("@khanacademy/wonder-blocks-typography");

const trackingArray = [];
const renderAndTrackText = text => {
    trackingArray.push(text);
    return text;
};

<NoSSR placeholder={() => <View>{renderAndTrackText("Root: placeholder render")}</View>}>
    {() => {
        trackingArray.push("Root: children render");
        return (
            <NoSSR placeholder={() => <View>{renderAndTrackText("Child: placeholder render")}</View>}>
                {() => (
                    // We're not adding to the array here as that would trigger yet another render.
                    <View>
                        <Body key="body">This should output that Root rendered its placeholder, then its children which in turn rendered the child's children. Giving us 3 specific renders.</Body>
                        {trackingArray.map((t,i) => (
                            <BodyMonospace key={i}>{t}</BodyMonospace>
                        ))}
                        <BodyMonospace key="child">Child: children render</BodyMonospace>
                    </View>
                )}
            </NoSSR>
        );
    }}
</NoSSR>
```
