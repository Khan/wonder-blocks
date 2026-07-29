import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Meta} from "@storybook/react-vite";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {Heading, BodyText} from "@khanacademy/wonder-blocks-typography";
import Button from "@khanacademy/wonder-blocks-button";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {
    animation,
    animationValue,
    cssPreset,
    semanticColor,
    sizing,
    border,
    boxShadow,
    type AnimationOrigin,
} from "@khanacademy/wonder-blocks-tokens";
// An inline <code> (valid inside a <p>, unlike the block-level Code component).
const StyledCode = addStyle("code");

/**
 * These stories apply the **semantic animation presets** to the kinds of surfaces
 * they were designed for — a drawer, a modal, and a disclosure — so you can see
 * how a component consumes them.
 *
 * The point of the enriched tokens: the component author never hand-authors
 * *how far* something slides or *whether* it fades. That opinion lives in the
 * token. `cssPreset(animation.docked.enter, {origin})` returns the whole
 * keyframe; the component supplies only the docked edge.
 */
export default {
    title: "Packages / Tokens / Animation / On real surfaces",
    parameters: {
        // Animations make visual-regression snapshots flaky; these are for
        // manual, interactive demonstration.
        chromatic: {disableSnapshot: true},
    },
    tags: ["!dev", "!manifest"],
} as Meta;

const StyledDiv = addStyle("div");

// ---------------------------------------------------------------------------
// Shared surface chrome (a bounded "viewport" so portaled-looking surfaces can
// render inline, side by side, instead of taking over the screen).
// ---------------------------------------------------------------------------

const surfaceStyles = StyleSheet.create({
    stage: {
        position: "relative",
        overflow: "hidden",
        height: 340,
        flex: "1 1 320px",
        minWidth: 300,
        borderRadius: border.radius.radius_040,
        border: `1px solid ${semanticColor.core.border.neutral.subtle}`,
        backgroundColor: semanticColor.core.background.neutral.subtle,
    },
    backdrop: {
        position: "absolute",
        inset: 0,
        backgroundColor: semanticColor.core.background.overlay.default,
    },
    panelBase: {
        position: "absolute",
        backgroundColor: semanticColor.core.background.base.default,
        boxShadow: boxShadow.mid,
        padding: sizing.size_240,
        gap: sizing.size_120,
        overflow: "auto",
    },
    label: {
        color: semanticColor.core.foreground.neutral.strong,
    },
});

/** Per-edge docking + the CSS transform used by the *current* (100%) slide. */
const edgeGeometry: Record<
    "left" | "right" | "bottom",
    {panel: React.CSSProperties; fullSlide: string}
> = {
    left: {
        panel: {top: 0, bottom: 0, left: 0, width: 240},
        fullSlide: "translateX(-100%)",
    },
    right: {
        panel: {top: 0, bottom: 0, right: 0, width: 240},
        fullSlide: "translateX(100%)",
    },
    bottom: {
        panel: {left: 0, right: 0, bottom: 0, height: 200},
        fullSlide: "translateY(100%)",
    },
};

type Phase = "closed" | "entering" | "open" | "exiting";

/**
 * A drawer surface. `variant` picks the animation source:
 * - `"token"` — the panel uses `cssPreset(animation.docked.enter/exit)`; the
 *   backdrop shares the same *clock* (`animation.docked.*` duration + easing) but
 *   only fades. The slide is a bounded "suggestion" (docked has no scale).
 * - `"current"` — reproduces today's hand-rolled animation: a full 100% slide at
 *   `400ms linear`, no scale.
 */
