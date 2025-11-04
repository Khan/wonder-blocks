import * as React from "react";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";
import {Heading} from "@khanacademy/wonder-blocks-typography";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {IconMappings} from "./wonder-blocks-icon/phosphor-icon.argtypes";
import Tooltip, {TooltipContent} from "@khanacademy/wonder-blocks-tooltip";
import IconButton from "@khanacademy/wonder-blocks-icon-button";

export default {
    name: "All Components",
    tags: ["!autodocs"],
};

type VariantProp<T> = {
    [K in keyof T & string]: {
        propName: K;
        options: ReadonlyArray<T[K]>;
    };
}[keyof T & string];

type ComponentConfig<ComponentType extends React.ComponentType<any>> = {
    name: string;
    component: ComponentType;
    variantProps: ReadonlyArray<VariantProp<PropsFor<ComponentType>>>;
    defaultProps: PropsFor<ComponentType>;
    states: ReadonlyArray<{
        name: string;
        props: Partial<PropsFor<ComponentType>>;
    }>;
};

// Helper function to create a type-safe component config
// This function validates that variant prop options match the component's prop types
const createComponentConfig = <C extends React.ComponentType<any>>(
    config: ComponentConfig<C>,
): ComponentConfig<C> => config;

const components = [
    createComponentConfig<typeof Button>({
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
            {name: "Default", props: {}},
            {name: "Disabled", props: {disabled: true}},
            {name: "Spinner", props: {spinner: true}},
        ],
    }),
    createComponentConfig<typeof IconButton>({
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
        states: [
            {name: "Default", props: {}},
            {name: "Disabled", props: {disabled: true}},
        ],
    }),
];

// Helper function to generate all combinations of remaining props
const generateCombinations = (arrays: readonly any[][]): any[][] => {
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
        <View style={{gap: sizing.size_400, padding: sizing.size_200}}>
            {components.map((component) => {
                const Component = component.component;
                if (component.variantProps.length === 0) {
                    return (
                        <View key={component.name}>
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
                    <View key={component.name}>
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
                                                key={String(firstOption)}
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
