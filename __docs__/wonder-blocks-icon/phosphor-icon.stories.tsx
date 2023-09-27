import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import Banner from "@khanacademy/wonder-blocks-banner";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {Body, LabelMedium} from "@khanacademy/wonder-blocks-typography";
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
 * import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
 * import MagnifyingGlass from "@phosphor-icons/core/regular/magnifying-glass.svg";
 *
 * <PhosphorIcon
 *     icon={MagnifyingGlass}
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
        icon: IconMappings.MagnifyingGlassBold,
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
                        IconMappings.MagnifyingGlassBold,
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
 * - `small` size icons only support `bold` and `fill` weights.
 * - `medium` size icons only support `regular` and `fill` weights.
 * - `large` and `xlarge` size icons support all weights.
 */
export const Sizes: StoryComponentType = {
    render: () => {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <LabelMedium>small</LabelMedium>
                    <PhosphorIcon
                        icon={IconMappings.MagnifyingGlassBold}
                        size="small"
                    />
                </View>
                <View style={styles.row}>
                    <LabelMedium>medium</LabelMedium>
                    <PhosphorIcon
                        icon={IconMappings.MagnifyingGlass}
                        size="medium"
                    />
                </View>
                <View style={styles.row}>
                    <LabelMedium>large</LabelMedium>

                    <PhosphorIcon
                        icon={IconMappings.MagnifyingGlass}
                        size="large"
                    />
                </View>
                <View style={styles.row}>
                    <LabelMedium>xlarge</LabelMedium>

                    <PhosphorIcon
                        icon={IconMappings.MagnifyingGlass}
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
        icon: IconMappings.InfoBold,
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
                    icon={IconMappings.InfoBold}
                    style={{margin: tokens.spacing.xxxxSmall_2}}
                    className="foo"
                />
                when it is inline.
            </Body>
        );
    },
};

// TODO(WB-1611): Need to figure out how to use custom icons.
/**
 * Icons can be customized by passing in a custom icon.
 *
 * The icon should be an object with a size-related property (`small | medium |
 * large | xlarge`) that is a string containing the path data for the icon.
 */
// export const CustomIcon: StoryComponentType = () => {
//     const share: IconAsset = {
//         medium: "M12.5 4.25C12.5 3.14543 13.3954 2.25 14.5 2.25C15.6046 2.25 16.5 3.14543 16.5 4.25C16.5 5.35457 15.6046 6.25 14.5 6.25C13.8117 6.25 13.2046 5.90228 12.8447 5.37291C12.8367 5.3589 12.8282 5.34502 12.8194 5.33126C12.8102 5.31696 12.8007 5.30297 12.7909 5.28929C12.6063 4.98641 12.5 4.63062 12.5 4.25ZM14.5 8.25C13.4511 8.25 12.4966 7.8463 11.7832 7.18581L7.79943 9.7458C7.92958 10.1403 8 10.5619 8 11C8 11.4381 7.92958 11.8597 7.79943 12.2542L11.7832 14.8142C12.4966 14.1537 13.4511 13.75 14.5 13.75C16.7091 13.75 18.5 15.5409 18.5 17.75C18.5 19.9591 16.7091 21.75 14.5 21.75C12.2909 21.75 10.5 19.9591 10.5 17.75C10.5 17.3119 10.5704 16.8903 10.7006 16.4958L6.71681 13.9358C6.00342 14.5963 5.04885 15 4 15C1.79086 15 0 13.2091 0 11C0 8.79086 1.79086 7 4 7C5.04885 7 6.00342 7.40369 6.71681 8.06417L10.7006 5.50416C10.5704 5.10969 10.5 4.68807 10.5 4.25C10.5 2.04086 12.2909 0.25 14.5 0.25C16.7091 0.25 18.5 2.04086 18.5 4.25C18.5 6.45914 16.7091 8.25 14.5 8.25ZM5.70939 12.0388C5.69949 12.0526 5.68988 12.0668 5.68058 12.0813C5.67164 12.0952 5.6631 12.1092 5.65493 12.1234C5.29508 12.6525 4.68812 13 4 13C2.89543 13 2 12.1046 2 11C2 9.8954 2.89543 9 4 9C4.68812 9 5.29507 9.3475 5.65493 9.8766C5.66309 9.8908 5.67164 9.9048 5.68058 9.9187C5.68988 9.9332 5.69949 9.9474 5.7094 9.9612C5.89379 10.264 6 10.6196 6 11C6 11.3804 5.89379 11.736 5.70939 12.0388ZM12.7909 16.7107C12.6063 17.0136 12.5 17.3694 12.5 17.75C12.5 18.8546 13.3954 19.75 14.5 19.75C15.6046 19.75 16.5 18.8546 16.5 17.75C16.5 16.6454 15.6046 15.75 14.5 15.75C13.8117 15.75 13.2046 16.0977 12.8447 16.6271C12.8367 16.6411 12.8282 16.655 12.8194 16.6687C12.8102 16.683 12.8007 16.697 12.7909 16.7107Z",
//     };

//     return (
//         <PhosphorIcon
//             icon={share}
//             style={{
//                 fillRule: "evenodd",
//                 clipRule: "evenodd",
//             }}
//         />
//     );
// };

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
