### Single select with placeholder

This single select has a starting placeholder and a set width. One item is wider
than the width, and so the text ellipses.

```js
const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
});

class ExampleWithPlaceholder extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedValue: null,
        }
    }

    handleChange(selected) {
        console.log(`${selected} was selected!`);
        this.setState({
            selectedValue: selected,
        });
    }

    render() {
        return <SingleSelect
            onChange={(selected) => this.handleChange(selected)}
            placeholder="Choose a fruit"
            selectedValue={this.state.selectedValue}
            style={{
                width: 170,
                maxWidth: 170,
            }}
        >
            <OptionItem label="Vine-ripened tomatoes" value="tomato" />
            <OptionItem label="Watermelon" value="watermelon" />
            <OptionItem label="Strawberry" value="strawberry" />
        </SingleSelect>;
    }
}

<View style={[styles.row]}>
    <ExampleWithPlaceholder />
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
        }
    }

    handleChange(selected) {
        console.log(`${selected} was selected!`);
        this.setState({
            selectedValue: selected,
        });
    }

    render() {
        return <SingleSelect
            onChange={(selected) => this.handleChange(selected)}
            placeholder="Choose a juice"
            selectedValue={this.state.selectedValue}
        >
            <OptionItem label="Banana juice" value="banana" />
            <OptionItem label="Guava juice" value="guava" disabled />
            <OptionItem label="White grape juice" value="grape" />
        </SingleSelect>;
    }
}

<View style={[styles.row]}>
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
        }
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
            onChange={(selected) => this.handleChange(selected)}
            placeholder="Choose a juice"
            selectedValue={this.state.selectedValue}
        >
            <OptionItem label="Banana juice" value="banana" />
            <OptionItem label="Guava juice" value="guava" disabled />
            <OptionItem label="White grape juice" value="grape" />
        </SingleSelect>;
    }
}

<View style={[styles.row]}>
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
        }
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
            onChange={(selected) => this.handleChange(selected)}
            placeholder="Boba order"
            selectedValue={this.state.selectedValue}
        >
            <OptionItem label="Regular milk tea with boba" value="regular" />
            <OptionItem label="Wintermelon milk tea with boba" value="wintermelon" />
            <OptionItem label="Taro milk tea, half sugar" value="taro" />
        </SingleSelect>;
    }
}

<View style={[styles.row]}>
    <View style={[styles.darkBackgroundWrapper]}>
        <LightRightAlignedExample />
    </View>
</View>

```
