import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import info from "@phosphor-icons/core/regular/info.svg";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-styles/package.json";
import Button from "@khanacademy/wonder-blocks-button";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {View} from "@khanacademy/wonder-blocks-core";
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
 * // Applying to a WB component via style prop
 * <IconButton
 *     icon={myIcon}
 *     aria-label="Action"
 *     style={focusStyles.focus}
 * />
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

/**
 * A global focus style that can be applied to interactive elements.
 *
 * This style injects a combination of `outline` and `box-shadow` to indicate
 * the element is focused. This is used for accessibility purposes as it allows
 * the element to present a focus state on Windows High Contrast mode.
 *
 * Wonder Blocks interactive components (`Button`, `IconButton`, `Clickable`,
 * etc.) already include these focus styles — no manual application needed.
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
                name: "Using Button",
                props: {
                    children: (
                        <Button onClick={() => {}} style={focusStyles.focus}>
                            Custom styled button
                        </Button>
                    ),
                },
            },
            {
                name: "Spreading focus styles with existing styles",
                props: {
                    children: (
                        <Button
                            onClick={() => {}}
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
                            Button merging styles
                        </Button>
                    ),
                },
            },
            {
                name: "Overriding :focus-visible pseudo-class",
                props: {
                    children: (
                        <Button
                            onClick={() => {}}
                            style={{
                                ":focus-visible": {
                                    // focus styles will be merged with the
                                    // component ones
                                    ...focusStyles.focus[":focus-visible"],
                                    outline: "3px solid red",
                                },
                            }}
                        >
                            Button overriding :focus-visible
                        </Button>
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