function DrawerStage({
    edge,
    variant,
    phase,
    runId,
}: {
    edge: "left" | "right" | "bottom";
    variant: "token" | "current";
    phase: Phase;
    // Bumps on each fresh Open so the enter animation remounts and replays;
    // stable across the entering→open transition so it does NOT double-play.
    runId: number;
}): React.ReactElement {
    const geo = edgeGeometry[edge];
    const origin: AnimationOrigin = edge;

    // Build the animation styles for this edge/variant at render time.
    const anim = StyleSheet.create({
        // Panel enter/exit. `cssPreset` consumes the raw `animationValue` tree
        // (which carries the from/to states); `animation.*` is only the CSS-var
        // timing refs.
        // @ts-expect-error [FEI-5019]: aphrodite types `animationName` as a string.
        tokenEnter: cssPreset(animationValue.docked.enter, {origin}),
        // @ts-expect-error [FEI-5019]: aphrodite types `animationName` as a string.
        tokenExit: {
            ...cssPreset(animationValue.docked.exit, {
                origin,
                fillMode: "forwards",
            }),
        },
        currentEnter: {
            // @ts-expect-error [FEI-5019]: aphrodite types `animationName` as a string.
            animationName: {
                from: {opacity: 0, transform: geo.fullSlide},
                to: {opacity: 1, transform: "none"},
            },
            animationDuration: "400ms",
            animationTimingFunction: "linear",
            animationFillMode: "backwards",
        },
        currentExit: {
            // @ts-expect-error [FEI-5019]: aphrodite types `animationName` as a string.
            animationName: {
                from: {opacity: 1, transform: "none"},
                to: {opacity: 0, transform: geo.fullSlide},
            },
            animationDuration: "400ms",
            animationTimingFunction: "linear",
            animationFillMode: "forwards",
        },
        // Backdrop shares the docked clock but only fades — the component
        // picks the property. Uses the CSS-var timing directly.
        backdropEnter: {
            // @ts-expect-error [FEI-5019]: aphrodite types `animationName` as a string.
            animationName: {from: {opacity: 0}, to: {opacity: 1}},
            animationDuration: animation.docked.enter.duration,
            animationTimingFunction: animation.docked.enter.easing,
            animationFillMode: "backwards",
        },
        backdropExit: {
            // @ts-expect-error [FEI-5019]: aphrodite types `animationName` as a string.
            animationName: {from: {opacity: 1}, to: {opacity: 0}},
            animationDuration: animation.docked.exit.duration,
            animationTimingFunction: animation.docked.exit.easing,
            animationFillMode: "forwards",
        },
    });

    const isExiting = phase === "exiting";
    const panelAnim =
        variant === "token"
            ? isExiting
                ? anim.tokenExit
                : anim.tokenEnter
            : isExiting
              ? anim.currentExit
              : anim.currentEnter;
    const backdropAnim = isExiting ? anim.backdropExit : anim.backdropEnter;

    return (
        <View style={surfaceStyles.stage}>
            <BodyText size="small" style={styles.stageTitle}>
                {variant === "token" ? "Token" : "Current"}
            </BodyText>
            {phase !== "closed" && (
                <>
                    <View
                        style={[surfaceStyles.backdrop, backdropAnim]}
                        // Remount only on a fresh open (runId) or edge change —
                        // NOT on the entering→open transition (which would
                        // replay the animation). Exit plays via the style swap.
                        key={`backdrop-${variant}-${edge}-${runId}`}
                    />
                    <View
                        style={[
                            surfaceStyles.panelBase,
                            geo.panel as React.CSSProperties,
                            panelAnim,
                        ]}
                        key={`panel-${variant}-${edge}-${runId}`}
                    >
                        <Heading size="small">Settings</Heading>
                        <BodyText size="small">
                            A drawer docked to the {edge}. The{" "}
                            {variant === "token"
                                ? "token slides a bounded distance while fading and settling from a hair under full size."
                                : "current animation slides the full width at 400ms linear."}
                        </BodyText>
                    </View>
                </>
            )}
        </View>
    );
}

/**
 * The Drawer, side by side: the current hand-rolled 100% slide vs. the same
 * surface driven by `animation.docked.enter`/`.exit`. Switch the docked edge and
 * the token's `origin` follows it. Open/Close plays the real enter/exit
 * lifecycle (the exiting panel stays mounted for the token's exit duration).
 */
export const Drawer = {
    render: function Render() {
        const [edge, setEdge] = React.useState<"left" | "right" | "bottom">(
            "right",
        );
        const [phase, setPhase] = React.useState<Phase>("closed");
        // Increments on each Open so a re-open replays the enter animation.
        const [runId, setRunId] = React.useState(0);
        const timers = React.useRef<Array<ReturnType<typeof setTimeout>>>([]);

        const clearTimers = () => {
            timers.current.forEach(clearTimeout);
            timers.current = [];
        };
        React.useEffect(() => clearTimers, []);

        const open = () => {
            clearTimers();
            setRunId((id) => id + 1);
            setPhase("entering");
            timers.current.push(
                setTimeout(
                    () => setPhase("open"),
                    animationValue.docked.enter.duration,
                ),
            );
        };
        const close = () => {
            clearTimers();
            setPhase("exiting");
            timers.current.push(
                setTimeout(
                    () => setPhase("closed"),
                    animationValue.docked.exit.duration,
                ),
            );
        };

        const isOpen = phase === "entering" || phase === "open";

        return (
            <View style={{gap: sizing.size_160}}>
                <View style={styles.controls}>
                    {(["left", "right", "bottom"] as const).map((e) => (
                        <Button
                            key={e}
                            size="small"
                            kind={e === edge ? "primary" : "secondary"}
                            onClick={() => {
                                setEdge(e);
                                setPhase("closed");
                                clearTimers();
                            }}
                        >
                            {e}
                        </Button>
                    ))}
                    <View style={styles.spacer} />
                    <Button size="small" onClick={open} disabled={isOpen}>
                        Open
                    </Button>
                    <Button
                        size="small"
                        kind="tertiary"
                        onClick={close}
                        disabled={!isOpen}
                    >
                        Close
                    </Button>
                </View>

                <View style={styles.row}>
                    <DrawerStage
                        edge={edge}
                        variant="current"
                        phase={phase}
                        runId={runId}
                    />
                    <DrawerStage
                        edge={edge}
                        variant="token"
                        phase={phase}
                        runId={runId}
                    />
                </View>

                <BodyText size="small" style={styles.caption}>
                    Same surface, two motions. Left reproduces today&rsquo;s
                    hand-rolled drawer (full 100% slide,{" "}
                    <StyledCode style={styles.inlineCode}>400ms</StyledCode>{" "}
                    linear). Right is driven entirely by{" "}
                    <StyledCode
                        style={styles.inlineCode}
                    >{`cssPreset(animation.docked.enter, {origin: "${edge}"})`}</StyledCode>{" "}
                    — a bounded slide that <em>suggests</em> the full travel,
                    with a weighted ease-in-out (standard) curve. The backdrop
                    shares the same clock but only fades.
                </BodyText>
            </View>
        );
    },
};

