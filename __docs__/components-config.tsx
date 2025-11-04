/* eslint-disable max-lines */
import * as React from "react";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import Button, {ActivityButton} from "@khanacademy/wonder-blocks-button";
import IconButton, {
    ActivityIconButton,
    ConversationIconButton,
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
import {PopoverContent} from "@khanacademy/wonder-blocks-popover";
import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";
import SearchField from "@khanacademy/wonder-blocks-search-field";
import Switch from "@khanacademy/wonder-blocks-switch";
import {
    NavigationTabs,
    NavigationTabItem,
    Tabs,
} from "@khanacademy/wonder-blocks-tabs";
import Toolbar from "@khanacademy/wonder-blocks-toolbar";
import {IconMappings} from "./wonder-blocks-icon/phosphor-icon.argtypes";
import Link from "@khanacademy/wonder-blocks-link";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import customBackgroundImage from "../static/EOT-Background.svg";
import {reallyLongText} from "./components/text-for-testing";

export type VariantProp<T> = {
    [K in keyof T & string]: {
        propName: K;
        options: ReadonlyArray<T[K]>;
    };
}[keyof T & string];

export type ComponentConfig<ComponentType extends React.ComponentType<any>> = {
    name: string;
    component: ComponentType;
    variantProps: ReadonlyArray<VariantProp<PropsFor<ComponentType>>>;
    defaultProps: PropsFor<ComponentType>;
    states: ReadonlyArray<{
        name: string;
        props: Partial<PropsFor<ComponentType>>;
    }>;
    package: string;
};

// Helper function to create a type-safe component config
// This function validates that variant prop options match the component's prop types
const createComponentConfig = <C extends React.ComponentType<any>>(
    config: ComponentConfig<C>,
): ComponentConfig<C> => config;

export const components = [
    /**
     * wonder-blocks-accordion
     */
    createComponentConfig({
        name: "Accordion",
        component: Accordion,
        variantProps: [
            {
                propName: "caretPosition",
                options: ["start", "end"] as const,
            },
            {
                propName: "cornerKind",
                options: ["square", "rounded", "rounded-per-section"] as const,
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
        component: StatusBadge,
        variantProps: [
            {
                propName: "showBorder",
                options: [true, false] as const,
            },
            {
                propName: "kind",
                options: ["info", "success", "warning", "critical"] as const,
            },
            {
                propName: "icon",
                options: [
                    <PhosphorIcon icon={IconMappings.cookieBold} />,
                    undefined,
                ] as const,
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
        component: NeutralBadge,
        variantProps: [
            {
                propName: "showBorder",
                options: [true, false] as const,
            },
            {
                propName: "icon",
                options: [
                    <PhosphorIcon icon={IconMappings.cookieBold} />,
                    undefined,
                ] as const,
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
        component: GemBadge,
        variantProps: [
            {
                propName: "label",
                options: ["GemBadge", ""] as const,
            },
            {
                propName: "showIcon",
                options: [true, false] as const,
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
        component: StreakBadge,
        variantProps: [
            {
                propName: "label",
                options: ["StreakBadge", ""] as const,
            },
            {
                propName: "showIcon",
                options: [true, false] as const,
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
        component: DueBadge,
        variantProps: [
            {
                propName: "kind",
                options: ["due", "overdue"] as const,
            },
            {
                propName: "showIcon",
                options: [true, false] as const,
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
        component: Badge,
        variantProps: [
            {
                propName: "showBorder",
                options: [true, false] as const,
            },
            {
                propName: "icon",
                options: [
                    <PhosphorIcon icon={IconMappings.cookieBold} />,
                    undefined,
                ] as const,
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
        component: Banner,
        variantProps: [
            {
                propName: "kind",
                options: ["info", "success", "warning", "critical"] as const,
            },
            {
                propName: "onDismiss",
                options: [() => {}, undefined] as const,
            },
            {
                propName: "actions",
                options: [
                    [
                        {
                            type: "button" as const,
                            title: "Action",
                            onClick: () => {},
                        },
                    ],
                    [],
                ] as const,
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
        component: BirthdayPicker,
        variantProps: [
            {
                propName: "defaultValue",
                options: ["2021-05-26", undefined] as const,
            },
            {
                propName: "monthYearOnly",
                options: [true, false] as const,
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
        component: Breadcrumbs,
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
        component: Button,
        variantProps: [
            {
                propName: "size",
                options: ["small", "medium", "large"] as const,
            },
            {
                propName: "kind",
                options: ["primary", "secondary", "tertiary"] as const,
            },
            {
                propName: "actionType",
                options: ["progressive", "destructive", "neutral"] as const,
            },
        ],
        defaultProps: {
            children: "Button",
            startIcon: IconMappings.cookieBold,
            endIcon: IconMappings.cookieBold,
        },
        states: [
            {name: "Disabled", props: {disabled: true}},
            {name: "Spinner", props: {spinner: true}},
        ],
        package: "wonder-blocks-button",
    }),
    createComponentConfig({
        name: "ActivityButton",
        component: ActivityButton,
        variantProps: [
            {
                propName: "kind",
                options: ["primary", "secondary", "tertiary"] as const,
            },
        ],
        defaultProps: {
            children: "ActivityButton",
            startIcon: IconMappings.cookieBold,
            endIcon: IconMappings.cookieBold,
        },
        states: [{name: "Default", props: {disabled: true}}],
        package: "wonder-blocks-button",
    }),
    /**
     * wonder-blocks-card
     */
    createComponentConfig({
        name: "Card",
        component: Card,
        variantProps: [
            {
                propName: "paddingSize",
                options: ["medium", "small", "none"] as const,
            },
            {
                propName: "background",
                options: [
                    "base-subtle",
                    "base-default",
                    customBackgroundImage,
                ] as const,
            },
            {
                propName: "elevation",
                options: ["none", "low"] as const,
            },
            {
                propName: "borderRadius",
                options: ["small", "medium"] as const,
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
        component: CompactCell,
        variantProps: [
            {
                propName: "horizontalRule",
                options: ["full-width", "inset", "none"] as const,
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
        component: DetailCell,
        variantProps: [
            {
                propName: "horizontalRule",
                options: ["full-width", "inset", "none"] as const,
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
     * wonder-blocks-dropdown
     */
    createComponentConfig({
        name: "ActionMenu",
        component: ActionMenu as any,
        variantProps: [
            {
                propName: "disabled",
                options: [false, true] as const,
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
        name: "ActionMenu opened",
        component: ActionMenu as any,
        variantProps: [
            {
                propName: "children",
                options: [
                    [
                        <ActionItem
                            key="option1"
                            label="Option 1"
                            leftAccessory={
                                <PhosphorIcon icon={IconMappings.cookieBold} />
                            }
                            rightAccessory={
                                <PhosphorIcon
                                    icon={IconMappings.caretRightBold}
                                />
                            }
                        />,
                        <ActionItem
                            key="option2"
                            label="Option 2"
                            leftAccessory={
                                <PhosphorIcon icon={IconMappings.cookieBold} />
                            }
                            rightAccessory={
                                <PhosphorIcon
                                    icon={IconMappings.caretRightBold}
                                />
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
                                <PhosphorIcon
                                    icon={IconMappings.caretRightBold}
                                />
                            }
                            active={true}
                        />,
                    ],
                ] as const,
            },
        ],
        defaultProps: {
            opened: true,
            menuText: "ActionMenu",
            style: {marginBlockEnd: "16rem"},
        },
        states: [],
        package: "wonder-blocks-dropdown",
    }),
    createComponentConfig({
        name: "MultiSelect",
        component: MultiSelect,
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
        },
        states: [
            {name: "Disabled", props: {disabled: true}},
            {name: "Error", props: {error: true}},
        ],
        package: "wonder-blocks-dropdown",
    }),
    createComponentConfig({
        name: "MultiSelect opened",
        component: MultiSelect,
        variantProps: [
            {
                propName: "children",
                options: [
                    [
                        <OptionItem
                            key="option1"
                            label="Option 1"
                            value="option1"
                        />,
                        <OptionItem
                            key="option2"
                            label="Option 2"
                            value="option2"
                        />,
                        <OptionItem
                            key="option3"
                            label="Option 3"
                            value="option3"
                        />,
                    ],
                    [
                        <OptionItem
                            key="option1"
                            label="Option 1"
                            value="option1"
                            subtitle1="Subtitle1"
                            subtitle2="Subtitle2"
                            leftAccessory={
                                <PhosphorIcon icon={IconMappings.cookieBold} />
                            }
                            rightAccessory={
                                <PhosphorIcon
                                    icon={IconMappings.caretRightBold}
                                />
                            }
                        />,
                        <OptionItem
                            key="option2"
                            label="Option 2"
                            value="option2"
                            subtitle1="Subtitle1"
                            subtitle2="Subtitle2"
                            leftAccessory={
                                <PhosphorIcon icon={IconMappings.cookieBold} />
                            }
                            rightAccessory={
                                <PhosphorIcon
                                    icon={IconMappings.caretRightBold}
                                />
                            }
                        />,
                        <OptionItem
                            key="option3"
                            label="Option 3"
                            value="option3"
                            subtitle1="Subtitle1"
                            subtitle2="Subtitle2"
                            disabled={true}
                            leftAccessory={
                                <PhosphorIcon icon={IconMappings.cookieBold} />
                            }
                            rightAccessory={
                                <PhosphorIcon
                                    icon={IconMappings.caretRightBold}
                                />
                            }
                        />,
                    ],
                ] as const,
            },
        ],
        defaultProps: {
            selectedValues: ["option1"],
            opened: true,
            onChange: () => {},
            isFilterable: true,
            style: {
                marginBlockEnd: "30rem",
                paddingInlineEnd: sizing.size_960,
                marginInlineEnd: sizing.size_400,
            },
        },
        states: [],
        package: "wonder-blocks-dropdown",
    }),
    createComponentConfig({
        name: "SingleSelect",
        component: SingleSelect,
        variantProps: [
            {
                propName: "selectedValue",
                options: ["", "option1"],
            },
        ],
        defaultProps: {
            placeholder: "Select an option",
            onChange: () => {},
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
        name: "SingleSelect opened",
        component: SingleSelect,
        variantProps: [
            {
                propName: "children",
                options: [
                    [
                        <OptionItem
                            key="option1"
                            label="Option 1"
                            value="option1"
                        />,
                        <OptionItem
                            key="option2"
                            label="Option 2"
                            value="option2"
                        />,
                        <OptionItem
                            key="option3"
                            label="Option 3"
                            value="option3"
                            disabled={true}
                        />,
                    ],
                    [
                        <OptionItem
                            key="option1"
                            label="Option 1"
                            value="option1"
                            subtitle1="Subtitle1"
                            subtitle2="Subtitle2"
                            leftAccessory={
                                <PhosphorIcon icon={IconMappings.cookieBold} />
                            }
                            rightAccessory={
                                <PhosphorIcon
                                    icon={IconMappings.caretRightBold}
                                />
                            }
                        />,
                        <OptionItem
                            key="option2"
                            label="Option 2"
                            value="option2"
                            subtitle1="Subtitle1"
                            subtitle2="Subtitle2"
                            leftAccessory={
                                <PhosphorIcon icon={IconMappings.cookieBold} />
                            }
                            rightAccessory={
                                <PhosphorIcon
                                    icon={IconMappings.caretRightBold}
                                />
                            }
                        />,
                        <OptionItem
                            key="option3"
                            label="Option 3"
                            value="option3"
                            subtitle1="Subtitle1"
                            subtitle2="Subtitle2"
                            disabled={true}
                            leftAccessory={
                                <PhosphorIcon icon={IconMappings.cookieBold} />
                            }
                            rightAccessory={
                                <PhosphorIcon
                                    icon={IconMappings.caretRightBold}
                                />
                            }
                        />,
                    ],
                ] as const,
            },
        ],
        defaultProps: {
            selectedValue: "option1",
            opened: true,
            onChange: () => {},
            isFilterable: true,
            placeholder: "Select an option",
            style: {
                marginBlockEnd: "30rem",
                paddingInlineEnd: sizing.size_960,
                marginInlineEnd: sizing.size_400,
            },
        },
        states: [],
        package: "wonder-blocks-dropdown",
    }),
    /**
     * wonder-blocks-form
     */
    createComponentConfig({
        name: "TextField",
        component: TextField,
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
        component: TextArea,
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
        component: Checkbox,
        variantProps: [
            {
                propName: "checked",
                options: [false, true, null] as const,
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
        component: CheckboxGroup,
        variantProps: [
            {
                propName: "errorMessage",
                options: ["", "Error message"] as const,
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
        component: RadioGroup,
        variantProps: [
            {
                propName: "errorMessage",
                options: ["", "Error message"] as const,
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
        component: PhosphorIcon,
        variantProps: [
            {
                propName: "size",
                options: ["small", "medium", "large", "xlarge"] as const,
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
        component: Icon,
        variantProps: [
            {
                propName: "size",
                options: ["small", "medium", "large", "xlarge"] as const,
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
        component: IconButton,
        variantProps: [
            {
                propName: "size",
                options: ["small", "medium", "large"] as const,
            },
            {
                propName: "kind",
                options: ["primary", "secondary", "tertiary"] as const,
            },
            {
                propName: "actionType",
                options: ["progressive", "destructive", "neutral"] as const,
            },
        ],
        defaultProps: {
            icon: IconMappings.cookieBold,
        },
        states: [{name: "Disabled", props: {disabled: true}}],
        package: "wonder-blocks-icon-button",
    }),
    createComponentConfig({
        name: "ActivityIconButton",
        component: ActivityIconButton,
        variantProps: [
            {
                propName: "actionType",
                options: ["progressive", "neutral"] as const,
            },
            {
                propName: "kind",
                options: ["primary", "secondary", "tertiary"] as const,
            },
        ],
        defaultProps: {
            icon: IconMappings.cookieBold,
            "aria-label": "Activity Icon Button",
        },
        states: [{name: "Disabled", props: {disabled: true}}],
        package: "wonder-blocks-icon-button",
    }),
    createComponentConfig({
        name: "ConversationIconButton",
        component: ConversationIconButton,
        variantProps: [
            {
                propName: "actionType",
                options: ["progressive", "neutral"] as const,
            },
            {
                propName: "kind",
                options: ["primary", "secondary", "tertiary"] as const,
            },
        ],
        defaultProps: {
            icon: IconMappings.cookieBold,
            "aria-label": "Conversation Icon Button",
        },
        states: [{name: "Disabled", props: {disabled: true}}],
        package: "wonder-blocks-icon-button",
    }),
    /**
     * wonder-blocks-labeled-field
     */
    ...[
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
                    <OptionItem
                        key="option1"
                        label="Option 1"
                        value="option1"
                    />,
                ],
            },
        },
        {
            componentName: "MultiSelect",
            FormComponent: MultiSelect,
            componentProps: {
                placeholder: "",
                children: [
                    <OptionItem
                        key="option1"
                        label="Option 1"
                        value="option1"
                    />,
                ],
            },
        },
    ].map(({componentName, FormComponent, componentProps}) =>
        createComponentConfig({
            name: `LabeledField with ${componentName}`,
            component: LabeledField,
            variantProps: [],
            defaultProps: {
                field: (
                    <FormComponent
                        value=""
                        onChange={() => {}}
                        {...(componentProps as any)}
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
                                {...(componentProps as any)}
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
        component: Link,
        variantProps: [
            {
                propName: "inline",
                options: [false, true] as const,
            },
            {
                propName: "target",
                options: [undefined, "_blank"] as const,
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
        component: FlexibleDialog,
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
        component: OnePaneDialog,
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
        },
        states: [],
        package: "wonder-blocks-modal",
    }),
    /**
     * wonder-blocks-pill
     */
    createComponentConfig({
        name: "Pill",
        component: Pill,
        variantProps: [
            {
                propName: "size",
                options: ["small", "medium", "large"] as const,
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
                ] as const,
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
        component: PopoverContent,
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
        component: CircularSpinner,
        variantProps: [
            {
                propName: "size",
                options: ["xsmall", "small", "medium", "large"] as const,
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
        component: SearchField,
        variantProps: [
            {
                propName: "value",
                options: ["", "Search text"] as const,
            },
            {
                propName: "placeholder",
                options: ["", "Search..."] as const,
            },
        ],
        defaultProps: {
            value: "",
            onChange: () => {},
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
        component: Switch,
        variantProps: [
            {
                propName: "icon",
                options: [
                    undefined,
                    <PhosphorIcon icon={IconMappings.cookieBold} />,
                ] as const,
            },
            {
                propName: "checked",
                options: [true, false] as const,
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
        name: "NavigationTabs",
        component: NavigationTabs,
        variantProps: [],
        defaultProps: {
            "aria-label": "Navigation tabs",
            children: [
                <NavigationTabItem key="tab1" current={true}>
                    <Link href="#tab1">Navigation Tab 1</Link>
                </NavigationTabItem>,
                <NavigationTabItem key="tab2">
                    <Link href="#tab2">Navigation Tab 2</Link>
                </NavigationTabItem>,
                <NavigationTabItem key="tab3">
                    <Link href="#tab3">Navigation Tab 3</Link>
                </NavigationTabItem>,
            ],
        },
        states: [
            {
                name: "With Icons",
                props: {
                    children: [
                        <NavigationTabItem key="tab1" current={true}>
                            <Link
                                href="#tab1"
                                startIcon={
                                    <PhosphorIcon
                                        icon={IconMappings.cookieBold}
                                    />
                                }
                                endIcon={
                                    <PhosphorIcon
                                        icon={IconMappings.cookieBold}
                                    />
                                }
                            >
                                Navigation Tab 1
                            </Link>
                        </NavigationTabItem>,
                        <NavigationTabItem key="tab2">
                            <Link
                                href="#tab2"
                                startIcon={
                                    <PhosphorIcon
                                        icon={IconMappings.cookieBold}
                                    />
                                }
                                endIcon={
                                    <PhosphorIcon
                                        icon={IconMappings.cookieBold}
                                    />
                                }
                            >
                                Navigation Tab 2
                            </Link>
                        </NavigationTabItem>,
                        <NavigationTabItem key="tab3">
                            <Link
                                href="#tab3"
                                startIcon={
                                    <PhosphorIcon
                                        icon={IconMappings.cookieBold}
                                    />
                                }
                                endIcon={
                                    <PhosphorIcon
                                        icon={IconMappings.cookieBold}
                                    />
                                }
                            >
                                Navigation Tab 3
                            </Link>
                        </NavigationTabItem>,
                    ],
                },
            },
        ],
        package: "wonder-blocks-tabs",
    }),
    createComponentConfig({
        name: "Tabs",
        component: Tabs,
        variantProps: [],
        defaultProps: {
            "aria-label": "Tabs",
            selectedTabId: "tab1",
            onTabSelected: () => {},
            tabs: [
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
            ],
        },
        states: [
            {
                name: "With Icons",
                props: {
                    tabs: [
                        {
                            id: "tab1",
                            label: (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: sizing.size_040,
                                    }}
                                >
                                    <PhosphorIcon
                                        icon={IconMappings.cookieBold}
                                    />
                                    Tab 1
                                    <PhosphorIcon
                                        icon={IconMappings.cookieBold}
                                    />
                                </View>
                            ),
                            panel: <BodyText>Content for Tab 1</BodyText>,
                        },
                        {
                            id: "tab2",
                            label: (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: sizing.size_040,
                                    }}
                                >
                                    <PhosphorIcon
                                        icon={IconMappings.cookieBold}
                                    />
                                    Tab 2
                                    <PhosphorIcon
                                        icon={IconMappings.cookieBold}
                                    />
                                </View>
                            ),
                            panel: <BodyText>Content for Tab 2</BodyText>,
                        },
                        {
                            id: "tab3",
                            label: (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: sizing.size_040,
                                    }}
                                >
                                    <PhosphorIcon
                                        icon={IconMappings.cookieBold}
                                    />
                                    Tab 3
                                    <PhosphorIcon
                                        icon={IconMappings.cookieBold}
                                    />
                                </View>
                            ),
                            panel: <BodyText>Content for Tab 3</BodyText>,
                        },
                    ],
                },
            },
        ],
        package: "wonder-blocks-tabs",
    }),
    /**
     * wonder-blocks-toolbar
     */
    createComponentConfig({
        name: "Toolbar",
        component: Toolbar,
        variantProps: [
            {
                propName: "size",
                options: ["small", "medium"] as const,
            },
            {
                propName: "color",
                options: ["light", "dark"] as const,
            },
        ],
        defaultProps: {
            title: "Toolbar Title",
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
                    subtitle: "Toolbar subtitle",
                },
            },
        ],
        package: "wonder-blocks-toolbar",
    }),
];
