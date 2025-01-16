import * as React from "react";
import {StyleSheet} from "aphrodite";

import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from "@storybook/react";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";

import Button from "@khanacademy/wonder-blocks-button";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import {OnePaneDialog, ModalLauncher} from "@khanacademy/wonder-blocks-modal";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";
import {MultiSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import Pill from "@khanacademy/wonder-blocks-pill";
import type {Labels} from "@khanacademy/wonder-blocks-dropdown";

import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-dropdown/package.json";
import multiSelectArgtypes from "./multi-select.argtypes";
import {defaultLabels} from "../../packages/wonder-blocks-dropdown/src/util/constants";
import {
    allCountries,
    allProfilesWithPictures,
    locales,
    chatIcon,
} from "./option-item-examples";
import {OpenerProps} from "../../packages/wonder-blocks-dropdown/src/util/types";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";

type StoryComponentType = StoryObj<typeof MultiSelect>;

type MultiSelectArgs = Partial<typeof MultiSelect>;

/**
 * A dropdown that consists of multiple selection items. This select allows
 * multiple options to be selected. Clients are responsible for keeping track of
 * the selected items.
 *
 * The multi select stays open until closed by the user. The onChange callback
 * happens every time there is a change in the selection of the items.
 *
 * ### Usage
 *
 * ```tsx
 * import {OptionItem, MultiSelect} from "@khanacademy/wonder-blocks-dropdown";
 *
 * <MultiSelect onChange={setSelectedValues} selectedValues={selectedValues}>
 *  <OptionItem value="pear">Pear</OptionItem>
 *  <OptionItem value="mango">Mango</OptionItem>
 * </MultiSelect>
 * ```
 */
export default {
    title: "Packages / Dropdown / MultiSelect",
    component: MultiSelect as unknown as React.ComponentType<any>,
    argTypes: multiSelectArgtypes,
    args: {
        isFilterable: false,
        error: false,
        opened: false,
        disabled: false,
        light: false,
        shortcuts: false,
        implicitAllEnabled: false,
        id: "",
        testId: "",
    },
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ) as any,
        backgrounds: {
            default: "offWhite",
        },
    },
} as Meta<typeof MultiSelect>;

const styles = StyleSheet.create({
    setWidth: {
        minWidth: 170,
        width: "100%",
    },
    customDropdown: {
        maxHeight: 200,
    },
    wrapper: {
        height: "600px",
        width: "600px",
    },
    centered: {
        alignItems: "center",
        justifyContent: "center",
    },
    scrolledWrapper: {
        height: 200,
        overflow: "auto",
        border: "1px solid grey",
        borderRadius: spacing.xxxSmall_4,
        margin: spacing.xSmall_8,
        padding: spacing.medium_16,
    },
    scrollableArea: {
        height: "200vh",
    },
    /**
     * Custom opener styles
     */
    customOpener: {
        borderLeft: `${spacing.xxxSmall_4}px solid ${color.purple}`,
        borderRadius: spacing.xxxSmall_4,
        background: color.fadedPurple24,
        color: color.offBlack,
        padding: spacing.medium_16,
    },
    focused: {
        outlineColor: color.purple,
        outlineOffset: spacing.xxxxSmall_2,
    },
    hovered: {
        textDecoration: "underline",
        cursor: "pointer",
    },
    pressed: {
        color: color.blue,
    },
});

const items = [
    <OptionItem label="Mercury" value="mercury" key={1} />,
    <OptionItem label="Venus" value="venus" key={2} />,
    <OptionItem label="Earth" value="earth" disabled key={3} />,
    <OptionItem label="Mars" value="mars" key={4} />,
    <OptionItem label="Jupiter" value="jupiter" key={5} />,
    <OptionItem label="Saturn" value="saturn" key={6} />,
    <OptionItem label="Neptune" value="neptune" key={7} />,
    <OptionItem label="Uranus" value="uranus" key={8} />,
];

const Template = (args: any) => {
    const [selectedValues, setSelectedValues] = React.useState(
        args.selectedValues,
    );
    const [opened, setOpened] = React.useState(args.opened);
    React.useEffect(() => {
        // Only update opened if the args.opened prop changes (using the
        // controls panel).
        setOpened(args.opened);
    }, [args.opened]);

    return (
        <MultiSelect
            {...args}
            onChange={setSelectedValues}
            selectedValues={selectedValues}
            opened={opened}
            onToggle={setOpened}
        >
            {items}
        </MultiSelect>
    );
};

