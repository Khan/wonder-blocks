/* eslint-disable no-console */
// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {StoryComponentType} from "@storybook/react";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {
    ActionItem,
    ActionMenu,
    OptionItem,
    SeparatorItem,
} from "@khanacademy/wonder-blocks-dropdown";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";

import actionMenuArgtypes from "./action-menu.argtypes.js";
import ComponentInfo from "../../../../../.storybook/components/component-info.js";
import {name, version} from "../../../package.json";

import type {Item} from "../../util/types.js";

type ActionMenuProps = React.ElementProps<typeof ActionMenu>;

const defaultArgs: ActionMenuProps = {
    alignment: "left",
    disabled: false,
    menuText: "Betsy Appleseed",
    onChange: (selectedItems) => {},
    selectedValues: [],
    testId: "",
    dropdownStyle: {},
    style: {},
    className: "",
};

export default {
    title: "Dropdown / ActionMenu",
    component: ActionMenu,
    subcomponents: {ActionItem},
    argTypes: actionMenuArgtypes,
    args: defaultArgs,
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
});

const actionItems: Array<Item> = [
    <ActionItem
        label="Profile"
        href="http://khanacademy.org/profile"
        target="_blank"
        testId="profile"
    />,
    <ActionItem
        label="Teacher dashboard"
        href="http://khanacademy.org/coach/dashboard"
        testId="dashboard"
    />,
    <ActionItem
        label="Settings (onClick)"
        onClick={() => console.log("user clicked on settings")}
        testId="settings"
    />,
    <ActionItem
        label="Help"
        disabled={true}
        onClick={() => console.log("this item is disabled...")}
        testId="help"
    />,
    <ActionItem
        label="Feedback"
        disabled={true}
        href="/feedback"
        testId="feedback"
    />,
    <SeparatorItem />,
    <ActionItem
        label="Log out"
        href="http://khanacademy.org/logout"
        testId="logout"
    />,
];

const Template = (args) => (
    <ActionMenu {...args}>
        {actionItems.map((actionItem, index) => actionItem)}
    </ActionMenu>
);

export const Default: StoryComponentType = Template.bind({});

Default.parameters = {
    chromatic: {
        // Disabling because this doesn't test visuals, its only showing the
        // dropdown opener closed.
        disableSnapshot: true,
    },
};

/**
 * Right-aligned action menu.
 */
export const RightAligned: StoryComponentType = (args) => (
    <ActionMenu {...args} alignment="right">
        {actionItems.map((actionItem, index) => actionItem)}
    </ActionMenu>
);

RightAligned.decorators = [
    (Story): React.Element<typeof View> => (
        <View style={styles.rowRight}>{Story()}</View>
    ),
];

RightAligned.parameters = {
    docs: {
        description: {
            story:
                "This menu shows different type of possible items in this type of menu:\n" +
                "1. leads to a different page (the profile).\n" +
                "2. leads to the teacher dashboard.\n" +
                "3. has an onClick callback, which could be used for conversion logging.\n" +
                "4. is a disabled item.\n" +
                "5. is a separator.\n" +
                "6. leads to the logout link.\n\n" +
                "This menu is also right-aligned.",
        },
    },
    chromatic: {
        // Disabling because this doesn't test visuals, its only showing the
        // dropdown opener closed.
        disableSnapshot: true,
    },
};

/**
 * Menu with truncated text.
 */
export const TruncatedOpener: StoryComponentType = Template.bind({});

TruncatedOpener.args = {
    style: {width: 100},
};

TruncatedOpener.parameters = {
    docs: {
        description: {
            story: "The text in the menu opener should be truncated with ellipsis at the end and the down caret should be the same size as it is for the other examples.",
        },
    },
};

/**
 * With option items
 */
export const WithOptionItems: StoryComponentType = () => {
    const [selectedValues, setSelectedValues] = React.useState([]);
    const [showHiddenOption, setShowHiddenOption] = React.useState(false);

    const handleChange = (selectedItems) => {
        setSelectedValues(selectedItems);
        setShowHiddenOption(selectedItems.includes("in-class"));
    };

    return (
        <ActionMenu
            menuText="Assignments"
            onChange={handleChange}
            selectedValues={selectedValues}
        >
            <ActionItem
                label="Create..."
                onClick={() => console.log("create action")}
            />
            <ActionItem
                label="Edit..."
                disabled={true}
                onClick={() => console.log("edit action")}
            />
            <ActionItem
                label="Delete"
                disabled={true}
                onClick={() => console.log("delete action")}
            />
            {showHiddenOption && (
                <ActionItem
                    label="Hidden menu for class"
                    disabled={!showHiddenOption}
                    onClick={() => console.log("hidden menu is clicked!")}
                />
            )}
            <SeparatorItem />
            <OptionItem
                label="Show homework assignments"
                value="homework"
                onClick={() => console.log(`Show homework assignments toggled`)}
            />
            <OptionItem
                label="Show in-class assignments"
                value="in-class"
                onClick={() => console.log(`Show in-class assignments toggled`)}
            />
        </ActionMenu>
    );
};

