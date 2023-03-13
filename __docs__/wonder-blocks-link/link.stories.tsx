// We need to use fireEvent for mouseDown in these tests, none of the userEvent
// alternatives work. Click includes mouseUp, which removes the pressed style.
/* eslint-disable testing-library/prefer-user-event */
import {expect} from "@storybook/jest";
import * as React from "react";
import {within, userEvent, fireEvent} from "@storybook/testing-library";
import {StyleSheet} from "aphrodite";
import {MemoryRouter, Route, Switch} from "react-router-dom";
import type {ComponentStory, ComponentMeta} from "@storybook/react";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {
    Body,
    HeadingSmall,
    LabelLarge,
} from "@khanacademy/wonder-blocks-typography";
import Link from "@khanacademy/wonder-blocks-link";
import {name, version} from "../../packages/wonder-blocks-link/package.json";

import ComponentInfo from "../../.storybook/components/component-info";
import LinkArgTypes from "./link.argtypes";

export default {
    title: "Link",
    component: Link,
    parameters: {
        componentSubtitle: <ComponentInfo name={name} version={version} />,
    },
    argTypes: LinkArgTypes,
} as ComponentMeta<typeof Link>;

const activeBlue = "#1b50b3";
const fadedBlue = "#b5cefb";

type StoryComponentType = ComponentStory<typeof Link>;

export const Default: StoryComponentType = (args) => (
    <Link target="_blank" {...args} />
);

Default.args = {
    href: "/",
    children: "Hello, world!",
};

export const Primary: StoryComponentType = () => (
    <Link href="#">The quick brown fox jumps over the lazy dog.</Link>
);

Primary.parameters = {
    docs: {
        storyDescription: `Minimal link usage.
            This links to the top of the page.`,
    },
};

