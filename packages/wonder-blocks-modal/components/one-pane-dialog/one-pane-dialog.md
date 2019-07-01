### Example: OnePaneDialog with above container

```js
const {StyleSheet} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");
const {Body} = require("@khanacademy/wonder-blocks-typography");
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

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },

    modalContent: {
        margin: "0 auto",
        maxWidth: 544,
    },

    above: {
        background: "url(/modal-above.png)",
        backgroundSize: "cover",
        width: 787,
        height: 496,
        position: "absolute",
        top: -20,
        left: -100
    },
});

<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <OnePaneDialog
            title="Single-line title"
            subtitle="Subtitle that provides additional context to the title"
            content={
                <View style={styles.modalContent}>
                    <Body>
                        {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est."}
                    </Body>
                    <Body>
                        {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est."}
                    </Body>
                    <Body>
                        {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est."}
                    </Body>
                </View>
            }
            footer={<Button type="button">Button (no-op)</Button>}
            showCloseButton={false}
            onClose={() => alert("This would close the modal.")}
            above={<View style={styles.above} />}
        />
    </View>
</View>;
```

### Example: Custom Footer (3 actions)

This component is fully responsive, try it by resizing the window.

```js
const {StyleSheet} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");
const {Body} = require("@khanacademy/wonder-blocks-typography");
const Button = require("@khanacademy/wonder-blocks-button").default;
const Spacing = require("@khanacademy/wonder-blocks-spacing").default;
const {Breadcrumbs, BreadcrumbsItem} = require("@khanacademy/wonder-blocks-breadcrumbs");
const {MediaLayout} = require("@khanacademy/wonder-blocks-layout");

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
});

const defaultStyles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    button: {
        marginRight: Spacing.medium
    }
});

const smallStyles = StyleSheet.create({
    row: {
        flexDirection: "column-reverse",
        width: "100%"
    },
    button: {
        marginBottom: Spacing.medium
    }
});

const styleSheets = {
    mdOrLarger: defaultStyles,
    small: smallStyles
};

const Footer = () => (
    <MediaLayout styleSheets={styleSheets}>
        {({ styles }) => (
            <View style={styles.row}>
                <Button style={styles.button} kind="tertiary">
                    Tertiary action
                </Button>
                <Button style={styles.button} kind="tertiary">
                    Secondary action
                </Button>
                <Button style={styles.button}>Primary action</Button>
            </View>
        )}
    </MediaLayout>
 );

<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <OnePaneDialog
            title="Multi-line title that wraps to show how this component adjusts with longer content"
            breadcrumbs={
                <Breadcrumbs>
                    <BreadcrumbsItem>
                        Bread
                    </BreadcrumbsItem>
                    <BreadcrumbsItem>
                        Crumb
                    </BreadcrumbsItem>
                    <BreadcrumbsItem>Trail</BreadcrumbsItem>
                </Breadcrumbs>
            }
            content={
                <View>
                    <Body>
                        {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est."}
                    </Body>
                </View>
            }
            footer={<Footer />}
            onClose={() => alert("This would close the modal.")}
        />
    </View>
</View>;
```

### Example: Multi-step flows

```js
const {StyleSheet} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");
const {Body} = require("@khanacademy/wonder-blocks-typography");
const {Strut} = require("@khanacademy/wonder-blocks-layout");
const {LabelLarge} = require("@khanacademy/wonder-blocks-typography");
const Button = require("@khanacademy/wonder-blocks-button").default;
const {MediaLayout} = require("@khanacademy/wonder-blocks-layout");

const exampleStyles = StyleSheet.create({
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
});

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    footer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    }
});

<View style={exampleStyles.previewSizer}>
    <View style={exampleStyles.modalPositioner}>
        <OnePaneDialog
            title="Dialog with multi-step footer"
            content={
                <View>
                    <Body>
                        {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est."}
                    </Body>
                </View>
            }
            footer={
                <View style={styles.footer}>
                    <LabelLarge>Step 1 of 4</LabelLarge>
                    <View style={styles.row}>
                        <Button kind="tertiary">Previous</Button>
                        <Strut size={16} />
                        <Button kind="primary">Next</Button>
                    </View>
                </View>
            }
        />
    </View>
</View>;
```