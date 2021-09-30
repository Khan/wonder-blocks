// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import {SingleSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";

import type {StoryComponentType} from "@storybook/react";

export default {
    title: "Dropdown / SingleSelect",
};

const fruits = ["banana", "strawberry", "pear", "orange"];

const optionItems = new Array(1000)
    .fill(null)
    .map((_, i) => (
        <OptionItem
            key={i}
            value={(i + 1).toString()}
            label={`Fruit # ${i + 1} ${fruits[i % fruits.length]}`}
        />
    ));

type Props = {|
    opened: boolean,
|};

type State = {|
    selectedValue: string,
    opened: boolean,
|};

type DefaultProps = {|
    opened: $PropertyType<Props, "opened">,
|};

class SingleSelectWithFilter extends React.Component<Props, State> {
    static defaultProps: DefaultProps = {
        opened: false,
    };

    state: State = {
        selectedValue: "2",
        opened: this.props.opened,
    };

    handleChange: (selected: string) => void = (selected) => {
        this.setState({
            selectedValue: selected,
        });
    };

    handleToggleMenu: (opened: boolean) => void = (opened) => {
        this.setState({
            opened,
        });
    };

    render(): React.Node {
        return (
            <View style={styles.wrapper}>
                <SingleSelect
                    onChange={this.handleChange}
                    isFilterable={true}
                    opened={this.state.opened}
                    onToggle={this.handleToggleMenu}
                    placeholder="Select a fruit"
                    selectedValue={this.state.selectedValue}
                    dropdownStyle={styles.fullBleed}
                    style={styles.fullBleed}
                >
                    {optionItems}
                </SingleSelect>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    fullBleed: {
        width: "100%",
    },
    wrapper: {
        height: "800px",
        width: "1200px",
    },
    centered: {
        alignItems: "center",
        justifyContent: "center",
        height: `calc(100vh - 16px)`,
    },
});

export const WithFilter: StoryComponentType = () => <SingleSelectWithFilter />;

WithFilter.story = {
    parameters: {
        chromatic: {
            // we don't need screenshots because this story only tests behavior.
            disable: true,
        },
    },
};

export const WithFilterOpened: StoryComponentType = () => (
    <SingleSelectWithFilter opened={true} />
);

export const DropdownOverlap: StoryComponentType = () => {
    const [value, setValue] = React.useState(null);
    const [opened, setOpened] = React.useState(true);

    return (
        <View style={styles.centered}>
            <View>
                <SingleSelect
                    onChange={(selected) => setValue(selected)}
                    isFilterable={true}
                    opened={opened}
                    onToggle={(opened) => setOpened(opened)}
                    placeholder="Select a fruit"
                    selectedValue={value}
                >
                    {optionItems}
                </SingleSelect>
            </View>
        </View>
    );
};

DropdownOverlap.story = {
    name: "Dropdown container overlaps anchor",
    parameters: {
        chromatic: {
            viewports: [320, 640, 1024],
        },
    },
};
