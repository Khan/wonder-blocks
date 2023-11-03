import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import Pill from "@khanacademy/wonder-blocks-pill";
import {tokens} from "@khanacademy/wonder-blocks-theming";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentTile from "../component-tile";
import {styles} from "../styles";

export default function PillSection() {
    return (
        <>
            <HeadingLarge tag="h3" style={styles.sectionLabel}>
                Pill
            </HeadingLarge>
            <ComponentTile name="Pill" href="/?path=/docs/pill--docs">
                <View style={localStyles.grid}>
                    <View>
                        <Pill
                            kind="neutral"
                            size="small"
                            testId="neutral-small-test-id"
                        >
                            Neutral, small
                        </Pill>
                    </View>
                    <View>
                        <Pill
                            kind="accent"
                            size="small"
                            testId="accent-small-test-id"
                        >
                            Accent, small
                        </Pill>
                    </View>
                    <Pill
                        kind="neutral"
                        size="large"
                        testId="neutral-large-test-id"
                    >
                        Neutral, large
                    </Pill>
                    <Pill
                        kind="accent"
                        size="large"
                        testId="accent-large-test-id"
                    >
                        Accent, large
                    </Pill>
                </View>
            </ComponentTile>
        </>
    );
}

const localStyles = StyleSheet.create({
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        columnGap: tokens.spacing.large_24,
        width: "fit-content",
    },
});