export const Default: StoryComponentType = {
    render: Template,
    parameters: {
        chromatic: {
            // We don't need screenshots b/c the dropdown is initially closed.
            disableSnapshot: true,
        },
    },
};

const ControlledWrapper = (args: any) => {
    const [selectedValues, setSelectedValues] = React.useState<Array<string>>(
        [],
    );
    const [opened, setOpened] = React.useState(Boolean(args.opened));
    React.useEffect(() => {
        // Only update opened if the args.opened prop changes (using the
        // controls panel).
        setOpened(Boolean(args.opened));
    }, [args.opened]);

    return (
        <View style={styles.wrapper}>
            <Checkbox label="Open" onChange={setOpened} checked={opened} />
            <MultiSelect
                {...args}
                onChange={setSelectedValues}
                selectedValues={selectedValues}
                opened={opened}
                onToggle={setOpened}
            >
                {items}
            </MultiSelect>
        </View>
    );
};

/**
 * Sometimes you'll want to trigger a dropdown programmatically. This can be
 * done by `MultiSelect` is a controlled component. The parent is responsible
 * for managing the opening/closing of the dropdown when using this prop.
 *
 * This means that you'll also have to update `opened` to the value triggered by
 * the `onToggle` prop.
 */
export const ControlledOpened: StoryComponentType = {
    name: "Controlled (opened)",
    render: (args) => <ControlledWrapper {...args} />,
    args: {
        opened: true,
    } as MultiSelectArgs,
    parameters: {
        // Added to ensure that the dropdown menu is rendered using PopperJS.
        chromatic: {delay: 500},
    },
};

// Custom MultiSelect labels
const dropdownLabels: Labels = {
    ...defaultLabels,
    noneSelected: "Solar system",
    someSelected: (numSelectedValues) => `${numSelectedValues} planets`,
};

/**
 * Sometimes, we may want to customize the dropdown style (for example, to limit
 * the height of the list). For this purpose, we have the `dropdownStyle` prop.
 *
 * **NOTE:** We are overriding the max height of the dropdown in this example
 * but we recommend letting the dropdown calculate its own height, as we already
 * have a max height set for the dropdown internally.
 */
export const CustomStyles: StoryComponentType = {
    render: Template,
    args: {
        labels: dropdownLabels,
        dropdownStyle: styles.customDropdown,
        style: styles.setWidth,
    } as MultiSelectArgs,
    parameters: {
        chromatic: {
            // we don't need screenshots because this story only tests behavior.
            disableSnapshot: true,
        },
    },
};

/**
 * Here you can see an example of the previous dropdown opened.
 */
export const CustomStylesOpened: StoryComponentType = {
    render: Template,
    args: {
        labels: dropdownLabels,
        dropdownStyle: styles.customDropdown,
        style: styles.setWidth,
        opened: true,
    } as MultiSelectArgs,
    name: "Custom styles (opened)",
    decorators: [
        (Story): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={styles.wrapper}>
                <Story />
            </View>
        ),
    ],
};

const ControlledMultiSelect = (
    storyArgs: PropsFor<typeof MultiSelect> & {label?: string},
) => {
    const {label, ...args} = storyArgs;
    const [opened, setOpened] = React.useState(false);
    const [selectedValues, setSelectedValues] = React.useState<string[]>(
        args.selectedValues || [],
    );
    const [errorMessage, setErrorMessage] = React.useState<
        null | string | void
    >(null);
    return (
        <LabeledField
            label={label || "MultiSelect"}
            errorMessage={
                errorMessage || (args.error && "Error from error prop")
            }
            field={
                <MultiSelect
                    {...args}
                    opened={opened}
                    onToggle={setOpened}
                    selectedValues={selectedValues}
                    onChange={setSelectedValues}
                    validate={(values) => {
                        if (values.includes("jupiter")) {
                            return "Don't pick jupiter!";
                        }
                    }}
                    onValidate={setErrorMessage}
                >
                    {items}
                </MultiSelect>
            }
        />
    );
};

