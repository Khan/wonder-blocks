import * as React from "react";
import {StyleSheet} from "aphrodite";
import {MemoryRouter} from "react-router-dom";
import {CompatRouter, Route, Routes} from "react-router-dom-v5-compat";
import type {Meta, StoryObj} from "@storybook/react";

import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {
    Body,
    HeadingSmall,
    LabelLarge,
} from "@khanacademy/wonder-blocks-typography";
import Link from "@khanacademy/wonder-blocks-link";
import packageConfig from "../../packages/wonder-blocks-link/package.json";

import ComponentInfo from "../components/component-info";
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
        chromatic: {
            // These stories are being tested in link-variants.stories.tsx
            disableSnapshot: true,
        },
    },
    argTypes: LinkArgTypes,
} as Meta<typeof Link>;

type StoryComponentType = StoryObj<typeof Link>;

/**
 * By default the link uses a color that communicates the presence and meaning
 * of interaction.
 */
export const Default: StoryComponentType = {
    args: {
        href: "/",
        children: "The quick brown fox jumps over the lazy dog.",
    },
};

/**
 * Minimal link usage on a dark background. This link has its `light` prop set
 * to true. It links to the top of the page.
 */
export const LightPrimary: StoryComponentType = {
    render: () => (
        <Link href="#link" light={true}>
            The quick brown fox jumps over the lazy dog.
        </Link>
    ),
    parameters: {
        backgrounds: {
            default: "darkBlue",
        },
    },
};

/**
 * When a link is external and target="_blank", the external icon is
 * automatically added to the end of the link. This indicates that the link will
 * open in a new tab.
 */
export const OpensInANewTab: StoryComponentType = {
    render: () => (
        <View>
            <Link href="https://cat-bounce.com/" target="_blank">
                This is a link that opens in a new tab
            </Link>
        </View>
    ),
};

/**
 * Link can take an optional `startIcon` and/or `endIcon`. If `target="_blank"`
 * and an `endIcon` prop is passed in, then `endIcon` will override the default
 * `externalIcon`.
 */
export const StartAndEndIcons: StoryComponentType = {
    render: () => (
        <View>
            {/* Default (dark) */}
            <View style={{padding: spacing.large_24}}>
                <Link
                    href="#link"
                    startIcon={
                        <PhosphorIcon icon={IconMappings.plusCircleBold} />
                    }
                    style={styles.standaloneLinkWrapper}
                >
                    This link has a start icon
                </Link>
                <Link
                    href="#link"
                    endIcon={
                        <PhosphorIcon icon={IconMappings.magnifyingGlassBold} />
                    }
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
                    This external link has an end icon that is overrides the
                    default external icon
                </Link>
                <Link
                    href="#link"
                    startIcon={
                        <PhosphorIcon icon={IconMappings.caretLeftBold} />
                    }
                    endIcon={
                        <PhosphorIcon icon={IconMappings.caretRightBold} />
                    }
                    style={styles.standaloneLinkWrapper}
                >
                    This link has a start icon and an end icon
                </Link>
                <Link
                    href="#link"
                    startIcon={
                        <PhosphorIcon icon={IconMappings.caretLeftBold} />
                    }
                    endIcon={
                        <PhosphorIcon icon={IconMappings.caretRightBold} />
                    }
                    style={styles.multiLine}
                >
                    This is a multi-line link with start and end icons
                </Link>
                <Body>
                    This is an inline{" "}
                    <Link
                        href="#link"
                        inline={true}
                        startIcon={
                            <PhosphorIcon icon={IconMappings.caretLeftBold} />
                        }
                    >
                        link with a start icon
                    </Link>{" "}
                    and an inline{" "}
                    <Link
                        href="#link"
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
                    backgroundColor: semanticColor.surface.inverse,
                    padding: spacing.large_24,
                }}
            >
                <Link
                    href="#link"
                    startIcon={
                        <PhosphorIcon icon={IconMappings.plusCircleBold} />
                    }
                    light={true}
                    style={styles.standaloneLinkWrapper}
                >
                    This link has a start icon
                </Link>
                <Link
                    href="#link"
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
                    This external link has an end icon that is overrides the
                    default external icon
                </Link>
                <Link
                    href="#link"
                    startIcon={
                        <PhosphorIcon icon={IconMappings.caretLeftBold} />
                    }
                    endIcon={
                        <PhosphorIcon icon={IconMappings.caretRightBold} />
                    }
                    light={true}
                    style={styles.standaloneLinkWrapper}
                >
                    This link has a start icon and an end icon
                </Link>
                <Link
                    href="#link"
                    startIcon={
                        <PhosphorIcon icon={IconMappings.caretLeftBold} />
                    }
                    endIcon={
                        <PhosphorIcon icon={IconMappings.caretRightBold} />
                    }
                    light={true}
                    style={styles.multiLine}
                >
                    This is a multi-line link with start and end icons
                </Link>
                <Body style={{color: semanticColor.text.inverse}}>
                    This is an inline{" "}
                    <Link
                        href="#link"
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
                        href="#link"
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
    ),
};

/**
 * Inline links include an underline to distinguish them from the surrounding
 * text. Make a link inline by setting the `inline` prop to `true`. It is
 * recommended to use inline links within paragraphs and sentences.
 */
