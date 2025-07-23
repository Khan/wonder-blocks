import * as React from "react";
import {Meta, StoryObj} from "@storybook/react";
import info from "@phosphor-icons/core/regular/info.svg";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-styles/package.json";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {ScenariosLayout} from "../components/scenarios-layout";

/**
 * Styles that can be used to create reusable focus states.
 *
 * ### Usage
 *
 * ```tsx
 * import {focusStyles} from "@khanacademy/wonder-blocks-styles";
 *
 * <StyledButton style={focusStyles.focus}>
 *      Custom button
 * </StyledButton>
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
                    padding: spacing.medium_16,
                    flexDirection: "row",
                    placeItems: "center",
                }}
            >
                <View
                    style={{
                        background: semanticColor.status.success.background,
                        padding: spacing.medium_16,
                        gap: spacing.medium_16,
                    }}
                >
                    <IconButton
                        kind="tertiary"
                        icon={info}
                        style={focusStyles.focus}
                    />
                </View>
                <View
                    style={{
                        background: semanticColor.surface.inverse,
                        padding: spacing.medium_16,
                        gap: spacing.medium_16,
                    }}
                >
                    <IconButton
                        kind="tertiary"
                        icon={info}
                        style={[
                            focusStyles.focus,
                            {
                                color: semanticColor.core.foreground.inverse
                                    .strong,
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
                            style={[
                                focusStyles.focus,
                                {
                                    color: semanticColor.core.foreground.inverse
                                        .strong,
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
                        <StyledButton
                            style={{
                                color: semanticColor.action.secondary
                                    .progressive.default.foreground,
                                // focus styles will be merged with the
                                // defined styles
                                ...focusStyles.focus,
                            }}
                        >
                            Custom button
                        </StyledButton>
                    ),
                },
            },
            {
                name: "Overriding :focus-visible pseudo-class",
                props: {
                    children: (
                        <StyledButton
                            style={{
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
                            Custom button
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
                                ? semanticColor.surface.inverse
                                : semanticColor.status.success.background,
                            padding: spacing.medium_16,
                            gap: spacing.medium_16,
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
