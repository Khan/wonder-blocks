import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";
import {StyleSheet} from "aphrodite";

import info from "@phosphor-icons/core/regular/info.svg";

import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {actionStyles} from "@khanacademy/wonder-blocks-styles";
import Button from "@khanacademy/wonder-blocks-button";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import Link from "@khanacademy/wonder-blocks-link";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

import {allThemeModes} from "../../.storybook/modes";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";

/**
 * The following stories are used to generate the pseudo states for the
 * `actionStyles.inverse` style. This is only used for visual testing in
 * Chromatic.
 */
export default {
    title: "Packages / Styles / Action Styles / Testing / Snapshots / Action Styles",
    tags: ["!autodocs", "!manifest"],
} as Meta;

type StoryComponentType = StoryObj<any>;

const StyledButton = addStyle("button");

/**
 * The scenarios for the `inverse` style. Each scenario renders the control(s)
 * the style can be applied to, optionally in a disabled state (driven by the
 * `Disabled` column).
 */
const scenarios = [
    {
        name: "Using IconButton",
        props: {
            renderControl: (disabled: boolean) => (
                <>
                    <IconButton
                        kind="primary"
                        icon={info}
                        aria-label="Primary info button"
                        disabled={disabled}
                        style={actionStyles.inverse}
                    />
                    <IconButton
                        kind="secondary"
                        icon={info}
                        aria-label="Secondary info button"
                        disabled={disabled}
                        style={actionStyles.inverse}
                    />
                    <IconButton
                        kind="tertiary"
                        icon={info}
                        aria-label="Tertiary info button"
                        disabled={disabled}
                        style={actionStyles.inverse}
                    />
                </>
            ),
        },
    },
    {
        name: "Using Button",
        props: {
            renderControl: (disabled: boolean) => (
                <>
                    <Button
                        kind="primary"
                        disabled={disabled}
                        style={actionStyles.inverse}
                    >
                        Primary
                    </Button>
                    <Button
                        kind="secondary"
                        disabled={disabled}
                        style={actionStyles.inverse}
                    >
                        Secondary
                    </Button>
                    <Button
                        kind="tertiary"
                        disabled={disabled}
                        style={actionStyles.inverse}
                    >
                        Tertiary
                    </Button>
                </>
            ),
        },
    },
    {
        name: "Using Clickable (no border set)",
        props: {
            renderControl: (disabled: boolean) => (
                <Clickable
                    disabled={disabled}
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
            renderControl: (disabled: boolean) => (
                <Clickable
                    disabled={disabled}
                    onClick={() => {}}
                    style={[
                        {border: `${border.width.thick} solid`},
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
            renderControl: (disabled: boolean) => (
                <StyledButton
                    aria-disabled={disabled ? "true" : undefined}
                    style={[
                        {
                            // NOTE: Swapping the colors is intentional here to
                            // show the inverse version of the button.
                            border: `${border.width.thin} solid ${semanticColor.core.border.critical.default}`,
                            backgroundColor:
                                semanticColor.core.background.critical.default,
                            color: semanticColor.core.foreground.knockout
                                .default,
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
        // NOTE: Link does not have a disabled state, so it renders the same in
        // both columns.
        name: "Using Link",
        props: {
            renderControl: () => (
                <BodyText
                    style={{
                        color: semanticColor.core.foreground.knockout.default,
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

const states = [
    {name: "Default", props: {disabled: false}},
    {name: "Disabled", props: {disabled: true}},
];

/**
 * A state sheet for the `actionStyles.inverse` style. It shows the style
 * applied to the different interactive controls it supports across each pseudo
 * state, in both the default and disabled states.
 *
 * The controls are rendered on a dark background since the `inverse` style is
 * meant for interactive elements on inverse (dark) backgrounds.
 */
export const StateSheetStory: StoryComponentType = {
    name: "StateSheet",
    render: () => {
        return (
            <StateSheet
                rows={scenarios}
                columns={states}
                title="Scenario / State"
            >
                {({props, name}) => (
                    <View key={name} style={styles.inverseBackground}>
                        {props.renderControl(props.disabled)}
                    </View>
                )}
            </StateSheet>
        );
    },
    parameters: {
        pseudo: defaultPseudoStates,
        chromatic: {
            modes: allThemeModes,
        },
    },
};

const styles = StyleSheet.create({
    inverseBackground: {
        flexDirection: "row",
        alignItems: "center",
        gap: sizing.size_160,
        padding: sizing.size_160,
        background: semanticColor.core.background.neutral.strong,
    },
});
