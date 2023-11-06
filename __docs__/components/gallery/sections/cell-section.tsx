import * as React from "react";
import {StyleSheet} from "aphrodite";

import {CompactCell, DetailCell} from "@khanacademy/wonder-blocks-cell";
import {View} from "@khanacademy/wonder-blocks-core";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import {tokens} from "@khanacademy/wonder-blocks-theming";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentTile from "../component-tile";
import {styles} from "../styles";

export default function BannerSection() {
    return (
        <>
            <HeadingLarge id="cell" tag="h3" style={styles.sectionLabel}>
                Cell
            </HeadingLarge>
            <View style={styles.section}>
                <ComponentTile
                    name="CompactCell"
                    href="/?path=/docs/cell-compactcell--docs"
                    description={`A compacted-height cell with limited
                        subviews and accessories. Typically they represent
                        additional info or selection lists.`}
                >
                    <View style={localStyles.cellExample}>
                        <CompactCell
                            title="Intro to rational & irrational numbers"
                            rightAccessory={
                                <Icon icon={icons.caretRight} size="small" />
                            }
                        />
                    </View>
                </ComponentTile>

                <ComponentTile
                    name="DetailCell"
                    href="/?path=/docs/cell-detailcell--docs"
                    description={`A compact cell that allows adding
                        subtitles before and after the cell title. They
                        typically represent an item that can be
                        clicked/tapped to view more complex details.`}
                >
                    <View style={localStyles.cellExample}>
                        <DetailCell
                            title="Title for article item"
                            subtitle1={"Subtitle 1 for article item"}
                            subtitle2={"Subtitle 2 for article item"}
                            leftAccessory={
                                <Icon icon={icons.contentVideo} size="medium" />
                            }
                            rightAccessory={
                                <Icon icon={icons.caretRight} size="small" />
                            }
                        />
                    </View>
                </ComponentTile>
            </View>
        </>
    );
}

const localStyles = StyleSheet.create({
    cellExample: {
        backgroundColor: tokens.color.offWhite,
        padding: tokens.spacing.large_24,
    },
});
