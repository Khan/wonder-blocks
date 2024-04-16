import * as React from "react";
import {StyleSheet} from "aphrodite";
import planetIcon from "@phosphor-icons/core/regular/planet.svg";

import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from "@storybook/react";

import Button from "@khanacademy/wonder-blocks-button";
import {fade, color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {View} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {OnePaneDialog, ModalLauncher} from "@khanacademy/wonder-blocks-modal";
import Pill from "@khanacademy/wonder-blocks-pill";
import {
    Body,
    HeadingLarge,
    LabelMedium,
} from "@khanacademy/wonder-blocks-typography";
import {
    SingleSelect,
    OptionItem,
    SeparatorItem,
} from "@khanacademy/wonder-blocks-dropdown";

import type {SingleSelectLabels} from "@khanacademy/wonder-blocks-dropdown";
import packageConfig from "../../packages/wonder-blocks-dropdown/package.json";

import ComponentInfo from "../../.storybook/components/component-info";
import singleSelectArgtypes from "./single-select.argtypes";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {defaultLabels} from "../../packages/wonder-blocks-dropdown/src/util/constants";
import {allCountries, allProfilesWithPictures} from "./option-item-examples";
import {OpenerProps} from "../../packages/wonder-blocks-dropdown/src/util/types";

type StoryComponentType = StoryObj<typeof SingleSelect>;
type SingleSelectArgs = Partial<typeof SingleSelect>;

/**
 * The single select allows the selection of one item. Clients are responsible
 * for keeping track of the selected item in the select.
 *
 * The single select dropdown closes after the selection of an item. If the same
 * item is selected, there is no callback.
 *
 * **NOTE:** If there are more than 125 items, the component automatically uses
 * [react-window](https://github.com/bvaughn/react-window) to improve
 * performance when rendering these elements and is capable of handling many
 * hundreds of items without performance problems.
 *
 * ### Usage
 *
 * #### General usage
 *
 * ```tsx
 * import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
 *
 * const [selectedValue, setSelectedValue] = React.useState("");
 *
 * <SingleSelect placeholder="Choose a fruit" onChange={setSelectedValue} selectedValue={selectedValue}>
 *     <OptionItem label="Pear" value="pear" />
 *     <OptionItem label="Mango" value="mango" />
 * </SingleSelect>
 * ```
 */
export default {
    title: "Dropdown / SingleSelect",
    component: SingleSelect as unknown as React.ComponentType<any>,
    subcomponents: {OptionItem, SeparatorItem},
    argTypes: {
        ...singleSelectArgtypes,
        labels: {
            defaultValue: defaultLabels,
        },
    },
    args: {
        error: false,
        isFilterable: true,
        opened: false,
        disabled: false,
        light: false,
        placeholder: "Choose a fruit",
        selectedValue: "",
    },
    decorators: [
        (Story): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={styles.example}>{Story()}</View>
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
} as Meta<typeof SingleSelect>;

const styles = StyleSheet.create({
    example: {
        background: color.offWhite,
        padding: spacing.medium_16,
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
        borderLeft: `5px solid ${color.blue}`,
        borderRadius: spacing.xxxSmall_4,
        background: color.lightBlue,
        color: color.white,
        padding: spacing.medium_16,
    },
    focused: {
        backgroundColor: fade(color.lightBlue, 0.8),
    },
    hovered: {
        textDecoration: "underline",
        color: color.offWhite,
        cursor: "pointer",
    },
    pressed: {
        backgroundColor: color.blue,
    },

    fullBleed: {
        width: "100%",
    },
    wrapper: {
        height: "500px",
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
        backgroundColor: color.darkBlue,
        width: "100%",
        height: 200,
        paddingRight: spacing.medium_16,
        paddingTop: spacing.medium_16,
    },
    // AutoFocus
    icon: {
        position: "absolute",
        right: spacing.medium_16,
    },
});

const items = [
    <OptionItem label="Banana" value="banana" key={0} />,
    <OptionItem label="Strawberry" value="strawberry" disabled key={1} />,
    <OptionItem label="Pear" value="pear" key={2} />,
    <OptionItem label="Orange" value="orange" key={3} />,
    <OptionItem label="Watermelon" value="watermelon" key={4} />,
    <OptionItem label="Apple" value="apple" key={5} />,
    <OptionItem label="Grape" value="grape" key={6} />,
    <OptionItem label="Lemon" value="lemon" key={7} />,
    <OptionItem label="Mango" value="mango" key={8} />,
];

const Template = (args: any) => {
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

export const Default: StoryComponentType = {
    render: Template,
};

/**
 * Controlled SingleSelect
 */
const ControlledOpenedWrapper = (args: any) => {
    const [selectedValue, setSelectedValue] = React.useState("pear");
    const [opened, setOpened] = React.useState(args.opened);
    React.useEffect(() => {
        // Only update opened if the args.opened prop changes (using the
        // controls panel).
        setOpened(args.opened);
    }, [args.opened]);

    return (
        <View style={styles.wrapper}>
            <SingleSelect
                {...args}
                onChange={setSelectedValue}
                selectedValue={selectedValue}
                opened={opened}
                onToggle={setOpened}
            >
                {items}
            </SingleSelect>
        </View>
    );
};

/**
 * Sometimes you'll want to trigger a dropdown programmatically. This can be
 * done by setting a value to the `opened` prop (`true` or `false`). In this
 * situation the `SingleSelect` is a controlled component. The parent is
 * responsible for managing the opening/closing of the dropdown when using this
 * prop.
 *
 * This means that you'll also have to update `opened` to the value triggered by
 * the `onToggle` prop.
 */
export const ControlledOpened: StoryComponentType = {
    render: (args) => <ControlledOpenedWrapper {...args} />,
    args: {
        opened: true,
    } as SingleSelectArgs,
    name: "Controlled (opened)",
    parameters: {
        // Added to ensure that the dropdown menu is rendered using PopperJS.
        chromatic: {delay: 500},
    },
};

/**
 * If the label for the opener or the OptionItem(s) is longer than its bounding
 * box, it will be truncated with an ellipsis at the end.
 */
export const LongOptionLabels: StoryComponentType = {
    render: function Render() {
        const [selectedValue, setSelectedValue] = React.useState("");
        const [opened, setOpened] = React.useState(false);

        const smallWidthStyle = {width: 200};

        return (
            <SingleSelect
                onChange={setSelectedValue}
                selectedValue={selectedValue}
                opened={opened}
                onToggle={setOpened}
                placeholder="Fruit placeholder is also long"
                style={smallWidthStyle}
            >
                <OptionItem
                    label="Bananas are the most amazing fruit I've ever had in my entire life."
                    value="banana"
                    key={0}
                    style={smallWidthStyle}
                />
                <OptionItem
                    label="Strawberries are the most amazing fruit I've ever had in my entire life."
                    value="strawberry"
                    disabled
                    key={1}
                    style={smallWidthStyle}
                />
                <OptionItem
                    label="Pears are the most amazing fruit I've ever had in my entire life."
                    value="pear"
                    key={2}
                    style={smallWidthStyle}
                />
                <OptionItem
                    label="Oranges are the most amazing fruit I've ever had in my entire life."
                    value="orange"
                    key={3}
                    style={smallWidthStyle}
                />
                <OptionItem
                    label="Watermelons are the most amazing fruit I've ever had in my entire life."
                    value="watermelon"
                    key={4}
                    style={smallWidthStyle}
                />
                <OptionItem
                    label="Apples are the most amazing fruit I've ever had in my entire life."
                    value="apple"
                    key={5}
                    style={smallWidthStyle}
                />
                <OptionItem
                    label="Grapes are the most amazing fruit I've ever had in my entire life."
                    value="grape"
                    key={6}
                    style={smallWidthStyle}
                />
                <OptionItem
                    label="Lemons are the most amazing fruit I've ever had in my entire life."
                    value="lemon"
                    key={7}
                    style={smallWidthStyle}
                />
                <OptionItem
                    label="Mangos are the most amazing fruit I've ever had in my entire life."
                    value="mango"
                    key={8}
                    style={smallWidthStyle}
                />
            </SingleSelect>
        );
    },
};

/**
 * This select is disabled and cannot be interacted with.
 */
export const Disabled: StoryComponentType = {
    render: (args) => (
        <SingleSelect
            {...args}
            placeholder="Choose a fruit"
            onChange={() => {}}
            selectedValue=""
            disabled={true}
        >
            {items}
        </SingleSelect>
    ),
};

const ErrorWrapper = () => {
    const [error, setError] = React.useState(true);
    const [selectedValue, setSelectedValue] = React.useState("");
    const [opened, setOpened] = React.useState(false);

    return (
        <>
            <LabelMedium style={{marginBottom: spacing.xSmall_8}}>
                Select any fruit other than lemon to clear the error!
            </LabelMedium>
            <SingleSelect
                error={error}
                onChange={(value) => {
                    setSelectedValue(value);
                    setError(value === "lemon");
                }}
                onToggle={setOpened}
                opened={opened}
                placeholder="Choose a fruit"
                selectedValue={selectedValue}
            >
                {items}
            </SingleSelect>
        </>
    );
};

/**
 * This select is in an error state. Selecting any option other than lemon will
 * clear the error state by updating the `error` prop to `false`.
 */
export const Error: StoryComponentType = {
    render: ErrorWrapper,
};

/**
 * This story has two selects nested inline within text.
 */
export const TwoWithText: StoryComponentType = {
    render: function Render(args: any) {
        const [selectedValue, setSelectedValue] = React.useState(
            args.selectedValue,
        );
        const [secondSelectedValue, setSecondSelectedValue] = React.useState(
            args.selectedValue,
        );
        const [opened, setOpened] = React.useState(args.opened);
        const [secondOpened, setSecondOpened] = React.useState(args.opened);
        React.useEffect(() => {
            // Only update opened if the args.opened prop changes (using the
            // controls panel).
            setOpened(args.opened);
        }, [args.opened]);

        return (
            <div>
                Here is some text to nest the dropdown
                <SingleSelect
                    {...args}
                    onChange={setSelectedValue}
                    selectedValue={selectedValue}
                    opened={opened}
                    onToggle={setOpened}
                    style={{display: "inline-block"}}
                >
                    {[...items, <OptionItem label="" value="" key={9} />]}
                </SingleSelect>
                . And here is more text to compare!
                <SingleSelect
                    {...args}
                    onChange={setSecondSelectedValue}
                    selectedValue={secondSelectedValue}
                    opened={secondOpened}
                    onToggle={setSecondOpened}
                    style={{display: "inline-block"}}
                >
                    {[...items, <OptionItem label="" value="" key={9} />]}
                </SingleSelect>
            </div>
        );
    },
};

/**
 * "This single select is on a dark background and is also right-aligned.
 */
export const Light: StoryComponentType = {
    render: function Render(args: any) {
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
    },
};

const optionItems = allCountries.map(([code, translatedName]) => (
    <OptionItem key={code} value={code} label={translatedName} />
));

type Props = {
    selectedValue?: string | null | undefined;
    opened?: boolean;
};

const VirtualizedSingleSelect = function (props: Props): React.ReactElement {
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
                placeholder="Select a country"
                selectedValue={selectedValue}
                dropdownStyle={styles.fullBleed}
                style={styles.fullBleed}
            >
                {optionItems}
            </SingleSelect>
        </View>
    );
};

/**
 * When there are many options, you could use a search filter in the
 * SingleSelect. The search filter will be performed toward the labels of the
 * option items. Note that this example shows how we can add custom styles to
 * the dropdown as well.
 */
export const VirtualizedFilterable: StoryComponentType = {
    name: "Virtualized (isFilterable)",
    render: () => <VirtualizedSingleSelect />,
    parameters: {
        chromatic: {
            // we don't need screenshots because this story only tests behavior.
            disableSnapshot: true,
        },
    },
};

/**
 * This example shows how to use the `opened` prop to open the dropdown.
 */
export const VirtualizedOpened: StoryComponentType = {
    render: () => <VirtualizedSingleSelect opened={true} />,
    name: "Virtualized (opened)",
};

/**
 * This example shows how the focus is set to the search field if there's no
 * current selection.
 */
export const VirtualizedOpenedNoSelection: StoryComponentType = {
    render: () => (
        <VirtualizedSingleSelect opened={true} selectedValue={null} />
    ),
    name: "Virtualized (opened, no selection)",
};

/**
 * Sometimes we want to include Dropdowns inside a Modal, and these controls can
 * be accessed only by scrolling down. This example help us to demonstrate that
 * `SingleSelect` components can correctly be displayed within the visible
 * scrolling area.
 */
export const DropdownInModal: StoryComponentType = {
    name: "Dropdown in a modal",
    render: function Render() {
        const [value, setValue] = React.useState<any>(null);
        const [opened, setOpened] = React.useState(true);

        const modalContent = (
            <View style={styles.scrollableArea}>
                <View>
                    <Body>
                        Sometimes we want to include Dropdowns inside a Modal,
                        and these controls can be accessed only by scrolling
                        down. This example help us to demonstrate that
                        SingleSelect components can correctly be displayed
                        within the visible scrolling area.
                    </Body>
                    <Strut size={spacing.large_24} />
                    <SingleSelect
                        onChange={(selected) => setValue(selected)}
                        isFilterable={true}
                        opened={opened}
                        onToggle={(opened) => setOpened(opened)}
                        placeholder="Select a country"
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
    },
    parameters: {
        chromatic: {
            // We don't need screenshots because this story can be tested after
            // the modal is opened.
            disableSnapshot: true,
        },
    },
};

/**
 * In case you need to use a custom opener with the `SingleSelect`, you can use
 * the opener property to achieve this. In this example, the opener prop accepts
 * a function with the following arguments:
 *  - `eventState`: lets you customize the style for different states, such as
 *    pressed, hovered and focused.
 *  - `text`: Passes the menu label defined in the parent component. This value
 *   is passed using the placeholder prop set in the `SingleSelect` component.
 *  - `opened`: Whether the dropdown is opened.
 *
 * **Note:** If you need to use a custom ID for testing the opener, make sure to
 * pass the testId prop inside the opener component/element.
 */
export const CustomOpener: StoryComponentType = {
    render: Template,
    args: {
        selectedValue: "",
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
                        opened && styles.focused,
                    ]}
                >
                    {text}
                    {opened ? ": opened" : ""}
                </HeadingLarge>
            );
        },
    } as SingleSelectArgs,
    name: "With custom opener",
};