Primary.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole("link");

    await expect(link).toHaveStyle(`color: ${Color.blue}`);

    await userEvent.hover(link);
    // TODO(WB-1521): Expect the dashed 2px style.
    // await expect(link).toHaveStyle(
    //     `text-decoration: underline ${Color.blue} dashed 2px`,
    // );
    await expect(link).toHaveStyle(
        `text-decoration: underline ${Color.blue} solid`,
    );

    await fireEvent.mouseDown(link);
    await expect(link).toHaveStyle(
        `text-decoration: underline solid ${activeBlue}`,
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

    await expect(link).toHaveStyle(`color: ${Color.offBlack64}`);

    await userEvent.hover(link);
    // TODO(WB-1521): Expect the dashed 2px style.
    // await expect(link).toHaveStyle(
    //     `text-decoration: underline ${Color.offBlack64} dashed 2px`,
    // );
    await expect(link).toHaveStyle(
        `text-decoration: underline ${Color.offBlack64} solid`,
    );

    await fireEvent.mouseDown(link);
    await expect(link).toHaveStyle(
        `text-decoration: underline solid ${Color.offBlack}`,
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

export const LightPrimary: StoryComponentType = () => (
    <Link href="#" light={true}>
        The quick brown fox jumps over the lazy dog.
    </Link>
);

LightPrimary.parameters = {
    docs: {
        storyDescription: `Minimal link usage on a dark background. This
            link has its \`light\` prop set to true. It links to the top
            of the page.`,
    },
    backgrounds: {
        default: "darkBlue",
    },
};

LightPrimary.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole("link");

    await userEvent.hover(link);
    // TODO(WB-1521): Expect the dashed 2px style.
    // await expect(link).toHaveStyle(
    //     `text-decoration: underline ${Color.white} dashed 2px`,
    // );
    await expect(link).toHaveStyle(
        `text-decoration: underline ${Color.white} solid`,
    );

    await fireEvent.mouseDown(link);
    await expect(link).toHaveStyle(
        `text-decoration: underline solid ${fadedBlue}`,
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

export const Inline: StoryComponentType = () => (
    <Body>
        This is an inline{" "}
        <Link href="#" inline={true}>
            Primary link
        </Link>{" "}
        and an inline{" "}
        <Link href="#" inline={true} target="_blank">
            external Primary link,
        </Link>
        whereas this is an inline{" "}
        <Link href="#" kind="secondary" inline={true}>
            Secondary link,
        </Link>{" "}
        and an inline{" "}
        <Link href="#" kind="secondary" inline={true} target="_blank">
            external Secondary link
        </Link>
        , and this is an inline{" "}
        <Link href="#" visitable={true} inline={true}>
            Visitable link (Primary only)
        </Link>{" "}
        and an inline{" "}
        <Link href="#" visitable={true} inline={true} target="_blank">
            external Visitable link (Primary only)
        </Link>
        .
    </Body>
);

Inline.parameters = {
    docs: {
        storyDescription: `Inline links include an underline to distinguish
            them from the surrounding text. Make a link inline by setting the
            \`inline\` prop to \`true\`. It is recommended to use inline
            links within paragraphs and sentences.`,
    },
};

Inline.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);

    const primaryLink = canvas.getByText("Primary link");
    const secondaryLink = canvas.getByText("Secondary link");

    // Primary link styles
    await expect(primaryLink).toHaveStyle(`color: ${Color.blue}`);

    await userEvent.hover(primaryLink);
    // TODO(WB-1521): Expect the dashed 2px style.
    // await expect(primaryLink).toHaveStyle(
    //     `text-decoration: underline ${Color.blue} dashed 2px`,
    // );
    await expect(primaryLink).toHaveStyle(
        `text-decoration: underline ${Color.blue} solid`,
    );

    await fireEvent.mouseDown(primaryLink);
    await expect(primaryLink).toHaveStyle(
        `text-decoration: underline solid ${activeBlue}`,
    );

    // Secondary link styles
    await expect(secondaryLink).toHaveStyle(`color: ${Color.offBlack}`);

    await userEvent.hover(secondaryLink);
    // TODO(WB-1521): Expect the dashed 2px style.
    // await expect(secondaryLink).toHaveStyle(
    //     `text-decoration: underline ${Color.offBlack} dashed 2px`,
    // );
    await expect(secondaryLink).toHaveStyle(
        `text-decoration: underline ${Color.offBlack} solid`,
    );

    await fireEvent.mouseDown(secondaryLink);
    await expect(secondaryLink).toHaveStyle(
        `text-decoration: underline solid ${activeBlue}`,
    );
};

export const InlineLight: StoryComponentType = () => (
    <Body style={{color: Color.white}}>
        This is an inline{" "}
        <Link href="#" inline={true} light={true}>
            Primary link
        </Link>{" "}
        and an{" "}
        <Link href="#" inline={true} light={true} target="_blank">
            external Primary link,
        </Link>
        whereas this is an inline{" "}
        <Link href="#" visitable={true} inline={true} light={true}>
            Visitable link (Primary only)
        </Link>{" "}
        and an{" "}
        <Link
            href="#"
            visitable={true}
            inline={true}
            light={true}
            target="_blank"
        >
            external Visitable link (Primary only).
        </Link>
        Secondary light links are not supported.
    </Body>
);

InlineLight.parameters = {
    backgrounds: {
        default: "darkBlue",
    },
    docs: {
        storyDescription: `Inline links include an underline to distinguish
            them from the surrounding text. If the link is on a
            dark background, set the \`light\` prop to true for it to
            be appropriately visible.\n\n**NOTE:** Secondary light links are
            not supported.`,
    },
};

InlineLight.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);

    const primaryLink = canvas.getByText("Primary link");

    await expect(primaryLink).toHaveStyle(`color: ${Color.white}`);

    await userEvent.hover(primaryLink);
    // TODO(WB-1521): Expect the dashed 2px style.
    // await expect(primaryLink).toHaveStyle(
    //     `text-decoration: underline ${Color.white} dashed 2px`,
    // );
    await expect(primaryLink).toHaveStyle(
        `text-decoration: underline ${Color.white} solid`,
    );

    await fireEvent.mouseDown(primaryLink);
    await expect(primaryLink).toHaveStyle(
        `text-decoration: underline solid ${fadedBlue}`,
    );
};

