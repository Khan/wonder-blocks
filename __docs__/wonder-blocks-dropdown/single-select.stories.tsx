import {expect} from "@storybook/jest";
import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {Meta, StoryObj} from "@storybook/react";
import {fireEvent, userEvent, within} from "@storybook/testing-library";
import Button from "@khanacademy/wonder-blocks-button";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import Icon from "@khanacademy/wonder-blocks-icon";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {OnePaneDialog, ModalLauncher} from "@khanacademy/wonder-blocks-modal";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Body, HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import type {IconAsset} from "@khanacademy/wonder-blocks-icon";
import {
    SingleSelect,
    OptionItem,
    SeparatorItem,
} from "@khanacademy/wonder-blocks-dropdown";

import type {SingleSelectLabels} from "@khanacademy/wonder-blocks-dropdown";
import packageConfig from "../../packages/wonder-blocks-dropdown/package.json";

import ComponentInfo from "../../.storybook/components/component-info";
import singleSelectArgtypes from "./base-select.argtypes";
import {defaultLabels} from "../../packages/wonder-blocks-dropdown/src/util/constants";

type StoryComponentType = StoryObj<typeof SingleSelect>;
type SingleSelectArgs = Partial<typeof SingleSelect>;

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
} as Meta<typeof SingleSelect>;

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
        backgroundColor: Color.darkBlue,
        width: "100%",
        height: 200,
        paddingRight: Spacing.medium_16,
        paddingTop: Spacing.medium_16,
    },
    // AutoFocus
    icon: {
        position: "absolute",
        right: Spacing.medium_16,
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

export const ControlledOpened: StoryComponentType = {
    render: (args) => <ControlledOpenedWrapper {...args} />,
    args: {
        opened: true,
    } as SingleSelectArgs,
    name: "Controlled (opened)",
};

ControlledOpened.parameters = {
    docs: {
        description: {
            story:
                "Sometimes you'll want to trigger a dropdown programmatically. This can be done by setting a value to the `opened` prop (`true` or `false`). In this situation the `SingleSelect` is a controlled component. The parent is responsible for managing the opening/closing of the dropdown when using this prop.\n\n" +
                "This means that you'll also have to update `opened` to the value triggered by the `onToggle` prop.",
        },
    },
    // Added to ensure that the dropdown menu is rendered using PopperJS.
    chromatic: {delay: 500},
};

export const LongOptionLabels: StoryComponentType = () => {
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
};

LongOptionLabels.parameters = {
    docs: {
        description: {
            story: `If the label for the opener or the OptionItem(s)
            is longer than its bounding box, it will be truncated with
            an ellipsis at the end.`,
        },
    },
};

/**
 * Disabled
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

Disabled.parameters = {
    docs: {
        description: {
            story: "This select is disabled and cannot be interacted with.",
        },
    },
};

/**
 * This select is in an invalid state.
 */
export const Invalid: StoryComponentType = {
    render: (args) => (
        <SingleSelect
            {...args}
            error={true}
            placeholder="Choose a fruit"
            onChange={() => {}}
            selectedValue=""
            testId="singleselect-invalid"
        >
            {items}
        </SingleSelect>
    ),
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);

        // Get HTML element
        const dropdown = canvas.getByTestId("singleselect-invalid");

        // Hover style
        await userEvent.hover(dropdown);
        expect(dropdown).toHaveStyle("border-color: #d92916");
        expect(dropdown).toHaveStyle("border-width: 2px");

        // Focus style
        await fireEvent.focus(dropdown);
        expect(dropdown).toHaveStyle("border-color: #d92916");
        expect(dropdown).toHaveStyle("border-width: 2px");

        // Active (mouse down) style
        // eslint-disable-next-line testing-library/prefer-user-event
        await fireEvent.mouseDown(dropdown);
        expect(dropdown).toHaveStyle("background-color: rgb(243, 187, 180)");
    },
};

/**
 * TwoWithText
 */
export const TwoWithText: StoryComponentType = (args: any) => {
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
};

TwoWithText.parameters = {
    docs: {
        description: {
            story: "This story has two selects nested inline within text.",
        },
    },
};

/**
 * On dark background, right-aligned
 */
export const Light: StoryComponentType = (args: any) => {
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
                placeholder="Select a fruit"
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

export const VirtualizedOpened: StoryComponentType = {
    render: () => <VirtualizedSingleSelect opened={true} />,
    name: "Virtualized (opened)",
};

VirtualizedOpened.parameters = {
    docs: {
        description: {
            story: "This example shows how to use the `opened` prop to open the dropdown.",
        },
    },
};

export const VirtualizedOpenedNoSelection: StoryComponentType = {
    render: () => (
        <VirtualizedSingleSelect opened={true} selectedValue={null} />
    ),
    name: "Virtualized (opened, no selection)",
};

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
    const [value, setValue] = React.useState<any>(null);
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
export const CustomOpener: StoryComponentType = {
    render: Template,
    args: {
        selectedValue: "",
        opener: ({focused, hovered, pressed, text}: any) => (
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
    } as SingleSelectArgs,
    name: "With custom opener",
};

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

export const CustomLabels: StoryComponentType = () => {
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
};

CustomLabels.parameters = {
    docs: {
        description: {
            story: "This example illustrates how you can pass custom labels to the `SingleSelect` component.",
        },
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

const clockIcon: IconAsset = {
    small: `M0 8C0 3.58 3.58 0 7.99 0C12.42 0 16 3.58 16 8C16 12.42 12.42 16 7.99 16C3.58 16 0 12.42 0 8ZM1.6 8C1.6 11.54 4.46 14.4 8 14.4C11.54 14.4 14.4 11.54 14.4 8C14.4 4.46 11.54 1.6 8 1.6C4.46 1.6 1.6 4.46 1.6 8ZM7.2 4H8.4V8.2L12 10.34L11.4 11.32L7.2 8.8V4Z`,
};

export const AutoFocusDisabled: StoryComponentType = () => {
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
                        <Icon
                            color={Color.blue}
                            icon={clockIcon}
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
};

AutoFocusDisabled.parameters = {
    docs: {
        description: {
            story:
                `This example illustrates how you can disable the auto focus
                of the \`SingleSelect\` component. Note that for this example,
                we are using a \`TextField\` component as a custom opener to
                ilustrate how the focus remains on the opener.\n\n` +
                `**Note:** We also disabled the \`enableTypeAhead\` prop to be
                able to use the textbox properly.`,
        },
    },
    chromatic: {
        // we don't need screenshots because this story only tests focus +
        // keyboard behavior.
        disableSnapshot: true,
    },
};
