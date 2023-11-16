import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import articleIcon from "./icons/article.svg";
import courseIcon from "./icons/course.svg";
import crownIcon from "./icons/crown.svg";
import masteryCourseIcon from "./icons/mastery-course.svg";
import masteryCourseIconBold from "./icons/mastery-course-bold.svg";

import Banner from "@khanacademy/wonder-blocks-banner";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {
    Body,
    HeadingSmall,
    LabelMedium,
} from "@khanacademy/wonder-blocks-typography";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {tokens} from "@khanacademy/wonder-blocks-theming";

import ComponentInfo from "../../.storybook/components/component-info";
import packageConfig from "../../packages/wonder-blocks-icon/package.json";
import PhosphorIconArgtypes, {IconMappings} from "./phosphor-icon.argtypes";

/**
 * A `PhosphorIcon` displays a small informational or decorative image as an
 * HTML element that renders a Phosphor Icon SVG available from the
 * `@phosphor-icons/core` package.
 *
 * For more information about the icons catalog, check the [Phosphor Icons
 * website](https://phosphoricons.com/).
 *
 * ## Usage
 *
 * ```tsx
 * import magnifyingGlassIcon from "@phosphor-icons/core/regular/magnifying-glass.svg";
 * import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
 *
 * <PhosphorIcon
 *     icon={magnifyingGlassIcon}
 *     color={Color.blue}
 *     size="medium"
 *     style={{margin: Spacing.xxxxSmall_2}}
 * />
 * ```
 *
 * These icons should fit into a viewport of `16`, `24`, `48`, and `96` pixels,
 * respectively.
 */
export default {
    title: "Icon / PhosphorIcon",
    component: PhosphorIcon,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    argTypes: PhosphorIconArgtypes,
} satisfies Meta<typeof PhosphorIcon>;

type StoryComponentType = StoryObj<typeof PhosphorIcon>;

function transformCode(code: string, iconName: string, iconPath: string) {
    const iconPropRegex = new RegExp(`"${iconPath}"`, "g");
    return `
import ${iconName} from "${iconPath.replace("/node_modules/", "")}";

${code.replace(iconPropRegex, `{${iconName}}`)}
    `;
}

/**
 * Minimal icon usage. This is a search icon. Icons are size `"small"` by
 * default.
 */
export const Default: StoryComponentType = {
    args: {
        icon: IconMappings.magnifyingGlassBold,
        size: "small",
        "aria-label": "Search",
    },
    parameters: {
        docs: {
            source: {
                // @see https://storybook.js.org/docs/react/api/doc-block-source#transform
                transform: (code: string) =>
                    transformCode(
                        code,
                        "MagnifyingGlassBold",
                        IconMappings.magnifyingGlassBold,
                    ),
            },
        },
    },
};

/**
 * The size of an icon is determined by the `PhosphorIcon`'s `size` prop. The
 * available sizes are `"small"`, `"medium"`, `"large"`, and `"xlarge"`.
 *
 * __IMPORTANT NOTES:__
 * It's up to the consumer to make sure that the icon is legible at the
 * specified size. For example, the `magnifyingGlassRegular` icon is not legible
 * at the `"small"` size.
 * - `small` size icons are recommended for use with `bold` or `fill` weights.
 * - `medium` size icons are recommended for use with `regular` or `fill` weights.
 * - `large` and `xlarge` size icons work well with all weights.
 */
export const Sizes: StoryComponentType = {
    render: () => {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <LabelMedium>small</LabelMedium>
                    <PhosphorIcon
                        icon={IconMappings.magnifyingGlassBold}
                        size="small"
                    />
                </View>
                <View style={styles.row}>
                    <LabelMedium>medium</LabelMedium>
                    <PhosphorIcon
                        icon={IconMappings.magnifyingGlass}
                        size="medium"
                    />
                </View>
                <View style={styles.row}>
                    <LabelMedium>large</LabelMedium>

                    <PhosphorIcon
                        icon={IconMappings.magnifyingGlass}
                        size="large"
                    />
                </View>
                <View style={styles.row}>
                    <LabelMedium>xlarge</LabelMedium>

                    <PhosphorIcon
                        icon={IconMappings.magnifyingGlass}
                        size="xlarge"
                    />
                </View>
            </View>
        );
    },
};

type IconGroup = {
    small: PhosphorBold | null;
    medium: PhosphorRegular | null;
};

const IconEntries = Object.entries(IconMappings);

const groupIconsByNames = () => {
    return IconEntries.reduce((acc, [name, icon]) => {
        const isSmall = name.includes("Bold");
        const key = name.replace("Bold", "");

        if (!acc[key]) {
            if (isSmall) {
                acc[key] = {small: icon as PhosphorBold, medium: null};
            } else {
                acc[key] = {small: null, medium: icon as PhosphorRegular};
            }
        } else {
            if (isSmall) {
                acc[key].small = icon as PhosphorBold;
            } else {
                acc[key].medium = icon as PhosphorRegular;
            }
        }

        return acc;
    }, {} as Record<string, IconGroup>);
};

