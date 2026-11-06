import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import {NeutralBadge, StatusBadge} from "@khanacademy/wonder-blocks-badge";
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
            <View style={[styles.centerContent, localStyles.grid]}>
                <NeutralBadge label="Neutral" />
                <StatusBadge kind="info" label="Info" />
                <StatusBadge kind="success" label="Success" />
                <StatusBadge kind="warning" label="Warning" />
            </View>
        </ComponentTile>
    );
}

const localStyles = StyleSheet.create({
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        columnGap: sizing.size_240,
        rowGap: sizing.size_120,
        width: "fit-content",
    },
});
