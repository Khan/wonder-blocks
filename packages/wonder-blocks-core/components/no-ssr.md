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
const resultsId = "nossr-example-2-results";
const newLi = text => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(text));
    return li;
}

const addTrackedRender = text => {
    const el = document.getElementById(resultsId);
    if (el) {
        for (let i = 0; i < trackingArray.length; i++) {
            el.append(newLi(trackingArray[i]));
        }
        trackingArray.length = 0;
        el.append(newLi(text));
    } else {
        // We may not have rendered the results element yet, so if we haven't
        // use an array to keep track of the things until we have.
        trackingArray.push(text);
    }
};

const trackAndRender = text => {
    addTrackedRender(text);
    return text;
};

<View>
    <Body>
        The list below should have three render entries; root placeholder,
        root children render, and child children render. If there are two child
        renders that means that the second forced render is still occurring for
        nested NoSSR components, which would be a bug.
    </Body>
    <ul id={resultsId}>
    </ul>
    <Body>
        And below this is the actual NoSSR nesting, which should just show the
        child render.
    </Body>
    <NoSSR placeholder={() => <View>{trackAndRender("Root: placeholder")}</View>}>
        {() => {
            addTrackedRender("Root: render");
            return (
                <NoSSR placeholder={() => (
                    <View>
                        {trackAndRender("Child: placeholder (should never see me)")}
                    </View>
                )}>
                    {() => <View>{trackAndRender("Child: render")}</View>}
                </NoSSR>
            );
        }}
    </NoSSR>
</View>
```

In this example, we have side-by-side `NoSSR` components. This demonstrates how component non-nested `NoSSR` components independently track the first render.

```jsx
const {Body, BodyMonospace} = require("@khanacademy/wonder-blocks-typography");

const trackingArray = [];
const resultsId = "nossr-example-3-results";
const newLi = text => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(text));
    return li;
}

const addTrackedRender = text => {
    const el = document.getElementById(resultsId);
    if (el) {
        for (let i = 0; i < trackingArray.length; i++) {
            el.append(newLi(trackingArray[i]));
        }
        trackingArray.length = 0;
        el.append(newLi(text));
    } else {
        // We may not have rendered the results element yet, so if we haven't
        // use an array to keep track of the things until we have.
        trackingArray.push(text);
    }
};

const trackAndRender = text => {
    addTrackedRender(text);
    return text;
};

<View>
    <Body>
        The list below should have six render entries; 2 x root placeholder,
        2 x root children render, and 2 x child children render.
    </Body>
    <ul id={resultsId}>
    </ul>
    <Body>
        And below this are the NoSSR component trees, which should just show
        their child renders.
    </Body>
    <NoSSR placeholder={() => <View>{trackAndRender("Root 1: placeholder")}</View>}>
        {() => {
            addTrackedRender("Root 1: render");
            return (
                <NoSSR placeholder={() => (
                    <View>
                        {trackAndRender("Child 1: placeholder (should never see me)")}
                    </View>
                )}>
                    {() => <View>{trackAndRender("Child 1: render")}</View>}
                </NoSSR>
            );
        }}
    </NoSSR>
    <NoSSR placeholder={() => <View>{trackAndRender("Root 2: placeholder")}</View>}>
        {() => {
            addTrackedRender("Root 2: render");
            return (
                <NoSSR placeholder={() => (
                    <View>
                        {trackAndRender("Child 2: placeholder (should never see me)")}
                    </View>
                )}>
                    {() => <View>{trackAndRender("Child 2: render")}</View>}
                </NoSSR>
            );
        }}
    </NoSSR>
</View>
```