export const Variants: StoryComponentType = () => (
    <View>
        {/* Default (dark) */}
        <View style={{padding: Spacing.large_24}}>
            {/* Standalone */}
            <View>
                <View style={styles.standaloneLinkWrapper}>
                    <Link href="#nonexistent-link">
                        Standalone Primary Link
                    </Link>
                </View>
                <View style={styles.standaloneLinkWrapper}>
                    <Link href="#nonexistent-link" target="_blank">
                        Standalone External Primary Link
                    </Link>
                </View>
                <View style={styles.standaloneLinkWrapper}>
                    <Link href="#secondary-nonexistent-link" kind="secondary">
                        Standalone Secondary Link
                    </Link>
                </View>
                <View style={styles.standaloneLinkWrapper}>
                    <Link
                        href="#secondary-nonexistent-link"
                        kind="secondary"
                        target="_blank"
                    >
                        Standalone External Secondary Link
                    </Link>
                </View>
                <View style={styles.standaloneLinkWrapper}>
                    <Link href="#" visitable={true}>
                        Standalone Visitable Link (Primary only)
                    </Link>
                </View>
                <View style={styles.standaloneLinkWrapper}>
                    <Link href="#" visitable={true} target="_blank">
                        Standalone External Visitable Link (Primary only)
                    </Link>
                </View>
            </View>
            <Strut size={Spacing.xSmall_8} />
            {/* Inline */}
            <Body>
                This is an{" "}
                <Link href="#" inline={true}>
                    Inline Primary link
                </Link>{" "}
                and an{" "}
                <Link href="#" inline={true} target="_blank">
                    Inline External Primary link,
                </Link>
                whereas this is an{" "}
                <Link href="#" kind="secondary" inline={true}>
                    Inline Secondary link
                </Link>{" "}
                and an{" "}
                <Link href="#" kind="secondary" inline={true} target="_blank">
                    Inline External Secondary link,
                </Link>
                and this is an{" "}
                <Link href="#" visitable={true} inline={true}>
                    Inline Visitable link (Primary only)
                </Link>{" "}
                and an{" "}
                <Link href="#" visitable={true} inline={true} target="_blank">
                    Inline External Visitable link (Primary only)
                </Link>
                .
            </Body>
        </View>
        {/* Light */}
        <View
            style={{
                backgroundColor: Color.darkBlue,
                padding: Spacing.large_24,
            }}
        >
            {/* Standalone */}
            <View>
                <View style={styles.standaloneLinkWrapper}>
                    <Link href="#nonexistent-link" light={true}>
                        Standalone Light Link (Primary only)
                    </Link>
                </View>
                <View style={styles.standaloneLinkWrapper}>
                    <Link href="#nonexistent-link" light={true} target="_blank">
                        Standalone External Light Link (Primary only)
                    </Link>
                </View>
                <View style={styles.standaloneLinkWrapper}>
                    <Link href="#" visitable={true} light={true}>
                        Standalone Light Visitable Link (Primary only)
                    </Link>
                </View>
                <View style={styles.standaloneLinkWrapper}>
                    <Link
                        href="#"
                        visitable={true}
                        light={true}
                        target="_blank"
                    >
                        Standalone External Light Visitable Link (Primary only)
                    </Link>
                </View>
            </View>
            <Strut size={Spacing.xSmall_8} />
            {/* Inline */}
            <Body style={{color: Color.white}}>
                This is an{" "}
                <Link href="#" inline={true} light={true}>
                    Inline Primary link
                </Link>{" "}
                and an{" "}
                <Link href="#" inline={true} light={true} target="_blank">
                    Inline External Primary link,
                </Link>
                whereas this is an{" "}
                <Link href="#" visitable={true} inline={true} light={true}>
                    Inline Visitable link (Primary only)
                </Link>{" "}
                and an{" "}
                <Link
                    href="#"
                    visitable={true}
                    inline={true}
                    light={true}
                    target="_blank"
                >
                    Inline External Visitable link (Primary only).
                </Link>
                Secondary light links are not supported.
            </Body>
        </View>
    </View>
);

Variants.parameters = {
    docs: {
        storyDescription: `By default, primary links are blue, secondary
            links are gray, and visitable links turn purple after they've
            been clicked on. Default inline links are underlined, and the
            secondary kind is black to match surrounding text color.
            Light standalone and inline links have the same colors - white
            with visited visitable links being pink. Light inline links are
            also underlined like default inline links. Light secondary links
            are not supported and will result in an error.`,
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

WithTypography.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);

    const heading = canvas.getByText("Heading inside a Link element");

    // Confirm that the default font size and line height
    // are successfully overridden by typography.
    await expect(heading).toHaveStyle("font-size: 20px");
    await expect(heading).toHaveStyle("lineHeight: 24px");
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

export const OpensInANewTab: StoryComponentType = () => (
    <View>
        <View style={{padding: Spacing.large_24}}>
            <Link href="#" target="_blank">
                This is a Primary link that opens in a new tab.
            </Link>
            <Link href="#" kind="secondary" target="_blank">
                This is a Secondary link that opens in a new tab.
            </Link>
        </View>
    </View>
);

OpensInANewTab.parameters = {
    docs: {
        storyDescription: `When \`target="_blank"\`, the external icon is
        automatically added to the end of the link. This indicates that the link
        will open in a new tab.`,
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
    standaloneLinkWrapper: {
        // Use inline-block so the outline wraps only the text
        // instead of taking the full width of the parent
        // container.
        display: "inline-block",
        marginBottom: Spacing.xSmall_8,
    },
});
