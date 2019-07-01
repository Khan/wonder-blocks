`Clickable` allows you create clickable components with consistent behavior.
- handles mouse, touch, and keyboard events
- matches standard behavior for the given role
- performs client-side navigation when href is set and component is a descendent
  of a react-router `Router`

```js
const {LabelLarge, LabelMedium} = require("@khanacademy/wonder-blocks-typography");
const Icon = require("@khanacademy/wonder-blocks-icon").default;
const {icons} = require("@khanacademy/wonder-blocks-icon");
const {Spring, Strut} = require("@khanacademy/wonder-blocks-layout");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        padding: 16,
        border: "solid 1px black",
        borderRadius: 4,
        width: "100%",
    },
    hovered: {
        backgroundColor: "lightgreen",
        cursor: "pointer",
    },
    pressed: {
        backgroundColor: "green",
        color: "white",
    },
    focused: {
        "::before": {
            content: "''",
            position: "absolute",
            left: -8,
            top: -8,
            right: -8,
            bottom: -8,
            borderRadius: 10,
            border: "dotted 4px black",
        },
    },
});

<View>
    <Clickable>
        {(state) => {
            console.log(state);
            return <View
                style={[
                    styles.container,
                    state.hovered && styles.hovered,
                    state.pressed && styles.pressed,
                    state.focused && styles.focused,
                ]}
            >
                <View style={{alignItems: "flex-start"}}>
                    <LabelLarge>Hello, world</LabelLarge>
                    <Strut size={8}/>
                    <LabelMedium>Lorem Ipsum Dolor</LabelMedium>
                </View>
                <Spring/>
                <Icon size="large" icon={icons.search}/>
            </View>
        }}
    </Clickable>
</View>
```
