/* eslint-disable no-console */
import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";
import {useArgs} from "@storybook/preview-api";
import {action} from "@storybook/addon-actions";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import Pill from "@khanacademy/wonder-blocks-pill";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {
    ActionItem,
    ActionMenu,
    OptionItem,
    SeparatorItem,
} from "@khanacademy/wonder-blocks-dropdown";

import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import actionMenuArgtypes from "./action-menu.argtypes";
import ComponentInfo from "../../.storybook/components/component-info";
import packageConfig from "../../packages/wonder-blocks-dropdown/package.json";

import type {Item} from "../../packages/wonder-blocks-dropdown/src/util/types";

const actionItems: Array<Item> = [
    <ActionItem
        key="1"
        label="Profile"
        href="http://khanacademy.org/profile"
        target="_blank"
        testId="profile"
    />,
    <ActionItem
        key="2"
        label="Teacher dashboard"
        href="http://khanacademy.org/coach/dashboard"
        testId="dashboard"
    />,
    <ActionItem
        key="3"
        label="Settings (onClick)"
        onClick={() => console.log("user clicked on settings")}
        testId="settings"
    />,
    <ActionItem
        key="4"
        label="Help"
        disabled={true}
        onClick={() => console.log("this item is disabled...")}
        testId="help"
    />,
    <ActionItem
        key="5"
        label="Feedback"
        disabled={true}
        href="/feedback"
        testId="feedback"
    />,
    <SeparatorItem key="6" />,
    <ActionItem
        key="7"
        label="Log out"
        href="http://khanacademy.org/logout"
        testId="logout"
    />,
];

const defaultArgs = {
    alignment: "left",
    disabled: false,
    menuText: "Betsy Appleseed",
    onChange: () => {},
    selectedValues: [],
    testId: "",
    dropdownStyle: {},
    style: {},
    className: "",
    children: actionItems.map((actionItem, index) => actionItem),
};

export default {
    title: "Dropdown / ActionMenu",
    // TODO(FEI-5000): Fix this type.
    component: ActionMenu as unknown as React.ComponentType<any>,
    subcomponents: {ActionItem},
    argTypes: actionMenuArgtypes,
    args: defaultArgs,
    decorators: [
        (Story): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={styles.example}>
                <Story />
            </View>
        ),
    ],
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
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
} as Meta<typeof ActionMenu>;

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

type StoryComponentType = StoryObj<typeof ActionMenu>;

export const Default: StoryComponentType = {};

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
export const RightAligned: StoryComponentType = {
    args: {
        alignment: "right",
    } as Partial<typeof ActionMenu>,
};

RightAligned.decorators = [
    (Story: any): React.ReactElement<React.ComponentProps<typeof View>> => (
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
export const TruncatedOpener: StoryComponentType = {
    args: {
        style: {width: 100},
    } as Partial<typeof ActionMenu>,
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
    const [selectedValues, setSelectedValues] = React.useState<Array<string>>(
        [],
    );
    const [showHiddenOption, setShowHiddenOption] = React.useState(false);

    const handleChange = (selectedItems: Array<string>) => {
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
export const CustomDropdownStyle: StoryComponentType = {
    name: "Custom dropdownStyle",
    args: {
        dropdownStyle: styles.dropdown,
    } as Partial<typeof ActionMenu>,
};

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

export const CustomOpener: StoryComponentType = {
    args: {
        opener: ({focused, hovered, pressed, text}: any) => (
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
    } as Partial<typeof ActionMenu>,
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

/**
 * ActionMenu can be used with custom action items. This is useful when you
 * want to use more rich action items, such as the ones used in context menus.
 *
 * ActionItem internally uses the `CompactCell` component, which is a component
 * that allows you to pass left and right accessories.
 */
export const CustomActionItems: StoryComponentType = {
    args: {
        menuText: "Custom Action Items",
        children: [
            <ActionItem
                key="1"
                horizontalRule="full-width"
                label="Set date"
                leftAccessory={
                    <PhosphorIcon icon={IconMappings.calendar} size="medium" />
                }
                onClick={action("Set date clicked")}
            />,
            <ActionItem
                key="2"
                horizontalRule="full-width"
                label="Edit"
                lang="es"
                leftAccessory={
                    <PhosphorIcon
                        icon={IconMappings.pencilSimple}
                        size="medium"
                    />
                }
                onClick={action("Edit clicked!")}
            />,
            <ActionItem
                key="3"
                label="Preferences"
                horizontalRule="full-width"
                leftAccessory={
                    <PhosphorIcon icon={IconMappings.gear} size="medium" />
                }
                onClick={action("preferences clicked!")}
            />,
            <ActionItem
                key="4"
                disabled
                label={<LabelLarge>User profile</LabelLarge>}
                horizontalRule="full-width"
                leftAccessory={
                    <PhosphorIcon icon={IconMappings.info} size="medium" />
                }
                rightAccessory={
                    <Pill kind="accent" size="small" testId="new-pill">
                        New
                    </Pill>
                }
                onClick={action("user profile clicked!")}
                style={{
                    [":hover [data-test-id=new-pill]" as any]: {
                        backgroundColor: Color.white,
                        color: Color.blue,
                    },
                }}
            />,
            <OptionItem
                key="5"
                label="Show homework assignments"
                value="homework"
                onClick={() => console.log(`Show homework assignments toggled`)}
            />,
        ],
    } as Partial<typeof ActionMenu>,
    render: function Render(args) {
        const [{selectedValues}, updateArgs] = useArgs();
        const handleChange = (selectedItems: Array<string>) => {
            updateArgs({selectedValues: selectedItems});
        };

        return (
            <ActionMenu
                {...args}
                menuText="Custom Action Items"
                onChange={handleChange}
                selectedValues={selectedValues}
            />
        );
    },
};
