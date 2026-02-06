import * as React from "react";
import {StyleSheet} from "aphrodite";
import {StoryObj} from "@storybook/react-vite";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {Heading} from "@khanacademy/wonder-blocks-typography";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import Tooltip, {TooltipContent} from "@khanacademy/wonder-blocks-tooltip";
import {
    buttonComponents,
    components,
    floatingComponents,
    inputComponents,
    overlayComponents,
    typographyComponents,
} from "./components-config";
import {themeModes} from "../../.storybook/modes";

export default {
    title: "Catalog",
    tags: ["!autodocs"],
    parameters: {
        chromatic: {
            modes: themeModes,
        },
        a11y: {
            config: {
                rules: [
                    {
                        // Ignoring color contrast violations at this level, this
                        // is covered at the component level
                        id: "color-contrast",
                        enabled: false,
                    },
                    {
                        // Ignore unique landmark violation since structures are
                        // often reused to show variants / props combinations
                        id: "landmark-unique",
                        enabled: false,
                    },
                    {
                        // Ignore aria-valid-attr-value violations at this level,
                        // this is covered at the component level
                        id: "aria-valid-attr-value",
                        enabled: false,
                    },
                ],
            },
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
    enableTooltips?: boolean;
}) => {
    const {children, details, enableTooltips = false} = props;
    const content = (
        <View tag="ul" style={styles.tooltipList}>
            {Object.entries(details).map(([key, value]) => (
                <li key={key}>{`${key}: ${value}`}</li>
            ))}
        </View>
    );
    return (
        <View style={styles.tooltipWrapper}>
            {enableTooltips && (
                <Tooltip content={<TooltipContent>{content}</TooltipContent>}>
                    {children}
                </Tooltip>
            )}
            {!enableTooltips && children}
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
    enableTooltips?: boolean;
    fullWidth?: boolean;
}) => {
    const {
        name,
        variantProps,
        states,
        defaultProps,
        Component,
        enableTooltips,
        fullWidth,
    } = props;

    const heading = (
        <Heading
            tag="h3"
            style={styles.componentHeading}
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
        <View key={name} style={{maxWidth: "100%"}}>
            {heading}
            <View
                style={{
                    gap: sizing.size_280,
                    // When there are no variant props, we need to render the component states in a row
                    flexDirection: variantProps.length === 0 ? "row" : "column",
                    flexWrap: "wrap",
                }}
            >
                {allStates.map((state) => (
                    <View key={state.name} style={styles.stateGroup}>
                        {/* When there are 0 variant props, render only the state props */}
                        {variantProps.length === 0 && (
                            <ComponentTooltip
                                details={{State: state.name}}
                                enableTooltips={enableTooltips}
                            >
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
                                    i,
                                ) => {
                                    const rowStyle = fullWidth
                                        ? styles.fullWidthRow
                                        : styles.row;
                                    return (
                                        <View
                                            style={rowStyle}
                                            key={JSON.stringify(
                                                combinationGroup,
                                            )}
                                        >
                                            {combinationGroup.map(
                                                (combo, i) => {
                                                    return (
                                                        <ComponentTooltip
                                                            details={{
                                                                State: state.name,
                                                                ...combo,
                                                            }}
                                                            key={
                                                                state.name +
                                                                JSON.stringify(
                                                                    combo,
                                                                ) +
                                                                i
                                                            }
                                                            enableTooltips={
                                                                enableTooltips
                                                            }
                                                        >
                                                            <Component
                                                                {...defaultProps}
                                                                {...state.props}
                                                                {...combo}
                                                            />
                                                        </ComponentTooltip>
                                                    );
                                                },
                                            )}
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
    enableTooltips,
}: {
    name: string;
    components: ReadonlyArray<PropsFor<typeof ComponentInfo>>;
    enableTooltips?: boolean;
}) => {
    return (
        <View key={name} style={styles.packageInfo}>
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
                    enableTooltips={enableTooltips}
                    fullWidth={component.fullWidth}
                />
            ))}
        </View>
    );
};

export const AllComponents = {
    name: "Components",
    render: (args: {enableTooltips: boolean}) => {
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
            <View style={styles.allComponents}>
                {Object.entries(componentsByPackage).map(
                    ([packageName, packageComponents]) => (
                        <PackageInfo
                            key={packageName}
                            name={packageName}
                            components={packageComponents}
                            enableTooltips={args.enableTooltips}
                        />
                    ),
                )}
            </View>
        );
    },
    args: {
        enableTooltips: true,
    },
};

export const FloatingComponents = {
    render: function Render() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    gap: sizing.size_200,
                    flexWrap: "wrap",
                }}
            >
                {floatingComponents.map((component) => (
                    <View style={styles.openedComponent} key={component.name}>
                        <ComponentInfo {...component} />
                    </View>
                ))}
            </View>
        );
    },
};

export const OverlayComponents: StoryObj = {
    render: function Render(_args, {globals}) {
        return (
            <View style={styles.allComponents} key={globals.theme}>
                {overlayComponents.map((component) => (
                    <View key={component.name}>
                        <Heading
                            tag="h2"
                            size="large"
                            weight="bold"
                            style={styles.componentHeading}
                        >
                            {component.name}
                        </Heading>
                        <iframe
                            title={component.name}
                            src={`/iframe.html?id=${component.storyId}&globals=theme:${globals.theme};direction:${globals.direction}`}
                            style={{
                                height: "500px",
                                border: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
                            }}
                        />
                    </View>
                ))}
            </View>
        );
    },
};

export const ButtonComponents = {
    render: function Render() {
        return (
            <View style={styles.allComponents}>
                {buttonComponents.map((component) => (
                    <ComponentInfo {...component} key={component.name} />
                ))}
            </View>
        );
    },
};

export const TypographyComponents = {
    render: function Render() {
        return (
            <View style={styles.allComponents}>
                {typographyComponents.map((component) => (
                    <ComponentInfo {...component} key={component.name} />
                ))}
            </View>
        );
    },
};

export const InputComponents = {
    render: function Render() {
        return (
            <View style={styles.allComponents}>
                {inputComponents.map((component) => (
                    <ComponentInfo {...component} key={component.name} />
                ))}
            </View>
        );
    },
};

const styles = StyleSheet.create({
    stateGroup: {
        gap: sizing.size_200,
        flexWrap: "wrap",
        maxWidth: "100%",
    },
    row: {
        flexDirection: "row",
        gap: sizing.size_200,
        flexWrap: "wrap",
    },
    fullWidthRow: {
        flexDirection: "column",
        gap: sizing.size_200,
        width: "100%",
    },
    fullWidthVariant: {
        width: "100%",
    },
    tooltipList: {
        margin: 0,
        paddingLeft: sizing.size_160,
    },
    tooltipWrapper: {
        gap: sizing.size_040,
        flexWrap: "wrap",
    },
    componentHeading: {
        marginBlockEnd: sizing.size_120,
    },
    allComponents: {
        gap: sizing.size_480,
        padding: sizing.size_200,
        flexWrap: "wrap",
    },
    packageInfo: {
        gap: sizing.size_200,
        flexWrap: "wrap",
        maxWidth: "100%",
    },
    openedComponent: {
        marginBlockEnd: "300px",
    },
});
