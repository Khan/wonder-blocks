#### Example: Custom content

This component provides a flexible variant that can be used for example, for our Confidence Prompt in test prep and popovers that don't fit into other categories. If you want to use a different background, you can set `color` as part of `PopoverContentCore`.

```js
const {StyleSheet} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");
const {HeadingSmall, LabelLarge} = require("@khanacademy/wonder-blocks-typography");
const Spacing = require("@khanacademy/wonder-blocks-spacing").default;
const Color = require("@khanacademy/wonder-blocks-color").default;
const {default: Icon, icons} = require("@khanacademy/wonder-blocks-icon");

const customIcon = {
    small: "M6.92820 0L13.85640 4L13.85640 12L6.92820 16L0 12L0 4Z",
};

const styles = StyleSheet.create({
    customPopover: {
        maxWidth: 420,
        width: 420,
        textAlign: "center"
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        padding: `${Spacing.small}px 0`
    },
    action: {
        margin: Spacing.small,
        height: 100,
        padding: 2,
        alignItems: "center",
        justifyContent: "center"
    },
});

<View style={styles.row}>
    <PopoverContentCore
        color="dark"
        style={styles.customPopover}
        onClose={() => alert("close popover!")}
    >
        <View>
            <HeadingSmall>Custom popover title</HeadingSmall>
            <View style={styles.row}>
                <View style={styles.action}>
                    <Icon
                        icon={customIcon}
                        color={Color.gold}
                        size="large"
                    />
                    <LabelLarge>Option 1</LabelLarge>
                </View>
                <View style={styles.action}>
                    <Icon
                        icon={customIcon}
                        color={Color.green}
                        size="large"
                    />
                    <LabelLarge>Option 2</LabelLarge>
                </View>
                <View style={styles.action}>
                    <Icon
                        icon={customIcon}
                        color={Color.blue}
                        size="large"
                    />
                    <LabelLarge>Option 3</LabelLarge>
                </View>
            </View>
        </View>
    </PopoverContentCore>
</View>
```

#### Accessibility notes
The popover component will populate the `aria-describedby` attribute
automatically, unless the user sets an `id` prop inside the Popover instance.
Internally, it will be set on the trigger element.
