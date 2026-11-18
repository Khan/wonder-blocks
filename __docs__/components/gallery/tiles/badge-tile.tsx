import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import {
    DueBadge,
    GemBadge,
    NeutralBadge,
    StatusBadge,
    StreakBadge,
} from "@khanacademy/wonder-blocks-badge";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

import ComponentTile from "../component-tile";
import {styles} from "../styles";
import {CommonTileProps} from "../types";

export default function BadgeTile(props: CommonTileProps) {
    return (
        <ComponentTile
            name="Badge"
            href="/?path=/docs/packages-badge-overview--docs"
            description={`Used to display a small amount of
                    information, such as a tag or a status.`}
            {...props}
        >
            <View style={[styles.centerContent, localStyles.wrap]}>
                <NeutralBadge label="Neutral" />
                <StatusBadge kind="info" label="Info" />
                <StatusBadge kind="success" label="Success" />
                <StatusBadge kind="warning" label="Warning" />
                <StatusBadge kind="critical" label="Critical" />
                <GemBadge showIcon={true} label="120" />
                <StreakBadge showIcon={true} label="7" />
                <DueBadge showIcon={true} kind="due" label="Due" />
                <DueBadge showIcon={true} kind="overdue" label="Overdue" />
            </View>
        </ComponentTile>
    );
}

const localStyles = StyleSheet.create({
    wrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: sizing.size_120,
    },
});
