/* eslint-disable no-console */
import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";
import {expect, userEvent, within} from "storybook/test";
import {useArgs} from "storybook/preview-api";
import {action} from "storybook/actions";

import {View} from "@khanacademy/wonder-blocks-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {
    ActionItem,
    ActionMenu,
    OptionItem,
    SeparatorItem,
} from "@khanacademy/wonder-blocks-dropdown";

import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import actionMenuArgtypes from "./action-menu.argtypes";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-dropdown/package.json";

import type {Item} from "../../packages/wonder-blocks-dropdown/src/util/types";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {ModalLauncher, OnePaneDialog} from "@khanacademy/wonder-blocks-modal";
import Button from "@khanacademy/wonder-blocks-button";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {StatusBadge} from "@khanacademy/wonder-blocks-badge";

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

/**
 * A menu that consists of various types of items.
 *
 * ### Usage
 *
 * ```tsx
 * import {ActionMenu, ActionItem} from "@khanacademy/wonder-blocks-dropdown";
 *
 * <ActionMenu menuText="Menu">
 *  <ActionItem href="/profile" label="Profile" />
 *  <ActionItem label="Settings" onClick={() => {}} />
 * </ActionMenu>
 * ```
 */
export default {
    title: "Packages / Dropdown / ActionMenu",
    component: ActionMenu,
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
    },
} as Meta<typeof ActionMenu>;

const styles = StyleSheet.create({
    example: {
        background: semanticColor.core.background.base.subtle,
        padding: sizing.size_160,
    },
    exampleExtended: {
        height: 300,
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
        borderLeft: `${border.width.thick} solid ${semanticColor.status.warning.foreground}`,
        borderRadius: border.radius.radius_040,
        background: semanticColor.status.warning.background,
        color: semanticColor.core.foreground.neutral.strong,
        padding: sizing.size_160,
    },
    focused: focusStyles.focus[":focus-visible"],
    hovered: {
        textDecoration: "underline",
        cursor: "pointer",
    },
    pressed: {
        color: semanticColor.status.warning.foreground,
    },
});

type StoryComponentType = StoryObj<typeof ActionMenu>;

export const Default: StoryComponentType = {
    parameters: {
        chromatic: {
            // Disabling because this doesn't test visuals, its only showing the
            // dropdown opener closed.
            disableSnapshot: true,
        },
    },
};

/**
 * This menu shows different type of possible items in this type of menu:
 *  1. leads to a different page (the profile).
 *  2. leads to the teacher dashboard.
 *  3. has an onClick callback, which could be used for conversion logging.
 *  4. is a disabled item.
 *  5. is a separator.
 *  6. leads to the logout link.
 *
 * This menu is also left-aligned.
 */
export const RightAligned: StoryComponentType = {
    args: {
        alignment: "right",
    } as Partial<typeof ActionMenu>,
    parameters: {
        chromatic: {
            // Disabling because this doesn't test visuals, its only showing the
            // dropdown opener closed.
            disableSnapshot: true,
        },
    },
    decorators: [
        (Story: any): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={styles.rowRight}>{Story()}</View>
        ),
    ],
};

/**
 * The text in the menu opener should be truncated with ellipsis at the end and
 * the down caret should be the same size as it is for the other examples.
 */
export const TruncatedOpener: StoryComponentType = {
    args: {
        style: {width: 100},
    } as Partial<typeof ActionMenu>,
};

/**
 * The following menu demonstrates a hybrid menu with both action items and
 * items that can toggle to change the state of the application. The user of
 * this menu must keep track of the state of the selected items.
 */
export const WithOptionItems: StoryComponentType = {
    render: function Render() {
        const [selectedValues, setSelectedValues] = React.useState<
            Array<string>
        >([]);
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
                    onClick={() =>
                        console.log(`Show homework assignments toggled`)
                    }
                />
                <OptionItem
                    label="Show in-class assignments"
                    value="in-class"
                    onClick={() =>
                        console.log(`Show in-class assignments toggled`)
                    }
                />
            </ActionMenu>
        );
    },
    parameters: {
        chromatic: {
            // Disabling because this doesn't test visuals, its only showing the
            // dropdown opener closed.
            disableSnapshot: true,
        },
    },
};

/**
 * Empty menus are disabled automatically.
 */
export const EmptyMenu: StoryComponentType = {
    render: () => <ActionMenu menuText="Empty" />,
};

/**
 * This example shows how we can add custom styles to the dropdown menu.
 */
