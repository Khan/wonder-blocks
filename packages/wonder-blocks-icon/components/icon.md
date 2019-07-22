A minimal `Icon` usage:

```jsx
import {icons} from "@khanacademy/wonder-blocks-icon";

<Icon icon={icons.search} size="small" />
```

While we don't currently have assets for sizes larger than `medium`, we can
still render any icon at any size in a pinch:

```jsx
import {View} from "@khanacademy/wonder-blocks-core";
import {icons} from "@khanacademy/wonder-blocks-icon";

<View>
    {["small", "medium", "large", "xlarge"].map(size =>
        <Icon key={size} size={size} icon={icons.search} />
    )}
</View>
```

Icons have `display: inline-block` by default:

```jsx
import {View} from "@khanacademy/wonder-blocks-core";
import {icons} from "@khanacademy/wonder-blocks-icon";
import Color from "@khanacademy/wonder-blocks-color";

<View>
    Here is an icon inline:
    <Icon
        size="small"
        icon={icons.info}
        color={Color.red}
        style={{margin: 2}}
    />
    It has color, too.
</View>

```
