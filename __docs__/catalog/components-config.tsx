/* eslint-disable max-lines */
import * as React from "react";
import {Temporal} from "temporal-polyfill";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import Button, {ActivityButton} from "@khanacademy/wonder-blocks-button";
import IconButton, {
    ActivityIconButton,
    ConversationIconButton,
    NodeIconButton,
} from "@khanacademy/wonder-blocks-icon-button";
import {
    Accordion,
    AccordionSection,
} from "@khanacademy/wonder-blocks-accordion";
import {
    Badge,
    StatusBadge,
    GemBadge,
    StreakBadge,
    DueBadge,
    NeutralBadge,
} from "@khanacademy/wonder-blocks-badge";
import Banner from "@khanacademy/wonder-blocks-banner";
import BirthdayPicker from "@khanacademy/wonder-blocks-birthday-picker";
import {
    Breadcrumbs,
    BreadcrumbsItem,
} from "@khanacademy/wonder-blocks-breadcrumbs";
import {Card} from "@khanacademy/wonder-blocks-card";
import {CompactCell, DetailCell} from "@khanacademy/wonder-blocks-cell";
import {
    ActionMenu,
    ActionItem,
    MultiSelect,
    SingleSelect,
    OptionItem,
    Combobox,
} from "@khanacademy/wonder-blocks-dropdown";
import {
    TextField,
    TextArea,
    Checkbox,
    CheckboxGroup,
    RadioGroup,
    Choice,
} from "@khanacademy/wonder-blocks-form";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {
    PhosphorIcon,
    Icon,
    GemIcon,
    StreakIcon,
} from "@khanacademy/wonder-blocks-icon";
import {FlexibleDialog, OnePaneDialog} from "@khanacademy/wonder-blocks-modal";
import Pill from "@khanacademy/wonder-blocks-pill";
import {Popover, PopoverContent} from "@khanacademy/wonder-blocks-popover";
import {DatePicker} from "@khanacademy/wonder-blocks-date-picker";
import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";
import SearchField from "@khanacademy/wonder-blocks-search-field";
import Switch from "@khanacademy/wonder-blocks-switch";
import {
    ResponsiveNavigationTabs,
    ResponsiveTabs,
} from "@khanacademy/wonder-blocks-tabs";
import Toolbar from "@khanacademy/wonder-blocks-toolbar";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import Link from "@khanacademy/wonder-blocks-link";
import {
    Body,
    BodyMonospace,
    BodySerif,
    BodySerifBlock,
    BodyText,
    Caption,
    Footnote,
    Heading,
    HeadingLarge,
    HeadingMedium,
    HeadingSmall,
    HeadingXSmall,
    LabelLarge,
    LabelMedium,
    LabelSmall,
    LabelXSmall,
    Tagline,
    Title,
} from "@khanacademy/wonder-blocks-typography";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import customBackgroundImage from "../../static/celebration_bg.svg";
import {reallyLongText} from "../components/text-for-testing";

export type VariantProp<T> = {
    [K in keyof T & string]: {
        propName: K;
        options: ReadonlyArray<T[K]>;
    };
}[keyof T & string];

export type ComponentConfig<ComponentType extends React.ElementType> = {
    name: string;
    Component: ComponentType;
    variantProps: ReadonlyArray<VariantProp<PropsFor<ComponentType>>>;
    defaultProps: PropsFor<ComponentType>;
    states: ReadonlyArray<{
        name: string;
        props: Partial<PropsFor<ComponentType>>;
    }>;
    package: string;
    /**
     * When true, each variant is rendered in its own full-width row in the
     * catalog so the component can span 100% width
     */
    fullWidth?: boolean;
};

// Helper function to create a type-safe component config
// This function validates that variant prop options match the component's prop types
const createComponentConfig = <C extends React.ElementType>(
    config: ComponentConfig<C>,
): ComponentConfig<C> => config;

const legacyTypographyComponents = [
    {name: "BodyMonospace", TypographyComponent: BodyMonospace},
    {name: "BodySerifBlock", TypographyComponent: BodySerifBlock},
    {name: "BodySerif", TypographyComponent: BodySerif},
    {name: "Body", TypographyComponent: Body},
    {name: "Caption", TypographyComponent: Caption},
    {name: "Footnote", TypographyComponent: Footnote},
    {name: "HeadingLarge", TypographyComponent: HeadingLarge},
    {name: "HeadingMedium", TypographyComponent: HeadingMedium},
    {name: "HeadingSmall", TypographyComponent: HeadingSmall},
    {name: "HeadingXSmall", TypographyComponent: HeadingXSmall},
    {name: "LabelLarge", TypographyComponent: LabelLarge},
    {name: "LabelMedium", TypographyComponent: LabelMedium},
    {name: "LabelSmall", TypographyComponent: LabelSmall},
    {name: "LabelXSmall", TypographyComponent: LabelXSmall},
    {name: "Tagline", TypographyComponent: Tagline},
    {name: "Title", TypographyComponent: Title},
];

const LegacyTypographyComponents = () => {
    return (
        <View style={{gap: sizing.size_120}}>
            {legacyTypographyComponents.map(({name, TypographyComponent}) => (
                // Use span tag to avoid semantic issues with header tags in a11y tools
                // This story is for visual testing purposes
                <TypographyComponent key={name} tag="span">
                    {name}
                </TypographyComponent>
            ))}
        </View>
    );
};

const formFieldsToUseWithLabeledField: {
    componentName: string;
    FormComponent: React.ElementType;
    componentProps: PropsFor<React.ElementType>;
}[] = [
    {
        componentName: "TextField",
        FormComponent: TextField,
        componentProps: {},
    },
    {
        componentName: "TextArea",
        FormComponent: TextArea,
        componentProps: {},
    },
    {
        componentName: "SingleSelect",
        FormComponent: SingleSelect,
        componentProps: {
            placeholder: "Placeholder",
            children: [
                <OptionItem key="option1" label="Option 1" value="option1" />,
            ],
        },
    },
    {
        componentName: "MultiSelect",
        FormComponent: MultiSelect,
        componentProps: {
            placeholder: "",
            children: [
                <OptionItem key="option1" label="Option 1" value="option1" />,
            ],
        },
    },
];

