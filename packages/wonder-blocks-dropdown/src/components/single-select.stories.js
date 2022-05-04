// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {OnePaneDialog, ModalLauncher} from "@khanacademy/wonder-blocks-modal";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Body} from "@khanacademy/wonder-blocks-typography";

import type {StoryComponentType} from "@storybook/react";

import {SingleSelect, OptionItem} from "../index.js";

export default {
    title: "Dropdown / SingleSelect",
    component: SingleSelect,
    args: {
        isFilterable: true,
        opened: true,
        disabled: false,
        light: false,
        placeholder: "Choose a fruit",
    },
};

const SingleSelectTemplate = (args) => <SingleSelect {...args} />;

export const DefaultSingleSelectOpened: StoryComponentType = (args) => {
    const [selectedValue, setSelectedValue] = React.useState("pear");
    const [opened, setOpened] = React.useState(args.opened);
    React.useEffect(() => {
        // Only update opened if the args.opened prop changes (using the
        // controls panel).
        setOpened(args.opened);
    }, [args.opened]);

    return (
        <SingleSelectTemplate
            {...args}
            onChange={setSelectedValue}
            selectedValue={selectedValue}
            opened={opened}
            onToggle={setOpened}
        >
            <OptionItem label="Banana" value="banana" />
            <OptionItem label="Strawberry" value="strawberry" disabled />
            <OptionItem label="Pear" value="pear" />
            <OptionItem label="Orange" value="orange" />
            <OptionItem label="Watermelon" value="watermelon" />
            <OptionItem label="Apple" value="apple" />
            <OptionItem label="Grape" value="grape" />
            <OptionItem label="Lemon" value="lemon" />
            <OptionItem label="Mango" value="mango" />
        </SingleSelectTemplate>
    );
};

DefaultSingleSelectOpened.parameters = {
    docs: {
        storyDescription:
            "This select starts with a starting selected item. One of the items is disabled and thus cannot be selected.",
    },
    // Added to ensure that the dropdown menu is rendered using PopperJS.
    chromatic: {delay: 400},
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
    selectedValue: string,
    opened: boolean,
|};

type State = {|
    selectedValue: string,
    opened: boolean,
|};

type DefaultProps = {|
    selectedValue: $PropertyType<Props, "selectedValue">,
    opened: $PropertyType<Props, "opened">,
|};

class SingleSelectWithFilter extends React.Component<Props, State> {
    static defaultProps: DefaultProps = {
        selectedValue: "2",
        opened: false,
    };

    state: State = {
        selectedValue: this.props.selectedValue,
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
        width: "600px",
    },
    centered: {
        alignItems: "center",
        justifyContent: "center",
        height: `calc(100vh - 16px)`,
    },
    scrollableArea: {
        height: "200vh",
    },
});

export const WithFilter: StoryComponentType = () => <SingleSelectWithFilter />;

WithFilter.parameters = {
    chromatic: {
        // we don't need screenshots because this story only tests behavior.
        disableSnapshot: true,
    },
};

export const WithFilterOpened: StoryComponentType = () => (
    <SingleSelectWithFilter opened={true} />
);

export const WithFilterOpenedNoValueSelected: StoryComponentType = () => (
    <SingleSelectWithFilter opened={true} selectedValue={null} />
);

export const DropdownInModal: StoryComponentType = () => {
    const [value, setValue] = React.useState(null);
    const [opened, setOpened] = React.useState(true);

    const modalContent = (
        <View style={styles.scrollableArea}>
            <View>
                <Body>
                    Sometimes we want to include Dropdowns inside a Modal, and
                    these controls can be accessed only by scrolling down. This
                    example help us to demonstrate that SingleSelect components
                    can correctly be displayed within the visible scrolling
                    area.
                </Body>
                <Strut size={Spacing.large_24} />
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

    const modal = (
        <OnePaneDialog title="Dropdown in a Modal" content={modalContent} />
    );

    return (
        <View style={styles.centered}>
            <ModalLauncher modal={modal}>
                {({openModal}) => (
                    <Button onClick={openModal}>Click here!</Button>
                )}
            </ModalLauncher>
        </View>
    );
};

DropdownInModal.storyName = "Dropdown in a modal";

DropdownInModal.parameters = {
    chromatic: {
        // We don't need screenshots because this story can be tested after
        // the modal is opened.
        disableSnapshot: true,
    },
};

export const DisabledSingleSelect: StoryComponentType = () => (
    <SingleSelect
        disabled={true}
        placeholder="Choose a juice"
        onChange={() => {}}
    >
        <OptionItem label="Banana juice" value="banana" />
        <OptionItem label="Strawberry juice" value="strawberry" />
    </SingleSelect>
);

DisabledSingleSelect.parameters = {
    docs: {
        storyDescription:
            "`SingleSelect` can be disabled by passing `disabled={true}`. This can be useful when you want to disable a control temporarily.",
    },
};
