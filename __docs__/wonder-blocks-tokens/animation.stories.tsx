import * as React from "react";
import {StyleSheet} from "aphrodite";
import {
    Title,
    Subtitle,
    Description,
    Stories,
} from "@storybook/addon-docs/blocks";
import {Meta} from "@storybook/react-vite";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";
import {
    animation,
    animationValue,
    motionTransition,
    cssPreset,
    motionPreset,
    waapiPreset,
    semanticColor,
    sizing,
    border,
    type CubicBezier,
    type AnimationOrigin,
} from "@khanacademy/wonder-blocks-tokens";
import TokenTable from "../components/token-table";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-tokens/package.json";
import {Code} from "../components/code";
import {EasingCurve} from "../components/easing-curve";

/**
 * The `animation` tokens standardize animation and are meant to be
 * implementation-agnostic: the exact same token can drive an Aphrodite/CSS
 * `transition`, the `motion` (framer-motion) React library, or the Web
 * Animations API using helper functions.
 *
 * There are two tiers of tokens:
 *
 * ## Primitives — the raw ingredients
 *
 *   - `animation.duration.*` (fixed `ms` values)
 *   - `animation.easing.*` (cubic-bézier curves)
 *
 * ## Semantic presets — named by reusable interaction pattern
 *
 *   - `animation.floating.enter` (floating surfaces like the Modal and Popover `enter` and `exit`)
 *   - `animation.disclosure.expand` (Disclosure regions like the Accordion `expand` and `collapse`)
 *   - `animation.control.press` (e.g. Button)
 *
 * Each preset has a `{duration, easing, delay}` "clock" and, where it matters, the `from`/`to`
 * states that give it character (e.g. we never scale 0-100% or slide the full width). The preset
 * owns the opinion; the component applies it to the element, and chooses a direction in translation
 * is part of the preset.
 *
 * ## So many ways to animate!
 *
 * Animation is implemented across `wonder-blocks` and `frontend` in multiple ways depending on the
 * complexity needed as well as when the animation was implemented. The three main implementations are:
 *
 * - `Aphrodite` transitions (`wonder-blocks` and `frontend`)
 * - The `motion` React library (`frontend`)
 * - The Web Animations API (WAAPI) (more recent and thus the least common)
 *
 * The package exports the tokens in two shapes:
 * - `animation` — CSS variable references (`var(--wb-animation-…)`), for CSS/Aphrodite.
 * - `animationValue` — raw values that are shaped by helpers for `motion` and WAAPI.
 *
 * ## Usage
 *
 * Depending on the animation implementation, we provide different ways to consume the tokens
 * with helpers that shape the tokens into the necessary formats:
 *
 * ### CSS / Aphrodite presets *(recommended)*
 *
 * ```ts
 * import {animationValue, cssPreset} from "@khanacademy/wonder-blocks-tokens";
 * StyleSheet.create({drawer: cssPreset(animationValue.docked.enter, {origin: "right"})});
 * ```
 *
 * ### CSS / Aphrodite — timing only
 *
 * (not recommended by available) a timing-only preset when needed.
 *
 * ```ts
 * import {animation} from "@khanacademy/wonder-blocks-tokens";
 * const styles = {
 *     row: {
 *         transition: `grid-template-rows ${animation.disclosure.expand.duration} ${animation.disclosure.expand.easing}`,
 *     },
 * };
 * ```
 *
 * ### Motion (Framer Motion) presets
 *
 * full preset as initial/animate/transition.
 *
 * ```ts
 * import {animationValue, motionPreset} from "@khanacademy/wonder-blocks-tokens";
 * <motion.div {...motionPreset(animationValue.floating.enter, {origin: "bottom"})} />
 * ```
 *
 * ###  WAAPI
 *
 * ```ts
 * import {animationValue, waapiPreset} from "@khanacademy/wonder-blocks-tokens";
 * el.animate(...waapiPreset(animationValue.floating.enter, {origin: "bottom"}));
 * ```
 * ---
 *
 */