/**
 * Components to include in the catalog
 */
export const components = [
    /**
     * wonder-blocks-accordion
     */
    createComponentConfig({
        name: "Accordion",
        Component: Accordion,
        variantProps: [
            {
                propName: "caretPosition",
                options: ["start", "end"],
            },
            {
                propName: "cornerKind",
                options: ["square", "rounded", "rounded-per-section"],
            },
        ],
        defaultProps: {
            initialExpandedIndex: 1,
            children: [
                <AccordionSection key="section-1" header="First Section">
                    This is the content of the first section
                </AccordionSection>,
                <AccordionSection key="section-2" header="Second Section">
                    This is the content of the second section
                </AccordionSection>,
                <AccordionSection key="section-3" header="Third Section">
                    This is the content of the third section
                </AccordionSection>,
            ],
        },
        states: [],
        package: "wonder-blocks-accordion",
    }),
    /**
     * wonder-blocks-badge
     */
    createComponentConfig({
        name: "StatusBadge",
        Component: StatusBadge,
        variantProps: [
            {
                propName: "showBorder",
                options: [true, false],
            },
            {
                propName: "kind",
                options: ["info", "success", "warning", "critical"],
            },
            {
                propName: "icon",
                options: [
                    <PhosphorIcon icon={IconMappings.cookieBold} />,
                    undefined,
                ],
            },
        ],
        defaultProps: {
            label: "StatusBadge",
            icon: <PhosphorIcon icon={IconMappings.cookieBold} />,
        },
        states: [],
        package: "wonder-blocks-badge",
    }),
    createComponentConfig({
        name: "NeutralBadge",
        Component: NeutralBadge,
        variantProps: [
            {
                propName: "showBorder",
                options: [true, false],
            },
            {
                propName: "icon",
                options: [
                    <PhosphorIcon icon={IconMappings.cookieBold} />,
                    undefined,
                ],
            },
        ],
        defaultProps: {
            label: "NeutralBadge",
        },
        states: [],
        package: "wonder-blocks-badge",
    }),
    createComponentConfig({
        name: "GemBadge",
        Component: GemBadge,
        variantProps: [
            {
                propName: "label",
                options: ["GemBadge", ""],
            },
            {
                propName: "showIcon",
                options: [true, false],
            },
        ],
        defaultProps: {
            label: "GemBadge",
        },
        states: [],
        package: "wonder-blocks-badge",
    }),
    createComponentConfig({
        name: "StreakBadge",
        Component: StreakBadge,
        variantProps: [
            {
                propName: "label",
                options: ["StreakBadge", ""],
            },
            {
                propName: "showIcon",
                options: [true, false],
            },
        ],
        defaultProps: {
            label: "StreakBadge",
        },
        states: [],
        package: "wonder-blocks-badge",
    }),
    createComponentConfig({
        name: "DueBadge",
        Component: DueBadge,
        variantProps: [
            {
                propName: "kind",
                options: ["due", "overdue"],
            },
            {
                propName: "showIcon",
                options: [true, false],
            },
        ],
        defaultProps: {
            label: "DueBadge",
        },
        states: [],
        package: "wonder-blocks-badge",
    }),
    createComponentConfig({
        name: "Badge",
        Component: Badge,
        variantProps: [
            {
                propName: "showBorder",
                options: [true, false],
            },
            {
                propName: "icon",
                options: [
                    <PhosphorIcon icon={IconMappings.cookieBold} />,
                    undefined,
                ],
            },
        ],
        defaultProps: {
            label: "Badge",
        },
        states: [],
        package: "wonder-blocks-badge",
    }),
    /**
     * wonder-blocks-banner
     */
    createComponentConfig({
        name: "Banner",
        Component: Banner,
        variantProps: [
            {
                propName: "kind",
                options: ["info", "success", "warning", "critical"],
            },
            {
                propName: "onDismiss",
                options: [() => {}, undefined],
            },
            {
                propName: "actions",
                options: [
                    [
                        {
                            type: "button",
                            title: "Action",
                            onClick: () => {},
                        },
                    ],
                    [],
                ],
            },
        ],
        defaultProps: {
            text: "This is a banner message",
        },
        states: [],
        package: "wonder-blocks-banner",
    }),
    /**
     * wonder-blocks-birthday-picker
     */
    createComponentConfig({
        name: "BirthdayPicker",
        Component: BirthdayPicker,
        variantProps: [
            {
                propName: "defaultValue",
                options: ["2021-05-26", undefined],
            },
            {
                propName: "monthYearOnly",
                options: [true, false],
            },
        ],
        defaultProps: {
            onChange: () => {},
        },
        states: [
            {name: "Disabled", props: {disabled: true}},
            {name: "Error", props: {defaultValue: "2030-07-19"}},
        ],
        package: "wonder-blocks-birthday-picker",
    }),
    /**
     * wonder-blocks-breadcrumbs
     */
    createComponentConfig({
        name: "Breadcrumbs",
        Component: Breadcrumbs,
        variantProps: [],
        defaultProps: {
            children: [
                <BreadcrumbsItem key="home">
                    <Link href="/">Course</Link>
                </BreadcrumbsItem>,
                <BreadcrumbsItem key="category">
                    <Link href="/">Unit</Link>
                </BreadcrumbsItem>,
                <BreadcrumbsItem key="current">Lesson</BreadcrumbsItem>,
            ],
        },
        states: [],
        package: "wonder-blocks-breadcrumbs",
    }),
    /**
     * wonder-blocks-button
     */
    createComponentConfig({
        name: "Button",
        Component: Button,
        variantProps: [
            {
                propName: "size",
                options: ["small", "medium", "large"],
            },
            {
                propName: "kind",
                options: ["primary", "secondary", "tertiary"],
            },
            {
                propName: "actionType",
                options: ["progressive", "destructive", "neutral"],
            },
        ],
        defaultProps: {
            children: "Button",
            startIcon: IconMappings.cookieBold,
            endIcon: IconMappings.iceCreamBold,
            "aria-label": "ExampleButton",
        },
        states: [
            {name: "Disabled", props: {disabled: true}},
            {name: "Spinner", props: {spinner: true}},
        ],
        package: "wonder-blocks-button",
    }),
    createComponentConfig({
        name: "ActivityButton",
        Component: ActivityButton,
        variantProps: [
            {
                propName: "kind",
                options: ["primary", "secondary", "tertiary"],
            },
        ],
        defaultProps: {
            children: "ActivityButton",
            startIcon: IconMappings.cookieBold,
            endIcon: IconMappings.iceCreamBold,
        },
        states: [{name: "Disabled", props: {disabled: true}}],
        package: "wonder-blocks-button",
    }),
    /**
     * wonder-blocks-card
     */
    createComponentConfig({
        name: "Card",
        Component: Card,
        variantProps: [
            {
                propName: "paddingSize",
                options: ["medium", "small", "none"],
            },
            {
                propName: "background",
                options: ["base-subtle", "base-default", customBackgroundImage],
            },
            {
                propName: "elevation",
                options: ["none", "low"],
            },
            {
                propName: "borderRadius",
                options: ["small", "medium"],
            },
        ],
        defaultProps: {
            children: (
                <>
                    <Heading>Card Component</Heading>
                    <BodyText>This is a card component</BodyText>
                </>
            ),
            styles: {root: {gap: sizing.size_040}},
        },
        states: [{name: "Dismissible", props: {onDismiss: () => {}}}],
        package: "wonder-blocks-card",
    }),
    /**
     * wonder-blocks-cell
     */
    createComponentConfig({
        name: "CompactCell",
        Component: CompactCell,
        variantProps: [
            {
                propName: "horizontalRule",
                options: ["full-width", "inset", "none"],
            },
        ],
        defaultProps: {
            title: "CompactCell",
            leftAccessory: <PhosphorIcon icon={IconMappings.cookieBold} />,
            rightAccessory: <PhosphorIcon icon={IconMappings.caretRightBold} />,
            onClick: () => {},
        },
        states: [
            {name: "Active", props: {active: true}},
            {name: "Disabled", props: {disabled: true}},
        ],
        package: "wonder-blocks-cell",
    }),
    createComponentConfig({
        name: "DetailCell",
        Component: DetailCell,
        variantProps: [
            {
                propName: "horizontalRule",
                options: ["full-width", "inset", "none"],
            },
        ],
        defaultProps: {
            title: "DetailCell",
            leftAccessory: <PhosphorIcon icon={IconMappings.cookieBold} />,
            rightAccessory: <PhosphorIcon icon={IconMappings.caretRightBold} />,
            onClick: () => {},
            subtitle1: "Subtitle1",
            subtitle2: "Subtitle2",
        },
        states: [
            {name: "Active", props: {active: true}},
            {name: "Disabled", props: {disabled: true}},
        ],
        package: "wonder-blocks-cell",
    }),
    /**
     * wonder-blocks-date-picker
     */
    createComponentConfig({
        name: "DatePicker",
        Component: DatePicker,
        variantProps: [],
        defaultProps: {
            updateDate: () => {},
            placeholder: "Select a date",
            inputAriaLabel: "Select a date",
        },
        states: [{name: "Disabled", props: {disabled: true}}],
        package: "wonder-blocks-date-picker",
    }),
    /**
     * wonder-blocks-dropdown
     */
    createComponentConfig({
        name: "ActionMenu",
        // Wrapping the component in a function component to normalize types
        // since it is a class component with getDerivedStateFromProps
        Component: (props: PropsFor<typeof ActionMenu>) => (
            <ActionMenu {...props} />
        ),
        variantProps: [
            {
                propName: "disabled",
                options: [false, true],
            },
        ],
        defaultProps: {
            menuText: "ActionMenu",

            children: [<ActionItem key="option1" label="Option 1" />],
        },
        states: [],
        package: "wonder-blocks-dropdown",
    }),
    createComponentConfig({
        name: "ActionItem",
        Component: (props) => (
            <div role="menu" aria-label="Example ActionItem">
                <ActionItem {...props} />
            </div>
        ),
        variantProps: [
            {
                propName: "horizontalRule",
                options: ["none", "full-width", "inset"],
            },
        ],
        defaultProps: {
            label: "Action Item",
            onClick: () => {},
            leftAccessory: <PhosphorIcon icon={IconMappings.cookieBold} />,
            rightAccessory: <PhosphorIcon icon={IconMappings.caretRightBold} />,
            subtitle1: "Subtitle 1",
            subtitle2: "Subtitle 2",
        },
        states: [
            {name: "Disabled", props: {disabled: true}},
            {name: "Active", props: {active: true}},
        ],
        package: "wonder-blocks-dropdown",
    }),
    createComponentConfig({
        name: "MultiSelect",
        Component: MultiSelect,
        variantProps: [
            {
                propName: "selectedValues",
                options: [[], ["option1"]],
            },
        ],
        defaultProps: {
            onChange: () => {},
            children: [
                <OptionItem key="option1" label="Option 1" value="option1" />,
                <OptionItem key="option2" label="Option 2" value="option2" />,
                <OptionItem key="option3" label="Option 3" value="option3" />,
            ],
            "aria-label": "Example MultiSelect",
        },
        states: [
            {name: "Disabled", props: {disabled: true}},
            {name: "Error", props: {error: true}},
        ],
        package: "wonder-blocks-dropdown",
    }),
    createComponentConfig({
        name: "SingleSelect",
        Component: SingleSelect,
        variantProps: [
            {
                propName: "selectedValue",
                options: ["", "option1"],
            },
            {propName: "placeholder", options: ["", "Select an option"]},
        ],
        defaultProps: {
            placeholder: "Select an option",
            onChange: () => {},
            children: [
                <OptionItem key="option1" label="Option 1" value="option1" />,
                <OptionItem key="option2" label="Option 2" value="option2" />,
                <OptionItem key="option3" label="Option 3" value="option3" />,
            ],
            "aria-label": "Example SingleSelect",
        },
        states: [
            {name: "Disabled", props: {disabled: true}},
            {name: "Error", props: {error: true}},
        ],
        package: "wonder-blocks-dropdown",
    }),
    createComponentConfig({
        name: "OptionItem",
        Component: (props) => (
            <div role="listbox" aria-label="Example OptionItem">
                <OptionItem {...props} />
            </div>
        ),
        variantProps: [
            {
                propName: "selected",
                options: [false, true],
            },
            {
                propName: "variant",
                options: ["check", "checkbox"],
            },
        ],
        defaultProps: {
            label: "Option Item",
            value: "option-item",
        },
        states: [
            {name: "Disabled", props: {disabled: true}},
            {
                name: "With Accessories",
                props: {
                    leftAccessory: (
                        <PhosphorIcon icon={IconMappings.cookieBold} />
                    ),
                    rightAccessory: (
                        <PhosphorIcon icon={IconMappings.caretRightBold} />
                    ),
                    variant: undefined,
                },
            },
            {
                name: "With Subtitles",
                props: {
                    subtitle1: "Subtitle 1",
                    subtitle2: "Subtitle 2",
                },
            },
        ],
        package: "wonder-blocks-dropdown",
    }),
    createComponentConfig({
        name: "Combobox (single)",
        Component: (props: PropsFor<typeof Combobox>) => (
            <View style={{maxWidth: "200px"}}>
                <Combobox {...props} />
            </View>
        ),
        variantProps: [
            {
                propName: "value",
                options: ["", "option1"],
            },
            {propName: "placeholder", options: ["", "Select an option"]},
        ],
        defaultProps: {
            value: "",
            selectionType: "single",
            placeholder: "Select an option",
            children: [
                <OptionItem key="option1" label="Option 1" value="option1" />,
                <OptionItem key="option2" label="Option 2" value="option2" />,
                <OptionItem key="option3" label="Option 3" value="option3" />,
            ],
        },
        states: [
            {name: "Disabled", props: {disabled: true}},
            {name: "Error", props: {error: true}},
        ],
        package: "wonder-blocks-dropdown",
    }),
    createComponentConfig({
        name: "Combobox (multiple)",
        Component: (props: PropsFor<typeof Combobox>) => (
            <View style={{maxWidth: "200px"}}>
                <Combobox {...props} />
            </View>
        ),
        variantProps: [
            {
                propName: "value",
                options: ["", ["option1", "option2"]],
            },
            {propName: "placeholder", options: ["", "Select options"]},
        ],
        defaultProps: {
            value: [],
            selectionType: "multiple",
            children: [
                <OptionItem key="option1" label="Option 1" value="option1" />,
                <OptionItem key="option2" label="Option 2" value="option2" />,
                <OptionItem key="option3" label="Option 3" value="option3" />,
            ],
        },
        states: [
            {name: "Disabled", props: {disabled: true}},
            {name: "Error", props: {error: true}},
        ],
        package: "wonder-blocks-dropdown",
    }),
    /**
     * wonder-blocks-form
     */
    createComponentConfig({
        name: "TextField",
        Component: TextField,
        variantProps: [
            {
                propName: "value",
                options: ["", "Value"],
            },
            {
                propName: "placeholder",
                options: ["", "Placeholder"],
            },
        ],
        defaultProps: {
            value: "",
            onChange: () => {},
            "aria-label": "Example TextField",
        },
        states: [
            {name: "Disabled", props: {disabled: true}},
            {name: "Error", props: {error: true}},
            {name: "Read Only", props: {readOnly: true}},
        ],
        package: "wonder-blocks-form",
    }),
    createComponentConfig({
        name: "TextArea",
        Component: TextArea,
        variantProps: [
            {
                propName: "value",
                options: ["", "Value"],
            },
            {
                propName: "placeholder",
                options: ["", "Placeholder"],
            },
        ],
        defaultProps: {
            value: "",
            onChange: () => {},
            "aria-label": "Example TextArea",
        },
        states: [
            {name: "Disabled", props: {disabled: true}},
            {name: "Error", props: {error: true}},
            {name: "Read Only", props: {readOnly: true}},
        ],
        package: "wonder-blocks-form",
    }),
    createComponentConfig({
        name: "Checkbox",
        Component: Checkbox,
        variantProps: [
            {
                propName: "checked",
                options: [false, true, null],
            },
        ],
        defaultProps: {
            checked: false,
            onChange: () => {},
            label: "Label",
            description: "Description for the checkbox",
        },
        states: [
            {name: "Disabled", props: {disabled: true}},
            {name: "Error", props: {error: true}},
        ],
        package: "wonder-blocks-form",
    }),
    createComponentConfig({
        name: "CheckboxGroup",
        Component: CheckboxGroup,
        variantProps: [
            {
                propName: "errorMessage",
                options: ["", "Error message"],
            },
        ],
        defaultProps: {
            groupName: "checkbox-group",
            selectedValues: ["choice1"],
            onChange: () => {},
            label: "Label",
            description: "Description for the checkbox group",
            children: [
                <Choice key="choice1" label="Choice 1" value="choice1" />,
                <Choice
                    key="choice2"
                    label="Choice 2"
                    value="choice2"
                    description="Description for choice 2"
                />,
                <Choice
                    key="choice3"
                    label="Choice 3"
                    value="choice3"
                    description="Description for choice 3"
                    disabled={true}
                />,
            ],
        },
        states: [],
        package: "wonder-blocks-form",
    }),
    createComponentConfig({
        name: "RadioGroup",
        Component: RadioGroup,
        variantProps: [
            {
                propName: "errorMessage",
                options: ["", "Error message"],
            },
        ],
        defaultProps: {
            groupName: "radio-group",
            selectedValue: "choice1",
            onChange: () => {},
            label: "Label",
            description: "Description for the radio group",
            children: [
                <Choice key="choice1" label="Choice 1" value="choice1" />,
                <Choice
                    key="choice2"
                    label="Choice 2"
                    value="choice2"
                    description="Description for choice 2"
                />,
                <Choice
                    key="choice3"
                    label="Choice 3"
                    value="choice3"
                    description="Description for choice 3"
                    disabled={true}
                />,
            ],
        },
        states: [],
        package: "wonder-blocks-form",
    }),
    /**
     * wonder-blocks-icon
     */
    createComponentConfig({
        name: "PhosphorIcon",
        Component: PhosphorIcon,
        variantProps: [
            {
                propName: "size",
                options: ["small", "medium", "large", "xlarge"],
            },
        ],
        defaultProps: {
            icon: IconMappings.cookieBold,
            color: semanticColor.core.foreground.neutral.subtle,
        },
        states: [],
        package: "wonder-blocks-icon",
    }),
    createComponentConfig({
        name: "Icon (with custom icons, GemIcon, StreakIcon)",
        Component: Icon,
        variantProps: [
            {
                propName: "size",
                options: ["small", "medium", "large", "xlarge"],
            },
            {
                propName: "children",
                options: [
                    <img src="./logo.svg" alt="Wonder Blocks Logo" />,
                    <GemIcon aria-label="Gem icon" />,
                    <StreakIcon aria-label="Streak icon" />,
                ],
            },
        ],
        defaultProps: {
            children: <></>,
        },
        states: [],
        package: "wonder-blocks-icon",
    }),
    /**
     * wonder-blocks-icon-button
     */
    createComponentConfig({
        name: "IconButton",
        Component: IconButton,
        variantProps: [
            {
                propName: "size",
                options: ["small", "medium", "large"],
            },
            {
                propName: "kind",
                options: ["primary", "secondary", "tertiary"],
            },
            {
                propName: "actionType",
                options: ["progressive", "destructive", "neutral"],
            },
        ],
        defaultProps: {
            icon: IconMappings.cookieBold,
            "aria-label": "Example IconButton",
        },
        states: [{name: "Disabled", props: {disabled: true}}],
        package: "wonder-blocks-icon-button",
    }),
    createComponentConfig({
        name: "ActivityIconButton",
        Component: ActivityIconButton,
        variantProps: [
            {
                propName: "actionType",
                options: ["progressive", "neutral"],
            },
            {
                propName: "kind",
                options: ["primary", "secondary", "tertiary"],
            },
        ],
        defaultProps: {
            icon: IconMappings.cookieBold,
            // "aria-label": "Activity Icon Button",
            label: "Label",
        },
        states: [{name: "Disabled", props: {disabled: true}}],
        package: "wonder-blocks-icon-button",
    }),
    createComponentConfig({
        name: "ConversationIconButton",
        Component: ConversationIconButton,
        variantProps: [
            {
                propName: "actionType",
                options: ["progressive", "neutral"],
            },
            {
                propName: "kind",
                options: ["primary", "secondary", "tertiary"],
            },
        ],
        defaultProps: {
            icon: IconMappings.cookieBold,
            "aria-label": "Conversation Icon Button",
        },
        states: [{name: "Disabled", props: {disabled: true}}],
        package: "wonder-blocks-icon-button",
    }),
    createComponentConfig({
        name: "NodeIconButton",
        Component: NodeIconButton,
        variantProps: [
            {
                propName: "size",
                options: ["small", "large"],
            },
            {
                propName: "actionType",
                options: ["notStarted", "attempted", "complete"],
            },
        ],
        defaultProps: {
            icon: IconMappings.cookieBold,
            "aria-label": "Node Icon Button",
        },
        states: [{name: "Disabled", props: {disabled: true}}],
        package: "wonder-blocks-icon-button",
    }),
    /**
     * wonder-blocks-labeled-field
     */
    ...formFieldsToUseWithLabeledField.map(
        ({componentName, FormComponent, componentProps}) =>
            createComponentConfig({
                name: `LabeledField with ${componentName}`,
                Component: LabeledField,
                variantProps: [],
                defaultProps: {
                    field: (
                        <FormComponent
                            value=""
                            onChange={() => {}}
                            {...componentProps}
                        />
                    ),
                    label: "Label",
                    description: "Description for the field",
                    additionalHelperMessage: "Additional helper text",
                    contextLabel: "Context label",
                    styles: {root: {width: "300px"}},
                },
                states: [
                    {
                        name: "Read Only",
                        props: {
                            readOnlyMessage: "This field is read only",
                        },
                    },
                    {
                        name: "Error",
                        props: {
                            errorMessage: "This field has an error",
                        },
                    },
                    {
                        name: "Disabled",
                        props: {
                            field: (
                                <FormComponent
                                    value=""
                                    onChange={() => {}}
                                    {...componentProps}
                                    disabled
                                />
                            ),
                        },
                    },
                ],
                package: "wonder-blocks-labeled-field",
            }),
    ),
    /**
     * wonder-blocks-link
     */
    createComponentConfig({
        name: "Link",
        Component: Link,
        variantProps: [
            {
                propName: "inline",
                options: [false, true],
            },
            {
                propName: "target",
                options: [undefined, "_blank"],
            },
        ],
        defaultProps: {
            href: "https://khanacademy.org",
            children: "Link",
        },
        states: [
            {
                name: "Icons",
                props: {
                    startIcon: <PhosphorIcon icon={IconMappings.cookieBold} />,
                    endIcon: (
                        <PhosphorIcon icon={IconMappings.caretRightBold} />
                    ),
                },
            },
        ],
        package: "wonder-blocks-link",
    }),
    /**
     * wonder-blocks-modal
     */
    createComponentConfig({
        name: "FlexibleDialog",
        Component: FlexibleDialog,
        variantProps: [],
        defaultProps: {
            title: "Dialog Title",
            closeButtonVisible: true,
            content: (
                <>
                    <BodyText>{reallyLongText}</BodyText>
                </>
            ),
        },
        states: [],
        package: "wonder-blocks-modal",
    }),
    createComponentConfig({
        name: "OnePaneDialog",
        Component: OnePaneDialog,
        variantProps: [],
        defaultProps: {
            title: "Dialog Title",
            subtitle: "Dialog Subtitle",
            closeButtonVisible: true,
            content: (
                <>
                    <BodyText>{reallyLongText}</BodyText>
                </>
            ),
            footer: <Button>Action</Button>,
            style: {
                height: "400px",
            },
        },
        states: [],
        package: "wonder-blocks-modal",
    }),
    /**
     * wonder-blocks-pill
     */
    createComponentConfig({
        name: "Pill",
        Component: Pill,
        variantProps: [
            {
                propName: "size",
                options: ["small", "medium", "large"],
            },
            {
                propName: "kind",
                options: [
                    "neutral",
                    "accent",
                    "info",
                    "success",
                    "warning",
                    "critical",
                    "transparent",
                ],
            },
        ],
        defaultProps: {
            children: "Pill",
        },
        states: [
            {
                name: "Clickable",
                props: {
                    onClick: () => {},
                },
            },
        ],
        package: "wonder-blocks-pill",
    }),
    /**
     * wonder-blocks-popover
     */
    createComponentConfig({
        name: "PopoverContent",
        Component: PopoverContent,
        variantProps: [],
        defaultProps: {
            title: "Popover Title",
            content: "This is the content of the popover.",
            closeButtonVisible: true,
            actions: <Button>Action</Button>,
        },
        states: [
            {
                name: "With Icon",
                props: {
                    icon: (
                        <img
                            src="./logo.svg"
                            width="100%"
                            alt="Wonder Blocks logo"
                        />
                    ),
                },
            },
            {
                name: "With Image",
                props: {
                    image: (
                        <img
                            src="./illustration.svg"
                            alt="An illustration of a person skating on a pencil"
                        />
                    ),
                },
            },
        ],
        package: "wonder-blocks-popover",
    }),
    /**
     * wonder-blocks-progress-spinner
     */
    createComponentConfig({
        name: "CircularSpinner",
        Component: CircularSpinner,
        variantProps: [
            {
                propName: "size",
                options: ["xsmall", "small", "medium", "large"],
            },
        ],
        defaultProps: {},
        states: [],
        package: "wonder-blocks-progress-spinner",
    }),
    /**
     * wonder-blocks-search-field
     */
    createComponentConfig({
        name: "SearchField",
        Component: SearchField,
        variantProps: [
            {
                propName: "value",
                options: ["", "Search text"],
            },
            {
                propName: "placeholder",
                options: ["", "Search..."],
            },
        ],
        defaultProps: {
            value: "",
            onChange: () => {},
            "aria-label": "Example SearchField",
        },
        states: [
            {name: "Disabled", props: {disabled: true}},
            {name: "Error", props: {error: true}},
        ],
        package: "wonder-blocks-search-field",
    }),
    /**
     * wonder-blocks-switch
     */
    createComponentConfig({
        name: "Switch",
        Component: Switch,
        variantProps: [
            {
                propName: "icon",
                options: [
                    undefined,
                    <PhosphorIcon icon={IconMappings.cookieBold} />,
                ],
            },
            {
                propName: "checked",
                options: [true, false],
            },
        ],
        defaultProps: {
            checked: false,
            onChange: () => {},
            "aria-label": "Switch",
        },
        states: [{name: "Disabled", props: {disabled: true}}],
        package: "wonder-blocks-switch",
    }),
    /**
     * wonder-blocks-tabs
     */
    createComponentConfig({
        name: "ResponsiveNavigationTabs",
        Component: ResponsiveNavigationTabs,
        variantProps: [
            {
                propName: "showDivider",
                options: [false, true],
            },
            {
                propName: "tabs",
                options: [
                    [
                        {
                            id: "tab1",
                            label: "Tab 1",
                            href: "#tab1",
                        },
                        {
                            id: "tab2",
                            label: "Tab 2",
                            href: "#tab2",
                        },
                        {
                            id: "tab3",
                            label: "Tab 3",
                            href: "#tab3",
                        },
                        {
                            id: "tab4",
                            label: "Tab 4",
                            href: "#tab4",
                        },
                        {
                            id: "tab5",
                            label: "Tab 5",
                            href: "#tab5",
                        },
                        {
                            id: "tab6",
                            label: "Tab 6",
                            href: "#tab6",
                        },
                    ],
                    [
                        {
                            id: "tab1",
                            label: "Tab 1",
                            href: "#tab1",
                            icon: (
                                <PhosphorIcon icon={IconMappings.cookieBold} />
                            ),
                        },
                        {
                            id: "tab2",
                            label: "Tab 2",
                            href: "#tab2",
                            icon: (
                                <PhosphorIcon icon={IconMappings.cookieBold} />
                            ),
                        },
                        {
                            id: "tab3",
                            label: "Tab 3",
                            href: "#tab3",
                            icon: (
                                <PhosphorIcon icon={IconMappings.cookieBold} />
                            ),
                        },
                        {
                            id: "tab4",
                            label: "Tab 4",
                            href: "#tab4",
                            icon: (
                                <PhosphorIcon icon={IconMappings.cookieBold} />
                            ),
                        },
                        {
                            id: "tab5",
                            label: "Tab 5",
                            href: "#tab5",
                            icon: (
                                <PhosphorIcon icon={IconMappings.cookieBold} />
                            ),
                        },
                        {
                            id: "tab6",
                            label: "Tab 6",
                            href: "#tab6",
                            icon: (
                                <PhosphorIcon icon={IconMappings.cookieBold} />
                            ),
                        },
                    ],
                ],
            },
        ],
        defaultProps: {
            "aria-label": "Navigation tabs",
            selectedTabId: "tab1",
            onTabSelected: () => {},
            tabs: [],
        },
        states: [],
        package: "wonder-blocks-tabs",
        fullWidth: true,
    }),
    createComponentConfig({
        name: "ResponsiveTabs",
        Component: ResponsiveTabs,
        variantProps: [
            {
                propName: "tabs",
                options: [
                    [
                        {
                            id: "tab1",
                            label: "Tab 1",
                            panel: <BodyText>Content for Tab 1</BodyText>,
                        },
                        {
                            id: "tab2",
                            label: "Tab 2",
                            panel: <BodyText>Content for Tab 2</BodyText>,
                        },
                        {
                            id: "tab3",
                            label: "Tab 3",
                            panel: <BodyText>Content for Tab 3</BodyText>,
                        },
                        {
                            id: "tab4",
                            label: "Tab 4",
                            panel: <BodyText>Content for Tab 4</BodyText>,
                        },
                        {
                            id: "tab5",
                            label: "Tab 5",
                            panel: <BodyText>Content for Tab 5</BodyText>,
                        },
                        {
                            id: "tab6",
                            label: "Tab 6",
                            panel: <BodyText>Content for Tab 6</BodyText>,
                        },
                    ],
                    [
                        {
                            id: "tab1",
                            label: "Tab 1",
                            panel: <BodyText>Content for Tab 1</BodyText>,
                            icon: (
                                <PhosphorIcon icon={IconMappings.cookieBold} />
                            ),
                        },
                        {
                            id: "tab2",
                            label: "Tab 2",
                            panel: <BodyText>Content for Tab 2</BodyText>,
                            icon: (
                                <PhosphorIcon icon={IconMappings.cookieBold} />
                            ),
                        },
                        {
                            id: "tab3",
                            label: "Tab 3",
                            panel: <BodyText>Content for Tab 3</BodyText>,
                            icon: (
                                <PhosphorIcon icon={IconMappings.cookieBold} />
                            ),
                        },
                        {
                            id: "tab4",
                            label: "Tab 4",
                            panel: <BodyText>Content for Tab 4</BodyText>,
                            icon: (
                                <PhosphorIcon icon={IconMappings.cookieBold} />
                            ),
                        },
                        {
                            id: "tab5",
                            label: "Tab 5",
                            panel: <BodyText>Content for Tab 5</BodyText>,
                            icon: (
                                <PhosphorIcon icon={IconMappings.cookieBold} />
                            ),
                        },
                        {
                            id: "tab6",
                            label: "Tab 6",
                            panel: <BodyText>Content for Tab 6</BodyText>,
                            icon: (
                                <PhosphorIcon icon={IconMappings.cookieBold} />
                            ),
                        },
                    ],
                ],
            },
        ],
        defaultProps: {
            "aria-label": "Tabs",
            selectedTabId: "tab1",
            onTabSelected: () => {},
            tabs: [],
        },
        states: [],
        package: "wonder-blocks-tabs",
        fullWidth: true,
    }),
    /**
     * wonder-blocks-toolbar
     */
    createComponentConfig({
        name: "Toolbar",
        Component: Toolbar,
        variantProps: [
            {
                propName: "size",
                options: ["small", "medium"],
            },
            {
                propName: "color",
                options: ["light", "dark"],
            },
        ],
        defaultProps: {
            title: "Title",
            leftContent: (
                <IconButton
                    icon={IconMappings.xBold}
                    kind="tertiary"
                    actionType="neutral"
                    aria-label="Close"
                />
            ),
            rightContent: <Button>Action</Button>,
        },
        states: [
            {
                name: "With Subtitle",
                props: {
                    subtitle: "Subtitle",
                },
            },
        ],
        package: "wonder-blocks-toolbar",
        fullWidth: true,
    }),
    /**
     * wonder-blocks-typography
     */
    createComponentConfig({
        name: "Heading",
        Component: Heading,
        variantProps: [
            {
                propName: "size",
                options: ["small", "medium", "large", "xlarge", "xxlarge"],
            },
            {
                propName: "weight",
                options: ["medium", "semi", "bold"],
            },
        ],
        defaultProps: {
            children: "HeadingText",
            // Default to h4 tag to avoid semantic issues with header tags in a11y tools
            // This story is for visual testing purposes
            tag: "h4",
        },
        states: [],
        package: "wonder-blocks-typography",
    }),
    createComponentConfig({
        name: "BodyText",
        Component: BodyText,
        variantProps: [
            {
                propName: "size",
                options: ["xsmall", "small", "medium"],
            },
            {
                propName: "weight",
                options: ["medium", "semi", "bold"],
            },
        ],
        defaultProps: {
            children: "BodyText",
        },
        states: [],
        package: "wonder-blocks-typography",
    }),
    createComponentConfig({
        name: "Legacy Typography",
        Component: LegacyTypographyComponents,
        variantProps: [],
        defaultProps: {},
        states: [],
        package: "wonder-blocks-typography",
    }),
];

