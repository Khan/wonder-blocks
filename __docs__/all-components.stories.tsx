import * as React from "react";
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";
import {Heading} from "@khanacademy/wonder-blocks-typography";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {IconMappings} from "./wonder-blocks-icon/phosphor-icon.argtypes";
import Tooltip, {TooltipContent} from "@khanacademy/wonder-blocks-tooltip";

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
        ],
        defaultProps: {
            children: "Button",
            startIcon: IconMappings.cookieBold,
            endIcon: IconMappings.cookieBold,
        },
        states: [
            {name: "Default", props: {}},
            {name: "Disabled", props: {disabled: true}},
            {name: "Spinner", props: {spinner: true}},
        ],
    },
];

const styles = StyleSheet.create({
    componentSection: {
        padding: sizing.size_200,
        border: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
        borderRadius: border.radius.radius_120,
    },
});

// Helper function to generate all combinations of remaining props
const generateCombinations = (arrays: any[][]): any[][] => {
    if (arrays.length === 0) {
        return [[]];
    }
    if (arrays.length === 1) {
        return arrays[0].map((item) => [item]);
    }

    const [first, ...rest] = arrays;
    const restCombinations = generateCombinations(rest);

    return first.flatMap((item) =>
        restCombinations.map((combo) => [item, ...combo]),
    );
};

export const AllComponents = {
    render: () => (
        <View style={{gap: sizing.size_160}}>
            {components.map((component) => {
                const Component = component.component;
                if (component.variantProps.length === 0) {
                    return (
                        <View
                            key={component.name}
                            style={styles.componentSection}
                        >
                            <Heading
                                tag="h2"
                                style={{marginBlockEnd: sizing.size_120}}
                            >
                                {component.name}
                            </Heading>
                            <Component {...component.defaultProps} />
                        </View>
                    );
                }

                // Get the first variant prop to group by
                const [firstVariantProp, ...restVariantProps] =
                    component.variantProps;

                // Generate all combinations of the remaining props
                const remainingPropCombinations =
                    restVariantProps.length > 0
                        ? generateCombinations(
                              restVariantProps.map((vp) => vp.options),
                          )
                        : [[]];

                return (
                    <View key={component.name} style={styles.componentSection}>
                        <Heading
                            tag="h2"
                            style={{marginBlockEnd: sizing.size_120}}
                        >
                            {component.name}
                        </Heading>
                        <View style={{gap: sizing.size_280}}>
                            {component.states.map((state) => (
                                <View
                                    key={state.name}
                                    style={{gap: sizing.size_160}}
                                >
                                    {firstVariantProp.options.map(
                                        (firstOption) => (
                                            <View
                                                key={firstOption}
                                                style={{gap: sizing.size_040}}
                                            >
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        gap: sizing.size_120,
                                                        flexWrap: "wrap",
                                                    }}
                                                >
                                                    {remainingPropCombinations.map(
                                                        (combo, index) => {
                                                            const props = {
                                                                ...component.defaultProps,
                                                                ...state.props,
                                                                [firstVariantProp.propName]:
                                                                    firstOption,
                                                            };

                                                            // Add all the remaining prop values
                                                            restVariantProps.forEach(
                                                                (
                                                                    vp,
                                                                    vpIndex,
                                                                ) => {
                                                                    props[
                                                                        vp.propName
                                                                    ] =
                                                                        combo[
                                                                            vpIndex
                                                                        ];
                                                                },
                                                            );

                                                            // Create a label for the combination
                                                            const comboLabelItems =
                                                                [
                                                                    `${firstVariantProp.propName}: ${firstOption}`,
                                                                    ...restVariantProps.map(
                                                                        (
                                                                            vp,
                                                                            vpIndex,
                                                                        ) =>
                                                                            `${vp.propName}: ${combo[vpIndex]}`,
                                                                    ),
                                                                    `State: ${state.name}`,
                                                                ];

                                                            const comboLabel = (
                                                                <TooltipContent>
                                                                    <ul
                                                                        style={{
                                                                            margin: 0,
                                                                            paddingLeft:
                                                                                "20px",
                                                                        }}
                                                                    >
                                                                        {comboLabelItems.map(
                                                                            (
                                                                                item,
                                                                                i,
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        i
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        item
                                                                                    }
                                                                                </li>
                                                                            ),
                                                                        )}
                                                                    </ul>
                                                                </TooltipContent>
                                                            );

                                                            const Component =
                                                                component.component;
                                                            return (
                                                                <View
                                                                    key={index}
                                                                    style={{
                                                                        gap: sizing.size_040,
                                                                    }}
                                                                >
                                                                    <Tooltip
                                                                        content={
                                                                            comboLabel
                                                                        }
                                                                    >
                                                                        <Component
                                                                            {...props}
                                                                        />
                                                                    </Tooltip>
                                                                </View>
                                                            );
                                                        },
                                                    )}
                                                </View>
                                            </View>
                                        ),
                                    )}
                                </View>
                            ))}
                        </View>
                    </View>
                );
            })}
        </View>
    ),
};
