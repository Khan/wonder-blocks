import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import info from "@phosphor-icons/core/regular/info.svg";
import {ScenariosLayout} from "../components/scenarios-layout";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {
    border,
    semanticColor,
    spacing,
} from "@khanacademy/wonder-blocks-tokens";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {actionStyles} from "@khanacademy/wonder-blocks-styles";
import IconButton from "@khanacademy/wonder-blocks-icon-button";

const StyledButton = addStyle("button");

/**
 * The following stories are used to generate the pseudo states for these
 * stories. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Styles / Action Styles / Action Styles - All Variants",
    parameters: {
        docs: {
            autodocs: false,
        },
    },
    render: () => {
        const scenarios = [
            {
                name: "Using IconButton",
                props: {
                    children: (
                        <View
                            style={{
                                flexDirection: "row",
                                gap: spacing.medium_16,
                            }}
                        >
                            <IconButton
                                kind="primary"
                                icon={info}
                                style={actionStyles.inverse}
                            />
                            <IconButton
                                kind="secondary"
                                icon={info}
                                style={actionStyles.inverse}
                            />
                            <IconButton
                                kind="tertiary"
                                icon={info}
                                style={actionStyles.inverse}
                            />
                            <IconButton
                                kind="primary"
                                disabled
                                icon={info}
                                style={actionStyles.inverse}
                            />
                        </View>
                    ),
                },
            },
            {
                name: "Using Clickable (no border set)",
                props: {
                    children: (
                        <Clickable
                            onClick={() => {}}
                            style={actionStyles.inverse}
                        >
                            {() => "Clickable component"}
                        </Clickable>
                    ),
                },
            },
            {
                name: "Using Clickable with border",
                props: {
                    children: (
                        <Clickable
                            onClick={() => {}}
                            style={[
                                {
                                    border: `${border.width.thick}px solid`,
                                },
                                actionStyles.inverse,
                            ]}
                        >
                            {() => "Clickable component"}
                        </Clickable>
                    ),
                },
            },
            {
                name: "Using an HTML element",
                props: {
                    children: (
                        <StyledButton
                            style={[
                                {
                                    // NOTE: Swapping the colors is intentional
                                    // here to show the inverse version of the
                                    // button.
                                    border: `1px solid ${semanticColor.status.success.background}`,
                                    backgroundColor:
                                        semanticColor.status.success.foreground,
                                    color: semanticColor.status.success
                                        .background,
                                },
                                actionStyles.inverse,
                            ]}
                        >
                            Custom button
                        </StyledButton>
                    ),
                },
            },
        ];

        return (
            <ScenariosLayout scenarios={scenarios}>
                {(props) => (
                    <View
                        {...props}
                        style={{
                            background: semanticColor.surface.inverse,
                            padding: spacing.medium_16,
                            gap: spacing.medium_16,
                        }}
                    />
                )}
            </ScenariosLayout>
        );
    },
    tags: ["!autodocs"],
} as Meta;

type StoryComponentType = StoryObj<any>;

export const Default: StoryComponentType = {};

export const Hover: StoryComponentType = {
    parameters: {pseudo: {hover: true}},
};

export const Focus: StoryComponentType = {
    parameters: {pseudo: {focusVisible: true}},
};

export const HoverFocus: StoryComponentType = {
    name: "Hover + Focus",
    parameters: {pseudo: {hover: true, focusVisible: true}},
};

export const Press: StoryComponentType = {
    parameters: {pseudo: {active: true}},
};

export const PressFocus: StoryComponentType = {
    name: "Press + Focus",
    parameters: {pseudo: {active: true, focusVisible: true}},
};
