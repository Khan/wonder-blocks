`WithSSRPlaceholder` is a behavioral component, providing a mechanism to hide the rendering of a component from server-side rendering (SSR).

```jsx
const {View} = require("@khanacademy/wonder-blocks-core");

<WithSSRPlaceholder placeholder={() => <View>This gets rendered on server, and also on the client for the very first render (the "rehydration" render)</View>}>
    {() => <View>This is rendered only by the client, for all renders after the rehydration render.</View>}
</WithSSRPlaceholder>
```

This example shows how you can use a `null` placeholder to just display nothing during server-side render.

```jsx
const {View} = require("@khanacademy/wonder-blocks-core");

<WithSSRPlaceholder placeholder={null}>
    {() => <View>This is rendered only by the client, while nothing was rendered on the server.</View>}
</WithSSRPlaceholder>
```

Here, we nest two `WithSSRPlaceholder` components and use an array to track rendering, so that we can see how only the top level `WithSSRPlaceholder` component skips the initial render.

```jsx
const {Body, BodyMonospace} = require("@khanacademy/wonder-blocks-typography");
const {View} = require("@khanacademy/wonder-blocks-core");

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
        nested WithSSRPlaceholder components, which would be a bug.
    </Body>
    <ul id={resultsId}>
    </ul>
    <Body>
        And below this is the actual WithSSRPlaceholder nesting, which should just show the
        child render.
    </Body>
    <WithSSRPlaceholder placeholder={() => <View>{trackAndRender("Root: placeholder")}</View>}>
        {() => {
            addTrackedRender("Root: render");
            return (
                <WithSSRPlaceholder placeholder={() => (
                    <View>
                        {trackAndRender("Child: placeholder (should never see me)")}
                    </View>
                )}>
                    {() => <View>{trackAndRender("Child: render")}</View>}
                </WithSSRPlaceholder>
            );
        }}
    </WithSSRPlaceholder>
</View>
```

In this example, we have side-by-side `WithSSRPlaceholder` components. This demonstrates how component non-nested `WithSSRPlaceholder` components independently track the first render.

```jsx
const {Body, BodyMonospace} = require("@khanacademy/wonder-blocks-typography");
const {View} = require("@khanacademy/wonder-blocks-core");

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
        And below this are the WithSSRPlaceholder component trees, which should just show
        their child renders.
    </Body>
    <WithSSRPlaceholder placeholder={() => <View>{trackAndRender("Root 1: placeholder")}</View>}>
        {() => {
            addTrackedRender("Root 1: render");
            return (
                <WithSSRPlaceholder placeholder={() => (
                    <View>
                        {trackAndRender("Child 1: placeholder (should never see me)")}
                    </View>
                )}>
                    {() => <View>{trackAndRender("Child 1: render")}</View>}
                </WithSSRPlaceholder>
            );
        }}
    </WithSSRPlaceholder>
    <WithSSRPlaceholder placeholder={() => <View>{trackAndRender("Root 2: placeholder")}</View>}>
        {() => {
            addTrackedRender("Root 2: render");
            return (
                <WithSSRPlaceholder placeholder={() => (
                    <View>
                        {trackAndRender("Child 2: placeholder (should never see me)")}
                    </View>
                )}>
                    {() => <View>{trackAndRender("Child 2: render")}</View>}
                </WithSSRPlaceholder>
            );
        }}
    </WithSSRPlaceholder>
</View>
```
