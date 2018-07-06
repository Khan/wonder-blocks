The single select menu allows the selection of one item. Clients are
responsible for keeping track of the selected item in the menu.

TODO(sophie): keyboard navigation and dismissal

This menu has a starting placeholder and a set width. One item is wider than
the width, and it ellipses.

```js
const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        height: 180,
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
        return <SingleSelectMenu
            items={[
                {
                    label: "Banana wrapped in a peel",
                    value: "banana",
                },
                {
                    label: "Apple",
                    value: "apple",
                },
                {
                    label: "Grape",
                    value: "grape",
                },
            ]}
            light={false}
            onChange={(selected) => this.handleChange(selected)}
            placeholder={"Choose a fruit"}
            selectedValue={this.state.selectedValue}
            style={{
                width: 170,
                maxWidth: 170,
            }}
        />;
    }
}

<View style={[styles.row]}>
    <ExampleWithPlaceholder />
</View>
```

This menu starts with a starting selected item. One of the items is disabled
and thus cannot be selected.

```js
const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        height: 180,
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
        return <SingleSelectMenu
            items={[
                {
                    label: "Banana juice!!!",
                    value: "banana",
                },
                {
                    disabled: true,
                    label: "Apple juice!!!",
                    value: "apple",
                },
                {
                    label: "Grape juice!!!",
                    value: "grape",
                },
            ]}
            onChange={(selected) => this.handleChange(selected)}
            placeholder={"Choose a juice"}
            selectedValue={this.state.selectedValue}
        />;
    }
}

<View style={[styles.row]}>
    <ExampleWithStartingSelection />
</View>
```

This is a disabled menu.

```js
const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        height: 50,
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
        return <SingleSelectMenu
            disabled={true}
            items={[
                {
                    label: "Banana juice!!!",
                    value: "banana",
                },
                {
                    label: "Apple juice!!!",
                    value: "apple",
                },
                {
                    label: "Grape juice!!!",
                    value: "grape",
                },
            ]}
            onChange={(selected) => this.handleChange(selected)}
            placeholder={"Choose a fruit"}
            selectedValue={this.state.selectedValue}
        />;
    }
}

<View style={[styles.row]}>
    <DisabledExample />
</View>
```

This menu is on a dark background and is also right-aligned.

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
        return <SingleSelectMenu
            items={[
                {
                    label: "Regular milk tea with boba",
                    value: "regular",
                },
                {
                    label: "Wintermelon milk tea with boba",
                    value: "wintermelon",
                },
                {
                    label: "Taro milk tea, half sugar",
                    value: "taro",
                },
            ]}
            light={true}
            onChange={(selected) => this.handleChange(selected)}
            placeholder={"Boba order"}
            selectedValue={this.state.selectedValue}
            alignment={"right"}
        />;
    }
}


<View style={[styles.row]}>
    <View style={[styles.darkBackgroundWrapper]}>
        <LightRightAlignedExample />
    </View>
</View>

```
