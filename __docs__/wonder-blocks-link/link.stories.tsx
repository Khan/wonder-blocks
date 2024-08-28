/* eslint-disable max-lines */
// We need to use fireEvent for mouseDown in these tests, none of the userEvent
// alternatives work. Click includes mouseUp, which removes the pressed style.
/* eslint-disable testing-library/prefer-user-event */
import * as React from "react";
import {expect, within, userEvent, fireEvent} from "@storybook/test";
import {StyleSheet} from "aphrodite";
import {MemoryRouter, Route, Switch} from "react-router-dom";
import type {Meta, StoryObj} from "@storybook/react";

import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {
    Body,
    HeadingSmall,
    LabelLarge,
} from "@khanacademy/wonder-blocks-typography";
import Link from "@khanacademy/wonder-blocks-link";
import packageConfig from "../../packages/wonder-blocks-link/package.json";

import ComponentInfo from "../../.storybook/components/component-info";
import LinkArgTypes from "./link.argtypes";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

export default {
    title: "Packages / Link",
    component: Link,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    argTypes: LinkArgTypes,
} as Meta<typeof Link>;

const activeBlue = "#1b50b3";
const fadedBlue = "#b5cefb";

type StoryComponentType = StoryObj<typeof Link>;

export const Default: StoryComponentType = {
    args: {
        href: "/",
        children: "Hello, world!",
    },
};

export const Primary: StoryComponentType = () => (
    <Link href="#">The quick brown fox jumps over the lazy dog.</Link>
);

Primary.parameters = {
    docs: {
        description: {
            story: `Minimal link usage.
            This links to the top of the page.`,
        },
    },
};

Primary.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole("link");

    // Resting style
    await expect(link).toHaveStyle(`color: ${color.blue}`);

    // Hover style
    await userEvent.hover(link);
    // TODO(WB-1521): Expect the dashed 2px style.
    // await expect(link).toHaveStyle(
    //     `text-decoration: underline ${Color.blue} dashed 2px`,
    // );
    await expect(link).toHaveStyle(
        `text-decoration: underline ${color.blue} solid`,
    );

    // Focus style with keyboard navigation
    await userEvent.tab();
    const computedStyle = getComputedStyle(link, ":focus-visible");
    // rgb(24, 101, 242) is the same as Color.blue. `toBe` doesn't seem to
    // compare different color formats, so hex was converted to RGB.
    await expect(computedStyle.outline).toBe("rgb(24, 101, 242) solid 1px");

    // Mousedown style
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
        description: {
            story: `Minimal secondary link usage. A secondary link
            has lighter text. This links to the top of the page.`,
        },
    },
};

Secondary.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole("link");

    // Resting style
    await expect(link).toHaveStyle(`color: ${color.offBlack64}`);

    // Hover style
    await userEvent.hover(link);
    // TODO(WB-1521): Expect the dashed 2px style.
    // await expect(link).toHaveStyle(
    //     `text-decoration: underline ${Color.offBlack64} dashed 2px`,
    // );
    await expect(link).toHaveStyle(
        `text-decoration: underline ${color.offBlack64} solid`,
    );

    // Focus style with keyboard navigation
    await userEvent.tab();
    const computedStyle = getComputedStyle(link, ":focus-visible");
    // rgb(24, 101, 242) is the same as Color.blue. `toBe` doesn't seem to
    // compare different color formats, so hex was converted to RGB.
    await expect(computedStyle.outline).toBe("rgb(24, 101, 242) solid 1px");

    // Mousedown style
    await fireEvent.mouseDown(link);
    await expect(link).toHaveStyle(
        `text-decoration: underline solid ${color.offBlack}`,
    );
};

export const Visitable: StoryComponentType = () => (
    <Link href="#" visitable={true}>
        The quick brown fox jumps over the lazy dog.
    </Link>
);

Visitable.parameters = {
    docs: {
        description: {
            story: `This is a visitable link. It changes color after
            it has been clicked on to indicate that it's been visited before.
            This link's \`visitable\` prop is set to true.
            It links to the top of the page.`,
        },
    },
};

