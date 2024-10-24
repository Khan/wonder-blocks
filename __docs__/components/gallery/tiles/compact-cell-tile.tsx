import * as React from "react";
import {StyleSheet} from "aphrodite";

import {CompactCell} from "@khanacademy/wonder-blocks-cell";
import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import * as tokens from "@khanacademy/wonder-blocks-tokens";
import {IconMappings} from "../../../wonder-blocks-icon/phosphor-icon.argtypes";

import ComponentTile from "../component-tile";

export default function CompactCellTile() {
    return (
        <ComponentTile
            name="CompactCell"
            href="/?path=/docs/packages-cell-compactcell--docs"
            description={`A compacted-height cell with limited
                        subviews and accessories. Typically they represent
                        additional info or selection lists.`}
        >
            <View style={localStyles.cellExample}>
                <CompactCell
                    title="Intro to rational & irrational numbers"
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
