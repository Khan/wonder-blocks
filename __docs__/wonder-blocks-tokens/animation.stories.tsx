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

/**
 * The `animation` tokens standardize animation timing across Wonder Blocks. They
 * are implementation-agnostic: the exact same token can drive an Aphrodite/CSS
 * `transition`, the `motion` (framer-motion) React library, or the Web
 * Animations API.
 *
 * There are two tiers:
 * - **Primitives** — `animation.duration.*` (fixed `ms` values) and
 *   `animation.easing.*` (cubic-bézier curves). The raw ingredients.
 * - **Semantic presets** — named by reusable interaction pattern and change,
 *   e.g. `animation.overlay.enter`, `animation.disclosure.expand`,
 *   `animation.control.press`. Each is a `{duration, easing, delay}` "clock" and,
 *   where it matters, the `from`/`to` states that give it character. The preset
 *   owns the opinion; the component picks the element and direction.
 *
 * The package exports the tokens in two shapes:
 * - `animation` — CSS variable references (`var(--wb-animation-…)`), for CSS/Aphrodite.
 * - `animationValue` — raw values (millisecond numbers + bézier arrays, plus
 *   `from`/`to` states on presets that carry them), for JS animation libraries. A
 *   superset of `animation`.
 *
 * ## Usage
 *
 * ```ts
 * // CSS / Aphrodite — apply a full preset; the component supplies only the edge.
 * import {animationValue, cssPreset} from "@khanacademy/wonder-blocks-tokens";
 * StyleSheet.create({drawer: cssPreset(animationValue.overlay.enter, {origin: "right"})});
 * // A timing-only preset can still be used via CSS-var refs:
 * import {animation} from "@khanacademy/wonder-blocks-tokens";
 * const styles = {
 *     row: {
 *         transition: `grid-template-rows ${animation.disclosure.expand.duration} ${animation.disclosure.expand.easing}`,
 *     },
 * };
 *
 * // motion (framer-motion) — full preset as initial/animate/transition.
 * import {animationValue, motionPreset} from "@khanacademy/wonder-blocks-tokens";
 * <motion.div {...motionPreset(animationValue.overlay.enter, {origin: "bottom"})} />
 *
 * // WAAPI — [keyframes, options] tuple.
 * import {animationValue, waapiPreset} from "@khanacademy/wonder-blocks-tokens";
 * el.animate(...waapiPreset(animationValue.overlay.enter, {origin: "bottom"}));
 * ```
 *
 * NOTE: The `animation` namespace intentionally avoids colliding with the
 * `motion` React library, so a file can `import {motion} from "motion/react"`
 * and these tokens side by side without aliasing.
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
 * A small SVG that plots a cubic-bézier easing curve from its raw control
 * points, so the shape of each easing token is visible at a glance.
 */
function EasingCurve({easing}: {easing: CubicBezier}): React.ReactElement {
    const size = 48;
    const [x1, y1, x2, y2] = easing;
    // SVG y grows downward, so flip the y coordinates (0 → bottom, 1 → top).
    const path = `M0,${size} C${x1 * size},${size - y1 * size} ${
        x2 * size
    },${size - y2 * size} ${size},0`;
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            aria-hidden={true}
        >
            <path
                d={path}
                fill="none"
                stroke={semanticColor.core.foreground.instructive.default}
                strokeWidth={2}
            />
        </svg>
    );
}

/**
 * The `duration` primitives, in milliseconds. Durations use fixed `ms` values
 * (not `rem`) so timing is consistent across root font sizes. The bar length is
 * proportional to the duration.
 */