export const LightPrimary: StoryComponentType = () => (
    <Link href="#" light={true}>
        The quick brown fox jumps over the lazy dog.
    </Link>
);

LightPrimary.parameters = {
    docs: {
        description: {
            story: `Minimal link usage on a dark background. This
            link has its \`light\` prop set to true. It links to the top
            of the page.`,
        },
    },
    backgrounds: {
        default: "darkBlue",
    },
};

LightPrimary.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole("link");

    // Resting style
    await expect(link).toHaveStyle(`color: ${color.white}`);

    // Hover style
    await userEvent.hover(link);
    // TODO(WB-1521): Expect the dashed 2px style.
    // await expect(link).toHaveStyle(
    //     `text-decoration: underline ${Color.white} dashed 2px`,
    // );
    await expect(link).toHaveStyle(
        `text-decoration: underline ${color.white} solid`,
    );

    // Focus style with keyboard navigation
    await userEvent.tab();
    const computedStyle = getComputedStyle(link, ":focus-visible");
    // rgb(255, 255, 255) is the same as Color.white. `toBe` doesn't seem to
    // compare different color formats, so hex was converted to RGB.
    await expect(computedStyle.outline).toBe("rgb(255, 255, 255) solid 1px");

    // Mousedown style
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
        description: {
            story: `This is a visitable link on a dark background.
            It changes color after it has been clicked on to indicate
            that it's been visited before. This link's \`visitable\` prop
            is set to true. It links to the top of the page.`,
        },
    },
};

export const OpensInANewTab: StoryComponentType = () => (
    <View>
        <Link href="https://cat-bounce.com/" target="_blank">
            This is a Primary link that opens in a new tab
        </Link>
        <Link href="https://cat-bounce.com/" kind="secondary" target="_blank">
            This is a Secondary link that opens in a new tab
        </Link>
    </View>
);

OpensInANewTab.parameters = {
    docs: {
        description: {
            summary: `When a link is external and \`target="_blank"\`, the
        external icon is automatically added to the end of the link. This
        indicates that the link will open in a new tab.`,
        },
    },
};