export default {
    title: "Packages / Tokens / Animation",
    parameters: {
        docs: {
            // Use a custom page so the SB <Primary> component is not rendered.
            page: () => (
                <>
                    <Title />
                    <Subtitle />
                    <Description />
                    <Stories title="Tokens" />
                </>
            ),
        },
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    tags: [
        "!dev",
        "!manifest", // Remove from manifest in favour of static reference token docs
    ],
} as Meta;

type Row = {label: string; css: string; value: string};

/**
 * The `duration` primitives, in milliseconds. Durations use fixed `ms` values
 * (not `rem`) so timing is consistent across root font sizes. The bar length is
 * proportional to the duration.
 */
export const DurationPrimitive = {
    render: () => (
        <TokenTable
            columns={[
                {
                    label: "Token",
                    cell: (row: Row) => (
                        <Code>{`animation.duration.${row.label}`}</Code>
                    ),
                },
                {
                    label: "CSS Variable",
                    cell: (row: Row) => <Code>{row.css}</Code>,
                },
                {label: "Value", cell: "value"},
                {
                    label: "Relative length",
                    cell: (row: Row) => {
                        const ms =
                            animationValue.duration[
                                row.label as keyof typeof animationValue.duration
                            ];
                        return (
                            <View
                                style={{
                                    height: sizing.size_120,
                                    width: `${
                                        (ms / animationValue.duration.xxLong) *
                                        100
                                    }%`,
                                    minWidth: ms === 0 ? 0 : sizing.size_020,
                                    backgroundColor:
                                        semanticColor.core.background
                                            .instructive.default,
                                    borderRadius: border.radius.radius_080,
                                }}
                            />
                        );
                    },
                },
            ]}
            tokens={animation.duration}
        />
    ),
};

/**
 * The `easing` primitives, expressed as cubic-bézier control points. Storing the
 * raw control points (rather than a `cubic-bezier(…)` string) lets one token
 * drive CSS, the `motion` library, and WAAPI without a runtime parser.
 */
export const EasingPrimitive = {
    render: () => (
        <TokenTable
            columns={[
                {
                    label: "Token",
                    cell: (row: Row) => (
                        <Code>{`animation.easing.${row.label}`}</Code>
                    ),
                },
                {
                    label: "CSS Variable",
                    cell: (row: Row) => <Code>{row.css}</Code>,
                },
                {label: "Value", cell: "value"},
                {
                    label: "Curve",
                    cell: (row: Row) => (
                        <EasingCurve
                            easing={
                                animationValue.easing[
                                    row.label as keyof typeof animationValue.easing
                                ]
                            }
                        />
                    ),
                },
            ]}
            tokens={animation.easing}
        />
    ),
};

const StyledTable = addStyle("table");
const StyledTh = addStyle("th");
const StyledTd = addStyle("td");

// The semantic archetype groups, in display order.
const archetypeGroups = [
    "control",
    "disclosure",
    "floating",
    "docked",
    "indicator",
    "fade",
    "loop",
] as const;

/**
 * The semantic archetypes. Each token is a single `{duration, easing, delay}`
 * clock, named by pattern (`floating`, `disclosure`, …) and change (`enter`,
 * `expand`, …). The last column shows the value produced by `motionTransition`,
 * ready to spread into the `motion` library's `transition` prop.
 */
export const SemanticTokens = {
    render: () => {
        const rows = archetypeGroups.flatMap((group) =>
            Object.keys(animationValue[group]).map((change) => ({
                group,
                change,
                token: animationValue[group][
                    change as keyof (typeof animationValue)[typeof group]
                ] as {
                    duration: number;
                    easing: CubicBezier;
                    delay: number;
                },
            })),
        );
        return (
            <StyledTable style={styles.table}>
                <thead>
                    <tr>
                        <StyledTh style={styles.cell}>Token</StyledTh>
                        <StyledTh style={styles.cell}>Easing</StyledTh>
                        <StyledTh style={styles.cell}>Duration</StyledTh>
                        <StyledTh style={styles.cell}>Delay</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(({group, change, token}) => (
                        <tr key={`${group}.${change}`}>
                            <StyledTd style={styles.cell}>
                                <Code>{`animation.${group}.${change}`}</Code>
                            </StyledTd>
                            <StyledTd style={styles.cell}>
                                <View style={styles.easingCell}>
                                    <EasingCurve easing={token.easing} size={120} />
                                    <Code>{`[${token.easing.join(", ")}]`}</Code>
                                </View>
                            </StyledTd>
                            <StyledTd style={styles.cell}>
                                {token.duration}ms
                            </StyledTd>
                            <StyledTd style={styles.cell}>
                                {token.delay}ms
                            </StyledTd>
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
        );
    },
};



function Demo({
    label,
    style,
}: {
    label: string;
    style: React.ComponentProps<typeof View>["style"];
}): React.ReactElement {
    return (
        <View style={{gap: sizing.size_080, alignItems: "center"}}>
            <View style={[styles.demoBox, style]} />
            <Code>{label}</Code>
        </View>
    );
}

const styles = StyleSheet.create({
    table: {
        borderCollapse: "collapse",
        borderSpacing: 0,
        margin: `${sizing.size_320} 0`,
        width: "100%",
        color: semanticColor.core.foreground.neutral.strong,
    },
    cell: {
        padding: sizing.size_080,
        verticalAlign: "middle",
        textAlign: "start",
        borderBlockStart: `1px solid ${semanticColor.core.border.neutral.subtle}`,
    },
    easingCell: {
        flexDirection: "row",
        gap: sizing.size_080,
    },
    // The entire floating entrance — fade + a bounded rise — now comes from the
    // token via `cssPreset`. The consumer no longer hand-authors the offset;
    // the opinion lives in the token.
    // @ts-expect-error [FEI-5019]: aphrodite types `animationName` as a string, but object keyframes work at runtime.
    floatingEnter: cssPreset(animationValue.floating.enter, {origin: "bottom"}),
    disclosureExpand: {
        // @ts-expect-error [FEI-5019]: `animationName` expects a string not an object.
        animationName: {
            from: {transform: "scaleY(0)"},
            to: {transform: "scaleY(1)"},
        },
        transformOrigin: "top",
        animationDuration: animation.disclosure.expand.duration,
        animationTimingFunction: animation.disclosure.expand.easing,
        animationFillMode: "backwards",
    },
    fadeIn: {
        // @ts-expect-error [FEI-5019]: `animationName` expects a string not an object.
        animationName: {from: {opacity: 0}, to: {opacity: 1}},
        animationDuration: animation.fade.in.duration,
        animationTimingFunction: animation.fade.in.easing,
        animationFillMode: "backwards",
    },
    loopSpin: {
        // @ts-expect-error [FEI-5019]: `animationName` expects a string not an object.
        animationName: {
            from: {transform: "rotate(0deg)"},
            to: {transform: "rotate(360deg)"},
        },
        animationDuration: animation.loop.spin.duration,
        animationTimingFunction: animation.loop.spin.easing,
        animationIterationCount: "infinite",
    },
});
