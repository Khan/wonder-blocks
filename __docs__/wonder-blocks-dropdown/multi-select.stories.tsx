import {expect} from "@storybook/jest";
import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {Meta, StoryObj} from "@storybook/react";
import {fireEvent, userEvent, within} from "@storybook/testing-library";
import {View} from "@khanacademy/wonder-blocks-core";

import Button from "@khanacademy/wonder-blocks-button";
import Color from "@khanacademy/wonder-blocks-color";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import {OnePaneDialog, ModalLauncher} from "@khanacademy/wonder-blocks-modal";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";
import {MultiSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import type {Labels} from "@khanacademy/wonder-blocks-dropdown";

import ComponentInfo from "../../.storybook/components/component-info";
import packageConfig from "../../packages/wonder-blocks-dropdown/package.json";
import multiSelectArgtypes from "./base-select.argtypes";
import {defaultLabels} from "../../packages/wonder-blocks-dropdown/src/util/constants";

type StoryComponentType = StoryObj<typeof MultiSelect>;

type MultiSelectArgs = Partial<typeof MultiSelect>;

export default {
    title: "Dropdown / MultiSelect",
    component: MultiSelect as unknown as React.ComponentType<any>,
    argTypes: multiSelectArgtypes,
    args: {
        isFilterable: false,
        isInvalid: false,
        opened: false,
        disabled: false,
        light: false,
        shortcuts: false,
        implicitAllEnabled: false,
        id: "",
        testId: "multiselect-invalid",
    },
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
        ) as any,
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
} as Meta<typeof MultiSelect>;

