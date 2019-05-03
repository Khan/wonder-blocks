## Wrapping Modals

Often you'll want to define a new modal component by wrapping an existing
modal component.  These wrapped components will also work with ModalLauncher
in the same way the default ones do.

```js
const React = require("react");

const {Title} = require("@khanacademy/wonder-blocks-typography");
const {View} = require("@khanacademy/wonder-blocks-core");
const Button = require("@khanacademy/wonder-blocks-button").default;

class ModalWrapper extends React.Component {
    render() {
        return <OnePaneDialog
            title="Title"
            content={
                <View>
                    <Title>Hello, world</Title>
                </View>
            }
            footer={
                <Button onClick={this.props.onClose}>
                    Close Modal
                </Button>
            }
        />
    }
}

<View style={{flexDirection: "row"}}>
    <ModalLauncher
        onClose={() => window.alert("you closed the modal")}
        modal={({closeModal}) => <ModalWrapper onClose={closeModal}/>}
    >
        {({openModal}) => <Button onClick={openModal}>Open Modal</Button>}
    </ModalLauncher>
</View>
```

### Example: Modals with custom styles

Sometimes you'll want to customize the styling of the modal .e.g., custom width or height.  You can pass in `style` which will customize the styling of the modal wrapper.
To use styling for different screen sizes, wrap your component with `MediaLayout` component.  Please see example code below for details.

```js
const {StyleSheet} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");
const {Title, Body} = require("@khanacademy/wonder-blocks-typography");
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
        customModal: {
            maxWidth: 300,
            maxHeight: 200,
        },
    }),
};

<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>

        <MediaLayout styleSheets={styleSheets}>
            {({styles}) => (
                <OnePaneDialog
                    style={styles.customModal}
                    title="title"
                    content={
                        <View>
                            <Title style={styles.title}>Title</Title>
                            <Body>
                                Hello World!
                            </Body>
                        </View>
                    }
                    onClose={() => alert("This would close the modal.")}
                />
            )}
        </MediaLayout>
    </View>
</View>;
```
