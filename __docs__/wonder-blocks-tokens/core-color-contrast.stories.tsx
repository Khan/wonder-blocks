/* eslint-disable max-lines */
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Meta, StoryObj} from "@storybook/react-vite";

import checkCircleFillIcon from "@phosphor-icons/core/fill/check-circle-fill.svg";
import xCircleFillIcon from "@phosphor-icons/core/fill/x-circle-fill.svg";

import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {ThemeSwitcher} from "@khanacademy/wonder-blocks-theming";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {
    border,
    font,
    mix,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";

import {color as thunderblocksPrimitives} from "../../packages/wonder-blocks-tokens/src/theme/semantic/internal/primitive-color-thunderblocks";
import {
    flattenNestedTokens,
    maybeGetCssVariableInfo,
} from "../components/tokens-util";

/**
 * Stories that visualize WCAG **Level AA** contrast between every
 * `semanticColor.core.background` token and every
 * `semanticColor.core.foreground` token.
 *
 * Tokens with alpha (e.g. `core.background.neutral.subtle`) are composited
 * over `core.background.base.default` (per theme) before contrast is
 * computed, so the visible color drives the decision.
 */
export default {
    title: "Internal / Semantic Color Contrast",
    parameters: {
        chromatic: {},
    },
    tags: ["!manifest"],
} as Meta;

// ---------------------------------------------------------------------------
// Shared utilities
// ---------------------------------------------------------------------------

const AA_THRESHOLD = 4.5;

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

function capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function normalizeColorString(value: string): string {
    return (value || "").trim().toLowerCase().replace(/\s+/g, "");
}

/**
 * Reverse map from a primitive's color value to its primitive name (e.g.
 * "#ffffff" → "white_100"). Both Thunderblocks and Syl-Dark draw from this
 * same primitive palette.
 */
const PRIMITIVE_BY_VALUE = new Map<string, string>(
    Object.entries(thunderblocksPrimitives).map(([name, value]) => [
        normalizeColorString(value),
        name,
    ]),
);

function lookupPrimitiveName(value: string | undefined): string | null {
    if (!value) {
        return null;
    }
    return PRIMITIVE_BY_VALUE.get(normalizeColorString(value)) ?? null;
}

type ResolvedTheme = {
    backgrounds: Record<string, string>;
    foregrounds: Record<string, string>;
    pageBase: string;
};

/** Resolve every bg / fg token against the active theme on the document. */
function resolveActiveTheme(): ResolvedTheme {
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

/** Resolve every bg / fg token using the CSS-var scope of `el`. */
function resolveScopedTheme(el: HTMLElement | null): ResolvedTheme | null {
    if (!el) {
        return null;
    }
    const cs = getComputedStyle(el);
    const resolve = (cssVar: string) => {
        const match = cssVar.match(/^var\((--[^,)]+)/);
        if (!match) {
            return cssVar;
        }
        return cs.getPropertyValue(match[1]).trim() || cssVar;
    };
    return {
        backgrounds: Object.fromEntries(
            backgroundTokens.map(({label, cssVar}) => [label, resolve(cssVar)]),
        ),
        foregrounds: Object.fromEntries(
            foregroundTokens.map(({label, cssVar}) => [label, resolve(cssVar)]),
        ),
        pageBase:
            resolve(semanticColor.core.background.base.default) || "#ffffff",
    };
}

/** Read the current document-level theme and re-resolve when it changes. */
function useResolvedActiveTheme(): ResolvedTheme | null {
    const [resolved, setResolved] = React.useState<ResolvedTheme | null>(null);

    React.useEffect(() => {
        const update = () => setResolved(resolveActiveTheme());
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

type ResolvedPair = {
    bgLabel: string;
    fgLabel: string;
    bgCssVar: string;
    fgCssVar: string;
    bgRaw: string;
    fgRaw: string;
    bgVisible: string;
    fgVisible: string;
    ratio: number;
};

function buildResolvedPairs(theme: ResolvedTheme): Array<ResolvedPair> {
    const pairs: Array<ResolvedPair> = [];
    for (const bg of backgroundTokens) {
        const bgRaw = theme.backgrounds[bg.label];
        if (isTransparentValue(bgRaw)) {
            continue;
        }
        const bgVisible = compositeOver(bgRaw, theme.pageBase);
        for (const fg of foregroundTokens) {
            const fgRaw = theme.foregrounds[fg.label];
            const fgVisible = compositeOver(fgRaw, bgVisible);
            const ratio = contrastRatio(bgVisible, fgVisible);
            if (ratio == null) {
                continue;
            }
            pairs.push({
                bgLabel: bg.label,
                fgLabel: fg.label,
                bgCssVar: bg.cssVar,
                fgCssVar: fg.cssVar,
                bgRaw,
                fgRaw,
                bgVisible,
                fgVisible,
                ratio,
            });
        }
    }
    return pairs;
}

// ---------------------------------------------------------------------------
// Story 1: Foreground × Background grid
// ---------------------------------------------------------------------------

function ContrastCell({
    bgRaw,
    fgRaw,
    pageBase,
}: {
    bgRaw: string;
    fgRaw: string;
    pageBase: string;
}) {
    const bgEffective = compositeOver(bgRaw, pageBase);
    const fgEffective = compositeOver(fgRaw, bgEffective);
    const ratio = contrastRatio(bgEffective, fgEffective);
    if (ratio == null) {
        return null;
    }
    const passes = ratio >= AA_THRESHOLD;

    return (
        <View
            style={[styles.cell, !passes && styles.cellFail]}
            // eslint-disable-next-line react/forbid-component-props
            aria-label={`${formatRatio(ratio)} : 1, ${
                passes ? "passes AA" : "fails AA"
            }`}
        >
            <PhosphorIcon
                icon={passes ? checkCircleFillIcon : xCircleFillIcon}
                size="small"
                color={
                    passes
                        ? semanticColor.core.foreground.success.default
                        : semanticColor.core.foreground.neutral.subtle
                }
                aria-hidden={true}
            />
            <BodyText
                tag="span"
                size="small"
                weight={passes ? "bold" : "medium"}
                style={[styles.cellRatio, !passes && styles.cellRatioFail]}
            >
                {formatRatio(ratio)}
            </BodyText>
        </View>
    );
}

function VariantSwatch({
    label,
    cssVar,
    isTransparent,
}: {
    label: string;
    cssVar: string;
    isTransparent: boolean;
}) {
    if (isTransparent) {
        return (
            <View style={[styles.swatch, styles.swatchTransparent]}>
                <BodyText
                    tag="span"
                    size="xsmall"
                    weight="semi"
                    style={styles.swatchLabel}
                >
                    {capitalize(label)}
                </BodyText>
            </View>
        );
    }
    return (
        <View
            style={[
                styles.swatch,
                {
                    backgroundColor: cssVar,
                    // Native CSS picks black or white based on the bg's
                    // luminance, including alpha-blended values.
                    color: `contrast-color(${cssVar})`,
                },
            ]}
        >
            <BodyText
                tag="span"
                size="xsmall"
                weight="semi"
                style={styles.swatchLabel}
            >
                {capitalize(label)}
            </BodyText>
        </View>
    );
}

const COL_BG_OUTER = 1;
const COL_BG_VARIANT = 2;
const FIRST_CELL_COL = 3;

const ROW_TOP_HEADING = 1;
const ROW_FIRST_BG = 2;

const CELL_SIZE = 64;

export const ForegroundOnBackground: StoryObj = {
    render: function Render() {
        const resolved = useResolvedActiveTheme();

        if (!resolved) {
            return (
                <BodyText size="small" style={styles.loading}>
                    Resolving theme tokens…
                </BodyText>
            );
        }

        const {backgrounds, foregrounds, pageBase} = resolved;

        const numFgCols = foregroundTokens.length;
        const numBgRows = backgroundTokens.length;
        const rowFgVariants = ROW_FIRST_BG + numBgRows;
        const rowFgCategories = rowFgVariants + 1;
        const rowFgHeading = rowFgCategories + 1;

        const elements: React.ReactElement[] = [];

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
                <BodyText
                    tag="span"
                    size="medium"
                    weight="bold"
                    style={styles.sectionHeadingText}
                >
                    Background
                </BodyText>
            </View>,
        );

        let bgRow = ROW_FIRST_BG;
        for (const group of backgroundGroups) {
            const groupSize = group.variants.length;
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
                    <BodyText
                        tag="span"
                        size="small"
                        style={styles.outerLabelText}
                    >
                        {capitalize(group.name)}
                    </BodyText>
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
                            isTransparent={transparent}
                        />
                    </View>,
                );

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
                        isTransparent={isTransparentValue(
                            foregrounds[fg.label],
                        )}
                    />
                </View>,
            );
        });

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
                    <BodyText
                        tag="span"
                        size="small"
                        style={styles.outerLabelText}
                    >
                        {capitalize(group.name)}
                    </BodyText>
                </View>,
            );
            fgCol += groupSize;
        }

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
                <BodyText
                    tag="span"
                    size="medium"
                    weight="bold"
                    style={styles.sectionHeadingText}
                >
                    Foreground
                </BodyText>
            </View>,
        );

        return (
            <View style={styles.wrapper}>
                <View
                    style={[
                        styles.grid,
                        {
                            gridTemplateColumns: `max-content ${CELL_SIZE}px repeat(${numFgCols}, ${CELL_SIZE}px)`,
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

export const SylLightForegroundOnBackground = {
    ...ForegroundOnBackground,
    globals: {
        theme: "thunderblocks",
    },
};

export const SylDarkForegroundOnBackground = {
    ...ForegroundOnBackground,
    globals: {
        theme: "syl-dark",
    },
};

// ---------------------------------------------------------------------------
// Story 2: Cross-theme passing pairs (Thunderblocks vs Syl-Dark)
// ---------------------------------------------------------------------------

function TokenRow({
    kind,
    tokenName,
    value,
}: {
    kind: "bg" | "fg";
    tokenName: string;
    value: string | undefined;
}) {
    const trimmed = value?.trim() ?? "";
    const primitive = lookupPrimitiveName(trimmed);
    return (
        <>
            <BodyText
                tag="span"
                size="xsmall"
                weight="bold"
                style={styles.tokenCellKind}
            >
                {kind}
            </BodyText>
            <BodyText tag="span" size="xsmall" style={styles.tokenCellName}>
                {tokenName}
            </BodyText>
            <BodyText tag="span" size="xsmall" style={styles.tokenCellMono}>
                {primitive ?? "—"}
            </BodyText>
            <BodyText tag="span" size="xsmall" style={styles.tokenCellMono}>
                {trimmed || "—"}
            </BodyText>
        </>
    );
}

function ThemePreview({
    bgCssVar,
    fgCssVar,
    bgLabel,
    fgLabel,
    bgValue,
    fgValue,
    ratio,
    highlightFailing = false,
}: {
    bgCssVar: string;
    fgCssVar: string;
    bgLabel: string;
    fgLabel: string;
    /** The actual color string the bg CSS var resolves to in this theme. */
    bgValue: string | undefined;
    /** The actual color string the fg CSS var resolves to in this theme. */
    fgValue: string | undefined;
    ratio: number | null;
    /** When true, draws the bright-red outline if the pair fails AA. */
    highlightFailing?: boolean;
}) {
    const passes = ratio != null && ratio >= AA_THRESHOLD;
    return (
        <View
            style={[
                styles.previewTile,
                highlightFailing && !passes && styles.previewTileFailing,
            ]}
        >
            <View
                style={[
                    styles.previewSwatch,
                    {backgroundColor: bgCssVar, color: fgCssVar},
                ]}
            >
                <BodyText
                    tag="span"
                    size="medium"
                    weight="bold"
                    style={styles.previewSampleHeading}
                >
                    Aa Bb Cc
                </BodyText>
                <BodyText
                    tag="span"
                    size="small"
                    style={styles.previewSampleBody}
                >
                    The quick brown fox jumps.
                </BodyText>
            </View>
            <View style={styles.previewMeta}>
                <View style={styles.previewMetaRow}>
                    <PhosphorIcon
                        icon={passes ? checkCircleFillIcon : xCircleFillIcon}
                        size="small"
                        color={
                            passes
                                ? semanticColor.core.foreground.success.default
                                : semanticColor.core.foreground.neutral.subtle
                        }
                        aria-hidden={true}
                    />
                    <BodyText tag="span" size="xsmall">
                        {ratio == null
                            ? "no value"
                            : `${formatRatio(ratio)} : 1`}{" "}
                        · {passes ? "passes AA" : "fails AA"}
                    </BodyText>
                </View>
                <View style={styles.tokenTable}>
                    <TokenRow
                        kind="bg"
                        tokenName={`core.background.${bgLabel}`}
                        value={bgValue}
                    />
                    <TokenRow
                        kind="fg"
                        tokenName={`core.foreground.${fgLabel}`}
                        value={fgValue}
                    />
                </View>
            </View>
        </View>
    );
}

export const PassingPairsThunderblocks: StoryObj = {
    name: "Thunderblocks ↔ SylDark",
    parameters: {
        chromatic: {disableSnapshot: true},
    },
    render: function Render() {
        const tbRef = React.useRef<HTMLDivElement>(null);
        const sdRef = React.useRef<HTMLDivElement>(null);
        const [themes, setThemes] = React.useState<{
            tb: ResolvedTheme;
            sd: ResolvedTheme;
        } | null>(null);

        React.useEffect(() => {
            const tb = resolveScopedTheme(tbRef.current);
            const sd = resolveScopedTheme(sdRef.current);
            if (tb && sd) {
                setThemes({tb, sd});
            }
        }, []);

        const passing = React.useMemo(() => {
            if (!themes) {
                return [];
            }
            return buildResolvedPairs(themes.tb).filter(
                (pair) => pair.ratio >= AA_THRESHOLD,
            );
        }, [themes]);

        const sdRatios = React.useMemo(() => {
            if (!themes) {
                return new Map<string, number | null>();
            }
            const map = new Map<string, number | null>();
            for (const pair of passing) {
                const bgRaw = themes.sd.backgrounds[pair.bgLabel];
                const fgRaw = themes.sd.foregrounds[pair.fgLabel];
                if (isTransparentValue(bgRaw)) {
                    map.set(`${pair.bgLabel}__${pair.fgLabel}`, null);
                    continue;
                }
                const bgVisible = compositeOver(bgRaw, themes.sd.pageBase);
                const fgVisible = compositeOver(fgRaw, bgVisible);
                map.set(
                    `${pair.bgLabel}__${pair.fgLabel}`,
                    contrastRatio(bgVisible, fgVisible),
                );
            }
            return map;
        }, [themes, passing]);

        const sdFailingCount = React.useMemo(() => {
            let n = 0;
            for (const ratio of sdRatios.values()) {
                if (ratio == null || ratio < AA_THRESHOLD) {
                    n++;
                }
            }
            return n;
        }, [sdRatios]);

        return (
            <View style={styles.crossThemeWrapper}>
                {/* Hidden helpers used to read each theme's CSS variables. */}
                <View style={styles.hiddenProbe}>
                    <ThemeSwitcher theme="thunderblocks">
                        <div ref={tbRef} />
                    </ThemeSwitcher>
                    <ThemeSwitcher theme="syl-dark">
                        <div ref={sdRef} />
                    </ThemeSwitcher>
                </View>

                <View style={styles.summary}>
                    <BodyText size="medium" weight="bold">
                        Passing AA pairs in thunderblocks
                    </BodyText>
                    {themes ? (
                        <>
                            <BodyText size="small">
                                {passing.length} of{" "}
                                {backgroundTokens.length *
                                    foregroundTokens.length}{" "}
                                background × foreground combinations meet ≥ 4.5
                                : 1 in thunderblocks. Each row shows the same
                                pair in syl-dark for comparison.
                            </BodyText>
                            <BodyText size="small">
                                {sdFailingCount} of those {passing.length} pair
                                {passing.length === 1 ? "" : "s"} fall below 4.5
                                : 1 (or use a transparent background) in
                                syl-dark.
                            </BodyText>
                        </>
                    ) : (
                        <BodyText size="small">
                            Resolving theme tokens…
                        </BodyText>
                    )}
                </View>

                <View style={styles.split}>
                    <ThemeSwitcher theme="thunderblocks">
                        <View style={styles.lightPanel}>
                            <View style={styles.headerCell}>
                                <BodyText
                                    tag="span"
                                    size="medium"
                                    weight="bold"
                                    style={styles.headerText}
                                >
                                    Thunderblocks (SYL Light)
                                </BodyText>
                            </View>
                            {passing.map((pair) => (
                                <ThemePreview
                                    key={`${pair.bgLabel}__${pair.fgLabel}`}
                                    bgCssVar={pair.bgCssVar}
                                    fgCssVar={pair.fgCssVar}
                                    bgLabel={pair.bgLabel}
                                    fgLabel={pair.fgLabel}
                                    bgValue={pair.bgRaw}
                                    fgValue={pair.fgRaw}
                                    ratio={pair.ratio}
                                />
                            ))}
                        </View>
                    </ThemeSwitcher>
                    <ThemeSwitcher theme="syl-dark">
                        <View style={styles.darkPanel}>
                            <View style={styles.darkRow}>
                                <View style={styles.headerCell}>
                                    <BodyText
                                        tag="span"
                                        size="medium"
                                        weight="bold"
                                        style={styles.headerText}
                                    >
                                        SYL Dark
                                    </BodyText>
                                </View>
                                <View
                                    style={[
                                        styles.headerCell,
                                        styles.failingSlot,
                                    ]}
                                >
                                    <BodyText
                                        tag="span"
                                        size="medium"
                                        weight="bold"
                                        style={styles.headerText}
                                    >
                                        Combinations in SYL Dark with contrast
                                        issues
                                    </BodyText>
                                </View>
                            </View>
                            {passing.map((pair) => {
                                const sdRatio = sdRatios.get(
                                    `${pair.bgLabel}__${pair.fgLabel}`,
                                );
                                const sdRaw =
                                    themes?.sd.backgrounds[pair.bgLabel];
                                const sdTransparent = isTransparentValue(sdRaw);
                                const sdFails =
                                    sdTransparent ||
                                    sdRatio == null ||
                                    sdRatio < AA_THRESHOLD;
                                const renderSyldarkTile = (
                                    highlightFailing: boolean,
                                ) =>
                                    sdTransparent ? (
                                        <View
                                            style={[
                                                styles.previewTile,
                                                styles.previewTileEmpty,
                                                highlightFailing &&
                                                    styles.previewTileFailing,
                                            ]}
                                        >
                                            <BodyText
                                                size="small"
                                                style={styles.emptyHint}
                                            >
                                                background.{pair.bgLabel} is
                                                transparent in syl-dark; no
                                                preview.
                                            </BodyText>
                                        </View>
                                    ) : (
                                        <ThemePreview
                                            bgCssVar={pair.bgCssVar}
                                            fgCssVar={pair.fgCssVar}
                                            bgLabel={pair.bgLabel}
                                            fgLabel={pair.fgLabel}
                                            bgValue={
                                                themes?.sd.backgrounds[
                                                    pair.bgLabel
                                                ]
                                            }
                                            fgValue={
                                                themes?.sd.foregrounds[
                                                    pair.fgLabel
                                                ]
                                            }
                                            ratio={sdRatio ?? null}
                                            highlightFailing={highlightFailing}
                                        />
                                    );
                                return (
                                    <View
                                        key={`${pair.bgLabel}__${pair.fgLabel}`}
                                        style={styles.darkRow}
                                    >
                                        {renderSyldarkTile(false)}
                                        <View style={styles.failingSlot}>
                                            {sdFails
                                                ? renderSyldarkTile(true)
                                                : null}
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                    </ThemeSwitcher>
                </View>
            </View>
        );
    },
};

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const TILE_INLINE_SIZE = 420;
const SWATCH_BLOCK_SIZE = 120;

const swatchOutline = `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`;

const styles = StyleSheet.create({
    // --- Shared ---
    wrapper: {
        padding: sizing.size_240,
        backgroundColor: semanticColor.core.background.base.default,
    },
    loading: {
        padding: sizing.size_160,
    },

    // --- ForegroundOnBackground grid ---
    grid: {
        display: "grid",
        columnGap: sizing.size_040,
        rowGap: sizing.size_040,
        alignItems: "stretch",
        justifyItems: "stretch",
        inlineSize: "fit-content",
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
        whiteSpace: "nowrap",
    },
    swatch: {
        boxSizing: "border-box",
        inlineSize: CELL_SIZE,
        blockSize: CELL_SIZE,
        flexShrink: 0,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: border.radius.radius_010,
        padding: sizing.size_040,
        border: swatchOutline,
    },
    swatchLabel: {
        textAlign: "center",
    },
    swatchTransparent: {
        backgroundColor: semanticColor.core.background.base.default,
        backgroundImage: `conic-gradient(${semanticColor.core.background.neutral.subtle} 25%, transparent 0 50%, ${semanticColor.core.background.neutral.subtle} 0 75%, transparent 0)`,
        backgroundSize: `${sizing.size_080} ${sizing.size_080}`,
        color: semanticColor.core.foreground.neutral.strong,
    },
    cell: {
        boxSizing: "border-box",
        inlineSize: "100%",
        blockSize: "100%",
        minBlockSize: CELL_SIZE,
        padding: sizing.size_080,
        gap: sizing.size_040,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: semanticColor.core.background.base.default,
        borderRadius: border.radius.radius_040,
        border: swatchOutline,
    },
    cellFail: {
        backgroundColor: semanticColor.core.background.base.subtle,
    },
    cellRatio: {
        color: semanticColor.core.foreground.neutral.strong,
        textAlign: "center",
    },
    cellRatioFail: {
        color: semanticColor.core.foreground.neutral.subtle,
    },

    // --- Cross-theme story ---
    crossThemeWrapper: {
        padding: sizing.size_240,
        gap: sizing.size_240,
        backgroundColor: semanticColor.core.background.base.default,
    },
    hiddenProbe: {
        position: "absolute",
        inlineSize: 0,
        blockSize: 0,
        overflow: "hidden",
        visibility: "hidden",
    },
    summary: {
        gap: sizing.size_080,
        maxInlineSize: 720,
    },
    split: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: sizing.size_160,
    },
    lightPanel: {
        // Mirrors the dark panel's spacing so rows on each side align,
        // but with no backdrop — the page background shows through.
        gap: sizing.size_160,
        padding: sizing.size_160,
        borderRadius: border.radius.radius_080,
    },
    darkPanel: {
        gap: sizing.size_160,
        padding: sizing.size_160,
        borderRadius: border.radius.radius_080,
        // Resolves to syl-dark's page background since this panel is wrapped
        // in <ThemeSwitcher theme="syl-dark">.
        backgroundColor: semanticColor.core.background.base.default,
    },
    darkRow: {
        flexDirection: "row",
        alignItems: "stretch",
        gap: sizing.size_160,
    },
    failingSlot: {
        inlineSize: TILE_INLINE_SIZE,
        flexShrink: 0,
    },
    headerCell: {
        inlineSize: TILE_INLINE_SIZE,
        flexShrink: 0,
        paddingBlockEnd: sizing.size_080,
    },
    headerText: {
        color: semanticColor.core.foreground.neutral.strong,
    },
    previewTile: {
        boxSizing: "border-box",
        inlineSize: TILE_INLINE_SIZE,
        borderRadius: border.radius.radius_080,
        border: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
        overflow: "hidden",
        backgroundColor: semanticColor.core.background.base.subtle,
    },
    previewTileEmpty: {
        alignItems: "center",
        justifyContent: "center",
        padding: sizing.size_160,
        minBlockSize: SWATCH_BLOCK_SIZE,
    },
    previewTileFailing: {
        // Outline (not border) so the layout doesn't shift, drawing a bright
        // ring around any tile that doesn't meet AA in its theme.
        outline: `${border.width.thick} solid ${semanticColor.core.border.critical.strong}`,
    },
    emptyHint: {
        color: semanticColor.core.foreground.neutral.subtle,
        textAlign: "center",
    },
    previewSwatch: {
        gap: sizing.size_080,
        padding: sizing.size_160,
        minBlockSize: SWATCH_BLOCK_SIZE,
        justifyContent: "center",
    },
    previewSampleHeading: {
        // Inherit text color from the swatch's `color` (the foreground token).
        color: "inherit",
    },
    previewSampleBody: {
        color: "inherit",
    },
    previewMeta: {
        gap: sizing.size_040,
        padding: sizing.size_120,
        borderBlockStart: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
        backgroundColor: semanticColor.core.background.base.default,
    },
    previewMetaRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: sizing.size_080,
    },
    tokenTable: {
        display: "grid",
        // The token-name column uses minmax(0, 1fr) so it shrinks (and
        // ellipsizes) instead of overflowing past the meta's right padding
        // when the path is long.
        gridTemplateColumns: "auto minmax(0, 1fr) auto auto",
        columnGap: sizing.size_120,
        rowGap: sizing.size_040,
        alignItems: "baseline",
    },
    tokenCellKind: {
        color: semanticColor.core.foreground.neutral.subtle,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
    },
    tokenCellName: {
        color: semanticColor.core.foreground.neutral.strong,
        minInlineSize: 0,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    tokenCellMono: {
        fontFamily: font.family.mono,
        color: semanticColor.core.foreground.neutral.default,
        whiteSpace: "nowrap",
    },
});
