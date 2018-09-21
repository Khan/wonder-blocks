# Wrapping Modals

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
        return <OneColumnModal
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
        modal={({closeModal}) => <CustomModal onClose={closeModal}/>}
    >
        {({openModal}) => <Button onClick={openModal}>Open Modal</Button>}
    </ModalLauncher>
</View>
```
