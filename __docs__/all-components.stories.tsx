import * as React from "react";
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";
import {Heading} from "@khanacademy/wonder-blocks-typography";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
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
            {propName: "size", options: ["small", "medium", "large"]},
            {propName: "kind", options: ["primary", "secondary", "tertiary"]},
            {
                propName: "actionType",
                options: ["progressive", "destructive", "neutral"],
            },
            {propName: "disabled", options: [true]},
            {propName: "spinner", options: [true]},
        ],
        defaultProps: {
            children: "Button",
            startIcon: IconMappings.cookieBold,
            endIcon: IconMappings.cookieBold,
        },
    },
];

const styles = StyleSheet.create({
    componentSection: {
        padding: sizing.size_200,
        border: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
        borderRadius: border.radius.radius_040,
    },
});

export const AllComponents = {
    render: () => (
        <View style={{gap: sizing.size_160, alignItems: "flex-start"}}>
            {components.map((component) => (
                <View key={component.name} style={styles.componentSection}>
                    <Heading tag="h2" style={{marginBlockEnd: sizing.size_120}}>
                        {component.name}
                    </Heading>
                    <View style={{gap: sizing.size_120}}>
                        {component.variantProps.map((variantProp) => (
                            <View
                                key={variantProp.propName}
                                style={{gap: sizing.size_040}}
                            >
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
                                                <Heading tag="h3" size="small">
                                                    {variantProp.propName}:{" "}
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