/**
 * If the `error` prop is set to true, the field will have error styling and
 * `aria-invalid` set to `true`.
 *
 * This is useful for scenarios where we want to show an error on a
 * specific field after a form is submitted (server validation).
 *
 * Note: The `required` and `validate` props can also put the field in an
 * error state.
 */
export const Error: StoryComponentType = {
    render: ControlledMultiSelect,
    args: {
        error: true,
    },
    parameters: {
        chromatic: {
            // Disabling because this is covered by variants story
            disableSnapshot: true,
        },
    },
};

/**
 * A required field will have error styling and aria-invalid set to true if the
 * select is left blank.
 *
 * When `required` is set to `true`, validation is triggered:
 * - When a user tabs away from the select (opener's onBlur event)
 * - When a user closes the dropdown without selecting a value
 * (either by pressing escape, clicking away, or clicking on the opener).
 *
 * Validation errors are cleared when a valid value is selected. The component
 * will set aria-invalid to "false" and call the onValidate prop with null.
 *
 */
export const Required: StoryComponentType = {
    render: ControlledMultiSelect,
    args: {
        required: "Custom required error message",
    },
    parameters: {
        chromatic: {
            // Disabling because this doesn't test anything visual.
            disableSnapshot: true,
        },
    },
};

/**
 * If a selected value fails validation, the field will have error styling.
 *
 * This is useful for scenarios where we want to show errors while a
 * user is filling out a form (client validation).
 *
 * Note that we will internally set the correct `aria-invalid` attribute to the
 * field:
 * - aria-invalid="true" if there is an error.
 * - aria-invalid="false" if there is no error.
 *
 * Validation is triggered:
 * - On mount if the `value` prop is not empty and it is not required
 * - When the dropdown is closed after updating the selected values
 *
 * Validation errors are cleared when the value is updated. The component
 * will set aria-invalid to "false" and call the onValidate prop with null.
 */
export const ErrorFromValidation: StoryComponentType = {
    render: (args: PropsFor<typeof MultiSelect>) => {
        return (
            <View style={{gap: spacing.large_24}}>
                <ControlledMultiSelect
                    {...args}
                    label="Validation example (try picking jupiter)"
                >
                    {items}
                </ControlledMultiSelect>
                <ControlledMultiSelect
                    {...args}
                    label="Validation example (on mount)"
                    selectedValues={["jupiter"]}
                >
                    {items}
                </ControlledMultiSelect>
            </View>
        );
    },
    args: {
        shortcuts: true,
    },
};

/**
 * This example starts with one item selected and has selection shortcuts for
 * select all and select none. This one does not have a predefined placeholder.
 */
export const Shortcuts: StoryComponentType = {
    render: Template,
    args: {
        shortcuts: true,
        opened: true,
    } as MultiSelectArgs,
    decorators: [
        (Story): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={styles.wrapper}>
                <Story />
            </View>
        ),
    ],
};

/**
 * In a Modal
 */
