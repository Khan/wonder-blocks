### Basic multi select

This multi select starts with nothing selected and has no selection shortcuts.
It also has a set minWidth, and one of the items is disabled.

```js
import {MultiSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";

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
            selectedValues={this.state.selectedValues}
            selectItemType="colors"
            style={styles.setWidth}
            testId="palette"
        >
            <OptionItem label="Red" value="1" testId="red"
                onClick={() => console.log("Roses are red")}
            />
            <OptionItem label="Yellow" value="2" disabled testId="yellow"/>
            <OptionItem label="Green" value="3" testId="green" />
            <OptionItem label="Blue" value="4" testId="blue" />
            {false && <OptionItem label="Pink" value="5" testId="pink" />}
        </MultiSelect>;
    }
}

<View style={styles.row}>
    <ExampleNoneSelected />
</View>
```

### Multi-select with custom dropdown styling

Sometimes, we may want to customize the dropdown style (for example, to limit
the height of the list), For this purpose, we have the `dropdownStyle` prop.

```js
import {MultiSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    setWidth: {
        minWidth: 170,
    },
    dropdownHeight: {
        maxHeight: 200,
    },
});

class ExampleScrolling extends React.Component {
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
            placeholder="Solar system"
            selectedValues={this.state.selectedValues}
            selectItemType="planets"
            style={styles.setWidth}
            dropdownStyle={styles.dropdownHeight}
        >
            <OptionItem label="Mercury" value="1" />
            <OptionItem label="Venus" value="2" />
            <OptionItem label="Earth" value="3" disabled />
            <OptionItem label="Mars" value="4" />
            <OptionItem label="Jupiter" value="5" />
            <OptionItem label="Saturn" value="6" />
            <OptionItem label="Neptune" value="7" />
            <OptionItem label="Uranus" value="8" />
        </MultiSelect>;
    }
}

<View style={styles.row}>
    <ExampleScrolling />
</View>
```

### Multi select with select all / select none shortcuts

This example starts with one item selected and has selection shortcuts for
select all and select none. This one does not have a predefined placeholder.

```js
import {MultiSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";

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
            selectItemType="interns"
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
import {StyleSheet} from "aphrodite";
import {MultiSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import {View, Text} from "@khanacademy/wonder-blocks-core";
import {OnePaneDialog, ModalLauncher} from "@khanacademy/wonder-blocks-modal";
import Button from "@khanacademy/wonder-blocks-button";

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
            selectItemType="Great Houses"
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
    <OnePaneDialog
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

### Empty menus are disabled automatically

```js
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import {MultiSelect} from "@khanacademy/wonder-blocks-dropdown";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
});

<View style={styles.row}>
    <MultiSelect placeholder="empty" />
</View>
```

### Accessibility

If you need to associate this component with another element (e.g. `<label>`),
make sure to pass the `aria-labelledby` and/or `id` props to the `MultiSelect` component.
This way, the `opener` will receive this value and it will associate both elements.

```js
import {MultiSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import {View} from "@khanacademy/wonder-blocks-core";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";

<View>
    <LabelLarge
        tag="label"
        id="label-for-multi-select"
        htmlFor="unique-multi-select"
    >
        Associated label element
    </LabelLarge>
    <MultiSelect
        aria-labelledby="label-for-multi-select"
        id="unique-multi-select"
        placeholder="Accessible MultiSelect"
    >
        <OptionItem label="some value" value="" />
    </MultiSelect>
</View>
```

### Implicit all enabled Multi select

When nothing is selected, show the menu text as "All selected".
Note that the actual selection logic doesn't change. (Only the menu text)

```js
import {StyleSheet} from "aphrodite";
import {MultiSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import {View} from "@khanacademy/wonder-blocks-core";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
});

class ImplicitAllEnabledExample extends React.Component {
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
            implicitAllEnabled={true}
            selectItemType="fruits"
            onChange={this.handleChange}
            selectedValues={this.state.selectedValues}
        >
            <OptionItem label="Nectarine" value="nectarine" />
            <OptionItem label="Plum" value="plum" />
            <OptionItem label="Cantaloupe" value="cantaloupe" />
            <OptionItem label="Pineapples" value="pineapples" />
        </MultiSelect>;
    }
}

<View style={styles.row}>
    <ImplicitAllEnabledExample />
</View>
```

### Example: Opening a MultiSelect programmatically

Sometimes you'll want to trigger a dropdown programmatically. This can be done by
setting a value to the `opened` prop (`true` or `false`). In this situation the `MultiSelect` is a
controlled component. The parent is responsible for managing the opening/closing
of the dropdown when using this prop.

This means that you'll also have to update `opened` to the value triggered by
the `onToggle` prop.

```js
import {OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {StyleSheet} from "aphrodite";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    }
});

class ControlledMultiSelectExample extends React.Component {
    constructor() {
        super();
        this.state = {
            opened: false,
            selectedValues: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleToggleMenu = this.handleToggleMenu.bind(this);
    }

    handleChange(update) {
        this.setState({
           selectedValues: update,
        });
    }

    handleToggleMenu(opened) {
        this.setState({
            opened,
        });
    }

    render() {
        return (
            <View style={styles.row}>
                <MultiSelect
                    selectItemType="fruits"
                    onChange={this.handleChange}
                    opened={this.state.opened}
                    onToggle={this.handleToggleMenu}
                    selectedValues={this.state.selectedValues}
                >
                    <OptionItem label="Nectarine" value="nectarine" />
                    <OptionItem label="Plum" value="plum" />
                    <OptionItem label="Cantaloupe" value="cantaloupe" />
                    <OptionItem label="Pineapples" value="pineapples" />
                </MultiSelect>
                <Strut size={Spacing.medium} />
                <Button onClick={() => this.handleToggleMenu(true)}>
                    Open SingleSelect programatically
                </Button>
            </View>
        );
    }
}

<ControlledMultiSelectExample />
```

### Multi select with search filter

When there are many options, you could use a search filter in the MultiSelect.
The search filter will be performed toward the labels of the option items.

*NOTE:* If there are more than 100 options, the component will automatically use
[react-window](https://github.com/bvaughn/react-window) to improve performance
when rendering these elements.

```js
import {MultiSelect, ActionItem, SeparatorItem, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
});

const optionItems = new Array(100).fill(null).map((_, i) => (<OptionItem
    key={i}
    value={(i + 1).toString()}
    label={`School ${i + 1} in Wizarding World`}
/>));

class ExampleWithShortcuts extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedValues: [],
        };
        // Styleguidist doesn't support arrow functions in class field properties
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(selectedValues) {
        this.setState({selectedValues});
    }

    render() {
        return <MultiSelect
            shortcuts={true}
            isFilterable={true}
            onChange={this.handleChange}
            selectedValues={this.state.selectedValues}
            selectItemType="schools"
        >
            {optionItems}
        </MultiSelect>;
    }
}

<View style={styles.row}>
    <ExampleWithShortcuts />
</View>
```

