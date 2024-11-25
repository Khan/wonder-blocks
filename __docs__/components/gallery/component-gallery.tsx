import * as React from "react";

import {StyleSheet} from "aphrodite";
import {RenderStateRoot, View} from "@khanacademy/wonder-blocks-core";

import {spacing} from "@khanacademy/wonder-blocks-tokens";

import {packageGroups, functionGroups, alphabetGroups} from "./groups";
import {HeadingLarge, LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {Spring, Strut} from "@khanacademy/wonder-blocks-layout";

import type {GroupMap} from "./groups";
import Banner from "@khanacademy/wonder-blocks-banner";
import Switch from "@khanacademy/wonder-blocks-switch";

export default function ComponentGallery() {
    const groupMaps: Record<string, GroupMap[]> = {
        package: packageGroups,
        function: functionGroups,
        alphabet: alphabetGroups,
    };
    const [currentGroup, setCurrentGroup] = React.useState("function");
    const [currentLayout, setCurrentLayout] = React.useState<"grid" | "list">(
        "grid",
    );
    const [compactGridView, setCompactGridView] = React.useState(false);

    return (
        <RenderStateRoot>
            <View>
                <Banner
                    kind="info"
                    layout="floating"
                    text={`Note: The core, data, translations, layout, testing,
                    theming, timing, tokens, and typography packages are not
                    featured in this gallery.`}
                />
                <View style={styles.menuBar}>
                    <LabelMedium tag="label" style={styles.row}>
                        Group by
                        <Strut size={spacing.xSmall_8} />
                        <SingleSelect
                            selectedValue={currentGroup}
                            onChange={setCurrentGroup}
                            // Placehoder is not used here
                            placeholder=""
                        >
                            <OptionItem label="alphabet" value="alphabet" />
                            <OptionItem label="function" value="function" />
                            <OptionItem label="package" value="package" />
                        </SingleSelect>
                    </LabelMedium>
                    <Strut size={spacing.large_24} />

                    <LabelMedium tag="label" style={styles.row}>
                        Layout
                        <Strut size={spacing.xSmall_8} />
                        <SingleSelect
                            selectedValue={currentLayout}
                            onChange={(newValue) =>
                                setCurrentLayout(
                                    newValue === "grid" ? "grid" : "list",
                                )
                            }
                            // Placehoder is not used here
                            placeholder=""
                        >
                            <OptionItem label="grid" value="grid" />
                            <OptionItem label="list" value="list" />
                        </SingleSelect>
                    </LabelMedium>

                    {currentLayout === "grid" && (
                        <>
                            <Spring />
                            <Switch
                                // This shouldn't need to be a unique ID, since
                                // it shoulbe the only compact grid switch on
                                // the page, and the page should not be
                                // rendered multiple times in one place.
                                id="wb-storybook-gallery-compact-grid-switch"
                                checked={compactGridView}
                                onChange={setCompactGridView}
                            />
                            <Strut size={spacing.xSmall_8} />
                            <LabelMedium
                                tag="label"
                                htmlFor="wb-storybook-gallery-compact-grid-switch"
                                style={styles.row}
                            >
                                Compact grid
                            </LabelMedium>
                        </>
                    )}
                </View>

                {groupMaps[currentGroup].map((group) => (
                    <View key={group.name}>
                        <HeadingLarge tag="h3" style={styles.sectionLabel}>
                            {group.name}
                        </HeadingLarge>

                        <View style={styles.section}>
                            {group.components.map((Tile) => {
                                return (
                                    <Tile
                                        layout={currentLayout}
                                        compactGrid={compactGridView}
                                    />
                                );
                            })}
                        </View>
                    </View>
                ))}
            </View>
        </RenderStateRoot>
    );
}

export const styles = StyleSheet.create({
    menuBar: {
        marginTop: spacing.medium_16,
        flexDirection: "row",
        alignItems: "center",
    },
    section: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    sectionLabel: {
        marginTop: spacing.xLarge_32,
        marginBottom: spacing.large_24,
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
});
