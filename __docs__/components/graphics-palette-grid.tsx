import * as React from "react";
import {StyleSheet} from "aphrodite";

import {StyleType, View} from "@khanacademy/wonder-blocks-core";
import {
    border,
    graphicsPalette,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {CopyButton} from "./copy-button";
import {maybeGetCssVariableInfo} from "./tokens-util";

type PaletteName = keyof typeof graphicsPalette;

const BLACK: PaletteName = "black_100";
const WHITE: PaletteName = "white_100";

/**
 * Get the numeric step of a palette token (e.g. `red_05` -> 5).
 */
const getStep = (name: PaletteName) => Number(name.split("_")[1]);

/**
 * The palette's hues (red, orange, …) with their tokens, ordered from dark to
 * light. Black and white are shown separately, as their own columns.
 */
const hueRows = Object.keys(graphicsPalette)
    .filter((name): name is PaletteName => name !== BLACK && name !== WHITE)
    .reduce<Array<[string, Array<PaletteName>]>>((rows, name) => {
        const hue = name.split("_")[0];
        const row = rows.find(([rowHue]) => rowHue === hue);
        if (row) {
            row[1].push(name);
        } else {
            rows.push([hue, [name]]);
        }
        return rows;
    }, [])
    .map(([hue, names]): [string, Array<PaletteName>] => [
        hue,
        [...names].sort((a, b) => getStep(a) - getStep(b)),
    ]);

const steps = hueRows[0][1].map(getStep);

// Black and white are the ends of every hue's scale, labeled like Figma.
const columnLabels = ["0", ...steps.map(String), "100"];

type SwatchProps = {
    name: PaletteName;
    style?: StyleType;
};

/**
 * A palette color with its hex value and a button to copy its token name.
 */
function PaletteSwatch({name, style}: SwatchProps) {
    const value = graphicsPalette[name];
    const hex = maybeGetCssVariableInfo(value).value;

    return (
        <View style={[styles.cell, style]}>
            <View style={[styles.swatch, {backgroundColor: value}]}>
                <CopyButton
                    value={`graphicsPalette.${name}`}
                    kind="secondary"
                    style={styles.copyButton}
                />
            </View>
            <BodyText size="xsmall" style={styles.hex}>
                {hex}
            </BodyText>
        </View>
    );
}

/**
 * Show the graphics palette as a grid of hues (rows) by steps (columns), with
 * black and white at the ends, matching the palette's layout in Figma.
 *
 * Each swatch has a button that copies its token name (e.g.
 * `graphicsPalette.red_30`).
 */
export function GraphicsPaletteGrid() {
    const rowSpan = `2 / span ${hueRows.length}`;

    return (
        <View style={styles.scrollContainer}>
            <View
                style={[
                    styles.grid,
                    {
                        gridTemplateColumns: `max-content repeat(${columnLabels.length}, minmax(${CELL_MIN_WIDTH}px, 1fr))`,
                    },
                ]}
            >
                {columnLabels.map((label, index) => (
                    <BodyText
                        key={label}
                        size="small"
                        style={[
                            styles.columnLabel,
                            {gridColumn: index + 2, gridRow: 1},
                        ]}
                    >
                        {label}
                    </BodyText>
                ))}

                <PaletteSwatch
                    name={BLACK}
                    style={{gridColumn: 2, gridRow: rowSpan}}
                />

                {hueRows.map(([hue, names], rowIndex) => (
                    <React.Fragment key={hue}>
                        <BodyText
                            size="small"
                            style={[
                                styles.rowLabel,
                                {gridColumn: 1, gridRow: rowIndex + 2},
                            ]}
                        >
                            {hue}
                        </BodyText>
                        {names.map((name, columnIndex) => (
                            <PaletteSwatch
                                key={name}
                                name={name}
                                style={{
                                    gridColumn: columnIndex + 3,
                                    gridRow: rowIndex + 2,
                                }}
                            />
                        ))}
                    </React.Fragment>
                ))}

                <PaletteSwatch
                    name={WHITE}
                    style={{
                        gridColumn: columnLabels.length + 1,
                        gridRow: rowSpan,
                    }}
                />
            </View>
        </View>
    );
}

const CELL_MIN_WIDTH = 56;

const styles = StyleSheet.create({
    scrollContainer: {
        overflowX: "auto",
        paddingBlock: sizing.size_080,
    },
    grid: {
        display: "grid",
        columnGap: sizing.size_060,
        rowGap: sizing.size_120,
        alignItems: "stretch",
        minInlineSize: "fit-content",
    },
    columnLabel: {
        textAlign: "center",
    },
    rowLabel: {
        alignSelf: "center",
        textAlign: "end",
        textTransform: "capitalize",
        paddingInlineEnd: sizing.size_080,
    },
    cell: {
        gap: sizing.size_040,
    },
    swatch: {
        position: "relative",
        flexGrow: 1,
        minBlockSize: sizing.size_560,
        borderRadius: border.radius.radius_040,
        boxShadow: `inset 0 0 0 1px ${semanticColor.core.border.neutral.subtle}`,
    },
    copyButton: {
        position: "absolute",
        insetBlockStart: sizing.size_040,
        insetInlineEnd: sizing.size_040,
        // Keep the button readable on any swatch color.
        backgroundColor: semanticColor.core.background.base.default,
    },
    hex: {
        textAlign: "center",
        fontFamily: "monospace",
        color: semanticColor.core.foreground.neutral.subtle,
    },
});
