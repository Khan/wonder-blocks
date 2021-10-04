This is an internal component that we use to render the stuff that appears when a tooltip shows.

Note that without explicit positioning, the tail will not be centered.

### Placement top

```jsx
import {View} from "@khanacademy/wonder-blocks-core";
import {TooltipContent} from "@khanacademy/wonder-blocks-tooltip";

<View>
    <TooltipBubble placement="top" style={{position: "relative"}}>
        <TooltipContent>I'm on the top!</TooltipContent>
    </TooltipBubble>
</View>
```

### Placement right

```jsx
import {View} from "@khanacademy/wonder-blocks-core";
import {TooltipContent} from "@khanacademy/wonder-blocks-tooltip";

<View style={{alignItems: "flex-start"}}>
    <TooltipBubble placement="right" style={{position: "relative"}}>
        <TooltipContent>I'm on the right!</TooltipContent>
    </TooltipBubble>
</View>
```

### Placement bottom

```jsx
import {View} from "@khanacademy/wonder-blocks-core";
import {TooltipContent} from "@khanacademy/wonder-blocks-tooltip";

<View>
    <TooltipBubble placement="bottom" style={{position: "relative"}}>
        <TooltipContent>I'm on the bottom!</TooltipContent>
    </TooltipBubble>
</View>
```

### Placement left

```jsx
import {View} from "@khanacademy/wonder-blocks-core";
import {TooltipContent} from "@khanacademy/wonder-blocks-tooltip";

<View>
    <TooltipBubble placement="left" style={{position: "relative"}}>
        <TooltipContent>I'm on the left!</TooltipContent>
    </TooltipBubble>
</View>
```

### Positioning the tail
Here we tell the tail that it's lefthand side is at 50px.

```jsx
import {View} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {TooltipContent} from "@khanacademy/wonder-blocks-tooltip";

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

### Hidden because isReferenceHidden is true

```jsx
import {View} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {TooltipContent} from "@khanacademy/wonder-blocks-tooltip";

<View>
    <TooltipBubble
        placement="top"
        isReferenceHidden={true}
        style={{position: "relative"}}
    >
        <TooltipContent>I'm hidden. So hidden. Shhhhh!</TooltipContent>
    </TooltipBubble>
</View>
```