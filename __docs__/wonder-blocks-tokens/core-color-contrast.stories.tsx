import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Meta, StoryObj} from "@storybook/react-vite";

import {View} from "@khanacademy/wonder-blocks-core";
import Switch from "@khanacademy/wonder-blocks-switch";
import {
    Caption,
    LabelLarge,
    LabelSmall,
} from "@khanacademy/wonder-blocks-typography";
import {
    border,
    font,
    mix,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";

import {
    flattenNestedTokens,
    maybeGetCssVariableInfo,
} from "../components/tokens-util";

/**
 * A reference grid that pairs every `semanticColor.core.background` token with
 * every `semanticColor.core.foreground` token and reports whether the pair
 * meets WCAG **Level AA** contrast.
 *
 * Background tokens are listed down the left side; foreground tokens run along
 * the bottom. Tokens with alpha (e.g. `core.background.neutral.subtle`) are
 * composited before the contrast is calculated:
 *
 * - The background is composited over `core.background.base.default` (the
 *   surface most cards/pages sit on) so the visible color includes the page
 *   underneath.
 * - The foreground is then composited over the resolved background, since
 *   that's what a reader's eye actually sees.
 *
 * Toggle **Large text** to switch the AA threshold between normal text
 * (≥ 4.5 : 1) and large text (≥ 3 : 1). Per WCAG, "large" means 18pt or
 * 14pt+ bold.
 */
export default {
    title: "Internal / Semantic Color Contrast",
    parameters: {
        chromatic: {},
    },
    tags: ["!manifest"],
} as Meta;

type FlatToken = {label: string; cssVar: string};

type TokenGroup = {
    /** Outer category, e.g. `base`, `instructive`. */
    name: string;
    /** Variants under that category, e.g. `subtle`, `default`, `strong`. */
    variants: Array<FlatToken>;
};

function flattenTokens(tokens: Record<string, unknown>): Array<FlatToken> {
    const flat = flattenNestedTokens(tokens as any);
    return Object.entries(flat).map(([label, cssVar]) => ({label, cssVar}));
}

function groupByCategory(tokens: Array<FlatToken>): Array<TokenGroup> {
    const groups = new Map<string, Array<FlatToken>>();
    for (const token of tokens) {
        const [category, ...rest] = token.label.split(".");
        const variantLabel = rest.join(".") || category;
        if (!groups.has(category)) {
            groups.set(category, []);
        }
        groups.get(category)!.push({label: variantLabel, cssVar: token.cssVar});
    }
    return Array.from(groups, ([name, variants]) => ({name, variants}));
}

const backgroundTokens: Array<FlatToken> = flattenTokens(
    semanticColor.core.background,
);
const foregroundTokens: Array<FlatToken> = flattenTokens(
    semanticColor.core.foreground,
);

const backgroundGroups = groupByCategory(backgroundTokens);
const foregroundGroups = groupByCategory(foregroundTokens);

type RGB = {r: number; g: number; b: number};

function parseRgb(value: string): RGB | null {
    if (!value) {
        return null;
    }
    const trimmed = value.trim();
    if (!trimmed || trimmed === "transparent") {
        return null;
    }

    const hex6 = trimmed.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    if (hex6) {
        return {
            r: parseInt(hex6[1], 16),
            g: parseInt(hex6[2], 16),
            b: parseInt(hex6[3], 16),
        };
    }

    const hex3 = trimmed.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
    if (hex3) {
        return {
            r: parseInt(hex3[1] + hex3[1], 16),
            g: parseInt(hex3[2] + hex3[2], 16),
            b: parseInt(hex3[3] + hex3[3], 16),
        };
    }

    const rgb = trimmed.match(
        /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i,
    );
    if (rgb) {
        return {
            r: parseFloat(rgb[1]),
            g: parseFloat(rgb[2]),
            b: parseFloat(rgb[3]),
        };
    }

    return null;
}

function relativeLuminance({r, g, b}: RGB): number {
    const channel = (c: number) => {
        const v = c / 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrastRatio(a: string, b: string): number | null {
    const aRgb = parseRgb(a);
    const bRgb = parseRgb(b);
    if (!aRgb || !bRgb) {
        return null;
    }
    const la = relativeLuminance(aRgb);
    const lb = relativeLuminance(bRgb);
    const lighter = Math.max(la, lb);
    const darker = Math.min(la, lb);
    return (lighter + 0.05) / (darker + 0.05);
}

function compositeOver(value: string, base: string): string {
    const v = (value || "").trim();
    const b = (base || "").trim();
    if (!v || v === "transparent") {
        return b;
    }
    return mix(v, b || "#ffffff");
}

function isTransparentValue(value: string | undefined): boolean {
    const v = (value || "").trim();
    return !v || v === "transparent";
}

function formatRatio(ratio: number): string {
    return ratio.toFixed(2).replace(/\.?0+$/, "");
}

type Resolved = {
    backgrounds: Record<string, string>;
    foregrounds: Record<string, string>;
    pageBase: string;
};

function resolveAll(): Resolved {
    const pageBase =
        maybeGetCssVariableInfo(semanticColor.core.background.base.default)
            .value || "#ffffff";
    return {
        backgrounds: Object.fromEntries(
            backgroundTokens.map(({label, cssVar}) => [
                label,
                maybeGetCssVariableInfo(cssVar).value || cssVar,
            ]),
        ),
        foregrounds: Object.fromEntries(
            foregroundTokens.map(({label, cssVar}) => [
                label,
                maybeGetCssVariableInfo(cssVar).value || cssVar,
            ]),
        ),
        pageBase,
    };
}

function useResolvedTokens(): Resolved | null {
    const [resolved, setResolved] = React.useState<Resolved | null>(null);

    React.useEffect(() => {
        const update = () => setResolved(resolveAll());
        update();

        const observer = new MutationObserver(update);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-wb-theme", "class"],
        });
        document.querySelectorAll("[data-wb-theme]").forEach((node) =>
            observer.observe(node, {
                attributes: true,
                attributeFilter: ["data-wb-theme"],
            }),
        );
        return () => observer.disconnect();
    }, []);

    return resolved;
}

const AA_NORMAL_THRESHOLD = 4.5;
const AA_LARGE_THRESHOLD = 3;

function thresholdFor(largeText: boolean): number {
    return largeText ? AA_LARGE_THRESHOLD : AA_NORMAL_THRESHOLD;
}

function capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

// Luminance of the two text candidates (knockout = white, neutral.strong =
// offBlack #21242c). Hardcoded so we don't have to resolve them at runtime.
const KNOCKOUT_LUMINANCE = relativeLuminance({r: 255, g: 255, b: 255});
const NEUTRAL_STRONG_LUMINANCE = relativeLuminance({r: 33, g: 36, b: 44});

function contrastWith(luminance: number, against: number): number {
    const lighter = Math.max(luminance, against);
    const darker = Math.min(luminance, against);
    return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Pick whichever text token (knockout vs neutral.strong) yields a higher
 * contrast ratio against the visible background. A simple luminance
 * threshold flips the wrong way for mid-luminance bgs like gold.
 */
function readableTextColor(visibleColor: string): string {
    const rgb = parseRgb(visibleColor);
    if (!rgb) {
        return semanticColor.core.foreground.neutral.strong;
    }
    const bgLum = relativeLuminance(rgb);
    const knockoutContrast = contrastWith(bgLum, KNOCKOUT_LUMINANCE);
    const neutralContrast = contrastWith(bgLum, NEUTRAL_STRONG_LUMINANCE);
    return neutralContrast >= knockoutContrast
        ? semanticColor.core.foreground.neutral.strong
        : semanticColor.core.foreground.knockout.default;
}

const PASS_COLOR = "#1a8a30";
const FAIL_COLOR = "#9aa0a8";

function PassIcon() {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <rect width="16" height="16" rx="3" fill={PASS_COLOR} />
            <path
                d="M4 8.2L6.7 10.8L12 5.5"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </svg>
    );
}

function FailIcon() {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <rect width="16" height="16" rx="3" fill={FAIL_COLOR} />
            <path
                d="M5 5L11 11M11 5L5 11"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

function ContrastCell({
    bgRaw,
    fgRaw,
    pageBase,
    threshold,
    largeText,
}: {
    bgRaw: string;
    fgRaw: string;
    pageBase: string;
    threshold: number;
    largeText: boolean;
}) {
    const bgEffective = compositeOver(bgRaw, pageBase);
    const fgEffective = compositeOver(fgRaw, bgEffective);
    const ratio = contrastRatio(bgEffective, fgEffective);
    if (ratio == null) {
        return null;
    }
    const passes = ratio >= threshold;
    const sizeLabel = largeText ? "AA large" : "AA";

    return (
        <View
            style={[styles.cell, !passes && styles.cellFail]}
            // eslint-disable-next-line react/forbid-component-props
            aria-label={`${formatRatio(ratio)} : 1, ${
                passes ? `passes ${sizeLabel}` : `fails ${sizeLabel}`
            }`}
        >
            <View style={styles.cellIcon}>
                {passes ? <PassIcon /> : <FailIcon />}
            </View>
            <View style={[styles.cellRatio, !passes && styles.cellRatioFail]}>
                {formatRatio(ratio)}
            </View>
        </View>
    );
}

function VariantSwatch({
    label,
    cssVar,
    resolved,
    isTransparent,
    pageBase,
}: {
    label: string;
    cssVar: string;
    resolved: string;
    isTransparent: boolean;
    pageBase: string;
}) {
    if (isTransparent) {
        return <View style={styles.swatchEmpty} aria-hidden="true" />;
    }
    // Composite over the page background so semi-transparent tokens are
    // measured against what the eye actually sees on the surface, not their
    // raw rgba (which is dominated by the underlying pigment).
    const visible = compositeOver(resolved, pageBase);
    return (
        <View
            style={[
                styles.swatch,
                {
                    backgroundColor: cssVar,
                    color: readableTextColor(visible),
                },
            ]}
        >
            <span style={styles.swatchLabel}>{capitalize(label)}</span>
        </View>
    );
}

const COL_BG_OUTER = 1;
const COL_BG_VARIANT = 2;
const FIRST_CELL_COL = 3;

const ROW_TOP_HEADING = 1;
const ROW_FIRST_BG = 2;

export const CoreContrastGrid: StoryObj = {
    render: function Render() {
        const resolved = useResolvedTokens();
        const [largeText, setLargeText] = React.useState(false);
        const threshold = thresholdFor(largeText);
        const toggleId = React.useId();

        if (!resolved) {
            return (
                <Caption style={styles.loading}>
                    Resolving theme tokens…
                </Caption>
            );
        }

        const {backgrounds, foregrounds, pageBase} = resolved;

        const numFgCols = foregroundTokens.length;
        const numBgRows = backgroundTokens.length;
        const rowFgVariants = ROW_FIRST_BG + numBgRows;
        const rowFgCategories = rowFgVariants + 1;
        const rowFgHeading = rowFgCategories + 1;

        const elements: React.ReactElement[] = [];

        // Top-left "Core Background" heading
        elements.push(
            <View
                key="bg-heading"
                style={[
                    styles.sectionHeading,
                    {
                        gridRow: ROW_TOP_HEADING,
                        gridColumn: `${COL_BG_OUTER} / span 2`,
                    },
                ]}
            >
                <LabelLarge style={styles.sectionHeadingText}>
                    Background
                </LabelLarge>
            </View>,
        );

        // BG rows
        let bgRow = ROW_FIRST_BG;
        for (const group of backgroundGroups) {
            const groupSize = group.variants.length;
            // Outer category label (rowSpan)
            elements.push(
                <View
                    key={`bg-cat-${group.name}`}
                    style={[
                        styles.outerLabel,
                        {
                            gridRow: `${bgRow} / span ${groupSize}`,
                            gridColumn: COL_BG_OUTER,
                        },
                    ]}
                >
                    <LabelSmall style={styles.outerLabelText}>
                        {capitalize(group.name)}
                    </LabelSmall>
                </View>,
            );

            for (let i = 0; i < group.variants.length; i++) {
                const variant = group.variants[i];
                const row = bgRow + i;
                const fullLabel =
                    group.name +
                    (variant.label === group.name ? "" : `.${variant.label}`);
                const resolvedBg = backgrounds[fullLabel];
                const transparent = isTransparentValue(resolvedBg);

                // Variant swatch
                elements.push(
                    <View
                        key={`bg-swatch-${fullLabel}`}
                        style={{
                            gridRow: row,
                            gridColumn: COL_BG_VARIANT,
                        }}
                    >
                        <VariantSwatch
                            label={variant.label.split(".").pop() || ""}
                            cssVar={variant.cssVar}
                            resolved={resolvedBg}
                            isTransparent={transparent}
                            pageBase={pageBase}
                        />
                    </View>,
                );

                // Cells
                if (!transparent) {
                    foregroundTokens.forEach((fg, j) => {
                        const col = FIRST_CELL_COL + j;
                        elements.push(
                            <View
                                key={`cell-${fullLabel}__${fg.label}`}
                                style={{
                                    gridRow: row,
                                    gridColumn: col,
                                }}
                            >
                                <ContrastCell
                                    bgRaw={resolvedBg}
                                    fgRaw={foregrounds[fg.label]}
                                    pageBase={pageBase}
                                    threshold={threshold}
                                    largeText={largeText}
                                />
                            </View>,
                        );
                    });
                }
            }

            bgRow += groupSize;
        }

        foregroundTokens.forEach((fg, j) => {
            const col = FIRST_CELL_COL + j;
            elements.push(
                <View
                    key={`fg-swatch-${fg.label}`}
                    style={{gridRow: rowFgVariants, gridColumn: col}}
                >
                    <VariantSwatch
                        label={fg.label.split(".").pop() || ""}
                        cssVar={fg.cssVar}
                        resolved={foregrounds[fg.label]}
                        isTransparent={isTransparentValue(
                            foregrounds[fg.label],
                        )}
                        pageBase={pageBase}
                    />
                </View>,
            );
        });

        // FG outer category labels (with col span)
        let fgCol = FIRST_CELL_COL;
        for (const group of foregroundGroups) {
            const groupSize = group.variants.length;
            elements.push(
                <View
                    key={`fg-cat-${group.name}`}
                    style={[
                        styles.outerLabel,
                        styles.fgOuterLabel,
                        {
                            gridRow: rowFgCategories,
                            gridColumn: `${fgCol} / span ${groupSize}`,
                        },
                    ]}
                >
                    <LabelSmall style={styles.outerLabelText}>
                        {capitalize(group.name)}
                    </LabelSmall>
                </View>,
            );
            fgCol += groupSize;
        }

        // "Foreground" heading centered under the FG axis
        elements.push(
            <View
                key="fg-heading"
                style={[
                    styles.sectionHeading,
                    styles.fgHeading,
                    {
                        gridRow: rowFgHeading,
                        gridColumn: `${FIRST_CELL_COL} / span ${numFgCols}`,
                    },
                ]}
            >
                <LabelLarge style={styles.sectionHeadingText}>
                    Foreground
                </LabelLarge>
            </View>,
        );

        return (
            <View style={styles.wrapper}>
                <View style={styles.toolbar}>
                    <Switch
                        id={toggleId}
                        checked={largeText}
                        onChange={setLargeText}
                        aria-labelledby={`${toggleId}-label`}
                    />
                    <label htmlFor={toggleId} id={`${toggleId}-label`}>
                        <LabelLarge style={styles.toolbarLabel}>
                            Large text (AA ≥ 3 : 1)
                        </LabelLarge>
                        <Caption style={styles.toolbarHint}>
                            {largeText
                                ? "Cells pass at ≥ 3 : 1 (18pt or 14pt+ bold)."
                                : "Cells pass at ≥ 4.5 : 1 (normal text)."}
                        </Caption>
                    </label>
                </View>
                <View
                    style={[
                        styles.grid,
                        {
                            gridTemplateColumns: `auto ${CELL_SIZE}px repeat(${numFgCols}, ${CELL_SIZE}px)`,
                            gridTemplateRows: `auto repeat(${numBgRows}, ${CELL_SIZE}px) auto auto auto`,
                        },
                    ]}
                >
                    {elements}
                </View>
            </View>
        );
    },
};

const CELL_SIZE = 64;
const SWATCH_PADDING = 4;

const styles = StyleSheet.create({
    wrapper: {
        padding: sizing.size_240,
        gap: sizing.size_240,
        background: semanticColor.core.background.base.default,
    },
    toolbar: {
        flexDirection: "row",
        alignItems: "center",
        gap: sizing.size_120,
    },
    toolbarLabel: {
        fontWeight: font.weight.bold,
        color: semanticColor.core.foreground.neutral.strong,
    },
    toolbarHint: {
        color: semanticColor.core.foreground.neutral.default,
    },
    loading: {
        padding: sizing.size_160,
    },
    grid: {
        display: "grid",
        columnGap: sizing.size_040,
        rowGap: sizing.size_040,
        alignItems: "stretch",
        justifyItems: "stretch",
        width: "fit-content",
    },
    sectionHeading: {
        justifyContent: "flex-end",
        paddingBlockEnd: sizing.size_120,
    },
    fgHeading: {
        alignItems: "center",
        justifyContent: "center",
        paddingBlockStart: sizing.size_120,
        paddingBlockEnd: 0,
    },
    sectionHeadingText: {
        fontWeight: font.weight.bold,
        color: semanticColor.core.foreground.neutral.strong,
    },
    outerLabel: {
        alignItems: "center",
        justifyContent: "center",
        paddingInline: sizing.size_120,
    },
    fgOuterLabel: {
        paddingBlockStart: sizing.size_080,
    },
    outerLabelText: {
        color: semanticColor.core.foreground.neutral.strong,
        textAlign: "center",
    },
    swatch: {
        boxSizing: "border-box",
        width: CELL_SIZE,
        height: CELL_SIZE,
        flexShrink: 0,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: border.radius.radius_010,
        padding: SWATCH_PADDING,
        boxShadow: `inset 0 0 0 1px ${semanticColor.core.border.neutral.subtle}`,
    },
    swatchLabel: {
        fontFamily: font.family.sans,
        fontWeight: font.weight.semi,
        fontSize: 12,
        lineHeight: 1,
        textAlign: "center",
    },
    swatchEmpty: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        flexShrink: 0,
    },
    cell: {
        boxSizing: "border-box",
        width: "100%",
        height: "100%",
        minHeight: CELL_SIZE,
        padding: sizing.size_080,
        alignItems: "stretch",
        justifyContent: "space-between",
        backgroundColor: semanticColor.core.background.base.default,
        borderRadius: border.radius.radius_040,
        boxShadow: `inset 0 0 0 1px ${semanticColor.core.border.neutral.subtle}`,
    },
    cellFail: {
        backgroundColor: semanticColor.core.background.base.subtle,
    },
    cellIcon: {
        alignSelf: "flex-start",
    },
    cellRatio: {
        alignSelf: "center",
        fontFamily: font.family.sans,
        fontSize: 13,
        fontWeight: font.weight.bold,
        color: semanticColor.core.foreground.neutral.strong,
        lineHeight: 1,
    },
    cellRatioFail: {
        fontWeight: font.weight.regular,
        color: semanticColor.core.foreground.neutral.subtle,
    },
});
