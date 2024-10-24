import * as React from "react";
import {StyleSheet} from "aphrodite";

import {DetailCell} from "@khanacademy/wonder-blocks-cell";
import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import * as tokens from "@khanacademy/wonder-blocks-tokens";
import {IconMappings} from "../../../wonder-blocks-icon/phosphor-icon.argtypes";

import ComponentTile from "../component-tile";

export default function DetailCellTile(props: {layout: "grid" | "list"}) {
    return (
        <ComponentTile
            name="DetailCell"
            href="/?path=/docs/packages-cell-detailcell--docs"
            description={`A compact cell that allows adding
                        subtitles before and after the cell title. They
                        typically represent an item that can be
                        clicked/tapped to view more complex details.`}
            layout={props.layout}
        >
            <View style={localStyles.cellExample}>
                <DetailCell
                    title="Title for article item"
                    subtitle1={"Subtitle 1 for article item"}
                    subtitle2={"Subtitle 2 for article item"}
                    leftAccessory={
                        <PhosphorIcon
                            icon={IconMappings.playCircle}
                            size="medium"
                        />
                    }
                    rightAccessory={
                        <PhosphorIcon
                            icon={IconMappings.caretRightBold}
                            size="small"
                        />
                    }
                />
            </View>
        </ComponentTile>
    );
}

const localStyles = StyleSheet.create({
    cellExample: {
        backgroundColor: tokens.color.offWhite,
        padding: tokens.spacing.large_24,
    },
});
