import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";
import {action} from "storybook/actions";

import WebButton from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Button, NativeThemeProvider} from "@khanacademy/wonder-blocks-native";
import type {NativeThemeName} from "@khanacademy/wonder-blocks-native";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

type StoryComponentType = StoryObj<typeof Button>;

/**
 * SPIKE (FEI-8331). A React Native `Button` rendered through
 * react-native-web. Its styles are compiled at build time from the *web*
 * `button.module.css` + theme variables, so it tracks the web design with no
 * hand-maintained native styles.
 *
 * The Storybook theme toolbar drives both the web and native components.
 */
export default {
    title: "Spikes / Native / Button",
    component: Button,
    decorators: [
        (Story, {globals}) => (
            <NativeThemeProvider
                theme={(globals.theme ?? "default") as NativeThemeName}
                // Storybook runs on desktop, so let `(hover: hover)` rules
                // apply, as they would on web.
                hover={true}
            >
                <Story />
            </NativeThemeProvider>
        ),
    ],
    args: {
        children: "Continue",
        onPress: action("pressed"),
    },
} as Meta<typeof Button>;

/**
 * Interactive native button. Use the controls to change the props, and the
 * toolbar to switch themes. In SYL themes, press and hold to see the corners
 * ease from 8px to 12px (`transition: border-radius 0.1s ease-in-out`).
 */
export const Default: StoryComponentType = {};

const kinds = ["primary", "secondary", "tertiary"] as const;
const actionTypes = ["progressive", "destructive", "neutral"] as const;

/**
 * Web `Button` (top of each cell) next to the native `Button` (bottom) for
 * every `kind` × `actionType`, plus disabled. Differences here are what the
 * CSS → native compiler can't (yet) express. Expect focus rings and
 * `box-shadow` borders to be missing on native.
 */
export const WebVsNative: StoryComponentType = {
    render: function Render() {
        return (
            <View style={{gap: sizing.size_240}}>
                {kinds.map((kind) => (
                    <View
                        key={kind}
                        style={{flexDirection: "row", gap: sizing.size_240}}
                    >
                        {[...actionTypes, "disabled" as const].map((column) => {
                            const props =
                                column === "disabled"
                                    ? {disabled: true}
                                    : {actionType: column};
                            return (
                                <View
                                    key={column}
                                    style={{gap: sizing.size_080}}
                                >
                                    <BodyText size="xsmall">
                                        {kind} / {column}
                                    </BodyText>
                                    <WebButton
                                        kind={kind}
                                        {...props}
                                        onClick={() => {}}
                                    >
                                        Web
                                    </WebButton>
                                    <Button kind={kind} {...props}>
                                        Native
                                    </Button>
                                </View>
                            );
                        })}
                    </View>
                ))}
            </View>
        );
    },
};

/**
 * All three sizes. Small SYL buttons are 26pt tall, so the native button
 * extends its touch target to 44pt with `hitSlop` (invisible here).
 */
export const Sizes: StoryComponentType = {
    render: function Render(args) {
        return (
            <View style={{flexDirection: "row", gap: sizing.size_160}}>
                <Button {...args} size="small" />
                <Button {...args} size="medium" />
                <Button {...args} size="large" />
            </View>
        );
    },
};
