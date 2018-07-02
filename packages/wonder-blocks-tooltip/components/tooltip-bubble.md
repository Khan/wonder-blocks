This is an internal component that we use to render the stuff that appears when a tooltip shows.

Note that without explicit positioning, the tail will not be centered.

### Placement top

```jsx
const {View} = require("@khanacademy/wonder-blocks-core");

<View>
    <TooltipBubble placement="top" style={{position: "relative"}}>
        <TooltipContent>I'm on the top!</TooltipContent>
    </TooltipBubble>
</View>
```

### Placement right

```jsx
const {View} = require("@khanacademy/wonder-blocks-core");

<View style={{alignItems: "flex-start"}}>
    <TooltipBubble placement="right" style={{position: "relative"}}>
        <TooltipContent>I'm on the right!</TooltipContent>
    </TooltipBubble>
</View>
```

### Placement bottom

```jsx
const {View} = require("@khanacademy/wonder-blocks-core");

<View>
    <TooltipBubble placement="bottom" style={{position: "relative"}}>
        <TooltipContent>I'm on the bottom!</TooltipContent>
    </TooltipBubble>
</View>
```

### Placement left

```jsx
const {View} = require("@khanacademy/wonder-blocks-core");

<View>
    <TooltipBubble placement="left" style={{position: "relative"}}>
        <TooltipContent>I'm on the left!</TooltipContent>
    </TooltipBubble>
</View>
```

### Positioning the tail
Here we tell the tail that it's lefthand side is at 50px.

```jsx
const {View} = require("@khanacademy/wonder-blocks-core");
const Spacing = require("@khanacademy/wonder-blocks-spacing");

<View>
    <TooltipBubble
        placement="bottom"
        tailOffset={{left: 50, top: 0}}
        style={{position: "relative"}}
    >
        <TooltipContent>I'm on the bottom with a tail 50px in!</TooltipContent>
    </TooltipBubble>
</View>
```

### Hidden because outOfBoundaries is true

```jsx
const {View} = require("@khanacademy/wonder-blocks-core");
const Spacing = require("@khanacademy/wonder-blocks-spacing");

<View>
    <TooltipBubble
        placement="top"
        outOfBoundaries={true}
        style={{position: "relative"}}
    >
        <TooltipContent>I'm hidden. So hidden. Shhhhh!</TooltipContent>
    </TooltipBubble>
</View>
```