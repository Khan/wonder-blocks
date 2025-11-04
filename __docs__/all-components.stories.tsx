import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
import {Heading} from "@khanacademy/wonder-blocks-typography";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import Tooltip, {TooltipContent} from "@khanacademy/wonder-blocks-tooltip";
import {components} from "./components-config";

export default {
    name: "All Components",
    tags: ["!autodocs"],
};

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
    render: () => {
        // Group components by package
        const componentsByPackage = components.reduce(
            (acc, component) => {
                const pkg = component.package;
                if (!acc[pkg]) {
                    acc[pkg] = [];
                }
                acc[pkg].push(component);
                return acc;
            },
            {} as Record<string, typeof components>,
        );

        return (
            <View style={{gap: sizing.size_480, padding: sizing.size_200}}>
                {Object.entries(componentsByPackage).map(
                    ([packageName, packageComponents]) => (
                        <View key={packageName} style={{gap: sizing.size_200}}>
                            <Heading tag="h2" size="large" weight="bold">
                                {packageName}
                            </Heading>
                            {packageComponents.map((component) => {
                                const Component = component.component;
                                if (component.variantProps.length === 0) {
                                    return (
                                        <View key={component.name}>
                                            <Heading
                                                tag="h3"
                                                style={{
                                                    marginBlockEnd:
                                                        sizing.size_120,
                                                }}
                                                size="medium"
                                                weight="medium"
                                            >
                                                {component.name}
                                            </Heading>
                                            <Component
                                                {...(component.defaultProps as any)}
                                            />
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
                                              restVariantProps.map(
                                                  (vp) => vp.options,
                                              ) as any[][],
                                          )
                                        : [[]];

                                return (
                                    <View key={component.name}>
                                        <Heading
                                            tag="h3"
                                            style={{
                                                marginBlockEnd: sizing.size_120,
                                            }}
                                            size="medium"
                                            weight="medium"
                                        >
                                            {component.name}
                                        </Heading>
                                        <View style={{gap: sizing.size_280}}>
                                            {[
                                                {name: "Default", props: {}},
                                                ...component.states,
                                            ].map((state) => (
                                                <View
                                                    key={state.name}
                                                    style={{
                                                        gap: sizing.size_160,
                                                    }}
                                                >
                                                    {firstVariantProp.options.map(
                                                        (firstOption) => (
                                                            <View
                                                                key={String(
                                                                    firstOption,
                                                                )}
                                                                style={{
                                                                    gap: sizing.size_040,
                                                                }}
                                                            >
                                                                <View
                                                                    style={{
                                                                        flexDirection:
                                                                            "row",
                                                                        gap: sizing.size_120,
                                                                        flexWrap:
                                                                            "wrap",
                                                                    }}
                                                                >
                                                                    {remainingPropCombinations.map(
                                                                        (
                                                                            combo,
                                                                            index,
                                                                        ) => {
                                                                            const props =
                                                                                {
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
                                                                                    (
                                                                                        props as any
                                                                                    )[
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

                                                                            const comboLabel =
                                                                                (
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
                                                                                    key={
                                                                                        index
                                                                                    }
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
                                                                                            {...(props as any)}
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
                )}
            </View>
        );
    },
};
