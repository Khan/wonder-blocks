import * as React from "react";

import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";

import {spacing} from "@khanacademy/wonder-blocks-tokens";

import {packageGroups, functionGroups, alphabetical} from "./groups";
import {HeadingLarge, LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {Strut} from "@khanacademy/wonder-blocks-layout";

import type {GroupMap} from "./groups";

export default function ComponentGallery() {
    const groupMaps: Record<string, GroupMap[]> = {
        package: packageGroups,
        function: functionGroups,
        alphabetical: alphabetical,
    };
    const [currentGroup, setCurrentGroup] = React.useState("function");

    return (
        <View>
            <View style={styles.menuBar}>
                <LabelMedium>Sort by</LabelMedium>
                <Strut size={spacing.xSmall_8} />
                <SingleSelect
                    selectedValue={currentGroup}
                    onChange={setCurrentGroup}
                    // Placehoder is not used here
                    placeholder=""
                >
                    <OptionItem label="package" value="package" />
                    <OptionItem label="function" value="function" />
                    <OptionItem label="alphabetical" value="alphabetical" />
                </SingleSelect>
            </View>

            {groupMaps[currentGroup].map((group) => (
                <View key={group.name}>
                    <HeadingLarge tag="h3" style={styles.sectionLabel}>
                        {group.name}
                    </HeadingLarge>

                    <View style={styles.section}>
                        {group.components.map((Tile) => {
                            return <Tile />;
                        })}
                    </View>
                </View>
            ))}
        </View>
    );
}

export const styles = StyleSheet.create({
    menuBar: {
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
