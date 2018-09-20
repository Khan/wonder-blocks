## Custom modals

```js
const React = require("react");

const {Title} = require("@khanacademy/wonder-blocks-typography");
const {View} = require("@khanacademy/wonder-blocks-core");
const Button = require("@khanacademy/wonder-blocks-button").default;

class CustomModal extends React.Component {
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