export const StartAndEndIcons: StoryComponentType = () => (
    <View>
        {/* Default (dark) */}
        <View style={{padding: spacing.large_24}}>
            <Link
                href="#"
                startIcon={<PhosphorIcon icon={IconMappings.plusCircleBold} />}
                style={styles.standaloneLinkWrapper}
            >
                This link has a start icon
            </Link>
            <Link
                href="#"
                endIcon={
                    <PhosphorIcon icon={IconMappings.magnifyingGlassBold} />
                }
                kind="secondary"
                style={styles.standaloneLinkWrapper}
            >
                This link has an end icon
            </Link>
            <Link
                href="https://stuffonmycat.com/"
                endIcon={<PhosphorIcon icon={IconMappings.infoBold} />}
                target="_blank"
                style={styles.standaloneLinkWrapper}
            >
                This external link has an end icon that is overrides the default
                external icon
            </Link>
            <Link
                href="#"
                startIcon={<PhosphorIcon icon={IconMappings.caretLeftBold} />}
                endIcon={<PhosphorIcon icon={IconMappings.caretRightBold} />}
                kind="secondary"
                style={styles.standaloneLinkWrapper}
            >
                This link has a start icon and an end icon
            </Link>
            <Link
                href="#"
                startIcon={<PhosphorIcon icon={IconMappings.caretLeftBold} />}
                endIcon={<PhosphorIcon icon={IconMappings.caretRightBold} />}
                style={styles.multiLine}
            >
                This is a multi-line link with start and end icons
            </Link>
            <Body>
                This is an inline{" "}
                <Link
                    href="#"
                    inline={true}
                    startIcon={
                        <PhosphorIcon icon={IconMappings.caretLeftBold} />
                    }
                >
                    link with a start icon
                </Link>{" "}
                and an inline{" "}
                <Link
                    href="#"
                    inline={true}
                    target="_blank"
                    endIcon={
                        <PhosphorIcon icon={IconMappings.caretRightBold} />
                    }
                >
                    link with an end icon
                </Link>
                .
            </Body>
        </View>
        {/* Light */}
        <View
            style={{
                backgroundColor: color.darkBlue,
                padding: spacing.large_24,
            }}
        >
            <Link
                href="#"
                startIcon={<PhosphorIcon icon={IconMappings.plusCircleBold} />}
                light={true}
                style={styles.standaloneLinkWrapper}
            >
                This link has a start icon
            </Link>
            <Link
                href="#"
                endIcon={
                    <PhosphorIcon icon={IconMappings.magnifyingGlassBold} />
                }
                light={true}
                style={styles.standaloneLinkWrapper}
            >
                This link has an end icon
            </Link>
            <Link
                href="https://stuffonmycat.com/"
                endIcon={<PhosphorIcon icon={IconMappings.infoBold} />}
                target="_blank"
                light={true}
                style={styles.standaloneLinkWrapper}
            >
                This external link has an end icon that is overrides the default
                external icon
            </Link>
            <Link
                href="#"
                startIcon={<PhosphorIcon icon={IconMappings.caretLeftBold} />}
                endIcon={<PhosphorIcon icon={IconMappings.caretRightBold} />}
                light={true}
                style={styles.standaloneLinkWrapper}
            >
                This link has a start icon and an end icon
            </Link>
            <Link
                href="#"
                startIcon={<PhosphorIcon icon={IconMappings.caretLeftBold} />}
                endIcon={<PhosphorIcon icon={IconMappings.caretRightBold} />}
                light={true}
                style={styles.multiLine}
            >
                This is a multi-line link with start and end icons
            </Link>
            <Body style={{color: color.white}}>
                This is an inline{" "}
                <Link
                    href="#"
                    startIcon={
                        <PhosphorIcon icon={IconMappings.caretLeftBold} />
                    }
                    inline={true}
                    light={true}
                >
                    link with a start icon
                </Link>{" "}
                and an inline{" "}
                <Link
                    href="#"
                    endIcon={
                        <PhosphorIcon icon={IconMappings.caretRightBold} />
                    }
                    inline={true}
                    light={true}
                    target="_blank"
                >
                    link with an end icon
                </Link>
                .
            </Body>
        </View>
    </View>
);

StartAndEndIcons.parameters = {
    docs: {
        description: {
            summary: `Link can take an optional \`startIcon\` and/or \`endIcon\`. If
        \`target="_blank"\` and an \`endIcon\` prop is passed in, then \`endIcon\` will
        override the default \`externalIcon\`.`,
        },
    },
};

export const Inline: StoryComponentType = () => (
    <Body>
        This is an inline{" "}
        <Link href="#" inline={true}>
            Primary link
        </Link>{" "}
        and an inline{" "}
        <Link
            href="https://www.procatinator.com/"
            inline={true}
            target="_blank"
        >
            external Primary link
        </Link>
        , whereas this is an inline{" "}
        <Link href="#" kind="secondary" inline={true}>
            Secondary link
        </Link>
        , and an inline{" "}
        <Link
            href="https://www.procatinator.com/"
            kind="secondary"
            inline={true}
            target="_blank"
        >
            external Secondary link
        </Link>
        , and this is an inline{" "}
        <Link href="#" visitable={true} inline={true}>
            Visitable link (Primary only)
        </Link>{" "}
        and an inline{" "}
        <Link
            href="https://www.procatinator.com/"
            visitable={true}
            inline={true}
            target="_blank"
        >
            external Visitable link (Primary only)
        </Link>
        .
    </Body>
);

Inline.parameters = {
    docs: {
        description: {
            story: `Inline links include an underline to distinguish
            them from the surrounding text. Make a link inline by setting the
            \`inline\` prop to \`true\`. It is recommended to use inline
            links within paragraphs and sentences.`,
        },
    },
};

