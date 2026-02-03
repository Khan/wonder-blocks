import * as React from "react";
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import {Heading} from "@khanacademy/wonder-blocks-typography";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import Tooltip, {TooltipContent} from "@khanacademy/wonder-blocks-tooltip";
import {components} from "./components-config";
import {themeModes} from "../../.storybook/modes";

export default {
    name: "Catalog",
    tags: ["!autodocs"],
    parameters: {
        chromatic: {
            modes: themeModes,
        },
    },
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

type VariantProp<Component extends React.ElementType> = {
    [K in keyof React.ComponentProps<Component>]: {
        propName: K;
        options: Array<React.ComponentProps<Component>[K]>;
    };
}[keyof React.ComponentProps<Component>];

type StatesType<Component extends React.ElementType> = {
    name: string;
    props: Partial<React.ComponentProps<Component>>;
}[];

const ComponentTooltip = (props: {
    children: React.ReactElement;
    details: Record<string, string>;
}) => {
    const {children, details} = props;
    const content = (
        <TooltipContent>
            <ul
                style={{
                    margin: 0,
                    paddingLeft: "20px",
                }}
            >
                {Object.entries(details).map(([key, value]) => (
                    <li key={key}>{`${key}: ${value}`}</li>
                ))}
            </ul>
        </TooltipContent>
    );
    return (
        <View
            style={{
                gap: sizing.size_040,
            }}
        >
            <Tooltip content={content}>{children}</Tooltip>
        </View>
    );
};

const ComponentInfo = <Component extends React.ElementType>({
    name,
    Component,
    variantProps,
    states,
    defaultProps,
}: {
    name: string;
    Component: Component;
    variantProps: VariantProp<Component>[];
    states: StatesType<Component>;
    defaultProps: React.ComponentProps<Component>;
}) => {
    const heading = (
        <Heading
            tag="h3"
            style={{
                marginBlockEnd: sizing.size_120,
            }}
            size="medium"
            weight="medium"
        >
            {name}
        </Heading>
    );

    const allStates: StatesType<Component> = [
        {name: "Default", props: {}},
        ...states,
    ];

    if (variantProps.length === 0) {
        return (
            <View key={name} style={{backgroundColor: "red"}}>
                {heading} - variantProps.length === 0
                <View
                    style={{
                        flexDirection: "row",
                        gap: sizing.size_240,
                        flexWrap: "wrap",
                    }}
                >
                    {allStates.map((state) => {
                        const props = {
                            ...defaultProps,
                            ...state.props,
                        };

                        return (
                            <ComponentTooltip
                                details={{State: state.name}}
                                key={state.name}
                            >
                                <Component {...(props as any)} />
                            </ComponentTooltip>
                        );
                    })}
                </View>
            </View>
        );
    }

    // Special case: if there's only 1 variant prop, render all options in one row
    if (variantProps.length === 1) {
        const [singleVariantProp] = variantProps;

        return (
            <View key={name}>
                {heading} - variantProps.length === 1
                <View style={{gap: sizing.size_280}}>
                    {allStates.map((state) => (
                        <View
                            key={state.name}
                            style={{
                                flexDirection: "row",
                                gap: sizing.size_120,
                                flexWrap: "wrap",
                            }}
                        >
                            {singleVariantProp.options.map((option) => {
                                const props: React.ComponentProps<Component> = {
                                    ...defaultProps,
                                    ...state.props,
                                    [singleVariantProp.propName]: option,
                                };

                                const comboLabelItems = {
                                    [String(singleVariantProp.propName)]:
                                        String(option),
                                    State: state.name,
                                };

                                return (
                                    <ComponentTooltip
                                        key={String(option)}
                                        details={comboLabelItems}
                                    >
                                        <Component {...props} />
                                    </ComponentTooltip>
                                );
                            })}
                        </View>
                    ))}
                </View>
            </View>
        );
    }

    // Get the first variant prop to group by
    const [firstVariantProp, ...restVariantProps] = variantProps;

    // Generate all combinations of the remaining props
    const remainingPropCombinations =
        restVariantProps.length > 0
            ? generateCombinations(
                  restVariantProps.map((vp) => vp.options) as any[][],
              )
            : [[]];

    return (
        <View key={name}>
            {heading} - remaining
            <View style={{gap: sizing.size_280}}>
                {allStates.map((state) => (
                    <View
                        key={state.name}
                        style={{
                            gap: sizing.size_200,
                        }}
                    >
                        {firstVariantProp.options.map((firstOption) => (
                            <View
                                key={String(firstOption)}
                                style={{
                                    gap: sizing.size_040,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        gap: sizing.size_200,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    {remainingPropCombinations.map(
                                        (combo, index) => {
                                            const props: React.ComponentProps<Component> =
                                                {
                                                    ...defaultProps,
                                                    [firstVariantProp.propName]:
                                                        firstOption,
                                                    ...state.props,
                                                };

                                            // Add all the remaining prop values
                                            restVariantProps.forEach(
                                                (vp, vpIndex) => {
                                                    (props as any)[
                                                        vp.propName
                                                    ] = combo[vpIndex];
                                                },
                                            );

                                            // Create a label for the combination
                                            const comboLabelItems: Record<
                                                string,
                                                string
                                            > = {
                                                [String(
                                                    firstVariantProp.propName,
                                                )]: String(firstOption),
                                                State: state.name,
                                            };
                                            restVariantProps.forEach(
                                                (vp, vpIndex) => {
                                                    comboLabelItems[
                                                        String(vp.propName)
                                                    ] = String(combo[vpIndex]);
                                                },
                                            );

                                            return (
                                                <ComponentTooltip
                                                    key={index}
                                                    details={comboLabelItems}
                                                >
                                                    <Component {...props} />
                                                </ComponentTooltip>
                                            );
                                        },
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );
};

function createCombinations(
    variantProps: {propName: string; options: string[]}[],
): Array<Array<Record<string, string>>> {
    if (!variantProps.length) {
        return [];
    }

    const buildCombinations = (variantProps: any) => {
        return variantProps.reduce(
            (acc: Array<Record<string, string>>, {propName, options}: any) => {
                const next: Array<Record<string, string>> = [];
                acc.forEach((combo) => {
                    options.forEach((option: string) => {
                        next.push({
                            ...combo,
                            [propName]: option,
                        });
                    });
                });
                return next;
            },
            [{}],
        );
    };

    if (variantProps.length === 1) {
        const {propName, options} = variantProps[0];
        return [options.map((option: string) => ({[propName]: option}))];
    }

    const [{propName, options}, ...rest] = variantProps;
    const restCombinations: Array<Record<string, string>> =
        buildCombinations(rest);

    return options.map((option: string) =>
        restCombinations.map((combo: Record<string, string>) => ({
            ...combo,
            [propName]: option,
        })),
    );
}

const FinalComponentInfo = <Component extends React.ElementType>(props: {
    name: string;
    Component: React.ElementType;
    variantProps: VariantProp<React.ElementType>[];
    states: StatesType<React.ElementType>;
    defaultProps: React.ComponentProps<React.ElementType>;
}) => {
    const {name, variantProps, states, defaultProps, Component} = props;

    const heading = (
        <Heading
            tag="h3"
            style={{
                marginBlockEnd: sizing.size_120,
            }}
            size="medium"
            weight="medium"
        >
            {name}
        </Heading>
    );

    const allStates: StatesType<Component> = [
        {name: "Default", props: {}},
        ...states,
    ];

    return (
        <View key={name}>
            {heading}
            <View
                style={{
                    gap: sizing.size_280,
                    // When there are no variant props, we need to render the component states in a row
                    flexDirection: variantProps.length === 0 ? "row" : "column",
                }}
            >
                {allStates.map((state) => (
                    <View key={state.name} style={styles.stateGroup}>
                        {/* When there are 0 variant props, render only the state props */}
                        {variantProps.length === 0 && (
                            <ComponentTooltip details={{State: state.name}}>
                                <Component {...defaultProps} {...state.props} />
                            </ComponentTooltip>
                        )}
                        {/* When there are 1 or more variant props, we need to create all combinations of the variant props and render each combination as a row */}
                        {variantProps.length >= 1 &&
                            createCombinations(variantProps).map(
                                (
                                    combinationGroup: Array<
                                        Record<string, string>
                                    >,
                                ) => {
                                    return (
                                        <View style={styles.row}>
                                            {combinationGroup.map((combo) => {
                                                return (
                                                    <ComponentTooltip
                                                        details={{
                                                            State: state.name,
                                                            ...combo,
                                                        }}
                                                    >
                                                        <Component
                                                            {...defaultProps}
                                                            {...state.props}
                                                            {...combo}
                                                        />
                                                    </ComponentTooltip>
                                                );
                                            })}
                                        </View>
                                    );
                                },
                            )}
                        {/* <ComponentTooltip details={{State: state.name}}>
                            <Component {...defaultProps} {...state.props} />
                        </ComponentTooltip> */}
                    </View>
                ))}
            </View>
        </View>
    );
};
const PackageInfo = ({name, components}: {name: string; components: any[]}) => {
    return (
        <View key={name} style={{gap: sizing.size_200}}>
            <Heading tag="h2" size="large" weight="bold">
                {name}
            </Heading>
            {components.map((component) => (
                <>
                    <ComponentInfo
                        key={component.name}
                        name={component.name}
                        Component={component.component}
                        variantProps={component.variantProps}
                        states={component.states}
                        defaultProps={component.defaultProps}
                    />
                    <FinalComponentInfo
                        key={component.name}
                        name={component.name}
                        Component={component.component}
                        variantProps={component.variantProps}
                        states={component.states}
                        defaultProps={component.defaultProps}
                    />
                </>
            ))}
        </View>
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
                        <PackageInfo
                            key={packageName}
                            name={packageName}
                            components={packageComponents}
                        />
                    ),
                )}
            </View>
        );
    },
};

export const AllComponentsHover = {
    render: AllComponents.render,
    parameters: {
        pseudo: {
            hover: true,
        },
    },
};

export const AllComponentsFocus = {
    render: AllComponents.render,
    parameters: {
        pseudo: {
            focusVisible: true,
        },
    },
};

export const AllComponentsPress = {
    render: AllComponents.render,
    parameters: {
        pseudo: {
            active: true,
        },
    },
};

export const AllComponentsRTL = {
    render: AllComponents.render,
    globals: {
        direction: "rtl",
    },
};

const styles = StyleSheet.create({
    stateGroup: {
        gap: sizing.size_200,
        border: "1px solid red",
    },
    row: {
        border: "4px solid blue",
        flexDirection: "row",
        gap: sizing.size_200,
        flexWrap: "wrap",
    },
});
