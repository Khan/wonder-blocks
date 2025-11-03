import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";
import {Heading} from "@khanacademy/wonder-blocks-typography";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {IconMappings} from "./wonder-blocks-icon/phosphor-icon.argtypes";

export default {
    name: "All Components",
    tags: ["!autodocs"],
};

const components = [
    {
        name: "Button",
        component: Button,
        variantProps: [
            {propName: "kind", options: ["primary", "secondary", "tertiary"]},
            {propName: "size", options: ["small", "medium", "large"]},
            {
                propName: "actionType",
                options: ["progressive", "destructive", "neutral"],
            },
            // {propName: "disabled", options: [true, false]},
            // {propName: "spinner", options: [true, false]},
            // {propName: "startIcon", options: [true, false]},
            // {propName: "endIcon", options: [true, false]},
        ],
        defaultProps: {
            children: "Button",
            startIcon: IconMappings.cookieBold,
            endIcon: IconMappings.cookieBold,
        },
    },
];

export const AllComponents = {
    render: () => (
        <View style={{gap: sizing.size_160}}>
            {components.map((component) => (
                <View key={component.name}>
                    <Heading tag="h2">{component.name}</Heading>
                    <View style={{gap: sizing.size_120}}>
                        {component.variantProps.map((variantProp) => (
                            <View
                                key={variantProp.propName}
                                style={{gap: sizing.size_040}}
                            >
                                <Heading tag="h3" size="medium">
                                    {variantProp.propName}
                                </Heading>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        gap: sizing.size_120,
                                    }}
                                >
                                    {variantProp.options.map((option) => {
                                        const props = {
                                            ...component.defaultProps,
                                            [variantProp.propName]: option,
                                        };
                                        return (
                                            <View
                                                key={option}
                                                style={{gap: sizing.size_040}}
                                            >
                                                <Heading tag="h4" size="small">
                                                    {option}
                                                </Heading>
                                                <component.component
                                                    {...props}
                                                />
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            ))}
        </View>
    ),
};