/**
 * The Modal has **no entrance or exit animation today** — it just appears and
 * vanishes. Here `floating.enter` gives it a gentle rise + fade + scale-settle on
 * open, and `floating.exit` reverses it on close (the dialog stays mounted for
 * the token's exit duration so the animation can play). This shows the token
 * *adding* both directions of animation where a component hand-rolls none.
 */
export const Modal = {
    render: function Render() {
        const [phase, setPhase] = React.useState<Phase>("closed");
        const [runId, setRunId] = React.useState(0);
        const timers = React.useRef<Array<ReturnType<typeof setTimeout>>>([]);

        const clearTimers = () => {
            timers.current.forEach(clearTimeout);
            timers.current = [];
        };
        React.useEffect(() => clearTimers, []);

        const open = () => {
            clearTimers();
            setRunId((id) => id + 1);
            setPhase("entering");
            timers.current.push(
                setTimeout(
                    () => setPhase("open"),
                    animationValue.floating.enter.duration,
                ),
            );
        };
        const close = () => {
            clearTimers();
            setPhase("exiting");
            timers.current.push(
                setTimeout(
                    () => setPhase("closed"),
                    animationValue.floating.exit.duration,
                ),
            );
        };

        const isExiting = phase === "exiting";
        const anim = StyleSheet.create({
            // @ts-expect-error [FEI-5019]: aphrodite types `animationName` as a string.
            dialogEnter: cssPreset(animationValue.floating.enter, {
                origin: "bottom",
            }),
            // @ts-expect-error [FEI-5019]: aphrodite types `animationName` as a string.
            dialogExit: {
                ...cssPreset(animationValue.floating.exit, {
                    origin: "bottom",
                    fillMode: "forwards",
                }),
            },
            backdropEnter: {
                // @ts-expect-error [FEI-5019]: aphrodite types `animationName` as a string.
                animationName: {from: {opacity: 0}, to: {opacity: 1}},
                animationDuration: animation.floating.enter.duration,
                animationTimingFunction: animation.floating.enter.easing,
                animationFillMode: "backwards",
            },
            backdropExit: {
                // @ts-expect-error [FEI-5019]: aphrodite types `animationName` as a string.
                animationName: {from: {opacity: 1}, to: {opacity: 0}},
                animationDuration: animation.floating.exit.duration,
                animationTimingFunction: animation.floating.exit.easing,
                animationFillMode: "forwards",
            },
        });

        return (
            <View style={{gap: sizing.size_160}}>
                <View style={styles.controls}>
                    <Button
                        size="small"
                        onClick={open}
                        disabled={phase !== "closed"}
                    >
                        Open modal
                    </Button>
                </View>
                <View style={surfaceStyles.stage}>
                    {phase !== "closed" && (
                        <View
                            key={runId}
                            style={[
                                styles.center,
                                isExiting
                                    ? anim.backdropExit
                                    : anim.backdropEnter,
                            ]}
                        >
                            <View
                                style={[
                                    styles.modalDialog,
                                    isExiting
                                        ? anim.dialogExit
                                        : anim.dialogEnter,
                                ]}
                            >
                                <Heading size="small">Confirm</Heading>
                                <BodyText size="small">
                                    Enter via{" "}
                                    <StyledCode style={styles.inlineCode}>
                                        animation.floating.enter
                                    </StyledCode>
                                    , exit via{" "}
                                    <StyledCode style={styles.inlineCode}>
                                        animation.floating.exit
                                    </StyledCode>
                                    .
                                </BodyText>
                                <View style={{alignItems: "flex-end"}}>
                                    <Button
                                        size="small"
                                        onClick={close}
                                        disabled={isExiting}
                                    >
                                        OK
                                    </Button>
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        );
    },
};

/**
 * A disclosure (accordion-style) region driven by `animation.disclosure.expand` /
 * `.collapse`. Today the Accordion hard-codes `"300ms"` with no easing; the
 * token supplies both the `long` (300ms) duration and the `standard` curve, and
 * the caret rotation shares the same clock.
 */
export const Disclosure = {
    render: function Render() {
        const [expanded, setExpanded] = React.useState(false);

        const gridTransition = `grid-template-rows ${animation.disclosure.expand.duration} ${animation.disclosure.expand.easing}`;
        const caretTransition = `transform ${animation.disclosure.expand.duration} ${animation.disclosure.expand.easing}`;

        return (
            <View style={{gap: sizing.size_160, maxWidth: 480}}>
                <StyledDiv style={styles.disclosure}>
                    <Clickable
                        style={styles.disclosureHeader}
                        onClick={() => setExpanded((v) => !v)}
                        aria-expanded={expanded}
                    >
                        {() => (
                            <>
                                <BodyText
                                    tag="span"
                                    weight="bold"
                                    style={surfaceStyles.label}
                                >
                                    What are animation tokens?
                                </BodyText>
                                <StyledDiv
                                    style={[
                                        styles.caret,
                                        {transition: caretTransition},
                                        expanded && styles.caretExpanded,
                                    ]}
                                >
                                    ▾
                                </StyledDiv>
                            </>
                        )}
                    </Clickable>
                    <StyledDiv
                        style={[
                            styles.disclosureGrid,
                            {transition: gridTransition},
                            expanded
                                ? styles.disclosureExpanded
                                : styles.disclosureCollapsed,
                        ]}
                    >
                        <StyledDiv style={styles.disclosureInner}>
                            <BodyText size="small">
                                They standardize animation timing (and, for the
                                enriched archetypes, the from/to states) so a
                                component consumes one token instead of
                                hand-rolling durations and distances.
                            </BodyText>
                        </StyledDiv>
                    </StyledDiv>
                </StyledDiv>
                <BodyText size="small" style={styles.caption}>
                    Expand/collapse and the caret rotation both animate on{" "}
                    <StyledCode style={styles.inlineCode}>
                        animation.disclosure.expand
                    </StyledCode>
                    .
                </BodyText>
            </View>
        );
    },
};

const styles = StyleSheet.create({
    disclosureHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: sizing.size_160,
    },
    controls: {
        flexDirection: "row",
        gap: sizing.size_080,
        alignItems: "center",
        flexWrap: "wrap",
    },
    spacer: {
        width: sizing.size_160,
    },
    row: {
        flexDirection: "row",
        gap: sizing.size_160,
        flexWrap: "wrap",
    },
    caption: {
        color: semanticColor.core.foreground.neutral.default,
    },
    inlineCode: {
        fontFamily: "monospace",
        fontSize: "0.9em",
        padding: `0 ${sizing.size_020}`,
        borderRadius: border.radius.radius_010,
        backgroundColor: semanticColor.core.background.neutral.subtle,
    },
    stageTitle: {
        position: "absolute",
        top: sizing.size_080,
        left: sizing.size_080,
        zIndex: 1,
        color: semanticColor.core.foreground.neutral.subtle,
    },
    center: {
        position: "absolute",
        inset: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: semanticColor.core.background.overlay.default,
    },
    modalDialog: {
        width: 260,
        gap: sizing.size_120,
        padding: sizing.size_240,
        borderRadius: border.radius.radius_080,
        backgroundColor: semanticColor.core.background.base.default,
        boxShadow: boxShadow.high,
    },
    disclosure: {
        border: `1px solid ${semanticColor.core.border.neutral.subtle}`,
        borderRadius: border.radius.radius_040,
        overflow: "hidden",
    },
    caret: {
        color: semanticColor.core.foreground.neutral.strong,
    },
    caretExpanded: {
        transform: "rotate(180deg)",
    },
    disclosureGrid: {
        display: "grid",
    },
    disclosureCollapsed: {
        gridTemplateRows: "0fr",
    },
    disclosureExpanded: {
        gridTemplateRows: "1fr",
    },
    disclosureInner: {
        overflow: "hidden",
        padding: `0 ${sizing.size_160}`,
        paddingBottom: sizing.size_160,
    },
});
