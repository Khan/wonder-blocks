This is an internal component that we use to render the stuff that appears when a tooltip shows.

Note that without explicit positioning, the arrow will not be centered.

### Placement top

```jsx
const {View} = require("@khanacademy/wonder-blocks-core");

const popperProps = {
    style: {
        position: "absolute",
        top: 0,
        left: 0,
    },
    placement: "top",
    ref: () => {},
    scheduleUpdate: () => {},
    arrowProps: {
        style: {
            left: 0,
            top: 0,
        },
        ref: () => {},
    },
    outOfBoundaries: false,
};

<View style={{height: 50, flexDirection: "column"}}>
    <TooltipBubble popperProps={popperProps}>
        <TooltipContent>I'm on the top!</TooltipContent>
    </TooltipBubble>
</View>
```

### Placement right

```jsx
const {View} = require("@khanacademy/wonder-blocks-core");

const popperProps = {
    style: {
        position: "absolute",
        top: 0,
        left: 0,
    },
    placement: "right",
    ref: () => {},
    scheduleUpdate: () => {},
    arrowProps: {
        style: {
            left: 0,
            top: 0,
        },
        ref: () => {},
    },
    outOfBoundaries: false,
};

<View style={{height: 50, flexDirection: "row-reverse", justifyContent: "flex-end"}}>
    <TooltipBubble popperProps={popperProps}>
        <TooltipContent>I'm on the right!</TooltipContent>
    </TooltipBubble>
</View>
```

### Placement bottom

```jsx
const {View} = require("@khanacademy/wonder-blocks-core");

const popperProps = {
    style: {
        position: "absolute",
        top: 0,
        left: 0,
    },
    placement: "bottom",
    ref: () => {},
    scheduleUpdate: () => {},
    arrowProps: {
        style: {
            left: 0,
            top: 0,
        },
        ref: () => {},
    },
    outOfBoundaries: false,
};

<View style={{height: 50, display: "flex", flexDirection: "column-reverse"}}>
    <TooltipBubble popperProps={popperProps}>
        <TooltipContent>I'm on the bottom!</TooltipContent>
    </TooltipBubble>
</View>
```

### Placement left

```jsx
const {View} = require("@khanacademy/wonder-blocks-core");

const popperProps = {
    style: {
        position: "absolute",
        top: 0,
        left: 0,
    },
    placement: "left",
    ref: () => {},
    scheduleUpdate: () => {},
    arrowProps: {
        style: {
            left: 0,
            top: 0,
        },
        ref: () => {},
    },
    outOfBoundaries: false,
};

<View style={{height: 50, display: "flex", flexDirection: "row"}}>
    <TooltipBubble popperProps={popperProps}>
        <TooltipContent>I'm on the left!</TooltipContent>
    </TooltipBubble>
</View>
```

### Positioning the arrow
Here we tell the arrow that it's lefthand side is at 50px.

```jsx
const {View} = require("@khanacademy/wonder-blocks-core");
const Spacing = require("@khanacademy/wonder-blocks-spacing");

const popperProps = {
    placement: "top",
    style: {
        position: "absolute",
        top: 0,
        left: 0,
    },
    ref: () => {},
    scheduleUpdate: () => {},
    arrowProps: {
        style: {
            left: 50,
            top: 0,
        },
        ref: () => {},
    },
    outOfBoundaries: false,
};

<View style={{height: 50, display: "flex", flexDirection: "row"}}>
    <TooltipBubble popperProps={popperProps}>
        <TooltipContent>I'm on the bottom with an arrow 50px in!</TooltipContent>
    </TooltipBubble>
</View>
```

### Hidden because outOfBoundaries is true

```jsx
const {View} = require("@khanacademy/wonder-blocks-core");
const Spacing = require("@khanacademy/wonder-blocks-spacing");

const popperProps = {
    placement: "top",
    style: {
        position: "absolute",
        top: 0,
        left: 0,
    },
    ref: () => {},
    scheduleUpdate: () => {},
    arrowProps: {
        style: {
            left: 0,
            top: 0,
        },
        ref: () => {},
    },
    outOfBoundaries: true,
};

<View style={{height: 50}}>
    <TooltipBubble popperProps={popperProps}>
        <TooltipContent>I'm hidden. So hidden. Shhhhh!</TooltipContent>
    </TooltipBubble>
</View>
```