const styles = StyleSheet.create({
    example: {
        background: Color.offWhite,
        padding: Spacing.medium_16,
    },
    setWidth: {
        minWidth: 170,
        width: "100%",
    },
    customDropdown: {
        maxHeight: 200,
    },
    wrapper: {
        height: "400px",
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
        borderRadius: Spacing.xxxSmall_4,
        margin: Spacing.xSmall_8,
        padding: Spacing.medium_16,
    },
    scrollableArea: {
        height: "200vh",
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

const items = [
    <OptionItem label="Mercury" value="1" key={1} />,
    <OptionItem label="Venus" value="2" key={2} />,
    <OptionItem label="Earth" value="3" disabled key={3} />,
    <OptionItem label="Mars" value="4" key={4} />,
    <OptionItem label="Jupiter" value="5" key={5} />,
    <OptionItem label="Saturn" value="6" key={6} />,
    <OptionItem label="Neptune" value="7" key={7} />,
    <OptionItem label="Uranus" value="8" key={8} />,
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
        <View style={styles.wrapper}>
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

export const Default: StoryComponentType = {
    render: Template,
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

export const ControlledOpened: StoryComponentType = {
    render: (args) => <ControlledWrapper {...args} />,
    args: {
        opened: true,
    } as MultiSelectArgs,
};

ControlledOpened.storyName = "Controlled (opened)";

ControlledOpened.parameters = {
    docs: {
        description: {
            story:
                "Sometimes you'll want to trigger a dropdown programmatically. This can be done by `MultiSelect` is a controlled component. The parent is responsible for managing the opening/closing of the dropdown when using this prop.\n\n" +
                "This means that you'll also have to update `opened` to the value triggered by the `onToggle` prop.",
        },
    },
    // Added to ensure that the dropdown menu is rendered using PopperJS.
    chromatic: {delay: 500},
};

// Custom MultiSelect labels
const dropdownLabels: Labels = {
    ...defaultLabels,
    noneSelected: "Solar system",
    someSelected: (numSelectedValues) => `${numSelectedValues} planets`,
};

export const CustomStyles: StoryComponentType = {
    render: Template,
    args: {
        labels: dropdownLabels,
        dropdownStyle: styles.customDropdown,
        style: styles.setWidth,
    } as MultiSelectArgs,
};

CustomStyles.parameters = {
    docs: {
        description: {
            story: "Sometimes, we may want to customize the dropdown style (for example, to limit the height of the list). For this purpose, we have the `dropdownStyle` prop.",
        },
    },
    chromatic: {
        // we don't need screenshots because this story only tests behavior.
        disableSnapshot: true,
    },
};

export const CustomStylesOpened: StoryComponentType = {
    render: Template,
    args: {
        labels: dropdownLabels,
        dropdownStyle: styles.customDropdown,
        style: styles.setWidth,
        opened: true,
    } as MultiSelectArgs,
    name: "Custom styles (opened)",
};

CustomStylesOpened.parameters = {
    docs: {
        description: {
            story: "Here you can see an example of the previous dropdown opened",
        },
    },
};

/**
 * Here is an example of a dropdown that is in an invalid state.
 */
export const Invalid: StoryComponentType = {
    render: Template,
    args: {
        isInvalid: true,
    } as MultiSelectArgs,
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);

        // Get HTML element
        const dropdown = await canvas.findByTestId("multiselect-invalid");

        // Hover style
        await userEvent.hover(dropdown);
        expect(dropdown).toHaveStyle("border-color: #d92916");
        expect(dropdown).toHaveStyle("border-width: 2px");

        // Focus style
        fireEvent.focus(dropdown);
        expect(dropdown).toHaveStyle("border-color: #d92916");
        expect(dropdown).toHaveStyle("border-width: 2px");

        // Active (mouse down) style
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseDown(dropdown);
        expect(dropdown).toHaveStyle("background-color: rgb(243, 187, 180)");
    },
};

/**
 * With shortcuts
 */
export const Shortcuts: StoryComponentType = {
    render: Template,
    args: {
        shortcuts: true,
        opened: true,
    } as MultiSelectArgs,
};

Shortcuts.parameters = {
    docs: {
        description: {
            story: "This example starts with one item selected and has selection shortcuts for select all and select none. This one does not have a predefined placeholder.",
        },
    },
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

export const DropdownInModal: StoryComponentType = {
    render: (args) => <DropdownInModalWrapper {...args} />,
    name: "Dropdown in a modal",
};

DropdownInModal.parameters = {
    docs: {
        description: {
            story: "Sometimes we want to include Dropdowns inside a Modal, and these controls can be accessed only by scrolling down. This example help us to demonstrate that `MultiSelect` components can correctly be displayed within the visible scrolling area.",
        },
    },
    chromatic: {
        // We don't need screenshots because this story can be tested after
        // the modal is opened.
        disableSnapshot: true,
    },
};

/**
 * Disabled
 */
export const Disabled: StoryComponentType = () => (
    <MultiSelect disabled={true} onChange={() => {}}>
        <OptionItem label="Mercury" value="1" />
        <OptionItem label="Venus" value="2" />
    </MultiSelect>
);

Disabled.parameters = {
    docs: {
        storyDescription:
            "`MultiSelect` can be disabled by passing `disabled={true}`. This can be useful when you want to disable a control temporarily.",
    },
};

/**
 * ImplicitAll enabled
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
};

ImplicitAllEnabled.parameters = {
    docs: {
        description: {
            story: `When nothing is selected, show the menu text as "All selected". Note that the actual selection logic doesn't change. (Only the menu text)`,
        },
    },
    chromatic: {
        // We don't need screenshots b/c the dropdown is initially closed.
        disableSnapshot: true,
    },
};

/**
 * Virtualized with search filter
 */
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
 * Virtualized MultiSelect
 */
export const VirtualizedFilterable: StoryComponentType = () => (
    <VirtualizedMultiSelect opened={true} />
);

VirtualizedFilterable.storyName = "Virtualized (isFilterable)";

VirtualizedFilterable.parameters = {
    docs: {
        description: {
            story: "When there are many options, you could use a search filter in the `MultiSelect`. The search filter will be performed toward the labels of the option items. Note that this example shows how we can add custom styles to the dropdown as well.",
        },
    },
};

/**
 * Custom opener
 */
export const CustomOpener: StoryComponentType = {
    render: Template,
    args: {
        selectedValues: [],
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
    } as MultiSelectArgs,
    name: "With custom opener",
};

CustomOpener.parameters = {
    docs: {
        description: {
            story:
                "In case you need to use a custom opener with the `MultiSelect`, you can use the opener property to achieve this. In this example, the opener prop accepts a function with the following arguments:\n" +
                "- `eventState`: lets you customize the style for different states, such as pressed, hovered and focused.\n" +
                "- `text`: Passes the menu label defined in the parent component. This value is passed using the placeholder prop set in the `MultiSelect` component.\n\n" +
                "**Note:** If you need to use a custom ID for testing the opener, make sure to pass the testId prop inside the opener component/element.",
        },
    },
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

export const CustomLabels: StoryComponentType = () => {
    const [selectedValues, setSelectedValues] = React.useState<Array<string>>(
        [],
    );
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
};

CustomLabels.parameters = {
    docs: {
        description: {
            story: "This example illustrates how you can pass custom labels to the MultiSelect component.",
        },
    },
};