const StyledTable = addStyle("table");
const StyledTh = addStyle("th");
const StyledTd = addStyle("td");

/**
 * The icons are defined in the Phosphor Icons package. We just import them and
 * pass them to the `PhosphorIcon` component.
 *
 * See https://phosphoricons.com/ for the full list of icons.
 *
 * __NOTE:__ If you want to know how to migrate from the old icon
 * naming system to the new one, check out the [table of
 * equivalences](https://khanacademy.atlassian.net/wiki/spaces/WB/pages/2409201709/Audit+-+Custom+icon+paths+Phosphor#1.-WB-official-icons).
 */
export const Variants: StoryComponentType = {
    render: () => {
        const iconsWithLabels = Object.entries(groupIconsByNames()).map(
            ([name, iconsGroup], index) => {
                if (!iconsGroup) {
                    return null;
                }
                const SmallIcon = iconsGroup.small;
                const MediumIcon = iconsGroup.medium;
                return (
                    <tr key={index}>
                        <StyledTd style={styles.tableCell}>
                            <LabelMedium>{name}</LabelMedium>
                        </StyledTd>
                        <StyledTd style={styles.tableCell}>
                            {SmallIcon && (
                                <PhosphorIcon icon={SmallIcon} size="small" />
                            )}
                        </StyledTd>
                        <StyledTd style={styles.tableCell}>
                            {MediumIcon && (
                                <PhosphorIcon icon={MediumIcon} size="medium" />
                            )}
                        </StyledTd>
                    </tr>
                );
            },
        );

        return (
            <StyledTable style={[styles.table, styles.tableCell]}>
                <thead>
                    <tr>
                        <StyledTh style={styles.tableCell}>Name</StyledTh>
                        <StyledTh style={styles.tableCell}>small</StyledTh>
                        <StyledTh style={styles.tableCell}>medium</StyledTh>
                    </tr>
                </thead>
                <tbody>{iconsWithLabels}</tbody>
            </StyledTable>
        );
    },
    parameters: {
        chromatic: {
            disableSnapshot: true,
        },
    },
    decorators: [
        (Story) => (
            <View style={{gap: tokens.spacing.medium_16}}>
                <Banner
                    layout="floating"
                    text="This is a preview of the icons available in the Phosphor Icons package."
                />
                <Story />
            </View>
        ),
    ],
};

/**
 * The color of an icon can be specified through its `color` prop.
 */
export const WithColor: StoryComponentType = {
    args: {
        size: "small",
        icon: IconMappings.infoBold,
        color: tokens.color.red,
    },
};

/**
 * Icons have `display: inline-block` by default.
 */
export const Inline: StoryComponentType = {
    render: () => {
        return (
            <Body tag="p">
                Here is an icon
                <PhosphorIcon
                    size="small"
                    icon={IconMappings.infoBold}
                    style={{margin: tokens.spacing.xxxxSmall_2}}
                    className="foo"
                />
                when it is inline.
            </Body>
        );
    },
};

/**
 * Icons can be customized by passing in a custom icon.
 *
 * The icon should be an SVG file imported as a static asset. You can take a
 * look at the source file of any of the following icons to see how they are
 * generated.
 *
 * ```tsx
 * // This SVG should have the following attributes:
 * // - viewBox="0 0 256 256"
 * // - fill="currentColor"
 * // - A path (or paths) scaled up to fit in the 256x256 viewport.
 *
 * import crownIcon from "./icons/crown.svg";
 * <PhosphorIcon icon={crownIcon} size="small" />
 * ```
 *
 * __NOTE:__ If you want to know how to create a custom icon, check out the
 * [Exporting icon assets -
 * Web](https://khanacademy.atlassian.net/wiki/x/SwD6gg#Web) section.
 */
export const CustomIcons: StoryComponentType = {
    render: () => {
        const customIcoms = {
            article: articleIcon,
            course: courseIcon,
            crown: crownIcon,
            masteryCourse: masteryCourseIcon,
            masteryCourseBold: masteryCourseIconBold,
        };

        return (
            <View style={styles.row}>
                {Object.entries(customIcoms).map(([name, icon], index) => (
                    <View style={styles.container} key={index}>
                        <HeadingSmall>{name}</HeadingSmall>
                        <PhosphorIcon icon={icon} size="small" />
                        <PhosphorIcon icon={icon} size="medium" />
                        <PhosphorIcon icon={icon} size="large" />
                        <PhosphorIcon icon={icon} size="xlarge" />
                    </View>
                ))}
            </View>
        );
    },
};

const styles = StyleSheet.create({
    container: {
        gap: tokens.spacing.medium_16,
        width: 200,
    },
    row: {
        backgroundColor: tokens.color.offWhite,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: tokens.spacing.medium_16,
    },
    table: {
        borderCollapse: "collapse",
        borderSpacing: 0,
        maxWidth: 600,
        textAlign: "center",
    },

    tableCell: {
        border: `${tokens.border.width.hairline}px solid ${tokens.color.offBlack}`,
        padding: tokens.spacing.medium_16,
    },
});
