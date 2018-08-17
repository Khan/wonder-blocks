```js
const {StyleSheet, css} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");
const {Title, Body} = require("@khanacademy/wonder-blocks-typography");

const styles = StyleSheet.create({
    previewSizer: {
        height: 512,
    },

    modalPositioner: {
        // Checkerboard background
        backgroundImage: "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },

    title: {
        marginBottom: 16,
    },
});

<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <TwoColumnModal
            fullBleedSidebar={false}
            sidebar={
                <View>
                    <Title style={styles.title}>Sidebar</Title>
                    <Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris.
                    </Body>
                </View>
            }
            content={
                <View>
                    <Title style={styles.title}>Contents</Title>
                    <Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est.
                    </Body>
                </View>
            }
            onClickCloseButton={() => alert("This would close the modal.")}
        />
    </View>
</View>;
```

```js
const {StyleSheet, css} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");
const {Title, Body} = require("@khanacademy/wonder-blocks-typography");
const Button = require("@khanacademy/wonder-blocks-button").default;

const styles = StyleSheet.create({
    previewSizer: {
        height: 512,
    },

    modalPositioner: {
        // Checkerboard background
        backgroundImage: "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },

    title: {
        marginBottom: 16,
    },
});

<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <TwoColumnModal
            fullBleedSidebar={false}
            sidebar={
                <View>
                    <Title style={styles.title}>Sidebar</Title>
                    <Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris.
                    </Body>
                </View>
            }
            content={
                <View>
                    <Title style={styles.title}>Contents</Title>
                    <Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est.
                    </Body>
                    <Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est.
                    </Body>
                </View>
            }
            footer={
                <View>
                    <Button>Button (no-op)</Button>
                </View>
            }
            onClickCloseButton={() => alert("This would close the modal.")}
        />
    </View>
</View>;
```

This example shows that `TwoColumnModal` works with content and sidebar elements
that aren't block level elements.

```jsx
const {StyleSheet, css} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");
const {Title, Body} = require("@khanacademy/wonder-blocks-typography");

const styles = StyleSheet.create({
    previewSizer: {
        height: 512,
    },

    modalPositioner: {
        // Checkerboard background
        backgroundImage: "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
});

<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <TwoColumnModal
            fullBleedSidebar={false}
            sidebar={<span>foo</span>}
            content={<span>bar</span>}
            onClickCloseButton={() => alert("This would close the modal.")}
        />
    </View>
</View>;
```

This example shows a TwoColumnModal with a full bleed sidebar.

```jsx
const {StyleSheet, css} = require("aphrodite");
const Button = require("@khanacademy/wonder-blocks-button").default;
const {View} = require("@khanacademy/wonder-blocks-core");
const {Strut} = require("@khanacademy/wonder-blocks-layout");
const Spacing = require("@khanacademy/wonder-blocks-spacing").default;
const {HeadingLarge, Body} = require("@khanacademy/wonder-blocks-typography");

const styles = StyleSheet.create({
    previewSizer: {
        height: 512,
    },

    modalPositioner: {
        // Checkerboard background
        backgroundImage: "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },

    imageContainer: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundImage: "url('pencilHand-800x.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center bottom",
    },
});

<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <TwoColumnModal
            sidebar={<View style={styles.imageContainer} />}
            fullBleedSidebar={true}
            content={
                <View>
                    <HeadingLarge>
                        Welcome to your class.
                    </HeadingLarge>
                    <Strut size={Spacing.medium} />
                    <Body>
                        Assignments or goals your teacher creates for you will
                        appear at the top of your Khan Academy home page.
                    </Body>
                </View>
            }
            footer={<Button>Onward! (no-op)</Button>}
            onClickCloseButton={() => alert("This would close the modal.")}
        />
    </View>
</View>;
```
