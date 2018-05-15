```js
const {StyleSheet} = require("aphrodite");
const {Text} = require("wonder-blocks-core");
const Color = require("wonder-blocks-color").default;
const CircularSpinner = require("./circular-spinner.js").default;

const styles = StyleSheet.create({
    contents: {
        flexDirection: "row",
    },
    dark: {
        background: Color.darkBlue,
        color: Color.white,
    },
    block: {
        width: 154,
        height: 154,
        marginRight: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    inline: {
        display: "inline",
    }
});

<View>
    <View style={styles.contents}>
        <View style={styles.block}>
            <CircularSpinner size="default" />
            <Text>size: default</Text>
        </View>
        <View style={styles.block}>
            <CircularSpinner size="small" />
            <Text>size: small</Text>
        </View>
        <View style={styles.block}>
            <CircularSpinner size="xsmall" />
            <Text>size: xsmall</Text>
        </View>
    </View>

    <View style={[styles.contents, styles.dark]}>
        <View style={styles.block}>
            <CircularSpinner size="default" light />
            <Text>light, size: default</Text>
        </View>
        <View style={styles.block}>
            <CircularSpinner size="small" light />
            <Text>light, size: small</Text>
        </View>
        <View style={styles.block}>
            <CircularSpinner size="xsmall" light />
            <Text>light, size: xsmall</Text>
        </View>
    </View>

    <View>
        <Text>
            Inline inside
            <CircularSpinner size="xsmall" style={styles.inline} />
            {" "}some text.
        </Text>
    </View>
</View>
```
