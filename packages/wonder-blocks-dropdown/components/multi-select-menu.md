The multi select allows the selection of multiple items. Clients are responsible
for keeping track of the selected items.

### Basic multi select

This multi select starts with nothing selected and has no selection shortcuts.
It also has a set width, and one of the items is disabled.

```js
const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    strutLike: {
        width: 8,
    }
});

class ExampleNoneSelected extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedValues: [],
        };
    }

    handleChanges(update) {
        console.log("changes happened!");
        this.setState({
           selectedValues: update,
        });
    }

    render() {
        return <MultiSelectMenu
            items={[
                {label: "Red", value: "1"},
                {label: "Yellow", value: "2", disabled: true},
                {label: "Green", value: "3"},
                {label: "Blue", value: "4"},
            ]}
            onChange={(selectedValues) => this.handleChanges(selectedValues)}
            placeholder="Color palette"
            selectedValues={this.state.selectedValues}
            selectItemType="colors"
            style={{
                width: 170,
                maxWidth: 170,
            }}
        />;
    }
}

<View style={[styles.row]}>
    <ExampleNoneSelected />
</View>
```

### Multi select with select all / select none shortcuts

This example starts with one item selected and has selection shortcuts for
select all and select none. This one does not have a predefined placeholder.

```js
const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
});

class ExampleWithShortcuts extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedValues: ["wonderblocks 4ever"],
        };
    }

    handleChange(update) {
        console.log("changes happened!");
        this.setState({
           selectedValues: update,
        });
    }

    render() {
        return <MultiSelectMenu
            items={[
                {label: "Anesu", value: "very mobile"},
                {label: "Ioana", value: "lives in roma"},
                {label: "Jennie", value: "master of dominion"},
                {label: "Kelsey", value: "pipelines and kotlin"},
                {label: "Mary", value: "flow-distress"},
                {label: "Nisha", value: "on the growth boat boat"},
                {label: "Stephanie", value: "ramen izakaya fan"},
                {label: "Sophie", value: "wonderblocks 4ever"},
                {label: "Yeva", value: "boba fan"},
            ]}
            shortcuts={true}
            onChange={(selectedValues) => this.handleChange(selectedValues)}
            selectedValues={this.state.selectedValues}
            selectItemType="interns"
            style={{
                width: 150,
            }}
        />;
    }
}

<View style={[styles.row]}>
    <ExampleWithShortcuts />
</View>
```

### Multi select in a modal

This multi select is in a modal.

```js
const {StyleSheet} = require("aphrodite");
const React = require("react");
const {View, Text} = require("@khanacademy/wonder-blocks-core");
const {StandardModal, ModalLauncher} = require("@khanacademy/wonder-blocks-modal");
const Button = require("@khanacademy/wonder-blocks-button").default;

const styles = StyleSheet.create({
    wrapper: {
        alignItems: "center",
    },
    scrolledWrapper: {
        height: 200,
        overflow: "auto",
        border: "1px solid grey",
        borderRadius: 4,
        margin: 10,
        padding: 20,
    },
});

class SimpleMultiSelect extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedValues: [],
        };
    }

    handleChanges(update) {
        console.log("changes happened!");
        this.setState({
           selectedValues: update,
        });
    }

    render() {
        return <MultiSelectMenu
            items={[
                {label: "Stark", value: "1"},
                {label: "Arryn", value: "2"},
                {label: "Baratheon", value: "3"},
                {label: "Tully", value: "4"},
                {label: "Greyjoy", value: "5"},
                {label: "Lannister", value: "6"},
                {label: "Tyrell", value: "7"},
                {label: "Martell", value: "8"},
                {label: "Targaryen", value: "9"},
            ]}
            onChange={(selectedValues) => this.handleChanges(selectedValues)}
            selectedValues={this.state.selectedValues}
            selectItemType="Great Houses"
            style={{
                width: 170,
                maxWidth: 170,
            }}
        />;
    }
}

const modalContent = (
    <View style={{height: "200vh"}}>
        <View style={styles.scrolledWrapper}>
            <View style={{minHeight: "100vh"}}>
                <SimpleMultiSelect />
            </View>
        </View>
    </View>
);

const modal = (
    <StandardModal
        title="Westerosi modal"
        footer=""
        content={modalContent}
    />
);

<View style={styles.wrapper}>
    <ModalLauncher modal={modal}>
        {({openModal}) => <Button onClick={openModal}>Open modal!</Button>}
    </ModalLauncher>
</View>
```
