// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Button from "@khanacademy/wonder-blocks-button";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {OnePaneDialog, ModalLauncher} from "@khanacademy/wonder-blocks-modal";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Body, HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import type {StoryComponentType} from "@storybook/react";

import {
    SingleSelect,
    OptionItem,
    SeparatorItem,
} from "@khanacademy/wonder-blocks-dropdown";
import ComponentInfo from "../../../../../.storybook/components/component-info.js";
import {name, version} from "../../../package.json";
import singleSelectArgtypes from "./single-select.argtypes.js";

export default {
    title: "Dropdown / SingleSelect",
    component: SingleSelect,
    subcomponents: {OptionItem, SeparatorItem},
    argTypes: singleSelectArgtypes,
    args: {
        isFilterable: true,
        opened: false,
        disabled: false,
        light: false,
        placeholder: "Choose a fruit",
        selectedValue: "",
    },
    decorators: [
        (Story: StoryComponentType): React.Element<typeof View> => (
            <View style={styles.example}>
                <Story />
            </View>
        ),
    ],
    parameters: {
        componentSubtitle: ((
            <ComponentInfo name={name} version={version} />
        ): any),
        docs: {
            description: {
                component: null,
            },
            source: {
                // See https://github.com/storybookjs/storybook/issues/12596
                excludeDecorators: true,
            },
        },
    },
};