Inline.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);

    const primaryLink = canvas.getByRole("link", {name: "Primary link"});
    const secondaryLink = canvas.getByRole("link", {name: "Secondary link"});

    // Resting style
    await expect(primaryLink).toHaveStyle(`color: ${color.blue}`);

    // Hover style
    await userEvent.hover(primaryLink);
    // TODO(WB-1521): Expect the dashed 2px style.
    // await expect(primaryLink).toHaveStyle(
    //     `text-decoration: underline ${Color.blue} dashed 2px`,
    // );
    await expect(primaryLink).toHaveStyle(
        `text-decoration: underline ${color.blue} solid`,
    );

    // Focus style with keyboard navigation
    await userEvent.tab();
    const primaryComputedStyle = getComputedStyle(
        primaryLink,
        ":focus-visible",
    );
    // rgb(24, 101, 242) is the same as Color.blue. `toBe` doesn't seem to
    // compare different color formats, so hex was converted to RGB.
    await expect(primaryComputedStyle.outline).toBe(
        "rgb(24, 101, 242) solid 1px",
    );

    // Mousedown style
    await fireEvent.mouseDown(primaryLink);
    await expect(primaryLink).toHaveStyle(
        `text-decoration: underline solid ${activeBlue}`,
    );

    /* *** Secondary link styles***  */

    // Resting style
    await expect(secondaryLink).toHaveStyle(`color: ${color.offBlack}`);

    // Hover style
    await userEvent.hover(secondaryLink);
    // TODO(WB-1521): Expect the dashed 2px style.
    // await expect(secondaryLink).toHaveStyle(
    //     `text-decoration: underline ${Color.offBlack} dashed 2px`,
    // );
    await expect(secondaryLink).toHaveStyle(
        `text-decoration: underline ${color.offBlack} solid`,
    );

    // Focus style with keyboard navigation
    await userEvent.tab();
    await userEvent.tab();
    const secondaryComputedStyle = getComputedStyle(
        secondaryLink,
        ":focus-visible",
    );
    // rgb(24, 101, 242) is the same as Color.blue. `toBe` doesn't seem to
    // compare different color formats, so hex was converted to RGB.
    await expect(secondaryComputedStyle.outline).toBe(
        "rgb(24, 101, 242) solid 1px",
    );

    // Mousedown style
    await fireEvent.mouseDown(secondaryLink);
    await expect(secondaryLink).toHaveStyle(
        `text-decoration: underline solid ${activeBlue}`,
    );
};

export const InlineLight: StoryComponentType = () => (
    <Body style={{color: color.white}}>
        This is an inline{" "}
        <Link href="#" inline={true} light={true}>
            Primary link
        </Link>{" "}
        and an{" "}
        <Link
            href="https://cat-bounce.com/"
            inline={true}
            light={true}
            target="_blank"
        >
            external Primary link
        </Link>
        , whereas this is an inline{" "}
        <Link href="#" visitable={true} inline={true} light={true}>
            Visitable link (Primary only)
        </Link>{" "}
        and an{" "}
        <Link
            href="https://cat-bounce.com/"
            visitable={true}
            inline={true}
            light={true}
            target="_blank"
        >
            external Visitable link (Primary only)
        </Link>
        . Secondary light links are not supported.
    </Body>
);

InlineLight.parameters = {
    backgrounds: {
        default: "darkBlue",
    },
    docs: {
        description: {
            story: `Inline links include an underline to distinguish
            them from the surrounding text. If the link is on a
            dark background, set the \`light\` prop to true for it to
            be appropriately visible.\n\n**NOTE:** Secondary light links are
            not supported.`,
        },
    },
};

InlineLight.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);

    const primaryLink = canvas.getByRole("link", {name: "Primary link"});

    // Resting style
    await expect(primaryLink).toHaveStyle(`color: ${color.white}`);

    // Hover style
    await userEvent.hover(primaryLink);
    // TODO(WB-1521): Expect the dashed 2px style.
    // await expect(primaryLink).toHaveStyle(
    //     `text-decoration: underline ${Color.white} dashed 2px`,
    // );
    await expect(primaryLink).toHaveStyle(
        `text-decoration: underline ${color.white} solid`,
    );

    // Focus style with keyboard navigation
    await userEvent.tab();
    const computedStyle = getComputedStyle(primaryLink, ":focus-visible");
    // rgb(255, 255, 255) is the same as Color.white. `toBe` doesn't seem to
    // compare different color formats, so hex was converted to RGB.
    await expect(computedStyle.outline).toBe("rgb(255, 255, 255) solid 1px");

    // Mousedown style
    await fireEvent.mouseDown(primaryLink);
    await expect(primaryLink).toHaveStyle(
        `text-decoration: underline solid ${fadedBlue}`,
    );
};

