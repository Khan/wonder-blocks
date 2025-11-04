import * as React from "react";
import {PropsFor} from "@khanacademy/wonder-blocks-core";
import Button, {ActivityButton} from "@khanacademy/wonder-blocks-button";
import IconButton, {
    ActivityIconButton,
    ConversationIconButton,
} from "@khanacademy/wonder-blocks-icon-button";
import {IconMappings} from "./wonder-blocks-icon/phosphor-icon.argtypes";

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
