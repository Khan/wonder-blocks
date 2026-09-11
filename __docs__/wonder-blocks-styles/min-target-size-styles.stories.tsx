import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import {StyleSheet} from "aphrodite";

import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-styles/package.json";
import {minTargetSizeStyles} from "@khanacademy/wonder-blocks-styles";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {
    border,
    boxShadow,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import Link from "@khanacademy/wonder-blocks-link";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {ScenariosLayout} from "../components/scenarios-layout";
import {allThemeModes} from "../../.storybook/modes";

/**
 * A transparent hit area that guarantees an interactive element is at least
 * 24x24, satisfying
 * [WCAG 2.5.8 (Target Size, Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
 *
 * The hit area is expanded with a `::before` pseudo-element rather than by
 * growing the element, so **the visual layout is unchanged**. `minTargetSize`
 * is used internally by `Clickable` and `Link`, which apply it by default.
 *
 * ### When to use
 *
 * - **WB component authors**: apply `minTargetSizeStyles.minTargetSize` when
 *   implementing a new WB primitive that renders a small interactive element
 *   and does not already compose `Clickable`.
 * - **Consumers**: it should be rare to need this directly — WB interactive
 *   components already include it. `Clickable` and `Link` both accept
 *   `disableMinTargetSize` to opt out.
 *
 * ### When not to use
 *
 * - **Inline targets.** WCAG 2.5.8 exempts a target whose size is constrained
 *   by the line-height of the surrounding text, and expanding one would steal
 *   clicks from adjacent lines. `Link` skips the hit area for `inline` links
 *   regardless of `disableMinTargetSize`.
 * - **Elements that draw their own `before`.** `:before` and `::before` are the
 *   same pseudo-element, so a rule of your own collides with the hit area. An
 *   Aphrodite style stays its own class and merges with it per-property; a
 *   plain object is merged into the same class and replaces it outright. To
 *   coexist either way, spread the hit area into your own `::before` (see the
 *   scenarios below); otherwise opt out. `Cell` hits this — it draws the left
 *   bar indicator for its active and press states with `:before` — so it opts
 *   out internally.
 * - **Targets closer than 24px apart.** The hit area extends past the
 *   element's visual box, so neighbouring hit areas overlap and the
 *   later-painted one wins.
 *
 * Note that applying the hit area also makes the element a containing block
 * (`position: relative`), which affects absolutely-positioned descendants that
 * previously resolved against an ancestor.
 */
export default {
    title: "Packages / Styles / Min Target Size Styles",
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            // Disabling because this is already covered by the Scenarios story.
            disableSnapshot: true,
        },
    },
} as Meta<any>;

type Story = StoryObj<any>;

// eslint-disable-next-line @khanacademy/wonder-blocks/no-raw-button -- StyledButton is used to demonstrate minTargetSize applied to a raw element; a WB Button would obscure this since it is already larger than 24x24.
const StyledButton = addStyle("button");

const styles = StyleSheet.create({
    /**
     * The hit area is transparent, so it is invisible in a screenshot. This
     * contributes a shadow to the same `::before` to make it visible. It shares
     * no property with the hit area, so the per-property cascade merge leaves
     * both intact.
     */
    visibleHitArea: {
        "::before": {
            boxShadow: boxShadow.mid,
        },
    },
    /** A target deliberately smaller than 24x24, to show the hit area. */
    tinyTarget: {
        blockSize: sizing.size_120,
        inlineSize: sizing.size_120,
        padding: "unset",
        borderWidth: border.width.medium,
        borderStyle: "solid",
        borderColor: semanticColor.core.border.instructive.default,
        background: semanticColor.core.background.instructive.subtle,
    },
    row: {
        flexDirection: "row",
        gap: sizing.size_240,
        alignItems: "center",
    },
});

/**
 * A transparent hit area that guarantees an interactive element is at least
 * 24x24.
 *
 * Both squares below are 12x12. The first has the hit area applied and is
 * clickable well beyond its visible bounds; the second does not and is only
 * clickable within them. A shadow has been added to the hit area for
 * demonstration purposes.
 */
