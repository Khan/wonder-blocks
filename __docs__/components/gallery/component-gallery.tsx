import * as React from "react";

import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";

import {spacing} from "@khanacademy/wonder-blocks-tokens";

import {packageGroups, functionGroups, alphabetGroups} from "./groups";
import {HeadingLarge, LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {Strut} from "@khanacademy/wonder-blocks-layout";

import type {GroupMap} from "./groups";

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

    return (
        <View>
            <View style={styles.menuBar}>
                <LabelMedium>Group by</LabelMedium>
                <Strut size={spacing.xSmall_8} />
                <SingleSelect
                    selectedValue={currentGroup}
                    onChange={setCurrentGroup}
                    // Placehoder is not used here
                    placeholder=""
                >
                    <OptionItem label="package" value="package" />
                    <OptionItem label="function" value="function" />
                    <OptionItem label="alphabet" value="alphabet" />
                </SingleSelect>
                <Strut size={spacing.large_24} />

                <LabelMedium>Layout</LabelMedium>
                <Strut size={spacing.xSmall_8} />
                <SingleSelect
                    selectedValue={currentLayout}
                    onChange={(newValue) =>
                        setCurrentLayout(newValue === "grid" ? "grid" : "list")
                    }
                    // Placehoder is not used here
                    placeholder=""
                >
                    <OptionItem label="grid" value="grid" />
                    <OptionItem label="list" value="list" />
                </SingleSelect>
            </View>

            {groupMaps[currentGroup].map((group) => (
                <View key={group.name}>
                    <HeadingLarge tag="h3" style={styles.sectionLabel}>
                        {group.name}
                    </HeadingLarge>

                    <View style={styles.section}>
                        {group.components.map((Tile) => {
                            return <Tile layout={currentLayout} />;
                        })}
                    </View>
                </View>
            ))}
        </View>
    );
}

export const styles = StyleSheet.create({
    menuBar: {
        marginTop: spacing.large_24,
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
});