export const Duration = {
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
                                    borderRadius: border.radius.radius_040,
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
export const Easing = {
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
    "overlay",
    "indicator",
    "fade",
    "loop",
] as const;

/**
 * The semantic archetypes. Each token is a single `{duration, easing, delay}`
 * clock, named by pattern (`overlay`, `disclosure`, …) and change (`enter`,
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
                        <StyledTh style={styles.cell}>Duration</StyledTh>
                        <StyledTh style={styles.cell}>Easing</StyledTh>
                        <StyledTh style={styles.cell}>Delay</StyledTh>
                        <StyledTh style={styles.cell}>
                            motionTransition()
                        </StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(({group, change, token}) => (
                        <tr key={`${group}.${change}`}>
                            <StyledTd style={styles.cell}>
                                <Code>{`animation.${group}.${change}`}</Code>
                            </StyledTd>
                            <StyledTd style={styles.cell}>
                                {token.duration}ms
                            </StyledTd>
                            <StyledTd style={styles.cell}>
                                <View style={styles.easingCell}>
                                    <EasingCurve easing={token.easing} />
                                    <Code>{`[${token.easing.join(", ")}]`}</Code>
                                </View>
                            </StyledTd>
                            <StyledTd style={styles.cell}>
                                {token.delay}ms
                            </StyledTd>
                            <StyledTd style={styles.cell}>
                                <Code>
                                    {JSON.stringify(motionTransition(token))}
                                </Code>
                            </StyledTd>
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
        );
    },
};

/**
 * A live demonstration of the semantic archetypes driving real CSS animations.
 * Press **Replay** to re-run them. Each box animates on the token's clock; the
 * box chooses which properties move (opacity, transform), the token supplies
 * the duration and easing.
 */
export const LiveDemo = {
    render: function Render() {
        // Remounting via a changing key re-triggers the CSS animations.
        const [runId, setRunId] = React.useState(0);
        return (
            <View style={{gap: sizing.size_160}}>
                <View style={{alignItems: "flex-start"}}>
                    <Button onClick={() => setRunId((id) => id + 1)}>
                        Replay
                    </Button>
                </View>
                <View
                    key={runId}
                    style={{
                        flexDirection: "row",
                        gap: sizing.size_240,
                        flexWrap: "wrap",
                    }}
                >
                    <Demo label="overlay.enter" style={styles.overlayEnter} />
                    <Demo
                        label="disclosure.expand"
                        style={styles.disclosureExpand}
                    />
                    <Demo label="fade.in" style={styles.fadeIn} />
                    <Demo label="loop.spin" style={styles.loopSpin} />
                </View>
            </View>
        );
    },
    parameters: {
        // Animations make visual-regression snapshots flaky, and this story is
        // for manual demonstration only.
        chromatic: {disableSnapshot: true},
    },
};

/**
 * A single enriched gesture token (`animation.overlay.enter`) drives all three
 * targets — CSS/Aphrodite, the `motion` React library, and WAAPI — from one
 * source. The token bakes in the *whole opinion* (fade + bounded slide + a
 * settle-from-scale); the component supplies only the `origin` (which edge the
 * slide comes from). Change the origin and every output updates together.
 */
export const GestureFromOneToken = {
    render: function Render() {
        const origins: Array<AnimationOrigin> = [
            "bottom",
            "top",
            "left",
            "right",
        ];
        const [origin, setOrigin] = React.useState<AnimationOrigin>("bottom");
        const [runId, setRunId] = React.useState(0);

        // Built from the token at render time so the chosen origin flows through.
        const dynamic = StyleSheet.create({
            // @ts-expect-error [FEI-5019]: aphrodite types `animationName` as a string, but object keyframes work at runtime.
            box: cssPreset(animationValue.overlay.enter, {origin}),
        });

        const replay = () => setRunId((id) => id + 1);

        return (
            <View style={{gap: sizing.size_160}}>
                <View
                    style={{
                        flexDirection: "row",
                        gap: sizing.size_080,
                        flexWrap: "wrap",
                    }}
                >
                    {origins.map((o) => (
                        <Button
                            key={o}
                            kind={o === origin ? "primary" : "secondary"}
                            onClick={() => {
                                setOrigin(o);
                                replay();
                            }}
                        >
                            {o}
                        </Button>
                    ))}
                    <Button kind="tertiary" onClick={replay}>
                        Replay
                    </Button>
                </View>

                <View key={`${origin}-${runId}`} style={{alignItems: "center"}}>
                    <View style={[styles.demoBox, dynamic.box]} />
                </View>

                <View style={{gap: sizing.size_080}}>
                    <Code>{`cssPreset(animation.overlay.enter, {origin: "${origin}"})\n${JSON.stringify(
                        cssPreset(animationValue.overlay.enter, {origin}),
                        null,
                        2,
                    )}`}</Code>
                    <Code>{`motionPreset(animation.overlay.enter, {origin: "${origin}"})\n${JSON.stringify(
                        motionPreset(animationValue.overlay.enter, {origin}),
                        null,
                        2,
                    )}`}</Code>
                    <Code>{`waapiPreset(animation.overlay.enter, {origin: "${origin}"})\n${JSON.stringify(
                        waapiPreset(animationValue.overlay.enter, {origin}),
                        null,
                        2,
                    )}`}</Code>
                </View>
            </View>
        );
    },
    parameters: {
        chromatic: {disableSnapshot: true},
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
        alignItems: "center",
        gap: sizing.size_080,
    },
    demoBox: {
        width: sizing.size_640,
        height: sizing.size_640,
        backgroundColor: semanticColor.core.background.instructive.default,
        borderRadius: border.radius.radius_080,
    },
    // The entire overlay entrance — fade + bounded slide + settle-from-scale —
    // now comes from the token via `cssPreset`. The consumer no longer hand-
    // authors the 16px offset or the 0.95 scale; the opinion lives in the token.
    // @ts-expect-error [FEI-5019]: aphrodite types `animationName` as a string, but object keyframes work at runtime.
    overlayEnter: cssPreset(animationValue.overlay.enter, {origin: "bottom"}),
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