const DropdownInModalWrapper = (args: MultiSelectArgs) => {
    const [selectedValues, setSelectedValues] = React.useState<Array<string>>(
        [],
    );
    const [opened, setOpened] = React.useState(true);

    const modalContent = (
        <View style={styles.scrollableArea}>
            <View style={styles.scrolledWrapper}>
                <View style={{minHeight: "100vh"}}>
                    <MultiSelect
                        {...args}
                        onChange={setSelectedValues}
                        isFilterable={true}
                        opened={opened}
                        onToggle={setOpened}
                        selectedValues={selectedValues}
                    >
                        {items}
                    </MultiSelect>
                </View>
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

/**
 * Sometimes we want to include Dropdowns inside a Modal, and these controls can
 * be accessed only by scrolling down. This example help us to demonstrate that
 * `MultiSelect` components can correctly be displayed within the visible
 * scrolling area.
 */
export const DropdownInModal: StoryComponentType = {
    render: (args) => <DropdownInModalWrapper {...args} />,
    name: "Dropdown in a modal",
    parameters: {
        chromatic: {
            // We don't need screenshots because this story can be tested after
            // the modal is opened.
            disableSnapshot: true,
        },
    },
};

/**
 * `MultiSelect` can be disabled by passing `disabled={true}`. This can be
 * useful when you want to disable a control temporarily. It is also disabled
 * when:
 * - there are no items
 * - there are items and they are all disabled
 *
 *
 * Note: The `disabled` prop sets the `aria-disabled` attribute to `true`
 * instead of setting the `disabled` attribute. This is so that the component
 * remains focusable while communicating to screen readers that it is disabled.
 */
export const Disabled: StoryComponentType = {
    render: () => (
        <View style={{gap: spacing.xLarge_32}}>
            <LabeledField
                label="Disabled prop is set to true"
                field={
                    <MultiSelect disabled={true} onChange={() => {}}>
                        <OptionItem label="Mercury" value="1" />
                        <OptionItem label="Venus" value="2" />
                    </MultiSelect>
                }
            />
            <LabeledField
                label="No items"
                field={<MultiSelect onChange={() => {}} />}
            />

            <LabeledField
                label="All items are disabled"
                field={
                    <MultiSelect onChange={() => {}}>
                        <OptionItem label="Mercury" value="1" disabled={true} />
                        <OptionItem label="Venus" value="2" disabled={true} />
                    </MultiSelect>
                }
            />
        </View>
    ),
};

/**
 * When nothing is selected, show the menu text as "All selected". Note that the
 * actual selection logic doesn't change. (Only the menu text)
 */
export const ImplicitAllEnabled: StoryComponentType = {
    render: Template,
    args: {
        implicitAllEnabled: true,
        labels: {
            ...defaultLabels,
            someSelected: (numSelectedValues: number) =>
                `${numSelectedValues} fruits`,
            allSelected: "All planets selected",
        },
    } as MultiSelectArgs,
    parameters: {
        chromatic: {
            // We don't need screenshots b/c the dropdown is initially closed.
            disableSnapshot: true,
        },
    },
};

/**
 * Virtualized with search filter
 */
const optionItems = allCountries.map(([code, translatedName]) => (
    <OptionItem key={code} value={code} label={translatedName} />
));

type Props = {
    opened?: boolean;
};

const VirtualizedMultiSelect = function (props: Props): React.ReactElement {
    const [selectedValues, setSelectedValues] = React.useState<Array<string>>(
        [],
    );
    const [opened, setOpened] = React.useState(props.opened || false);

    return (
        <View style={styles.wrapper}>
            <MultiSelect
                onChange={setSelectedValues}
                shortcuts={true}
                isFilterable={true}
                opened={opened}
                onToggle={setOpened}
                selectedValues={selectedValues}
            >
                {optionItems}
            </MultiSelect>
        </View>
    );
};

/**
 * When there are many options, you could use a search filter in the
 * `MultiSelect`. The search filter will be performed toward the labels of the
 * option items. Note that this example shows how we can add custom styles to
 * the dropdown as well.
 */
export const VirtualizedFilterable: StoryComponentType = {
    name: "Virtualized (isFilterable)",
    render: () => <VirtualizedMultiSelect opened={true} />,
};

/**
 * In case you need to use a custom opener with the `MultiSelect`, you can use
 * the opener property to achieve this. In this example, the opener prop accepts
 * a function with the following arguments:
 *  - `eventState`: lets you customize the style for different states, such as
 *    pressed, hovered and focused.
 *  - `text`: Passes the menu label defined in the parent component. This value
 *  is passed using the placeholder prop set in the `MultiSelect` component.
 *  - `opened`: Whether the dropdown is opened.
 *
 * **Note:** If you need to use a custom ID for testing the opener, make sure to
 * pass the testId prop inside the opener component/element.
 *
 * **Accessibility:** When a custom opener is used, the following attributes are
 * added automatically: `aria-expanded`, `aria-haspopup`, and `aria-controls`.
 */
export const CustomOpener: StoryComponentType = {
    render: Template,
    args: {
        selectedValues: [],
        opener: ({focused, hovered, pressed, text, opened}: OpenerProps) => {
            action(JSON.stringify({focused, hovered, pressed, opened}))(
                "state changed!",
            );

            return (
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
                    {opened ? ": opened" : ""}
                </HeadingLarge>
            );
        },
    } as MultiSelectArgs,
    name: "With custom opener",
};

/**
 * Custom labels
 */
const translatedItems = new Array(10)
    .fill(null)
    .map((_, i) => (
        <OptionItem
            key={i}
            value={(i + 1).toString()}
            label={`Escuela # ${i + 1}`}
        />
    ));

/**
 * This example illustrates how you can pass custom labels to the MultiSelect
 * component.
 */
export const CustomLabels: StoryComponentType = {
    render: function Render() {
        const [selectedValues, setSelectedValues] = React.useState<
            Array<string>
        >([]);
        const [opened, setOpened] = React.useState(true);

        const labels: Labels = {
            clearSearch: "Limpiar busqueda",
            filter: "Filtrar",
            noResults: "Sin resultados",
            selectAllLabel: (numOptions) => `Seleccionar todas (${numOptions})`,
            selectNoneLabel: "No seleccionar ninguno",
            noneSelected: "0 escuelas seleccionadas",
            allSelected: "Todas las escuelas",
            someSelected: (numSelectedValues) =>
                `${numSelectedValues} escuelas seleccionadas`,
        };

        return (
            <View style={styles.wrapper}>
                <MultiSelect
                    shortcuts={true}
                    isFilterable={true}
                    onChange={setSelectedValues}
                    selectedValues={selectedValues}
                    labels={labels}
                    opened={opened}
                    onToggle={setOpened}
                >
                    {translatedItems}
                </MultiSelect>
            </View>
        );
    },
};

/**
 * Custom option items
 */

/**
 * This example illustrates how you can use the `OptionItem` component to
 * display a list with custom option items. Note that in this example, we are
 * using `leftAccessory` to display a custom icon for each option item,
 * `subtitle1` to optionally display a pill and `subtitle2` to display the
 * email.
 *
 * **Note:** As these are custom option items, we strongly recommend to pass the
 * `labelAsText` prop to display a summarized label in the menu.
 */
export const CustomOptionItems: StoryComponentType = {
    render: function Render() {
        const [opened, setOpened] = React.useState(true);
        const [selectedValues, setSelectedValues] = React.useState<
            Array<string>
        >([]);

        const handleChange = (selectedValues: Array<string>) => {
            setSelectedValues(selectedValues);
        };

        const handleToggle = (opened: boolean) => {
            setOpened(opened);
        };

        return (
            <MultiSelect
                onChange={handleChange}
                selectedValues={selectedValues}
                onToggle={handleToggle}
                opened={opened}
            >
                {allProfilesWithPictures.map((user, index) => (
                    <OptionItem
                        key={user.id}
                        value={user.id}
                        label={user.name}
                        leftAccessory={user.picture}
                        subtitle1={
                            index === 1 ? (
                                <Pill kind="accent">New</Pill>
                            ) : undefined
                        }
                        subtitle2={user.email}
                    />
                ))}
            </MultiSelect>
        );
    },
    decorators: [
        (Story): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={styles.wrapper}>{Story()}</View>
        ),
    ],
};

/**
 * This example illustrates how a JSX Element can appear as the label by setting
 * `showOpenerLabelAsText` to false. Note that in this example, we define
 * `labelAsText` on the OptionItems to ensure that filtering works correctly.
 */
export const CustomOptionItemsWithNodeLabel: StoryComponentType = {
    render: function Render() {
        const [opened, setOpened] = React.useState(true);
        const [selectedValues, setSelectedValues] = React.useState<
            Array<string>
        >([]);

        const handleChange = (selectedValues: Array<string>) => {
            setSelectedValues(selectedValues);
        };

        const handleToggle = (opened: boolean) => {
            setOpened(opened);
        };

        return (
            <MultiSelect
                onChange={handleChange}
                selectedValues={selectedValues}
                onToggle={handleToggle}
                opened={opened}
                showOpenerLabelAsText={false}
                isFilterable={true}
            >
                {locales.map((locale, index) => (
                    <OptionItem
                        key={index}
                        value={String(index)}
                        label={
                            <span>
                                {chatIcon} {locale}
                            </span>
                        }
                        labelAsText={locale}
                    />
                ))}
            </MultiSelect>
        );
    },
    decorators: [
        (Story): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={styles.wrapper}>{Story()}</View>
        ),
    ],
};
