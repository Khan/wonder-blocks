import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import {View} from "@khanacademy/wonder-blocks-core";
import {
    border,
    font,
    graphicsPalette,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {CopyButton} from "./copy-button";
import {maybeGetCssVariableInfo} from "./tokens-util";

type PaletteName = keyof typeof graphicsPalette;

/**
 * Get the numeric step of a palette token (e.g. `red_05` -> 5).
 */
const getStep = (name: PaletteName) => Number(name.split("_")[1]);

/**
 * The palette's tokens grouped by color (e.g. `red_05` -> `red`), with each
 * group ordered from dark to light.
 */
const colorGroups = (Object.keys(graphicsPalette) as Array<PaletteName>)
    .reduce<Array<[string, Array<PaletteName>]>>((groups, name) => {
        const colorName = name.split("_")[0];
        const group = groups.find(([groupName]) => groupName === colorName);
        if (group) {
            group[1].push(name);
        } else {
            groups.push([colorName, [name]]);
        }
        return groups;
    }, [])
    .map(([colorName, names]): [string, Array<PaletteName>] => [
        colorName,
        [...names].sort((a, b) => getStep(a) - getStep(b)),
    ]);

/**
 * The hues (red, orange, …), which each have a scale of steps.
 */
const hueRows = colorGroups.filter(([, names]) => names.length > 1);

/**
 * Tokens that aren't part of a hue's scale (e.g. black and white), shown after
 * the hue rows.
 */
const standaloneNames = colorGroups
    .filter(([, names]) => names.length === 1)
    .map(([, names]) => names[0]);

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
 * followed by the tokens that aren't part of a hue's scale (e.g. black and
 * white).
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
                        gridTemplateColumns: `max-content repeat(${steps.length}, ${CELL_WIDTH}px)`,
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
                            size="xsmall"
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

// A fixed width so the grid scrolls horizontally instead of squeezing the
// swatches when there isn't enough room.
const CELL_WIDTH = 92;

const styles = StyleSheet.create({
    scrollContainer: {
        overflowX: "auto",
        paddingBlock: sizing.size_080,
    },
    grid: {
        display: "grid",
        columnGap: sizing.size_080,
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
        paddingInlineEnd: sizing.size_080,
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
        gap: sizing.size_040,
    },
    name: {
        whiteSpace: "nowrap",
    },
    hex: {
        fontFamily: font.family.mono,
        color: semanticColor.core.foreground.neutral.subtle,
    },
});
