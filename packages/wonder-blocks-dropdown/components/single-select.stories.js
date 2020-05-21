// @flow
import React from "react";
import {StyleSheet} from "aphrodite";

import {SingleSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";

export default {
    title: "Dropdown / SingleSelect",
};

const optionItems = new Array(1000)
    .fill(null)
    .map((_, i) => (
        <OptionItem
            key={i}
            value={(i + 1).toString()}
            label={`School ${
                i + 1
            } in Wizarding World Some more really long labels?`}
        />
    ));

type State = {|
    selectedValue: string,
|};

class SingleSelectWithCustomStyles extends React.Component<{||}, State> {
    state = {
        selectedValue: "",
    };

    handleChange(selected: string) {
        this.setState({
            selectedValue: selected,
        });
    }

    render() {
        return (
            <SingleSelect
                onChange={this.handleChange}
                isFilterable={true}
                placeholder="Select a school"
                selectedValue={this.state.selectedValue}
                dropdownStyle={styles.fullBleed}
                style={styles.fullBleed}
            >
                {optionItems}
            </SingleSelect>
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
});

export const customStyles = () => <SingleSelectWithCustomStyles />;

customStyles.story = {
    parameters: {
        chromatic: {
            // we don't need screenshots because this story only tests behavior.
            disable: true,
        },
    },
};
