// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";

import type {Labels} from "@khanacademy/wonder-blocks-dropdown";
import type {StoryComponentType} from "@storybook/react";

import {MultiSelect, OptionItem} from "../index.js";

export default {
    title: "Dropdown / MultiSelect",
};

// Custom MultiSelect labels
const dropdownLabels: $Shape<Labels> = {
    noneSelected: "Solar system",
    someSelected: (numSelectedValues) => `${numSelectedValues} planets`,
};

type Props = {|
    opened: boolean,
|};

type State = {|
    opened: boolean,
    selectedValues: Array<string>,
|};

type DefaultProps = {|
    opened: $PropertyType<Props, "opened">,
|};

class MultiSelectWithCustomStyles extends React.Component<Props, State> {
    static defaultProps: DefaultProps = {
        opened: false,
    };

    state: State = {
        selectedValues: [],
        opened: this.props.opened,
    };

    handleChange: (update: Array<string>) => void = (update) => {
        this.setState({
            selectedValues: update,
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
                <MultiSelect
                    onChange={this.handleChange}
                    selectedValues={this.state.selectedValues}
                    style={styles.setWidth}
                    dropdownStyle={styles.customDropdown}
                    labels={dropdownLabels}
                    opened={this.state.opened}
                    onToggle={this.handleToggleMenu}
                >
                    <OptionItem label="Mercury" value="1" />
                    <OptionItem label="Venus" value="2" />
                    <OptionItem label="Earth" value="3" disabled />
                    <OptionItem label="Mars" value="4" />
                    <OptionItem label="Jupiter" value="5" />
                    <OptionItem label="Saturn" value="6" />
                    <OptionItem label="Neptune" value="7" />
                    <OptionItem label="Uranus" value="8" />
                </MultiSelect>
            </View>
        );
    }
}

export const CustomStyles: StoryComponentType = () => (
    <MultiSelectWithCustomStyles />
);

CustomStyles.parameters = {
    chromatic: {
        // we don't need screenshots because this story only tests behavior.
        disableSnapshot: true,
    },
};

export const CustomStylesOpened: StoryComponentType = () => (
    <MultiSelectWithCustomStyles opened={true} />
);

export const DisabledMultiSelect: StoryComponentType = () => (
    <MultiSelect disabled={true} onChange={() => {}}>
        <OptionItem label="Mercury" value="1" />
        <OptionItem label="Venus" value="2" />
    </MultiSelect>
);

DisabledMultiSelect.parameters = {
    docs: {
        storyDescription:
            "`MultiSelect` can be disabled by passing `disabled={true}`. This can be useful when you want to disable a control temporarily.",
    },
};

const styles = StyleSheet.create({
    setWidth: {
        minWidth: 170,
        width: "100%",
    },
    customDropdown: {
        maxHeight: 200,
    },
    wrapper: {
        height: "800px",
        width: "1200px",
    },
});