export const MinTargetSize: Story = {
    name: "minTargetSize",
    render: () => (
        <View style={styles.row}>
            <Clickable
                onClick={() => {}}
                aria-label="With hit area"
                style={styles.visibleHitArea}
            >
                {() => <View style={styles.tinyTarget} />}
            </Clickable>
            <Clickable
                onClick={() => {}}
                aria-label="Without hit area"
                disableMinTargetSize={true}
            >
                {() => <View style={styles.tinyTarget} />}
            </Clickable>
        </View>
    ),
};

export const Scenarios: Story = {
    render: () => {
        const scenarios = [
            {
                name: "Using Clickable (applied by default)",
                props: {
                    children: (
                        <Clickable
                            onClick={() => {}}
                            aria-label="Tiny clickable"
                            style={styles.visibleHitArea}
                        >
                            {() => <View style={styles.tinyTarget} />}
                        </Clickable>
                    ),
                },
            },
            {
                name: "Opting out with disableMinTargetSize",
                props: {
                    children: (
                        <Clickable
                            onClick={() => {}}
                            aria-label="Tiny clickable, hit area disabled"
                            disableMinTargetSize={true}
                        >
                            {() => <View style={styles.tinyTarget} />}
                        </Clickable>
                    ),
                },
            },
            {
                name: "Using an HTML element",
                props: {
                    children: (
                        // eslint-disable-next-line @khanacademy/wonder-blocks/no-raw-button
                        <StyledButton
                            style={[
                                styles.tinyTarget,
                                minTargetSizeStyles.minTargetSize,
                                styles.visibleHitArea,
                            ]}
                            aria-label="Custom button"
                        />
                    ),
                },
            },
            {
                name: "Spreading the hit area into an existing style",
                props: {
                    children: (
                        // eslint-disable-next-line @khanacademy/wonder-blocks/no-raw-button
                        <StyledButton
                            style={[
                                {
                                    blockSize: sizing.size_120,
                                    inlineSize: sizing.size_120,
                                    padding: "unset",
                                    background:
                                        semanticColor.core.background.critical
                                            .default,
                                    // the hit area will be merged with the
                                    // defined styles
                                    ...minTargetSizeStyles.minTargetSize,
                                },
                                styles.visibleHitArea,
                            ]}
                            aria-label="Custom button merging styles"
                        />
                    ),
                },
            },
            {
                name: "Composing with your own ::before",
                props: {
                    children: (
                        // eslint-disable-next-line @khanacademy/wonder-blocks/no-raw-button
                        <StyledButton
                            style={{
                                ...minTargetSizeStyles.minTargetSize,
                                blockSize: sizing.size_120,
                                inlineSize: sizing.size_120,
                                padding: "unset",
                                background:
                                    semanticColor.core.background.critical
                                        .default,
                                "::before": {
                                    // the hit area must be spread in, since
                                    // `:before` and `::before` are the same
                                    // pseudo-element
                                    ...minTargetSizeStyles.minTargetSize[
                                        "::before"
                                    ],
                                    boxShadow: boxShadow.mid,
                                },
                            }}
                            aria-label="Custom button composing ::before"
                        />
                    ),
                },
            },
            {
                name: "Inline links are exempt",
                props: {
                    children: (
                        <BodyText>
                            An{" "}
                            <Link href="#link" inline={true}>
                                inline link
                            </Link>{" "}
                            inside a sentence keeps its natural height, so it
                            never steals clicks from the lines above or below
                            it.
                        </BodyText>
                    ),
                },
            },
        ];

        return (
            <ScenariosLayout scenarios={scenarios}>
                {({...props}) => (
                    <View
                        {...props}
                        style={{
                            padding: sizing.size_160,
                            gap: sizing.size_160,
                            alignItems: "flex-start",
                        }}
                    />
                )}
            </ScenariosLayout>
        );
    },
    args: {},
    parameters: {
        docs: {
            canvas: {
                sourceState: "shown",
            },
            source: {
                type: "code",
                excludeDecorators: true,
            },
        },
        chromatic: {
            // Enable scenarios snapshots
            disableSnapshot: false,
            modes: allThemeModes,
        },
    },
};