/**
 * Custom labels
 */
const translatedItems = [
    <OptionItem label="Banano" value="banano" />,
    <OptionItem label="Fresa" value="fresa" disabled />,
    <OptionItem label="Pera" value="pera" />,
    <OptionItem label="Naranja" value="naranja" />,
    <OptionItem label="Sandia" value="sandia" />,
    <OptionItem label="Manzana" value="manzana" />,
    <OptionItem label="Uva" value="uva" />,
    <OptionItem label="Limon" value="limon" />,
    <OptionItem label="Mango" value="mango" />,
];

/**
 * This example illustrates how you can pass custom labels to the `SingleSelect`
 * component.
 */
export const CustomLabels: StoryComponentType = {
    render: function Render() {
        const [value, setValue] = React.useState<any>(null);
        const [opened, setOpened] = React.useState(true);

        const translatedLabels: SingleSelectLabels = {
            clearSearch: "Limpiar busqueda",
            filter: "Filtrar",
            noResults: "Sin resultados",
            someResults: (numResults) => `${numResults} frutas`,
        };

        return (
            <View style={styles.wrapper}>
                <SingleSelect
                    isFilterable={true}
                    onChange={setValue}
                    selectedValue={value}
                    labels={translatedLabels}
                    opened={opened}
                    onToggle={setOpened}
                    placeholder="Selecciona una fruta"
                >
                    {translatedItems}
                </SingleSelect>
            </View>
        );
    },
};

