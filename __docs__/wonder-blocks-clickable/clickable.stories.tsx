import * as React from "react";
import {StyleSheet} from "aphrodite";
import {MemoryRouter, Route, Switch} from "react-router-dom";
import type {Meta, StoryObj} from "@storybook/react";

import {View} from "@khanacademy/wonder-blocks-core";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {Body, LabelLarge} from "@khanacademy/wonder-blocks-typography";

import Clickable from "@khanacademy/wonder-blocks-clickable";
import packageConfig from "../../packages/wonder-blocks-clickable/package.json";

import ComponentInfo from "../../.storybook/components/component-info";
import argTypes from "./clickable.argtypes";
import Button from "@khanacademy/wonder-blocks-button";

export default {
    title: "Packages / Clickable / Clickable",
    component: Clickable,
    argTypes: argTypes,
    args: {
        testId: "",
        disabled: false,
        light: false,
        hideDefaultFocusRing: false,
    },
    decorators: [
        (Story): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={styles.centerText}>
                <Story />
            </View>
        ),
    ],
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
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
} as Meta<typeof Clickable>;

type StoryComponentType = StoryObj<typeof Clickable>;

export const Default: StoryComponentType = (args: any) => (
    <Clickable {...args}>
        {({hovered, pressed, focused}) => (
            <View
                style={[
                    styles.clickable,
                    hovered && styles.hovered,
                    pressed && styles.pressed,
                    focused && styles.focused,
                ]}
            >
                <Body>This text is clickable!</Body>
            </View>
        )}
    </Clickable>
);

Default.args = {
    onClick: () => {
        // eslint-disable-next-line no-alert
        alert("Click!");
    },
};

export const Basic: StoryComponentType = () => (
    <View style={styles.centerText}>
        <Clickable
            href="https://www.khanacademy.org/about/tos"
            skipClientNav={true}
        >
            {({hovered, pressed}) => (
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
    chromatic: {
        // we don't need screenshots because this story is already covered in
        // `Default`. We add this story to the `Docs` tab to present the
        // description above along with the example.
        disableSnapshot: true,
    },
};

/**
 * Clickable usage on dark backgrounds
 */
export const Light: StoryComponentType = () => (
    <View style={styles.dark}>
        <Clickable
            href="https://www.khanacademy.org/about/tos"
            skipClientNav={true}
            light={true}
        >
            {({hovered, pressed}) => (
                <View
                    style={[
                        styles.clickable,
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
    chromatic: {
        // Not needed because the default state doesn't test the disabled
        // clickable behavior.
        disableSnapshot: true,
    },
    docs: {
        description: {
            story: "Clickable has a `light` prop which changes the default focus ring color to fit a dark background.",
        },
    },
    backgrounds: {
        default: "darkBlue",
    },
};

/**
 * Disabled state
 */
export const Disabled: StoryComponentType = (args: any) => (
    <>
        <Clickable onClick={() => {}} {...args}>
            {({hovered, pressed}) => (
                <View
                    style={[
                        styles.clickable,
                        hovered && styles.hovered,
                        pressed && styles.pressed,
                    ]}
                >
                    <Body>
                        Disabled clickable using the default disabled style
                    </Body>
                </View>
            )}
        </Clickable>
        <Clickable onClick={() => {}} {...args}>
            {({hovered, focused, pressed}) => (
                <View
                    style={[
                        styles.clickable,
                        hovered && styles.hovered,
                        pressed && styles.pressed,
                        args.disabled && styles.disabled,
                    ]}
                >
                    <Body>
                        Disabled clickable passing custom disabled styles
                    </Body>
                </View>
            )}
        </Clickable>
    </>
);

Disabled.args = {
    disabled: true,
};

Disabled.parameters = {
    docs: {
        description: {
            story: "Clickable has a `disabled` prop which prevents the element from being operable. Note that the default disabled style is applied to the element, but you can also pass custom styles to the children element by passing any `disabled` styles (see the second clickable element in the example below).",
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
                    onClick={() => {
                        // eslint-disable-next-line no-console
                        console.log("I'm still on the same page!");
                    }}
                >
                    {(eventState) => (
                        <LabelLarge>Uses Client-side Nav</LabelLarge>
                    )}
                </Clickable>
                <Clickable
                    href="/iframe.html?id=clickable-clickable--default&viewMode=story"
                    style={styles.heading}
                    skipClientNav
                >
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
            story:
                "Clickable adds support to keyboard navigation. This way, your components are accessible and emulate better the browser's behavior.\n\n" +
                "**NOTE:** If you want to navigate to an external URL and/or reload the window, make sure to use `href` and `skipClientNav={true}`",
        },
    },
    chromatic: {
        // we don't need screenshots because this story only tests behavior.
        disableSnapshot: true,
    },
};

export const Ref: StoryComponentType = () => {
    const clickableRef: React.RefObject<HTMLAnchorElement> = React.createRef();
    const handleSubmit = () => {
        if (clickableRef.current) {
            clickableRef.current.focus();
        }
    };

    return (
        <View style={[styles.centerText, styles.centered]}>
            <Clickable ref={clickableRef}>
                {({hovered, focused, pressed}) => (
                    <View
                        style={[
                            hovered && styles.hovered,
                            pressed && styles.pressed,
                            focused && styles.focused,
                        ]}
                    >
                        <Body>Press below to focus me!</Body>
                    </View>
                )}
            </Clickable>
            <Button style={styles.button} onClick={handleSubmit}>
                Focus
            </Button>
        </View>
    );
};

Ref.parameters = {
    docs: {
        description: {
            story: `If you need to save a reference to the \`Clickable\` element , you can do
        so using the \`ref\` prop. In this example, we want the element to receive focus when the
        button is pressed. We can do this by creating a React ref of type \`HTMLButtonElement\` and
        passing it into \`Clickable\`'s \`ref\` prop. Now we can use the ref variable in the
        \`handleSubmit\` function to shift focus to the field.`,
        },
    },
    chromatic: {
        // we don't need screenshots because this story only tests behavior.
        disableSnapshot: true,
    },
};

const styles = StyleSheet.create({
    clickable: {
        borderWidth: 1,
        padding: spacing.medium_16,
    },
    hovered: {
        textDecoration: "underline",
        backgroundColor: color.teal,
    },
    pressed: {
        color: color.blue,
    },
    focused: {
        outline: `solid 4px ${color.lightBlue}`,
    },
    centerText: {
        gap: spacing.medium_16,
        textAlign: "center",
    },
    dark: {
        backgroundColor: color.darkBlue,
        color: color.white,
        padding: spacing.xSmall_8,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    heading: {
        marginRight: spacing.large_24,
    },
    navigation: {
        border: `1px dashed ${color.lightBlue}`,
        marginTop: spacing.large_24,
        padding: spacing.large_24,
    },
    disabled: {
        color: color.white,
        backgroundColor: color.offBlack64,
    },
    button: {
        maxWidth: 150,
    },
    centered: {
        alignItems: "center",
        justifyContent: "center",
    },
});
