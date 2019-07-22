Primary, secondary, and tertiary IconButton examples:
```js
import {View} from "@khanacademy/wonder-blocks-core";
import {icons} from "@khanacademy/wonder-blocks-icon";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Strut} from "@khanacademy/wonder-blocks-layout";

<View style={{flexDirection: "row"}}>
    <IconButton
        icon={icons.search}
        aria-label="search"
        onClick={(e) => console.log("hello")}
    />
    <Strut size={16} />
    <IconButton
        icon={icons.search}
        aria-label="search"
        kind="secondary"
        onClick={(e) => console.log("hello")}
    />
    <Strut size={16} />
    <IconButton
        icon={icons.search}
        aria-label="search"
        kind="tertiary"
        href="/search"
    />
    <Strut size={16} />
    <IconButton
        disabled={true}
        icon={icons.search}
        aria-label="search"
        onClick={(e) => console.log("hello")}
    />
    <Strut size={16} />
    <IconButton
        disabled={true}
        icon={icons.search}
        aria-label="search"
        href="/search"
    />
</View>
```

An IconButton on a dark background. Only the primary kind is allowed.
```js
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {icons} from "@khanacademy/wonder-blocks-icon";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {StyleSheet} from "aphrodite";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        backgroundColor: Color.darkBlue,
        padding: 10,
    },
});

<View style={[styles.row]}>
    <IconButton
        icon={icons.search}
        aria-label="search"
        light={true}
        onClick={(e) => console.log("hello")}
    />
</View>
```
