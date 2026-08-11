import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";

import arrowRightIcon from "@phosphor-icons/core/regular/arrow-right.svg";
import arrowLeftIcon from "@phosphor-icons/core/regular/arrow-left.svg";
import caretRightIcon from "@phosphor-icons/core/regular/caret-right.svg";
import caretDoubleRightIcon from "@phosphor-icons/core/regular/caret-double-right.svg";
import arrowLineRightIcon from "@phosphor-icons/core/regular/arrow-line-right.svg";
import arrowFatRightIcon from "@phosphor-icons/core/regular/arrow-fat-right.svg";
import arrowBendUpRightIcon from "@phosphor-icons/core/regular/arrow-bend-up-right.svg";
import arrowUUpLeftIcon from "@phosphor-icons/core/regular/arrow-u-up-left.svg";
import paperPlaneRightIcon from "@phosphor-icons/core/regular/paper-plane-right.svg";
import signOutIcon from "@phosphor-icons/core/regular/sign-out.svg";
import textIndentIcon from "@phosphor-icons/core/regular/text-indent.svg";

import playIcon from "@phosphor-icons/core/regular/play.svg";
import arrowClockwiseIcon from "@phosphor-icons/core/regular/arrow-clockwise.svg";
import trendDownIcon from "@phosphor-icons/core/regular/trend-down.svg";
import arrowsDownUpIcon from "@phosphor-icons/core/regular/arrows-down-up.svg";
import magnifyingGlassIcon from "@phosphor-icons/core/regular/magnifying-glass.svg";
import checkIcon from "@phosphor-icons/core/regular/check.svg";
import funnelIcon from "@phosphor-icons/core/regular/funnel.svg";
import textAlignLeftIcon from "@phosphor-icons/core/regular/text-align-left.svg";
import arrowUpRightIcon from "@phosphor-icons/core/regular/arrow-up-right.svg";
import arrowSquareOutIcon from "@phosphor-icons/core/regular/arrow-square-out.svg";

import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-icon/package.json";

/**
 * LTR vs RTL comparison stories for automatic PhosphorIcon mirroring
 * (CLASS-13991).
 */

type IconEntry = {
    name: string;
    icon: string;
};

const MIRROR_EXPECTED: Array<IconEntry> = [
    {name: "arrow-right", icon: arrowRightIcon},
    {name: "arrow-left", icon: arrowLeftIcon},
    {name: "caret-right", icon: caretRightIcon},
    {name: "caret-double-right", icon: caretDoubleRightIcon},
    {name: "arrow-line-right", icon: arrowLineRightIcon},
    {name: "arrow-fat-right", icon: arrowFatRightIcon},
    {name: "arrow-bend-up-right", icon: arrowBendUpRightIcon},
    {name: "arrow-u-up-left", icon: arrowUUpLeftIcon},
    {name: "paper-plane-right", icon: paperPlaneRightIcon},
    {name: "sign-out", icon: signOutIcon},
    {name: "text-indent", icon: textIndentIcon},
];

const MIRROR_NOT_EXPECTED: Array<IconEntry> = [
    {name: "play", icon: playIcon},
    {name: "arrow-clockwise", icon: arrowClockwiseIcon},
    {name: "trend-down", icon: trendDownIcon},
    {name: "arrows-down-up", icon: arrowsDownUpIcon},
    {name: "text-align-left", icon: textAlignLeftIcon},
    {name: "arrow-up-right", icon: arrowUpRightIcon},
    {name: "arrow-square-out", icon: arrowSquareOutIcon},
    {name: "magnifying-glass", icon: magnifyingGlassIcon},
    {name: "check", icon: checkIcon},
    {name: "funnel", icon: funnelIcon},
];

const IconGrid = ({entries}: {entries: Array<IconEntry>}) => (
    <View style={styles.grid}>
        {entries.map(({name, icon}) => (
            <View key={name} style={styles.cell}>
                <PhosphorIcon icon={icon} size="medium" aria-label={name} />
                <BodyText size="xsmall" style={styles.caption}>
                    {name}
                </BodyText>
            </View>
        ))}
    </View>
);

