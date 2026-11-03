import * as React from "react";
import playIcon from "@phosphor-icons/core/fill/play-fill.svg";
import pauseIcon from "@phosphor-icons/core/fill/pause-fill.svg";
import {View} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {
    animationValue,
    semanticColor,
    sizing,
    border,
    type CubicBezier,
} from "@khanacademy/wonder-blocks-tokens";

// Timing for the looping meter: a short delay, the eased rise, then a pause
// at the end before it snaps back and repeats. The delay and end pause are
// composed from the `duration` primitives so the demo dogfoods the tokens.
// Uses `animationValue` (raw ms numbers) rather than `animation` (CSS var
// strings) so we can do the maths.
const LOOP_START_DELAY_MS = animationValue.duration.long; // 300ms
const LOOP_END_PAUSE_MS =
    animationValue.duration.long + animationValue.duration.xLong; // 700ms
// The default duration of the eased rise, used when no `duration` is given.
const DEFAULT_MOVE_MS = animationValue.duration.xxLong; // 1100ms

/**
 * A small SVG that plots a cubic-bézier easing curve from its raw control
 * points, so the shape of each easing token is visible at a glance. A rounded
 * bar just right of the box grows upward, its height tracking the animation's
 * eased output value, to make the token's motion legible.
 */
export function EasingCurve({
    easing,
    size = 120,
    duration = DEFAULT_MOVE_MS,
}: {
    easing: CubicBezier;
    /**
     * The height of the (square) curve box, in pixels. The component is a
     * little wider than this to fit the output meter and its gap on the left.
     * Defaults to 120.
     */
    size?: number;
    /**
     * The duration, in milliseconds, of the eased rise in the looping meter.
     * Presets in the semantic tokens carry their own duration, so the meter
     * can animate at the preset's real speed. Defaults to 1100ms (the
     * `duration.xxLong` primitive) for the easing primitives, which have no
     * duration of their own.
     */
    duration?: number;
}): React.ReactElement {
    // A short delay, the eased rise (`duration`), then a pause before it snaps
    // back and repeats.
    const loopTotalMs = LOOP_START_DELAY_MS + duration + LOOP_END_PAUSE_MS;
    const gridSize = size / 5;
    // Unique per instance so the 11 curves' pattern <defs> don't collide.
    const gridId = React.useId();
    // The eased "output" meter: a rounded bar just right of the box that grows
    // upward with the animation's progress. In px so it can drive the SVG
    // geometry directly, and factored into the component's full width below.
    const barWidth = 8;
    const barGap = 8;
    // Both SVGs (the curve and the meter) loop via SMIL, which auto-plays. We
    // drive each one's clock with pause/unpauseAnimations so they start paused,
    // stay in sync, and the button toggles them together.
    const svgRef = React.useRef<SVGSVGElement>(null);
    const barRef = React.useRef<SVGSVGElement>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    React.useEffect(() => {
        for (const svg of [svgRef.current, barRef.current]) {
            if (!svg) {
                continue;
            }
            if (isPlaying) {
                svg.unpauseAnimations();
            } else {
                svg.pauseAnimations();
            }
        }
    }, [isPlaying]);
    const yOffset = 1; // keeps the path from being cut off by the svg bounds
    const [x1, y1, x2, y2] = easing;
    // Fractions of the total loop where the eased move starts/ends, so the bar
    // holds still during the start delay and the end pause.
    const moveStart = LOOP_START_DELAY_MS / loopTotalMs;
    const moveEnd = (LOOP_START_DELAY_MS + duration) / loopTotalMs;
    // SVG y grows downward, so flip the y coordinates (0 → bottom, 1 → top).
    const path = `M0,${size - yOffset} C${x1 * size},${
        size - y1 * size
    } ${x2 * size},${size - y2 * size} ${size}, ${yOffset}`;
    // Shared SMIL timing for the meter: hold, ease up, hold — repeating.
    const dur = `${loopTotalMs}ms`;
    const keyTimes = `0;${moveStart};${moveEnd};1`;
    const keySplines = `0 0 1 1;${x1} ${y1} ${x2} ${y2};0 0 1 1`;
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "flex-end",
                gap: barGap,
                // The meter + gap live outside the box, so the component is
                // wider than the (square) box by exactly that much.
                width: size + barGap + barWidth,
                flexShrink: 0,
            }}
        >
            <View
                style={{
                    background: semanticColor.core.background.base.subtle,
                    border: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
                    borderRadius: border.radius.radius_080,
                    flexShrink: 0,
                    width: size,
                    overflow: "hidden",
                }}
            >
                <svg
                    ref={svgRef}
                    width={size}
                    height={size}
                    viewBox={`0 0 ${size} ${size}`}
                    aria-hidden={true}
                >
                    <defs>
                        <pattern
                            id={gridId}
                            width={gridSize}
                            height={gridSize}
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d={`M${gridSize} 0 H0 V${gridSize}`}
                                fill="none"
                                stroke={
                                    semanticColor.core.border.neutral.subtle
                                }
                                strokeDasharray={"3,2"}
                                strokeWidth={1}
                            />
                        </pattern>
                    </defs>
                    <rect width={size} height={size} fill={`url(#${gridId})`} />
                    <path
                        d={path}
                        fill="none"
                        stroke={
                            semanticColor.core.foreground.instructive.default
                        }
                        strokeWidth={border.width.medium}
                    />
                </svg>
                <IconButton
                    icon={isPlaying ? pauseIcon : playIcon}
                    aria-label={
                        isPlaying ? "Pause animation" : "Play animation"
                    }
                    kind="secondary"
                    size="small"
                    onClick={() => setIsPlaying((playing) => !playing)}
                    style={{
                        position: "absolute",
                        insetBlockEnd: sizing.size_040,
                        insetInlineEnd: sizing.size_040,
                    }}
                />
            </View>
            {/* The output meter: a rounded bar that grows upward, its height
                tracking the eased output value. Growing a rect (rather than
                moving a dot) sidesteps any center-of-dot maths and clipping. */}
            <svg
                ref={barRef}
                width={barWidth}
                height={size}
                viewBox={`0 0 ${barWidth} ${size}`}
                aria-hidden={true}
            >
                <rect
                    x={0}
                    width={barWidth}
                    rx={barWidth / 2}
                    fill={semanticColor.core.foreground.instructive.default}
                    y={size}
                    height={0}
                >
                    {/* Grow upward: `height` eases 0 → full while `y` eases from
                        the bottom up, so the bar's foot stays pinned. */}
                    <animate
                        attributeName="height"
                        dur={dur}
                        repeatCount="indefinite"
                        calcMode="spline"
                        keyTimes={keyTimes}
                        keySplines={keySplines}
                        values={`0;0;${size};${size}`}
                    />
                    <animate
                        attributeName="y"
                        dur={dur}
                        repeatCount="indefinite"
                        calcMode="spline"
                        keyTimes={keyTimes}
                        keySplines={keySplines}
                        values={`${size};${size};0;0`}
                    />
                </rect>
            </svg>
        </View>
    );
}
