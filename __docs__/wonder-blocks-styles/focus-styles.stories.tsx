import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import info from "@phosphor-icons/core/regular/info.svg";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-styles/package.json";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {ScenariosLayout} from "../components/scenarios-layout";

/**
 * Styles that implement accessible focus indicators for interactive elements.
 *
 * `focusStyles` is used internally by Wonder Blocks components (`Button`,
 * `IconButton`, `Clickable`, etc.) to ensure consistent `:focus-visible` rings
 * that meet WCAG contrast requirements across light and dark backgrounds.
 *
 * ### When to use
 *
 * - **WB component authors**: apply `focusStyles.focus` when implementing a
 *   new WB primitive that renders a focusable element.
 * - **Consumers**: it should be rare to need this directly — WB interactive
 *   components already include these styles. If you need to override focus
 *   appearance on a WB component, pass the style via the `style` prop.
 *
 * ```tsx
 * import {focusStyles} from "@khanacademy/wonder-blocks-styles";
 *
 * // Merging with other styles in a WB component implementation
 * <StyledElement style={{...myStyles, ...focusStyles.focus}} />
 * ```
 */
export default {
    title: "Packages / Styles / Focus Styles",
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
} as Meta<any>;

type Story = StoryObj<any>;

// eslint-disable-next-line @khanacademy/wonder-blocks/no-raw-button -- StyledButton is used to demonstrate focusStyles applied to a raw element; a WB Button would obscure this since it already includes focus styles internally.
const StyledButton = addStyle("button");

/**
 * A global focus style that can be applied to interactive elements.
 *
 * This style injects a combination of `outline` and `box-shadow` to indicate
 * the element is focused. This is used for accessibility purposes as it allows
 * the element to present a focus state on Windows High Contrast mode.
 *
 * In the example below, the focus style is applied to an `IconButton` component
 * and to a `button` element.
 */
export const Focus: Story = {
    name: "focus",
    render: () => {
        return (
            <View
                style={{
                    padding: sizing.size_160,
                    flexDirection: "row",
                    placeItems: "center",
                }}
            >
                <View
                    style={{
                        background: semanticColor.status.success.background,
                        padding: sizing.size_160,
                        gap: sizing.size_160,
                    }}
                >
                    <IconButton
                        kind="tertiary"
                        icon={info}
                        aria-label="Tertiary info button"
                        style={focusStyles.focus}
                    />
                </View>
                <View
                    style={{
                        background:
                            semanticColor.core.background.neutral.strong,
                        padding: sizing.size_160,
                        gap: sizing.size_160,
                    }}
                >
                    <IconButton
                        kind="tertiary"
                        icon={info}
                        aria-label="Tertiary info button"
                        style={[
                            focusStyles.focus,
                            {
                                color: semanticColor.core.foreground.knockout
                                    .default,
                            },
                        ]}
                    />
                </View>
            </View>
        );
    },
    parameters: {
        pseudo: {focusVisible: true},
        chromatic: {
            // Disabling because this is already covered by the Scenarios story.
            disableSnapshot: true,
        },
    },
};

export const Scenarios: Story = {
    render: () => {
        const scenarios = [
            {
                name: "Using IconButton",
                props: {
                    children: (
                        <IconButton
                            kind="tertiary"
                            icon={info}
                            aria-label="Tertiary info button"
                            style={focusStyles.focus}
                        />
                    ),
                },
            },
            {
                name: "On a dark background",
                props: {
                    children: (
                        <IconButton
                            kind="tertiary"
                            icon={info}
                            aria-label="Tertiary info button"
                            style={[
                                focusStyles.focus,
                                {
                                    color: semanticColor.core.foreground
                                        .knockout.default,
                                },
                            ]}
                        />
                    ),
                    inverse: true,
                },
            },
            {
                name: "Using Clickable",
                props: {
                    children: (
                        <Clickable onClick={() => {}} style={focusStyles.focus}>
                            {() => "hello"}
                        </Clickable>
                    ),
                },
            },
            {
                name: "Using an HTML element",
                props: {
                    children: (
                        // eslint-disable-next-line @khanacademy/wonder-blocks/no-raw-button
                        <StyledButton style={focusStyles.focus}>
                            Custom button
                        </StyledButton>
                    ),
                },
            },
            {
                name: "Spreading focus styles in an existing style",
                props: {
                    children: (
                        // eslint-disable-next-line @khanacademy/wonder-blocks/no-raw-button
                        <StyledButton
                            style={{
                                background:
                                    semanticColor.core.background.critical
                                        .default,
                                color: semanticColor.core.foreground.knockout
                                    .default,
                                // focus styles will be merged with the
                                // defined styles
                                ...focusStyles.focus,
                            }}
                        >
                            Custom button merging styles
                        </StyledButton>
                    ),
                },
            },
            {
                name: "Overriding :focus-visible pseudo-class",
                props: {
                    children: (
                        // eslint-disable-next-line @khanacademy/wonder-blocks/no-raw-button
                        <StyledButton
                            style={{
                                backgroundColor:
                                    semanticColor.action.secondary.progressive
                                        .default.background,
                                color: semanticColor.action.secondary
                                    .progressive.default.foreground,
                                ":focus-visible": {
                                    backgroundColor:
                                        semanticColor.action.secondary
                                            .progressive.default.background,
                                    // focus styles will be merged with the
                                    // component ones
                                    ...focusStyles.focus[":focus-visible"],
                                },
                            }}
                        >
                            Custom button overriding :focus-visible
                        </StyledButton>
                    ),
                },
            },
        ];

        return (
            <ScenariosLayout scenarios={scenarios}>
                {({inverse, ...props}) => (
                    <View
                        {...props}
                        style={{
                            background: inverse
                                ? semanticColor.core.background.neutral.strong
                                : semanticColor.status.success.background,
                            padding: sizing.size_160,
                            gap: sizing.size_160,
                        }}
                    />
                )}
            </ScenariosLayout>
        );
    },
    args: {},
    parameters: {
        pseudo: {focusVisible: true},
        docs: {
            canvas: {
                sourceState: "shown",
            },
            source: {
                type: "code",
                excludeDecorators: true,
            },
        },
    },
};