/**
 * The pagination control from the assignments report. Both arrows should point
 * outward in either direction: `< Older` … `Newer >` in LTR, and
 * `< Newer` … `Older >` in RTL.
 */
const PaginationRow = () => (
    <View style={styles.pagination}>
        <View style={styles.inlineGroup}>
            <PhosphorIcon icon={arrowLeftIcon} aria-label="Older" />
            <BodyText size="small">Older</BodyText>
        </View>
        <View style={styles.inlineGroup}>
            <BodyText size="small">Newer</BodyText>
            <PhosphorIcon icon={arrowRightIcon} aria-label="Newer" />
        </View>
    </View>
);

/**
 * Reproduces a drawer list row and a "view all" link.
 */
const ListRows = () => (
    <View style={styles.rows}>
        <View style={styles.row}>
            <BodyText size="small">Skip-counting by 100s</BodyText>
            <PhosphorIcon icon={caretRightIcon} aria-label="Open" />
        </View>
        <View style={styles.row}>
            <BodyText size="small">Add 10s and 100s</BodyText>
            <PhosphorIcon icon={caretRightIcon} aria-label="Open" />
        </View>
        <View style={styles.inlineGroup}>
            <BodyText size="small">View all assignments</BodyText>
            <PhosphorIcon icon={arrowRightIcon} aria-label="View all" />
        </View>
    </View>
);

const DirectionPanel = ({
    dir,
    children,
}: {
    dir: "ltr" | "rtl";
    children: React.ReactNode;
}) => (
    <div dir={dir} style={{flex: 1, minInlineSize: 0}}>
        <View style={styles.panel}>
            <Heading size="small" style={styles.panelTitle}>
                {dir.toUpperCase()}
            </Heading>
            {children}
        </View>
    </div>
);

const Comparison = ({children}: {children: React.ReactNode}) => (
    <View style={styles.comparison}>
        <DirectionPanel dir="ltr">{children}</DirectionPanel>
        <DirectionPanel dir="rtl">{children}</DirectionPanel>
    </View>
);

export default {
    title: "Packages / Icon / PhosphorIcon / RTL Mirroring",
    component: PhosphorIcon,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            disableSnapshot: false,
        },
    },
} as Meta<typeof PhosphorIcon>;

type StoryComponentType = StoryObj<typeof PhosphorIcon>;

/**
 * Icons that should flip in the RTL panel.
 */
export const ExpectedToMirror: StoryComponentType = {
    render: () => (
        <Comparison>
            <IconGrid entries={MIRROR_EXPECTED} />
        </Comparison>
    ),
};

/**
 * Icons that should look the same in both panels.
 */
export const ExpectedNotToMirror: StoryComponentType = {
    render: () => (
        <Comparison>
            <IconGrid entries={MIRROR_NOT_EXPECTED} />
        </Comparison>
    ),
};

/**
 * Common UI patterns that need glyph mirroring in RTL (pagination, list rows).
 */
export const CommonPatterns: StoryComponentType = {
    render: () => (
        <Comparison>
            <View style={styles.stack}>
                <PaginationRow />
                <ListRows />
            </View>
        </Comparison>
    ),
};

const styles = StyleSheet.create({
    comparison: {
        flexDirection: "row",
        gap: sizing.size_240,
        alignItems: "stretch",
    },
    panel: {
        border: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
        borderRadius: border.radius.radius_040,
        padding: sizing.size_160,
        gap: sizing.size_160,
    },
    panelTitle: {
        color: semanticColor.core.foreground.neutral.subtle,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: sizing.size_160,
    },
    cell: {
        alignItems: "center",
        gap: sizing.size_040,
        width: sizing.size_960,
    },
    caption: {
        color: semanticColor.core.foreground.neutral.subtle,
        textAlign: "center",
    },
    stack: {
        gap: sizing.size_240,
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    rows: {
        gap: sizing.size_080,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBlockEnd: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
        paddingBlock: sizing.size_080,
    },
    inlineGroup: {
        flexDirection: "row",
        alignItems: "center",
        gap: sizing.size_080,
    },
});
