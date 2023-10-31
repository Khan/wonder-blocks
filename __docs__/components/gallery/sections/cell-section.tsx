import * as React from "react";

import {CompactCell, DetailCell} from "@khanacademy/wonder-blocks-cell";
import {View} from "@khanacademy/wonder-blocks-core";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentTile from "../component-tile";
import {styles} from "../component-gallery";

export default function BannerSection() {
    return (
        <>
            <HeadingLarge tag="h3" style={styles.sectionLabel}>
                Cell
            </HeadingLarge>
            <View style={styles.section}>
                <ComponentTile
                    name="CompactCell"
                    href="/?path=/docs/cell-compactcell--docs"
                >
                    <View style={styles.cellExample}>
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
                >
                    <View style={styles.cellExample}>
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