WithOptionItems.parameters = {
    docs: {
        description: {
            story: "The following menu demonstrates a hybrid menu with both action items and items that can toggle to change the state of the application. The user of this menu must keep track of the state of the selected items.",
        },
    },
    chromatic: {
        // Disabling because this doesn't test visuals, its only showing the
        // dropdown opener closed.
        disableSnapshot: true,
    },
};

/**
 * Empty menu
 */
export const EmptyMenu: StoryComponentType = () => (
    <ActionMenu menuText="Empty" />
);

EmptyMenu.parameters = {
    docs: {
        description: {
            story: "Empty menus are disabled automatically.",
        },
    },
};

/**
 * Custom dropdownStyle
 */
export const CustomDropdownStyle: StoryComponentType = Template.bind({});

CustomDropdownStyle.args = {
    dropdownStyle: styles.dropdown,
};

CustomDropdownStyle.storyName = "Custom dropdownStyle";

CustomDropdownStyle.parameters = {
    docs: {
        description: {
            story: "This example shows how we can add custom styles to the dropdown menu.",
        },
    },
    chromatic: {
        // Disabling because this doesn't test visuals.
        disableSnapshot: true,
    },
};

/**
 * Controlled ActionMenu
 */
export const Controlled: StoryComponentType = () => {
    const [opened, setOpened] = React.useState(false);

    return (
        <View style={styles.row}>
            <Checkbox
                label="Click to toggle"
                onChange={setOpened}
                checked={opened}
            />
            <ActionMenu
                menuText="Betsy Appleseed"
                opened={opened}
                onToggle={setOpened}
            >
                {actionItems.map((actionItem, index) => actionItem)}
            </ActionMenu>
        </View>
    );
};

Controlled.parameters = {
    docs: {
        description: {
            story:
                "Sometimes you'll want to trigger a dropdown programmatically. This can be done by setting a value to the opened prop (true or false). In this situation the ActionMenu is a controlled component. The parent is responsible for managing the opening/closing of the dropdown when using this prop.\n" +
                "This means that you'll also have to update opened to the value triggered by the onToggle prop.",
        },
    },
    chromatic: {
        // Disabling because this doesn't test visuals.
        disableSnapshot: true,
    },
};

/**
 * With custom opener
 */

export const CustomOpener: StoryComponentType = Template.bind({});

CustomOpener.args = {
    opener: ({focused, hovered, pressed, text}) => (
        <LabelLarge
            onClick={() => {
                console.log("custom click!!!!!");
            }}
            testId="teacher-menu-custom-opener"
            style={[
                styles.customOpener,
                focused && styles.focused,
                hovered && styles.hovered,
                pressed && styles.pressed,
            ]}
        >
            {text}
        </LabelLarge>
    ),
};

CustomOpener.storyName = "With custom opener";

CustomOpener.parameters = {
    docs: {
        description: {
            story:
                "In case you need to use a custom opener, you can use the opener property to achieve this. In this example, the opener prop accepts a function with the following arguments:\n" +
                "- `eventState`: lets you customize the style for different states, such as pressed, hovered and focused.\n" +
                "- `text`: Passes the menu label defined in the parent component. This value is passed using the placeholder prop set in the ActionMenu component.\n\n" +
                "**Note:** If you need to use a custom ID for testing the opener, make sure to pass the testId prop inside the opener component/element.",
        },
    },
};

/**
 * Action menu items with lang attribute.
 */
export const ActionMenuWithLang: StoryComponentType = () => (
    <ActionMenu menuText="Locales">
        {locales.map((locale) => (
            <ActionItem
                key={locale.locale}
                label={locale.localName}
                lang={locale.locale}
                testId={"language_picker_" + locale.locale}
            />
        ))}
    </ActionMenu>
);

ActionMenuWithLang.storyName = "Using the lang attribute";

ActionMenuWithLang.parameters = {
    docs: {
        storyDescription:
            "You can use the `lang` attribute to specify the language of the action item(s). This is useful if you want to avoid issues with Screen Readers trying to read the proper language for the rendered text.",
    },
    chromatic: {
        disableSnapshot: true,
    },
};

const locales = [
    {id: "az", locale: "az", localName: "Azərbaycanca"},
    {id: "id", locale: "id", localName: "Bahasa Indonesia"},
    {id: "cs", locale: "cs", localName: "čeština"},
    {id: "da", locale: "da", localName: "dansk"},
    {id: "de", locale: "de", localName: "Deutsch"},
    {id: "en", locale: "en", localName: "English"},
    {id: "es", locale: "es", localName: "español"},
    {id: "fr", locale: "fr", localName: "français"},
    {id: "it", locale: "it", localName: "italiano"},
];
