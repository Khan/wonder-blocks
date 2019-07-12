Use these low-level building blocks to build your own modal dialog, instead of using OnePaneDialog. This should happen very rarely and only when a specific exception is required.

### Example: Custom Two-Pane Dialog

```js
const {StyleSheet} = require("aphrodite");

const {ModalDialog, ModalPanel} = require("@khanacademy/wonder-blocks-modal");
const {View} = require("@khanacademy/wonder-blocks-core");
const Button = require("@khanacademy/wonder-blocks-button").default;
const {Title, Body} = require("@khanacademy/wonder-blocks-typography");
const {MediaLayout, Strut} = require("@khanacademy/wonder-blocks-layout");

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

const styleSheets = {
    mdOrLarger: StyleSheet.create({
        dialog: {
            width: "86.72%",
            maxWidth: 888,
            height: "60.42%",
            minHeight: 308,
        },

        panelGroup: {
            flexDirection: "row",
            flex: 1,
        },

        below: {
            background: "url(/blue-blob.png)",
            backgroundSize: "cover",
            width: 294,
            height: 306,
            position: "absolute",
            top: 100,
            left: -60
        },

        above: {
            background: "url(/asteroid.png)",
            backgroundSize: "cover",
            width: 650,
            height: 400,
            position: "absolute",
            top: -35,
            left: 50
        },
    }),

    small: StyleSheet.create({
        dialog: {
            width: "100%",
            height: "100%",
            overflow: "hidden",
        },

        panelGroup: {
            flexDirection: "column",
            flex: 1
        }
    })
};

<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <MediaLayout styleSheets={styleSheets}>
            {({mediaSize, styles}) => (
                <ModalDialog
                    style={styles.dialog}
                    below={<View style={styles.below} />}
                    above={<View style={styles.above} />}
                >
                    <View style={styles.panelGroup}>
                        <ModalPanel
                            onClose={() => alert("This would close the modal.")}
                            content={
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
                            light={false}
                            closeButtonVisible={mediaSize === "small"}
                        />
                        <ModalPanel
                            onClose={() => alert("This would close the modal.")}
                            content={
                                <View>
                                    <Title style={styles.title}>Contents</Title>
                                    <Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                        sed do eiusmod tempor incididunt ut labore et dolore
                                        magna aliqua.
                                    </Body>
                                    <Strut size={16} />
                                    <Button>Primary action</Button>
                                </View>
                            }
                            closeButtonVisible={mediaSize !== "small"}
                        />
                    </View>
                </ModalDialog>
            )}
        </MediaLayout>
    </View>
</View>;
```

