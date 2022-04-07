// @flow
import * as React from "react";

import {StyleSheet} from "aphrodite";
import {MemoryRouter, Route, Switch} from "react-router-dom";

import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Body, LabelLarge} from "@khanacademy/wonder-blocks-typography";

import type {StoryComponentType} from "@storybook/react";
import ComponentInfo from "../../../../../.storybook/components/component-info.js";
import {name, version} from "../../../package.json";
import argTypes from "./clickable.argtypes.js";

export default {
    title: "Clickable / Clickable",
    component: Clickable,
    argTypes: argTypes,
    args: {
        testId: "",
        light: false,
    },
    parameters: {
        componentSubtitle: ((
            <ComponentInfo name={name} version={version} />
        ): any),
        docs: {
            description: {
                component: null,
            },
            source: {
                // See https://github.com/storybookjs/storybook/issues/12596
                excludeDecorators: true,
            },
        },
    },
};

export const Default: StoryComponentType = (args) => (
    <Clickable {...args}>
        {({hovered, focused, pressed}) => {
            return (
                <View
                    style={[
                        hovered && styles.hovered,
                        pressed && styles.pressed,
                    ]}
                >
                    <Body>This text is clickable!</Body>
                </View>
            );
        }}
    </Clickable>
);

export const Basic: StoryComponentType = () => (
    <View style={styles.centerText}>
        <Clickable
            href="https://www.khanacademy.org/about/tos"
            skipClientNav={true}
        >
            {({hovered, focused, pressed}) => (
                <View
                    style={[
                        hovered && styles.hovered,
                        pressed && styles.pressed,
                    ]}
                >
                    <Body>This text is clickable!</Body>
                </View>
            )}
        </Clickable>
    </View>
);

Basic.parameters = {
    docs: {
        description: {
            story: "You can make custom components Clickable by returning them in a function of the Clickable child. The eventState parameter the function takes allows access to states pressed, hovered and clicked, which you may use to create custom styles.\n\nClickable has a default focus ring style built-in.  If you are creating your own custom focus ring it should be disabled using by setting `hideDefaultFocusRing={true}` in the props passed to `Clickable`.",
        },
    },
};

export const Light: StoryComponentType = () => (
    <View style={[styles.centerText, styles.dark]}>
        <Clickable
            href="https://www.khanacademy.org/about/tos"
            skipClientNav={true}
            light={true}
        >
            {({hovered, focused, pressed}) => (
                <View
                    style={[
                        hovered && styles.hovered,
                        pressed && styles.pressed,
                    ]}
                >
                    <Body>This text is clickable!</Body>
                </View>
            )}
        </Clickable>
    </View>
);

Light.parameters = {
    docs: {
        description: {
            story: "Clickable has a `light` prop which changes the default focus ring color to fit a dark background.",
        },
    },
};

export const ClientSideNavigation: StoryComponentType = () => (
    <MemoryRouter>
        <View>
            <View style={styles.row}>
                <Clickable
                    href="/foo"
                    style={styles.heading}
                    onClick={() => console.log("I'm still on the same page!")}
                >
                    {(eventState) => (
                        <LabelLarge>Uses Client-side Nav</LabelLarge>
                    )}
                </Clickable>
                <Clickable href="/foo" style={styles.heading} skipClientNav>
                    {(eventState) => (
                        <LabelLarge>Avoids Client-side Nav</LabelLarge>
                    )}
                </Clickable>
            </View>
            <View style={styles.navigation}>
                <Switch>
                    <Route path="/foo">
                        <View id="foo">
                            The first clickable element does client-side
                            navigation here.
                        </View>
                    </Route>
                    <Route path="*">See navigation changes here</Route>
                </Switch>
            </View>
        </View>
    </MemoryRouter>
);

ClientSideNavigation.storyName = "Client-side Navigation";

ClientSideNavigation.parameters = {
    docs: {
        description: {
            story: "If your Clickable component is within a React-Router enviroment, your component will automatically default to client-side routing with the `href` prop is set. This behavior can be toggeled by passing the `skipClientNav` prop. In this example we see two Clickable h1 tags, one which employs client-side routing, and the other uses skipClientNav to avoid this default behavior.",
        },
    },
};

ClientSideNavigation.parameters = {
    chromatic: {
        // we don't need screenshots because this story only tests behavior.
        disableSnapshot: true,
    },
    docs: {
        description: {
            story:
                "Clickable adds support to keyboard navigation. This way, your components are accessible and emulate better the browser's behavior.\n\n" +
                "**NOTE:** If you want to navigate to an external URL and/or reload the window, make sure to use `href` and `skipClientNav={true}`",
        },
    },
};

const styles = StyleSheet.create({
    hovered: {
        textDecoration: "underline",
        backgroundColor: Color.teal,
    },
    pressed: {
        color: Color.blue,
    },
    focused: {
        outline: `solid 4px ${Color.lightBlue}`,
    },
    centerText: {
        textAlign: "center",
    },
    dark: {
        backgroundColor: Color.darkBlue,
        color: Color.white,
        padding: Spacing.xSmall_8,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    heading: {
        marginRight: Spacing.large_24,
    },
    navigation: {
        border: `1px dashed ${Color.lightBlue}`,
        marginTop: Spacing.large_24,
        padding: Spacing.large_24,
    },
});