/**
 * Keep track of components with opened state separately so that we can include
 * the popper in visual tests since they're part of the initial viewport
 */
export const floatingComponents = [
    createComponentConfig({
        name: "DatePicker",
        Component: (props) => {
            const ref = React.useRef<HTMLDivElement>(null);

            React.useEffect(() => {
                // Wait for the DatePicker to render, then dispatch a click
                const timeout = setTimeout(() => {
                    // Click the input to open the calendar
                    const el = ref.current?.querySelector("input");
                    if (el) {
                        el.click();
                    }
                }, 0);
                return () => clearTimeout(timeout);
            }, []);

            return (
                <div ref={ref}>
                    <DatePicker {...props} />
                </div>
            );
        },
        variantProps: [],
        defaultProps: {
            selectedDate: Temporal.PlainDate.from({
                year: 2025,
                month: 1,
                day: 1,
            }),
            placeholder: "Select a date",
            updateDate: () => {},
            style: {
                marginInlineEnd: "100px",
            },
        },
        states: [],
        package: "wonder-blocks-date-picker",
    }),
    createComponentConfig({
        name: "ActionMenu",
        // Wrapping the component in a function component to normalize types
        // since it is a class component with getDerivedStateFromProps
        Component: (props: PropsFor<typeof ActionMenu>) => {
            const [opened, setOpened] = React.useState(false);

            React.useEffect(() => {
                // Workaround to ensure opened popper is placed properly for visual
                // tests
                setTimeout(() => {
                    setOpened(true);
                }, 0);
            }, []);
            return <ActionMenu {...props} opened={opened} />;
        },
        variantProps: [],
        defaultProps: {
            opened: true,
            menuText: "ActionMenu",
            children: [
                <ActionItem
                    key="option1"
                    label="Option 1"
                    leftAccessory={
                        <PhosphorIcon icon={IconMappings.cookieBold} />
                    }
                    rightAccessory={
                        <PhosphorIcon icon={IconMappings.caretRightBold} />
                    }
                />,
                <ActionItem
                    key="option2"
                    label="Option 2"
                    leftAccessory={
                        <PhosphorIcon icon={IconMappings.cookieBold} />
                    }
                    rightAccessory={
                        <PhosphorIcon icon={IconMappings.caretRightBold} />
                    }
                    disabled={true}
                />,
                <ActionItem
                    key="option3"
                    label="Option 3"
                    leftAccessory={
                        <PhosphorIcon icon={IconMappings.cookieBold} />
                    }
                    rightAccessory={
                        <PhosphorIcon icon={IconMappings.caretRightBold} />
                    }
                    active={true}
                />,
            ],
            style: {marginInlineEnd: sizing.size_320},
        },
        states: [],
        package: "wonder-blocks-dropdown",
    }),
    createComponentConfig({
        name: "MultiSelect",
        Component: (props: PropsFor<typeof MultiSelect>) => {
            const [opened, setOpened] = React.useState(false);

            React.useEffect(() => {
                // Workaround to ensure opened popper is placed properly for visual
                // tests
                setTimeout(() => {
                    setOpened(true);
                }, 0);
            }, []);
            return <MultiSelect {...props} opened={opened} />;
        },
        variantProps: [],
        defaultProps: {
            selectedValues: ["option1"],
            opened: true,
            onChange: () => {},
            isFilterable: true,
            "aria-label": "Example MultiSelect",
            style: {
                // Add margin to avoid overlapping
                marginInlineEnd: "150px",
            },
            children: [
                <OptionItem key="option1" label="Option 1" value="option1" />,
                <OptionItem key="option2" label="Option 2" value="option2" />,
                <OptionItem key="option3" label="Option 3" value="option3" />,
            ],
        },
        states: [],
        package: "wonder-blocks-dropdown",
    }),
    createComponentConfig({
        name: "SingleSelect",
        Component: (props: PropsFor<typeof SingleSelect>) => {
            const [opened, setOpened] = React.useState(false);

            React.useEffect(() => {
                // Workaround to ensure opened popper is placed properly for visual
                // tests
                setTimeout(() => {
                    setOpened(true);
                }, 0);
            }, []);
            return <SingleSelect {...props} opened={opened} />;
        },
        variantProps: [],
        defaultProps: {
            selectedValue: "option1",
            opened: true,
            onChange: () => {},
            isFilterable: true,
            placeholder: "Select an option",
            "aria-label": "Example SingleSelect",
            style: {
                // Add margin to avoid overlapping
                marginInlineEnd: "150px",
            },
            children: [
                <OptionItem key="option1" label="Option 1" value="option1" />,
                <OptionItem key="option2" label="Option 2" value="option2" />,
                <OptionItem
                    key="option3"
                    label="Option 3"
                    value="option3"
                    disabled={true}
                />,
            ],
        },
        states: [],
        package: "wonder-blocks-dropdown",
    }),
    createComponentConfig({
        name: "Combobox (Single)",
        Component: (props) => {
            const [opened, setOpened] = React.useState(false);

            React.useEffect(() => {
                // Workaround to ensure opened popper is placed properly for visual
                // tests
                setTimeout(() => {
                    setOpened(true);
                }, 0);
            }, []);

            return <Combobox {...props} opened={opened} />;
        },
        variantProps: [],
        defaultProps: {
            value: "option1",
            selectionType: "single",
            opened: true,
            placeholder: "Select an option",
            children: [
                <OptionItem key="option1" label="Option 1" value="option1" />,
                <OptionItem key="option2" label="Option 2" value="option2" />,
                <OptionItem
                    key="option3"
                    label="Option 3"
                    value="option3"
                    disabled={true}
                />,
            ],
        },
        states: [],
        package: "wonder-blocks-dropdown",
    }),
    createComponentConfig({
        name: "Combobox (Multiple)",
        Component: (props) => {
            const [opened, setOpened] = React.useState(false);

            React.useEffect(() => {
                // Workaround to ensure opened popper is placed properly for visual
                // tests
                setTimeout(() => {
                    setOpened(true);
                }, 0);
            }, []);

            return (
                <View
                    style={{
                        maxWidth: "200px",
                        marginInlineEnd: sizing.size_200,
                    }}
                >
                    <Combobox {...props} opened={opened} />
                </View>
            );
        },
        variantProps: [],
        defaultProps: {
            value: ["option1"],
            selectionType: "multiple",
            opened: true,
            placeholder: "Select an option",
            children: [
                <OptionItem key="option1" label="Option 1" value="option1" />,
                <OptionItem key="option2" label="Option 2" value="option2" />,
                <OptionItem
                    key="option3"
                    label="Option 3"
                    value="option3"
                    disabled={true}
                />,
            ],
        },
        states: [],
        package: "wonder-blocks-dropdown",
    }),
    createComponentConfig({
        name: "Tooltip",
        // Wrapping the component in a function component to normalize types
        // since it is a class component with getDerivedStateFromProps
        Component: (props: PropsFor<typeof Tooltip>) => (
            <View style={{marginInlineEnd: sizing.size_280}}>
                <Tooltip {...props} />
            </View>
        ),
        variantProps: [],
        defaultProps: {
            content: "This is a tooltip",
            children: "Hover over me",
            opened: true,
            placement: "bottom",
            title: "Title",
        },
        states: [],
        package: "wonder-blocks-tooltip",
    }),
    createComponentConfig({
        name: "Popover",
        Component: (props: PropsFor<typeof Popover>) => <Popover {...props} />,
        variantProps: [],
        defaultProps: {
            content: (
                <PopoverContent title="Title" content="This is a popover" />
            ),
            children: <Button>Open Popover</Button>,
            opened: true,
            placement: "bottom",
        },
        states: [],
        package: "wonder-blocks-popover",
    }),
];

export const overlayComponents = [
    {
        name: "DrawerDialog + DrawerLauncher",
        storyId:
            "packages-modal-testing-snapshots-drawerlauncher--inline-start",
    },
    {
        name: "ModalLauncher + OnePaneDialog",
        storyId:
            "packages-modal-testing-snapshots-modallauncher--with-one-pane-dialog",
    },
    {
        name: "ModalLauncher + FlexibleDialog",
        storyId:
            "packages-modal-testing-snapshots-modallauncher--with-flexible-dialog",
    },
];
