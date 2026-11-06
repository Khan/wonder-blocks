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

/**
 * Tokens that aren't part of a hue's scale, shown after the hue rows.
 */
const standaloneNames: Array<PaletteName> = ["black_100", "white_100"];

/**
 * Get the numeric step of a palette token (e.g. `red_05` -> 5).
 */
const getStep = (name: PaletteName) => Number(name.split("_")[1]);

/**
 * The palette's hues (red, orange, …) with their tokens, ordered from dark to
 * light.
 */
const hueRows = Object.keys(graphicsPalette)
    .filter(
        (name): name is PaletteName =>
            !standaloneNames.includes(name as PaletteName),
    )
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

type SwatchProps = {
    name: PaletteName;
    style?: StyleType;
};

/**
 * A palette color, with its token name, a button to copy the token name, and
 * its hex value.
 */
function PaletteSwatch({name, style}: SwatchProps) {
    const value = graphicsPalette[name];
    const hex = maybeGetCssVariableInfo(value).value;

    return (
        <View style={[styles.cell, style]}>
            <View style={[styles.swatch, {backgroundColor: value}]} />
            <View style={styles.nameRow}>
                <BodyText size="xsmall" style={styles.name}>
                    {name}
                </BodyText>
                <CopyButton value={`graphicsPalette.${name}`} />
            </View>
            <BodyText size="xsmall" style={styles.hex}>
                {hex}
            </BodyText>
        </View>
    );
}

/**
 * Show the graphics palette as a grid of hues (rows) by steps (columns),
 * matching the palette's layout in Figma, followed by black and white.
 *
 * Each swatch has a button that copies its token name (e.g.
 * `graphicsPalette.red_30`).
 */
export function GraphicsPaletteGrid() {
    return (
        <View style={styles.scrollContainer}>
            <View
                style={[
                    styles.grid,
                    {
                        gridTemplateColumns: `max-content repeat(${steps.length}, minmax(${CELL_MIN_WIDTH}px, 1fr))`,
                    },
                ]}
            >
                {steps.map((step, index) => (
                    <BodyText
                        key={step}
                        size="small"
                        style={[
                            styles.columnLabel,
                            {gridColumn: index + 2, gridRow: 1},
                        ]}
                    >
                        {step}
                    </BodyText>
                ))}

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
                                    gridColumn: columnIndex + 2,
                                    gridRow: rowIndex + 2,
                                }}
                            />
                        ))}
                    </React.Fragment>
                ))}

                {standaloneNames.map((name, index) => (
                    <PaletteSwatch
                        key={name}
                        name={name}
                        style={[
                            styles.standalone,
                            {
                                gridColumn: index + 2,
                                gridRow: hueRows.length + 2,
                            },
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

const CELL_MIN_WIDTH = 72;

const styles = StyleSheet.create({
    scrollContainer: {
        overflowX: "auto",
        paddingBlock: sizing.size_080,
    },
    grid: {
        display: "grid",
        columnGap: sizing.size_040,
        rowGap: sizing.size_120,
        minInlineSize: "fit-content",
    },
    columnLabel: {
        textAlign: "center",
    },
    rowLabel: {
        alignSelf: "start",
        // Center the label on the swatch, not the whole cell.
        paddingBlockStart: sizing.size_160,
        paddingInlineEnd: sizing.size_040,
        textAlign: "end",
        textTransform: "capitalize",
    },
    cell: {
        gap: sizing.size_040,
    },
    standalone: {
        marginBlockStart: sizing.size_160,
    },
    swatch: {
        blockSize: sizing.size_480,
        borderRadius: border.radius.radius_040,
        boxShadow: `inset 0 0 0 1px ${semanticColor.core.border.neutral.subtle}`,
    },
    nameRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    name: {
        whiteSpace: "nowrap",
    },
    hex: {
        fontFamily: "monospace",
        color: semanticColor.core.foreground.neutral.subtle,
    },
});