export const CustomDropdownStyle: StoryComponentType = {
    name: "Custom dropdownStyle",
    args: {
        dropdownStyle: styles.dropdown,
    } as Partial<typeof ActionMenu>,
    parameters: {
        chromatic: {
            // Disabling because this doesn't test visuals.
            disableSnapshot: true,
        },
    },
};

/**
 * Sometimes you'll want to trigger a dropdown programmatically. This can be
 * done by setting a value to the opened prop (true or false). In this situation
 * the ActionMenu is a controlled component. The parent is responsible for
 * managing the opening/closing of the dropdown when using this prop.
 *
 * This means that you'll also have to update opened to the value triggered by
 * the onToggle prop.
 */
export const Controlled: StoryComponentType = {
    render: function Render() {
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
    },
    parameters: {
        chromatic: {
            // Disabling because this doesn't test visuals.
            disableSnapshot: true,
        },
    },
};

/**
 * In case you need to use a custom opener, you can use the opener property to
 * achieve this. In this example, the opener prop accepts a function with the
 * following arguments:
 *  - `eventState`: lets you customize the style for different states, such as
 *    pressed, hovered and focused.
 *  - `text`: Passes the menu label defined in the parent component. This value
 *    is passed using the placeholder prop set in the ActionMenu component.
 *  - `opened`: Whether the dropdown is opened.
 *
 * **Note:** If you need to use a custom ID for testing the opener, make sure to
 * pass the testId prop inside the opener component/element.
 *
 * **Accessibility:** When a custom opener is used, the following attributes are
 * added automatically: `aria-expanded`, `aria-haspopup`, and `aria-controls`.
 */

export const CustomOpener: StoryComponentType = {
    name: "With custom opener",
    args: {
        opener: ({focused, hovered, pressed, text}: any) => (
            <BodyText
                weight="bold"
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
                role="button"
            >
                {text}
            </BodyText>
        ),
    } as Partial<typeof ActionMenu>,
};

/**
 * Sometimes you may want to align the dropdown somewhere besides below the
 * opener. In these cases, you can specify any valid popper placement as the
 * alignment.
 */
export const WithPopperPlacement: StoryComponentType = {
    name: "With popper placement",
    render: function Render(args) {
        const [opened, setOpened] = React.useState(false);

        React.useEffect(() => {
            setOpened(true);
        }, []);

        return (
            <ActionMenu {...args} opened={opened} onToggle={setOpened}>
                {actionItems.map((actionItem, index) => actionItem)}
            </ActionMenu>
        );
    },
    args: {
        alignment: "right-start",
        opener: ({text}: any) => (
            <Button endIcon={IconMappings.caretRight}>{text}</Button>
        ),
    } as Partial<typeof ActionMenu>,
};

/**
 * You can use the `lang` attribute to specify the language of the action
 * item(s). This is useful if you want to avoid issues with Screen Readers
 * trying to read the proper language for the rendered text.
 */
export const ActionMenuWithLang: StoryComponentType = {
    name: "Using the lang attribute",
    render: () => (
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
    ),
    parameters: {
        chromatic: {
            disableSnapshot: true,
        },
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
 * ActionItem internally uses the `DetailCell` component, which is a component
 * that allows you to pass:
 *
 * - `subtitle1`: a subtitle before the label
 * - `subtitle2`: a subtitle after the label
 * - `leftAccessory`: An accessory at the start of the item.
 * - `rightAccessory`: An accessory at the end of the item.
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
                subtitle2="Click to set a date"
                onClick={action("Set date clicked")}
            />,
            <ActionItem
                key="2"
                horizontalRule="full-width"
                label="Edit"
                disabled
                lang="es"
                leftAccessory={
                    <PhosphorIcon
                        icon={IconMappings.pencilSimple}
                        size="medium"
                    />
                }
                subtitle2="Edit this item"
                onClick={action("Edit clicked!")}
            />,
            <ActionItem
                key="3"
                label="Preferences"
                horizontalRule="full-width"
                leftAccessory={
                    <PhosphorIcon icon={IconMappings.gear} size="medium" />
                }
                subtitle2="Change your preferences"
                onClick={action("preferences clicked!")}
            />,
            <ActionItem
                key="4"
                label={<BodyText weight="bold">User profile</BodyText>}
                horizontalRule="full-width"
                leftAccessory={
                    <PhosphorIcon icon={IconMappings.info} size="medium" />
                }
                rightAccessory={<StatusBadge label="New" kind="info" />}
                subtitle2="View your profile"
                onClick={action("user profile clicked!")}
                style={{
                    [":hover [data-testid=new-pill]" as any]: {
                        backgroundColor:
                            semanticColor.core.background.base.default,
                        color: semanticColor.status.notice.foreground,
                    },
                }}
            />,
            <OptionItem
                key="5"
                label="Show homework assignments"
                subtitle2="Click to show homework assignments"
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
    decorators: [
        (Story): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={[styles.example, styles.exampleExtended]}>
                <Story />
            </View>
        ),
    ],
    play: async ({canvasElement}) => {
        // Arrange
        // NOTE: Using `body` here to work with React Portals.
        const canvas = within(canvasElement.ownerDocument.body);

        // Act
        await userEvent.click(canvas.getByRole("button"));

        // Assert
        const actionMenu = await canvas.findByRole("menu");
        expect(actionMenu).toBeInTheDocument();
    },
};

