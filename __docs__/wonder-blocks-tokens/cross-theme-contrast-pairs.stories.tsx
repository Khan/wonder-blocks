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
    mix,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";

import {flattenNestedTokens} from "../components/tokens-util";

/**
 * Every `core.background` × `core.foreground` pair that passes WCAG **AA
 * normal text** (≥ 4.5 : 1) when resolved against the **thunderblocks**
 * theme. Each row shows the same token pair rendered in **thunderblocks** on
 * the left and **syl-dark** on the right so the two themes can be compared
 * side by side.
 *
 * Tokens with alpha are composited over `core.background.base.default` (per
 * theme) before the contrast is computed so the visible color drives the
 * decision.
 */
export default {
    title: "Internal / Cross-Theme Contrast Pairs",
    parameters: {
        chromatic: {disableSnapshot: true},
    },
    tags: ["!manifest"],
} as Meta;

type FlatToken = {label: string; cssVar: string};

function flattenTokens(tokens: Record<string, unknown>): Array<FlatToken> {
    const flat = flattenNestedTokens(tokens as any);
    return Object.entries(flat).map(([label, cssVar]) => ({label, cssVar}));
}

const backgroundTokens = flattenTokens(semanticColor.core.background);
const foregroundTokens = flattenTokens(semanticColor.core.foreground);

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

const AA_THRESHOLD = 4.5;

type ResolvedTheme = {
    backgrounds: Record<string, string>;
    foregrounds: Record<string, string>;
    pageBase: string;
};

function readThemeValues(el: HTMLElement | null): ResolvedTheme | null {
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

function ThemePreview({
    bgCssVar,
    fgCssVar,
    bgLabel,
    fgLabel,
    ratio,
    themeName,
}: {
    bgCssVar: string;
    fgCssVar: string;
    bgLabel: string;
    fgLabel: string;
    ratio: number | null;
    themeName: "thunderblocks" | "syl-dark";
}) {
    const passes = ratio != null && ratio >= AA_THRESHOLD;
    return (
        <View style={styles.previewTile}>
            {/* Only the swatch uses the target theme; the meta footer below
                stays on the default theme so its labels remain consistent. */}
            <ThemeSwitcher theme={themeName}>
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
            </ThemeSwitcher>
            <View style={styles.previewMeta}>
                <BodyText
                    tag="span"
                    size="xsmall"
                    weight="bold"
                    style={styles.previewMetaTheme}
                >
                    {themeName}
                </BodyText>
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
                <BodyText
                    tag="span"
                    size="xsmall"
                    style={styles.previewMetaToken}
                >
                    background: core.background.{bgLabel}
                </BodyText>
                <BodyText
                    tag="span"
                    size="xsmall"
                    style={styles.previewMetaToken}
                >
                    foreground: core.foreground.{fgLabel}
                </BodyText>
            </View>
        </View>
    );
}

export const PassingPairsThunderblocks: StoryObj = {
    name: "Thunderblocks ↔ SylDark",
    render: function Render() {
        const tbRef = React.useRef<HTMLDivElement>(null);
        const sdRef = React.useRef<HTMLDivElement>(null);
        const [themes, setThemes] = React.useState<{
            tb: ResolvedTheme;
            sd: ResolvedTheme;
        } | null>(null);

        React.useEffect(() => {
            const tb = readThemeValues(tbRef.current);
            const sd = readThemeValues(sdRef.current);
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

        return (
            <View style={styles.wrapper}>
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
                        <BodyText size="small">
                            {passing.length} of{" "}
                            {backgroundTokens.length * foregroundTokens.length}{" "}
                            background × foreground combinations meet ≥ 4.5 : 1
                            in thunderblocks. Each row shows the same pair in
                            syl-dark for comparison.
                        </BodyText>
                    ) : (
                        <BodyText size="small">
                            Resolving theme tokens…
                        </BodyText>
                    )}
                </View>

                <View style={styles.list}>
                    {passing.map((pair) => {
                        const sdRatio = sdRatios.get(
                            `${pair.bgLabel}__${pair.fgLabel}`,
                        );
                        const sdRaw = themes?.sd.backgrounds[pair.bgLabel];
                        const sdTransparent = isTransparentValue(sdRaw);
                        return (
                            <View
                                key={`${pair.bgLabel}__${pair.fgLabel}`}
                                style={styles.row}
                            >
                                <ThemePreview
                                    themeName="thunderblocks"
                                    bgCssVar={pair.bgCssVar}
                                    fgCssVar={pair.fgCssVar}
                                    bgLabel={pair.bgLabel}
                                    fgLabel={pair.fgLabel}
                                    ratio={pair.ratio}
                                />
                                {sdTransparent ? (
                                    <View
                                        style={[
                                            styles.previewTile,
                                            styles.previewTileEmpty,
                                        ]}
                                    >
                                        <BodyText
                                            size="small"
                                            style={styles.emptyHint}
                                        >
                                            background.{pair.bgLabel} is
                                            transparent in syl-dark; no preview.
                                        </BodyText>
                                    </View>
                                ) : (
                                    <ThemePreview
                                        themeName="syl-dark"
                                        bgCssVar={pair.bgCssVar}
                                        fgCssVar={pair.fgCssVar}
                                        bgLabel={pair.bgLabel}
                                        fgLabel={pair.fgLabel}
                                        ratio={sdRatio ?? null}
                                    />
                                )}
                            </View>
                        );
                    })}
                </View>
            </View>
        );
    },
};

const TILE_INLINE_SIZE = 360;
const SWATCH_BLOCK_SIZE = 120;

const styles = StyleSheet.create({
    wrapper: {
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
    list: {
        gap: sizing.size_160,
    },
    row: {
        flexDirection: "row",
        gap: sizing.size_160,
        flexWrap: "wrap",
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
    previewMetaTheme: {
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        color: semanticColor.core.foreground.neutral.default,
    },
    previewMetaRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: sizing.size_080,
    },
    previewMetaToken: {
        color: semanticColor.core.foreground.neutral.subtle,
    },
});