/**
 * Auto focus disabled
 */
const timeSlots = [
    "12:00 AM",
    "2:00 AM",
    "4:00 AM",
    "6:00 AM",
    "8:00 AM",
    "10:00 AM",
    "12:00 PM",
    "2:00 PM",
    "4:00 PM",
    "6:00 PM",
    "8:00 PM",
    "10:00 PM",
    "11:59 PM",
];

const timeSlotOptions = timeSlots.map((timeSlot) => (
    <OptionItem label={timeSlot} value={timeSlot} />
));

/**
 * This example illustrates how you can disable the auto focus of the
 * `SingleSelect` component. Note that for this example, we are using a
 * `TextField` component as a custom opener to ilustrate how the focus remains
 * on the opener.
 *
 * **Note:** We also disabled the `enableTypeAhead` prop to be able to use the
 * textbox properly.
 */
export const AutoFocusDisabled: StoryComponentType = {
    render: function Render() {
        const textFieldRef = React.useRef(null);
        const [value, setValue] = React.useState<any>(null);
        const [opened, setOpened] = React.useState(false);

        return (
            <View style={styles.wrapper}>
                <SingleSelect
                    autoFocus={false}
                    enableTypeAhead={false}
                    onChange={setValue}
                    selectedValue={value}
                    opened={opened}
                    onToggle={setOpened}
                    placeholder="Choose a time"
                    opener={({focused, hovered, pressed, text}) => (
                        <View style={styles.row}>
                            <TextField
                                placeholder="Choose a time"
                                id="single-select-opener"
                                onChange={setValue}
                                value={value ?? ""}
                                ref={textFieldRef}
                                autoComplete="off"
                                style={styles.fullBleed}
                            />
                            <PhosphorIcon
                                color={color.blue}
                                icon={IconMappings.clockBold}
                                size="small"
                                style={styles.icon}
                            />
                        </View>
                    )}
                >
                    {timeSlotOptions}
                </SingleSelect>
            </View>
        );
    },
    parameters: {
        chromatic: {
            // we don't need screenshots because this story only tests focus +
            // keyboard behavior.
            disableSnapshot: true,
        },
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
        const [selectedValue, setSelectedValue] = React.useState("");

        const handleChange = (selectedValue: string) => {
            setSelectedValue(selectedValue);
        };

        const handleToggle = (opened: boolean) => {
            setOpened(opened);
        };

        return (
            <View style={styles.wrapper}>
                <SingleSelect
                    placeholder="Select a profile"
                    onChange={handleChange}
                    selectedValue={selectedValue}
                    onToggle={handleToggle}
                    opened={opened}
                >
                    {allProfilesWithPictures.map((user, index) => (
                        <OptionItem
                            key={user.id}
                            value={user.id}
                            horizontalRule="full-width"
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
                </SingleSelect>
            </View>
        );
    },
};

/**
 * This example illustrates how you can use the `OptionItem` component to
 * display a virtualized list with custom option items. Note that in this
 * example, we are using `leftAccessory` to display a custom icon for each
 * option item.
 *
 * **Note:** The virtualized version doesn't support custom option items with
 * multiple lines at the moment. This is a known issue and we are working on
 * fixing it.
 */
export const CustomOptionItemsVirtualized: StoryComponentType = {
    name: "Custom option items (virtualized)",
    render: function Render() {
        const [opened, setOpened] = React.useState(true);
        const [selectedValue, setSelectedValue] = React.useState(
            allCountries[0][0],
        );

        const handleToggle = (opened: boolean) => {
            setOpened(opened);
        };

        const handleChange = (selectedValue: string) => {
            setSelectedValue(selectedValue);
        };

        return (
            <SingleSelect
                placeholder="Select a country"
                isFilterable={true}
                onChange={handleChange}
                selectedValue={selectedValue}
                onToggle={handleToggle}
                opened={opened}
            >
                {allCountries.map(([code, translatedName]) => (
                    <OptionItem
                        key={code}
                        value={code}
                        label={translatedName}
                        leftAccessory={
                            <PhosphorIcon
                                icon={planetIcon}
                                role="img"
                                size="medium"
                            />
                        }
                    />
                ))}
            </SingleSelect>
        );
    },
    decorators: [
        (Story): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={styles.wrapper}>{Story()}</View>
        ),
    ],
};