export const Variants: StoryComponentType = () => (
    <View>
        {/* Default (dark) */}
        <View style={{padding: spacing.large_24}}>
            {/* Standalone */}
            <View>
                <View style={styles.standaloneLinkWrapper}>
                    <Link href="#nonexistent-link">
                        Standalone Primary Link
                    </Link>
                </View>
                <View style={styles.standaloneLinkWrapper}>
                    <Link href="https://cat-bounce.com/" target="_blank">
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
                        href="https://cat-bounce.com/"
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
                    <Link
                        href="https://cat-bounce.com/"
                        visitable={true}
                        target="_blank"
                    >
                        Standalone External Visitable Link (Primary only)
                    </Link>
                </View>
            </View>
            <Strut size={spacing.xSmall_8} />
            {/* Inline */}
            <Body>
                This is an{" "}
                <Link href="#" inline={true}>
                    Inline Primary link
                </Link>{" "}
                and an{" "}
                <Link
                    href="https://cat-bounce.com/"
                    inline={true}
                    target="_blank"
                >
                    Inline External Primary link
                </Link>
                , whereas this is an{" "}
                <Link href="#" kind="secondary" inline={true}>
                    Inline Secondary link
                </Link>{" "}
                and an{" "}
                <Link
                    href="https://cat-bounce.com/"
                    kind="secondary"
                    inline={true}
                    target="_blank"
                >
                    Inline External Secondary link
                </Link>
                , and this is an{" "}
                <Link href="#" visitable={true} inline={true}>
                    Inline Visitable link (Primary only)
                </Link>{" "}
                and an{" "}
                <Link
                    href="https://cat-bounce.com/"
                    visitable={true}
                    inline={true}
                    target="_blank"
                >
                    Inline External Visitable link (Primary only)
                </Link>
                .
            </Body>
        </View>
        {/* Light */}
        <View
            style={{
                backgroundColor: color.darkBlue,
                padding: spacing.large_24,
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
                    <Link
                        href="https://cat-bounce.com/"
                        light={true}
                        target="_blank"
                    >
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
                        href="https://cat-bounce.com/"
                        visitable={true}
                        light={true}
                        target="_blank"
                    >
                        Standalone External Light Visitable Link (Primary only)
                    </Link>
                </View>
            </View>
            <Strut size={spacing.xSmall_8} />
            {/* Inline */}
            <Body style={{color: color.white}}>
                This is an{" "}
                <Link href="#" inline={true} light={true}>
                    Inline Primary link
                </Link>{" "}
                and an{" "}
                <Link
                    href="https://cat-bounce.com/"
                    inline={true}
                    light={true}
                    target="_blank"
                >
                    Inline External Primary link
                </Link>
                , whereas this is an{" "}
                <Link href="#" visitable={true} inline={true} light={true}>
                    Inline Visitable link (Primary only)
                </Link>{" "}
                and an{" "}
                <Link
                    href="https://cat-bounce.com/"
                    visitable={true}
                    inline={true}
                    light={true}
                    target="_blank"
                >
                    Inline External Visitable link (Primary only)
                </Link>
                . Secondary light links are not supported.
            </Body>
        </View>
    </View>
);

Variants.parameters = {
    docs: {
        description: {
            story: `By default, primary links are blue, secondary
            links are gray, and visitable links turn purple after they've
            been clicked on. Default inline links are underlined, and the
            secondary kind is black to match surrounding text color.
            Light standalone and inline links have the same colors - white
            with visited visitable links being pink. Light inline links are
            also underlined like default inline links. Light secondary links
            are not supported and will result in an error.`,
        },
    },
};

export const WithTypography: StoryComponentType = () => (
    <HeadingSmall>
        <Link href="#nonexistent-link" id="typography-link">
            Link inside a Heading element
        </Link>
    </HeadingSmall>
);

WithTypography.parameters = {
    docs: {
        description: {
            story: `Wonder Blocks Typography elements can be used
        with Links instead of plain text. We recommend that \`Typography\` is
        always the parent element of \`Link\` to avoid styling issues. Here, we
        have a \`HeadingSmall\` containing a \`Link\`.`,
        },
    },
};

WithTypography.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);

    const heading = canvas.getByText("Link inside a Heading element");

    // Confirm that the default font size and line height
    // are successfully overridden by typography.
    await expect(heading).toHaveStyle("font-size: 20px");
    await expect(heading).toHaveStyle("lineHeight: 24px");
};

