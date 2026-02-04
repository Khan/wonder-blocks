import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
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

type VariantProp<Component extends React.ElementType> = {
    [K in keyof React.ComponentProps<Component>]: {
        propName: K;
        options: ReadonlyArray<React.ComponentProps<Component>[K]>;
    };
}[keyof React.ComponentProps<Component>];

type StatesType<Component extends React.ElementType> = ReadonlyArray<{
    name: string;
    props: Partial<React.ComponentProps<Component>>;
}>;

const ComponentTooltip = (props: {
    children: React.ReactElement;
    details: Record<string, string>;
}) => {
    const {children, details} = props;
    const content = (
        <TooltipContent>
            <ul className={css(styles.tooltipList)}>
                {Object.entries(details).map(([key, value]) => (
                    <li key={key}>{`${key}: ${value}`}</li>
                ))}
            </ul>
        </TooltipContent>
    );
    return (
        <View style={styles.tooltipWrapper}>
            <Tooltip content={content}>{children}</Tooltip>
        </View>
    );
};
function createCombinations(
    variantProps: ReadonlyArray<{
        propName: string;
        options: ReadonlyArray<string>;
    }>,
): Array<Array<Record<string, string>>> {
    if (!variantProps.length) {
        return [];
    }

    const buildCombinations = (
        props: ReadonlyArray<{
            propName: string;
            options: ReadonlyArray<string>;
        }>,
    ): Array<Record<string, string>> =>
        props.reduce(
            (
                acc: Array<Record<string, string>>,
                {
                    propName,
                    options,
                }: {propName: string; options: ReadonlyArray<string>},
            ) => {
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

const ComponentInfo = <Component extends React.ElementType>(props: {
    name: string;
    Component: React.ElementType;
    variantProps: ReadonlyArray<VariantProp<React.ElementType>>;
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
                    </View>
                ))}
            </View>
        </View>
    );
};
const PackageInfo = ({
    name,
    components,
}: {
    name: string;
    components: ReadonlyArray<PropsFor<typeof ComponentInfo>>;
}) => {
    return (
        <View key={name} style={{gap: sizing.size_200}}>
            <Heading tag="h2" size="large" weight="bold">
                {name}
            </Heading>
            {components.map((component) => (
                <ComponentInfo
                    key={component.name}
                    name={component.name}
                    Component={component.Component}
                    variantProps={component.variantProps}
                    states={component.states}
                    defaultProps={component.defaultProps}
                />
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
    },
    row: {
        flexDirection: "row",
        gap: sizing.size_200,
        flexWrap: "wrap",
    },
    tooltipList: {
        margin: 0,
        paddingLeft: sizing.size_160,
    },
    tooltipWrapper: {
        gap: sizing.size_040,
    },
});
