// @flow
import React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import {SingleSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";

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

class SingleSelectWithFilter extends React.Component<Props, State> {
    static defaultProps = {
        opened: false,
    };

    state = {
        selectedValue: "2",
        opened: this.props.opened,
    };

    handleChange = (selected: string) => {
        this.setState({
            selectedValue: selected,
        });
    };

    handleToggleMenu = (opened: boolean) => {
        this.setState({
            opened,
        });
    };

    render() {
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
});

export const WithFilter = () => <SingleSelectWithFilter />;

WithFilter.story = {
    parameters: {
        chromatic: {
            // we don't need screenshots because this story only tests behavior.
            disable: true,
        },
    },
};

export const WithFilterOpened = () => <SingleSelectWithFilter opened={true} />;
