### Single select with placeholder and set widths

This single select has a starting placeholder and a set minWidth and maxWidth.
Notice how the dropdown is always at least as wide as the opener. Also, when
the first item is chosen, the text in the opener would exceed the maxWidth. It
ellipses instead.

```js
const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    setWidth: {
        minWidth: 170,
        maxWidth: 190,
    },
});

class ExampleWithPlaceholder extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedValue: null,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(selected) {
        console.log(`${selected} was selected!`);
        this.setState({
            selectedValue: selected,
        });
    }

    render() {
        return <SingleSelect
            onChange={this.handleChange}
            placeholder="Choose a fruit"
            selectedValue={this.state.selectedValue}
            style={styles.setWidth}
            testId="fruit-select"
        >
            <OptionItem label="Vine-ripened tomatoes" value="tomato" testId="tomato" />
            <OptionItem label="Watermelon" value="watermelon" testId="watermelon" />
            <OptionItem label="Strawberry" value="strawberry" testId="strawberry" />
            {false && <OptionItem label="Other" value="other" testId="other" />}
        </SingleSelect>;
    }
}

<View style={styles.row}>
    <ExampleWithPlaceholder />
</View>
```

### Single select with custom dropdown style

This example shows how we can add custom styles to the dropdown.

```js
const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    setWidth: {
        minWidth: 170,
        maxWidth: 190,
    },
    dropdown: {
        maxHeight: 240,
    },
});

class ExampleWithDropdownStyles extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedValue: null,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(selected) {
        console.log(`${selected} was selected!`);
        this.setState({
            selectedValue: selected,
        });
    }

    render() {
        return <SingleSelect
            onChange={this.handleChange}
            placeholder="Choose a pet"
            selectedValue={this.state.selectedValue}
            style={styles.setWidth}
        >
            <OptionItem label="Cat" value="1" />
            <OptionItem label="Dog" value="2" />
            <OptionItem label="Goldfish" value="3" />
            <OptionItem label="Hamster" value="4" />
            <OptionItem label="Rabbit" value="5" />
            <OptionItem label="Rock" value="6" />
            <OptionItem label="Snake" value="7" />
            <OptionItem label="Tarantula" value="8" />
        </SingleSelect>;
    }
}

<View style={styles.row}>
    <ExampleWithDropdownStyles />
</View>
```

### Single select with starting selected item and disabled item

This select starts with a starting selected item. One of the items is disabled
and thus cannot be selected.

```js
const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
});

class ExampleWithStartingSelection extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedValue: "banana",
        };
        // Styleguidist doesn't support arrow functions in class field properties
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(selected) {
        console.log(`${selected} was selected!`);
        this.setState({
            selectedValue: selected,
        });
    }

    render() {
        return <SingleSelect
            onChange={this.handleChange}
            placeholder="Choose a juice"
            selectedValue={this.state.selectedValue}
        >
            <OptionItem label="Banana juice" value="banana" />
            <OptionItem label="Guava juice" value="guava" disabled />
            <OptionItem label="White grape juice" value="grape" />
        </SingleSelect>;
    }
}

<View style={styles.row}>
    <ExampleWithStartingSelection />
</View>
```

### Disabled select

This select is disabled.
```js
const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
});

class DisabledExample extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedValue: "banana",
        };
        // Styleguidist doesn't support arrow functions in class field properties
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(selected) {
        console.log(`${selected} was selected!`);
        this.setState({
            selectedValue: selected,
        });
    }

    render() {
        return <SingleSelect
            disabled={true}
            onChange={this.handleChange}
            placeholder="Choose a juice"
            selectedValue={this.state.selectedValue}
        >
            <OptionItem label="Banana juice" value="banana" />
            <OptionItem label="Guava juice" value="guava" disabled />
            <OptionItem label="White grape juice" value="grape" />
        </SingleSelect>;
    }
}

<View style={styles.row}>
    <DisabledExample />
</View>
```

### Select on dark background, right-aligned

This single select is on a dark background and is also right-aligned.

```js
const React = require("react");
const Color = require("@khanacademy/wonder-blocks-color");
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    darkBackgroundWrapper: {
        flexDirection: "row",
        justifyContent: "flex-end",
        backgroundColor: Color.default.darkBlue,
        width: 350,
        height: 200,
        paddingRight: 10,
        paddingTop: 10,
    },
});

class LightRightAlignedExample extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedValue: null,
        };
        // Styleguidist doesn't support arrow functions in class field properties
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(selected) {
        console.log(`${selected} was selected!`);
        this.setState({
            selectedValue: selected,
        });
    }

    render() {
        return <SingleSelect
            alignment="right"
            light={true}
            onChange={this.handleChange}
            placeholder="Choose a drink"
            selectedValue={this.state.selectedValue}
        >
            <OptionItem label="Regular milk tea with boba" value="regular" />
            <OptionItem label="Wintermelon milk tea with boba" value="wintermelon" />
            <OptionItem label="Taro milk tea, half sugar" value="taro" />
        </SingleSelect>;
    }
}

<View style={styles.row}>
    <View style={styles.darkBackgroundWrapper}>
        <LightRightAlignedExample />
    </View>
</View>

```

### Empty menus are disabled automatically

```js
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
});

<View style={styles.row}>
    <SingleSelect placeholder="empty" />
</View>
```

### Accessibility

If you need to associate this component with another element (e.g. `<label>`),
make sure to pass the `aria-labelledby` and/or `id` props to the `SingleSelect` component.
This way, the `opener` will receive this value and it will associate both elements.

```js
const {View} = require("@khanacademy/wonder-blocks-core");
const {LabelLarge} = require("@khanacademy/wonder-blocks-typography");

<View>
    <LabelLarge
        tag="label"
        id="label-for-single-select"
        htmlFor="unique-single-select"
    >
        Associated label element
    </LabelLarge>
    <SingleSelect
        aria-labelledby="label-for-single-select"
        id="unique-single-select"
        placeholder="Accessible SingleSelect"
    >
        <OptionItem label="some value" value="" />
    </SingleSelect>
</View>
```