export const Inline: StoryComponentType = {
    render: () => (
        <Body style={{width: 530}}>
            This is an inline{" "}
            <Link href="#link" inline={true}>
                regular link
            </Link>
            . In this sentence, there is also an inline{" "}
            <Link
                href="https://www.procatinator.com/"
                inline={true}
                target="_blank"
            >
                external link
            </Link>
            .
        </Body>
    ),
    parameters: {
        chromatic: {
            // Re-enable snapshots for this story since it shows the links in
            // the context of paragraphs.
            disableSnapshot: false,
        },
        pseudo: {visited: true},
    },
};

/**
 * Inline links include an underline to distinguish them from the surrounding
 * text. If the link is on a dark background, set the `light` prop to true for
 * it to be appropriately visible.
 *
 * **NOTE:** Secondary light links are not supported.
 */
export const InlineLight: StoryComponentType = {
    render: () => (
        <Body style={{color: semanticColor.text.inverse, width: 530}}>
            This is an inline{" "}
            <Link href="#link" inline={true} light={true}>
                regular link
            </Link>
            . In this sentence, there is also an inline{" "}
            <Link
                href="https://cat-bounce.com/"
                inline={true}
                light={true}
                target="_blank"
            >
                external link
            </Link>
            .
        </Body>
    ),
    parameters: {
        backgrounds: {
            default: "darkBlue",
        },
        chromatic: {
            // Re-enable snapshots for this story since it shows the links in
            // the context of paragraphs.
            disableSnapshot: false,
        },
        pseudo: {visited: true},
    },
};

/**
 * Wonder Blocks Typography elements can be used with Links instead of plain
 * text. We recommend that `Typography` is always the parent element of `Link`
 * to avoid styling issues. Here, we have a `HeadingSmall` containing a `Link`
 */
export const WithTypography: StoryComponentType = {
    render: () => (
        <HeadingSmall>
            <Link href="#nonexistent-link" id="typography-link">
                Link inside a Heading element
            </Link>
        </HeadingSmall>
    ),
    parameters: {
        chromatic: {
            // Re-enable snapshots for this story since it's verifying that
            // the styles on typography elements are applied
            disableSnapshot: false,
        },
    },
};

/**
 * Link can take a `style` prop. Here, the Link has been given a style in which
 * the `color` field has been set to `semanticColor.status.critical.foreground`.
 */
export const WithStyle: StoryComponentType = {
    render: () => (
        <Link href="#link" style={styles.customLink}>
            This link has a style.
        </Link>
    ),
    parameters: {
        chromatic: {
            // Re-enable snapshots for this story since it's verifying that
            // custom styles are applied (one-off)
            disableSnapshot: false,
        },
    },
};

/**
 * If you want to navigate to an external URL and/or reload the window, make
 * sure to use `href` and `skipClientNav={true}`, as shown in this example.
 * **For navigation callbacks:** The `onClick`, `beforeNav`, and `safeWithNav`
 * props can be used to run callbacks when navigating to the new URL. Which prop
 * to use depends on the use case. See the [Button
 * documentation](/story/button-navigation-callbacks--before-nav-callbacks&viewMode=docs)
 * for details.
 */
export const Navigation: StoryComponentType = {
    render: () => (
        <MemoryRouter>
            <CompatRouter>
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
                        <Routes>
                            <Route
                                path="/foo"
                                element={
                                    <View id="foo">
                                        The first link does client-side
                                        navigation here.
                                    </View>
                                }
                            />
                            <Route
                                path="*"
                                element={
                                    <View>See navigation changes here</View>
                                }
                            />
                        </Routes>
                    </View>
                </View>
            </CompatRouter>
        </MemoryRouter>
    ),
};

/**
 * Link can take a title prop. Give a link a title by setting the `title` prop
 * to a string. Hover over the link to see its title.
 */
export const WithTitle: StoryComponentType = {
    render: () => (
        <Body>
            <Link href="#link" title="I am a title 😎">
                This link has a title.
            </Link>
        </Body>
    ),
};

/**
 * When in the right-to-left direction, the `startIcon` and `endIcon` are
 * flipped. This example has text in Arabic, a right-to-left language.
 */
export const RightToLeftWithIcons: StoryComponentType = {
    render: () => (
        <View style={{padding: spacing.medium_16}}>
            <View style={styles.rightToLeft}>
                <Link
                    href="/"
                    startIcon={
                        <PhosphorIcon icon={IconMappings.caretRightBold} />
                    }
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
                    startIcon={
                        <PhosphorIcon icon={IconMappings.caretRightBold} />
                    }
                    endIcon={<PhosphorIcon icon={IconMappings.caretLeftBold} />}
                >
                    هذا الرابط مكتوب باللغة العربية
                </Link>
            </View>
        </View>
    ),
    parameters: {
        chromatic: {
            // Re-enable snapshots for this story since it's RTL
            disableSnapshot: false,
        },
    },
};

const styles = StyleSheet.create({
    heading: {
        marginRight: spacing.large_24,
    },
    navigation: {
        border: `1px dashed ${semanticColor.border.primary}`,
        marginTop: spacing.large_24,
        padding: spacing.large_24,
    },
    customLink: {
        color: semanticColor.status.critical.foreground,
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
