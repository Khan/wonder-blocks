### Basic multi select

This multi select starts with nothing selected and has no selection shortcuts.
It also has a set minWidth, and one of the items is disabled.

```js
const React = require("react");
const {View, i18n} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    setWidth: {
        minWidth: 170,
    },
});

class ExampleNoneSelected extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedValues: [],
        };
        // Styleguidist doesn't support arrow functions in class field properties
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(update) {
        console.log("changes happened!");
        this.setState({
           selectedValues: update,
        });
    }

    render() {
        return <MultiSelect
            onChange={this.handleChange}
            placeholder="Color palette"
            selectedPlaceholder={(num) =>
                i18n.ngettext("%(num)s color", "%(num)s colors", num)}
            allSelectedPlaceholder="All colors"
            selectedValues={this.state.selectedValues}
            style={styles.setWidth}
        >
            <OptionItem label="Red" value="1"
                onClick={() => console.log("Roses are red")}
            />
            <OptionItem label="Yellow" value="2" disabled />
            <OptionItem label="Green" value="3" />
            <OptionItem label="Blue" value="4" />
        </MultiSelect>;
    }
}

<View style={styles.row}>
    <ExampleNoneSelected />
</View>
```

### Multi select with select all / select none shortcuts

This example starts with one item selected and has selection shortcuts for
select all and select none. This one does not have a predefined placeholder.

```js
const React = require("react");
const {View, i18n} = require("@khanacademy/wonder-blocks-core");
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
        // Styleguidist doesn't support arrow functions in class field properties
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(update) {
        console.log("changes happened!");
        this.setState({
           selectedValues: update,
        });
    }

    render() {
        return <MultiSelect
            shortcuts={true}
            onChange={this.handleChange}
            selectedValues={this.state.selectedValues}
            selectedPlaceholder={(num) =>
                i18n.ngettext("%(num)s itern", "%(num)s interns", num)}
            allSelectedPlaceholder="All interns"
        >
            <OptionItem label="Anesu" value="very mobile" />
            <OptionItem label="Ioana" value="lives in roma" />
            <OptionItem label="Jennie" value="master of dominion" />
            <OptionItem label="Kelsey" value="pipelines and kotlin" />
            <OptionItem label="Mary" value="flow-distress" />
            <OptionItem label="Nisha" value="on the growth boat boat" />
            <OptionItem label="Sophie" value="wonderblocks 4ever" />
            <OptionItem label="Stephanie" value="ramen izakaya fan" />
            <OptionItem label="Yeva" value="boba enthusiast" />
        </MultiSelect>;
    }
}

<View style={styles.row}>
    <ExampleWithShortcuts />
</View>
```

### Multi select in a modal

This multi select is in a modal.

```js
const {StyleSheet} = require("aphrodite");
const React = require("react");
const {View, Text, i18n} = require("@khanacademy/wonder-blocks-core");
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
    setWidth: {
        minWidth: 170,
    },
});

class SimpleMultiSelect extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedValues: [],
        };
        // Styleguidist doesn't support arrow functions in class field properties
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(update) {
        console.log("changes happened!");
        this.setState({
           selectedValues: update,
        });
    }

    render() {
        return <MultiSelect
            onChange={this.handleChange}
            selectedValues={this.state.selectedValues}
            selectedPlaceholder={(num) =>
                i18n.ngettext("%(num)s Great House", "%(num)s Great Houses", num)}
            allSelectedPlaceholder="All Great Houses"
            style={styles.setWidth}
        >
            <OptionItem label="Stark" value="1" />
            <OptionItem label="Arryn" value="2" />
            <OptionItem label="Baratheon" value="3" />
            <OptionItem label="Tully" value="4" />
            <OptionItem label="Greyjoy" value="5" />
            <OptionItem label="Lannister" value="6" />
            <OptionItem label="Tyrell" value="7" />
            <OptionItem label="Martell" value="8" />
            <OptionItem label="Targaryen" value="9" />
        </MultiSelect>;
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
