The multi select menu allows the selection of multiple items. Clients are
responsible for keeping track of the selected items in the menu.

TODO(sophie): keyboard navigation and dismissal

The first menu starts with nothing selected and has no selection shortcuts.
There is also a disabled item, and this menu has a set width.

The second menu starts with one item selected and has selection shortcuts for
select all and select none. The second menu does not have a predefined placeholder.

The third menu is disabled.

```js
const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        height: 350,
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
                {
                    label: "Red",
                    value: "1",
                },
                {
                    disabled: true,
                    label: "Orange",
                    value: "2",
                },
                {
                    label: "Yellow",
                    value: "3",
                },
                {
                    label: "Green",
                    value: "4",
                },
                {
                    label: "Blue",
                    value: "5",
                },
            ]}
            disabled={this.props.disabled}
            onChange={(selectedValues) => this.handleChanges(selectedValues)}
            placeholder={"Choose some colors"}
            selectedValues={this.state.selectedValues}
            selectItemType={"colors"}
            style={{
                width: 170,
                maxWidth: 170,
            }}
        />;
    }
}

class ExampleWithShortcuts extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedValues: ["1"],
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
                {
                    label: "Red",
                    value: "1",
                },
                {
                    label: "Orange",
                    value: "2",
                },
                {
                    label: "Yellow",
                    value: "3",
                },
                {
                    label: "Green",
                    value: "4",
                },
                {
                    label: "Blue",
                    value: "5",
                },
            ]}
            shortcuts={true}
            onChange={(selectedValues) => this.handleChanges(selectedValues)}
            selectedValues={this.state.selectedValues}
            selectItemType={"colors"}
        />;
    }
}

<View style={[styles.row]}>
    <ExampleNoneSelected />
    <View style={[styles.strutLike]} />
    <ExampleWithShortcuts />
    <View style={[styles.strutLike]} />
    <ExampleNoneSelected disabled={true} />
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
        height: 370,
        paddingRight: 10,
        paddingTop: 10,
    },
});

class LightRightAlignedExample extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedValues: ["1"],
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
                {
                    label: "the philosopher's stone",
                    value: "1",
                },
                {
                    label: "the chamber of secrets",
                    value: "2",
                },
                {
                    label: "the prisoner of azkaban",
                    value: "3",
                },
                {
                    label: "the goblet of fire",
                    value: "4",
                },
                {
                    label: "the order of the phoenix",
                    value: "5",
                },
            ]}
            alignment={"right"}
            light={true}
            shortcuts={true}
            onChange={(selectedValues) => this.handleChanges(selectedValues)}
            selectedValues={this.state.selectedValues}
            selectItemType={"harry potter books"}
        />;
    }
}


<View style={[styles.row]}>
    <View style={[styles.darkBackgroundWrapper]}>
        <LightRightAlignedExample />
    </View>
</View>

```