const styles = StyleSheet.create({
    example: {
        background: Color.offWhite,
        padding: Spacing.medium_16,
    },
    rowRight: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    dropdown: {
        maxHeight: 200,
    },
    /**
     * Custom opener styles
     */
    customOpener: {
        borderLeft: `5px solid ${Color.blue}`,
        borderRadius: Spacing.xxxSmall_4,
        background: Color.lightBlue,
        color: Color.white,
        padding: Spacing.medium_16,
    },
    focused: {
        color: Color.offWhite,
    },
    hovered: {
        textDecoration: "underline",
        color: Color.offWhite,
        cursor: "pointer",
    },
    pressed: {
        color: Color.blue,
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
    /**
     * Dark
     */
    darkBackgroundWrapper: {
        flexDirection: "row",
        justifyContent: "flex-end",
        backgroundColor: Color.darkBlue,
        width: "100%",
        height: 200,
        paddingRight: Spacing.medium_16,
        paddingTop: Spacing.medium_16,
    },
});

const items = [
    <OptionItem label="Banana" value="banana" />,
    <OptionItem label="Strawberry" value="strawberry" disabled />,
    <OptionItem label="Pear" value="pear" />,
    <OptionItem label="Orange" value="orange" />,
    <OptionItem label="Watermelon" value="watermelon" />,
    <OptionItem label="Apple" value="apple" />,
    <OptionItem label="Grape" value="grape" />,
    <OptionItem label="Lemon" value="lemon" />,
    <OptionItem label="Mango" value="mango" />,
];

const Template = (args) => {
    const [selectedValue, setSelectedValue] = React.useState(
        args.selectedValue,
    );
    const [opened, setOpened] = React.useState(args.opened);
    React.useEffect(() => {
        // Only update opened if the args.opened prop changes (using the
        // controls panel).
        setOpened(args.opened);
    }, [args.opened]);

    return (
        <SingleSelect
            {...args}
            onChange={setSelectedValue}
            selectedValue={selectedValue}
            opened={opened}
            onToggle={setOpened}
        >
            {items}
        </SingleSelect>
    );
};

export const Default: StoryComponentType = Template.bind({});

/**
 * Controlled SingleSelect
 */
export const ControlledOpened: StoryComponentType = (args) => {
    const [selectedValue, setSelectedValue] = React.useState("pear");
    const [opened, setOpened] = React.useState(args.opened);
    React.useEffect(() => {
        // Only update opened if the args.opened prop changes (using the
        // controls panel).
        setOpened(args.opened);
    }, [args.opened]);

    return (
        <SingleSelect
            {...args}
            onChange={setSelectedValue}
            selectedValue={selectedValue}
            opened={opened}
            onToggle={setOpened}
        >
            {items}
        </SingleSelect>
    );
};

ControlledOpened.args = {
    opened: true,
};

ControlledOpened.storyName = "Controlled (opened)";

ControlledOpened.parameters = {
    docs: {
        description: {
            story:
                "Sometimes you'll want to trigger a dropdown programmatically. This can be done by setting a value to the `opened` prop (`true` or `false`). In this situation the `SingleSelect` is a controlled component. The parent is responsible for managing the opening/closing of the dropdown when using this prop.\n\n" +
                "This means that you'll also have to update `opened` to the value triggered by the `onToggle` prop.",
        },
    },
    // Added to ensure that the dropdown menu is rendered using PopperJS.
    chromatic: {delay: 400},
};

/**
 * Disabled
 */
export const Disabled: StoryComponentType = (args) => (
    <SingleSelect
        {...args}
        onChange={() => {}}
        selectedValue=""
        disabled={true}
    >
        {items}
    </SingleSelect>
);

Disabled.parameters = {
    docs: {
        description: {
            story: "This select is disabled and cannot be interacted with.",
        },
    },
};

/**
 * On dark background, right-aligned
 */
export const Light: StoryComponentType = (args) => {
    const [selectedValue, setSelectedValue] = React.useState("pear");

    return (
        <View style={styles.row}>
            <View style={styles.darkBackgroundWrapper}>
                <SingleSelect
                    alignment="right"
                    light={true}
                    onChange={setSelectedValue}
                    placeholder="Choose a drink"
                    selectedValue={selectedValue}
                >
                    <OptionItem
                        label="Regular milk tea with boba"
                        value="regular"
                    />
                    <OptionItem
                        label="Wintermelon milk tea with boba"
                        value="wintermelon"
                    />
                    <OptionItem
                        label="Taro milk tea, half sugar"
                        value="taro"
                    />
                </SingleSelect>
            </View>
        </View>
    );
};

Light.parameters = {
    docs: {
        description: {
            story: "This single select is on a dark background and is also right-aligned.",
        },
    },
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
    selectedValue?: ?string,
    opened?: boolean,
|};

function VirtualizedSingleSelect(props: Props) {
    const [selectedValue, setSelectedValue] = React.useState(
        props.selectedValue,
    );
    const [opened, setOpened] = React.useState(props.opened || false);

    return (
        <View style={styles.wrapper}>
            <SingleSelect
                onChange={setSelectedValue}
                isFilterable={true}
                opened={opened}
                onToggle={setOpened}
                placeholder="Select a fruit"
                selectedValue={selectedValue}
                dropdownStyle={styles.fullBleed}
                style={styles.fullBleed}
            >
                {optionItems}
            </SingleSelect>
        </View>
    );
}

/**
 * Virtualized SingleSelect
 */
export const VirtualizedFilterable: StoryComponentType = () => (
    <VirtualizedSingleSelect />
);

VirtualizedFilterable.storyName = "Virtualized (isFilterable)";

VirtualizedFilterable.parameters = {
    docs: {
        description: {
            story: "When there are many options, you could use a search filter in the SingleSelect. The search filter will be performed toward the labels of the option items. Note that this example shows how we can add custom styles to the dropdown as well.",
        },
    },
    chromatic: {
        // we don't need screenshots because this story only tests behavior.
        disableSnapshot: true,
    },
};

export const VirtualizedOpened: StoryComponentType = () => (
    <VirtualizedSingleSelect opened={true} />
);

VirtualizedOpened.storyName = "Virtualized (opened)";

VirtualizedOpened.parameters = {
    docs: {
        description: {
            story: "This example shows how to use the `opened` prop to open the dropdown.",
        },
    },
};

export const VirtualizedOpenedNoSelection: StoryComponentType = () => (
    <VirtualizedSingleSelect opened={true} selectedValue={null} />
);

VirtualizedOpenedNoSelection.storyName = "Virtualized (opened, no selection)";

VirtualizedOpenedNoSelection.parameters = {
    docs: {
        description: {
            story: "This example shows how the focus is set to the search field if there's no current selection.",
        },
    },
};

/**
 * Inside a modal
 */
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
    docs: {
        description: {
            story: "Sometimes we want to include Dropdowns inside a Modal, and these controls can be accessed only by scrolling down. This example help us to demonstrate that `SingleSelect` components can correctly be displayed within the visible scrolling area.",
        },
    },
    chromatic: {
        // We don't need screenshots because this story can be tested after
        // the modal is opened.
        disableSnapshot: true,
    },
};

/**
 * Custom opener
 */
export const CustomOpener: StoryComponentType = Template.bind({});

CustomOpener.args = {
    selectedValue: "",
    opener: ({focused, hovered, pressed, text}) => (
        <HeadingLarge
            onClick={() => {
                // eslint-disable-next-line no-console
                console.log("custom click!!!!!");
            }}
            style={[
                styles.customOpener,
                focused && styles.focused,
                hovered && styles.hovered,
                pressed && styles.pressed,
            ]}
        >
            {text}
        </HeadingLarge>
    ),
};

CustomOpener.storyName = "With custom opener";

CustomOpener.parameters = {
    docs: {
        description: {
            story:
                "In case you need to use a custom opener with the `SingleSelect`, you can use the opener property to achieve this. In this example, the opener prop accepts a function with the following arguments:\n" +
                "- `eventState`: lets you customize the style for different states, such as pressed, hovered and focused.\n" +
                "- `text`: Passes the menu label defined in the parent component. This value is passed using the placeholder prop set in the `SingleSelect` component.\n\n" +
                "**Note:** If you need to use a custom ID for testing the opener, make sure to pass the testId prop inside the opener component/element.",
        },
    },
};
