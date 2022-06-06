// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";

import type {Labels} from "@khanacademy/wonder-blocks-dropdown";
import type {StoryComponentType} from "@storybook/react";

import Button from "@khanacademy/wonder-blocks-button";
import Color from "@khanacademy/wonder-blocks-color";
import {MultiSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import {OnePaneDialog, ModalLauncher} from "@khanacademy/wonder-blocks-modal";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentInfo from "../../../../../.storybook/components/component-info.js";
import {name, version} from "../../../package.json";
import multiSelectArgtypes from "./base-select.argtypes.js";
import {defaultLabels} from "../../util/constants.js";

export default {
    title: "Dropdown / MultiSelect",
    component: MultiSelect,
    argTypes: {
        ...multiSelectArgtypes,
        labels: {
            defaultValue: defaultLabels,
        },
    },
    args: {
        isFilterable: false,
        opened: false,
        disabled: false,
        light: false,
        shortcuts: false,
        implicitAllEnabled: false,
        id: "",
        testId: "",
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
    <OptionItem label="Mercury" value="1" />,
    <OptionItem label="Venus" value="2" />,
    <OptionItem label="Earth" value="3" disabled />,
    <OptionItem label="Mars" value="4" />,
    <OptionItem label="Jupiter" value="5" />,
    <OptionItem label="Saturn" value="6" />,
    <OptionItem label="Neptune" value="7" />,
    <OptionItem label="Uranus" value="8" />,
];

const Template = (args) => {
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

export const Default: StoryComponentType = Template.bind({});

export const ControlledOpened: StoryComponentType = (args) => {
    const [selectedValues, setSelectedValues] = React.useState([]);
    const [opened, setOpened] = React.useState(args.opened);
    React.useEffect(() => {
        // Only update opened if the args.opened prop changes (using the
        // controls panel).
        setOpened(args.opened);
    }, [args.opened]);

    return (
        <View style={styles.wrapper}>
            <Checkbox label="Open" onChange={setOpened} checked={opened} />
            <MultiSelect
                {...args}
                onChange={setSelectedValues}
                selectedValue={selectedValues}
                opened={opened}
                onToggle={setOpened}
            >
                {items}
            </MultiSelect>
        </View>
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
                "Sometimes you'll want to trigger a dropdown programmatically. This can be done by `MultiSelect` is a controlled component. The parent is responsible for managing the opening/closing of the dropdown when using this prop.\n\n" +
                "This means that you'll also have to update `opened` to the value triggered by the `onToggle` prop.",
        },
    },
    // Added to ensure that the dropdown menu is rendered using PopperJS.
    chromatic: {delay: 400},
};

// Custom MultiSelect labels
const dropdownLabels: $Shape<Labels> = {
    noneSelected: "Solar system",
    someSelected: (numSelectedValues) => `${numSelectedValues} planets`,
};

export const CustomStyles: StoryComponentType = Template.bind({});

CustomStyles.args = {
    labels: dropdownLabels,
    dropdownStyle: styles.customDropdown,
    style: styles.setWidth,
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

export const CustomStylesOpened: StoryComponentType = Template.bind({});

CustomStylesOpened.args = {
    labels: dropdownLabels,
    dropdownStyle: styles.customDropdown,
    style: styles.setWidth,
    opened: true,
};

CustomStylesOpened.storyName = "Custom styles (opened)";

CustomStylesOpened.parameters = {
    docs: {
        description: {
            story: "Here you can see an example of the previous dropdown opened",
        },
    },
};

/**
 * With shortcuts
 */
export const Shortcuts: StoryComponentType = Template.bind({});

Shortcuts.args = {
    shortcuts: true,
    opened: true,
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
export const DropdownInModal: StoryComponentType = (args) => {
    const [selectedValues, setSelectedValues] = React.useState([]);
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

DropdownInModal.storyName = "Dropdown in a modal";

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
export const ImplicitAllEnabled: StoryComponentType = Template.bind({});

ImplicitAllEnabled.args = {
    implicitAllEnabled: true,
    labels: {
        someSelected: (numSelectedValues) => `${numSelectedValues} fruits`,
        allSelected: "All planets selected",
    },
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

type Props = {|
    opened?: boolean,
|};

function VirtualizedMultiSelect(props: Props) {
    const [selectedValues, setSelectedValues] = React.useState([]);
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
}

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
    const [selectedValues, setSelectedValues] = React.useState([]);
    const [opened, setOpened] = React.useState(true);

    const labels: $Shape<Labels> = {
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
