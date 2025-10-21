import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";
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
import Button from "@khanacademy/wonder-blocks-button";
import Link from "@khanacademy/wonder-blocks-link";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

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
                                aria-label="Primary info button"
                                style={actionStyles.inverse}
                            />
                            <IconButton
                                kind="secondary"
                                icon={info}
                                aria-label="Secondary info button"
                                style={actionStyles.inverse}
                            />
                            <IconButton
                                kind="tertiary"
                                icon={info}
                                aria-label="Tertiary info button"
                                style={actionStyles.inverse}
                            />
                            <IconButton
                                kind="primary"
                                disabled
                                icon={info}
                                aria-label="Disabled primary info button"
                                style={actionStyles.inverse}
                            />
                            <IconButton
                                kind="secondary"
                                disabled
                                icon={info}
                                aria-label="Disabled secondary info button"
                                style={actionStyles.inverse}
                            />
                            <IconButton
                                kind="tertiary"
                                disabled
                                icon={info}
                                aria-label="Disabled tertiary info button"
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
                                    border: `${border.width.thick} solid`,
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
                                    border: `${border.width.thin} solid ${semanticColor.core.border.critical.default}`,
                                    backgroundColor:
                                        semanticColor.core.background.critical
                                            .default,
                                    color: semanticColor.core.foreground
                                        .knockout.default,
                                },
                                actionStyles.inverse,
                            ]}
                        >
                            Custom button
                        </StyledButton>
                    ),
                },
            },
            {
                name: "Using Button",
                props: {
                    children: (
                        <View
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                                gap: spacing.medium_16,
                            }}
                        >
                            <Button kind="primary" style={actionStyles.inverse}>
                                Primary button
                            </Button>
                            <Button
                                kind="secondary"
                                endIcon={info}
                                style={actionStyles.inverse}
                            >
                                Secondary button
                            </Button>
                            <Button
                                kind="tertiary"
                                style={actionStyles.inverse}
                            >
                                Tertiary button
                            </Button>
                            <Button
                                disabled
                                kind="primary"
                                style={actionStyles.inverse}
                            >
                                Disabled Primary button
                            </Button>
                            <Button
                                disabled
                                kind="secondary"
                                style={actionStyles.inverse}
                            >
                                Disabled Secondary button
                            </Button>
                            <Button
                                disabled
                                kind="tertiary"
                                style={actionStyles.inverse}
                            >
                                Disabled Tertiary button
                            </Button>
                        </View>
                    ),
                },
            },
            {
                name: "Using Link",
                props: {
                    children: (
                        <BodyText
                            style={{
                                color: semanticColor.core.foreground.knockout
                                    .default,
                                width: 530,
                            }}
                        >
                            This is an inline{" "}
                            <Link
                                href="#link"
                                inline={true}
                                style={actionStyles.inverse}
                            >
                                regular link
                            </Link>
                            . In this sentence, there is also an inline{" "}
                            <Link
                                href="https://cat-bounce.com/"
                                inline={true}
                                style={actionStyles.inverse}
                                target="_blank"
                            >
                                external link
                            </Link>
                            .
                        </BodyText>
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
                            background:
                                semanticColor.core.background.neutral.strong,
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
