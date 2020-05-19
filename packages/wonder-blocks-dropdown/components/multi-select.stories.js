// @flow
import React from "react";
import {StyleSheet} from "aphrodite";

import {MultiSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";

export default {
    title: "MultiSelect",
};

class MultiSelectWithCustomStyles extends React.Component {
    state = {
        selectedValues: [],
    };

    handleChange = (update) => {
        this.setState({
            selectedValues: update,
        });
    };

    render() {
        return (
            <MultiSelect
                onChange={this.handleChange}
                selectedValues={this.state.selectedValues}
                style={styles.setWidth}
                dropdownStyle={styles.customDropdown}
                labels={{
                    noneSelected: "Solar system",
                    someSelected: (numSelectedValues) =>
                        `${numSelectedValues} planets`,
                }}
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
        );
    }
}

export const customStyles = () => <MultiSelectWithCustomStyles />;

customStyles.story = {
    parameters: {
        chromatic: {
            // we don't need screenshots because this story only tests behavior.
            disable: true,
        },
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
});
