// We need to use fireEvent for mouseDown in these tests, none of the userEvent
// alternatives work. Click includes mouseUp, which removes the pressed style.
/* eslint-disable testing-library/prefer-user-event */
// @flow
import {expect} from "@storybook/jest";
import * as React from "react";
import {within, userEvent, fireEvent} from "@storybook/testing-library";
import {StyleSheet} from "aphrodite";
import {MemoryRouter, Route, Switch} from "react-router-dom";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import Link from "@khanacademy/wonder-blocks-link";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {HeadingSmall, LabelLarge} from "@khanacademy/wonder-blocks-typography";
import type {StoryComponentType} from "@storybook/react";

import LinkArgTypes from "./link.argtypes.js";
import ComponentInfo from "../../../../../.storybook/components/component-info.js";
import {name, version} from "../../../package.json";

export default {
    title: "Link",
    component: Link,
    parameters: {
        componentSubtitle: ((
            <ComponentInfo name={name} version={version} />
        ): any),
    },
    argTypes: LinkArgTypes,
};

const activeBlue = "#1b50b3";
const fadedBlue = "#b5cefb";

export const Default: StoryComponentType = (args) => (
    <Link target="_blank" {...args} />
);

Default.args = {
    href: "/",
    children: "Hello, world!",
};

export const Basic: StoryComponentType = () => (
    <Link href="#">The quick brown fox jumps over the lazy dog.</Link>
);

Basic.parameters = {
    docs: {
        storyDescription: `Minimal link usage.
            This links to the top of the page.`,
    },
};

Basic.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole("link");

    await userEvent.hover(link);
    await expect(link).toHaveStyle(
        `text-decoration: underline ${Color.blue} dashed`,
    );

    await fireEvent.mouseDown(link);
    await expect(link).toHaveStyle(
        `text-decoration: underline solid ${activeBlue}}`,
    );
};

export const Secondary: StoryComponentType = () => (
    <Link href="#" kind="secondary">
        The quick brown fox jumps over the lazy dog.
    </Link>
);

Secondary.parameters = {
    docs: {
        storyDescription: `Minimal secondary link usage. A secondary link
            has lighter text. This links to the top of the page.`,
    },
};

Secondary.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole("link");

    await userEvent.hover(link);
    await expect(link).toHaveStyle(
        `text-decoration: underline ${Color.offBlack64} dashed`,
    );

    await fireEvent.mouseDown(link);
    await expect(link).toHaveStyle(
        `text-decoration: underline solid ${Color.offBlack}}`,
    );
};

export const Visitable: StoryComponentType = () => (
    <Link href="#" visitable={true}>
        The quick brown fox jumps over the lazy dog.
    </Link>
);

Visitable.parameters = {
    docs: {
        storyDescription: `This is a visitable link. It changes color after
            it has been clicked on to indicate that it's been visited before.
            This link's \`visitable\` prop is set to true.
            It links to the top of the page.`,
    },
};

export const LightBasic: StoryComponentType = () => (
    <Link href="#" light={true}>
        The quick brown fox jumps over the lazy dog.
    </Link>
);

LightBasic.parameters = {
    docs: {
        storyDescription: `Minimal link usage on a dark background. This
            link has its \`light\` prop set to true. It links to the top
            of the page.`,
    },
    backgrounds: {
        default: "darkBlue",
    },
};

LightBasic.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole("link");

    await userEvent.hover(link);
    await expect(link).toHaveStyle(
        `text-decoration: underline ${Color.white} dashed`,
    );

    await fireEvent.mouseDown(link);
    await expect(link).toHaveStyle(
        `text-decoration: underline solid ${fadedBlue}}`,
    );
};

export const LightVisitable: StoryComponentType = () => (
    <Link href="#" light={true} visitable={true}>
        The quick brown fox jumps over the lazy dog.
    </Link>
);

LightVisitable.parameters = {
    backgrounds: {
        default: "darkBlue",
    },
    docs: {
        storyDescription: `This is a visitable link on a dark background.
            It changes color after it has been clicked on to indicate
            that it's been visited before. This link's \`visitable\` prop
            is set to true. It links to the top of the page.`,
    },
};

