// We need to use fireEvent for mouseDown in these tests, none of the userEvent
// alternatives work. Click includes mouseUp, which removes the pressed style.
// TODO(wb-): Add back comment: eslint-disable testing-library/prefer-user-event
import {expect} from "@storybook/jest";
import * as React from "react";
// TODO(WB-): uncomment this import after updating styles
// import {within, userEvent, fireEvent} from "@storybook/testing-library";
import {within} from "@storybook/testing-library";
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

// TODO(WB-): uncomment these variables after updating styles
// const activeBlue = "#1b50b3";
// const fadedBlue = "#b5cefb";

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

// TODO(WB-): uncomment this test after going back to dashed style
// Primary.play = async ({canvasElement}) => {
//     const canvas = within(canvasElement);

//     const link = canvas.getByRole("link");

//     await expect(link).toHaveStyle(`color: ${Color.blue}`);

//     await userEvent.hover(link);
//     await expect(link).toHaveStyle(
//         `text-decoration: underline ${Color.blue} dashed 2px`,
//     );

//     await fireEvent.mouseDown(link);
//     await expect(link).toHaveStyle(
//         `text-decoration: underline solid ${activeBlue} 1px`,
//     );
// };

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

// TODO(WB-): uncomment this test after updating styles
// Secondary.play = async ({canvasElement}) => {
//     const canvas = within(canvasElement);

//     const link = canvas.getByRole("link");

//     await expect(link).toHaveStyle(`color: ${Color.offBlack64}`);

//     await userEvent.hover(link);
//     await expect(link).toHaveStyle(
//         `text-decoration: underline ${Color.offBlack64} dashed 2px`,
//     );

//     await fireEvent.mouseDown(link);
//     await expect(link).toHaveStyle(
//         `text-decoration: underline solid ${Color.offBlack} 1px`,
//     );
// };

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

// TODO(WB-): uncomment this test after updating styles
// LightPrimary.play = async ({canvasElement}) => {
//     const canvas = within(canvasElement);

//     const link = canvas.getByRole("link");

//     await userEvent.hover(link);
//     await expect(link).toHaveStyle(
//         `text-decoration: underline ${Color.white} dashed 2px`,
//     );

//     await fireEvent.mouseDown(link);
//     await expect(link).toHaveStyle(
//         `text-decoration: underline solid ${fadedBlue} 1px`,
//     );
// };

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
        </Link>
        , whereas this is an inline{" "}
        <Link href="#" kind="secondary" inline={true}>
            Secondary link
        </Link>
        , and this is an inline{" "}
        <Link href="#" visitable={true} inline={true}>
            Visitable link (Primary only)
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

// TODO(WB-): uncomment this test after updating styles
// Inline.play = async ({canvasElement}) => {
//     const canvas = within(canvasElement);

//     const primaryLink = canvas.getByText("Primary link");
//     const secondaryLink = canvas.getByText("Secondary link");

//     // Primary link styles
//     await expect(primaryLink).toHaveStyle(`color: ${Color.blue}`);

//     await userEvent.hover(primaryLink);
//     await expect(primaryLink).toHaveStyle(
//         `text-decoration: underline ${Color.blue} dashed 2px`,
//     );

//     await fireEvent.mouseDown(primaryLink);
//     await expect(primaryLink).toHaveStyle(
//         `text-decoration: underline solid ${activeBlue} 1px`,
//     );

//     // Secondary link styles
//     await expect(secondaryLink).toHaveStyle(`color: ${Color.offBlack}`);

//     await userEvent.hover(secondaryLink);
//     await expect(secondaryLink).toHaveStyle(
//         `text-decoration: underline ${Color.offBlack} dashed 2px`,
//     );

//     await fireEvent.mouseDown(secondaryLink);
//     await expect(secondaryLink).toHaveStyle(
//         `text-decoration: underline solid ${activeBlue} 1px`,
//     );
// };

export const InlineLight: StoryComponentType = () => (
    <Body style={{color: Color.white}}>
        This is an inline{" "}
        <Link href="#" inline={true} light={true}>
            Primary link
        </Link>
        , whereas this is an inline{" "}
        <Link href="#" visitable={true} inline={true} light={true}>
            Visitable link (Primary only)
        </Link>
        . Secondary light links are not supported.
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

// TODO(WB-): uncomment this test after updating styles
// InlineLight.play = async ({canvasElement}) => {
//     const canvas = within(canvasElement);

//     const primaryLink = canvas.getByText("Primary link");

//     await expect(primaryLink).toHaveStyle(`color: ${Color.white}`);

//     await userEvent.hover(primaryLink);
//     await expect(primaryLink).toHaveStyle(
//         `text-decoration: underline ${Color.white} dashed 2px`,
//     );

//     await fireEvent.mouseDown(primaryLink);
//     await expect(primaryLink).toHaveStyle(
//         `text-decoration: underline solid ${fadedBlue} 1px`,
//     );
// };

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
                    <Link href="#secondary-nonexistent-link" kind="secondary">
                        Standalone Secondary Link
                    </Link>
                </View>
                <View style={styles.standaloneLinkWrapper}>
                    <Link href="#" visitable={true}>
                        Standalone Visitable Link (Primary only)
                    </Link>
                </View>
            </View>
            <Strut size={Spacing.xSmall_8} />
            {/* Inline */}
            <Body>
                This is an{" "}
                <Link href="#" inline={true}>
                    Inline Primary link
                </Link>
                , whereas this is an{" "}
                <Link href="#" kind="secondary" inline={true}>
                    Inline Secondary link
                </Link>
                , and this is an{" "}
                <Link href="#" visitable={true} inline={true}>
                    Inline Visitable link (Primary only)
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
                    <Link href="#" visitable={true} light={true}>
                        Standalone Light Visitable Link (Primary only)
                    </Link>
                </View>
            </View>
            <Strut size={Spacing.xSmall_8} />
            {/* Inline */}
            <Body style={{color: Color.white}}>
                This is an{" "}
                <Link href="#" inline={true} light={true}>
                    Inline Primary link
                </Link>
                , whereas this is an{" "}
                <Link href="#" visitable={true} inline={true} light={true}>
                    Inline Visitable link (Primary only)
                </Link>
                . Secondary light links are not supported.
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

    // Confirm that the default font size (16px) and line height (22px)
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