/**
 * This example shows how to use the ActionMenu with a modal. The modal is
 * opened when the user presses the "Open modal" action item. This could be done
 * by pressing `Enter`/`Space` when the opener is focused.
 *
 * Use the keyboard to navigate to the "Open modal" action item and press
 * `Enter` or `Space` to open the modal.
 *
 * Then navigate on the modal by pressing Tab and `Shift` + `Tab`.
 */
export const OpeningModal: StoryComponentType = {
    name: "Opening a Modal",
    render: function Render(args) {
        const [opened, setOpened] = React.useState(false);

        return (
            <>
                <ActionMenu {...args}>
                    <ActionItem
                        key="1"
                        label="Profile"
                        href="http://khanacademy.org/profile"
                        target="_blank"
                        testId="profile"
                    />
                    <ActionItem
                        key="2"
                        label="Open modal"
                        testId="modal"
                        onClick={() => {
                            console.log("open modal");
                            setOpened(true);
                        }}
                    />
                </ActionMenu>
                <ModalLauncher
                    onClose={() => {
                        setOpened(false);
                    }}
                    opened={opened}
                    modal={({closeModal}) => (
                        <OnePaneDialog
                            title="Are you sure?"
                            content="This is just a test"
                            style={{maxHeight: "fit-content"}}
                            footer={
                                <View
                                    style={{
                                        flexDirection: "row",
                                        gap: sizing.size_160,
                                    }}
                                >
                                    <Button
                                        kind="tertiary"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        actionType="destructive"
                                        onClick={closeModal}
                                    >
                                        Delete
                                    </Button>
                                </View>
                            }
                        />
                    )}
                />
            </>
        );
    },
    args: {
        opener: () => (
            <IconButton
                aria-label="Actions"
                kind="tertiary"
                actionType="neutral"
                icon={IconMappings.dotsThreeBold}
            />
        ),
    } as Partial<typeof ActionMenu>,
    parameters: {
        chromatic: {
            // Disabling because this doesn't test visuals.
            disableSnapshot: true,
        },
    },
};

/**
 * This example shows how to use `aria-label` on the ActionMenu opener and
 * `ActionItem` children. This is especially useful if you do **not** have a
 * visible label component but want to ensure accessibility. For more details,
 * see the [accessibility documentation](./?path=/docs/packages-dropdown-actionmenu-accessibility--docs).
 *
 * As you can see, the `ActionMenu` opener visually shows the selected item, but
 * the `aria-label` attribute on the opener provides a more descriptive label
 * for the action menu.
 *
 * **NOTE:** Make sure to include relevant information in `aria-label` if the
 * ActionMenu is used to select an item from a list.
 */
export const AriaLabel: StoryComponentType = {
    render: function Render(args) {
        const [selectedItem, setSelectedItem] = React.useState<string | null>(
            null,
        );

        const classOptions = [
            {
                label: "Math",
                ariaLabel: "Select Math class",
            },
            {
                label: "Science",
                ariaLabel: "Select Science class",
            },
            {
                label: "History",
                ariaLabel: "Select History class",
            },
        ];

        return (
            <ActionMenu
                {...args}
                aria-label={
                    selectedItem
                        ? `${selectedItem} - List of classes`
                        : "List of classes"
                }
                opener={() => (
                    <Button endIcon={IconMappings.caretDown}>
                        {selectedItem ? selectedItem : "List of classes"}
                    </Button>
                )}
            >
                {classOptions.map((opt) => (
                    <ActionItem
                        key={opt.label}
                        label={opt.label}
                        aria-label={opt.ariaLabel}
                        onClick={() => {
                            setSelectedItem(opt.label);
                            action(`Selected ${opt.label}`);
                        }}
                    />
                ))}
            </ActionMenu>
        );
    },
    parameters: {
        chromatic: {
            // Disabling because this doesn't test visuals.
            disableSnapshot: true,
        },
    },
};