export const WithStyle: StoryComponentType = () => (
    <Link href="#" style={styles.customLink}>
        This link has a style.
    </Link>
);

WithStyle.parameters = {
    docs: {
        storyDescription: `Link can take a \`style\` prop. Here, the
            Link has been given a style in which the \`color\` field has
            been set to \`color.red\`.`,
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
        description: {
            story: `If you want to navigate to an external URL
            and/or reload the window, make sure to use \`href\` and
            \`skipClientNav={true}\`, as shown in this example.
            **For navigation callbacks:** The \`onClick\`, \`beforeNav\`, and
            \`safeWithNav\` props can be used to run callbacks when navigating
            to the new URL. Which prop to use depends on the use case. See the
            [Button documentation](/story/button-navigation-callbacks--before-nav-callbacks&viewMode=docs)
            for details.`,
        },
    },
};

export const WithTitle: StoryComponentType = () => (
    <Body>
        <Link href="#" title="I am a title 😎">
            This link has a title.
        </Link>
    </Body>
);

WithTitle.parameters = {
    docs: {
        description: {
            story: `Link can take a title prop. Give a link a title by
        setting the \`title\` prop to a string. Hover over the link to see its title.`,
        },
    },
};

WithTitle.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole("link");

    // Confirm that the link has a title attribute
    await expect(link).toHaveAttribute("title");
};

export const RightToLeftWithIcons: StoryComponentType = () => (
    <View style={{padding: spacing.medium_16}}>
        <View style={styles.rightToLeft}>
            <Link
                href="/"
                startIcon={<PhosphorIcon icon={IconMappings.caretRightBold} />}
            >
                هذا الرابط مكتوب باللغة العربية
            </Link>
            <Strut size={spacing.medium_16} />
            <Link
                href="/"
                endIcon={<PhosphorIcon icon={IconMappings.caretLeftBold} />}
            >
                هذا الرابط مكتوب باللغة العربية
            </Link>
            <Strut size={spacing.medium_16} />
            <Link
                href="/"
                startIcon={<PhosphorIcon icon={IconMappings.caretRightBold} />}
                endIcon={<PhosphorIcon icon={IconMappings.caretLeftBold} />}
            >
                هذا الرابط مكتوب باللغة العربية
            </Link>
        </View>
    </View>
);

RightToLeftWithIcons.parameters = {
    docs: {
        description: {
            story: `When in the right-to-left direction, the \`startIcon\`
        and \`endIcon\` are flipped. This example has text in Arabic, a
        right-to-left language.`,
        },
    },
};

const styles = StyleSheet.create({
    darkBackground: {
        backgroundColor: color.darkBlue,
        color: color.white,
        padding: 10,
    },
    heading: {
        marginRight: spacing.large_24,
    },
    navigation: {
        border: `1px dashed ${color.purple}`,
        marginTop: spacing.large_24,
        padding: spacing.large_24,
    },
    customLink: {
        color: color.red,
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
        marginBottom: spacing.xSmall_8,
    },
    rightToLeft: {
        width: "100%",
        direction: "rtl",
    },
    multiLine: {
        display: "inline-block",
        marginBottom: spacing.xSmall_8,
        maxWidth: "15%",
    },
});