export const Variants: StoryComponentType = () => (
    <View>
        <Link href="#nonexistent-link">Primary Link</Link>
        <Link href="#secondary-nonexistent-link" kind="secondary">
            Secondary Link
        </Link>

        <Link href="#" visitable={true}>
            Visitable Link (Primary only)
        </Link>
    </View>
);

Variants.parameters = {
    docs: {
        storyDescription: `Primary links are blue, secondary links are black,
            and visitable links turn purple after they've been clicked on.`,
    },
};

export const LightVariants: StoryComponentType = () => (
    <View>
        <Link href="#nonexistent-link" light={true}>
            Light Link (Primary only)
        </Link>
        <Link href="#" visitable={true} light={true}>
            Light Visitable Link (Primary only)
        </Link>
    </View>
);

LightVariants.parameters = {
    backgrounds: {
        default: "darkBlue",
    },
    docs: {
        storyDescription: `Links are white on a dark background when the
            \`light\` prop is true. Secondary \`light\` links are not supported.
            Links also cannot be \`visitable\` if they're \`light\`. If
            a link has \`light\` set to \`true\` and you try to set \`kind\`
            to \`"secondary"\` or \`visitable\` to \`true\`, it will throw
            an error.`,
    },
};

export const WithTypography: StoryComponentType = () => (
    <Link href="#nonexistent-link" id="typography-link">
        <HeadingSmall>Heading inside a Link element</HeadingSmall>
    </Link>
);

WithTypography.parameters = {
    docs: {
        storyDescription: `Wonder Blocks Typography elements can also be used
            inside Links instead of plain text. Here, we have a \`Link\`
            containing a \`HeadingSmall\`.`,
    },
};

export const WithStyle: StoryComponentType = () => (
    <Link href="#" style={styles.pinkLink}>
        This link has a style.
    </Link>
);

WithStyle.parameters = {
    docs: {
        storyDescription: `Link can take a \`style\` prop. Here, the
            Link has been given a style in which the \`color\` field has
            been set to \`Colors.pink\`.`,
    },
};

export const Navigation: StoryComponentType = () => (
    <MemoryRouter>
        <View>
            <View style={styles.row}>
                <Link
                    href="/foo"
                    style={styles.heading}
                    onClick={() => {
                        // eslint-disable-next-line no-console
                        console.log("I'm still on the same page!");
                    }}
                >
                    <LabelLarge>Uses Client-side Nav</LabelLarge>
                </Link>
                <Link
                    href="/iframe.html?id=link--default&viewMode=story"
                    style={styles.heading}
                    skipClientNav
                >
                    <LabelLarge>Avoids Client-side Nav</LabelLarge>
                </Link>
            </View>
            <View style={styles.navigation}>
                <Switch>
                    <Route path="/foo">
                        <View id="foo">
                            The first link does client-side navigation here.
                        </View>
                    </Route>
                    <Route path="*">See navigation changes here</Route>
                </Switch>
            </View>
        </View>
    </MemoryRouter>
);

Navigation.parameters = {
    docs: {
        storyDescription: `If you want to navigate to an external URL
            and/or reload the window, make sure to use \`href\` and
            \`skipClientNav={true}\`, as shown in this example.
            **For navigation callbacks:** The \`onClick\`, \`beforeNav\`, and
            \`safeWithNav\` props can be used to run callbacks when navigating
            to the new URL. Which prop to use depends on the use case. See the
            [Button documentation](/story/button-navigation-callbacks--before-nav-callbacks&viewMode=docs)
            for details.`,
    },
};

const styles = StyleSheet.create({
    darkBackground: {
        backgroundColor: Color.darkBlue,
        color: Color.white,
        padding: 10,
    },
    heading: {
        marginRight: Spacing.large_24,
    },
    navigation: {
        border: `1px dashed ${Color.lightBlue}`,
        marginTop: Spacing.large_24,
        padding: Spacing.large_24,
    },
    pinkLink: {
        color: Color.pink,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
});
