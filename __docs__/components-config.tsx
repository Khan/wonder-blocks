import * as React from "react";
import {PropsFor} from "@khanacademy/wonder-blocks-core";
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
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "./wonder-blocks-icon/phosphor-icon.argtypes";
import Link from "@khanacademy/wonder-blocks-link";

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
        states: [{name: "Disabled", props: {disabled: true}}],
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
];
